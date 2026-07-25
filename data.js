/**
 * AR地域理解・歴史・防災プラットフォームの監査済みデータ。
 * 不明な資料は「未確認」として扱い、歴史資料に見える仮画像を混在させない。
 */

export const SAMPLE_CENTER = {
  latitude: 34.6873,
  longitude: 135.5260,
  elevationMeter: 24,
  name: '大阪城本丸・天守閣付近'
};

export const DATA_SOURCES = {
  gsiTileList: 'https://maps.gsi.go.jp/development/ichiran.html',
  hazardOpenData: 'https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/opendata.html',
  ndlIiifHelp: 'https://dl.ndl.go.jp/ja/help_iiif#api-%E3%81%AE%E5%88%A9%E7%94%A8%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6',
  osmCopyright: 'https://www.openstreetmap.org/copyright'
};

export const PLACEHOLDER_IMAGE_URL =
  'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80';

const VERIFIED_AT = '2026-07-22';

// 国土地理院の公式一覧で存在と大阪付近の応答を確認したタイルだけを掲載。
// 明治・江戸・平安は、位置精度を持つ大阪向けXYZタイルが未確認のためここに含めない。
export const HISTORICAL_MAP_TILES = {
  present: {
    name: '現代地図',
    year: '現在',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    sourceName: 'OpenStreetMap',
    sourceUrl: DATA_SOURCES.osmCopyright,
    materialType: 'official_map',
    positionAccuracy: 'georeferenced',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 0,
    maxNativeZoom: 19
  },
  photo_latest: {
    name: '現代最新写真',
    year: '2020年代',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    attribution: '国土地理院 全国最新写真（シームレス）',
    sourceName: '国土地理院',
    sourceUrl: DATA_SOURCES.gsiTileList,
    materialType: 'aerial_photo',
    positionAccuracy: 'georeferenced',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 2,
    maxNativeZoom: 18
  },
  showa50: {
    name: '昭和50年代航空写真',
    year: '1974〜1978年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg',
    attribution: '国土地理院 空中写真（1974〜1978年頃）',
    sourceName: '国土地理院',
    sourceUrl: DATA_SOURCES.gsiTileList,
    materialType: 'aerial_photo',
    positionAccuracy: 'georeferenced',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 10,
    maxNativeZoom: 17
  },
  showa30: {
    name: '昭和30〜40年代航空写真',
    year: '1961〜1969年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png',
    attribution: '国土地理院 空中写真（1961〜1969年頃）',
    sourceName: '国土地理院',
    sourceUrl: DATA_SOURCES.gsiTileList,
    materialType: 'aerial_photo',
    positionAccuracy: 'georeferenced',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 10,
    maxNativeZoom: 17
  },
  showa20: {
    name: '昭和20年代航空写真',
    year: '1945〜1950年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png',
    attribution: '国土地理院 空中写真（1945〜1950年頃）',
    sourceName: '国土地理院',
    sourceUrl: DATA_SOURCES.gsiTileList,
    materialType: 'aerial_photo',
    positionAccuracy: 'georeferenced',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 10,
    maxNativeZoom: 17
  },
  showa_early: {
    name: '昭和初期航空写真',
    year: '1936〜1942年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_riku10/{z}/{x}/{y}.png',
    attribution: '国土地理院 空中写真（1936〜1942年頃）',
    sourceName: '国土地理院',
    sourceUrl: DATA_SOURCES.gsiTileList,
    materialType: 'aerial_photo',
    positionAccuracy: 'georeferenced',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 13,
    maxNativeZoom: 18
  },
  prewar_1928: {
    name: '1928年頃航空写真',
    year: '1928年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_1928/{z}/{x}/{y}.png',
    attribution: '国土地理院 空中写真（1928年頃）',
    sourceName: '国土地理院',
    sourceUrl: DATA_SOURCES.gsiTileList,
    materialType: 'aerial_photo',
    positionAccuracy: 'georeferenced',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 13,
    maxNativeZoom: 18
  }
};

// ライセンス（PDM）は NDL 資料レコード（PIDページ）で確認したもの。
// 2026-07-25: IIIFマニフェストと個別画像リソースをHTTP検証済み（全件 200 応答）。
//
// 【利用条件の整理】
// NDLデジタルコレクションの「インターネット公開（保護期間満了）」資料は、
// 著作権保護期間が満了しているため、複製・送信などの利用手続きは不要で、
// 商用利用も可能。ただしNDLは出典表示を「お願い」として求めており、
// 本アプリでは全画像に出典（機関名・資料名・PIDリンク）を必ず併記する。
// 参照: https://www.ndl.go.jp/jp/use/reproduction/index.html
const NDL_PDM_LICENSE = 'パブリックドメイン（保護期間満了・インターネット公開）';
const NDL_ATTRIBUTION = '国立国会図書館デジタルコレクション';
const IMAGE_VERIFIED_AT = '2026-07-25';

// IIIF Image API から表示用URLを組み立てる。幅指定で帯域を抑える。
const ndlIiifImage = (ndlPid, width = 1024, resource = 'R0000001') =>
  `https://dl.ndl.go.jp/api/iiif/${ndlPid}/${resource}/full/${width},/0/default.jpg`;

