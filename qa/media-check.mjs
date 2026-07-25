// 古写真比較 / 年代別航空写真 / 3Dビュー の実ブラウザ検証。
// 出典表記が常時見えていること、限界の注釈が出ていることも確認する。
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const PORT = Number(process.env.QA_PORT || 8797);
const CHROME = process.env.QA_CHROME
  || path.join(process.env.LOCALAPPDATA || '', 'ms-playwright', 'chromium-1228', 'chrome-win64', 'chrome.exe');

const fails = [];
const notes = [];
const check = (name, ok, detail = '') =>
  (ok ? notes : fails).push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);

const server = spawn(process.execPath, [path.join(here, 'server.mjs')], {
  env: { ...process.env, QA_PORT: String(PORT) }, stdio: 'ignore'
});
await new Promise(r => setTimeout(r, 1200));

let browser;
try {
  browser = await chromium.launch({ executablePath: CHROME });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e.message)));

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    window.arApp?.startDemoAR?.();
    document.getElementById('camera-placeholder')?.classList.add('hidden');
  });

  // 1) 古写真比較: 検証済み画像を持つスポットで開く
  const opened = await page.evaluate(() => {
    const app = window.arApp;
    const spot = app.getPointSpots().find(s => {
      const m = s.mediaAssets?.[0];
      return m?.isHistorical && m.imageUrl && m.imageUrlVerified !== false;
    });
    if (!spot) return null;
    app.openSpotModal(spot);
    document.getElementById('btn-compare-ar').click();
    return spot.name;
  });
  check('古写真比較を開けるスポットがある', Boolean(opened), opened || '該当なし');

  if (opened) {
    // 高精細な絵図は数百KBあるため、固定待ちではなく読み込み完了を待つ
    await page.waitForFunction(() => {
      const img = document.getElementById('historical-overlay-img');
      return img && img.complete && img.naturalWidth > 0;
    }, { timeout: 30000 }).catch(() => {});
    const ov = await page.evaluate(() => {
      const img = document.getElementById('historical-overlay-img');
      const credit = document.getElementById('overlay-credit');
      const cs = credit ? getComputedStyle(credit) : null;
      return {
        visible: !document.getElementById('historical-overlay').classList.contains('hidden'),
        loaded: img.complete && img.naturalWidth > 0,
        naturalW: img.naturalWidth,
        src: img.src,
        creditShown: cs ? cs.display !== 'none' && cs.visibility !== 'hidden' : false,
        title: document.getElementById('overlay-credit-title')?.textContent || '',
        source: document.getElementById('overlay-credit-source')?.textContent || '',
        caveat: document.getElementById('overlay-credit-caveat')?.textContent || ''
      };
    });
    check('古写真画像が実際に読み込まれる', ov.loaded, `naturalWidth=${ov.naturalW} src=${ov.src.slice(0, 70)}`);
    check('出典クレジットが表示される', ov.creditShown && ov.title.length > 0);
    check('出典に機関名が含まれる', /国立国会図書館/.test(ov.source), ov.source.slice(0, 60));
    check('限界の注釈が表示される', ov.caveat.length > 20, ov.caveat.slice(0, 50));

    // 出典表記が他のUIに隠されていないこと（表示義務があるため実際に読める必要がある）
    const creditClear = await page.evaluate(() => {
      const credit = document.getElementById('overlay-credit');
      const r = credit.getBoundingClientRect();
      const blockers = new Set();
      for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 5; j++) {
          const x = r.left + (r.width * i) / 6;
          const y = r.top + (r.height * j) / 5;
          const el = document.elementFromPoint(x, y);
          if (el && !credit.contains(el)) blockers.add(el.id || el.className || el.tagName);
        }
      }
      return { top: Math.round(r.top), blockers: [...blockers] };
    });
    check('出典クレジットが他のUIに隠されない', creditClear.blockers.length === 0,
      `top=${creditClear.top} 前面=${creditClear.blockers.join(', ')}`);

    // 表紙ではなく資料本体が表示されているか（大坂大繪圖はコマ3を使う）
    check('絵図は表紙ではなく本体コマを表示', !/2542266\/R0000001/.test(ov.src), ov.src.slice(-40));
    fs.mkdirSync(path.join(root, 'qa', 'shots'), { recursive: true });
    await page.screenshot({ path: path.join(root, 'qa', 'shots', 'compare-overlay.png') });
    notes.push('  → qa/shots/compare-overlay.png');
    await page.evaluate(() => document.getElementById('btn-close-overlay').click());
  }

  // 2) 年代別航空写真
  await page.evaluate(() => {
    const app = window.arApp;
    app.openSpotModal(app.getPointSpots()[0]);
    document.getElementById('btn-aerial-ar').click();
  });
  await page.waitForTimeout(4000);
  const aerial = await page.evaluate(() => {
    const c = document.getElementById('aerial-canvas');
    const ctx = c.getContext('2d');
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let nonEmpty = 0;
    for (let i = 3; i < d.length; i += 4 * 500) if (d[i] > 0) nonEmpty++;
    return {
      visible: !document.getElementById('aerial-overlay').classList.contains('hidden'),
      painted: nonEmpty > 0,
      chips: document.querySelectorAll('.aerial-era-chip').length,
      source: document.getElementById('aerial-credit-source')?.textContent || '',
      caveat: document.getElementById('aerial-credit-caveat')?.textContent || '',
      status: document.getElementById('aerial-status')?.textContent || ''
    };
  });
  check('航空写真オーバーレイが開く', aerial.visible);
  check('年代切替チップがある', aerial.chips >= 3, `${aerial.chips}件`);
  // 「データなし」の描画も painted になるため、状態文言で実タイル取得を判定する
  check('航空写真の実タイルが取得できる',
    aerial.painted && /枚のタイルを表示|枚表示/.test(aerial.status),
    `status=${aerial.status}`);
  check('航空写真の出典に国土地理院が含まれる', /国土地理院/.test(aerial.source), aerial.source.slice(0, 60));
  check('航空写真の限界注釈がある', aerial.caveat.length > 20);
  await page.screenshot({ path: path.join(root, 'qa', 'shots', 'aerial-overlay.png') });
  notes.push('  → qa/shots/aerial-overlay.png  ' + aerial.status);
  await page.evaluate(() => document.getElementById('btn-close-aerial').click());

  // 3) 3Dビュー
  await page.evaluate(() => {
    const app = window.arApp;
    app.openSpotModal(app.getPointSpots()[0]);
    document.getElementById('btn-view-3d').click();
  });
  await page.waitForTimeout(6000);
  const three = await page.evaluate(() => {
    const holder = document.getElementById('three-canvas-holder');
    const cv = holder.querySelector('canvas');
    return {
      visible: !document.getElementById('three-overlay').classList.contains('hidden'),
      hasCanvas: Boolean(cv),
      w: cv?.width || 0, h: cv?.height || 0,
      caveat: document.querySelector('#three-credit .overlay-credit-caveat')?.textContent || '',
      source: document.getElementById('three-credit-source')?.textContent || '',
      // クレジットに出る「建物N棟」から実際の描画数を読み取る
      buildings: Number((document.getElementById('three-credit-source')?.textContent || '').match(/建物(\d+)棟/)?.[1] || 0)
    };
  });
  check('3Dビューが開く', three.visible);
  check('3Dキャンバスが生成される', three.hasCanvas && three.w > 0, `${three.w}x${three.h}`);
  check('3Dの「過去の復元ではない」注釈がある',
    /復元したものではありません|復元ではありません/.test(three.caveat), three.caveat.slice(0, 50));
  check('3Dの出典にOpenStreetMapが含まれる',
    /OpenStreetMap/.test(three.source), (three.source || '').slice(0, 70));
  check('3Dに建物が描画される', three.buildings > 0, `${three.buildings}棟`);
  await page.screenshot({ path: path.join(root, 'qa', 'shots', 'three-view.png') });
  notes.push('  → qa/shots/three-view.png');

  const appErrors = errors.filter(e => !/tile|Failed to load resource|net::ERR/i.test(e));
  check('アプリJSエラーなし', appErrors.length === 0, appErrors.slice(0, 2).join(' | '));

  // 4) 現況写真: 表示と、CC BY系での撮影者表示
  await page.evaluate(() => document.getElementById('btn-close-three').click());
  const photo = await page.evaluate(async () => {
    const app = window.arApp;
    const spot = app.getPointSpots().find(s => s.presentPhoto?.attributionRequired);
    if (!spot) return null;
    app.openSpotModal(spot);
    await new Promise(r => setTimeout(r, 2500));
    const img = document.querySelector('#modal-present-photo .present-photo-img');
    return {
      name: spot.name,
      author: spot.presentPhoto.author,
      shown: !document.getElementById('modal-present-photo').classList.contains('hidden'),
      loaded: Boolean(img && img.complete && img.naturalWidth > 0),
      credit: document.querySelector('#modal-present-photo .present-photo-credit')?.textContent || ''
    };
  });
  check('現況写真つきスポットがある', Boolean(photo), photo?.name || '該当なし');
  if (photo) {
    check('現況写真が読み込まれる', photo.loaded && photo.shown, photo.name);
    check('CC BY系で撮影者名が表示される', photo.credit.includes(photo.author),
      `author=${photo.author} credit=${photo.credit.replace(/\s+/g, ' ').slice(0, 60)}`);
  }

  // 5) 地図モード: 重ね合わせからの戻り導線とスワイプ比較
  await page.evaluate(() => {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
    document.getElementById('btn-mode-map').click();
  });
  await page.waitForTimeout(1500);
  const mapCompare = await page.evaluate(async () => {
    const app = window.arApp;
    app.updateMapBaseTile('showa50');
    await new Promise(r => setTimeout(r, 1200));
    const backBtn = document.getElementById('btn-back-to-present');
    const swipeBtn = document.getElementById('btn-swipe-compare');
    const backVisible = backBtn && !backBtn.classList.contains('hidden');
    swipeBtn?.click();
    await new Promise(r => setTimeout(r, 400));
    const handleVisible = !document.getElementById('swipe-handle').classList.contains('hidden');
    const clipped = Boolean(app.historicalOverlayTileLayer?.getContainer?.()?.style.clipPath);
    backBtn?.click();
    await new Promise(r => setTimeout(r, 800));
    return {
      backVisible, handleVisible, clipped,
      era: app.currentEra,
      overlayCleared: !app.historicalOverlayTileLayer,
      defaultOpacity: Number(document.getElementById('map-opacity-slider').value)
    };
  });
  check('重ね合わせ中に「現代地図に戻す」が出る', mapCompare.backVisible);
  check('スワイプ比較のハンドルが出る', mapCompare.handleVisible);
  check('スワイプで過去レイヤーが切り取られる', mapCompare.clipped);
  check('「現代地図に戻す」で重ね合わせが解除される',
    mapCompare.overlayCleared && mapCompare.era === 'present', `era=${mapCompare.era}`);
  check('地図の重ね濃さの既定が100%', mapCompare.defaultOpacity === 100, `${mapCompare.defaultOpacity}%`);
} catch (e) {
  fails.push('FAIL 実行エラー — ' + e.message.split('\n')[0]);
} finally {
  if (browser) await browser.close();
  server.kill();
}

console.log(notes.join('\n'));
if (fails.length) { console.log('\n' + fails.join('\n')); process.exit(1); }
console.log('\nすべて通過しました。');
