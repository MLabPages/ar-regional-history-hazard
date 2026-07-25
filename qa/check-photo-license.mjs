// Wikimedia Commons 画像のライセンスを1件ずつ確認する。
// 商用利用可・改変可のものだけを採用し、要求される帰属表示を抽出する。
// 使い方: node qa/check-photo-license.mjs

// Wikimedia APIは連続アクセスを制限するため、間隔とUser-Agentを設定する
const UA = { 'User-Agent': 'ar-regional-history-hazard/1.0 (educational; contact via GitHub MLabPages)' };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function getJson(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: UA });
    const text = await res.text();
    try { return JSON.parse(text); }
    catch { await sleep(2500 * (i + 1)); }
  }
  throw new Error('JSON取得に失敗（レート制限の可能性）');
}

const TARGETS = [
  ['四天王寺', 'hist-11'],
  ['住吉大社', 'hist-15'],
  ['大阪市中央公会堂', 'comm-6'],
  ['大阪天満宮', 'hist-14'],
  ['難波宮', 'comm-3'],
  ['適塾', 'comm-5'],
  ['一心寺', 'hist-18'],
  ['生國魂神社', 'hist-12'],
  ['高津宮', 'hist-13']
];

// 商用利用・改変が明確に認められるライセンスのみ許可する
const ALLOWED = /^(cc0|cc-by-\d|cc-by-sa-\d|pd-|public domain)/i;

async function pageImage(title) {
  const url = `https://ja.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=name&titles=${encodeURIComponent(title)}&format=json&origin=*`;
  const j = await getJson(url);
  const page = Object.values(j.query.pages)[0];
  return page?.pageimage ? `File:${page.pageimage}` : null;
}

async function imageInfo(fileTitle) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo'
    + '&iiprop=url|extmetadata|size&iiurlwidth=1024'
    + `&titles=${encodeURIComponent(fileTitle)}&format=json&origin=*`;
  const j = await getJson(url);
  const page = Object.values(j.query.pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) return null;
  const m = info.extmetadata || {};
  const clean = (v) => v ? String(v.value).replace(/<[^>]*>/g, '').trim() : null;
  return {
    thumbUrl: info.thumburl,
    descriptionUrl: info.descriptionurl,
    licenseShortName: clean(m.LicenseShortName),
    license: clean(m.License),
    artist: clean(m.Artist),
    attributionRequired: clean(m.AttributionRequired),
    restrictions: clean(m.Restrictions),
    credit: clean(m.Credit)
  };
}

const results = [];
for (const [title, spotId] of TARGETS) {
  try {
    const f = await pageImage(title);
    if (!f) { console.log(`${title}: 代表画像なし`); continue; }
    const info = await imageInfo(f);
    if (!info) { console.log(`${title}: 情報取得失敗`); continue; }

    const key = (info.license || info.licenseShortName || '').toLowerCase();
    const ok = ALLOWED.test(key) && !/non-free|fair use/i.test(key)
      && !(info.restrictions && info.restrictions.length > 0);

    console.log(`${ok ? '採用可' : '見送り'} ${title}`);
    console.log(`   license=${info.licenseShortName} (${info.license})`);
    console.log(`   artist=${(info.artist || '').slice(0, 60)}`);
    if (info.restrictions) console.log(`   restrictions=${info.restrictions}`);

    if (ok) results.push({ spotId, title, file: f, ...info });
    await sleep(1200);
  } catch (e) {
    console.log(`${title}: ERR ${e.message}`);
  }
}

console.log('\n===== 採用可能 =====');
console.log(JSON.stringify(results, null, 1));