export const HISTORICAL_REFERENCE_MATERIALS = [
  {
    id: 'ndl-1303484',
    title: '浪花名所図会 八けん屋着船之図',
    date: '江戸後期（年代未詳）',
    era: '江戸後期',
    sourceName: '国立国会図書館デジタルコレクション',
    sourceUrl: 'https://dl.ndl.go.jp/pid/1303484',
    manifestUrl: 'https://dl.ndl.go.jp/api/iiif/1303484/manifest.json',
    imageUrl: ndlIiifImage('1303484'),
    thumbnailUrl: ndlIiifImage('1303484', 400),
    attribution: NDL_ATTRIBUTION,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    licenseSourceUrl: 'https://dl.ndl.go.jp/pid/1303484',
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'partially_verified',
    verification: {
      content: 'verified',
      coordinate: 'reference_only',
      media: 'verified',
      license: 'verified',
      source: 'verified'
    },
    verifiedAt: {
      content: VERIFIED_AT,
      coordinate: null,
      media: IMAGE_VERIFIED_AT,
      license: VERIFIED_AT,
      source: VERIFIED_AT
    },
    verificationNote: 'PID・年代・パブリックドメイン区分に加え、IIIFマニフェストと画像URLをHTTP検証済み（2026-07-25）。保護期間満了資料のため利用手続きは不要ですが、出典を必ず併記して表示します。',
    materialType: 'pictorial_map',
    displayType: '名所絵・錦絵',
    positionAccuracy: 'reference_only',
    isHistorical: true,
    note: '八軒家浜を描いた名所絵です。測量図ではなく、現代地図との位置一致は保証されません。'
  },
  {
    id: 'ndl-1303487',
    title: '浪花名所図会 道とんぼりの図',
    date: '江戸後期（年代未詳）',
    era: '江戸後期',
    sourceName: '国立国会図書館デジタルコレクション',
    sourceUrl: 'https://dl.ndl.go.jp/pid/1303487',
    manifestUrl: 'https://dl.ndl.go.jp/api/iiif/1303487/manifest.json',
    imageUrl: ndlIiifImage('1303487'),
    thumbnailUrl: ndlIiifImage('1303487', 400),
    attribution: NDL_ATTRIBUTION,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    licenseSourceUrl: 'https://dl.ndl.go.jp/pid/1303487',
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'partially_verified',
    verification: {
      content: 'verified',
      coordinate: 'reference_only',
      media: 'verified',
      license: 'verified',
      source: 'verified'
    },
    verifiedAt: {
      content: VERIFIED_AT,
      coordinate: null,
      media: IMAGE_VERIFIED_AT,
      license: VERIFIED_AT,
      source: VERIFIED_AT
    },
    verificationNote: 'PID・年代・パブリックドメイン区分に加え、IIIFマニフェストと画像URLをHTTP検証済み（2026-07-25）。保護期間満了資料のため利用手続きは不要ですが、出典を必ず併記して表示します。',
    materialType: 'pictorial_map',
    displayType: '名所絵・錦絵',
    positionAccuracy: 'reference_only',
    isHistorical: true,
    note: '道頓堀を描いた名所絵です。測量図ではなく、現代地図との位置一致は保証されません。'
  },
  {
    id: 'ndl-2542266',
    title: '大坂大繪圖',
    date: '元禄9年（1696年）',
    era: '江戸前期',
    sourceName: '国立国会図書館デジタルコレクション',
    sourceUrl: 'https://dl.ndl.go.jp/pid/2542266',
    manifestUrl: 'https://dl.ndl.go.jp/api/iiif/2542266/manifest.json',
    // 6コマ構成のうち、コマ1は表紙。城郭と大川筋が写るコマ3を本体として表示する。
    imageUrl: ndlIiifImage('2542266', 1024, 'R0000003'),
    thumbnailUrl: ndlIiifImage('2542266', 400, 'R0000003'),
    attribution: NDL_ATTRIBUTION,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    licenseSourceUrl: 'https://dl.ndl.go.jp/pid/2542266',
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'partially_verified',
    verification: {
      content: 'verified',
      coordinate: 'reference_only',
      media: 'verified',
      license: 'verified',
      source: 'verified'
    },
    verifiedAt: {
      content: VERIFIED_AT,
      coordinate: null,
      media: IMAGE_VERIFIED_AT,
      license: VERIFIED_AT,
      source: VERIFIED_AT
    },
    verificationNote: 'PID・年代・パブリックドメイン区分に加え、IIIFマニフェストと画像URLをHTTP検証済み（2026-07-25）。保護期間満了資料のため利用手続きは不要ですが、出典を必ず併記して表示します。',
    materialType: 'historical_map',
    displayType: '歴史地図・絵図',
    positionAccuracy: 'reference_only',
    isHistorical: true,
    note: '江戸期の絵図です。概略位置の参考資料であり、現代地図との位置一致は保証されません。'
  },
  {
    id: 'ndl-1303485',
    title: '難波名所図会 住吉御田の祭式田楽之図',
    date: '江戸後期（年代未詳）',
    era: '江戸後期',
    sourceName: '国立国会図書館デジタルコレクション',
    sourceUrl: 'https://dl.ndl.go.jp/pid/1303485',
    manifestUrl: 'https://dl.ndl.go.jp/api/iiif/1303485/manifest.json',
    imageUrl: ndlIiifImage('1303485'),
    thumbnailUrl: ndlIiifImage('1303485', 400),
    attribution: NDL_ATTRIBUTION,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    licenseSourceUrl: 'https://dl.ndl.go.jp/pid/1303485',
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'partially_verified',
    verification: {
      content: 'verified',
      coordinate: 'reference_only',
      media: 'verified',
      license: 'verified',
      source: 'verified'
    },
    verifiedAt: {
      content: IMAGE_VERIFIED_AT,
      coordinate: null,
      media: IMAGE_VERIFIED_AT,
      license: IMAGE_VERIFIED_AT,
      source: IMAGE_VERIFIED_AT
    },
    verificationNote: 'IIIFマニフェストと画像URLをHTTP検証済み（2026-07-25）。保護期間満了のパブリックドメイン資料です。',
    materialType: 'pictorial_map',
    displayType: '名所絵・錦絵',
    positionAccuracy: 'reference_only',
    isHistorical: true,
    note: '住吉大社の御田植神事を描いた名所絵です。行事の様子を伝える絵であり、現在の社殿配置を正確に示すものではありません。'
  },
  {
    id: 'ndl-1303490',
    title: '浪花名所図会 安井天神山花見',
    date: '江戸後期（年代未詳）',
    era: '江戸後期',
    sourceName: '国立国会図書館デジタルコレクション',
    sourceUrl: 'https://dl.ndl.go.jp/pid/1303490',
    manifestUrl: 'https://dl.ndl.go.jp/api/iiif/1303490/manifest.json',
    imageUrl: ndlIiifImage('1303490'),
    thumbnailUrl: ndlIiifImage('1303490', 400),
    attribution: NDL_ATTRIBUTION,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    licenseSourceUrl: 'https://dl.ndl.go.jp/pid/1303490',
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'partially_verified',
    verification: {
      content: 'verified',
      coordinate: 'reference_only',
      media: 'verified',
      license: 'verified',
      source: 'verified'
    },
    verifiedAt: {
      content: IMAGE_VERIFIED_AT,
      coordinate: null,
      media: IMAGE_VERIFIED_AT,
      license: IMAGE_VERIFIED_AT,
      source: IMAGE_VERIFIED_AT
    },
    verificationNote: 'IIIFマニフェストと画像URLをHTTP検証済み（2026-07-25）。保護期間満了のパブリックドメイン資料です。',
    materialType: 'pictorial_map',
    displayType: '名所絵・錦絵',
    positionAccuracy: 'reference_only',
    isHistorical: true,
    note: '安居神社周辺（安井天神山）の花見を描いた名所絵です。測量図ではなく、現代地図との位置一致は保証されません。'
  },
  {
    id: 'ndl-1303483',
    title: '浪花名所図会 堂じま米あきない',
    date: '江戸後期（年代未詳）',
    era: '江戸後期',
    sourceName: '国立国会図書館デジタルコレクション',
    sourceUrl: 'https://dl.ndl.go.jp/pid/1303483',
    manifestUrl: 'https://dl.ndl.go.jp/api/iiif/1303483/manifest.json',
    imageUrl: ndlIiifImage('1303483'),
    thumbnailUrl: ndlIiifImage('1303483', 400),
    attribution: NDL_ATTRIBUTION,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    licenseSourceUrl: 'https://dl.ndl.go.jp/pid/1303483',
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'partially_verified',
    verification: {
      content: 'verified',
      coordinate: 'reference_only',
      media: 'verified',
      license: 'verified',
      source: 'verified'
    },
    verifiedAt: {
      content: IMAGE_VERIFIED_AT,
      coordinate: null,
      media: IMAGE_VERIFIED_AT,
      license: IMAGE_VERIFIED_AT,
      source: IMAGE_VERIFIED_AT
    },
    verificationNote: 'IIIFマニフェストと画像URLをHTTP検証済み（2026-07-25）。保護期間満了のパブリックドメイン資料です。',
    materialType: 'pictorial_map',
    displayType: '名所絵・錦絵',
    positionAccuracy: 'reference_only',
    isHistorical: true,
    note: '堂島の米市を描いた名所絵です。中之島周辺の江戸期の賑わいを伝える参考資料です。'
  }
];

