// OpenStreetMap から建物輪郭を取得して buildings.js を生成する開発用スクリプト。
// 実行時にAPIへ依存しないよう、結果をリポジトリ内に保存して使う。
// 使い方: node qa/fetch-buildings.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 収録範囲: 大阪城公園とその周辺（AR/3Dの主対象）
const AREAS = [
  { name: '大阪城周辺', s: 34.6820, w: 135.5190, n: 34.6900, e: 135.5300 }
];

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];

async function fetchArea(area) {
  const q = `[out:json][timeout:90];(way["building"](${area.s},${area.w},${area.n},${area.e}););out geom;`;
  for (const ep of ENDPOINTS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(`${ep}?data=${encodeURIComponent(q)}`, {
          headers: { 'User-Agent': 'ar-regional-history-hazard/1.0 (educational)' }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        if (json.elements?.length) return json.elements;
        throw new Error('空の応答');
      } catch (e) {
        console.log(`  ${ep} 試行${attempt + 1}: ${e.message}`);
        await new Promise(r => setTimeout(r, 4000));
      }
    }
  }
  return null;
}

// 高さの決め方: height（実測）→ building:levels×3.2m → 種別ごとの既定値。
// どの根拠で高さを出したかを heightSource に残し、推定値だと分かるようにする。
function resolveHeight(tags) {
  const h = parseFloat(tags.height);
  if (Number.isFinite(h) && h > 0) return { height: h, heightSource: 'measured' };
  const lv = parseFloat(tags['building:levels']);
  if (Number.isFinite(lv) && lv > 0) return { height: lv * 3.2, heightSource: 'levels' };
  return { height: 6, heightSource: 'assumed' };
}

const out = [];
for (const area of AREAS) {
  console.log(`取得中: ${area.name}`);
  const els = await fetchArea(area);
  if (!els) { console.log('  取得できませんでした'); continue; }
  console.log(`  ${els.length}件`);
  for (const el of els) {
    if (!el.geometry || el.geometry.length < 3) continue;
    const t = el.tags || {};
    const { height, heightSource } = resolveHeight(t);
    // 頂点を間引いて軽くする（形は保ちつつデータ量を抑える）
    const geom = el.geometry.map(g => [Number(g.lat.toFixed(6)), Number(g.lon.toFixed(6))]);
    out.push({
      id: el.id,
      name: t.name || null,
      height: Number(height.toFixed(1)),
      heightSource,
      historic: Boolean(t.historic || t.heritage),
      geometry: geom
    });
  }
}

out.sort((a, b) => (b.name ? 1 : 0) - (a.name ? 1 : 0));

const named = out.filter(b => b.name).length;
const measured = out.filter(b => b.heightSource === 'measured').length;

const body = `/**
 * OpenStreetMap から取得した建物輪郭（3D表示用）。
 * 取得日: ${new Date().toISOString().slice(0, 10)}
 * 出典: OpenStreetMap contributors / ODbL
 *   https://www.openstreetmap.org/copyright
 *
 * height は次の優先順で決めています（heightSource に根拠を保持）:
 *   measured : OSMの height タグ（実測値）
 *   levels   : building:levels × 3.2m から換算した推定値
 *   assumed  : 情報がないため既定値6mを仮置き
 *
 * 建物の輪郭は現存建物の実測形状です。江戸期の姿の復元ではありません。
 * 全${out.length}件（名前つき${named}件・高さ実測${measured}件）
 */
export const OSM_BUILDINGS = ${JSON.stringify(out)};

export const OSM_BUILDINGS_META = {
  fetchedAt: '${new Date().toISOString().slice(0, 10)}',
  source: 'OpenStreetMap contributors',
  license: 'ODbL',
  licenseUrl: 'https://www.openstreetmap.org/copyright',
  count: ${out.length},
  namedCount: ${named},
  measuredHeightCount: ${measured}
};
`;

fs.writeFileSync(path.join(root, 'buildings.js'), body);
console.log(`\nbuildings.js を書き出しました: ${out.length}件（名前つき${named}件・高さ実測${measured}件）`);
