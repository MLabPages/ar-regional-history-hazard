// AR描画の実ブラウザ検証。既存のダウンロード済みChromiumを直接指定して起動する。
// 使い方: node qa/ar-render-check.mjs
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const PORT = Number(process.env.QA_PORT || 8793);

const CHROME =
  process.env.QA_CHROME
  || path.join(process.env.LOCALAPPDATA || '', 'ms-playwright', 'chromium-1228', 'chrome-win64', 'chrome.exe');

const failures = [];
const notes = [];
function check(name, ok, detail = '') {
  (ok ? notes : failures).push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
}

const server = spawn(process.execPath, [path.join(here, 'server.mjs')], {
  env: { ...process.env, QA_PORT: String(PORT) },
  stdio: 'ignore'
});
await new Promise(r => setTimeout(r, 1200));

let browser;
try {
  browser = await chromium.launch({ executablePath: CHROME });

  for (const dpr of [1, 3]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: dpr
    });
    const page = await context.newPage();

    const errors = [];
    page.on('pageerror', e => errors.push(String(e.message)));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'load' });
    await page.waitForTimeout(1500);

    // 開始カードを閉じてAR画面を露出させる（カメラなしARと同じ状態にする）
    await page.evaluate(() => {
      if (window.arApp?.startDemoAR) window.arApp.startDemoAR();
      document.getElementById('camera-placeholder')?.classList.add('hidden');
    });
    await page.waitForTimeout(300);
    // スポットが多く見える方位へ向ける
    await page.evaluate(() => window.arApp?.setHeading(200, 'manual'));
    await page.waitForTimeout(400);

    // 地図タイル等の外部リソースはネットワーク遮断下で失敗するため、
    // アプリ自身のJSエラーだけを対象にする。
    const appErrors = errors.filter(e =>
      !/tile|openstreetmap|gsi|cyberjapandata|Failed to load resource|net::ERR/i.test(e));
    check(`dpr=${dpr} アプリJSエラーなし`, appErrors.length === 0, appErrors.slice(0, 3).join(' | '));

    // キャンバスが devicePixelRatio 分だけ高解像度化されているか
    const canvasInfo = await page.evaluate(() => {
      const c = document.getElementById('ar-canvas');
      return { w: c.width, h: c.height, cssW: c.style.width, cssH: c.style.height, dpr: window.devicePixelRatio };
    });
    const expected = Math.round(390 * Math.min(dpr, 3));
    check(`dpr=${dpr} キャンバス実解像度=${canvasInfo.w}`, canvasInfo.w === expected, `期待 ${expected}`);
    check(`dpr=${dpr} CSSサイズ=${canvasInfo.cssW}`, canvasInfo.cssW === '390px');

    // ARピンが実際に描画され、タップ判定用の bounds を持っているか
    const pins = await page.evaluate(() => {
      const app = window.arApp;
      if (!app) return null;
      return app.renderedPins.map(p => ({
        name: p.spot.name,
        x: Math.round(p.bounds.x), y: Math.round(p.bounds.y),
        w: Math.round(p.bounds.width), h: Math.round(p.bounds.height),
        // 幅の広いものがカード、狭いものは点マーカー
        card: p.bounds.width > 120
      }));
    });

    if (!pins) {
      check(`dpr=${dpr} window.arApp 参照`, false, 'アプリインスタンスが公開されていない');
    } else {
      check(`dpr=${dpr} ARピン描画 ${pins.length}件`, pins.length > 0);
      // bounds はCSSピクセル基準（=クリック座標系）に収まっているべき
      const outOfRange = pins.filter(p => p.w > 390 || p.x < -200 || p.x > 590);
      check(`dpr=${dpr} ピン座標がCSSピクセル基準`, outOfRange.length === 0,
        outOfRange.slice(0, 2).map(p => `${p.name} w=${p.w} x=${p.x}`).join(' | '));

      // カードが画面左右で見切れていないか（スクリーンショットで発覚した不具合の回帰確認）
      const clipped = pins.filter(p => p.x < 0 || p.x + p.w > 390);
      check(`dpr=${dpr} カードが画面内に収まる`, clipped.length === 0,
        clipped.slice(0, 3).map(p => `${p.name} x=${p.x}..${p.x + p.w}`).join(' | '));

      // 情報量の多いカード同士は重なってはいけない（点マーカーは省略表示なので許容）
      const cards = pins.filter(p => p.card);
      const overlaps = [];
      for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
          const a = cards[i]; const b = cards[j];
          if (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y) {
            overlaps.push(`${a.name}×${b.name}`);
          }
        }
      }
      check(`dpr=${dpr} カード${cards.length}件が重ならない`, overlaps.length === 0, overlaps.slice(0, 3).join(' | '));

      if (dpr === 3) notes.push('  例: ' + pins.slice(0, 3).map(p => `${p.name}(w=${p.w})`).join(', '));
    }

    // 方位を回して、遠近スケールと視野外キューが破綻しないか確認
    for (const deg of [0, 90, 180, 270]) {
      await page.evaluate(d => window.arApp?.setHeading(d, 'manual'), deg);
      await page.waitForTimeout(260);
    }
    const afterSpin = errors.filter(e =>
      !/tile|openstreetmap|gsi|cyberjapandata|Failed to load resource|net::ERR/i.test(e));
    check(`dpr=${dpr} 方位回転後もエラーなし`, afterSpin.length === appErrors.length);

    if (dpr === 3) {
      fs.mkdirSync(path.join(root, 'qa', 'shots'), { recursive: true });
      await page.screenshot({ path: path.join(root, 'qa', 'shots', 'ar-view.png') });
      notes.push('  スクリーンショット: qa/shots/ar-view.png');
    }

    await context.close();
  }
} catch (e) {
  failures.push('FAIL 実行エラー — ' + e.message.split('\n')[0]);
} finally {
  if (browser) await browser.close();
  server.kill();
}

console.log(notes.join('\n'));
if (failures.length) {
  console.log('\n' + failures.join('\n'));
  process.exit(1);
}
console.log('\nすべて通過しました。');