export const MATERIAL_TYPE_LABELS = {
  official_map: '公式地図',
  aerial_photo: '航空写真',
  historical_photo: '古写真',
  historical_map: '歴史地図・絵図',
  pictorial_map: '名所絵・錦絵',
  reconstruction: '復元・再構成',
  illustrative_image: 'イメージ画像'
};

export const OFFICIAL_HAZARD_LAYERS = {
  flood: {
    id: 'flood',
    name: '洪水浸水想定（想定最大規模）',
    tileUrl: 'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png',
    attribution: '国土交通省・国土地理院 重ねるハザードマップ（洪水）',
    sourceName: '国土交通省・国土地理院',
    sourceUrl: DATA_SOURCES.hazardOpenData,
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 2,
    maxNativeZoom: 17,
    note: '想定区域・浸水深は公表条件に基づく表示です。現在の警報や避難判断の代替ではありません。',
    legend: [
      { depth: '0.5m未満', color: '#fef0d9' },
      { depth: '0.5〜3.0m', color: '#fdcc8a' },
      { depth: '3.0〜5.0m', color: '#fc8d59' },
      { depth: '5.0m以上', color: '#d7301f' }
    ]
  },
  tsunami: {
    id: 'tsunami',
    name: '津波浸水想定',
    tileUrl: 'https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png',
    attribution: '国土交通省・国土地理院 重ねるハザードマップ（津波）',
    sourceName: '国土交通省・国土地理院',
    sourceUrl: DATA_SOURCES.hazardOpenData,
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    minZoom: 2,
    maxNativeZoom: 14,
    note: '地域・ズームによって提供範囲外になる場合があります。取得できない場合はデータなしと表示します。',
    legend: [
      { depth: '0.3m未満', color: '#e0f3f8' },
      { depth: '0.3〜1.0m', color: '#67a9cf' },
      { depth: '1.0〜3.0m', color: '#02818a' },
      { depth: '3.0m以上', color: '#014636' }
    ]
  },
  sediment: {
    id: 'sediment',
    name: '土砂災害（急傾斜地の崩壊・大阪府）',
    tileUrl: 'https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki_data/27/{z}/{x}/{y}.png',
    attribution: 'ハザードマップポータルサイト（大阪府・急傾斜地の崩壊）',
    sourceName: '国土交通省・国土地理院',
    sourceUrl: DATA_SOURCES.hazardOpenData,
    officialSource: 'ハザードマップポータルサイト オープンデータ配信',
    datasetName: '土砂災害警戒区域（急傾斜地の崩壊）',
    coverage: '大阪府（都道府県コード27）',
    usageStatus: 'attribution_required',
    verificationStatus: 'verified',
    verifiedAt: VERIFIED_AT,
    lastVerifiedAt: VERIFIED_AT,
    minZoom: 2,
    maxNativeZoom: 17,
    note: '国土地理院の公式一覧に掲載された大阪府27のタイルです。地域・ズームによりデータがない場合があります。',
    legend: [
      { depth: '土砂災害特別警戒区域', color: '#dc2626' },
      { depth: '土砂災害警戒区域', color: '#eab308' }
    ]
  }
};

const placeholderMedia = {
  title: '大阪の風景（開発用プレースホルダー）',
  date: null,
  era: null,
  sourceName: 'Unsplash',
  sourceUrl: 'https://unsplash.com',
  imageUrl: PLACEHOLDER_IMAGE_URL,
  license: '開発用プレースホルダー（利用条件・史料性は未確認）',
  licenseUrl: 'https://unsplash.com/license',
  usageStatus: 'unknown',
  materialType: 'illustrative_image',
  positionAccuracy: 'unknown',
  verifiedAt: VERIFIED_AT,
  isHistorical: false,
  note: '史料画像ではありません。実資料の確認後に差し替えます。'
};

const ndl八軒家 = HISTORICAL_REFERENCE_MATERIALS[0];
const ndl大坂図 = HISTORICAL_REFERENCE_MATERIALS[2];
const ndl道頓堀 = HISTORICAL_REFERENCE_MATERIALS[1];
const ndl住吉 = HISTORICAL_REFERENCE_MATERIALS[3];
const ndl安井天神山 = HISTORICAL_REFERENCE_MATERIALS[4];
const ndl堂島 = HISTORICAL_REFERENCE_MATERIALS[5];
const 大坂城跡整備計画 = {
  sourceName: '大阪市「特別史跡大坂城跡整備計画」',
  sourceUrl: 'https://www.city.osaka.lg.jp/keizaisenryaku/cmsfiles/contents/0000626/626611/9-4-2_seibikeikaku1-3_ann.pdf',
  claimStatus: 'verified'
};

