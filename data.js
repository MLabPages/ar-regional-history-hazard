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

const NDL_PDM_LICENSE = 'PDM（NDL IIIFマニフェスト記載）';

export const HISTORICAL_REFERENCE_MATERIALS = [
  {
    id: 'ndl-1303484',
    title: '浪花名所図会 八けん屋着船之図',
    date: '江戸後期（年代未詳）',
    era: '江戸後期',
    sourceName: '国立国会図書館デジタルコレクション',
    sourceUrl: 'https://dl.ndl.go.jp/pid/1303484',
    manifestUrl: 'https://dl.ndl.go.jp/api/iiif/1303484/manifest.json',
    imageUrl: null,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: false,
    imageUrlVerified: false,
    verificationStatus: 'partially_verified',
    verificationNote: 'PID・年代・PDMは確認済み。マニフェストと個別画像リソースは本番環境からのHTTP検証後に表示します。現在はNDL資料ページとIIIFマニフェストへのリンクを提供します。',
    materialType: 'pictorial_map',
    displayType: '名所絵・錦絵',
    positionAccuracy: 'reference_only',
    verifiedAt: VERIFIED_AT,
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
    imageUrl: null,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: false,
    imageUrlVerified: false,
    verificationStatus: 'partially_verified',
    verificationNote: 'PID・年代・PDMは確認済み。マニフェストと個別画像リソースは本番環境からのHTTP検証後に表示します。現在はNDL資料ページとIIIFマニフェストへのリンクを提供します。',
    materialType: 'pictorial_map',
    displayType: '名所絵・錦絵',
    positionAccuracy: 'reference_only',
    verifiedAt: VERIFIED_AT,
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
    imageUrl: null,
    license: NDL_PDM_LICENSE,
    licenseUrl: DATA_SOURCES.ndlIiifHelp,
    usageStatus: 'verified_reusable',
    metadataVerified: true,
    manifestVerified: false,
    imageUrlVerified: false,
    verificationStatus: 'partially_verified',
    verificationNote: 'PID・年代・PDMは確認済み。マニフェストと個別画像リソースは本番環境からのHTTP検証後に表示します。現在はNDL資料ページとIIIFマニフェストへのリンクを提供します。',
    materialType: 'historical_map',
    displayType: '歴史地図・絵図',
    positionAccuracy: 'reference_only',
    verifiedAt: VERIFIED_AT,
    isHistorical: true,
    note: '江戸期の絵図です。概略位置の参考資料であり、現代地図との位置一致は保証されません。'
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

export const SPOT_DATA = [
  {
    id: 'hist-1', name: '大阪城 天守閣（昭和6年復元）', category: 'history',
    coordinate: { latitude: 34.6873, longitude: 135.5260, elevationMeter: 24 }, era: 'showa', eraLabel: '昭和6年（1931年）',
    verificationStatus: 'unverified',
    summary: '現在の天守閣は1931年に再建されたものです。',
    description: '昭和6年（1931年）に再建された大阪城天守閣についての説明です。建築の経緯・復元の詳細は、下記の公式資料を確認してから確定表示します。',
    mediaAssets: [placeholderMedia], historicalMaterials: [ndl大坂図],
    source: '大阪城公式サイト（要追加確認）', license: '歴史記述・表示画像は要確認',
    sources: [{ sourceName: '未確認（要一次資料確認）', sourceUrl: null, claimStatus: 'unverified' }],
    verificationNote: '本文は要一次資料確認。表示画像は史料ではありません。'
  },
  {
    id: 'hist-2', name: '旧陸軍第四師団司令部庁舎（ミライザ大阪城）', category: 'history',
    coordinate: { latitude: 34.6865, longitude: 135.5252, elevationMeter: 22 }, era: 'showa', eraLabel: '昭和初期',
    verificationStatus: 'unverified',
    summary: '大阪城公園内に残る近代建築です。',
    description: '旧陸軍第四師団司令部庁舎に関する歴史記述は、一次資料の確認後に確定します。現在の表示画像はイメージ画像です。',
    mediaAssets: [placeholderMedia], historicalMaterials: [],
    source: '未確認（要一次資料確認）', license: '未確認',
    sources: [{ sourceName: '未確認（要一次資料確認）', sourceUrl: null, claimStatus: 'unverified' }],
    verificationNote: '歴史記述・画像とも未確認です。'
  },
  {
    id: 'hist-3', name: '極楽橋・隠し曲輪跡', category: 'history',
    coordinate: { latitude: 34.6888, longitude: 135.5255, elevationMeter: 18 }, era: 'edo', eraLabel: '江戸期〜現在',
    verificationStatus: 'partially_verified',
    summary: '大阪城北側の橋と周辺の変遷を学ぶスポットです。',
    description: '現在の極楽橋は平成12年（2000年）に架け替えられました。過去の建設・焼失については、公式資料の記載範囲を確認しながら表示します。',
    mediaAssets: [placeholderMedia], historicalMaterials: [ndl大坂図],
    source: '大阪城公式サイト（極楽橋）', license: '表示画像は開発用プレースホルダー',
    sources: [{ sourceName: '大阪城公式サイト', sourceUrl: 'https://osaka-castle.jp/osakajo/gokurakubashi.html', claimStatus: 'verified' }],
    verificationNote: '江戸期の絵図は参考資料であり、現代地図との位置一致は保証されません。'
  },
  {
    id: 'comm-1', name: '旧京街道起点・八軒家浜', category: 'community',
    coordinate: { latitude: 34.6895, longitude: 135.5212, elevationMeter: 5.5 }, era: 'edo', eraLabel: '江戸後期',
    verificationStatus: 'partially_verified',
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
    summary: '大阪城東部の土地利用の変化を調べる地域理解スポットです。',
    description: '旧大阪砲兵工廠に関する記述は、一次資料を確認してから確定します。明治期の位置精度を持つ大阪向けXYZタイルは未収録です。',
    mediaAssets: [placeholderMedia], historicalMaterials: [],
    source: '未確認（要一次資料確認）', license: '未確認',
    sources: [{ sourceName: '未確認（要一次資料確認）', sourceUrl: null, claimStatus: 'unverified' }],
    verificationNote: '表示画像は史料ではありません。'
  },
  {
    id: 'comm-3', name: '難波宮跡（飛鳥・奈良時代）', category: 'community',
    coordinate: { latitude: 34.6800, longitude: 135.5250, elevationMeter: 10 }, era: 'asuka', eraLabel: '飛鳥〜奈良時代',
    verificationStatus: 'unverified',
    summary: '古代の難波宮跡を地域理解の入口として紹介します。',
    description: '難波宮跡に関する詳しい年代・建物復元は、公式文化財資料を確認してから確定します。表示画像はイメージ画像です。',
    mediaAssets: [placeholderMedia], historicalMaterials: [],
    source: '未確認（要一次資料確認）', license: '未確認',
    sources: [{ sourceName: '未確認（要一次資料確認）', sourceUrl: null, claimStatus: 'unverified' }],
    verificationNote: '歴史記述・画像とも未確認です。'
  },
  {
    id: 'disaster-1', name: '寝屋川・大川周辺の洪水浸水想定', category: 'disaster',
    coordinate: { latitude: 34.6890, longitude: 135.5220, elevationMeter: 3.2 },
    verificationStatus: 'verified',
    isAreaHazard: true,
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