export const SPOT_DATA = [
  {
    id: 'hist-1', name: '大阪城 天守閣（昭和6年復元）', category: 'history',
    coordinate: { latitude: 34.6873, longitude: 135.5260, elevationMeter: 24 }, era: 'showa', eraLabel: '昭和6年（1931年）',
    verificationStatus: 'unverified',
    verification: { content: 'unverified', coordinate: 'approximate', media: 'unverified', license: 'unverified', source: 'unverified' },
    summary: '現在の天守閣は1931年に再建されたものです。',
    description: '昭和6年（1931年）に再建された大阪城天守閣についての説明です。建築の経緯・復元の詳細は、下記の公式資料を確認してから確定表示します。',
    mediaAssets: [ndl大坂図], historicalMaterials: [ndl大坂図],
    source: '大阪城公式サイト（要追加確認）', license: '歴史記述・表示画像は要確認',
    sources: [{ sourceName: '未確認（要一次資料確認）', sourceUrl: null, claimStatus: 'unverified' }],
    verificationNote: '本文は要一次資料確認。表示画像は史料ではありません。'
  },
  {
    id: 'hist-2', name: '旧陸軍第四師団司令部庁舎（ミライザ大阪城）', category: 'history',
    coordinate: { latitude: 34.6865, longitude: 135.5252, elevationMeter: 22 }, era: 'showa', eraLabel: '昭和初期',
    verificationStatus: 'unverified',
    verification: { content: 'unverified', coordinate: 'approximate', media: 'unverified', license: 'unverified', source: 'unverified' },
    summary: '大阪城公園内に残る近代建築です。',
    description: '旧陸軍第四師団司令部庁舎に関する歴史記述は、一次資料の確認後に確定します。現在の表示画像はイメージ画像です。',
    mediaAssets: [], historicalMaterials: [],
    source: '未確認（要一次資料確認）', license: '未確認',
    sources: [{ sourceName: '未確認（要一次資料確認）', sourceUrl: null, claimStatus: 'unverified' }],
    verificationNote: '歴史記述・画像とも未確認です。'
  },
  {
    id: 'hist-3', name: '極楽橋・隠し曲輪跡', category: 'history',
    coordinate: { latitude: 34.6888, longitude: 135.5255, elevationMeter: 18 }, era: 'edo', eraLabel: '江戸期〜現在',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'unverified', license: 'unverified', source: 'verified' },
    summary: '大阪城北側の橋と周辺の変遷を学ぶスポットです。',
    description: '現在の極楽橋は平成12年（2000年）に架け替えられました。過去の建設・焼失については、公式資料の記載範囲を確認しながら表示します。',
    mediaAssets: [ndl大坂図], historicalMaterials: [ndl大坂図],
    source: '大阪城公式サイト（極楽橋）', license: '表示画像は開発用プレースホルダー',
    sources: [{ sourceName: '大阪城公式サイト', sourceUrl: 'https://osaka-castle.jp/osakajo/gokurakubashi.html', claimStatus: 'verified' }],
    verificationNote: '江戸期の絵図は参考資料であり、現代地図との位置一致は保証されません。'
  },
  {
    id: 'hist-4', name: '大阪城 大手門', category: 'history',
    coordinate: { latitude: 34.6850797, longitude: 135.5230501, elevationMeter: 16 }, era: 'edo', eraLabel: '江戸期〜現在',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '大阪城の大手口に建つ正門で、城内へ入る防御の要所です。',
    description: '城の正面を「大手」と呼び、その入口に設けられた門が大手門です。現在の門は大阪城に残る重要文化財の一つで、多聞櫓・千貫櫓と一体になった大手口の守りを現地で観察できます。',
    mediaAssets: [], historicalMaterials: [ndl大坂図],
    source: '大阪城観光ガイド（大手門）', license: '説明参照・座標はOpenStreetMap概略位置',
    sources: [
      大坂城跡整備計画,
      { sourceName: '大阪城観光ガイド（大手門）', sourceUrl: 'https://osaka-castle.jp/osakajo/otemon.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンはOpenStreetMapの地物中心を用いた概略位置です。門の通行を妨げない場所から確認してください。'
  },
  {
    id: 'hist-5', name: '大阪城 千貫櫓', category: 'history',
    coordinate: { latitude: 34.6856576, longitude: 135.5228967, elevationMeter: 17 }, era: 'edo', eraLabel: '元和6年（1620年）',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '大手口を守る隅櫓で、乾櫓と並ぶ大阪城最古級の建造物です。',
    description: '千貫櫓は大手門の西側にあり、大手口へ近づく人を監視・防御する位置に建っています。徳川幕府による大坂城再築初期の1620年に建てられた重要文化財です。大手門との位置関係に注目してみましょう。',
    mediaAssets: [], historicalMaterials: [ndl大坂図],
    source: '大阪城観光ガイド（千貫櫓）', license: '説明参照・座標はOpenStreetMap概略位置',
    sources: [
      大坂城跡整備計画,
      { sourceName: '大阪城観光ガイド（千貫櫓）', sourceUrl: 'https://osaka-castle.jp/osakajo/senganyagura.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンはOpenStreetMapの建物中心を用いた概略位置です。内部公開は開催時期が限られます。'
  },
  {
    id: 'hist-6', name: '大阪城 桜門', category: 'history',
    coordinate: { latitude: 34.6852235, longitude: 135.5256995, elevationMeter: 20 }, era: 'meiji', eraLabel: '明治20年（1887年）再建',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '本丸へ入る南側の正門で、天守を正面に望める地点です。',
    description: '桜門は本丸の正門にあたり、江戸期の門が焼失した後、1887年に再建されました。門を通る前後で、巨石を組んだ桝形と天守の見え方がどう変わるか観察できます。',
    mediaAssets: [], historicalMaterials: [ndl大坂図],
    source: '大阪城観光ガイド（桜門）', license: '説明参照・座標はOpenStreetMap概略位置',
    sources: [
      大坂城跡整備計画,
      { sourceName: '大阪城観光ガイド（桜門）', sourceUrl: 'https://osaka-castle.jp/osakajo/sakuramon.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンはOpenStreetMapの建物中心を用いた概略位置です。混雑時は立ち止まらず安全な場所から確認してください。'
  },
  {
    id: 'hist-7', name: '大阪城 乾櫓', category: 'history',
    coordinate: { latitude: 34.6879488, longitude: 135.5215032, elevationMeter: 14 }, era: 'edo', eraLabel: '元和6年（1620年）',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '西の丸北西の角に建つ、L字形の平面を持つ古い隅櫓です。',
    description: '乾櫓は城の北西、十二支の方角で「乾」にあたる位置にあります。千貫櫓と同じ1620年に建てられた大阪城最古級の重要文化財で、西外堀と北側を同時に見張る配置を現地で確かめられます。',
    mediaAssets: [], historicalMaterials: [ndl大坂図],
    source: '大阪城観光ガイド（乾櫓）', license: '説明参照・座標はOpenStreetMap概略位置',
    sources: [
      大坂城跡整備計画,
      { sourceName: '大阪城観光ガイド（乾櫓）', sourceUrl: 'https://osaka-castle.jp/osakajo/inuiyagura.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンはOpenStreetMapの建物中心を用いた概略位置です。西外堀側など安全な見学場所から確認してください。'
  },
  {
    id: 'hist-8', name: '大阪城 一番櫓', category: 'history',
    coordinate: { latitude: 34.6843389, longitude: 135.5279989, elevationMeter: 15 }, era: 'edo', eraLabel: '寛永5年（1628年）',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '南外堀東端に残る隅櫓で、七棟あった櫓のうち現存する一つです。',
    description: '二ノ丸南側には一番から七番までの隅櫓が並んでいました。現在残るのは一番櫓と六番櫓です。南外堀に沿って歩き、東西に離れた二つの櫓を見比べる周遊が楽しめます。',
    mediaAssets: [], historicalMaterials: [ndl大坂図],
    source: '大阪城観光ガイド（一番櫓）', license: '説明参照・座標はOpenStreetMap概略位置',
    sources: [
      大坂城跡整備計画,
      { sourceName: '大阪城観光ガイド（一番櫓）', sourceUrl: 'https://osaka-castle.jp/osakajo/ichibanyagura.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンはOpenStreetMapの建物中心を用いた概略位置です。堀越しに安全な場所から観察してください。'
  },
  {
    id: 'hist-9', name: '大阪城 六番櫓', category: 'history',
    coordinate: { latitude: 34.6841327, longitude: 135.5241608, elevationMeter: 15 }, era: 'edo', eraLabel: '寛永5年（1628年）',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '南外堀西側に残る隅櫓で、一番櫓と対になる現存建造物です。',
    description: '六番櫓は二ノ丸南側に並んでいた七棟のうち、西から六番目に位置した櫓です。外側に石落としや狭間を備えた防御建築で、一番櫓との距離からかつての城郭規模を感じられます。',
    mediaAssets: [], historicalMaterials: [ndl大坂図],
    source: '大阪城観光ガイド（六番櫓）', license: '説明参照・座標はOpenStreetMap概略位置',
    sources: [
      大坂城跡整備計画,
      { sourceName: '大阪城観光ガイド（六番櫓）', sourceUrl: 'https://osaka-castle.jp/osakajo/rokubanyagura.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンはOpenStreetMapの建物中心を用いた概略位置です。南外堀沿いの歩道から確認してください。'
  },
  {
    id: 'hist-10', name: '大阪城 金蔵', category: 'history',
    coordinate: { latitude: 34.6865438, longitude: 135.5264761, elevationMeter: 23 }, era: 'edo', eraLabel: '江戸期',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '幕府の金銀を保管した、本丸に残る重要文化財の土蔵です。',
    description: '金蔵は天守閣の東側にある、徳川幕府の金銀を保管した建物です。城の防御施設だけでなく、政治と財政を支える保管施設も本丸に置かれていたことが分かります。',
    mediaAssets: [], historicalMaterials: [ndl大坂図],
    source: '大阪城観光ガイド（金蔵）', license: '説明参照・座標はOpenStreetMap概略位置',
    sources: [
      大坂城跡整備計画,
      { sourceName: '大阪城観光ガイド（金蔵）', sourceUrl: 'https://osaka-castle.jp/osakajo/kinzo.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンはOpenStreetMapの建物中心を用いた概略位置です。建物内部へは入らず、公開範囲から観察してください。'
  },
  {
    id: 'comm-1', name: '旧京街道起点・八軒家浜', category: 'community',
    coordinate: { latitude: 34.6895, longitude: 135.5212, elevationMeter: 5.5 }, era: 'edo', eraLabel: '江戸後期',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'reference_only', license: 'verified', source: 'verified' },
    summary: '八軒家浜を描いたNDL公開の名所絵と大坂の歴史地図を閲覧できます。',
    description: '八軒家浜に関連する江戸期の名所絵を、現在地の説明と分けて表示します。名所絵・絵図は測量図ではないため、現代地図との位置一致は保証されません。',
    mediaAssets: [ndl八軒家], historicalMaterials: [ndl八軒家, ndl大坂図],
    source: ndl八軒家.sourceName, license: ndl八軒家.license,
    sources: [
      { sourceName: ndl八軒家.sourceName, sourceUrl: ndl八軒家.sourceUrl, claimStatus: 'verified' },
      { sourceName: ndl大坂図.sourceName, sourceUrl: ndl大坂図.sourceUrl, claimStatus: 'verified' }
    ],
    verificationNote: ndl八軒家.note
  },
  {
    id: 'comm-2', name: '旧大阪砲兵工廠跡地', category: 'community',
    coordinate: { latitude: 34.6880, longitude: 135.5310, elevationMeter: 11.5 }, era: 'meiji', eraLabel: '明治〜昭和期',
    verificationStatus: 'unverified',
    verification: { content: 'unverified', coordinate: 'approximate', media: 'unverified', license: 'unverified', source: 'unverified' },
    summary: '大阪城東部の土地利用の変化を調べる地域理解スポットです。',
    description: '旧大阪砲兵工廠に関する記述は、一次資料を確認してから確定します。明治期の位置精度を持つ大阪向けXYZタイルは未収録です。',
    mediaAssets: [], historicalMaterials: [],
    source: '未確認（要一次資料確認）', license: '未確認',
    sources: [{ sourceName: '未確認（要一次資料確認）', sourceUrl: null, claimStatus: 'unverified' }],
    verificationNote: '表示画像は史料ではありません。'
  },
  {
    id: 'comm-3', name: '難波宮跡（飛鳥・奈良時代）', category: 'community',
    coordinate: { latitude: 34.6808, longitude: 135.5198, elevationMeter: 12 }, era: 'asuka', eraLabel: '飛鳥〜奈良時代',
    verificationStatus: 'partially_verified',
    verification: { content: 'verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '前期・後期の宮殿跡が発掘された、古代大阪の政治の中心地です。',
    description: '難波宮は孝徳天皇の時代に都が置かれ、その後も副都として機能しました。現地では後期難波宮の大極殿基壇などが地表に示され、大阪城よりさらに古い時代の都市軸を体感できます。',
    mediaAssets: [], historicalMaterials: [],
    source: '大阪市中央区（難波宮跡）', license: '大阪市公式説明参照・座標は公園内の概略位置',
    sources: [{ sourceName: '大阪市中央区（難波宮跡）', sourceUrl: 'https://www.city.osaka.lg.jp/chuo/page/0000637375.html', claimStatus: 'verified' }],
    verificationNote: 'ARピンは公式所在地を基にした公園内の概略位置です。復元表示ではなく、現地の遺構表示を案内します。'
  },
  {
    id: 'comm-4', name: '大阪歴史博物館', category: 'community',
    coordinate: { latitude: 34.6826183, longitude: 135.5208131, elevationMeter: 16 }, era: 'present', eraLabel: '古代〜現代',
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'verified', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '難波宮から近現代まで、大阪の都市史を実物資料と復元展示でたどれる博物館です。',
    description: '大阪歴史博物館は難波宮跡のサイトミュージアムとしての役割を担い、古代から近現代までの大阪を紹介しています。ARで周辺を歩いた後、現地で見えない地下遺構や都市の変化を展示で深める到達地点にできます。',
    mediaAssets: [], historicalMaterials: [],
    source: '大阪歴史博物館公式サイト', license: '公式説明参照・座標はOpenStreetMap地物位置',
    sources: [
      { sourceName: '大阪歴史博物館（館の概要）', sourceUrl: 'https://www.osakamushis.jp/about/brief.html', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: '開館日・料金・展示内容は変更されるため、来館前に公式サイトで最新情報を確認してください。'
  },
  {
    id: 'hist-11', name: '四天王寺', category: 'history',
    coordinate: { latitude: 34.6537001, longitude: 135.5137442, elevationMeter: 18 }, era: 'asuka', eraLabel: '推古元年（593年）創建',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '聖徳太子が建立した日本最古の官寺の一つで、上町台地南部の起点です。',
    description: '四天王寺は593年に聖徳太子により建立されたと伝わり、日本仏教史の出発点に位置づけられるお寺です。中門・五重塔・金堂・講堂が南北一直線に並ぶ「四天王寺式伽藍配置」は、大阪の都市軸の原型としても知られます。境内は無料で歩けます（一部拝観有料）。',
    mediaAssets: [], historicalMaterials: [],
    source: '和宗総本山 四天王寺 公式サイト', license: '公式説明参照・座標はOpenStreetMap概略位置',
    sources: [
      { sourceName: '和宗総本山 四天王寺 公式サイト', sourceUrl: 'https://www.shitennoji.or.jp/', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンは境内周辺の概略位置です。伽藍への立ち入り区分・拝観時間は公式サイトで確認してください。'
  },
  {
    id: 'hist-12', name: '生國魂神社（いくくにたま）', category: 'history',
    coordinate: { latitude: 34.665303, longitude: 135.5126698, elevationMeter: 20 }, era: 'ancient', eraLabel: '神武天皇東征伝承・上町台地の総鎮守',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '「大坂」の地名を生んだと伝わる、上町台地の総鎮守です。',
    description: '生國魂神社は、神武天皇が難波碕に生島神・足島神をお祀りしたことに始まると伝わる古社です。もとは大坂城の場所にありましたが、豊臣秀吉の築城に伴い現在地（天王寺区生玉町）へ遷座しました。井原西鶴の像や上方落語の寄席「生玉さん」でも親しまれています。',
    mediaAssets: [], historicalMaterials: [],
    source: '難波大社 生國魂神社 公式サイト', license: '公式説明参照・座標はOpenStreetMap概略位置',
    sources: [
      { sourceName: '難波大社 生國魂神社 公式サイト', sourceUrl: 'https://ikutamajinja.jp/', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンは社殿周辺の概略位置です。祭事・境内立入時間は公式サイトで確認してください。'
  },
  {
    id: 'hist-13', name: '高津宮（こうづぐう）', category: 'history',
    coordinate: { latitude: 34.6688534, longitude: 135.5139029, elevationMeter: 22 }, era: 'ancient', eraLabel: '仁徳天皇・高津宮伝承地',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '仁徳天皇の「高津宮」ゆかりの神社で、上方落語「高津の富」でも知られます。',
    description: '高津宮は、仁徳天皇が難波高津宮を営まれた故事にちなんで祀られた古社です。境内の高台からは、かつて大阪湾を望んだと伝わる「絵馬堂」からの眺めが名所として知られます。落語「高津の富」の舞台でもあり、上町台地の文化と芸能が交わる場所です。',
    mediaAssets: [], historicalMaterials: [],
    source: '高津宮 公式サイト', license: '公式説明参照・座標はOpenStreetMap概略位置',
    sources: [
      { sourceName: '高津宮 公式サイト', sourceUrl: 'https://www.kouzu.or.jp/', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンは社殿周辺の概略位置です。境内立入時間・行事は公式サイトで確認してください。'
  },
  {
    id: 'hist-14', name: '大阪天満宮', category: 'history',
    coordinate: { latitude: 34.6960904, longitude: 135.5127654, elevationMeter: 6 }, era: 'heian', eraLabel: '天暦3年（949年）創建',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '菅原道真公を祀る「天満の天神さん」。日本三大祭・天神祭の中心地です。',
    description: '大阪天満宮は、大将軍社の跡地に菅原道真公を祀って949年に創建されたと伝わります。毎年7月24・25日の天神祭は日本三大祭の一つで、大川を舞台にした船渡御と奉納花火で知られます。北区の南端にあり、大阪城・上町台地の北にもう一本の歴史軸を作っています。',
    mediaAssets: [], historicalMaterials: [],
    source: '大阪天満宮 公式サイト', license: '公式説明参照・座標はOpenStreetMap概略位置',
    sources: [
      { sourceName: '大阪天満宮 公式サイト', sourceUrl: 'https://osakatemmangu.or.jp/', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンは社殿周辺の概略位置です。天神祭の交通規制や境内立入時間は公式サイトで確認してください。'
  },
  {
    id: 'hist-15', name: '住吉大社', category: 'history',
    coordinate: { latitude: 34.6130027, longitude: 135.4931012, elevationMeter: 6 }, era: 'ancient', eraLabel: '神功皇后・全国住吉神社の総本社',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '全国約2,300社の住吉神社の総本社で、「住吉造」の本殿で知られます。',
    description: '住吉大社は、航海の守り神として信仰を集めてきた全国の住吉神社の総本社です。第一〜第四本宮が特徴的な「住吉造」で並び、境内の反橋（太鼓橋）も名所として親しまれています。大阪城・上町台地の南の玄関口として、街の広がりを実感できるスポットです。',
    mediaAssets: [ndl住吉], historicalMaterials: [ndl住吉],
    source: '住吉大社 公式サイト', license: '公式説明参照・座標はOpenStreetMap概略位置',
    sources: [
      { sourceName: '住吉大社 公式サイト', sourceUrl: 'https://www.sumiyoshitaisha.net/', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンは社殿周辺の概略位置です。参拝時間・祭事は公式サイトで確認してください。'
  },
  {
    id: 'comm-5', name: '適塾（緒方洪庵旧宅及び塾）', category: 'community',
    coordinate: { latitude: 34.69138, longitude: 135.503159, elevationMeter: 4 }, era: 'edo', eraLabel: '天保9年（1838年）開塾',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '緒方洪庵が開いた蘭学塾で、近代大阪の学問を象徴する史跡です。',
    description: '適塾は蘭方医・緒方洪庵が1838年に開いた蘭学の私塾で、福澤諭吉や大村益次郎らが学びました。現在の建物は国の重要文化財・史跡に指定され、大阪大学が管理しています。北浜の町家が残るこの一帯は、近代日本の学問と医学の出発点の一つです。',
    mediaAssets: [], historicalMaterials: [],
    source: '大阪大学 適塾記念センター', license: '公式説明参照・座標は住所からの概略位置',
    sources: [
      { sourceName: '大阪大学 適塾記念センター', sourceUrl: 'https://www.tekijuku.osaka-u.ac.jp/', claimStatus: 'verified' },
      { sourceName: '国土地理院 住所検索', sourceUrl: DATA_SOURCES.gsiTileList, claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンは所在地（北浜3-3-8）からの概略位置です。開館日・料金は公式サイトで確認してください。'
  },
  {
    id: 'comm-6', name: '大阪市中央公会堂', category: 'community',
    coordinate: { latitude: 34.6935404, longitude: 135.5040087, elevationMeter: 3 }, era: 'taisho', eraLabel: '大正7年（1918年）竣工',
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'verified', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '中之島に建つ大正期のネオ・ルネサンス建築で、国の重要文化財です。',
    description: '大阪市中央公会堂は、株式仲買人・岩本栄之助の寄付をもとに1918年に完成した公会堂です。赤レンガと石を組み合わせたネオ・ルネサンス様式の外観が中之島の景観を象徴し、国の重要文化財に指定されています。水都・大阪の近代を体感できる到達点です。',
    mediaAssets: [ndl堂島], historicalMaterials: [ndl堂島],
    source: '大阪市中央公会堂 公式サイト', license: '公式説明参照・座標はOpenStreetMap地物位置',
    sources: [
      { sourceName: '大阪市中央公会堂 公式サイト', sourceUrl: 'https://osaka-chuokokaido.jp/', claimStatus: 'verified' },
      { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
    ],
    verificationNote: '開館日・イベント・見学可否は変更されるため、来館前に公式サイトで最新情報を確認してください。'
  },
  {
    id: 'hist-16', name: '三光神社（真田の抜け穴伝承地）', category: 'history',
    coordinate: { latitude: 34.6742, longitude: 135.5265, elevationMeter: 18 }, era: 'sengoku', eraLabel: '大坂の陣（1614〜1615年）伝承',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '「真田の抜け穴」と伝わる穴が残る、真田丸跡とされる丘の神社です。',
    description: '三光神社は玉造の丘に建ち、大坂の陣で真田信繁（幸村）が築いた出丸「真田丸」があったとされる一帯に位置します。境内には真田信繁の像と、大坂城へ通じていたと伝わる「真田の抜け穴」の穴口が残ります。大阪城の南に築かれた防衛線を、現地の高低差とともに体感できるスポットです。',
    mediaAssets: [], historicalMaterials: [],
    source: '三光神社 公式サイト', license: '公式説明参照・座標は住所からの概略位置',
    sources: [
      { sourceName: '三光神社 公式サイト', sourceUrl: 'https://www.sankoujinja.com/', claimStatus: 'verified' }
    ],
    verificationNote: '「真田の抜け穴」および真田丸の正確な位置は伝承であり、史実として確定した遺構ではありません。ARピンは所在地（天王寺区玉造本町14-90）からの概略位置です。抜け穴は通常は鉄格子越しの見学で、例年11月の真田祭の際に開放されます。'
  },
  {
    id: 'hist-17', name: '安居神社（真田幸村戦死跡伝承地）', category: 'history',
    coordinate: { latitude: 34.6558, longitude: 135.5100, elevationMeter: 16 }, era: 'sengoku', eraLabel: '慶長20年（1615年）大坂夏の陣',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '大坂夏の陣で真田幸村が最期を迎えたと伝わる、天王寺の高台の神社です。',
    description: '安居神社は、大坂夏の陣（1615年）の最終局面で真田信繁（幸村）が戦い疲れて休んでいたところを討たれたと伝わる場所です。境内には「真田幸村戦死跡之碑」と像が建てられています。三光神社（真田丸跡）から一心寺・茶臼山へと続く上町台地の南端は、大坂の陣の激戦地をたどる道筋にあたります。',
    mediaAssets: [ndl安井天神山], historicalMaterials: [ndl安井天神山],
    source: '大阪市公式サイト（真田幸村戦死跡之碑）', license: '公式説明参照・座標は住所からの概略位置',
    sources: [
      { sourceName: '大阪市（真田幸村戦死跡之碑）', sourceUrl: 'https://www.city.osaka.lg.jp/kensetsu/page/0000009754.html', claimStatus: 'verified' }
    ],
    verificationNote: '戦死の場所は大阪市の公式案内でも「討死したという」伝承として紹介されており、史実として確定した地点ではありません。ARピンは所在地（天王寺区逢坂1-3-24）からの概略位置です。'
  },
  {
    id: 'hist-18', name: '一心寺', category: 'history',
    coordinate: { latitude: 34.6560, longitude: 135.5093, elevationMeter: 15 }, era: 'edo', eraLabel: '文治元年（1185年）創建・大坂の陣ゆかり',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '「お骨佛（こつぶつ）の寺」として知られ、大坂の陣の徳川方本陣が置かれた寺です。',
    description: '一心寺は納められた遺骨で阿弥陀仏像を造立する「お骨佛」で広く知られるお寺です。大坂冬の陣では徳川家康の本陣が置かれ、夏の陣で戦死した家康の孫・本多忠朝の墓が残ります。安居神社・茶臼山とあわせて、大坂の陣で徳川方と豊臣方が対峙した上町台地南端の地形を歩いて確かめられます。',
    mediaAssets: [], historicalMaterials: [],
    source: '一心寺 公式サイト', license: '公式説明参照・座標は住所からの概略位置',
    sources: [
      { sourceName: '一心寺 公式サイト', sourceUrl: 'https://www.isshinji.or.jp/', claimStatus: 'verified' }
    ],
    verificationNote: 'ARピンは所在地（天王寺区逢阪2-8-69）からの概略位置です。受付時間は9時〜16時で、法要日は混雑します。'
  },
  {
    id: 'disaster-1', name: '寝屋川・大川周辺の洪水浸水想定', category: 'disaster',
    coordinate: { latitude: 34.6890, longitude: 135.5220, elevationMeter: 3.2 },
    verificationStatus: 'verified',
    isAreaHazard: true,
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'not_applicable', license: 'verified', source: 'verified' },
    hazardInfo: { type: 'flood', typeName: '洪水浸水想定', description: '地図上に国土交通省・国土地理院の公式洪水タイルを重ねます。地点の深さは地図の凡例と原典で確認してください。' },
    summary: '公式洪水浸水想定タイルを表示します。',
    description: 'このアプリの表示は防災情報の入口です。現在の警報・避難指示は自治体の最新情報を確認してください。',
    mediaAssets: [], historicalMaterials: [], sources: [{ sourceName: '国土交通省・国土地理院', sourceUrl: DATA_SOURCES.hazardOpenData, claimStatus: 'verified' }],
    verificationNote: '地図タイルの提供範囲外ではデータなしと表示します。'
  },
  {
    id: 'disaster-2', name: '大阪市内の津波浸水想定', category: 'disaster',
    coordinate: { latitude: 34.6860, longitude: 135.5200, elevationMeter: 4.1 },
    verificationStatus: 'verified',
    isAreaHazard: true,
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'not_applicable', license: 'verified', source: 'verified' },
    hazardInfo: { type: 'tsunami', typeName: '津波浸水想定', description: '地図上に国土交通省・国土地理院の公式津波タイルを重ねます。地域・ズームによってデータがない場合があります。' },
    summary: '公式津波浸水想定タイルを表示します。',
    description: '地震・津波時は自治体の最新の避難情報に従ってください。表示タイルは想定情報であり、現在の警報ではありません。',
    mediaAssets: [], historicalMaterials: [], sources: [{ sourceName: '国土交通省・国土地理院', sourceUrl: DATA_SOURCES.hazardOpenData, claimStatus: 'verified' }],
    verificationNote: '地図タイルの提供範囲外ではデータなしと表示します。'
  }
];

// 避難所データは全て未検証。座標は住所からの概算であり公式データではない。
// 公式一次資料（大阪市避難所一覧等）で確認するまでユーザーへの避難誘導に使用しない。
export const EVACUATION_SHELTERS = [
  { id: 'shelter-1', name: '追手門学院大手前中・高等学校', address: '大阪市中央区大手前1-3-20', coordinate: { latitude: 34.6858, longitude: 135.5235 }, elevationMeter: 15.2, types: ['要確認'], capacity: null, source: '大阪市の最新避難所情報を確認してください', usageStatus: 'unknown', verificationStatus: 'unverified', coordinateSource: '住所から概算（公式データではない）' },
  { id: 'shelter-2', name: '大阪城公園', address: '大阪市中央区大阪城1', coordinate: { latitude: 34.6870, longitude: 135.5280 }, elevationMeter: 22.5, types: ['要確認'], capacity: null, source: '大阪市の最新避難所情報を確認してください', usageStatus: 'unknown', verificationStatus: 'unverified', coordinateSource: '住所から概算（公式データではない）' },
  { id: 'shelter-3', name: '開平小学校', address: '大阪市中央区北浜東2-4', coordinate: { latitude: 34.6892, longitude: 135.5140 }, elevationMeter: 6.8, types: ['要確認'], capacity: null, source: '大阪市の最新避難所情報を確認してください', usageStatus: 'unknown', verificationStatus: 'unverified', coordinateSource: '住所から概算（公式データではない）' }
];

// 機能ごとに要求する検証条件。各機能で必要な軸だけを見て可否を判定する。
//   ar_pin        : ARピン表示     → 座標が確認済み（少なくとも概略以上）
//   history_card  : 歴史解説カード → 内容・出典が確認済み
//   media_display : 画像表示       → 画像URL・権利が確認済み
//   ar_compare    : AR画像比較     → 画像＋位置関係が確認済み
//   evac_guide    : 避難誘導       → 公式座標＋対象災害が確認済み
export const FEATURE_VERIFICATION_RULES = {
  ar_pin:        { requires: ['coordinate'], accept: { coordinate: ['verified', 'georeferenced', 'survey_accurate', 'approximate'] } },
  history_card:  { requires: ['content', 'source'], accept: { content: ['verified', 'partially_verified'], source: ['verified'] } },
  media_display: { requires: ['media', 'license'], accept: { media: ['verified'], license: ['verified'] } },
  ar_compare:    { requires: ['media', 'coordinate'], accept: { media: ['verified'], coordinate: ['georeferenced', 'survey_accurate', 'verified'] } },
  evac_guide:    { requires: ['coordinate', 'source'], accept: { coordinate: ['verified', 'survey_accurate'], source: ['verified'] } }
};

// 直感的な信頼度ラベル（ユーザー向け）
export const TRUST_LABELS = {
  verified:            { icon: '✓', text: '公式資料確認済み', className: 'trust-verified' },
  partially_verified:  { icon: '◐', text: '一部確認済み', className: 'trust-partial' },
  reference_only:      { icon: '◇', text: '参考資料', className: 'trust-reference' },
  non_survey:          { icon: '◇', text: '非測量絵図（参考）', className: 'trust-reference' },
  reconstruction:      { icon: '◇', text: '復元イメージ', className: 'trust-reference' },
  unverified:          { icon: '△', text: '未確認情報を含む', className: 'trust-unverified' }
};
