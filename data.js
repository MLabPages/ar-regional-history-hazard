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


// 現況写真（ウィキメディア・コモンズ）。ライセンスは1件ずつ個別確認し、
// 商用利用可のもののみ採用。CC BY / CC BY-SA は撮影者表示が必要なため author を保持する。
export const PRESENT_PHOTOS = {
  'hist-11': {
    title: '四天王寺（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Shitennoji06s3200.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Shitennoji06s3200.jpg/1280px-Shitennoji06s3200.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Shitennoji06s3200.jpg/1280px-Shitennoji06s3200.jpg',
    attribution: '663highland（CC BY 2.5）',
    author: '663highland',
    license: 'CC BY 2.5',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:Shitennoji06s3200.jpg',
    usageStatus: 'verified_reusable',
    attributionRequired: true,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC BY 2.5・商用利用可）。著作者表示が必要な条件のため、撮影者名を常時表示します。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  },
  'hist-15': {
    title: '住吉大社（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sumiyoshi-taisha,_keidai-2.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sumiyoshi-taisha%2C_keidai-2.jpg/1280px-Sumiyoshi-taisha%2C_keidai-2.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sumiyoshi-taisha%2C_keidai-2.jpg/1280px-Sumiyoshi-taisha%2C_keidai-2.jpg',
    attribution: 'Saigen Jiro（CC0）',
    author: 'Saigen Jiro',
    license: 'CC0',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:Sumiyoshi-taisha,_keidai-2.jpg',
    usageStatus: 'verified_reusable',
    attributionRequired: false,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC0・商用利用可）。CC0のため権利者表示は不要ですが、出所を明示しています。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  },
  'comm-6': {
    title: '大阪市中央公会堂（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Osaka_Nakanoshima_Public_Hall.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Osaka_Nakanoshima_Public_Hall.jpg/1280px-Osaka_Nakanoshima_Public_Hall.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Osaka_Nakanoshima_Public_Hall.jpg/1280px-Osaka_Nakanoshima_Public_Hall.jpg',
    attribution: 'Sakai Yayoi（CC0）',
    author: 'Sakai Yayoi',
    license: 'CC0',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:Osaka_Nakanoshima_Public_Hall.jpg',
    usageStatus: 'verified_reusable',
    attributionRequired: false,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC0・商用利用可）。CC0のため権利者表示は不要ですが、出所を明示しています。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  },
  'hist-14': {
    title: '大阪天満宮（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:%C3%94saka-ten%27man-g%C3%BB_Shint%C3%B4_Shrine_-_Haiden_Sanctuary.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/%C3%94saka-ten%27man-g%C3%BB_Shint%C3%B4_Shrine_-_Haiden_Sanctuary.jpg/1280px-%C3%94saka-ten%27man-g%C3%BB_Shint%C3%B4_Shrine_-_Haiden_Sanctuary.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/%C3%94saka-ten%27man-g%C3%BB_Shint%C3%B4_Shrine_-_Haiden_Sanctuary.jpg/1280px-%C3%94saka-ten%27man-g%C3%BB_Shint%C3%B4_Shrine_-_Haiden_Sanctuary.jpg',
    attribution: 'Yanajin33（CC BY-SA 3.0）',
    author: 'Yanajin33',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:%C3%94saka-ten%27man-g%C3%BB_Shint%C3%B4_Shrine_-_Haiden_Sanctuary.jpg',
    usageStatus: 'verified_reusable',
    attributionRequired: true,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC BY-SA 3.0・商用利用可）。著作者表示が必要な条件のため、撮影者名を常時表示します。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  },
  'comm-3': {
    title: '難波宮（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Naniwa-no-miya-ato,_zenkei-2.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Naniwa-no-miya-ato%2C_zenkei-2.jpg/1280px-Naniwa-no-miya-ato%2C_zenkei-2.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Naniwa-no-miya-ato%2C_zenkei-2.jpg/1280px-Naniwa-no-miya-ato%2C_zenkei-2.jpg',
    attribution: 'Saigen Jiro（CC0）',
    author: 'Saigen Jiro',
    license: 'CC0',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:Naniwa-no-miya-ato,_zenkei-2.jpg',
    usageStatus: 'verified_reusable',
    attributionRequired: false,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC0・商用利用可）。CC0のため権利者表示は不要ですが、出所を明示しています。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  },
  'hist-18': {
    title: '一心寺（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Isshinji-hondo1.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Isshinji-hondo1.jpg/1280px-Isshinji-hondo1.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Isshinji-hondo1.jpg/1280px-Isshinji-hondo1.jpg',
    attribution: 'KENPEI（CC BY-SA 3.0）',
    author: 'KENPEI',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:Isshinji-hondo1.jpg',
    usageStatus: 'verified_reusable',
    attributionRequired: true,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC BY-SA 3.0・商用利用可）。著作者表示が必要な条件のため、撮影者名を常時表示します。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  },
  'hist-12': {
    title: '生國魂神社（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ikukunitama-jinja_haiden-2.JPG',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ikukunitama-jinja_haiden-2.JPG/1280px-Ikukunitama-jinja_haiden-2.JPG',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ikukunitama-jinja_haiden-2.JPG/1280px-Ikukunitama-jinja_haiden-2.JPG',
    attribution: 'Saigen Jiro（CC0）',
    author: 'Saigen Jiro',
    license: 'CC0',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:Ikukunitama-jinja_haiden-2.JPG',
    usageStatus: 'verified_reusable',
    attributionRequired: false,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC0・商用利用可）。CC0のため権利者表示は不要ですが、出所を明示しています。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  },
  'hist-13': {
    title: '高津宮（現在の様子）',
    date: null,
    era: 'present',
    sourceName: 'ウィキメディア・コモンズ',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:%E9%AB%98%E6%B4%A5%E5%AE%AE.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/%E9%AB%98%E6%B4%A5%E5%AE%AE.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/%E9%AB%98%E6%B4%A5%E5%AE%AE.jpg',
    attribution: '久次米一弥（CC BY-SA 3.0）',
    author: '久次米一弥',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://commons.wikimedia.org/wiki/File:',
    licenseSourceUrl: 'https://commons.wikimedia.org/wiki/File:%E9%AB%98%E6%B4%A5%E5%AE%AE.jpg',
    usageStatus: 'verified_reusable',
    attributionRequired: true,
    metadataVerified: true,
    manifestVerified: true,
    imageUrlVerified: true,
    verificationStatus: 'verified',
    verification: { content: 'verified', coordinate: 'not_applicable', media: 'verified', license: 'verified', source: 'verified' },
    verifiedAt: { content: IMAGE_VERIFIED_AT, coordinate: null, media: IMAGE_VERIFIED_AT, license: IMAGE_VERIFIED_AT, source: IMAGE_VERIFIED_AT },
    verificationNote: 'ウィキメディア・コモンズでライセンスを個別確認済み（CC BY-SA 3.0・商用利用可）。著作者表示が必要な条件のため、撮影者名を常時表示します。',
    materialType: 'present_photo',
    displayType: '現況写真',
    positionAccuracy: 'reference_only',
    isHistorical: false,
    isPresentPhoto: true,
    note: '現在の様子を撮影した写真です。史料ではありません。'
  }
};

export const MATERIAL_TYPE_LABELS = {
  official_map: '公式地図',
  present_photo: '現況写真',
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

// 全国の文化拠点。由緒は各社寺・自治体・城郭公式案内、座標は境内・城域周辺の概略位置を参照。
// 2026-08-13: 四国遍路・出羽三山・北海道の宗教拠点と城郭を追加。
const makeNationalSpot = ({
  id, name, category, region, coordinate, era, eraLabel, summary, description,
  sourceName, sourceUrl, religiousType, castleType, verificationNote
}) => ({
  id, name, category, region,
  ...(religiousType ? { religiousType } : {}),
  ...(castleType ? { castleType } : {}),
  coordinate: { ...coordinate },
  era, eraLabel,
  verificationStatus: 'partially_verified',
  verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
  summary,
  description,
  mediaAssets: [],
  historicalMaterials: [],
  source: sourceName,
  license: `公式説明参照・座標は${category === 'castle' ? '城域' : '境内'}周辺の概略位置`,
  sources: [
    { sourceName, sourceUrl, claimStatus: 'verified' },
    { sourceName: 'OpenStreetMap', sourceUrl: DATA_SOURCES.osmCopyright, claimStatus: 'verified' }
  ],
  verificationNote: verificationNote || `ARピンは${category === 'castle' ? '城域' : '境内'}周辺の概略位置です。開館・参拝時間や立入制限は公式サイトで確認してください。`
});

const NATIONAL_CULTURAL_SPOTS = [
  // 寺社・霊場（全国）
  makeNationalSpot({ id: 'religious-7', name: '中尊寺', category: 'religious', region: '東北', coordinate: { latitude: 39.0014, longitude: 141.0994, elevationMeter: 165 }, era: 'heian', eraLabel: '嘉祥3年（850年）開山・平泉の仏教文化', religiousType: '寺院・天台宗東北大本山', summary: '奥州藤原氏が平和な仏国土を願って整えた、平泉を代表する寺院です。', description: '中尊寺は850年に開かれ、12世紀初めに奥州藤原氏初代・清衡が大規模な堂塔を造営しました。戦乱で亡くなった人々を敵味方なく供養し、東北に仏国土を築くという願いを伝える宗教拠点です。', sourceName: '中尊寺 公式サイト（御由緒）', sourceUrl: 'https://www.chusonji.or.jp/know/', verificationNote: 'ARピンは金色堂を含む境内周辺の概略位置です。拝観時間・入山料は公式サイトで確認してください。' }),
  makeNationalSpot({ id: 'religious-8', name: '瑞巌寺', category: 'religious', region: '東北', coordinate: { latitude: 38.3679, longitude: 141.0615, elevationMeter: 8 }, era: 'edo', eraLabel: '慶長14年（1609年）伊達政宗による再興', religiousType: '寺院・臨済宗妙心寺派', summary: '松島の景観と一体になった、伊達政宗の菩提寺です。', description: '瑞巌寺は松島に伝わる古刹を伊達政宗が再興し、1609年に完成した寺院です。国宝の本堂や庫裏を通じて、奥州の霊場と近世大名文化が重なった場所をたどれます。', sourceName: '国宝 瑞巌寺 公式サイト（縁起）', sourceUrl: 'https://zuiganji.or.jp/history/' }),
  makeNationalSpot({ id: 'religious-9', name: '日光東照宮', category: 'religious', region: '関東', coordinate: { latitude: 36.7581, longitude: 139.5987, elevationMeter: 650 }, era: 'edo', eraLabel: '元和3年（1617年）創建・徳川家康を祀る', religiousType: '神社・日光の社寺', summary: '徳川家康を祀り、日光の山岳信仰と近世の国家的祭祀が交わる神社です。', description: '日光東照宮は徳川家康を御祭神とする神社で、日光山の自然と絢爛な社殿群が一体となっています。陽明門などの建築・彫刻を通して、江戸幕府が整えた宗教的・政治的拠点を学べます。', sourceName: '日光東照宮 公式サイト', sourceUrl: 'https://toshogu.jp/' }),
  makeNationalSpot({ id: 'religious-10', name: '成田山新勝寺', category: 'religious', region: '関東', coordinate: { latitude: 35.7851, longitude: 140.3181, elevationMeter: 34 }, era: 'heian', eraLabel: '天慶3年（940年）開山・不動尊信仰', religiousType: '寺院・真言宗智山派大本山', summary: '不動明王への信仰を中心に、全国から参詣者を集めてきた寺院です。', description: '成田山新勝寺は、平将門の乱を鎮めるために不動明王を奉安したことを起源とする寺院です。成田の門前町とともに、護摩祈祷を中心とした民衆信仰の広がりを感じられます。', sourceName: '成田山新勝寺 公式サイト', sourceUrl: 'https://www.naritasan.or.jp/' }),
  makeNationalSpot({ id: 'religious-11', name: '浅草寺', category: 'religious', region: '関東', coordinate: { latitude: 35.7148, longitude: 139.7967, elevationMeter: 4 }, era: 'asuka', eraLabel: '推古天皇36年（628年）創建伝承', religiousType: '寺院・聖観音宗総本山', summary: '東京の門前町・浅草の中心で、観音信仰を今に伝える古刹です。', description: '浅草寺は隅田川から現れた観音像を祀ったことを起源と伝える、東京を代表する寺院です。雷門から仲見世を通って本堂へ至る参詣の道は、都市の中で続く民衆信仰の景観を形づくっています。', sourceName: '浅草寺 公式サイト', sourceUrl: 'https://www.senso-ji.jp/' }),
  makeNationalSpot({ id: 'religious-12', name: '明治神宮', category: 'religious', region: '関東', coordinate: { latitude: 35.6764, longitude: 139.6993, elevationMeter: 31 }, era: 'taisho', eraLabel: '大正9年（1920年）創建・明治天皇を祀る', religiousType: '神社・明治天皇と昭憲皇太后を祀る', summary: '近代日本の記憶と、都心に広がる人工林が一体となった神社です。', description: '明治神宮は明治天皇と昭憲皇太后をお祀りする神社として1920年に創建されました。約100年かけて育てられてきた鎮守の森は、近代の国家的祭祀と都市の自然形成を考える手がかりになります。', sourceName: '明治神宮 公式サイト（Q&A）', sourceUrl: 'https://www.meijijingu.or.jp/faq/' }),
  makeNationalSpot({ id: 'religious-13', name: '鹿島神宮', category: 'religious', region: '関東', coordinate: { latitude: 35.9680, longitude: 140.6315, elevationMeter: 37 }, era: 'ancient', eraLabel: '常陸国一之宮・武甕槌大神を祀る', religiousType: '神社・東国三社', summary: '東国三社の一つとして知られる、古代から続く鹿島の鎮守です。', description: '鹿島神宮は武甕槌大神を御祭神とし、古代から東国の信仰・交通の要所として崇敬されてきた神社です。香取神宮・息栖神社と結ぶ東国三社の信仰圏にもつながります。', sourceName: '鹿島神宮 公式サイト', sourceUrl: 'https://kashimajingu.jp/' }),
  makeNationalSpot({ id: 'religious-14', name: '香取神宮', category: 'religious', region: '関東', coordinate: { latitude: 35.8874, longitude: 140.5283, elevationMeter: 41 }, era: 'ancient', eraLabel: '下総国一之宮・経津主大神を祀る', religiousType: '神社・東国三社', summary: '香取の森に鎮座し、東国三社の信仰を伝える古社です。', description: '香取神宮は経津主大神を御祭神とする下総国一之宮です。鹿島神宮とともに東国の武神信仰を担い、香取の森と参道が古社の立地を今に伝えています。', sourceName: '香取神宮 公式サイト', sourceUrl: 'https://katori-jingu.or.jp/' }),
  makeNationalSpot({ id: 'religious-15', name: '善光寺', category: 'religious', region: '中部', coordinate: { latitude: 36.6614, longitude: 138.1877, elevationMeter: 380 }, era: 'asuka', eraLabel: '皇極天皇元年（642年）現在地へ遷座伝承', religiousType: '寺院・無宗派の信仰拠点', summary: '宗派を問わず人々を受け入れてきた、信州を代表する大寺院です。', description: '善光寺は一光三尊阿弥陀如来を御本尊とし、約1400年にわたり広い信仰を集めてきました。特定の宗派に属さず、長野の門前町を中心に全国へ信仰が広がった拠点です。', sourceName: '善光寺 公式サイト（紹介）', sourceUrl: 'https://www.zenkoji.jp/about/' }),
  makeNationalSpot({ id: 'religious-16', name: '諏訪大社 上社本宮', category: 'religious', region: '中部', coordinate: { latitude: 35.9981, longitude: 138.1166, elevationMeter: 760 }, era: 'ancient', eraLabel: '信濃国一之宮・御柱祭の社', religiousType: '神社・諏訪信仰の総本社', summary: '山と湖の信仰、御柱祭で知られる諏訪信仰の中心です。', description: '諏訪大社は上社・下社からなる信濃国一之宮で、御柱祭などの独自の祭礼文化を伝えます。上社本宮では、諏訪の地形と古い信仰の結びつきを現地で感じられます。', sourceName: '諏訪大社 公式サイト', sourceUrl: 'https://suwataisha.or.jp/' }),
  makeNationalSpot({ id: 'religious-17', name: '熱田神宮', category: 'religious', region: '中部', coordinate: { latitude: 35.1264, longitude: 136.9085, elevationMeter: 8 }, era: 'ancient', eraLabel: '1900年以上の歴史・草薙神剣を祀る', religiousType: '神社・三種の神器ゆかり', summary: '草薙神剣を祀り、名古屋の都市形成とともに歩んできた大社です。', description: '熱田神宮は草薙神剣を祀る神宮として、1900年以上の歴史を伝えています。古代の神話・宮廷儀礼・尾張の地域信仰が重なる、東海を代表する宗教拠点です。', sourceName: '熱田神宮 公式サイト（歴史）', sourceUrl: 'https://www.atsutajingu.or.jp/jingu/about/history.html' }),
  makeNationalSpot({ id: 'religious-18', name: '伊勢神宮 内宮', category: 'religious', region: '中部', coordinate: { latitude: 34.4550, longitude: 136.7256, elevationMeter: 32 }, era: 'ancient', eraLabel: '皇大神宮・天照大御神を祀る', religiousType: '神宮・皇大神宮（内宮）', summary: '天照大御神を祀り、「お伊勢参り」の中心となってきた神宮です。', description: '伊勢神宮の内宮は皇大神宮といい、天照大御神をお祀りしています。外宮をはじめとする宮域全体と式年遷宮の営みを通じ、日本の祭祀文化を今に伝える中心です。', sourceName: '伊勢神宮 公式サイト（神宮について）', sourceUrl: 'https://www.isejingu.or.jp/about/index.html' }),
  makeNationalSpot({ id: 'religious-19', name: '比叡山延暦寺', category: 'religious', region: '近畿', coordinate: { latitude: 35.0708, longitude: 135.8330, elevationMeter: 680 }, era: 'heian', eraLabel: '延暦7年（788年）最澄開創・日本仏教の母山', religiousType: '寺院・天台宗総本山', summary: '多くの宗派の祖師を育てた、比叡山の山岳仏教拠点です。', description: '比叡山延暦寺は最澄が開いた一乗止観院を起源とする天台宗の総本山です。東塔・西塔・横川に広がる堂塔群と修行の場は、日本仏教史の大きな流れをたどる手がかりになります。', sourceName: '比叡山延暦寺 公式サイト', sourceUrl: 'https://www.hieizan.or.jp/' }),
  makeNationalSpot({ id: 'religious-20', name: '伏見稲荷大社', category: 'religious', region: '近畿', coordinate: { latitude: 34.9671, longitude: 135.7727, elevationMeter: 35 }, era: 'nara', eraLabel: '和銅4年（711年）創建伝承・稲荷信仰総本宮', religiousType: '神社・全国稲荷社の総本宮', summary: '稲荷山全体を信仰の場とする、全国の稲荷社の総本宮です。', description: '伏見稲荷大社は稲荷山の三ヶ峰を中心に、五穀豊穣や商売繁昌の信仰を集めてきました。千本鳥居だけでなく、山そのものを歩く参詣の構造が特徴です。', sourceName: '伏見稲荷大社 公式サイト（由緒）', sourceUrl: 'https://inari.jp/about/' }),
  makeNationalSpot({ id: 'religious-21', name: '清水寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.9949, longitude: 135.7850, elevationMeter: 95 }, era: 'heian', eraLabel: '宝亀9年（778年）開創伝承・北法相宗大本山', religiousType: '寺院・北法相宗大本山', summary: '音羽の滝と舞台で知られる、京都東山の観音信仰の拠点です。', description: '清水寺は音羽山の観音霊場として開創され、現在の本堂は江戸初期に再建されました。坂道・門前・舞台を含む景観から、山の信仰が都市の文化へ広がった様子をたどれます。', sourceName: '清水寺 公式サイト', sourceUrl: 'https://www.kiyomizudera.or.jp/' }),
  makeNationalSpot({ id: 'religious-22', name: '東大寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.6887, longitude: 135.8398, elevationMeter: 90 }, era: 'nara', eraLabel: '天平勝宝4年（752年）大仏開眼供養', religiousType: '寺院・華厳宗大本山', summary: '国家の安寧と万民の豊楽を願って建立された、奈良の大寺院です。', description: '東大寺は国分寺として建立され、盧舎那仏の造立と大仏殿の建立を進めた奈良時代の国家的寺院です。大仏殿や二月堂の儀礼は、古代から続く祈りと都市の歴史を伝えます。', sourceName: '東大寺 公式サイト（歴史）', sourceUrl: 'https://www.todaiji.or.jp/history/' }),
  makeNationalSpot({ id: 'religious-23', name: '春日大社', category: 'religious', region: '近畿', coordinate: { latitude: 34.6813, longitude: 135.8480, elevationMeter: 105 }, era: 'nara', eraLabel: '神護景雲2年（768年）創建・春日神社総本社', religiousType: '神社・全国春日神社の総本社', summary: '御蓋山の森とともに、1200年以上の祭祀を続ける古社です。', description: '春日大社は768年、称徳天皇の勅命により御本殿が造営されたとされています。約3000社の春日神社の総本社で、神山・社殿・祭礼が一体になった宗教景観を伝えます。', sourceName: '春日大社 公式サイト（ご由緒）', sourceUrl: 'https://www.kasugataisha.or.jp/about/' }),
  makeNationalSpot({ id: 'religious-24', name: '高野山 金剛峯寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.2130, longitude: 135.5850, elevationMeter: 800 }, era: 'heian', eraLabel: '弘仁7年（816年）空海開創・真言密教の聖地', religiousType: '寺院・高野山真言宗総本山', summary: '山上の宗教都市として発展した、真言密教の総本山です。', description: '高野山は空海が開いた真言密教の道場で、金剛峯寺を中心に山内の寺院群と奥之院が広がります。参詣道と宿坊文化を含め、山岳霊場が町として続く姿を体験できます。', sourceName: '高野山真言宗 総本山金剛峯寺 公式サイト', sourceUrl: 'https://www.koyasan.or.jp/' }),
  makeNationalSpot({ id: 'religious-25', name: '石清水八幡宮', category: 'religious', region: '近畿', coordinate: { latitude: 34.8848, longitude: 135.7007, elevationMeter: 120 }, era: 'heian', eraLabel: '貞観元年（859年）創建・八幡信仰の社', religiousType: '神社・日本三大八幡宮', summary: '男山の山上に鎮座し、都の守護と八幡信仰を担ってきた神社です。', description: '石清水八幡宮は859年に宇佐神宮から八幡大神を勧請したことを起源とする神社です。男山の地形と社殿の配置から、京都盆地を見守る宗教的・軍事的な要衝を読み取れます。', sourceName: '石清水八幡宮 公式サイト', sourceUrl: 'https://iwashimizu.or.jp/' }),
  makeNationalSpot({ id: 'religious-26', name: '熊野本宮大社', category: 'religious', region: '近畿', coordinate: { latitude: 33.8380, longitude: 135.7747, elevationMeter: 67 }, era: 'ancient', eraLabel: '熊野三山・全国熊野信仰の中心', religiousType: '神社・熊野三山の一社', summary: '熊野古道と結びつく、山岳信仰と巡礼の中心です。', description: '熊野本宮大社は熊野三山の一つで、熊野川流域の自然と巡礼の道に支えられてきました。熊野詣の広がりは、遠く離れた地域を結ぶ日本の宗教文化を物語ります。', sourceName: '熊野本宮大社 公式サイト', sourceUrl: 'https://www.hongutaisha.jp/' }),
  makeNationalSpot({ id: 'religious-27', name: '出雲大社', category: 'religious', region: '中国', coordinate: { latitude: 35.4021, longitude: 132.6852, elevationMeter: 20 }, era: 'ancient', eraLabel: '大国主大神を祀る・出雲国造家の祭祀', religiousType: '神社・縁結びと国譲りの信仰拠点', summary: '大国主大神を祀り、古代から「むすび」の信仰を集めてきた大社です。', description: '出雲大社は大国主大神をお祀りし、国づくりと目に見えない世界を司る神としての信仰を伝えています。巨大な本殿と神楽殿、門前の参詣道から出雲の宗教文化を学べます。', sourceName: '出雲大社 公式サイト（大国主大神）', sourceUrl: 'https://izumooyashiro.or.jp/about/ookami' }),
  makeNationalSpot({ id: 'religious-28', name: '嚴島神社', category: 'religious', region: '中国', coordinate: { latitude: 34.2959, longitude: 132.3198, elevationMeter: 3 }, era: 'asuka', eraLabel: '推古天皇元年（593年）鎮座伝承', religiousType: '神社・海上守護の社', summary: '海と社殿が一体になった、宮島の世界文化遺産です。', description: '嚴島神社は593年の鎮座伝承を持ち、皇室の安泰や国家鎮護、海上の守護神として信仰されてきました。潮の満ち引きで表情を変える社殿配置が、信仰と自然の関係を示します。', sourceName: '嚴島神社 公式サイト（御由緒）', sourceUrl: 'https://www.itsukushimajinja.jp/jp/history.html' }),
  makeNationalSpot({ id: 'religious-29', name: '金刀比羅宮', category: 'religious', region: '四国', coordinate: { latitude: 34.1858, longitude: 133.8194, elevationMeter: 251 }, era: 'ancient', eraLabel: '象頭山の海上安全信仰・785段の石段', religiousType: '神社・金毘羅信仰の総本宮', summary: '海上安全の信仰を集め、長い石段の参詣道で知られる神社です。', description: '金刀比羅宮は象頭山に鎮座し、古くから海上安全や五穀豊穣の信仰を集めてきました。門前町から御本宮までの石段は、歩くこと自体が参詣になる宗教景観です。', sourceName: '金刀比羅宮 公式サイト', sourceUrl: 'https://www.konpira.or.jp/' }),
  makeNationalSpot({ id: 'religious-30', name: '太宰府天満宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.5196, longitude: 130.5348, elevationMeter: 52 }, era: 'heian', eraLabel: '延喜3年（903年）菅原道真公を祀る', religiousType: '神社・全国天満宮の総本宮', summary: '菅原道真公を祀り、学問と文化の信仰を集める天満宮です。', description: '太宰府天満宮は、太宰府で生涯を終えた菅原道真公をお祀りする神社です。全国の天満宮・天神信仰の中心として、門前町や祭礼とともに発展してきました。', sourceName: '太宰府天満宮 公式サイト', sourceUrl: 'https://www.dazaifutenmangu.or.jp/' }),
  makeNationalSpot({ id: 'religious-31', name: '宇佐神宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.5229, longitude: 131.3483, elevationMeter: 20 }, era: 'nara', eraLabel: '全国八幡社の総本宮・宇佐八幡信仰', religiousType: '神社・八幡社の総本宮', summary: '全国の八幡社へ広がった、宇佐八幡信仰の総本宮です。', description: '宇佐神宮は八幡大神を祀る神社で、古代から朝廷や地域の信仰を集めてきました。上宮・下宮や呉橋など、宇佐の地形と社殿配置を歩いて確認できます。', sourceName: '宇佐神宮 公式サイト', sourceUrl: 'https://www.usajingu.com/' }),
  makeNationalSpot({ id: 'religious-32', name: '阿蘇神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.9529, longitude: 131.1155, elevationMeter: 522 }, era: 'ancient', eraLabel: '肥後国一之宮・阿蘇火山信仰', religiousType: '神社・阿蘇山を仰ぐ古社', summary: '阿蘇山と火山信仰を背景に、肥後国一之宮として続く神社です。', description: '阿蘇神社は阿蘇山を仰ぐ肥後国一之宮で、阿蘇氏と地域の祭祀を伝える古社です。楼門や門前町、火山地形との関係から、自然と宗教拠点の結びつきを感じられます。', sourceName: '阿蘇神社 公式サイト', sourceUrl: 'https://asojinja.or.jp/' }),
  makeNationalSpot({ id: 'religious-33', name: '北海道神宮', category: 'religious', region: '北海道', coordinate: { latitude: 43.0148, longitude: 141.3070, elevationMeter: 65 }, era: 'meiji', eraLabel: '明治4年（1871年）創建・北海道の総鎮守', religiousType: '神社・北海道の総鎮守', summary: '札幌の開拓とともに歩み、北海道の総鎮守とされる神社です。', description: '北海道神宮は開拓三神などを祀る神社として札幌に鎮座し、北海道の開拓と都市の成長を見守ってきました。円山の森と参道は、近代の地域形成と信仰の場の重なりを伝えます。', sourceName: '北海道神宮 公式サイト', sourceUrl: 'https://www.hokkaidojingu.or.jp/' }),
  makeNationalSpot({ id: 'religious-34', name: '立石寺（山寺）', category: 'religious', region: '東北', coordinate: { latitude: 38.3108, longitude: 140.4363, elevationMeter: 410 }, era: 'heian', eraLabel: '貞観2年（860年）開山・東北を代表する霊山', religiousType: '寺院・天台宗の山岳霊場', summary: '慈覚大師円仁が開いた、岩山と堂塔が一体になった霊場です。', description: '立石寺は860年に慈覚大師円仁が開いた天台宗の寺院で、通称「山寺」と呼ばれます。石段と岩場を登りながら、修行・参詣・景観が重なった東北の山岳霊場を歩けます。', sourceName: '宝珠山 立石寺 公式サイト', sourceUrl: 'https://rissyakuji.jp/' }),
  makeNationalSpot({ id: 'religious-35', name: '出羽三山神社', category: 'religious', region: '東北', coordinate: { latitude: 38.7026, longitude: 139.9795, elevationMeter: 414 }, era: 'medieval', eraLabel: '羽黒山・月山・湯殿山の三山信仰', religiousType: '神社・出羽三山修験の拠点', summary: '羽黒山・月山・湯殿山を結ぶ、修験と巡礼の霊場です。', description: '出羽三山神社は三山をめぐる信仰と修験の伝統を伝える拠点です。羽黒山の三神合祭殿では、自然の山を神域として仰ぐ東北の宗教文化を感じられます。', sourceName: '出羽三山神社 公式サイト（御由緒）', sourceUrl: 'https://www.dewasanzan.jp/publics/index/6/' }),
  makeNationalSpot({ id: 'religious-36', name: '鹽竈神社', category: 'religious', region: '東北', coordinate: { latitude: 38.3198, longitude: 141.0107, elevationMeter: 50 }, era: 'ancient', eraLabel: '陸奥国一之宮・東北鎮護と海上守護', religiousType: '神社・陸奥国一之宮', summary: '東北鎮護と海上守護を担ってきた、塩竈の一之宮です。', description: '鹽竈神社は中世以降、東北鎮護・海上守護の陸奥国一之宮として重んじられてきました。急な表坂と港を見下ろす境内から、海と地域祭祀の関係をたどれます。', sourceName: '志波彦神社・鹽竈神社 公式サイト（御由緒）', sourceUrl: 'https://shiogamijinja.jp/about/' }),
  makeNationalSpot({ id: 'religious-37', name: '筑波山神社', category: 'religious', region: '関東', coordinate: { latitude: 36.2250, longitude: 140.1068, elevationMeter: 270 }, era: 'ancient', eraLabel: '筑波山を御神体とする古社・山岳信仰', religiousType: '神社・筑波山の霊峰信仰', summary: '筑波山そのものを信仰の対象とする、関東有数の霊峰の社です。', description: '筑波山神社は筑波山を御神体と仰ぎ、二峰の山容を伊弉諾尊・伊弉冉尊の二神と結びつけて信仰してきました。中腹の拝殿から山頂へ続く広大な境内が特徴です。', sourceName: '筑波山神社 公式サイト（由緒）', sourceUrl: 'https://tsukubasanjinja.jp/history/' }),
  makeNationalSpot({ id: 'religious-38', name: '建長寺', category: 'religious', region: '関東', coordinate: { latitude: 35.3347, longitude: 139.5538, elevationMeter: 25 }, era: 'kamakura', eraLabel: '建長5年（1253年）開創・鎌倉五山第一位', religiousType: '寺院・臨済宗建長寺派大本山', summary: '鎌倉五山第一位として、禅の修行と伽藍を伝える大寺院です。', description: '建長寺は北条時頼が開基し、蘭渓道隆を開山として1253年に創建された禅寺です。総門・三門・仏殿・法堂が並ぶ伽藍は、鎌倉の禅文化を現地で学べる構成になっています。', sourceName: '巨福山 建長寺 公式サイト（歴史）', sourceUrl: 'https://www.kenchoji.com/about/' }),
  makeNationalSpot({ id: 'religious-39', name: '富士山本宮浅間大社', category: 'religious', region: '中部', coordinate: { latitude: 35.2272, longitude: 138.6084, elevationMeter: 155 }, era: 'ancient', eraLabel: '富士山信仰・全国浅間神社の総本宮', religiousType: '神社・富士山の鎮火と登拝信仰', summary: '富士山を御神体として仰ぎ、登拝の出発点となった浅間大社です。', description: '富士山本宮浅間大社は、富士山の噴火を鎮めるため富士山を神として祀ったことに始まる神社です。境内の湧玉池と富士山頂に続く信仰の道から、火山と祭祀の結びつきを感じられます。', sourceName: '富士宮市公式サイト（富士山本宮浅間大社）', sourceUrl: 'https://www.city.fujinomiya.lg.jp/1015150000/p001616.html?channel=sp' }),
  makeNationalSpot({ id: 'religious-40', name: '身延山久遠寺', category: 'religious', region: '中部', coordinate: { latitude: 35.3877, longitude: 138.4250, elevationMeter: 390 }, era: 'kamakura', eraLabel: '文永11年（1274年）日蓮入山・日蓮宗総本山', religiousType: '寺院・日蓮宗総本山', summary: '日蓮聖人の祖廟を守る、身延山の法華経信仰の中心です。', description: '身延山久遠寺は1274年に日蓮聖人が入山したことに始まり、日蓮宗の総本山として信仰を集めています。久遠寺と祖廟、山の修行空間が一体となった霊地です。', sourceName: '身延山久遠寺 公式サイト（歴史）', sourceUrl: 'https://www.kuonji.jp/history/' }),
  makeNationalSpot({ id: 'religious-41', name: '永平寺', category: 'religious', region: '中部', coordinate: { latitude: 36.0540, longitude: 136.3547, elevationMeter: 270 }, era: 'kamakura', eraLabel: '寛元2年（1244年）道元開創・曹洞宗大本山', religiousType: '寺院・曹洞宗大本山', summary: '道元が開いた、坐禅と修行を今に伝える山中の大本山です。', description: '永平寺は道元が1244年に開いた曹洞宗の大本山で、現在も僧堂を中心とした修行の場です。杉木立と回廊で結ばれた伽藍から、禅寺の生活空間を感じられます。', sourceName: '大本山永平寺 公式サイト', sourceUrl: 'https://daihonzan-eiheiji.com/' }),
  makeNationalSpot({ id: 'religious-42', name: '醍醐寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.9515, longitude: 135.8212, elevationMeter: 70 }, era: 'heian', eraLabel: '貞観16年（874年）開創・世界文化遺産', religiousType: '寺院・真言宗醍醐派総本山', summary: '上醍醐から下醍醐まで広がる、真言密教と修験の大寺院です。', description: '醍醐寺は874年に聖宝が開創し、上醍醐の山岳修行と下醍醐の伽藍をつないで発展しました。豊臣秀吉の醍醐の花見など、祈りと文化の歴史が重なる世界遺産です。', sourceName: '世界遺産 醍醐寺 公式サイト（歴史）', sourceUrl: 'https://www.daigoji.or.jp/about/history.html' }),
  makeNationalSpot({ id: 'religious-43', name: '東福寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.9763, longitude: 135.7727, elevationMeter: 52 }, era: 'kamakura', eraLabel: '嘉禎2年（1236年）創建・臨済宗大本山', religiousType: '寺院・臨済宗東福寺派大本山', summary: '京都最大級の禅苑として、伽藍と庭園を伝える禅寺です。', description: '東福寺は九条道家が創建し、円爾を開山として発展した臨済宗の大本山です。三門・仏殿・方丈・通天橋など、禅寺の伽藍と庭園が一体となっています。', sourceName: '臨済宗大本山 東福寺 公式サイト（縁起）', sourceUrl: 'https://renewal.tofukuji.jp/history/' }),
  makeNationalSpot({ id: 'religious-44', name: '法隆寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.6148, longitude: 135.7343, elevationMeter: 55 }, era: 'asuka', eraLabel: '推古15年（607年）創建伝承・世界最古級の木造建築群', religiousType: '寺院・聖徳宗総本山', summary: '聖徳太子ゆかりの伽藍と、世界最古級の木造建築群を伝える寺院です。', description: '法隆寺は推古天皇と聖徳太子が607年に建立したと伝えられ、現在の伽藍は再建を含む古代寺院の姿を伝えます。西院伽藍・夢殿などを通して、日本の仏教文化の初期を学べます。', sourceName: '聖徳宗総本山 法隆寺 公式サイト', sourceUrl: 'https://www.horyuji.or.jp/' }),
  makeNationalSpot({ id: 'religious-45', name: '金峯山寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.3675, longitude: 135.8562, elevationMeter: 365 }, era: 'heian', eraLabel: '吉野山の修験道根本道場・世界遺産', religiousType: '寺院・金峯山修験本宗総本山', summary: '吉野山の修験道を支える、蔵王堂を中心とした山岳寺院です。', description: '金峯山寺は吉野山から大峯へ連なる修験道の中心で、蔵王堂に金剛蔵王大権現を祀ります。山の道と大きな堂宇を通じ、修験者と参詣者の霊場をたどれます。', sourceName: '金峯山修験本宗 総本山 金峯山寺 公式サイト', sourceUrl: 'https://www.kinpusen.or.jp/guide/' }),
  makeNationalSpot({ id: 'religious-46', name: '三徳山三佛寺', category: 'religious', region: '中国', coordinate: { latitude: 35.3803, longitude: 133.9910, elevationMeter: 350 }, era: 'asuka', eraLabel: '修験の行場・国宝投入堂', religiousType: '寺院・天台宗修験道の霊場', summary: '断崖の投入堂へ続く、修行と参拝の道を持つ霊場です。', description: '三徳山三佛寺は三徳山を行場とする寺院で、急峻な道の先に国宝投入堂があります。安全に注意しながら、山そのものが参拝空間になる構成を学べます。', sourceName: '三徳山 公式ホームページ', sourceUrl: 'https://www.mitokusan.jp/' }),
  makeNationalSpot({ id: 'religious-47', name: '善通寺', category: 'religious', region: '四国', coordinate: { latitude: 34.2230, longitude: 133.7735, elevationMeter: 25 }, era: 'heian', eraLabel: '空海誕生の地・真言宗善通寺派総本山', religiousType: '寺院・四国八十八箇所第75番', summary: '空海の誕生地に建つ、四国遍路と真言密教の総本山です。', description: '善通寺は空海の誕生地として知られ、真言宗善通寺派の総本山です。伽藍と遍路の札所が重なることで、弘法大師信仰の広がりを感じられます。', sourceName: '善通寺市公式サイト（総本山善通寺）', sourceUrl: 'https://www.city.zentsuji.kagawa.jp/soshiki/24/zentsujitemple.html' }),
  makeNationalSpot({ id: 'religious-48', name: '石鎚神社', category: 'religious', region: '四国', coordinate: { latitude: 33.8768, longitude: 133.1610, elevationMeter: 60 }, era: 'ancient', eraLabel: '石鎚山を神体山とする日本七霊山', religiousType: '神社・石鎚山の山岳信仰', summary: '西日本最高峰・石鎚山を神体山とする山岳信仰の拠点です。', description: '石鎚神社は石鎚山を神体山とし、口之宮本社・中宮・頂上社など四社で山の信仰を支えています。登拝と祭礼を通して、神仏習合の名残を伝える霊峰を学べます。', sourceName: '石鎚神社 公式サイト', sourceUrl: 'https://ishizuchisan.jp/' }),
  makeNationalSpot({ id: 'religious-49', name: '宗像大社 辺津宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.8316, longitude: 130.5140, elevationMeter: 8 }, era: 'ancient', eraLabel: '宗像三女神を祀る・沖ノ島祭祀の拠点', religiousType: '神社・海上交通と国家祭祀', summary: '沖津宮・中津宮とともに宗像三宮を構成する、海の守護神の社です。', description: '宗像大社は宗像三女神を沖津宮・中津宮・辺津宮に祀る神社です。古代の外交・交易・国防と結びついた沖ノ島祭祀を背景に、玄界灘の海上交通を守る宗教拠点として続いています。', sourceName: '宗像大社 公式サイト（由緒）', sourceUrl: 'https://munakata-taisha.or.jp/yuisyo.html' }),
  makeNationalSpot({ id: 'religious-50', name: '霧島神宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 31.8558, longitude: 130.8860, elevationMeter: 500 }, era: 'ancient', eraLabel: '天孫降臨神話と高千穂峰を仰ぐ神宮', religiousType: '神社・南九州の霊峰信仰', summary: '高千穂峰を背に、天孫降臨神話と南九州の信仰を伝える神宮です。', description: '霧島神宮は瓊瓊杵尊を主祭神とし、背後の高千穂峰を霊峰として仰ぎます。朱塗りの社殿と火山景観から、南九州の神話・自然・祭祀の関係を感じられます。', sourceName: '霧島神宮 公式サイト（御由緒）', sourceUrl: 'https://kirishimajingu.or.jp/history/' }),
  makeNationalSpot({ id: 'religious-51', name: '富盛の石彫大獅子', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.1457, longitude: 127.7733, elevationMeter: 95 }, era: 'edo', eraLabel: '沖縄最古級の石獅子・集落の祭祀', religiousType: '祭祀文化・沖縄の村落信仰', summary: '火除けと村落守護の祈りを伝える、沖縄最古級の石獅子です。', description: '富盛の石彫大獅子は、火災除けや集落守護の願いを込めて設置された沖縄の石造信仰資料です。寺社とは異なる村落祭祀の拠点も含め、日本の宗教文化の多様性を紹介します。', sourceName: '沖縄県八重瀬町 公式サイト', sourceUrl: 'https://www.town.yaese.lg.jp/docs/2014040100174/' }),
  makeNationalSpot({ id: 'religious-52', name: '鶴岡八幡宮', category: 'religious', region: '関東', coordinate: { latitude: 35.3253, longitude: 139.5500, elevationMeter: 15 }, era: 'kamakura', eraLabel: '源頼朝が整えた鎌倉武士の守護社', religiousType: '神社・鎌倉の八幡信仰', summary: '鎌倉の都市軸と武士の文化を形づくった八幡宮です。', description: '鶴岡八幡宮は源頼朝が現在の地に遷し、鎌倉の中心として整えた神社です。若宮大路から本宮へ向かう参道は、武士の都の都市計画と信仰を一体で伝えています。', sourceName: '鶴岡八幡宮 公式サイト（知る）', sourceUrl: 'https://www.hachimangu.or.jp/knowledge/' }),
  makeNationalSpot({ id: 'religious-53', name: '大山阿夫利神社', category: 'religious', region: '関東', coordinate: { latitude: 35.4202, longitude: 139.2316, elevationMeter: 247 }, era: 'ancient', eraLabel: '2200年以上の創建伝承・雨乞いの霊山', religiousType: '神社・大山信仰と大山詣り', summary: '雨乞いと水の恵みを願う、大山の山岳信仰の拠点です。', description: '大山阿夫利神社は崇神天皇の頃の創建伝承を持ち、大山を雨降りの山として信仰してきました。江戸時代の大山詣りと、神仏習合の霊山文化をたどれます。', sourceName: '大山阿夫利神社 公式サイト（御由緒）', sourceUrl: 'https://www.afuri.or.jp/about/' }),
  makeNationalSpot({ id: 'religious-54', name: '寒川神社', category: 'religious', region: '関東', coordinate: { latitude: 35.3728, longitude: 139.3831, elevationMeter: 18 }, era: 'ancient', eraLabel: '相模国一之宮・関八州鎮護', religiousType: '神社・八方除の信仰拠点', summary: '関東一円を守る神として崇敬されてきた相模国一之宮です。', description: '寒川神社は古くから関八州鎮護の神として信仰され、相模国十三社の中で名神大社とされた神社です。方除・厄除の信仰と一之宮の祭祀を紹介します。', sourceName: '八方除 寒川神社 公式サイト（御由緒）', sourceUrl: 'https://samukawajinjya.jp/about/history.html' }),
  makeNationalSpot({ id: 'religious-55', name: '彌彦神社', category: 'religious', region: '中部', coordinate: { latitude: 37.7067, longitude: 138.8283, elevationMeter: 45 }, era: 'ancient', eraLabel: '越後国一之宮・二千四百年余の由緒', religiousType: '神社・越後国一之宮', summary: '弥彦山を仰ぐ、越後の一之宮として信仰を集める古社です。', description: '彌彦神社は弥彦山の麓に鎮座し、古代から越後一宮として崇敬を集めてきました。山と社殿、年中行事が一体になった越後の祭祀文化をたどれます。', sourceName: '越後一宮 彌彦神社 公式サイト（歴史・由緒）', sourceUrl: 'https://www.yahiko-jinjya.or.jp/history/index.html' }),
  makeNationalSpot({ id: 'religious-56', name: '白山比咩神社', category: 'religious', region: '中部', coordinate: { latitude: 36.4296, longitude: 136.6336, elevationMeter: 120 }, era: 'ancient', eraLabel: '全国白山神社の総本宮・白山信仰', religiousType: '神社・白山信仰の総本宮', summary: '霊峰白山と水の恵みを仰ぐ、全国白山神社の総本宮です。', description: '白山比咩神社は白山比咩大神を祀り、全国約三千社の白山神社の総本宮とされています。加賀・越前・美濃の登拝口から白山を目指す信仰の広がりを紹介します。', sourceName: '白山比咩神社 公式サイト（由緒）', sourceUrl: 'https://www.shirayama.or.jp/hakusan/history.html' }),
  makeNationalSpot({ id: 'religious-57', name: '東寺（教王護国寺）', category: 'religious', region: '近畿', coordinate: { latitude: 34.9806, longitude: 135.7478, elevationMeter: 35 }, era: 'heian', eraLabel: '平安京の王城鎮護・空海ゆかりの寺', religiousType: '寺院・真言宗総本山', summary: '平安京の東を守り、空海の密教を伝える京都の大寺院です。', description: '東寺は平安京の羅城門東側に建立された官寺で、嵯峨天皇から空海に託されました。五重塔と講堂を中心に、都の国家祭祀と真言密教の歴史を学べます。', sourceName: '世界遺産 東寺 公式サイト（歴史）', sourceUrl: 'https://toji.or.jp/search/history/' }),
  makeNationalSpot({ id: 'religious-58', name: '知恩院', category: 'religious', region: '近畿', coordinate: { latitude: 35.0050, longitude: 135.7820, elevationMeter: 75 }, era: 'kamakura', eraLabel: '法然ゆかり・浄土宗総本山', religiousType: '寺院・浄土宗総本山', summary: '法然の専修念仏を受け継ぐ、東山の浄土宗総本山です。', description: '知恩院は法然が吉水の地で念仏を広めた歴史に結びつき、源智上人が寺院として整えた浄土宗の総本山です。三門・御影堂と東山の地形が信仰の場を形づくっています。', sourceName: '浄土宗総本山 知恩院 公式サイト（歴史）', sourceUrl: 'https://www.chion-in.or.jp/highlight/' }),
  makeNationalSpot({ id: 'religious-59', name: '長谷寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.5339, longitude: 135.9090, elevationMeter: 330 }, era: 'asuka', eraLabel: '西国三十三所第8番・真言宗豊山派総本山', religiousType: '寺院・十一面観音信仰', summary: '長い登廊と十一面観音で知られる、巡礼の大本山です。', description: '長谷寺は十一面観音を祀り、西国三十三所第八番札所として信仰を集めてきました。登廊から本堂へ上る参詣の道は、山寺と巡礼の文化を伝えます。', sourceName: '総本山 長谷寺 公式サイト（略縁起）', sourceUrl: 'https://www.hasedera.or.jp/etsetora/ryaku_engi.html' }),
  makeNationalSpot({ id: 'religious-60', name: '室生寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.5354, longitude: 136.0402, elevationMeter: 410 }, era: 'heian', eraLabel: '女人高野・山あいの密教寺院', religiousType: '寺院・真言宗室生寺派大本山', summary: '女性の参詣も受け入れてきた、山中の仏教美術の宝庫です。', description: '室生寺は山あいに堂塔が広がり、女人高野として親しまれてきた寺院です。国宝の五重塔や金堂を通じ、自然と密教文化が結びついた景観を学べます。', sourceName: '女人高野 室生寺 公式サイト', sourceUrl: 'https://www.murouji.or.jp/' }),
  makeNationalSpot({ id: 'religious-61', name: '吉備津神社', category: 'religious', region: '中国', coordinate: { latitude: 34.6750, longitude: 133.8518, elevationMeter: 15 }, era: 'ancient', eraLabel: '備中国一宮・鳴釜神事の社', religiousType: '神社・吉備津彦命の信仰拠点', summary: '吉備国の古い信仰と、独特の鳴釜神事を伝える神社です。', description: '吉備津神社は吉備津彦命を祀る備中国一宮で、長い回廊と鳴釜神事で知られます。吉備の地域史と、釜の音で神意をうかがう祭祀文化を紹介します。', sourceName: '吉備津神社 公式サイト（縁起）', sourceUrl: 'https://kibitujinja.com/about/engi.php' }),
  makeNationalSpot({ id: 'religious-62', name: '防府天満宮', category: 'religious', region: '中国', coordinate: { latitude: 34.0561, longitude: 131.5757, elevationMeter: 36 }, era: 'heian', eraLabel: '延喜4年（904年）創建伝承・日本最初の天神さま', religiousType: '神社・天満宮の信仰拠点', summary: '菅原道真公を祀る、日本最初の天神さまと伝わる神社です。', description: '防府天満宮は菅原道真公が九州へ向かう途中に立ち寄った周防の地に、904年に創建されたと伝わります。天神信仰と防府の港・門前町の歴史をたどれます。', sourceName: '防府天満宮 公式サイト（御由緒）', sourceUrl: 'https://www.hofutenmangu.com/903225' }),
  makeNationalSpot({ id: 'religious-63', name: '大麻比古神社', category: 'religious', region: '四国', coordinate: { latitude: 34.1567, longitude: 134.4414, elevationMeter: 45 }, era: 'ancient', eraLabel: '阿波国一之宮・大麻山の信仰', religiousType: '神社・阿波国一之宮', summary: '大麻山を仰ぎ、阿波国一之宮として交通安全などの信仰を集める神社です。', description: '大麻比古神社は大麻山の麓に鎮座する阿波国一之宮です。山を目印とした航行や方除・交通安全の信仰を通じ、四国東部の地域祭祀を学べます。', sourceName: '大麻比古神社 公式サイト（由緒書）', sourceUrl: 'https://www.ooasahikojinja.jp/yuisho/' }),
  makeNationalSpot({ id: 'religious-64', name: '霊山寺', category: 'religious', region: '四国', coordinate: { latitude: 34.1556, longitude: 134.4558, elevationMeter: 25 }, era: 'heian', eraLabel: '四国八十八箇所第1番・発願の寺', religiousType: '寺院・四国遍路第1番札所', summary: '四国遍路の出発点として、多くの巡礼者を迎えてきた寺院です。', description: '霊山寺は四国八十八箇所の第一番札所で、遍路の旅を始める発願の寺として知られます。巡礼の作法や門前の文化を通じ、四国遍路の入口を紹介します。', sourceName: '四国八十八ヶ所霊場会 公式サイト', sourceUrl: 'https://88shikokuhenro.jp/01ryozenji/' }),
  makeNationalSpot({ id: 'religious-65', name: '香椎宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.6500, longitude: 130.4432, elevationMeter: 18 }, era: 'ancient', eraLabel: '仲哀天皇・神功皇后ゆかりの古社', religiousType: '神社・夫婦の宮', summary: '仲哀天皇と神功皇后を祀り、福岡東部の信仰を集める古社です。', description: '香椎宮は仲哀天皇の神霊を祀ったことを起源とし、神功皇后の宮も築かれたと伝わります。香椎の森と独特の社殿形式から、古代伝承と地域信仰をたどれます。', sourceName: '香椎宮 公式サイト（香椎宮のこと）', sourceUrl: 'https://kashiigu.com/about/' }),
  makeNationalSpot({ id: 'religious-66', name: '筥崎宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.6171, longitude: 130.4259, elevationMeter: 5 }, era: 'heian', eraLabel: '日本三大八幡宮・敵国降伏の信仰', religiousType: '神社・八幡信仰の大社', summary: '宇佐・石清水と並ぶ日本三大八幡宮の一つです。', description: '筥崎宮は応神天皇・神功皇后・玉依姫命を祀る八幡宮で、宇佐・石清水とともに日本三大八幡宮に数えられます。博多湾に近い立地と「敵国降伏」の神宝から、海上交通と国家祭祀を学べます。', sourceName: '日本三大八幡宮 筥崎宮 公式サイト（歴史・由緒）', sourceUrl: 'https://hakozakigu.or.jp/about/' }),
  makeNationalSpot({ id: 'religious-67', name: '大神神社', category: 'religious', region: '近畿', coordinate: { latitude: 34.5286, longitude: 135.8530, elevationMeter: 95 }, era: 'ancient', eraLabel: '三輪山を御神体とする古社', religiousType: '神社・三輪山信仰', summary: '本殿を置かず、三輪山そのものを御神体とする古い形の神社です。', description: '大神神社は三輪山を御神体として拝する神社で、山そのものを神聖な場所とする古代の祭祀の姿を伝えます。拝殿から山へ向かう信仰の構造を現地で感じられます。', sourceName: '大神神社 公式サイト', sourceUrl: 'https://oomiwa.or.jp/' }),
  makeNationalSpot({ id: 'religious-68', name: '毛越寺', category: 'religious', region: '東北', coordinate: { latitude: 39.0056, longitude: 141.1040, elevationMeter: 60 }, era: 'heian', eraLabel: '平泉の浄土庭園・天台宗別格本山', religiousType: '寺院・天台宗', summary: '平泉の浄土思想を庭園と伽藍跡で伝える寺院です。', description: '毛越寺は慈覚大師円仁の開山と伝わり、平安時代に奥州藤原氏によって大伽藍が整えられました。大泉が池を中心とする浄土庭園から、自然と仏教世界が重なる平泉の信仰景観を学べます。', sourceName: '毛越寺 公式サイト（毛越寺について）', sourceUrl: 'https://www.motsuji.or.jp/about/index.html' }),
  makeNationalSpot({ id: 'religious-69', name: '函館八幡宮', category: 'religious', region: '北海道', coordinate: { latitude: 41.7506, longitude: 140.7164, elevationMeter: 25 }, era: 'muromachi', eraLabel: '道南の八幡信仰・函館山麓の古社', religiousType: '神社・八幡信仰', summary: '函館の港と町の歴史を見守ってきた、道南の八幡宮です。', description: '函館八幡宮は社伝によれば15世紀に八幡神を祀ったことに始まり、函館の発展とともに場所を移してきました。函館山の麓から、北方の港町における信仰拠点の成り立ちをたどれます。', sourceName: '北海道神社庁（函館八幡宮）', sourceUrl: 'https://hokkaidojinjacho.jp/%E5%87%BD%E9%A4%A8%E5%85%AB%E5%B9%A1%E5%AE%AE/' }),
  makeNationalSpot({ id: 'religious-70', name: '武蔵一宮 氷川神社', category: 'religious', region: '関東', coordinate: { latitude: 35.9170, longitude: 139.6241, elevationMeter: 15 }, era: 'ancient', eraLabel: '武蔵国一宮・大宮の鎮守', religiousType: '神社・武蔵国一宮', summary: '長い氷川参道と祭礼が、門前町大宮の記憶を伝える神社です。', description: '武蔵一宮氷川神社は武蔵国の一宮として古くから崇敬され、現在のさいたま市大宮の地名や門前町の形成にも結びつきます。社殿だけでなく、参道と季節の祭礼を通して都市と鎮守の関係を学べます。', sourceName: '武蔵一宮 氷川神社 公式サイト（由緒・歴史）', sourceUrl: 'https://musashiichinomiya-hikawa.or.jp/about/' }),
  makeNationalSpot({ id: 'religious-71', name: '三嶋大社', category: 'religious', region: '中部', coordinate: { latitude: 35.1186, longitude: 138.9185, elevationMeter: 25 }, era: 'ancient', eraLabel: '伊豆国一宮・三島の総鎮守', religiousType: '神社・伊豆国一宮', summary: '伊豆の一宮として、東海道の旅人や地域の信仰を集めてきた神社です。', description: '三嶋大社は伊豆国一宮として知られ、三島の町の中心に鎮座します。東海道の交通と門前町、流鏑馬などの祭礼を重ねて、伊豆の地域史をたどれます。', sourceName: '三嶋大社 公式サイト', sourceUrl: 'https://www.mishimataisha.or.jp/' }),
  makeNationalSpot({ id: 'religious-72', name: '西本願寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.9907, longitude: 135.7528, elevationMeter: 35 }, era: 'kamakura', eraLabel: '浄土真宗本願寺派の本山・世界文化遺産', religiousType: '寺院・浄土真宗本願寺派本山', summary: '御影堂や阿弥陀堂など、浄土真宗の本山建築が集まる京都の寺院です。', description: '西本願寺は浄土真宗本願寺派の本山で、国宝の御影堂・阿弥陀堂や書院などを伝えます。親鸞の教えを受け継ぐ本山の歴史と、桃山文化の建築を一緒に学べます。', sourceName: '西本願寺 公式サイト（お西さん）', sourceUrl: 'https://www.hongwanji.kyoto/' }),
  makeNationalSpot({ id: 'religious-73', name: '東本願寺（真宗本廟）', category: 'religious', region: '近畿', coordinate: { latitude: 34.9913, longitude: 135.7586, elevationMeter: 35 }, era: 'edo', eraLabel: '真宗大谷派の本山・京都七条の御堂', religiousType: '寺院・真宗大谷派本山', summary: '京都七条の大きな御堂を中心に、真宗門徒の信仰を支える本山です。', description: '東本願寺は真宗大谷派の本山で、京都烏丸七条の地に御影堂・阿弥陀堂を構えます。東西本願寺の分派と再建の歴史から、近世京都と門徒の広がりを考えられます。', sourceName: '東本願寺 公式サイト（真宗本廟）', sourceUrl: 'https://www.higashihonganji.or.jp/' }),
  makeNationalSpot({ id: 'religious-74', name: '北野天満宮', category: 'religious', region: '近畿', coordinate: { latitude: 35.0313, longitude: 135.7352, elevationMeter: 55 }, era: 'heian', eraLabel: '全国天満宮の総本社・菅原道真公の信仰', religiousType: '神社・天満宮総本社', summary: '天神信仰と京都の祭礼文化を伝える、北野の大社です。', description: '北野天満宮は菅原道真公を御祭神とし、全国の天満宮・天神社の総本社とされています。御霊信仰から学問の神への信仰の展開と、季節の祭礼を紹介します。', sourceName: '北野天満宮 公式サイト', sourceUrl: 'https://kitanotenmangu.or.jp/' }),
  makeNationalSpot({ id: 'religious-75', name: '伊弉諾神宮', category: 'religious', region: '近畿', coordinate: { latitude: 34.4657, longitude: 134.8562, elevationMeter: 35 }, era: 'ancient', eraLabel: '淡路国一宮・国生み神話の聖地', religiousType: '神社・淡路国一宮', summary: '淡路島の一宮として、国生み神話と夫婦の大楠を伝える神社です。', description: '伊弉諾神宮は淡路国一宮で、伊弉諾尊が幽宮を構えた場所とする古典の伝承に結びつきます。淡路島の地形と海上交通、国生み神話が重なる信仰の場をたどれます。', sourceName: '兵庫県神社庁（伊弉諾神宮）', sourceUrl: 'https://www.hyogo-jinjacho.com/data/6328110.html' }),
  makeNationalSpot({ id: 'religious-76', name: '熊野速玉大社', category: 'religious', region: '近畿', coordinate: { latitude: 33.7253, longitude: 135.9920, elevationMeter: 15 }, era: 'ancient', eraLabel: '熊野三山の一社・新宮の大社', religiousType: '神社・熊野信仰', summary: '熊野川の河口に鎮座し、熊野詣の歴史を伝える大社です。', description: '熊野速玉大社は熊野三山の一社で、熊野川と熊野灘に近い新宮の地に鎮座します。自然崇拝と神仏習合、熊野詣の道が交差する熊野信仰の広がりを学べます。', sourceName: '熊野速玉大社 公式サイト', sourceUrl: 'https://kumanohayatama.jp/' }),
  makeNationalSpot({ id: 'religious-77', name: '熊野那智大社', category: 'religious', region: '近畿', coordinate: { latitude: 33.6685, longitude: 135.8895, elevationMeter: 330 }, era: 'ancient', eraLabel: '熊野三山の一社・那智の滝への自然崇拝', religiousType: '神社・熊野信仰', summary: '那智の滝を神として仰ぐ、熊野三山の一社です。', description: '熊野那智大社は熊野三山の一社で、那智の滝への自然崇拝を起源とする信仰を伝えます。社殿と滝、那智山の参道を通じて、神仏習合と熊野詣の景観を体験できます。', sourceName: '熊野那智大社 公式サイト', sourceUrl: 'https://kumanonachitaisha.or.jp/' }),
  makeNationalSpot({ id: 'religious-78', name: '赤間神宮', category: 'religious', region: '中国', coordinate: { latitude: 33.9575, longitude: 130.9410, elevationMeter: 8 }, era: 'kamakura', eraLabel: '安徳天皇を祀る・関門海峡の鎮守', religiousType: '神社・皇統と海峡の信仰', summary: '関門海峡を望み、安徳天皇と壇ノ浦の記憶を祀る神宮です。', description: '赤間神宮は壇ノ浦の戦いで入水した安徳天皇を祀り、関門海峡の歴史と結びついてきました。先帝祭などの祭礼から、海峡の景観と中世の記憶がつながる場所を学べます。', sourceName: '赤間神宮 公式サイト', sourceUrl: 'https://akama-jingu.com/' }),
  makeNationalSpot({ id: 'religious-79', name: '美保神社', category: 'religious', region: '中国', coordinate: { latitude: 35.5608, longitude: 133.3074, elevationMeter: 8 }, era: 'ancient', eraLabel: 'えびす様の総本宮・美保関の海の信仰', religiousType: '神社・えびす信仰', summary: '出雲の東端で海上安全と豊漁を祈る、えびす様の総本宮です。', description: '美保神社は事代主神を祀り、えびす様の総本宮として海上安全や豊漁の信仰を集めてきました。美保関の港と出雲大社を結ぶ海の文化をたどれます。', sourceName: '美保神社 公式サイト', sourceUrl: 'https://mihojinja.or.jp/' }),
  makeNationalSpot({ id: 'religious-80', name: '大山祇神社', category: 'religious', region: '四国', coordinate: { latitude: 34.2470, longitude: 133.0590, elevationMeter: 12 }, era: 'ancient', eraLabel: '大三島の総鎮守・山と海と武の神', religiousType: '神社・大山祇神信仰', summary: '瀬戸内の島で山・海・武の神を祀る、三島神社の総本社です。', description: '大山祇神社は大三島に鎮座し、山神であると同時に海上安全や武運の神として信仰されてきました。楠群と宝物館の甲冑・刀剣から、瀬戸内の海と武家文化のつながりを学べます。', sourceName: '大山祇神社 公式サイト', sourceUrl: 'https://oomishimagu.jp/' }),
  makeNationalSpot({ id: 'religious-81', name: '高千穂神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.7113, longitude: 131.3075, elevationMeter: 350 }, era: 'ancient', eraLabel: '高千穂郷八十八社の総社・神話の里', religiousType: '神社・高千穂信仰', summary: '高千穂郷八十八社の総社として、神楽と神話を伝える神社です。', description: '高千穂神社は高千穂郷八十八社の総社として崇敬を集め、本殿や鉄造狛犬を伝えます。夜神楽などの祭祀芸能を通して、地域の神話と暮らしが結びつく文化を紹介します。', sourceName: '宮崎県公式観光サイト（高千穂神社）', sourceUrl: 'https://www.kanko-miyazaki.jp/spot/1032' }),
  makeNationalSpot({ id: 'religious-82', name: '鵜戸神宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 31.6204, longitude: 131.4685, elevationMeter: 30 }, era: 'ancient', eraLabel: '日南海岸の洞窟本殿・海の信仰', religiousType: '神社・海岸の聖地', summary: '日南海岸の断崖と洞窟に本殿を構える、南九州の古社です。', description: '鵜戸神宮は日向灘に面した洞窟内に本殿を構え、海岸の地形そのものを生かした信仰の場です。伝承と運玉投げなどの参拝文化から、南九州の海辺の祭祀を学べます。', sourceName: '鵜戸神宮 公式サイト', sourceUrl: 'https://www.udojingu.or.jp/' }),
  makeNationalSpot({ id: 'religious-83', name: '斎場御嶽', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.1788, longitude: 127.8244, elevationMeter: 120 }, era: 'ancient', eraLabel: '琉球王国の最高位の聖地・世界文化遺産', religiousType: '聖地・御嶽・自然信仰', summary: '琉球王国の国家的な祭祀が行われた、沖縄を代表する聖地です。', description: '斎場御嶽は琉球王国の宗教的儀礼や自然信仰の場所とされ、現在も静けさを守りながら公開されています。石灰岩の岩陰と森を通して、沖縄の祈りの文化を学べます。', sourceName: '世界文化遺産 斎場御嶽 公式サイト', sourceUrl: 'https://sefa.okinawa/' }),
  makeNationalSpot({ id: 'religious-84', name: '波上宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.2165, longitude: 127.6680, elevationMeter: 18 }, era: 'ancient', eraLabel: '琉球八社・那覇港を見守る沖縄総鎮守', religiousType: '神社・琉球八社', summary: '那覇港を見下ろす崖の上で、海上交通と沖縄の祈りを伝える神社です。', description: '波上宮は那覇港を望む崖上に鎮座し、琉球八社の一つとして航海安全や豊穣を祈る場となってきました。海と港を見渡す立地から、琉球王国の交易と信仰の関係を考えられます。', sourceName: '波上宮 公式サイト', sourceUrl: 'https://naminouegu.jp/index.html' }),
  makeNationalSpot({ id: 'religious-85', name: '恐山菩提寺', category: 'religious', region: '東北', coordinate: { latitude: 41.3286, longitude: 141.0898, elevationMeter: 370 }, era: 'heian', eraLabel: '霊場恐山・死者供養と地蔵信仰', religiousType: '寺院・曹洞宗・霊場', summary: '火山地形と地蔵信仰が重なる、北日本を代表する霊場です。', description: '恐山菩提寺は慈覚大師円仁の開山伝承を持つ曹洞宗寺院で、死者供養と地蔵信仰の霊場として知られます。火山性の荒涼とした景観と温泉、例大祭の文化から、自然と慰霊が結びつく信仰を学べます。', sourceName: '霊場恐山 公式サイト', sourceUrl: 'https://reijyo-osorezan.jp/' }),
  makeNationalSpot({ id: 'religious-86', name: '三峯神社', category: 'religious', region: '関東', coordinate: { latitude: 35.9254, longitude: 138.9434, elevationMeter: 1100 }, era: 'ancient', eraLabel: '秩父山地の山岳信仰・秩父三社', religiousType: '神社・山岳信仰', summary: '秩父の山深くに鎮座し、狼信仰と修験の歴史を伝える神社です。', description: '三峯神社は三峯山の山岳信仰を背景に、秩父三社の一つとして崇敬を集めてきました。山道と奥宮、狼を神の使いとする信仰から、自然と人々の暮らしを守る山の文化をたどれます。', sourceName: '三峯神社 公式サイト', sourceUrl: 'https://www.mitsuminejinja.or.jp/' }),
  makeNationalSpot({ id: 'religious-87', name: '宝登山神社', category: 'religious', region: '関東', coordinate: { latitude: 36.0946, longitude: 139.1033, elevationMeter: 210 }, era: 'ancient', eraLabel: '秩父三社・火防と山の信仰', religiousType: '神社・山岳信仰', summary: '長瀞の山と荒川を望み、火防・諸難除の信仰を集める神社です。', description: '宝登山神社は宝登山を神の鎮まる山として仰ぎ、秩父三社の一つとして信仰されてきました。明治以前の神仏習合の名残と奥宮への登拝から、山岳信仰の変化を学べます。', sourceName: '寳登山神社 公式サイト（概要）', sourceUrl: 'https://www.hodosan-jinja.or.jp/gaiyou/' }),
  makeNationalSpot({ id: 'religious-88', name: '大國魂神社', category: 'religious', region: '関東', coordinate: { latitude: 35.6688, longitude: 139.4776, elevationMeter: 50 }, era: 'ancient', eraLabel: '武蔵総社・くらやみ祭の拠点', religiousType: '神社・武蔵国総社', summary: '武蔵国の六社を合わせ祀り、府中の門前町を育てた神社です。', description: '大國魂神社は武蔵国の総社として、国内の主要な神々を合わせ祀ってきました。くらやみ祭や長い馬場大門の参道から、古代の国府と都市の祭礼がつながる歴史をたどれます。', sourceName: '大國魂神社 公式サイト（アクセス）', sourceUrl: 'https://www.ookunitamajinja.or.jp/access/' }),
  makeNationalSpot({ id: 'religious-89', name: '北口本宮冨士浅間神社', category: 'religious', region: '中部', coordinate: { latitude: 35.4818, longitude: 138.7968, elevationMeter: 850 }, era: 'ancient', eraLabel: '富士山信仰・吉田口登山道の起点', religiousType: '神社・富士山信仰', summary: '富士山を遥拝し、吉田口登山道へつながる富士講の拠点です。', description: '北口本宮冨士浅間神社は富士山の北口に鎮座し、境内から吉田口登山道が始まります。富士山を信仰の対象として登拝する文化と、門前の講の歴史を学べます。', sourceName: '北口本宮冨士浅間神社 公式サイト', sourceUrl: 'https://sengenjinja.jp/' }),
  makeNationalSpot({ id: 'religious-90', name: '戸隠神社', category: 'religious', region: '中部', coordinate: { latitude: 36.7406, longitude: 138.0774, elevationMeter: 1200 }, era: 'ancient', eraLabel: '戸隠山の修験・五社の信仰', religiousType: '神社・山岳信仰・修験道', summary: '戸隠山を中心に、神仏習合と修験の歴史を伝える五社の霊場です。', description: '戸隠神社は古代の山岳信仰を源流とし、かつては顕光寺として神仏習合と修験道の霊地となりました。五社を結ぶ参道から、山そのものを拝む信仰の広がりをたどれます。', sourceName: '戸隠神社 公式サイト（歴史）', sourceUrl: 'https://www.togakushi-jinja.jp/about/index.php' }),
  makeNationalSpot({ id: 'religious-91', name: '氣比神宮', category: 'religious', region: '中部', coordinate: { latitude: 35.6510, longitude: 136.0630, elevationMeter: 8 }, era: 'ancient', eraLabel: '越前国一之宮・敦賀の海上交通の守護', religiousType: '神社・越前国一之宮', summary: '日本海の港町敦賀で、古代から航海と国家祭祀を支えた神宮です。', description: '氣比神宮は越前国一之宮として朝廷から厚く崇敬され、日本海側の海上交通とも深く結びついてきました。敦賀の港と松原、古代の大陸交流を背景に、海の道の信仰を学べます。', sourceName: '氣比神宮 公式サイト（由緒）', sourceUrl: 'https://kehijingu.jp/about/' }),
  makeNationalSpot({ id: 'religious-92', name: '日前神宮・國懸神宮', category: 'religious', region: '近畿', coordinate: { latitude: 34.2349, longitude: 135.1959, elevationMeter: 8 }, era: 'ancient', eraLabel: '紀伊国造家の祭祀・二社一体の大社', religiousType: '神社・古代鏡の信仰', summary: '二体の神鏡を御神体とする、和歌山の古代祭祀の拠点です。', description: '日前神宮・國懸神宮は同じ境内に二社が鎮座し、日前大神・國懸大神を祀ります。『日本書紀』に記される神鏡の伝承と紀伊国造家の祭祀から、古代国家と地域の信仰をたどれます。', sourceName: '日前神宮・國懸神宮 公式サイト', sourceUrl: 'https://www.hinokuma-jingu.com/jingu.html' }),
  makeNationalSpot({ id: 'religious-93', name: '多賀大社', category: 'religious', region: '近畿', coordinate: { latitude: 35.2262, longitude: 136.2916, elevationMeter: 135 }, era: 'ancient', eraLabel: 'お多賀さん・伊邪那岐大神と伊邪那美大神', religiousType: '神社・国生み神話の信仰', summary: '「お伊勢参らばお多賀へ参れ」とも歌われた、近江の古社です。', description: '多賀大社は伊邪那岐大神と伊邪那美大神を祀り、長寿・縁結び・国土生成の神として信仰されてきました。近江の街道と門前町、年中行事から、地域に根づく古社の姿を学べます。', sourceName: '多賀大社 公式サイト', sourceUrl: 'https://www.tagataisya.or.jp/' }),
  makeNationalSpot({ id: 'religious-94', name: '大山寺', category: 'religious', region: '中国', coordinate: { latitude: 35.3902, longitude: 133.5429, elevationMeter: 750 }, era: 'nara', eraLabel: '大山信仰・中国地方の山岳修験寺院', religiousType: '寺院・天台宗・山岳修験', summary: '大山を神仏の山として仰ぐ、中国地方を代表する山岳寺院です。', description: '大山寺は大山を仏の山として仰ぐ信仰の中心で、修験道と天台教学が重なった山岳寺院です。大神山神社奥宮や大山の自然と合わせ、神仏習合の景観をたどれます。', sourceName: '鳥取県公式サイト（大山寺と三仏寺）', sourceUrl: 'https://www.pref.tottori.lg.jp/265575.htm' }),
  makeNationalSpot({ id: 'religious-95', name: '高良大社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.3075, longitude: 130.5887, elevationMeter: 312 }, era: 'ancient', eraLabel: '筑後国一之宮・高良山の霊山', religiousType: '神社・筑後国一之宮・山岳信仰', summary: '高良山の山中に鎮座し、神籠石や寺坊跡を残す筑後の霊場です。', description: '高良大社は筑後国一之宮として高良山を仰ぎ、古くは山内に多くの寺坊が営まれた霊山の中心です。山道と社殿、久留米の城跡・国府跡の位置関係から、地域の聖地と政治拠点を学べます。', sourceName: '久留米公式観光サイト（高良大社）', sourceUrl: 'https://welcome-kurume.com/season/season_08.html' }),
  makeNationalSpot({ id: 'religious-96', name: '祐徳稲荷神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.0367, longitude: 130.1017, elevationMeter: 40 }, era: 'edo', eraLabel: '日本三大稲荷・鹿島藩の祈願所', religiousType: '神社・稲荷信仰', summary: '山の斜面に楼門や本殿が立ち、商売・豊作の祈りを集める神社です。', description: '祐徳稲荷神社は17世紀に創建され、伏見稲荷・笠間稲荷とともに日本三大稲荷の一つに数えられます。鹿島藩の祈願所から現在の門前町まで、稲荷信仰と地域経済の関係をたどれます。', sourceName: '祐徳稲荷神社 公式サイト（由緒）', sourceUrl: 'https://www.yutokusan.jp/about/' }),
  makeNationalSpot({ id: 'religious-97', name: '英彦山神宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.4781, longitude: 130.8955, elevationMeter: 720 }, era: 'ancient', eraLabel: '英彦山修験道・九州の山岳信仰', religiousType: '神社・修験道・山岳信仰', summary: '英彦山を中心に、九州の修験道を伝える山岳信仰の拠点です。', description: '英彦山神宮は英彦山を霊山として仰ぎ、修験道の峰入りや宿坊文化が栄えた場所です。奉幣殿へ続く石段と山の自然から、神仏習合を背景にした九州の山岳信仰を学べます。', sourceName: '英彦山神宮 公式サイト', sourceUrl: 'https://hikosanjingu.or.jp/' }),
  makeNationalSpot({ id: 'religious-98', name: '天岩戸神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.7324, longitude: 131.3432, elevationMeter: 330 }, era: 'ancient', eraLabel: '天岩戸神話の霊蹟・高千穂の聖地', religiousType: '神社・神話の聖地・自然信仰', summary: '天照大御神が隠れたとされる天岩戸を祀る、高千穂の聖地です。', description: '天岩戸神社は天照大御神が隠れたとされる天岩戸を斎き祀る神社です。岩戸川や天安河原への遥拝・参道を通して、神話と渓谷の自然が重なる高千穂の信仰を紹介します。', sourceName: '天岩戸神社 公式サイト', sourceUrl: 'https://amanoiwato-jinja.jp/pages/31/' }),
  makeNationalSpot({ id: 'religious-99', name: '大崎八幡宮', category: 'religious', region: '東北', coordinate: { latitude: 38.2723, longitude: 140.8553, elevationMeter: 55 }, era: 'edo', eraLabel: '伊達政宗が造営した国宝社殿・仙台の総鎮守', religiousType: '神社・八幡信仰', summary: '仙台の城下町を見守る、桃山文化の国宝社殿を持つ八幡宮です。', description: '大崎八幡宮は伊達政宗の時代に仙台へ遷され、社殿は桃山文化を伝える国宝建造物です。仙台城と城下町の形成、正月の松焚祭などの地域祭礼を合わせて学べます。', sourceName: '国宝 大崎八幡宮 公式サイト', sourceUrl: 'https://www.oosaki-hachiman.or.jp/' }),
  makeNationalSpot({ id: 'religious-100', name: '金華山黄金山神社', category: 'religious', region: '東北', coordinate: { latitude: 38.2950, longitude: 141.5580, elevationMeter: 445 }, era: 'nara', eraLabel: 'みちのくの霊島・金山信仰', religiousType: '神社・島嶼信仰・金山信仰', summary: '島全体を聖地とする、三陸沖の霊島の神社です。', description: '金華山黄金山神社は金華山を霊島として仰ぎ、金山毘古神・金山毘売神を祀ります。船で渡る参詣と島の自然を通じて、産金伝承と海の信仰が重なる東北の聖地を紹介します。', sourceName: '金華山黄金山神社 公式サイト', sourceUrl: 'https://kinkasan.jp/' }),
  makeNationalSpot({ id: 'religious-101', name: '函館ハリストス正教会', category: 'religious', region: '北海道', coordinate: { latitude: 41.7658, longitude: 140.7136, elevationMeter: 20 }, era: 'edo', eraLabel: '日本ハリストス正教会ゆかりの聖堂・函館元町', religiousType: '教会・正教会', summary: '開港地函館に残る、ロシア正教と日本の近代化を伝える聖堂です。', description: '函館ハリストス正教会はロシア領事館付属聖堂を起源とし、函館の開港とともに正教会の祈りを伝えてきました。元町の異国情緒だけでなく、聖体礼儀が続く生きた宗教施設として紹介します。', sourceName: '函館ハリストス正教会 公式サイト', sourceUrl: 'https://www.orthodox-hakodate.jp/' }),
  makeNationalSpot({ id: 'religious-102', name: '新潟総鎮守 白山神社', category: 'religious', region: '中部', coordinate: { latitude: 37.9160, longitude: 139.0360, elevationMeter: 5 }, era: 'ancient', eraLabel: '新潟湊の総鎮守・白山信仰', religiousType: '神社・湊町の鎮守', summary: '信濃川河口の湊町新潟を見守ってきた、白山信仰の拠点です。', description: '新潟総鎮守白山神社は、信濃川と日本海に近い新潟湊の発展を見守ってきました。菊理媛大神への信仰と新潟まつりを通して、港町の暮らしと鎮守の関係を学べます。', sourceName: '新潟総鎮守 白山神社 公式サイト', sourceUrl: 'https://www.niigatahakusanjinja.or.jp/about/about.html' }),
  makeNationalSpot({ id: 'religious-103', name: '石山寺', category: 'religious', region: '中部', coordinate: { latitude: 34.9630, longitude: 135.9094, elevationMeter: 40 }, era: 'nara', eraLabel: '西国三十三所第13番・紫式部ゆかりの観音霊場', religiousType: '寺院・真言宗大本山・観音信仰', summary: '瀬田川岸の巨石と文学、巡礼が重なる大本山です。', description: '石山寺は瀬田川岸の珪灰石の上に伽藍を広げる真言宗の大本山で、西国三十三所第十三番札所です。石山詣と紫式部の文学、国家的寺院から観音霊場への変化をたどれます。', sourceName: '大本山 石山寺 公式サイト', sourceUrl: 'https://www.ishiyamadera.or.jp/about' }),
  makeNationalSpot({ id: 'religious-104', name: '三井寺（園城寺）', category: 'religious', region: '中部', coordinate: { latitude: 35.0122, longitude: 135.8507, elevationMeter: 120 }, era: 'asuka', eraLabel: '天台寺門宗総本山・琵琶湖畔の古刹', religiousType: '寺院・天台寺門宗総本山', summary: '比叡山と対照をなす天台寺門宗の総本山です。', description: '三井寺は正式には園城寺といい、天台寺門宗の総本山として琵琶湖南西岸に伽藍を構えます。古代の霊泉、観音巡礼、比叡山との教団史を通して、近江の仏教文化を学べます。', sourceName: '三井寺（園城寺） 公式情報', sourceUrl: 'https://www.biwako-visitors.jp/spot/detail/92/' }),
  makeNationalSpot({ id: 'religious-105', name: '宝厳寺（竹生島観音）', category: 'religious', region: '中部', coordinate: { latitude: 35.4080, longitude: 136.1733, elevationMeter: 80 }, era: 'nara', eraLabel: '西国三十三所第30番・日本三弁才天', religiousType: '寺院・真言宗豊山派・弁才天信仰', summary: '琵琶湖に浮かぶ竹生島で、弁才天と観音巡礼を伝える寺院です。', description: '宝厳寺は竹生島に鎮座し、本尊の大弁才天は江ノ島・宮島と並ぶ日本三弁才天の一つです。都久夫須麻神社と一体だった歴史から、島の神仏習合と湖上の巡礼文化を学べます。', sourceName: '竹生島・宝厳寺 公式サイト', sourceUrl: 'https://www.chikubushima.jp/' }),
  makeNationalSpot({ id: 'religious-106', name: '鞍馬寺', category: 'religious', region: '近畿', coordinate: { latitude: 35.1126, longitude: 135.7728, elevationMeter: 410 }, era: 'heian', eraLabel: '鞍馬山の山岳仏教・牛若丸伝承', religiousType: '寺院・鞍馬弘教・山岳信仰', summary: '鞍馬山の自然と天狗伝承、山岳修行が重なる寺院です。', description: '鞍馬寺は鞍馬山を霊場として仰ぎ、毘沙門天や千手観音への信仰と山岳修行の文化を伝えます。木立の参道と山上の本殿を歩き、都市近郊の山が聖地となる過程を学べます。', sourceName: '総本山 鞍馬寺 公式サイト', sourceUrl: 'https://www.kuramadera.or.jp/index.html' }),
  makeNationalSpot({ id: 'religious-107', name: '橿原神宮', category: 'religious', region: '近畿', coordinate: { latitude: 34.4930, longitude: 135.7928, elevationMeter: 75 }, era: 'meiji', eraLabel: '神武天皇を祀る・橿原宮ゆかりの神宮', religiousType: '神社・皇統と建国神話', summary: '畝傍山の麓で、近代に創建された建国神話の祭祀拠点です。', description: '橿原神宮は神武天皇と媛蹈鞴五十鈴媛皇后を祀り、橿原宮の伝承地に創建されました。畝傍山や藤原京周辺の古代史と、近代に再構成された国家的祭祀の関係を考えられます。', sourceName: '橿原神宮 公式サイト', sourceUrl: 'https://kashiharajingu.or.jp/' }),
  makeNationalSpot({ id: 'religious-108', name: '石上神宮', category: 'religious', region: '近畿', coordinate: { latitude: 34.5946, longitude: 135.8484, elevationMeter: 120 }, era: 'ancient', eraLabel: '神剣を祀る古社・山の辺の道', religiousType: '神社・古代祭祀・物部氏の信仰', summary: '神剣と古代氏族の祭祀を伝える、日本最古級の神社です。', description: '石上神宮は神剣を祀る古社として、山の辺の道の中間に鎮座します。物部氏と古代国家の祭祀、禁足地をめぐる信仰から、武器と神宝が結びつく古代の宗教文化を学べます。', sourceName: '奈良県公式観光サイト（石上神宮）', sourceUrl: 'https://yamatoji.nara-kankou.or.jp/01shaji/01jinja/03east_area/isonokamijingu/' }),
  makeNationalSpot({ id: 'religious-109', name: '屋島寺', category: 'religious', region: '四国', coordinate: { latitude: 34.3728, longitude: 134.0998, elevationMeter: 280 }, era: 'nara', eraLabel: '四国八十八箇所第84番・屋島の山岳寺院', religiousType: '寺院・真言宗御室派・四国遍路', summary: '屋島の山上で、鑑真和上と遍路、屋島合戦の記憶を伝える寺院です。', description: '屋島寺は鑑真和上が開いたと伝わり、四国八十八箇所第八十四番札所として遍路を迎えます。屋島の山上から瀬戸内を望み、古代の仏教伝来と源平合戦の歴史を重ねて学べます。', sourceName: '香川県公式観光サイト（屋島寺）', sourceUrl: 'https://www.my-kagawa.jp/point/280/' }),
  makeNationalSpot({ id: 'religious-110', name: '太山寺', category: 'religious', region: '四国', coordinate: { latitude: 33.8727, longitude: 132.7675, elevationMeter: 100 }, era: 'asuka', eraLabel: '四国八十八箇所第52番・国宝本堂', religiousType: '寺院・真言宗智山派・四国遍路', summary: '松山の海辺に残る国宝本堂と、遍路文化の寺院です。', description: '太山寺は松山の経ヶ森の斜面にあり、国宝本堂と四国八十八箇所第五十二番札所を伝えます。海から山へ続く参詣の道と、古代以来の寺院建築から、伊予の信仰景観を学べます。', sourceName: '松山市公式サイト（札所めぐり）', sourceUrl: 'https://www.city.matsuyama.ehime.jp/kanko/kankoguide/rekishibunka/hudasyo.html' }),
  makeNationalSpot({ id: 'religious-111', name: '大浦天主堂', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.7340, longitude: 129.8685, elevationMeter: 25 }, era: 'edo', eraLabel: '長崎と天草地方の潜伏キリシタン関連遺産・国宝教会', religiousType: '教会・カトリック', summary: '開国後の信仰復活と長崎のキリスト教史を伝える国宝教会です。', description: '大浦天主堂は開国後の長崎に建てられ、潜伏していた信徒が信仰を表明した歴史と結びつきます。祈りが続く教会として、長崎の国際交流とキリスト教禁制・復活の記憶を紹介します。', sourceName: '国宝 大浦天主堂 公式サイト', sourceUrl: 'https://oura-church.jp/' }),
  makeNationalSpot({ id: 'religious-112', name: '浦上天主堂', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.7898, longitude: 129.8741, elevationMeter: 45 }, era: 'showa', eraLabel: '浦上キリシタンの信仰復活・被爆の記憶', religiousType: '教会・カトリック', summary: '浦上の信仰復活と原爆の記憶を今に伝える教会です。', description: '浦上天主堂は禁教が解かれた後に浦上の信徒が建設を計画し、長崎のキリシタン史と被爆の記憶に結びつきます。教会としての祈りと平和を願う場所として紹介します。', sourceName: '浦上天主堂 公式サイト', sourceUrl: 'https://uracathe.sakura.ne.jp/index.html' }),
  makeNationalSpot({ id: 'religious-113', name: '﨑津教会', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.3124, longitude: 130.0347, elevationMeter: 8 }, era: 'meiji', eraLabel: '天草の潜伏キリシタン関連遺産・海辺の教会', religiousType: '教会・カトリック', summary: '漁村の暮らしと信仰復活の歴史が重なる、天草の教会です。', description: '﨑津教会は天草の漁村に建ち、禁教期の信仰を受け継いだ人々の復活の歴史を伝えます。見学時はミサや地域の祈りを妨げない配慮が必要な、現在も使われている宗教施設です。', sourceName: 'カトリック福岡司教区（﨑津教会）', sourceUrl: 'https://fukuoka.catholic.jp/parish/sakitsu/' }),
  makeNationalSpot({ id: 'religious-114', name: '伊佐爾波神社', category: 'religious', region: '四国', coordinate: { latitude: 33.8505, longitude: 132.7867, elevationMeter: 55 }, era: 'edo', eraLabel: '道後八幡・国指定重要文化財の八幡造', religiousType: '神社・八幡信仰・温泉地の鎮守', summary: '道後の湯と信仰を見守る、鮮やかな八幡造の古社です。', description: '伊佐爾波神社は道後に鎮座し、現在の社殿は江戸時代に整えられた国指定重要文化財です。道後温泉の湯治・参詣と、回廊を備えた八幡造の建築から、松山の信仰景観を学べます。', sourceName: '伊佐爾波神社 公式サイト', sourceUrl: 'https://isaniwa.official.jp/' }),
  makeNationalSpot({ id: 'religious-115', name: '松江神社', category: 'religious', region: '中国', coordinate: { latitude: 35.4736, longitude: 133.0508, elevationMeter: 18 }, era: 'meiji', eraLabel: '松江城内の東照宮・松江藩の記憶', religiousType: '神社・城内鎮守・東照宮', summary: '松江城の城内に鎮座し、松江藩と城下町の記憶を伝える神社です。', description: '松江神社は松江城の城内に鎮座し、徳川家康や松江藩主松平不昧らを祀ります。城郭・藩主の信仰・近代の神社制度が重なる場所として、松江の政治と宗教の関係を紹介します。', sourceName: '島根県神社庁（松江神社）', sourceUrl: 'https://www.shimane-jinjacho.or.jp/983e7ec5cc3a16b64c8da1c3188ecdc2efd87835.html' }),
  makeNationalSpot({ id: 'religious-116', name: '会津さざえ堂', category: 'religious', region: '東北', coordinate: { latitude: 37.4998, longitude: 139.9380, elevationMeter: 290 }, era: 'edo', eraLabel: '飯盛山の三層六角堂・会津の巡礼建築', religiousType: '堂・仏教建築・巡礼', summary: '上りと下りが交わらない二重螺旋の参詣建築です。', description: '会津さざえ堂は飯盛山に建つ三層の六角堂で、内部の二重螺旋状の通路を一周すると百観音巡礼に代わるとされた独特の建築です。会津の民間信仰と近世の観音巡礼を、建物の体験から学べます。', sourceName: '会津さざえ堂 公式サイト', sourceUrl: 'https://sazaedo.jp/' }),
  makeNationalSpot({ id: 'religious-117', name: '観音正寺', category: 'religious', region: '中部', coordinate: { latitude: 35.1557, longitude: 136.1280, elevationMeter: 430 }, era: 'asuka', eraLabel: '西国三十三所第32番・繖山の観音霊場', religiousType: '寺院・天台宗・西国巡礼', summary: '観音寺城と同じ繖山に立つ、西国三十三所の札所です。', description: '観音正寺は繖山の山中にある西国三十三所第32番札所で、古くから山の観音霊場として信仰を集めてきました。隣接する観音寺城跡と合わせ、宗教の山と政治の城が重なる近江の歴史をたどれます。', sourceName: '観音正寺 公式サイト', sourceUrl: 'https://kannonshoji.or.jp/' }),
  makeNationalSpot({ id: 'religious-118', name: '日吉大社', category: 'religious', region: '中部', coordinate: { latitude: 35.0708, longitude: 135.8667, elevationMeter: 115 }, era: 'ancient', eraLabel: '山王総本宮・比叡山の鎮守', religiousType: '神社・山王信仰・神仏習合', summary: '全国の日吉・日枝・山王社の総本宮で、比叡山と結びつく古社です。', description: '日吉大社は比叡山の麓に鎮座し、全国の日吉・日枝・山王神社の総本宮とされています。平安京の鬼門除けや延暦寺の護法神としての歴史から、山岳信仰と都市の守護が結びつく過程を学べます。', sourceName: '日吉大社 公式サイト', sourceUrl: 'https://hiyoshitaisha.jp/' }),
  makeNationalSpot({ id: 'religious-119', name: '西教寺', category: 'religious', region: '中部', coordinate: { latitude: 35.0806, longitude: 135.8747, elevationMeter: 165 }, era: 'asuka', eraLabel: '天台真盛宗総本山・坂本の仏教拠点', religiousType: '寺院・天台真盛宗総本山', summary: '比叡山麓で念仏と天台の教えを伝える、坂本の総本山です。', description: '西教寺は大津市坂本にある天台真盛宗の総本山で、全国の末寺を束ねる仏教拠点です。比叡山・日吉大社・坂本の門前町と合わせ、山麓に形成された宗教文化の広がりを紹介します。', sourceName: '天台真盛宗総本山 西教寺 公式サイト', sourceUrl: 'https://saikyoji.org/' }),
  makeNationalSpot({ id: 'religious-120', name: '竹駒神社', category: 'religious', region: '東北', coordinate: { latitude: 38.1046, longitude: 140.8673, elevationMeter: 18 }, era: 'heian', eraLabel: '承和9年（842年）創建・日本三稲荷の一社とされる社', religiousType: '神社・稲荷信仰・東北の総鎮守', summary: '岩沼の門前町で、衣食住と産業の守護を祈る稲荷社です。', description: '竹駒神社は842年創建と伝わり、倉稲魂神・保食神・稚産霊神を祀ります。平泉藤原氏や伊達家の崇敬、岩沼の街道と門前町の発展を通じて、東北に広がった稲荷信仰を学べます。', sourceName: '日本三稲荷 竹駒神社 公式サイト', sourceUrl: 'https://takekomajinja.jp/s/about.html' }),
  makeNationalSpot({ id: 'religious-121', name: '笠間稲荷神社', category: 'religious', region: '関東', coordinate: { latitude: 36.3838, longitude: 140.2555, elevationMeter: 45 }, era: 'asuka', eraLabel: '白雉2年（651年）創建伝承・笠間の稲荷信仰', religiousType: '神社・稲荷信仰・城下町の祈願所', summary: '笠間城主の祈願所としても崇敬された、北関東の稲荷信仰拠点です。', description: '笠間稲荷神社は651年創建の伝承を持ち、江戸時代には笠間城主の祈願所として社殿が拡張されました。国指定文化財の本殿と門前町から、農耕・商売の祈りと城下町の関係を紹介します。', sourceName: '笠間市公式サイト（笠間稲荷神社本殿）', sourceUrl: 'https://www.city.kasama.lg.jp/page/page000222.html' }),
  makeNationalSpot({ id: 'religious-122', name: '豊川稲荷（妙厳寺）', category: 'religious', region: '中部', coordinate: { latitude: 34.8235, longitude: 137.3989, elevationMeter: 15 }, era: 'muromachi', eraLabel: '嘉吉元年（1441年）開創・豊川吒枳尼真天の信仰', religiousType: '寺院・曹洞宗・稲荷信仰', summary: '寺院の境内で稲荷信仰が広がった、東海屈指の霊場です。', description: '豊川稲荷は正式には曹洞宗の寺院・妙厳寺で、鎮守の豊川吒枳尼真天への信仰から全国に知られています。多数の鳥居や霊狐塚、商売繁盛の祈願から、神仏習合の信仰景観を学べます。', sourceName: '豊川稲荷 公式サイト', sourceUrl: 'https://www.toyokawainari.jp/' }),
  makeNationalSpot({ id: 'religious-123', name: '大須観音（寶生院）', category: 'religious', region: '中部', coordinate: { latitude: 35.1595, longitude: 136.9020, elevationMeter: 10 }, era: 'muromachi', eraLabel: '北野山真福寺・名古屋の観音霊場', religiousType: '寺院・真言宗智山派・観音信仰', summary: '名古屋の大須門前町とともに発展した、三大観音の一つとされる霊場です。', description: '大須観音は正式には北野山真福寺寶生院といい、尾張国大須から名古屋へ移された寺院です。観音信仰と大須文庫、大須商店街のにぎわいから、移転した寺院が都市文化の核となる過程を紹介します。', sourceName: '大須観音 公式サイト', sourceUrl: 'https://www.osu-kannon.jp/about/' }),
  makeNationalSpot({ id: 'religious-124', name: '萬福寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.9150, longitude: 135.8000, elevationMeter: 35 }, era: 'edo', eraLabel: '寛文元年（1661年）創建・黄檗宗大本山', religiousType: '寺院・黄檗宗大本山・禅', summary: '中国明朝様式の伽藍と黄檗文化を伝える、宇治の禅寺です。', description: '萬福寺は隠元隆琦禅師が1661年に開創した黄檗宗大本山です。明朝様式の伽藍、唐音の読経、普茶料理などから、中国大陸との交流が日本の禅文化に与えた影響を学べます。', sourceName: '黄檗宗大本山 萬福寺 公式サイト', sourceUrl: 'https://www.obakusan.or.jp/' }),
  makeNationalSpot({ id: 'religious-125', name: '妙心寺', category: 'religious', region: '近畿', coordinate: { latitude: 35.0186, longitude: 135.7156, elevationMeter: 55 }, era: 'muromachi', eraLabel: '花園法皇ゆかり・臨済宗妙心寺派大本山', religiousType: '寺院・臨済宗妙心寺派大本山・禅', summary: '多数の塔頭が連なる、京都を代表する禅の大本山です。', description: '妙心寺は花園法皇の離宮を寺院としたことを起源とし、臨済宗妙心寺派の大本山として発展しました。伽藍と塔頭、禅の修行と文化から、中世以降の禅寺の広がりをたどれます。', sourceName: '臨済宗大本山 妙心寺 公式サイト', sourceUrl: 'https://www.myoshinji.or.jp/' }),
  makeNationalSpot({ id: 'religious-126', name: '薬師寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.6687, longitude: 135.7849, elevationMeter: 65 }, era: 'nara', eraLabel: '天武天皇発願・法相宗大本山', religiousType: '寺院・法相宗大本山', summary: '薬師如来への祈りと白鳳・天平文化を伝える奈良の大寺院です。', description: '薬師寺は天武天皇の発願に始まり、飛鳥から現在の西ノ京へ移された法相宗大本山です。薬師三尊、東塔、写経の営みから、国家的な病気平癒の祈りと仏教美術を紹介します。', sourceName: '法相宗大本山 薬師寺 公式サイト', sourceUrl: 'https://www.yakushiji.or.jp/' }),
  makeNationalSpot({ id: 'religious-127', name: '唐招提寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.6772, longitude: 135.7841, elevationMeter: 65 }, era: 'nara', eraLabel: '鑑真和上開山・律宗総本山', religiousType: '寺院・律宗総本山・戒律の道場', summary: '鑑真和上が日本に戒律を伝えた、天平の伽藍を残す寺院です。', description: '唐招提寺は鑑真和上が戒律を伝えるために開いた律宗総本山です。金堂や講堂などの伽藍と開山堂を通して、海を越えた僧侶の往来と奈良時代の仏教教育を学べます。', sourceName: '律宗総本山 唐招提寺 公式サイト', sourceUrl: 'https://toshodaiji.jp/' }),
  makeNationalSpot({ id: 'religious-128', name: '遊行寺（清浄光寺）', category: 'religious', region: '関東', coordinate: { latitude: 35.3455, longitude: 139.4845, elevationMeter: 25 }, era: 'muromachi', eraLabel: '正中2年（1325年）創建・時宗総本山', religiousType: '寺院・時宗総本山・踊り念仏', summary: '藤沢宿の成立と、時宗の遊行・踊り念仏を伝える寺院です。', description: '遊行寺は正式には清浄光寺といい、1325年に創建された時宗の総本山です。東海道藤沢宿の町並みと、遊行上人の巡歴や踊り念仏の文化から、移動する宗教者と街道の関係を学べます。', sourceName: '時宗総本山 藤澤 遊行寺 公式サイト', sourceUrl: 'https://yugyoji.or.jp/' }),
  makeNationalSpot({ id: 'religious-129', name: '中山法華経寺', category: 'religious', region: '関東', coordinate: { latitude: 35.7228, longitude: 139.9537, elevationMeter: 25 }, era: 'kamakura', eraLabel: '日蓮聖人ゆかり・日蓮宗大本山', religiousType: '寺院・日蓮宗大本山・法華信仰', summary: '日蓮聖人の説法と法難の記憶を伝える、下総の大本山です。', description: '中山法華経寺は鎌倉時代に日蓮聖人を迎えた霊場を起源とする日蓮宗大本山です。鬼子母神信仰や祖師堂、日蓮聖人の法難の記憶から、房総に根づいた法華信仰を紹介します。', sourceName: '日蓮宗 大本山 中山法華経寺', sourceUrl: 'https://temple.nichiren.or.jp/1041026-hokekyoji/' }),
  makeNationalSpot({ id: 'religious-130', name: '宮古神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 24.8057, longitude: 125.2823, elevationMeter: 20 }, era: 'edo', eraLabel: '慶長18年（1613年）造営・宮古島の総鎮守', religiousType: '神社・島嶼信仰・琉球文化', summary: '海上交流と琉球王府の祈りが重なる、宮古島の神社です。', description: '宮古神社は1590年の勧請を起源とし、琉球王府の造営を経て宮古島の総鎮守として信仰を集めてきました。波上宮とのつながりと海上交通から、島嶼社会の神社文化を学べます。', sourceName: '宮古神社 公式サイト（由緒）', sourceUrl: 'https://miyako-jinja.com/about.html' }),
  makeNationalSpot({ id: 'religious-131', name: '普天満宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.2873, longitude: 127.7759, elevationMeter: 55 }, era: 'muromachi', eraLabel: '琉球八社・普天満宮洞穴の信仰', religiousType: '神社・琉球八社・洞穴信仰', summary: '洞穴と社殿が一体となった、沖縄本島中部の信仰拠点です。', description: '普天満宮は琉球八社の一つで、境内の洞穴を含む自然地形と社殿が信仰の場を形づくっています。琉球王府の祭祀と地域の安産・航海安全の祈りから、沖縄の聖地景観を紹介します。', sourceName: '宜野湾市公式サイト（普天満宮）', sourceUrl: 'https://www.city.ginowan.lg.jp/sightseeing/tourist_attractions/7034.html' }),
  makeNationalSpot({ id: 'religious-132', name: '宮﨑神宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 31.9394, longitude: 131.4198, elevationMeter: 15 }, era: 'ancient', eraLabel: '神武天皇を祀る・日向の神宮', religiousType: '神社・神武天皇祭祀・鎮守の森', summary: '神武天皇を祀り、日向の森と参道が広がる宮崎の神宮です。', description: '宮﨑神宮は神武天皇を祀る神社で、神武東征の伝承と日向の土地の記憶が重なります。広い鎮守の森と灯籠の参道を歩き、近代に整えられた神宮景観と古代伝承を学べます。', sourceName: '宮崎市公式観光サイト（宮﨑神宮）', sourceUrl: 'https://www.miyazaki-city.tourism.or.jp/spot/10004' }),
  makeNationalSpot({ id: 'religious-133', name: '鹿児島神宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 31.7894, longitude: 130.7507, elevationMeter: 45 }, era: 'ancient', eraLabel: '大隅国一之宮・海幸山幸神話の社', religiousType: '神社・大隅国一之宮・海幸山幸信仰', summary: '山幸彦と豊玉比売命を祀る、大隅の古社です。', description: '鹿児島神宮は山幸彦と豊玉比売命を祀り、古代から大隅国一之宮として崇敬されてきました。島津家が造営した社殿や鈴かけ馬の神事から、神話・地域祭礼・武家の信仰をたどれます。', sourceName: '鹿児島神宮 公式サイト', sourceUrl: 'https://kagoshima-jingu.jp/' }),
  makeNationalSpot({ id: 'religious-134', name: '田村神社', category: 'religious', region: '四国', coordinate: { latitude: 34.2925, longitude: 134.0278, elevationMeter: 25 }, era: 'ancient', eraLabel: '讃岐国一宮・田村大社の水の信仰', religiousType: '神社・讃岐国一宮・水神信仰', summary: '讃岐国一宮として、農耕と水の祈りを集めてきた高松の古社です。', description: '田村神社は讃岐国一宮として、田村大神と水の信仰を伝えます。境内の龍神や大楠、門前の市と祭礼から、雨の少ない讃岐で育まれた農耕・水利の祈りを紹介します。', sourceName: '讃岐國一宮 田村神社 公式サイト', sourceUrl: 'https://tamurajinja.com/' }),
  makeNationalSpot({ id: 'religious-135', name: '本能寺', category: 'religious', region: '近畿', coordinate: { latitude: 35.0116, longitude: 135.7681, elevationMeter: 40 }, era: 'muromachi', eraLabel: '応永22年（1415年）創建・法華宗大本山', religiousType: '寺院・法華宗大本山・信長公廟', summary: '法華信仰の大本山であり、本能寺の変と再建の歴史を伝える寺院です。', description: '本能寺は1415年創建の法華宗大本山で、織田信長が滞在し本能寺の変の舞台となった歴史で知られます。度重なる焼失と移転を経た境内、信長公廟と宝物から、宗教施設と政治史の交差を学べます。', sourceName: '法華宗大本山 本能寺 公式サイト', sourceUrl: 'https://kyoto-honnouji.jp/' }),
  makeNationalSpot({ id: 'religious-136', name: '最上稲荷山妙教寺', category: 'religious', region: '中国', coordinate: { latitude: 34.6816, longitude: 133.8265, elevationMeter: 35 }, era: 'nara', eraLabel: '最上尊信仰発祥の地・神仏習合の稲荷霊場', religiousType: '寺院・日蓮宗・神仏習合・稲荷信仰', summary: '寺院でありながら稲荷信仰を受け継ぐ、岡山の大きな祈願所です。', description: '最上稲荷は正式には最上稲荷山妙教寺といい、1200年以上の歴史を持つ日蓮宗の寺院です。最上尊・八大龍王・三面大黒尊を祀る境内から、日本の神仏習合と現代の祈願文化を紹介します。', sourceName: '最上稲荷山妙教寺 公式サイト', sourceUrl: 'https://inari.ne.jp/' }),
  makeNationalSpot({ id: 'religious-137', name: '玉置神社', category: 'religious', region: '近畿', coordinate: { latitude: 33.9190, longitude: 135.8430, elevationMeter: 1000 }, era: 'ancient', eraLabel: '熊野三山奥院・大峯修験の霊場', religiousType: '神社・山岳信仰・修験道', summary: '玉置山の山中で、熊野と大峯を結ぶ修験の信仰を伝える古社です。', description: '玉置神社は玉置山の山頂近くに鎮座し、熊野三山の奥院としても信仰されてきました。大峯修験の行場と深い森の社殿から、山そのものを祈りの場とする紀伊半島の宗教文化を紹介します。', sourceName: '玉置神社 公式サイト', sourceUrl: 'https://www.tamakijinja.or.jp/out_l/index.html' }),
  makeNationalSpot({ id: 'religious-138', name: '愛宕神社', category: 'religious', region: '近畿', coordinate: { latitude: 35.0587, longitude: 135.6345, elevationMeter: 924 }, era: 'ancient', eraLabel: '全国の愛宕社の総本宮・火伏せの信仰', religiousType: '神社・山岳信仰・火伏せ信仰', summary: '愛宕山の頂で、火災除けの祈りを全国へ広げた社です。', description: '京都の愛宕神社は愛宕山の山頂に鎮座し、全国の愛宕神社の総本宮として知られます。急な登拝道と火伏せの護符から、都市の暮らしと山岳信仰が結びついた歴史を学べます。', sourceName: '愛宕神社 公式サイト', sourceUrl: 'https://atagojinjya.jp/' }),
  makeNationalSpot({ id: 'religious-139', name: '岩木山神社', category: 'religious', region: '東北', coordinate: { latitude: 40.6036, longitude: 140.3376, elevationMeter: 200 }, era: 'ancient', eraLabel: '津軽の一宮・岩木山の山岳信仰', religiousType: '神社・山岳信仰・津軽の総鎮守', summary: '津軽の人々が「お岩木さま」と仰ぐ、岩木山の山麓の古社です。', description: '岩木山神社は岩木山をご神体として仰ぐ津軽の古社で、山頂の奥宮と山麓の社殿が一体となった信仰空間を形づくります。百沢街道の門前と重要文化財の建物から、北国の山岳信仰を紹介します。', sourceName: '岩木山神社 公式サイト', sourceUrl: 'https://www.iwakiyamajinja.or.jp/history.html' }),
  makeNationalSpot({ id: 'religious-140', name: '鳥海山大物忌神社', category: 'religious', region: '東北', coordinate: { latitude: 39.0890, longitude: 139.8780, elevationMeter: 30 }, era: 'ancient', eraLabel: '出羽国一宮・鳥海山の山海信仰', religiousType: '神社・出羽国一宮・山岳信仰', summary: '鳥海山と日本海を望み、農耕・航海・火山への祈りを集める古社です。', description: '鳥海山大物忌神社は出羽国一宮で、鳥海山そのものへの信仰を背景に吹浦の口宮と山頂の本社が結びついています。山と海の恵み、火山への畏れ、登拝の文化から庄内の信仰を学べます。', sourceName: '山形県神社庁（鳥海山大物忌神社）', sourceUrl: 'https://yamagata-jinjyacho.or.jp/shrine_detail/11209' }),
  makeNationalSpot({ id: 'religious-141', name: '柞原八幡宮', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.2285, longitude: 131.5677, elevationMeter: 45 }, era: 'heian', eraLabel: '豊後国一宮・宇佐八幡の分霊を祀る古社', religiousType: '神社・八幡信仰・豊後国一宮', summary: '豊後の国府と宇佐八幡信仰を結ぶ、大分の古い八幡宮です。', description: '柞原八幡宮は宇佐神宮から勧請された八幡宮で、豊後国一宮として地域の信仰を集めてきました。樹齢を重ねた楠の森と重要文化財の社殿から、八幡信仰と豊後の歴史を紹介します。', sourceName: '柞原八幡宮 公式サイト', sourceUrl: 'https://oita-yusuhara.com/' }),
  makeNationalSpot({ id: 'religious-142', name: '吉備津彦神社', category: 'religious', region: '中国', coordinate: { latitude: 34.6748, longitude: 133.8518, elevationMeter: 15 }, era: 'ancient', eraLabel: '備前国一宮・吉備の中山の祭祀', religiousType: '神社・備前国一宮・山岳信仰', summary: '吉備の中山を神体山として仰ぐ、備前国一宮です。', description: '吉備津彦神社は吉備の中山の麓に鎮座し、吉備津彦命への信仰を伝える備前国一宮です。朝日の祭祀や山の磐座、桃太郎伝承との結びつきから、地域の神話と古代祭祀を学べます。', sourceName: '吉備津彦神社 公式サイト', sourceUrl: 'https://kibitsuhiko.or.jp/' }),
  makeNationalSpot({ id: 'religious-143', name: '神魂神社', category: 'religious', region: '中国', coordinate: { latitude: 35.4096, longitude: 133.1275, elevationMeter: 35 }, era: 'muromachi', eraLabel: '現存最古級の大社造・出雲の古社', religiousType: '神社・大社造・出雲国造ゆかり', summary: '現存する最古の大社造本殿を伝える、出雲の重要な古社です。', description: '神魂神社は出雲国造ゆかりの社で、国宝の本殿は大社造の古い形式を今に伝えます。神聖な山と社殿、出雲の祭祀を通して、日本海側に育まれた建築と信仰の歴史を紹介します。', sourceName: '島根県神社庁（神魂神社）', sourceUrl: 'https://www.shimane-jinjacho.or.jp/matsue/d3165c812e871ed2b752b13b256c137ed5a1cfba.html' }),
  makeNationalSpot({ id: 'religious-144', name: '日御碕神社', category: 'religious', region: '中国', coordinate: { latitude: 35.4253, longitude: 132.6241, elevationMeter: 10 }, era: 'ancient', eraLabel: '日沉宮と神の宮・出雲の海辺の鎮守', religiousType: '神社・海上信仰・出雲の古社', summary: '夕日の海辺で、日を鎮める祈りと海上安全を伝える社です。', description: '日御碕神社は日沉宮と神の宮からなり、出雲の西方を守る社として信仰されてきました。朱塗りの社殿と日本海の景観から、太陽・海・航海をめぐる出雲の信仰を紹介します。', sourceName: '日御碕神社 公式サイト', sourceUrl: 'https://hinomisaki-jinja.jp/' }),
  makeNationalSpot({ id: 'religious-145', name: '玉若酢命神社', category: 'religious', region: '中国', coordinate: { latitude: 36.2065, longitude: 133.3278, elevationMeter: 10 }, era: 'heian', eraLabel: '隠岐国総社・隠岐造と馬入れ神事', religiousType: '神社・隠岐国総社・島嶼信仰', summary: '隠岐の国府と島の祭礼を伝える、隠岐国総社です。', description: '玉若酢命神社は隠岐国総社として、隠岐の政治と祭祀の中心を担ってきました。隠岐造の本殿や八百杉、境内を馬が駆ける祭礼から、離島に受け継がれた独自の信仰景観を学べます。', sourceName: 'しまね観光ナビ（玉若酢命神社）', sourceUrl: 'https://www.kankou-shimane.com/destination/20319' }),
  makeNationalSpot({ id: 'religious-146', name: '焼火神社', category: 'religious', region: '中国', coordinate: { latitude: 36.1050, longitude: 133.0140, elevationMeter: 250 }, era: 'ancient', eraLabel: '焼火山の岩窟に鎮座・海上安全の信仰', religiousType: '神社・海上信仰・島嶼信仰', summary: '焼火山の岩窟に鎮座し、航海者の目印と祈りの場になった社です。', description: '焼火神社は西ノ島の焼火山中腹の岩窟に鎮座し、古くから海上安全の信仰を集めてきました。船から見える山と険しい参道を通して、隠岐の海と島の暮らしに根づいた宗教文化を紹介します。', sourceName: '島根県神社庁（焼火神社）', sourceUrl: 'https://www.shimane-jinjacho.or.jp/nishinoshima/57fd3579256c0486c93cc808c812b4b0aaa9598a.html' }),
  makeNationalSpot({ id: 'religious-147', name: '天理教教会本部', category: 'religious', region: '近畿', coordinate: { latitude: 34.5961, longitude: 135.8377, elevationMeter: 70 }, era: 'meiji', eraLabel: '明治期に始まった天理教の教会本部・おぢば', religiousType: '教会本部・近代宗教', summary: '近代日本に生まれた天理教の教会本部で、信仰の中心「おぢば」を伝えます。', description: '天理教教会本部は奈良県天理市にあり、教祖中山みきゆかりの「おぢば」を中心に教会制度と信仰を広げてきました。近代以降に成立した宗教が、町の景観や海外布教へ展開する過程を紹介します。', sourceName: '天理教 公式サイト', sourceUrl: 'https://www.tenrikyo.or.jp/jpn/?guid=ON' }),
  makeNationalSpot({ id: 'religious-148', name: '金光教本部', category: 'religious', region: '中国', coordinate: { latitude: 34.5481, longitude: 133.5948, elevationMeter: 20 }, era: 'meiji', eraLabel: '金光大神ゆかり・金光教の本部', religiousType: '宗教本部・金光教', summary: '幕末から明治にかけて広がった金光教の信仰拠点です。', description: '金光教本部は岡山県浅口市金光町にあり、金光大神の信仰を受け継ぐ教団の中心です。駅と門前の町、本部の祭典から、近代に交通と教会制度を通じて広がった日本の宗教文化を学べます。', sourceName: '金光教 公式サイト（本部）', sourceUrl: 'https://www.konkokyo.jp/headquarters/facilities/' }),
  makeNationalSpot({ id: 'religious-149', name: '大本本部（綾部・梅松苑）', category: 'religious', region: '近畿', coordinate: { latitude: 35.2972, longitude: 135.2588, elevationMeter: 50 }, era: 'meiji', eraLabel: '綾部の祭祀センター・大本の宗教文化', religiousType: '宗教本部・大本', summary: '綾部の梅松苑を中心に、近代日本の宗教運動の一端を伝える拠点です。', description: '大本本部の綾部・梅松苑は、大本の祭祀センターとして位置づけられています。神苑や祭典、出版・文化活動の歴史から、近代日本に生まれた宗教運動が地域と社会へ広がった姿を紹介します。', sourceName: '大本 公式サイト', sourceUrl: 'https://www.oomoto.or.jp/index.html' }),
  makeNationalSpot({ id: 'religious-150', name: '鹿苑寺（金閣寺）', category: 'religious', region: '近畿', coordinate: { latitude: 35.0394, longitude: 135.7292, elevationMeter: 75 }, era: 'muromachi', eraLabel: '足利義満の北山殿・北山文化の禅寺', religiousType: '寺院・臨済宗相国寺派・世界遺産', summary: '金閣を中心に、室町幕府の北山文化と禅の景観を伝える寺院です。', description: '鹿苑寺は足利義満の北山殿を母胎とする臨済宗相国寺派の寺院で、金閣として知られる舎利殿を中心に庭園が広がります。政治・外交・芸術が結びついた北山文化を、宗教施設の景観から紹介します。', sourceName: '臨済宗相国寺派 金閣寺 公式サイト', sourceUrl: 'https://www.shokoku-ji.jp/kinkakuji/about/' }),
  makeNationalSpot({ id: 'religious-151', name: '慈照寺（銀閣寺）', category: 'religious', region: '近畿', coordinate: { latitude: 35.0270, longitude: 135.7982, elevationMeter: 60 }, era: 'muromachi', eraLabel: '足利義政の東山殿・東山文化の禅寺', religiousType: '寺院・臨済宗相国寺派・世界遺産', summary: '銀閣と東求堂、庭園を通して東山文化の美意識を伝える寺院です。', description: '慈照寺は足利義政の東山山荘を起源とする臨済宗の寺院で、銀閣や東求堂、庭園が東山文化の姿を伝えます。簡素な建築と庭園、茶の文化が結びついた室町後期の宗教文化を学べます。', sourceName: '臨済宗相国寺派 銀閣寺 公式サイト', sourceUrl: 'https://www.shokoku-ji.jp/ginkakuji/about/' }),
  makeNationalSpot({ id: 'religious-152', name: '西芳寺（苔寺）', category: 'religious', region: '近畿', coordinate: { latitude: 34.9904, longitude: 135.6856, elevationMeter: 55 }, era: 'muromachi', eraLabel: '夢窓疎石の庭園・古都京都の文化財', religiousType: '寺院・臨済宗・庭園文化', summary: '夢窓疎石が復興した庭園と苔の景観で、禅と日本庭園の歴史を伝えます。', description: '西芳寺は行基開創の伝承を持ち、1339年に夢窓疎石が禅寺として復興しました。池庭と枯山水が一体となった庭園は後世の作庭に大きな影響を与え、宗教と景観の関係を紹介します。', sourceName: '京都市公式サイト（西芳寺）', sourceUrl: 'https://www.city.kyoto.lg.jp/bunshi/page/0000005626.html' }),
  makeNationalSpot({ id: 'religious-153', name: '龍安寺', category: 'religious', region: '近畿', coordinate: { latitude: 35.0343, longitude: 135.7183, elevationMeter: 55 }, era: 'muromachi', eraLabel: '枯山水庭園を伝える禅寺・古都京都の文化財', religiousType: '寺院・臨済宗妙心寺派・禅庭', summary: '方丈庭園の石組を通して、禅の思想と抽象的な庭園表現を伝える寺院です。', description: '龍安寺は1450年に禅寺として整えられ、方丈南庭の白砂と石組で世界的に知られます。限られた空間に自然を抽象化する枯山水から、禅寺の修行と庭園文化の結びつきを学べます。', sourceName: '京都市公式サイト（龍安寺）', sourceUrl: 'https://www.city.kyoto.lg.jp/bunshi/page/0000005637.html' }),
  makeNationalSpot({ id: 'religious-154', name: '建仁寺', category: 'religious', region: '近畿', coordinate: { latitude: 35.0037, longitude: 135.7746, elevationMeter: 40 }, era: 'kamakura', eraLabel: '建仁2年（1202年）創建・京都最初の禅寺', religiousType: '寺院・臨済宗建仁寺派大本山・禅', summary: '栄西が開いた、京都最初の禅寺として知られる大本山です。', description: '建仁寺は栄西禅師が1202年に建立した臨済宗建仁寺派の大本山です。中国から伝わった禅と茶の文化、京都五山の歴史から、海外交流を背景にした日本の禅宗の展開を紹介します。', sourceName: '大本山 建仁寺 公式サイト', sourceUrl: 'https://www.kenninji.jp/know/' }),
  makeNationalSpot({ id: 'religious-155', name: '南禅寺', category: 'religious', region: '近畿', coordinate: { latitude: 35.0119, longitude: 135.7930, elevationMeter: 70 }, era: 'kamakura', eraLabel: '臨済宗南禅寺派大本山・京都五山別格', religiousType: '寺院・臨済宗南禅寺派大本山・禅', summary: '山門と水路閣、塔頭の景観が重なる京都東山の禅の中心です。', description: '南禅寺は亀山法皇の離宮を起源とし、臨済宗南禅寺派の大本山として発展しました。山門・方丈庭園・水路閣が重なる境内から、中世の禅院と近代の都市基盤が共存する歴史を学べます。', sourceName: '南禅寺 公式サイト', sourceUrl: 'https://nanzenji.or.jp/' }),
  makeNationalSpot({ id: 'religious-156', name: '興福寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.6830, longitude: 135.8328, elevationMeter: 90 }, era: 'nara', eraLabel: '南都七大寺・法相宗大本山', religiousType: '寺院・法相宗大本山・奈良の仏教文化', summary: '藤原氏の氏寺として栄え、奈良の仏教美術と都市景観を伝える大寺院です。', description: '興福寺は藤原氏の氏寺として発展し、法相宗の大本山として奈良の政治と宗教の中心を担いました。五重塔・中金堂・国宝館の仏像群から、古代国家と寺院の関係を紹介します。', sourceName: '法相宗大本山 興福寺 公式サイト', sourceUrl: 'https://www.kohfukuji.com/about/overview/' }),
  makeNationalSpot({ id: 'religious-157', name: '増上寺', category: 'religious', region: '関東', coordinate: { latitude: 35.6574, longitude: 139.7480, elevationMeter: 25 }, era: 'muromachi', eraLabel: '浄土宗七大本山・徳川将軍家の菩提寺', religiousType: '寺院・浄土宗大本山・徳川家霊廟', summary: '東京タワーの足元で、浄土宗と徳川将軍家の歴史が重なる大本山です。', description: '増上寺は浄土宗の七大本山の一つで、江戸時代には徳川将軍家の菩提寺として大きく発展しました。大殿・三解脱門・徳川家墓所から、都市の寺院と近世政治の結びつきを学べます。', sourceName: '浄土宗大本山 増上寺 公式サイト', sourceUrl: 'https://www.zojoji.or.jp/info/' }),
  makeNationalSpot({ id: 'religious-158', name: '神田明神（神田神社）', category: 'religious', region: '関東', coordinate: { latitude: 35.7020, longitude: 139.7677, elevationMeter: 25 }, era: 'nara', eraLabel: '天平2年（730年）創建伝承・江戸総鎮守', religiousType: '神社・江戸総鎮守・都市祭礼', summary: '神田・日本橋・秋葉原など108町会を氏子区域とする東京の古社です。', description: '神田明神は730年創建の伝承を持ち、江戸時代には江戸総鎮守として神田祭とともに発展しました。将門信仰、町の氏神、現代の都市文化から、地域社会を支える神社の役割を紹介します。', sourceName: '江戸総鎮守 神田明神 公式サイト', sourceUrl: 'https://www.kandamyoujin.or.jp/profile/' }),
  makeNationalSpot({ id: 'religious-159', name: '東京復活大聖堂（ニコライ堂）', category: 'religious', region: '関東', coordinate: { latitude: 35.6994, longitude: 139.7644, elevationMeter: 20 }, era: 'meiji', eraLabel: '明治24年（1891年）竣工・日本正教会の大聖堂', religiousType: '教会・日本正教会・重要文化財', summary: '日本に伝わった正教会の信仰と、神田駿河台の近代建築を伝える大聖堂です。', description: '東京復活大聖堂は日本正教会の首座主教座大聖堂で、聖ニコライの伝道を背景に1891年に竣工しました。ビザンティン様式の聖堂と奉神礼から、日本に根づいた東方正教会の歴史を紹介します。', sourceName: '日本ハリストス正教会 東京復活大聖堂 公式サイト', sourceUrl: 'https://nikolaido.org/top-2/history/' }),
  makeNationalSpot({ id: 'religious-160', name: '東京カテドラル聖マリア大聖堂', category: 'religious', region: '関東', coordinate: { latitude: 35.7123, longitude: 139.7264, elevationMeter: 25 }, era: 'meiji', eraLabel: '東京大司教区の母教会・丹下健三設計の聖堂', religiousType: '教会・カトリック東京大司教区・大聖堂', summary: '東京大司教区の司教座聖堂で、戦災復興と現代建築の歴史を伝えます。', description: '東京カテドラル聖マリア大聖堂は東京大司教区の母教会で、1899年の聖堂を起源とします。戦災焼失後に丹下健三の設計で再建された現在の聖堂から、キリスト教の信仰と戦後建築を紹介します。', sourceName: 'カトリック東京大司教区 公式サイト', sourceUrl: 'https://tokyo.catholic.jp/archdiocese/cathedral/' }),
  makeNationalSpot({ id: 'religious-161', name: '東京ジャーミイ・ディヤーナト トルコ文化センター', category: 'religious', region: '関東', coordinate: { latitude: 35.6655, longitude: 139.6845, elevationMeter: 40 }, era: 'showa', eraLabel: '日本のイスラーム文化と礼拝の拠点', religiousType: 'モスク・イスラーム・文化交流拠点', summary: '礼拝とトルコ文化交流を通して、日本の多文化共生を伝えるモスクです。', description: '東京ジャーミイは在日ムスリムの礼拝所としての歴史を受け継ぎ、2000年に現在のモスクと文化センターが開館しました。礼拝・断食月・文化講座から、日本の都市におけるイスラームの信仰と交流を紹介します。', sourceName: '東京ジャーミイ 公式サイト', sourceUrl: 'https://tokyocamii.org/ja/about-tc/' }),
  makeNationalSpot({ id: 'religious-162', name: '大洗磯前神社', category: 'religious', region: '関東', coordinate: { latitude: 36.3130, longitude: 140.5917, elevationMeter: 20 }, era: 'heian', eraLabel: '斉衡3年（856年）創建伝承・海辺の磯神信仰', religiousType: '神社・海上信仰・磯の祭祀', summary: '海上の神磯と社殿が一体となった、東国の古い海辺の信仰拠点です。', description: '大洗磯前神社は856年に神が降臨したという伝承を持ち、海辺の神磯と社殿が信仰の景観を形づくります。大己貴命・少彦名命への祈りから、海と病気平癒、地域の暮らしを結ぶ信仰を学べます。', sourceName: '大洗磯前神社 公式サイト', sourceUrl: 'https://www.oarai-isosakijinja.net/' }),
  makeNationalSpot({ id: 'religious-163', name: '櫛田神社（博多）', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.5933, longitude: 130.4108, elevationMeter: 5 }, era: 'nara', eraLabel: '天平宝字元年（757年）創建伝承・博多の総鎮守', religiousType: '神社・都市祭礼・博多祇園山笠', summary: '博多の町と祇園山笠を見守ってきた、港町の総鎮守です。', description: '櫛田神社は757年創建の伝承を持ち、博多の総鎮守として信仰を集めてきました。博多祇園山笠や日宋貿易の港町の記憶から、神社が都市の祭りと共同体を支える姿を紹介します。', sourceName: '福岡市文化財（櫛田神社）', sourceUrl: 'https://bunkazai.city.fukuoka.lg.jp/sp/cultural_properties/detail/88' }),
  makeNationalSpot({ id: 'religious-164', name: '円覚寺跡（首里）', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.2205, longitude: 127.7184, elevationMeter: 35 }, era: 'muromachi', eraLabel: '琉球王国の第二尚氏ゆかり・王家の菩提寺跡', religiousType: '寺院跡・臨済宗・琉球王国', summary: '琉球王国の王家と臨済宗のつながりを伝える、首里の寺院跡です。', description: '円覚寺跡は第二尚氏の尚真王が建立した臨済宗寺院で、琉球王国の王家の菩提寺として機能しました。放生橋や総門などの遺構と復元整備から、海域交流の中で育った琉球の仏教文化を紹介します。', sourceName: '沖縄県公式サイト（円覚寺跡）', sourceUrl: 'https://www.pref.okinawa.jp/bunkakoryu/bunkageijutsu/1009673/1009684/1009690.html' }),
  makeNationalSpot({ id: 'religious-165', name: '玉陵（たまうどぅん）', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.2190, longitude: 127.7137, elevationMeter: 35 }, era: 'muromachi', eraLabel: '第二尚氏王統の陵墓・琉球王国の祭祀空間', religiousType: '王陵・琉球王国・祖先祭祀', summary: '琉球王国の国王と王族が葬られた、首里の王陵です。', description: '玉陵は第二尚氏王統の王陵として築かれ、墓室・石牆・庭を備えた琉球独自の祖先祭祀の空間です。王国の政治と家族・祖先への祈りが結びついた歴史を紹介します。', sourceName: '那覇市公式サイト（指定文化財一覧）', sourceUrl: 'https://www.city.naha.okinawa.jp/_res/projects/default_project/_page_/001/006/032/r7-6.pdf' }),
  makeNationalSpot({ id: 'religious-166', name: '平安神宮', category: 'religious', region: '近畿', coordinate: { latitude: 35.0161, longitude: 135.7824, elevationMeter: 45 }, era: 'meiji', eraLabel: '明治28年（1895年）創建・平安京遷都1100年の記念社', religiousType: '神社・桓武天皇祭祀・近代の都市祭礼', summary: '平安京の記憶を近代京都に再構成した、朱塗りの大社殿と大庭園の神社です。', description: '平安神宮は平安京遷都1100年を記念して1895年に創建され、桓武天皇と孝明天皇を祀ります。時代祭と神苑の景観から、近代に歴史都市の記憶をつくり直した宗教文化を学べます。', sourceName: '平安神宮 公式サイト', sourceUrl: 'https://www.heianjingu.or.jp/' }),
  makeNationalSpot({ id: 'religious-167', name: '姥神大神宮', category: 'religious', region: '北海道', coordinate: { latitude: 41.8690, longitude: 140.1270, elevationMeter: 8 }, era: 'muromachi', eraLabel: '北海道最古級の古社・江差の渡御祭', religiousType: '神社・港町の総鎮守・海上信仰', summary: 'ニシン漁で栄えた江差の港町と、北海道の祭礼文化を伝える古社です。', description: '姥神大神宮は江差の港町で信仰を集め、豊漁と町の安全を祈る渡御祭を受け継いできました。海上交易とニシン漁、豪華な山車が行き交う祭りから、北の海辺に根づいた神社文化を紹介します。', sourceName: '北海道神社庁（姥神大神宮）', sourceUrl: 'https://hokkaidojinjacho.jp/%E5%A7%A5%E7%A5%9E%E5%A4%A7%E7%A5%9E%E5%AE%AE/' }),
  makeNationalSpot({ id: 'religious-168', name: '上川神社', category: 'religious', region: '北海道', coordinate: { latitude: 43.7440, longitude: 142.3510, elevationMeter: 145 }, era: 'meiji', eraLabel: '明治26年（1893年）創立・旭川の開拓守護', religiousType: '神社・開拓神社・地域の総鎮守', summary: '旭川の開拓と上川地方の発展を見守ってきた、神楽岡の鎮守です。', description: '上川神社は明治期に上川地方の開拓守護と旭川の鎮守として創立され、現在は神楽岡に鎮座します。開拓の歴史と市民の奉納によって整えられた境内から、近代北海道の地域形成を学べます。', sourceName: '上川神社 公式サイト', sourceUrl: 'https://www.kamikawajinja.com/outline.html' }),
  makeNationalSpot({ id: 'religious-169', name: '天台寺', category: 'religious', region: '東北', coordinate: { latitude: 40.2440, longitude: 141.2230, elevationMeter: 430 }, era: 'nara', eraLabel: '神亀5年（728年）開山伝承・東北最北の観音霊場', religiousType: '寺院・天台宗・観音信仰', summary: '桂の木の観音を中心に、北東北の仏教文化と御山信仰を伝える古刹です。', description: '天台寺は728年開山の伝承を持つ天台宗の寺院で、古代最北の仏教文化の地として信仰を集めてきました。桂の木の観音、南部氏の保護、瀬戸内寂聴師の活動から、地域に受け継がれる観音霊場を紹介します。', sourceName: '天台寺 公式サイト（歴史）', sourceUrl: 'https://www.tendaiji.or.jp/rekishi.html' }),
  makeNationalSpot({ id: 'religious-170', name: '伊佐須美神社', category: 'religious', region: '東北', coordinate: { latitude: 37.4580, longitude: 139.8390, elevationMeter: 220 }, era: 'ancient', eraLabel: '名神大社・岩代国一宮・会津の総鎮守', religiousType: '神社・一宮・会津の古社', summary: '会津の地名と文化の起源を伝え、田植え祭などを受け継ぐ古社です。', description: '伊佐須美神社は会津の聖地として、伊弉諾尊・伊弉冉尊などを祀り、名神大社・岩代国一宮と称されてきました。御田植祭や四道将軍の伝承から、農耕と地域の成り立ちに結びつく信仰を学べます。', sourceName: '会津六詣出（伊佐須美神社）', sourceUrl: 'https://www.aizu-reichi.gr.jp/isasumi/index.html' }),
  makeNationalSpot({ id: 'religious-171', name: '仁科神明宮', category: 'religious', region: '中部', coordinate: { latitude: 36.5160, longitude: 137.8580, elevationMeter: 720 }, era: 'edo', eraLabel: '国宝・日本最古の神明造を伝える社', religiousType: '神社・神明造・式年造替', summary: '伊勢神宮とのつながりと式年造替の伝統を伝える、長野県大町の国宝社殿です。', description: '仁科神明宮は仁科御厨の鎮護として天照大神を勧請したとされ、本殿・中門・釣屋に日本最古の神明造の形式を伝えます。式年造替や古式作始めの神事から、建築と農耕祭祀の継承を紹介します。', sourceName: '国宝 仁科神明宮 公式サイト', sourceUrl: 'https://www.sinmeigu.jp/' }),
  makeNationalSpot({ id: 'religious-172', name: '雄山神社前立社壇', category: 'religious', region: '中部', coordinate: { latitude: 36.5750, longitude: 137.3130, elevationMeter: 300 }, era: 'muromachi', eraLabel: '立山信仰の里宮・越中国一宮', religiousType: '神社・山岳信仰・立山信仰', summary: '立山の登拝道の起点として、山と里を結んだ富山の一宮です。', description: '雄山神社前立社壇は立山信仰の里宮として、岩峅寺から立山山頂へ向かう信仰の道と結びついてきました。室町時代の形式を残す本殿と旧宿坊の景観から、山岳信仰を支えた地域社会を紹介します。', sourceName: '雄山神社前立社壇 公式サイト', sourceUrl: 'https://www.oyamajinjya-maetateshadan.org/access/' }),
  makeNationalSpot({ id: 'religious-173', name: '平泉寺白山神社', category: 'religious', region: '中部', coordinate: { latitude: 36.0160, longitude: 136.5170, elevationMeter: 330 }, era: 'nara', eraLabel: '白山登拝口の山岳寺院・白山信仰の拠点', religiousType: '神社・白山信仰・旧山岳寺院', summary: '白山への越前側登拝口で、広大な坊院跡と苔むす参道を伝える聖地です。', description: '平泉寺は泰澄が開いたと伝わる白山信仰の拠点寺院で、中世には数千の坊院を抱える大きな宗教勢力となりました。発掘された石畳や坊院跡から、神仏習合の山岳寺院の姿を学べます。', sourceName: '勝山市公式サイト（白山平泉寺旧境内）', sourceUrl: 'https://www.city.katsuyama.fukui.jp/heisenji/about/' }),
  makeNationalSpot({ id: 'religious-174', name: '大神山神社奥宮', category: 'religious', region: '中国', coordinate: { latitude: 35.3940, longitude: 133.5350, elevationMeter: 780 }, era: 'nara', eraLabel: '大山を神体山とする山岳信仰の奥宮', religiousType: '神社・山岳信仰・神仏習合', summary: '大山の自然石の参道を登り、神体山への祈りを伝える中国地方の霊場です。', description: '大神山神社奥宮は大山を神体山とする古社で、神仏習合の時代には大智明権現を祀る信仰の中心でした。長い自然石の参道と壮大な権現造の社殿から、山の神と仏が重なった大山信仰を紹介します。', sourceName: '大神山神社 公式サイト', sourceUrl: 'https://www.oogamiyama.or.jp/%E7%A5%9E%E7%A4%BE%E7%94%B1%E7%B7%92/' }),
  makeNationalSpot({ id: 'religious-176', name: '宝満宮竈門神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.5350, longitude: 130.5680, elevationMeter: 100 }, era: 'asuka', eraLabel: '宝満山の山岳信仰・大宰府の鬼門鎮護', religiousType: '神社・山岳信仰・修験道', summary: '大宰府を守る宝満山で、航海安全と修験の祈りを集めてきた神社です。', description: '竈門神社は大宰府の鬼門にあたる宝満山で国家鎮護の祭祀が始まったことを起源とし、遣隋使・遣唐使の航海安全も祈られました。上宮への登拝道と山伏の修行から、古代外交と山岳信仰の関係を紹介します。', sourceName: '竈門神社 公式サイト（歴史）', sourceUrl: 'https://kamadojinja.or.jp/history/' }),
  makeNationalSpot({ id: 'religious-177', name: '鎮西大社 諏訪神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.7510, longitude: 129.8830, elevationMeter: 35 }, era: 'edo', eraLabel: '長崎くんちの舞台・長崎の氏神', religiousType: '神社・都市祭礼・長崎の氏神', summary: '異国文化が交差する長崎で、長崎くんちと地域の信仰を支える神社です。', description: '鎮西大社諏訪神社は長崎の氏神として信仰され、10月の長崎くんちは異国情緒と地域の祭礼が重なる重要無形民俗文化財です。坂の町の境内と祭りの奉納から、港町の共同体を紹介します。', sourceName: '鎮西大社 諏訪神社 公式サイト', sourceUrl: 'https://www.osuwasan.jp/' }),
  makeNationalSpot({ id: 'religious-178', name: '崇福寺（長崎）', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.7420, longitude: 129.8820, elevationMeter: 15 }, era: 'edo', eraLabel: '寛永6年（1629年）創建・長崎の唐寺', religiousType: '寺院・黄檗宗・華僑の信仰拠点', summary: '福州出身の人々が創建し、中国の建築と媽祖信仰を伝える長崎の唐寺です。', description: '崇福寺は1629年に長崎在住の福州出身者が創建した黄檗宗寺院で、福州寺とも呼ばれます。大雄宝殿や第一峰門の中国様式から、海域交流と華僑の信仰が日本の都市に根づいた歴史を紹介します。', sourceName: '長崎市公式観光サイト（崇福寺）', sourceUrl: 'https://www.at-nagasaki.jp/spot/96' }),
  makeNationalSpot({ id: 'religious-179', name: '上杉神社', category: 'religious', region: '東北', coordinate: { latitude: 37.9060, longitude: 140.1110, elevationMeter: 250 }, era: 'meiji', eraLabel: '上杉謙信を祀る米沢城本丸の神社', religiousType: '神社・人物祭祀・城下町の鎮守', summary: '米沢城本丸跡で、上杉謙信と米沢の城下町の記憶を伝える神社です。', description: '上杉神社は上杉謙信の遺骸を祀った御堂を明治期に神社へ改めたことに始まり、現在も米沢城本丸跡に鎮座します。仏式から神式への転換と藩祖を敬う地域文化から、近代の人物祭祀を紹介します。', sourceName: '羽前米沢 上杉神社 公式サイト', sourceUrl: 'https://uesugi-jinja.or.jp/history/' }),

  // 城郭（全国）
  makeNationalSpot({ id: 'castle-1', name: '弘前城', category: 'castle', region: '東北', coordinate: { latitude: 40.6079, longitude: 140.4648, elevationMeter: 42 }, era: 'edo', eraLabel: '江戸期の現存天守・弘前公園', castleType: '現存天守・国指定史跡', summary: '津軽氏の居城で、東北に残る現存天守の一つです。', description: '弘前城は弘前藩津軽氏の居城として整えられ、現在は弘前公園として櫓・門・堀などを伝えています。桜の名所としての景観と、北国の城下町の歴史を一緒にたどれます。', sourceName: '弘前公園 公式サイト', sourceUrl: 'https://www.hirosakipark.jp/' }),
  makeNationalSpot({ id: 'castle-2', name: '盛岡城跡', category: 'castle', region: '東北', coordinate: { latitude: 39.7020, longitude: 141.1546, elevationMeter: 135 }, era: 'edo', eraLabel: '南部氏の居城・石垣が残る城跡', castleType: '国指定史跡・城跡公園', summary: '南部氏の居城で、東北地方を代表する石垣の城跡です。', description: '盛岡城は南部氏が築いた城で、現在は石垣や曲輪の地形が盛岡城跡公園に残ります。北上川・中津川の合流点に近い立地から、城下町の成立を考えられます。', sourceName: '盛岡市 公式サイト（盛岡城跡）', sourceUrl: 'https://www.city.morioka.iwate.jp/' }),
  makeNationalSpot({ id: 'castle-3', name: '仙台城跡', category: 'castle', region: '東北', coordinate: { latitude: 38.2521, longitude: 140.8566, elevationMeter: 110 }, era: 'edo', eraLabel: '慶長年間築城・伊達氏の居城', castleType: '国指定史跡・城跡', summary: '青葉山に築かれた、伊達政宗と仙台城下の中心です。', description: '仙台城は伊達政宗が青葉山に築いた居城で、城跡からは広瀬川と仙台平野を見渡せます。石垣や大手門跡を通して、近世の城と都市の関係を学べます。', sourceName: '仙台市観光情報サイト', sourceUrl: 'https://www.sentabi.jp/guidebook/'}),
  makeNationalSpot({ id: 'castle-4', name: '会津若松城（鶴ヶ城）', category: 'castle', region: '東北', coordinate: { latitude: 37.4873, longitude: 139.9294, elevationMeter: 218 }, era: 'edo', eraLabel: '蒲生氏郷が整備・戊辰戦争の舞台', castleType: '復元天守・国指定史跡', summary: '会津の政治と戊辰戦争の記憶を伝える、赤瓦の城です。', description: '会津若松城は蒲生氏郷らによって整備され、幕末の戊辰戦争では籠城戦の舞台となりました。赤瓦の天守と城跡の地形から、会津の近世・近代をたどれます。', sourceName: '会津若松城 公式サイト', sourceUrl: 'https://www.tsurugajo.com/turugajo/' }),
  makeNationalSpot({ id: 'castle-5', name: '江戸城跡', category: 'castle', region: '関東', coordinate: { latitude: 35.6852, longitude: 139.7528, elevationMeter: 25 }, era: 'edo', eraLabel: '徳川将軍家の居城・皇居東御苑', castleType: '特別史跡・城跡', summary: '江戸幕府の中枢で、皇居東御苑に石垣や門が残ります。', description: '江戸城は徳川将軍家の居城として拡張され、現在も皇居東御苑などに天守台・石垣・門・濠の遺構が残ります。巨大な城郭が都市東京へ変化した過程を現地で考えられます。', sourceName: '宮内庁 公式サイト（皇居東御苑）', sourceUrl: 'https://www.kunaicho.go.jp/visit/kyoto/kyoto.html' }),
  makeNationalSpot({ id: 'castle-6', name: '小田原城', category: 'castle', region: '関東', coordinate: { latitude: 35.2509, longitude: 139.1530, elevationMeter: 28 }, era: 'sengoku', eraLabel: '北条氏の本拠・戦国最大級の城郭', castleType: '復元天守・国指定史跡', summary: '北条氏の本拠として、関東の戦国史を象徴する城です。', description: '小田原城は北条氏の本拠として発展し、豊臣秀吉の小田原攻めを経て近世城郭へ移りました。天守や総構の名残から、城が町全体を包む構造を読み取れます。', sourceName: '小田原城 公式サイト', sourceUrl: 'https://odawaracastle.com/' }),
  makeNationalSpot({ id: 'castle-7', name: '松本城', category: 'castle', region: '中部', coordinate: { latitude: 36.2381, longitude: 137.9687, elevationMeter: 590 }, era: 'sengoku', eraLabel: '現存最古の五重六階天守・国宝', castleType: '国宝・現存天守', summary: '黒い外観と現存天守で知られる、信濃の国宝城郭です。', description: '松本城は戦国期の深志城を起源とし、現存する五重六階の天守として日本最古とされています。戦国と江戸の建築が重なる天守群を、城下町とともに見学できます。', sourceName: '国宝 松本城 公式サイト', sourceUrl: 'https://www.matsumoto-castle.jp/about/' }),
  makeNationalSpot({ id: 'castle-8', name: '金沢城', category: 'castle', region: '中部', coordinate: { latitude: 36.5621, longitude: 136.6626, elevationMeter: 45 }, era: 'edo', eraLabel: '加賀藩前田家の居城・城下町の核', castleType: '国指定史跡・復元建築', summary: '加賀百万石の政治・文化を支えた、金沢の城跡です。', description: '金沢城は加賀藩前田家の居城として整えられ、石川門や菱櫓・五十間長屋などの建築が復元されています。兼六園と隣接する立地から、藩政都市の構造をたどれます。', sourceName: '石川県 公式サイト（金沢城公園）', sourceUrl: 'https://www.pref.ishikawa.jp/siro-niwa/kanazawajou/' }),
  makeNationalSpot({ id: 'castle-9', name: '犬山城', category: 'castle', region: '中部', coordinate: { latitude: 35.3880, longitude: 136.9395, elevationMeter: 80 }, era: 'sengoku', eraLabel: '現存最古級の天守・国宝', castleType: '国宝・現存天守', summary: '木曽川を見下ろす、現存最古級の国宝天守です。', description: '犬山城は木曽川沿いの丘に築かれ、現存天守の中でも古い形式を残す国宝です。城下町と河川交通の関係を歩いて確かめられます。', sourceName: '犬山城 公式サイト', sourceUrl: 'https://inuyamajo.jp/' }),
  makeNationalSpot({ id: 'castle-10', name: '名古屋城', category: 'castle', region: '中部', coordinate: { latitude: 35.1856, longitude: 136.8990, elevationMeter: 12 }, era: 'edo', eraLabel: '慶長15年（1610年）築城・尾張徳川家', castleType: '特別史跡・近世城郭', summary: '尾張徳川家の居城で、金鯱と巨大な石垣で知られます。', description: '名古屋城は徳川家康が尾張の要衝に築かせた城で、尾張徳川家の居城となりました。本丸御殿の復元や石垣・堀を通して、近世城郭の規模を体感できます。', sourceName: '名古屋城 公式サイト', sourceUrl: 'https://www.nagoyajo.city.nagoya.jp/' }),
  makeNationalSpot({ id: 'castle-11', name: '彦根城', category: 'castle', region: '近畿', coordinate: { latitude: 35.2769, longitude: 136.2510, elevationMeter: 136 }, era: 'edo', eraLabel: '元和8年（1622年）完成・現存天守', castleType: '国宝・現存天守', summary: '琵琶湖東岸に残る、井伊家の国宝天守です。', description: '彦根城は井伊家の居城として整備され、天守・櫓・門・石垣・堀がまとまって残ります。城下町と琵琶湖を結ぶ立地から、江戸時代の交通と政治を読み解けます。', sourceName: '彦根城 公式サイト', sourceUrl: 'https://hikonecastle.com/' }),
  makeNationalSpot({ id: 'castle-12', name: '姫路城', category: 'castle', region: '近畿', coordinate: { latitude: 34.8394, longitude: 134.6939, elevationMeter: 46 }, era: 'edo', eraLabel: '17世紀初頭の城郭建築・世界文化遺産', castleType: '世界文化遺産・国宝・現存天守', summary: '白い連立天守と防御構造が残る、日本を代表する城郭です。', description: '姫路城は17世紀初頭の城郭建築を代表し、天守群・櫓・門・石垣・堀が良好に保存されています。世界文化遺産と国宝の両方から、日本の城郭文化を学べます。', sourceName: '姫路城 公式サイト（姫路市）', sourceUrl: 'https://www.city.himeji.lg.jp/castle/0000007744.html' }),
  makeNationalSpot({ id: 'castle-13', name: '松江城', category: 'castle', region: '中国', coordinate: { latitude: 35.4747, longitude: 133.0505, elevationMeter: 30 }, era: 'edo', eraLabel: '現存天守・国宝・堀尾氏の居城', castleType: '国宝・現存天守', summary: '宍道湖と城下町を望む、山陰に残る国宝天守です。', description: '松江城は堀尾氏が築き、江戸期の姿を伝える現存天守が国宝に指定されています。堀や城下町、宍道湖とつながる景観から、水都松江の歴史をたどれます。', sourceName: '松江城 公式サイト', sourceUrl: 'https://www.matsue-castle.jp/' }),
  makeNationalSpot({ id: 'castle-14', name: '岡山城', category: 'castle', region: '中国', coordinate: { latitude: 34.6677, longitude: 133.9350, elevationMeter: 18 }, era: 'sengoku', eraLabel: '宇喜多秀家が整備・黒い外観の城', castleType: '復元天守・国指定史跡', summary: '旭川沿いに築かれ、黒い外観から烏城と呼ばれる城です。', description: '岡山城は宇喜多秀家が整備し、旭川を利用した縄張りと黒い外観から烏城の名で知られます。後楽園と向かい合う立地から、城と庭園がつくる岡山の景観を学べます。', sourceName: '岡山城 公式サイト', sourceUrl: 'https://okayama-castle.jp/' }),
  makeNationalSpot({ id: 'castle-15', name: '高知城', category: 'castle', region: '四国', coordinate: { latitude: 33.5611, longitude: 133.5317, elevationMeter: 45 }, era: 'edo', eraLabel: '山内氏の居城・本丸御殿が残る城', castleType: '重要文化財・現存天守', summary: '天守と本丸御殿がそろって残る、土佐の城下町の核です。', description: '高知城は山内氏の居城として築かれ、天守と本丸御殿を含む本丸の建物がまとまって残ります。城下町の通りと合わせて、土佐藩の政治拠点をたどれます。', sourceName: '高知城 公式サイト', sourceUrl: 'https://kochipark.jp/kochijyo/' }),
  makeNationalSpot({ id: 'castle-16', name: '熊本城', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.8062, longitude: 130.7058, elevationMeter: 50 }, era: 'edo', eraLabel: '慶長12年（1607年）完成・加藤清正の名城', castleType: '特別史跡・復元天守', summary: '加藤清正が築き、近代の戦争と地震の記憶も刻む大城郭です。', description: '熊本城は1607年に加藤清正が完成させた城で、明治期の戦闘や熊本地震を経て保存・復旧が続けられています。石垣・本丸御殿・天守から、城の強さと災害復旧を学べます。', sourceName: '熊本城 公式サイト（歴史）', sourceUrl: 'https://castle.kumamoto-guide.jp/history/' }),
  makeNationalSpot({ id: 'castle-17', name: '首里城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 26.2173, longitude: 127.7197, elevationMeter: 120 }, era: 'medieval', eraLabel: '琉球王国の王城・世界遺産関連資産', castleType: '国指定史跡・琉球王国の城跡', summary: '琉球王国の政治・外交・祭祀を担った王城です。', description: '首里城は琉球王国の王城として政治・外交・文化の中心となり、正殿などの復元と城跡の保存が進められています。日本の城郭とは異なる石垣・御庭・門の構成を学べる重要拠点です。', sourceName: '首里城公園 公式サイト', sourceUrl: 'https://oki-park.jp/shurijo/' }),
  makeNationalSpot({ id: 'castle-18', name: '松山城', category: 'castle', region: '四国', coordinate: { latitude: 33.8456, longitude: 132.7657, elevationMeter: 132 }, era: 'edo', eraLabel: '加藤嘉明が築城・現存天守', castleType: '重要文化財・現存天守', summary: '松山市街を見下ろす山城で、現存天守と城郭遺構が残ります。', description: '松山城は勝山の山頂に築かれ、天守・櫓・門など江戸期の姿を伝える建物が残ります。瀬戸内を望む立地から、四国の城下町と海上交通の関係を考えられます。', sourceName: '松山城 公式サイト', sourceUrl: 'https://www.matsuyamajo.jp/' }),
  makeNationalSpot({ id: 'castle-19', name: '丸亀城', category: 'castle', region: '四国', coordinate: { latitude: 34.2872, longitude: 133.8008, elevationMeter: 66 }, era: 'edo', eraLabel: '現存天守・高石垣の城', castleType: '重要文化財・現存天守', summary: '日本一の高さと称される石垣に築かれた、讃岐の現存天守です。', description: '丸亀城は亀山に築かれ、急勾配の高石垣と現存天守が特徴です。瀬戸内の島々を望む立地から、城郭の防御と海上交通を一緒に見ることができます。', sourceName: '丸亀城 公式サイト', sourceUrl: 'https://www.marugame-castle.jp/' }),
  makeNationalSpot({ id: 'castle-20', name: '安土城跡', category: 'castle', region: '近畿', coordinate: { latitude: 35.1420, longitude: 136.1260, elevationMeter: 190 }, era: 'sengoku', eraLabel: '織田信長の居城・天下布武の象徴', castleType: '特別史跡・城跡', summary: '織田信長が築いた、近世城郭の先駆けとなる山城跡です。', description: '安土城は織田信長が築いた城で、壮大な石垣・大手道・礎石などの遺構が安土山に残ります。天守を中心とする城の見せ方が、後世の城郭へ与えた影響を考える拠点です。', sourceName: '近江八幡市 公式サイト（安土城跡）', sourceUrl: 'https://www.city.omihachiman.lg.jp/' }),
  makeNationalSpot({ id: 'castle-21', name: '五稜郭', category: 'castle', region: '北海道', coordinate: { latitude: 41.7969, longitude: 140.7567, elevationMeter: 14 }, era: 'edo', eraLabel: '幕末の星形要塞・箱館戦争の舞台', castleType: '特別史跡・西洋式城郭', summary: '幕末に築かれた星形要塞で、箱館戦争の記憶を伝える城跡です。', description: '五稜郭は幕末に箱館奉行所の拠点として築かれた西洋式の城郭です。星形の土塁と堀、箱館戦争に関わる歴史から、近代化の入り口に立つ日本の城を学べます。', sourceName: '函館市公式サイト（五稜郭の概要）', sourceUrl: 'https://www.city.hakodate.hokkaido.jp/docs/2014011601482/' }),
  makeNationalSpot({ id: 'castle-22', name: '山形城跡', category: 'castle', region: '東北', coordinate: { latitude: 38.2556, longitude: 140.3278, elevationMeter: 145 }, era: 'edo', eraLabel: '最上氏の居城・霞城公園', castleType: '国指定史跡・城跡公園', summary: '最上氏の居城で、復元された門や石垣が残る平城です。', description: '山形城は最上氏の居城として整えられ、現在は霞城公園として本丸一文字門や石垣の復原が進められています。城下町山形の中心構造を歩いて確認できます。', sourceName: '山形市公式サイト（山形城跡）', sourceUrl: 'https://www.city.yamagata-yamagata.lg.jp/kurashi/koen/1006541/1006544/1003675.html' }),
  makeNationalSpot({ id: 'castle-23', name: '甲府城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.6577, longitude: 138.5684, elevationMeter: 280 }, era: 'sengoku', eraLabel: '徳川家康の甲斐支配と城下町の核', castleType: '県指定史跡・舞鶴城公園', summary: '甲府盆地を見下ろす石垣と城下町の歴史を伝える城跡です。', description: '甲府城は戦国末期に築かれ、江戸時代には甲府の政治拠点となりました。舞鶴城公園に残る石垣や稲荷櫓から、甲府盆地と甲州の交通を考えられます。', sourceName: '山梨県公式観光情報（甲府城）', sourceUrl: 'https://www.yamanashi-kankou.jp/history/koufujo/' }),
  makeNationalSpot({ id: 'castle-24', name: '松代城跡', category: 'castle', region: '中部', coordinate: { latitude: 36.5686, longitude: 138.1982, elevationMeter: 365 }, era: 'edo', eraLabel: '真田氏の居城・北信濃の要衝', castleType: '国指定史跡・城跡', summary: '真田氏が治めた松代藩の中心で、千曲川沿いに残る城跡です。', description: '松代城は北信濃の要衝に築かれ、江戸時代には真田氏の居城となりました。復原された門や土塁、城下町の武家屋敷と合わせて藩政都市をたどれます。', sourceName: '長野市公式サイト（松代城）', sourceUrl: 'https://www.city.nagano.nagano.jp/menu/5/2/3/3/1/index.html' }),
  makeNationalSpot({ id: 'castle-25', name: '岩村城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.3676, longitude: 137.4420, elevationMeter: 721 }, era: 'sengoku', eraLabel: '標高721mの日本三大山城', castleType: '県指定史跡・山城跡', summary: '高低差のある石垣と城下町が残る、東美濃の山城です。', description: '岩村城は標高721mの城山に築かれ、山頂の石垣と城下町が一体となって残ります。霧や地形を利用した山城の防御を、歩いて体感できる拠点です。', sourceName: '岐阜県公式サイト（岩村城跡）', sourceUrl: 'https://www.pref.gifu.lg.jp/page/7261.html' }),
  makeNationalSpot({ id: 'castle-26', name: '丸岡城', category: 'castle', region: '中部', coordinate: { latitude: 36.1531, longitude: 136.2725, elevationMeter: 25 }, era: 'sengoku', eraLabel: '天正4年（1576年）築城・現存天守', castleType: '重要文化財・現存天守', summary: '北陸に残る現存天守で、古い野面積み石垣が特徴の城です。', description: '丸岡城は1576年に柴田勝豊が築いたとされ、現存天守と野面積みの石垣を伝えています。北陸の城下町と一向一揆後の政治拠点の変遷を学べます。', sourceName: '坂井市公式サイト（丸岡城）', sourceUrl: 'https://www.city.fukui-sakai.lg.jp/bunka/kanko-bunka/kanko/rekishi/maruokajo.html' }),
  makeNationalSpot({ id: 'castle-27', name: '駿府城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.9771, longitude: 138.3830, elevationMeter: 20 }, era: 'edo', eraLabel: '徳川家康の大御所政治・駿府の城', castleType: '市指定史跡・城跡公園', summary: '徳川家康が大御所として過ごした、静岡の城下町の中心です。', description: '駿府城は徳川家康が大御所として政務を行った城で、現在は公園として堀や復元建物が整備されています。駿府の城下町と近世の政治拠点の関係をたどれます。', sourceName: '駿府城公園 公式サイト', sourceUrl: 'https://sumpu-castlepark.com/' }),
  makeNationalSpot({ id: 'castle-28', name: '岡崎城', category: 'castle', region: '中部', coordinate: { latitude: 34.9568, longitude: 137.1586, elevationMeter: 25 }, era: 'sengoku', eraLabel: '徳川家康出生の城・東海道の要衝', castleType: '市指定史跡・復元天守', summary: '徳川家康の出生地として知られ、東海道と城下町の歴史を伝えます。', description: '岡崎城は徳川家康が生まれた城として知られ、東海道と舟運の要衝に位置しました。城跡と城下町の通りを合わせて、徳川家の出発点を学べます。', sourceName: '岡崎市公式サイト（岡崎城跡）', sourceUrl: 'https://www.city.okazaki.lg.jp/bunka/torikumi_bunka/1004568/1004592/1004726/1004736.html' }),
  makeNationalSpot({ id: 'castle-29', name: '大垣城', category: 'castle', region: '中部', coordinate: { latitude: 35.3598, longitude: 136.6163, elevationMeter: 6 }, era: 'sengoku', eraLabel: '関ヶ原の戦いゆかり・水の城', castleType: '続日本100名城・復元天守', summary: '水堀と交通の要衝を背景に、関ヶ原の戦いと結びつく城です。', description: '大垣城は美濃の交通・水運の要衝に築かれ、関ヶ原の戦いでは西軍の拠点となりました。城下町と水の都大垣の成り立ちを考えられます。', sourceName: '大垣市公式サイト（大垣城）', sourceUrl: 'https://www.city.ogaki.lg.jp/0000000577.html' }),
  makeNationalSpot({ id: 'castle-30', name: '福山城', category: 'castle', region: '中国', coordinate: { latitude: 34.4909, longitude: 133.3617, elevationMeter: 20 }, era: 'edo', eraLabel: '元和8年（1622年）完成・西国の要衝', castleType: '重要文化財・復元天守', summary: '福山駅の目の前に残り、江戸初期の城下町整備を伝える城です。', description: '福山城は1622年に完成し、江戸時代の西国街道を押さえる政治拠点となりました。伏見櫓や筋鉄御門などの重要文化財と城下町の位置関係を見られます。', sourceName: '福山市公式サイト（福山城）', sourceUrl: 'https://www.city.fukuyama.hiroshima.jp/site/miryoku2023/287233.html' }),
  makeNationalSpot({ id: 'castle-31', name: '備中松山城', category: 'castle', region: '中国', coordinate: { latitude: 34.7960, longitude: 133.6160, elevationMeter: 430 }, era: 'sengoku', eraLabel: '標高430mの現存天守・天空の山城', castleType: '重要文化財・現存天守・山城', summary: '現存天守を持つ日本唯一の山城として知られる城です。', description: '備中松山城は標高430mの臥牛山に築かれ、中世城郭を近世城郭へ改修した姿を伝えています。高梁の城下町と山頂の天守を結び、山城の立地を体験できます。', sourceName: '高梁市公式サイト（備中松山城）', sourceUrl: 'https://www.city.takahashi.lg.jp/site/bichu-matsuyama/index-2.html' }),
  makeNationalSpot({ id: 'castle-32', name: '萩城跡', category: 'castle', region: '中国', coordinate: { latitude: 34.4137, longitude: 131.3884, elevationMeter: 15 }, era: 'edo', eraLabel: '毛利氏の居城・幕末の城下町', castleType: '国指定史跡・日本100名城', summary: '毛利氏の居城と城下町が残り、幕末の萩を歩ける城跡です。', description: '萩城は関ヶ原後に毛利輝元が築き、指月山と海に囲まれた城郭として整えられました。城跡と武家屋敷を合わせて、幕末の政治と城下町をたどれます。', sourceName: '萩市観光協会公式サイト（萩城跡）', sourceUrl: 'https://www.hagishi.com/hagijoato/' }),
  makeNationalSpot({ id: 'castle-33', name: '岡豊城跡', category: 'castle', region: '四国', coordinate: { latitude: 33.5942, longitude: 133.6427, elevationMeter: 97 }, era: 'sengoku', eraLabel: '長宗我部氏の本拠・土佐の山城', castleType: '国指定史跡・城跡', summary: '長宗我部氏が土佐を治めた、山上の本拠城です。', description: '岡豊城は長宗我部氏の本拠として土佐の政治を担った山城です。曲輪・堀切・土塁の地形から、戦国期の山城と地域支配の関係を学べます。', sourceName: '高知県立歴史民俗資料館 公式サイト', sourceUrl: 'https://kochi-rekimin.jp/' }),
  makeNationalSpot({ id: 'castle-34', name: '中津城', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.6043, longitude: 131.1876, elevationMeter: 5 }, era: 'sengoku', eraLabel: '黒田官兵衛が築いた海城・中津藩の居城', castleType: '続日本100名城・城跡', summary: '海と川に面した、黒田官兵衛ゆかりの水城です。', description: '中津城は黒田孝高（官兵衛）が築城を始め、海と中津川を利用した縄張りを持つ城です。城下町と水運の関係から、九州北部の近世化を考えられます。', sourceName: '中津市公式観光サイト', sourceUrl: 'https://nakatsuyaba.com/' }),
  makeNationalSpot({ id: 'castle-35', name: '佐賀城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.2449, longitude: 130.3026, elevationMeter: 4 }, era: 'edo', eraLabel: '鍋島氏の居城・幕末佐賀藩の拠点', castleType: '国指定史跡・城跡', summary: '鍋島氏の居城で、幕末の近代化を支えた佐賀の城跡です。', description: '佐賀城は鍋島氏の居城として整えられ、幕末には佐賀藩の政治・技術革新の拠点となりました。本丸御殿の復元と堀・土塁を通して、近世から近代への転換を学べます。', sourceName: '佐賀県立佐賀城本丸歴史館 公式サイト', sourceUrl: 'https://saga-museum.jp/sagajou/' }),
  makeNationalSpot({ id: 'castle-36', name: '人吉城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.2036, longitude: 130.7579, elevationMeter: 115 }, era: 'edo', eraLabel: '相良氏の居城・球磨川沿いの城跡', castleType: '国指定史跡・城跡', summary: '相良氏が約700年治めた、人吉盆地の城跡です。', description: '人吉城は相良氏の居城として長く地域の政治拠点となり、球磨川沿いの石垣や水の手門跡を伝えています。山と川に囲まれた城下町の構造を読み取れます。', sourceName: '人吉市公式サイト（人吉城跡）', sourceUrl: 'https://www.city.hitoyoshi.lg.jp/' }),
  makeNationalSpot({ id: 'castle-37', name: '新発田城', category: 'castle', region: '中部', coordinate: { latitude: 37.9541, longitude: 139.3308, elevationMeter: 5 }, era: 'edo', eraLabel: '溝口氏の居城・三匹の鯱を持つ城', castleType: '国指定史跡・復元櫓', summary: '越後の城下町に残る、特徴的な三階櫓と石垣の城です。', description: '新発田城は溝口氏の居城として整えられ、三階櫓の屋根に三匹の鯱を載せる独特の姿を伝えています。城跡と新発田の城下町を合わせて、越後の近世化を学べます。', sourceName: '新発田市公式サイト（新発田城）', sourceUrl: 'https://www.city.shibata.lg.jp/kanko/bunka/shiro/index.html' }),
  makeNationalSpot({ id: 'castle-38', name: '小諸城跡（懐古園）', category: 'castle', region: '中部', coordinate: { latitude: 36.3278, longitude: 138.4232, elevationMeter: 660 }, era: 'sengoku', eraLabel: '日本唯一の穴城・千曲川を望む城跡', castleType: '日本100名城・史跡公園', summary: '城下町より低い場所に本丸がある「穴城」の城跡です。', description: '小諸城は戦国期から続く城跡で、現在は懐古園として保存されています。城下町より低い地形に本丸を置く特徴と、千曲川・浅間山を望む景観を歩いて確かめられます。', sourceName: '小諸市公式サイト（小諸城址懐古園）', sourceUrl: 'https://www.city.komoro.lg.jp/official/kanko_sangyo/kanko/rekishi_bunka/8618.html' }),
  makeNationalSpot({ id: 'castle-39', name: '高岡城跡', category: 'castle', region: '中部', coordinate: { latitude: 36.7580, longitude: 137.0195, elevationMeter: 10 }, era: 'edo', eraLabel: '前田利長ゆかり・堀と土塁が残る城跡', castleType: '国指定史跡・日本100名城', summary: '加賀前田家ゆかりの、堀と土塁がよく残る平城跡です。', description: '高岡城は前田利長の隠居城として築かれ、廃城後も堀や土塁が保存されてきました。高岡の町と前田家ゆかりの寺院・墓所をつなぐ歴史拠点です。', sourceName: '高岡市公式サイト（高岡城跡）', sourceUrl: 'https://www.city.takaoka.toyama.jp/soshiki/kyoikuiinkai_bunkazaihogokatsuyoka/1/4/1/3514.html' }),
  makeNationalSpot({ id: 'castle-40', name: '龍岡城跡', category: 'castle', region: '中部', coordinate: { latitude: 36.1833, longitude: 138.4811, elevationMeter: 670 }, era: 'edo', eraLabel: '幕末の星形要塞・日本に二つの五稜郭', castleType: '国指定史跡・西洋式城郭', summary: '函館と並ぶ、国内に二つしかない星形要塞の一つです。', description: '龍岡城は幕末に築かれた星形の洋式城郭で、函館の五稜郭とともに日本に二つしかない五稜郭として知られます。幕末の軍事技術と地域史を学べます。', sourceName: '佐久市公式サイト（龍岡城跡）', sourceUrl: 'https://www.city.saku.nagano.jp/bunka/bunkazai/bunkazaijimusyo/tasuoka-guidance.html' }),
  makeNationalSpot({ id: 'castle-41', name: '越前大野城', category: 'castle', region: '中部', coordinate: { latitude: 35.9835, longitude: 136.4793, elevationMeter: 249 }, era: 'sengoku', eraLabel: '金森長近の城下町・天空の城', castleType: '続日本100名城・復興天守', summary: '亀山の山頂に建つ、城下町と雲海で知られる城です。', description: '越前大野城は亀山に築かれ、大野の城下町を見下ろす山城です。霧や雲海の景観だけでなく、碁盤目状の城下町と城の関係をたどれます。', sourceName: '大野市公式サイト（越前大野城）', sourceUrl: 'https://www.city.ono.fukui.jp/kanko/kanko-joho/guide/ono-castle/index.html' }),
  makeNationalSpot({ id: 'castle-42', name: '岐阜城', category: 'castle', region: '中部', coordinate: { latitude: 35.4330, longitude: 136.7814, elevationMeter: 329 }, era: 'sengoku', eraLabel: '稲葉山城・織田信長の天下布武の拠点', castleType: '史跡・山城・復元天守', summary: '金華山の山頂から長良川と濃尾平野を見渡す山城です。', description: '岐阜城はかつて稲葉山城と呼ばれ、織田信長が本拠として整えました。標高329mの山頂から、城が担った軍事・交通・政治の役割を考えられます。', sourceName: '岐阜市公式サイト（岐阜城天守閣）', sourceUrl: 'https://www.city.gifu.lg.jp/kankoubunka/kankou/1013051/1005097/1005098.html' }),
  makeNationalSpot({ id: 'castle-43', name: '長浜城跡', category: 'castle', region: '近畿', coordinate: { latitude: 35.3756, longitude: 136.2647, elevationMeter: 90 }, era: 'sengoku', eraLabel: '羽柴秀吉の城下町・琵琶湖畔の城', castleType: '市指定史跡・復元天守', summary: '羽柴秀吉が城下町を整えた、琵琶湖東岸の城跡です。', description: '長浜城は羽柴秀吉が築き、城下町を整えた出世の城として知られます。琵琶湖畔の立地から、湖上交通と戦国期の都市形成を学べます。', sourceName: '長浜市公式サイト（長浜城歴史博物館）', sourceUrl: 'https://www.city.nagahama.lg.jp/section/kyouiku/rekihaku/' }),
  makeNationalSpot({ id: 'castle-44', name: '和歌山城', category: 'castle', region: '近畿', coordinate: { latitude: 34.2260, longitude: 135.1675, elevationMeter: 48 }, era: 'edo', eraLabel: '紀州徳川家の居城・虎伏山の城', castleType: '国指定史跡・復元天守', summary: '紀州徳川家の居城で、和歌山の城下町の中心となった城です。', description: '和歌山城は虎伏山に築かれ、江戸時代には紀州徳川家の居城となりました。石垣や門の違いから、複数の城主の時代と城下町の発展をたどれます。', sourceName: '和歌山市公式サイト（和歌山城）', sourceUrl: 'https://www.city.wakayama.wakayama.jp/shisetsu/wakayamajyou/index.html' }),
  makeNationalSpot({ id: 'castle-45', name: '郡山城跡', category: 'castle', region: '近畿', coordinate: { latitude: 34.6488, longitude: 135.7800, elevationMeter: 75 }, era: 'sengoku', eraLabel: '豊臣秀長の居城・大和の城下町', castleType: '国指定史跡・城跡公園', summary: '豊臣秀長が大和支配の拠点とした、石垣と城下町の城跡です。', description: '郡山城は豊臣秀長が大和の政治拠点として整えた城で、石垣には寺院などから転用された石材も見られます。城下町の寺社と合わせて、戦国末期の都市形成を学べます。', sourceName: '大和郡山市公式サイト（郡山城跡）', sourceUrl: 'https://www.city.yamatokoriyama.lg.jp/soshiki/machidukuri_senryaku/rekishi_bunkazai/bunkazai_1/16106.html' }),
  makeNationalSpot({ id: 'castle-46', name: '鳥取城跡', category: 'castle', region: '中国', coordinate: { latitude: 35.5050, longitude: 134.2335, elevationMeter: 50 }, era: 'sengoku', eraLabel: '久松山の山城・鳥取の籠城戦', castleType: '国指定史跡・日本100名城', summary: '山上の丸と近世の石垣が重なる、鳥取の城跡です。', description: '鳥取城は久松山を利用した山城として始まり、近世には鳥取藩の居城となりました。山上の遺構と麓の石垣から、戦国から江戸への城郭の変化をたどれます。', sourceName: '鳥取県遺跡MAP（鳥取城跡）', sourceUrl: 'https://db.pref.tottori.jp/ruins.nsf/map-801/index.html' }),
  makeNationalSpot({ id: 'castle-47', name: '津山城跡', category: 'castle', region: '中国', coordinate: { latitude: 35.0645, longitude: 134.0049, elevationMeter: 150 }, era: 'edo', eraLabel: '森忠政の城下町・壮大な石垣', castleType: '国指定史跡・日本100名城', summary: '本丸を囲む高石垣と城下町を伝える、津山の平山城です。', description: '津山城は森忠政が築き、幾重もの石垣と櫓がそびえる城郭でした。現在も鶴山公園に残る石垣から、美作の政治拠点と城下町の構造を学べます。', sourceName: '津山市公式観光サイト', sourceUrl: 'https://www.tsuyamakan.jp/' }),
  makeNationalSpot({ id: 'castle-48', name: '徳島城跡', category: 'castle', region: '四国', coordinate: { latitude: 34.0756, longitude: 134.5574, elevationMeter: 20 }, era: 'edo', eraLabel: '蜂須賀氏の居城・阿波の城下町', castleType: '国指定史跡・城跡公園', summary: '徳島藩蜂須賀氏の居城で、石垣と庭園が残る城跡です。', description: '徳島城は蜂須賀氏の居城として築かれ、吉野川河口の水運と城下町を押さえました。山城部分と御殿跡・庭園を通じて、阿波の藩政都市を学べます。', sourceName: '徳島市公式サイト（徳島城跡）', sourceUrl: 'https://www.city.tokushima.tokushima.jp/kankou/rekishi_bunka/tokushimajo/' }),
  makeNationalSpot({ id: 'castle-49', name: '宇和島城', category: 'castle', region: '四国', coordinate: { latitude: 33.2206, longitude: 132.5656, elevationMeter: 74 }, era: 'edo', eraLabel: '現存天守・宇和島伊達家の居城', castleType: '重要文化財・現存天守・日本100名城', summary: '宇和島湾に面する不等辺五角形の縄張りを持つ現存天守です。', description: '宇和島城は藤堂高虎が築き、江戸時代には宇和島伊達家の居城となりました。現存天守と海に開いた城下町から、四国西南部の海城の性格を読み取れます。', sourceName: '宇和島市公式サイト（宇和島城）', sourceUrl: 'https://www.city.uwajima.ehime.jp/site/uwajima-jo/' }),
  makeNationalSpot({ id: 'castle-50', name: '鹿児島城跡（鶴丸城跡）', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 31.5987, longitude: 130.5511, elevationMeter: 25 }, era: 'edo', eraLabel: '島津氏の居城・幕末薩摩の拠点', castleType: '国指定史跡・城跡', summary: '島津氏の居城で、幕末の薩摩を支えた城跡です。', description: '鹿児島城は島津氏の居城として築かれ、城山と鹿児島湾に挟まれた平地の政治拠点となりました。御楼門や石垣、城下町から幕末薩摩の歴史をたどれます。', sourceName: '鹿児島県公式観光サイト（鹿児島城跡）', sourceUrl: 'https://www.kagoshima-kankou.com/guide/70364' }),
  makeNationalSpot({ id: 'castle-51', name: '佐伯城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.9563, longitude: 131.8990, elevationMeter: 144 }, era: 'edo', eraLabel: '毛利高政の山城・豊後水道を望む城', castleType: '国指定史跡・山城跡', summary: '番匠川河口の山上に築かれた、近世の山城跡です。', description: '佐伯城は1601年に毛利高政が築いた近世の山城で、山頂の曲輪と山麓の屋形を石敷きの城道で結びます。海と山を生かした城の立地を学べます。', sourceName: '佐伯市公式サイト（佐伯城跡）', sourceUrl: 'https://www.city.saiki.oita.jp/rekishi/kiji0039085/' }),
  makeNationalSpot({ id: 'castle-52', name: '松前城（福山城）', category: 'castle', region: '北海道', coordinate: { latitude: 41.4261, longitude: 140.1112, elevationMeter: 25 }, era: 'edo', eraLabel: '幕末の最北の日本式城郭・松前藩の居城', castleType: '国指定史跡・重要文化財', summary: '北海道唯一の城下町に残る、海を臨む幕末の城です。', description: '松前城は幕末に築かれた松前藩の居城で、北方警備と海上交通を担いました。本丸御門や城下町の跡から、蝦夷地と日本の境界をめぐる歴史をたどれます。', sourceName: '松前町公式観光サイト（松前城）', sourceUrl: 'https://travel-matsumae.jp/spot/matsumaejo/' }),
  makeNationalSpot({ id: 'castle-53', name: '根城跡', category: 'castle', region: '東北', coordinate: { latitude: 40.5090, longitude: 141.4625, elevationMeter: 35 }, era: 'muromachi', eraLabel: '南部氏の本拠・中世の復原城跡', castleType: '国指定史跡・復原城跡', summary: '主殿や工房などが復原され、中世の城館を歩ける史跡です。', description: '根城跡は南部氏の一族が14世紀に築いたと伝わる中世城館で、本丸の主殿などが復原されています。戦国期以前の城が、武家の居館と地域支配をどう結びつけたかを学べます。', sourceName: '青森県公式サイト（根城跡）', sourceUrl: 'https://www.pref.aomori.lg.jp/soshiki/kyoiku/e-bunka/kinen_siseki_03.html' }),
  makeNationalSpot({ id: 'castle-54', name: '白石城', category: 'castle', region: '東北', coordinate: { latitude: 38.0016, longitude: 140.6197, elevationMeter: 75 }, era: 'edo', eraLabel: '片倉氏の居城・奥羽越列藩同盟の舞台', castleType: '市指定文化財・復元三階櫓', summary: '伊達家重臣片倉氏の居城で、幕末の政治史にも登場する城です。', description: '白石城は伊達家の重臣片倉氏の居城として整えられ、幕末には奥羽越列藩同盟の公議府が置かれました。復元された三階櫓と城下町から、東北の近世史をたどれます。', sourceName: '白石市公式サイト（指定文化財 白石城）', sourceUrl: 'https://www.city.shiroishi.miyagi.jp/soshiki/30/382.html' }),
  makeNationalSpot({ id: 'castle-55', name: '川越城本丸御殿', category: 'castle', region: '関東', coordinate: { latitude: 35.9250, longitude: 139.4860, elevationMeter: 20 }, era: 'edo', eraLabel: '川越藩の居城・現存する本丸御殿', castleType: '県指定文化財・本丸御殿', summary: '江戸の北の守りを担った川越城に残る、貴重な本丸御殿です。', description: '川越城は江戸北方の要衝として整えられ、現在は本丸御殿の一部が残ります。城下町の蔵造りや新河岸川の舟運と合わせ、江戸を支えた近郊城下町の構造を学べます。', sourceName: '川越市公式サイト（川越城本丸御殿）', sourceUrl: 'https://www.city.kawagoe.saitama.jp/museum/honmaru/index.html' }),
  makeNationalSpot({ id: 'castle-56', name: '上田城跡', category: 'castle', region: '中部', coordinate: { latitude: 36.4021, longitude: 138.2491, elevationMeter: 465 }, era: 'sengoku', eraLabel: '真田氏の居城・二度の徳川軍撃退', castleType: '国指定史跡・日本100名城', summary: '真田氏ゆかりの城として、千曲川沿いの戦国史を伝える城跡です。', description: '上田城は真田昌幸が築いた城で、二度にわたって徳川軍を退けたことで知られます。河岸段丘を生かした縄張りと城下町を歩き、戦国の地域拠点を体感できます。', sourceName: '上田市公式サイト（上田城）', sourceUrl: 'https://www.city.ueda.nagano.jp/site/uedajo/index.html' }),
  makeNationalSpot({ id: 'castle-57', name: '春日山城跡', category: 'castle', region: '中部', coordinate: { latitude: 37.1450, longitude: 138.2180, elevationMeter: 190 }, era: 'sengoku', eraLabel: '上杉謙信の居城・越後の山城', castleType: '国指定史跡・日本100名城・山城', summary: '上杉謙信の本拠として、自然地形を生かした大規模な山城です。', description: '春日山城は上杉謙信の居城として知られ、山頂から尾根や谷に曲輪を広げた中世山城です。上越の平野と日本海を望む地形から、越後の軍事・政治拠点の役割を学べます。', sourceName: '上越市公式サイト（春日山城跡）', sourceUrl: 'https://www.city.joetsu.niigata.jp/site/cultural-property/cultural-property-jpn002.html' }),
  makeNationalSpot({ id: 'castle-58', name: '元離宮二条城', category: 'castle', region: '近畿', coordinate: { latitude: 35.0142, longitude: 135.7480, elevationMeter: 45 }, era: 'edo', eraLabel: '徳川家康の京都宿館・世界文化遺産', castleType: '世界文化遺産・国宝御殿', summary: '将軍の上洛と大政奉還の記憶を伝える、京都の平城です。', description: '二条城は徳川家康が京都の宿館として築き、二の丸御殿などが江戸初期の姿を伝えます。大政奉還の舞台としても知られ、城が政治の場から歴史遺産へ変わる過程を学べます。', sourceName: '元離宮二条城 公式サイト', sourceUrl: 'https://nijo-jocastle.city.kyoto.lg.jp/' }),
  makeNationalSpot({ id: 'castle-59', name: '竹田城跡', category: 'castle', region: '近畿', coordinate: { latitude: 35.3004, longitude: 134.8215, elevationMeter: 350 }, era: 'sengoku', eraLabel: '天空の城・山上の石垣', castleType: '国指定史跡・日本100名城・山城', summary: '雲海に浮かぶ姿で知られる、但馬の山上石垣城です。', description: '竹田城跡は標高の高い山上に石垣の曲輪を広げ、但馬の交通を見下ろす拠点でした。雲海の景観だけでなく、石垣と尾根の地形から山城の構造を読み取れます。', sourceName: '朝来市公式サイト（竹田城跡）', sourceUrl: 'https://www.city.asago.hyogo.jp/site/takeda/index.html' }),
  makeNationalSpot({ id: 'castle-60', name: '明石城', category: 'castle', region: '近畿', coordinate: { latitude: 34.6551, longitude: 134.9929, elevationMeter: 25 }, era: 'edo', eraLabel: '西国街道の要衝・明石藩の居城', castleType: '国指定史跡・重要文化財櫓', summary: '明石公園に巽櫓と坤櫓が残る、瀬戸内の城下町の核です。', description: '明石城は1619年に築かれ、明石海峡と西国街道を押さえる明石藩の居城となりました。現存する二つの櫓と広い石垣から、江戸幕府の西国防衛を考えられます。', sourceName: '明石城 公式サイト', sourceUrl: 'https://www.akashijo.jp/' }),
  makeNationalSpot({ id: 'castle-61', name: '大洲城跡', category: 'castle', region: '四国', coordinate: { latitude: 33.5094, longitude: 132.5445, elevationMeter: 25 }, era: 'edo', eraLabel: '肱川河畔の城下町・木造復元天守', castleType: '県指定史跡・重要文化財櫓', summary: '肱川を望み、古い櫓と木造復元天守が残る伊予の城です。', description: '大洲城は肱川河畔に築かれ、江戸期の櫓や門と木造で復元された天守を伝えます。川と城下町の関係を歩きながら、伊予の政治・物流拠点の歴史を学べます。', sourceName: '大洲市公式サイト（大洲城跡）', sourceUrl: 'https://www.city.ozu.ehime.jp/site/bunkazai/0205.html' }),
  makeNationalSpot({ id: 'castle-62', name: '今治城', category: 'castle', region: '四国', coordinate: { latitude: 34.0663, longitude: 133.0016, elevationMeter: 5 }, era: 'edo', eraLabel: '藤堂高虎の海城・瀬戸内の水運拠点', castleType: '県指定史跡・海城', summary: '堀に海水を引き入れた、瀬戸内を代表する海城です。', description: '今治城は藤堂高虎が築いた海城で、海水を引き入れた堀と港を結ぶ構造を持ちます。瀬戸内の島々と航路を意識しながら、海を利用した近世城郭の姿を学べます。', sourceName: '今治市公式サイト（今治城）', sourceUrl: 'https://www.city.imabari.ehime.jp/museum/imabarijo/' }),
  makeNationalSpot({ id: 'castle-63', name: '岡城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.9736, longitude: 131.3985, elevationMeter: 325 }, era: 'sengoku', eraLabel: '断崖の台地に築かれた難攻不落の城', castleType: '国指定史跡・日本100名城・山城', summary: '険しい台地と高石垣が残る、豊後の代表的な山城です。', description: '岡城跡は断崖に囲まれた台地を利用した城で、近世には中川氏の居城となりました。高石垣と曲輪を歩き、地形を防御に変えた九州の城郭技術を体感できます。', sourceName: '竹田市公式サイト（岡城跡）', sourceUrl: 'https://www.city.taketa.oita.jp/bunka_rekishi_kanko/bunkazai/okajyo/index.html' }),
  makeNationalSpot({ id: 'castle-64', name: '飫肥城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 31.6272, longitude: 131.3564, elevationMeter: 45 }, era: 'sengoku', eraLabel: '伊東氏の城下町・日南の中世城郭', castleType: '市指定史跡・城下町', summary: '飫肥杉の町並みと曲輪・空堀が残る、南九州の城下町です。', description: '飫肥城跡はシラス台地を空堀で区切った城郭で、伊東氏の城下町として発展しました。大手門や武家屋敷と地形を合わせて、南九州の中世から近世への変化を学べます。', sourceName: '日南市公式サイト（飫肥城跡）', sourceUrl: 'https://www.city.nichinan.lg.jp/museum/shishiteibunnkazai/iseki_shiseki/5/3785.html' }),
  makeNationalSpot({ id: 'castle-65', name: '名護屋城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.5298, longitude: 129.8709, elevationMeter: 80 }, era: 'sengoku', eraLabel: '豊臣秀吉の出兵基地・特別史跡', castleType: '国特別史跡・陣跡群', summary: '全国の大名が集結した、海を望む大規模な城跡です。', description: '名護屋城跡は文禄・慶長の役に際して豊臣秀吉が築いた本営で、周囲には多くの大名陣跡が残ります。城と陣跡、海上交通から、16世紀末の広域動員の歴史を考えられます。', sourceName: '佐賀県立名護屋城博物館 公式サイト', sourceUrl: 'https://saga-museum.jp/nagoya/nagoya-castle/nagoya.html' }),
  makeNationalSpot({ id: 'castle-66', name: '福岡城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.5892, longitude: 130.3825, elevationMeter: 20 }, era: 'edo', eraLabel: '黒田氏の居城・福岡城下町の核', castleType: '国指定史跡・日本100名城', summary: '鴻臚館跡と隣り合い、古代外交から近世城下町まで重なる城跡です。', description: '福岡城は黒田氏の居城として築かれ、現在は舞鶴公園に石垣や門、櫓の跡を伝えます。古代の鴻臚館跡と合わせて、博多湾岸の交流拠点が変化した歴史をたどれます。', sourceName: '福岡県公式観光サイト（福岡城跡）', sourceUrl: 'https://www.crossroadfukuoka.jp/spot/12579' }),
  makeNationalSpot({ id: 'castle-67', name: '七戸城跡', category: 'castle', region: '東北', coordinate: { latitude: 40.7113, longitude: 141.1568, elevationMeter: 80 }, era: 'muromachi', eraLabel: '南部氏一族の中世城館・北奥の拠点', castleType: '国指定史跡・城跡', summary: '台地の地形を生かした、南部氏一族の中世城館跡です。', description: '七戸城跡は七戸川と作田川を望む台地の先端に築かれ、南部氏一族の居城となりました。発掘調査と曲輪の地形から、北奥の中世武家社会を学べます。', sourceName: '青森県公式サイト（七戸城跡）', sourceUrl: 'https://www.pref.aomori.lg.jp/soshiki/kyoiku/e-bunka/kinen_siseki_02.html' }),
  makeNationalSpot({ id: 'castle-68', name: '鉢形城跡', category: 'castle', region: '関東', coordinate: { latitude: 36.1174, longitude: 139.1958, elevationMeter: 120 }, era: 'sengoku', eraLabel: '北条氏の北関東拠点・荒川の城', castleType: '国指定史跡・日本100名城', summary: '荒川と深沢川の合流点に築かれた、戦国期の大規模城郭です。', description: '鉢形城跡は河岸段丘と川を利用して築かれ、北条氏の北関東支配の拠点となりました。堀・土塁・曲輪が残る城跡公園から、自然地形と戦国城郭の関係を読み取れます。', sourceName: '寄居町公式サイト（鉢形城公園）', sourceUrl: 'https://www.town.yorii.saitama.jp/site/rekishikan/kouenannai.html' }),
  makeNationalSpot({ id: 'castle-69', name: '八王子城跡', category: 'castle', region: '関東', coordinate: { latitude: 35.6605, longitude: 139.2590, elevationMeter: 460 }, era: 'sengoku', eraLabel: '北条氏の山城・関東の戦国史跡', castleType: '国指定史跡・日本100名城・山城', summary: '深い山と谷を生かした、北条氏の巨大な山城跡です。', description: '八王子城跡は北条氏照の居城として整えられ、山上の要害と御主殿跡が残ります。尾根道や滝、城下の地形から、戦国大名が山を防御と信仰の空間に変えた姿を学べます。', sourceName: '八王子市公式サイト（八王子城跡）', sourceUrl: 'https://www.city.hachioji.tokyo.jp/kurashi/kyoiku/005/bunkazaikanrenshisetsu/p005201.html' }),
  makeNationalSpot({ id: 'castle-70', name: '小谷城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.4686, longitude: 136.2812, elevationMeter: 495 }, era: 'sengoku', eraLabel: '浅井氏三代の居城・小谷山の山城', castleType: '国指定史跡・日本100名城・山城', summary: '小谷山全体に曲輪を広げた、浅井氏の戦国山城です。', description: '小谷城跡は浅井氏三代の居城で、小谷山の尾根や谷に多数の曲輪を展開します。お市の方と三人の娘の物語だけでなく、湖北の地形と戦国政治の関係を歩いて学べます。', sourceName: '滋賀県公式観光サイト（小谷城跡）', sourceUrl: 'https://www.biwako-visitors.jp/spot/detail/898/' }),
  makeNationalSpot({ id: 'castle-71', name: '観音寺城跡', category: 'castle', region: '近畿', coordinate: { latitude: 35.1552, longitude: 136.1277, elevationMeter: 430 }, era: 'sengoku', eraLabel: '六角氏の居城・観音正寺と重なる山城', castleType: '国指定史跡・日本100名城・山城', summary: '山上の寺院と城郭が重なる、近江の大規模山城です。', description: '観音寺城跡は六角氏の居城で、繖山の山腹に曲輪や石垣が広がります。中心に観音正寺が立つことから、宗教的な山と政治的な城が重なった中世近江の姿をたどれます。', sourceName: '滋賀県公式サイト（観音寺城跡）', sourceUrl: 'https://www.pref.shiga.lg.jp/ippan/bunakasports/bunkazaihogo/312345.html' }),
  makeNationalSpot({ id: 'castle-72', name: '月山富田城跡', category: 'castle', region: '中国', coordinate: { latitude: 35.3586, longitude: 133.2010, elevationMeter: 190 }, era: 'sengoku', eraLabel: '尼子氏の居城・山陰山陽の大規模山城', castleType: '国指定史跡・日本100名城・山城', summary: '月山を中心に曲輪を重ねた、山陰を代表する巨大山城です。', description: '月山富田城跡は戦国大名尼子氏の本拠で、月山と周辺の丘陵に曲輪を広げた大規模な山城です。飯梨川と広瀬の城下町を合わせ、山陰の政治・文化拠点を学べます。', sourceName: '島根県公式サイト（富田城跡）', sourceUrl: 'https://www.pref.shimane.lg.jp/life/bunka/bunkazai/shiseki/shisekidesu/shiseki02.html' }),
  makeNationalSpot({ id: 'castle-73', name: '鬼ノ城', category: 'castle', region: '中国', coordinate: { latitude: 34.6950, longitude: 133.7650, elevationMeter: 400 }, era: 'asuka', eraLabel: '古代山城・吉備高原の城壁遺構', castleType: '国指定史跡・古代山城', summary: '7世紀後半に築かれたと考えられる、古代の山城です。', description: '鬼ノ城は吉備高原の山上に城壁を巡らせた古代山城で、白村江の戦い後の対外緊張を背景に築かれたと考えられています。復元された西門と眺望から、古代の防衛と地域史を学べます。', sourceName: '総社市公式サイト（鬼ノ城）', sourceUrl: 'https://www.city.soja.okayama.jp/soshiki/27/3611.html' }),
  makeNationalSpot({ id: 'castle-74', name: '高松城跡（玉藻公園）', category: 'castle', region: '四国', coordinate: { latitude: 34.3510, longitude: 134.0508, elevationMeter: 5 }, era: 'edo', eraLabel: '讃岐の海城・松平氏の居城', castleType: '国指定史跡・日本100名城・水城', summary: '海水を引き入れた堀と舟入を持つ、瀬戸内の代表的な水城です。', description: '高松城は瀬戸内海に面し、海水を引き入れた堀と港を生かして築かれました。玉藻公園の石垣や月見櫓から、松平氏の城下町と海上交通の関係をたどれます。', sourceName: '高松市公式サイト（玉藻公園）', sourceUrl: 'https://www.city.takamatsu.kagawa.jp/smph/kurashi/kurashi/shisetsu/park/tamamo/index.html' }),
  makeNationalSpot({ id: 'castle-75', name: '中城城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 26.2950, longitude: 127.8050, elevationMeter: 160 }, era: 'muromachi', eraLabel: '琉球王国のグスク・護佐丸の城', castleType: '世界文化遺産・国指定史跡・グスク', summary: '曲線的な石積みの城壁が残る、琉球王国の世界遺産です。', description: '中城城跡は15世紀前半に護佐丸が築いたとされ、琉球石灰岩の城壁が丘陵に連なります。王国の政治と交易、グスクにおける信仰の空間を、海を望む立地から学べます。', sourceName: '沖縄県公式サイト（中城城跡）', sourceUrl: 'https://www.pref.okinawa.jp/kyoiku/kodomo/1002688/1002695/1002699.html' }),
  makeNationalSpot({ id: 'castle-76', name: '勝連城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 26.3150, longitude: 127.8796, elevationMeter: 98 }, era: 'muromachi', eraLabel: '阿麻和利のグスク・東海岸の交易拠点', castleType: '世界文化遺産・国指定史跡・グスク', summary: '海を望む曲線的な城壁から、琉球の交易と政治を伝えるグスクです。', description: '勝連城跡は勝連半島の丘陵に築かれ、阿麻和利の居城として知られます。太平洋を望む眺望と石灰岩の城壁から、琉球王国成立前後の海上交易と地域権力を学べます。', sourceName: '勝連城跡 公式サイト', sourceUrl: 'https://www.katsuren-jo.jp/about_katsuren-jo/' }),
  makeNationalSpot({ id: 'castle-77', name: '今帰仁城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 26.6914, longitude: 127.9308, elevationMeter: 100 }, era: 'muromachi', eraLabel: '北山王のグスク・世界文化遺産', castleType: '世界文化遺産・国指定史跡・日本100名城・グスク', summary: '沖縄本島北部の山上に、長い石垣を残す北山のグスクです。', description: '今帰仁城跡は北山王の居城として栄え、琉球王国のグスク及び関連遺産群の一つです。山と海を望む城壁から、三山時代の政治と北方交易の歴史をたどれます。', sourceName: '今帰仁城跡 公式サイト', sourceUrl: 'https://www.nakijinjoseki-osi.jp/' }),
  makeNationalSpot({ id: 'castle-78', name: '根室半島チャシ跡群', category: 'castle', region: '北海道', coordinate: { latitude: 43.3270, longitude: 145.5360, elevationMeter: 35 }, era: 'edo', eraLabel: 'アイヌ文化の砦・日本100名城', castleType: '国指定史跡・チャシ跡群', summary: '海岸の地形とアイヌ文化を伝える、北海道最東端の城郭遺跡群です。', description: '根室半島チャシ跡群は、海岸段丘などを利用して築かれたアイヌ文化の砦の遺跡群です。防御だけでなく、海を見渡す立地と地域の暮らしから、北海道独自の城郭文化を学べます。', sourceName: '根室市観光協会（根室半島チャシ跡群）', sourceUrl: 'https://www.nemuro-kankou.com/tourism/ainuchashi/' }),
  makeNationalSpot({ id: 'castle-79', name: '久保田城跡', category: 'castle', region: '東北', coordinate: { latitude: 39.7220, longitude: 140.1235, elevationMeter: 45 }, era: 'edo', eraLabel: '佐竹氏の居城・秋田城下町の核', castleType: '市指定史跡・城跡公園', summary: '千秋公園に堀や御隅櫓が残る、秋田の城下町の中心です。', description: '久保田城は関ヶ原後に秋田へ移った佐竹氏が築き、城下町の発展を支えました。千秋公園の地形と復元建物から、北国の近世都市が形づくられる過程を学べます。', sourceName: '秋田市公式サイト（久保田城）', sourceUrl: 'https://www.city.akita.lg.jp/kanko/kanrenshisetsu/1002685/1009873/1009870.html' }),
  makeNationalSpot({ id: 'castle-80', name: '新庄城址（最上公園）', category: 'castle', region: '東北', coordinate: { latitude: 38.7647, longitude: 140.3028, elevationMeter: 105 }, era: 'edo', eraLabel: '新庄藩の居城・城跡と護国神社', castleType: '市指定史跡・城跡公園', summary: '城跡と護国神社が重なる、新庄盆地の城下町の記憶を伝える場所です。', description: '新庄城址は新庄藩の居城として築かれ、現在は最上公園として堀や土塁の一部を伝えます。城跡に祀られた護国神社も含め、城下町の近世史と近代の慰霊を重ねて学べます。', sourceName: '新庄市公式サイト（新庄城址）', sourceUrl: 'https://www.city.shinjo.yamagata.jp/k001/020/010/020/2571.html' }),
  makeNationalSpot({ id: 'castle-81', name: '館山城跡', category: 'castle', region: '関東', coordinate: { latitude: 34.9790, longitude: 139.8540, elevationMeter: 65 }, era: 'sengoku', eraLabel: '里見氏の居城・房総の海城', castleType: '市指定史跡・城山公園', summary: '房総の海と里見氏の歴史を望む、館山の城跡です。', description: '館山城は里見氏の居城として知られ、城山から館山湾を見渡せます。戦国大名の海上交通と房総の城下町の関係を、周辺の博物館・公園と合わせて学べます。', sourceName: '館山市公式サイト（館山城・城山公園）', sourceUrl: 'https://www.city.tateyama.chiba.jp/kankou-bunka/cate000206.html' }),
  makeNationalSpot({ id: 'castle-82', name: '佐倉城跡', category: 'castle', region: '関東', coordinate: { latitude: 35.7243, longitude: 140.2180, elevationMeter: 30 }, era: 'edo', eraLabel: '土井利勝が築いた佐倉藩の居城', castleType: '国指定史跡・城跡公園', summary: '土塁や空堀が残り、江戸を守る佐倉藩の歴史を伝える城跡です。', description: '佐倉城は土井利勝が江戸初期に築いた平山城で、現在は国立歴史民俗博物館に隣接する城跡公園です。空堀・土塁と城下町の位置から、江戸近郊の譜代藩の役割を学べます。', sourceName: '佐倉市公式サイト（佐倉市の文化財）', sourceUrl: 'https://www.city.sakura.lg.jp/soshiki/bunkaka/bunkazai/sakurabunkazai/genre/3416.html' }),
  makeNationalSpot({ id: 'castle-83', name: '福井城址', category: 'castle', region: '中部', coordinate: { latitude: 36.0656, longitude: 136.2196, elevationMeter: 10 }, era: 'edo', eraLabel: '越前松平家の居城・県都の中心', castleType: '県指定史跡・城跡', summary: '県庁を囲む堀と石垣が、越前松平家の居城の規模を伝えます。', description: '福井城は結城秀康が築いた越前松平家の居城で、現在も本丸の堀と石垣、天守台が残ります。城跡が県都の行政中心へ変化した歴史を、北庄・福井の町の記憶とともに学べます。', sourceName: '福井市公式観光サイト（福井城址）', sourceUrl: 'https://fuku-iro.jp/spot/detail_10008.html' }),
  makeNationalSpot({ id: 'castle-84', name: '米子城跡', category: 'castle', region: '中国', coordinate: { latitude: 35.4257, longitude: 133.3260, elevationMeter: 90 }, era: 'edo', eraLabel: '海城と山城の性格を併せ持つ山陰の名城', castleType: '国指定史跡・続日本100名城', summary: '石垣の山城から日本海と大山を望む、米子の象徴的な城跡です。', description: '米子城は湊山に築かれ、海に臨む港と山上の石垣を備えた近世初期の城郭です。天守跡からの眺望と城下町・港の位置関係から、山陰の物流拠点を学べます。', sourceName: '米子城公式ホームページ', sourceUrl: 'https://yonagocastle.com/about/' }),
  makeNationalSpot({ id: 'castle-85', name: '岸和田城', category: 'castle', region: '近畿', coordinate: { latitude: 34.4590, longitude: 135.3703, elevationMeter: 15 }, era: 'edo', eraLabel: '岸和田藩の居城・紀州街道の要衝', castleType: '市指定史跡・続日本100名城', summary: '大阪南部の城下町と、独特の石垣・庭園を伝える城です。', description: '岸和田城は大阪湾岸と紀州街道を押さえる岸和田藩の居城として整えられました。城下町の祭礼や国指定名勝の庭園と合わせ、地域の政治と祭りの歴史を学べます。', sourceName: '岸和田市公式サイト（岸和田城）', sourceUrl: 'https://www.city.kishiwada.lg.jp/page/36-kishiwadajyo.html' }),
  makeNationalSpot({ id: 'castle-86', name: '福知山城', category: 'castle', region: '近畿', coordinate: { latitude: 35.2968, longitude: 135.1293, elevationMeter: 40 }, era: 'sengoku', eraLabel: '明智光秀の丹波支配・由良川を望む城', castleType: '続日本100名城・復元天守', summary: '明智光秀が築いた城下町と、由良川の交通を見渡す城です。', description: '福知山城は明智光秀が丹波支配の拠点として整えた城で、由良川を望む丘に立地します。転用石を使った石垣や城下町の形成から、戦国末期の地域支配を学べます。', sourceName: '福知山城 公式サイト', sourceUrl: 'https://www.fukuchiyamacastle.jp/' }),
  makeNationalSpot({ id: 'castle-87', name: '座喜味城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 26.4146, longitude: 127.7447, elevationMeter: 120 }, era: 'muromachi', eraLabel: '護佐丸のグスク・世界文化遺産', castleType: '世界文化遺産・国指定史跡・グスク', summary: 'アーチ形の石門と美しい曲線の城壁を残す、琉球のグスクです。', description: '座喜味城跡は護佐丸が築いたとされ、丘陵に曲線的な石灰岩の城壁を巡らせています。琉球王国のグスク及び関連遺産群の一つとして、王国の政治と信仰の景観を学べます。', sourceName: '沖縄県公式サイト（座喜味城跡）', sourceUrl: 'https://www.pref.okinawa.jp/kyoiku/kodomo/1002688/1002695/1002704.html' }),
  makeNationalSpot({ id: 'castle-88', name: '島原城', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.7880, longitude: 130.3700, elevationMeter: 35 }, era: 'edo', eraLabel: '島原藩の居城・島原天草一揆の記憶', castleType: '復元天守・続日本100名城', summary: '近世城郭とキリシタン史料、島原の乱の記憶が重なる城です。', description: '島原城は元和年間に築かれ、島原藩の政治・経済の中心となりました。島原・天草一揆やキリシタン史料、眉山の災害史と合わせ、城が地域の記憶を集める場所であることを学べます。', sourceName: '島原城 公式サイト', sourceUrl: 'https://shimabarajou.com/' }),
  makeNationalSpot({ id: 'castle-89', name: '平戸城', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.3700, longitude: 129.5530, elevationMeter: 80 }, era: 'edo', eraLabel: '松浦氏の居城・海外交流を望む海城', castleType: '日本100名城・復元天守', summary: '平戸瀬戸と海外交流の歴史を見渡す、松浦氏の城です。', description: '平戸城は松浦氏の居城として整えられ、平戸瀬戸と海の向こうの交流を見渡す位置にあります。南蛮貿易や近世の海外交流を、城と港の関係から学べます。', sourceName: '平戸城 公式サイト', sourceUrl: 'https://hirado-castle.jp/' }),
  makeNationalSpot({ id: 'castle-90', name: '一乗谷朝倉氏遺跡', category: 'castle', region: '中部', coordinate: { latitude: 36.0035, longitude: 136.2985, elevationMeter: 115 }, era: 'sengoku', eraLabel: '朝倉氏の戦国城下町・特別史跡', castleType: '特別史跡・特別名勝・山城跡', summary: '城と町並み、庭園が一体で残る戦国大名の拠点です。', description: '一乗谷朝倉氏遺跡は朝倉氏が越前支配の拠点として築いた城下町跡で、一乗谷城跡や館跡、庭園が谷全体に残ります。城だけでなく、武家屋敷・寺院跡・町並みを歩いて戦国都市の姿を学べます。', sourceName: '一乗谷朝倉氏遺跡 公式ポータル', sourceUrl: 'https://ichijo-dani.com/' }),
  makeNationalSpot({ id: 'castle-91', name: '七尾城跡', category: 'castle', region: '中部', coordinate: { latitude: 37.0090, longitude: 136.9960, elevationMeter: 300 }, era: 'sengoku', eraLabel: '能登畠山氏の大規模山城・七つ尾根の城', castleType: '国指定史跡・日本100名城・山城', summary: '七つの尾根を利用し、城下町まで広がった能登の名城です。', description: '七尾城跡は能登国の守護畠山氏が築いた大規模な山城で、山上から山麓まで曲輪と城下町を展開しました。本丸からの眺望と石垣・屋敷跡を通じて、能登の政治と文化を学べます。', sourceName: '七尾市公式サイト（史跡七尾城跡）', sourceUrl: 'https://www.city.nanao.lg.jp/syougai/nanaojoushi.html' }),
  makeNationalSpot({ id: 'castle-92', name: '金山城跡', category: 'castle', region: '関東', coordinate: { latitude: 36.3005, longitude: 139.3335, elevationMeter: 230 }, era: 'sengoku', eraLabel: '新田金山城・関東の石垣山城', castleType: '国指定史跡・日本100名城・山城', summary: '関東の山城では珍しい石垣を多用した、太田の城跡です。', description: '金山城跡は金山の山頂部に築かれ、石垣や石敷きを多用した戦国期の城郭です。関東の山城観を変えた発掘成果と、曲輪・虎口の防御から、戦国の築城技術を学べます。', sourceName: '太田市公式サイト（金山城跡）', sourceUrl: 'https://www.city.ota.gunma.jp/page/4140.html' }),
  makeNationalSpot({ id: 'castle-93', name: '唐沢山城跡', category: 'castle', region: '関東', coordinate: { latitude: 36.3440, longitude: 139.5780, elevationMeter: 240 }, era: 'sengoku', eraLabel: '佐野氏の山城・関東七名城', castleType: '国指定史跡・続日本100名城・山城', summary: '高石垣や堀切が山頂に残る、佐野氏の本拠です。', description: '唐沢山城跡は関東平野を見渡す山上に築かれ、佐野氏の居城として発展しました。現在も残る高石垣・虎口・堀切と眺望から、山城が地域支配と交通を支えた姿を紹介します。', sourceName: '佐野市公式サイト（唐沢山城跡）', sourceUrl: 'https://www.city.sano.lg.jp/soshikiichiran/kyouiku/bunkazaika/gyomuannai/4/index.html' }),
  makeNationalSpot({ id: 'castle-94', name: '村上城跡', category: 'castle', region: '中部', coordinate: { latitude: 38.2240, longitude: 139.4710, elevationMeter: 135 }, era: 'sengoku', eraLabel: '本庄氏の山城・北越後の中心', castleType: '国指定史跡・続日本100名城・山城', summary: '戦国の竪堀と江戸期の石垣が重なる、越後北部の城跡です。', description: '村上城跡は臥牛山に築かれた平山城で、戦国期の土の遺構と江戸期の石垣が混在します。城下町と羽黒神社など周辺の信仰・町並みを合わせ、北越後の中心拠点をたどれます。', sourceName: '村上市公式サイト（村上城跡）', sourceUrl: 'https://www.city.murakami.lg.jp/site/kanko/oshiroyama.html' }),
  makeNationalSpot({ id: 'castle-95', name: '高取城跡', category: 'castle', region: '近畿', coordinate: { latitude: 34.4360, longitude: 135.8170, elevationMeter: 580 }, era: 'sengoku', eraLabel: '日本三大山城・高取藩の山上城郭', castleType: '国指定史跡・日本100名城・山城', summary: '高取山の急峻な地形と石垣を生かした、日本三大山城の一つです。', description: '高取城跡は高取山の山上に築かれ、近世には高取藩の居城として整えられました。山道に連なる石垣と城下町の位置から、山の防御と地域支配の関係を歩いて学べます。', sourceName: '奈良県観光公式サイト（高取城跡）', sourceUrl: 'https://yamatoji.nara-kankou.or.jp/03history/07castle/03east_area/takatorijoato/' }),
  makeNationalSpot({ id: 'castle-96', name: '洲本城跡', category: 'castle', region: '近畿', coordinate: { latitude: 34.3380, longitude: 134.9040, elevationMeter: 130 }, era: 'sengoku', eraLabel: '淡路水軍の城・登り石垣が残る山城', castleType: '国指定史跡・続日本100名城・山城', summary: '上の城と下の城を結ぶ、全国でも珍しい登り石垣の城跡です。', description: '洲本城跡は三熊山に築かれ、山上の上の城と山麓の下の城を登り石垣で結んだ城郭です。淡路水軍と城下町、瀬戸内海の交通を合わせ、海と山を使う中世の拠点を紹介します。', sourceName: '洲本市公式サイト（洲本城跡）', sourceUrl: 'https://www.city.sumoto.lg.jp/site/tunagarumachi/16885.html' }),
  makeNationalSpot({ id: 'castle-97', name: '唐津城', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.4500, longitude: 129.9680, elevationMeter: 43 }, era: 'edo', eraLabel: '唐津藩の海城・玄界灘を望む城下町', castleType: '城跡公園・復元天守', summary: '松浦川河口と玄界灘を見渡す、唐津藩の近世城郭です。', description: '唐津城は寺沢広高が慶長年間に築いた城で、松浦川河口と海を望む立地を生かしました。城下町・虹の松原・唐津焼と合わせ、海上交通と近世の地域文化を学べます。', sourceName: '唐津市公式サイト（唐津城）', sourceUrl: 'https://www.city.karatsu.lg.jp/page/1041.html' }),
  makeNationalSpot({ id: 'castle-98', name: '臼杵城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.1250, longitude: 131.8040, elevationMeter: 25 }, era: 'sengoku', eraLabel: '大友宗麟の丹生島城・キリシタン史と海城', castleType: '国指定史跡・続日本100名城・海城', summary: 'かつて海に浮かぶ島だった、キリシタン大名大友宗麟の居城です。', description: '臼杵城跡は大友宗麟が丹生島に築いた海城で、江戸期には臼杵藩の居城となりました。石垣・櫓と城下のキリシタン史を合わせ、海と宗教が交差する豊後の歴史を学べます。', sourceName: '臼杵市観光協会（臼杵城跡）', sourceUrl: 'https://www.usuki-kanko.com/sightseeing/%E8%87%BC%E6%9D%B5%E5%9F%8E%E8%B7%A1' }),
  makeNationalSpot({ id: 'castle-99', name: '高島城', category: 'castle', region: '中部', coordinate: { latitude: 36.0340, longitude: 138.1140, elevationMeter: 760 }, era: 'edo', eraLabel: '諏訪氏の居城・諏訪湖畔の浮城', castleType: '市指定史跡・続日本100名城・復元天守', summary: '諏訪湖と城下町の景観を伝える、諏訪氏の居城です。', description: '高島城は諏訪湖に近い低湿地に築かれ、かつては湖に浮かぶように見えたことから浮城と呼ばれました。復元天守と堀、城下町の位置から、諏訪の地形と近世政治をたどれます。', sourceName: '諏訪市公式サイト（諏訪高島城）', sourceUrl: 'https://www.city.suwa.lg.jp/site/enjoy/4446.html?id=1348' }),
  makeNationalSpot({ id: 'castle-100', name: '志苔館跡', category: 'castle', region: '北海道', coordinate: { latitude: 41.7636, longitude: 140.8237, elevationMeter: 22 }, era: 'muromachi', eraLabel: '道南十二館・津軽海峡を望む中世館跡', castleType: '国指定史跡・続日本100名城・館跡', summary: '海岸段丘に築かれ、北方交易の歴史を伝える函館の館跡です。', description: '志苔館跡は道南十二館の一つで、海岸段丘の縁から函館山と津軽海峡を望みます。出土した中国製陶磁器や銭、土塁と空堀から、中世の海上交易と北の和人社会を学べます。', sourceName: '函館市公式サイト（史跡志苔館跡）', sourceUrl: 'https://www.city.hakodate.hokkaido.jp/docs/2018032900043/' }),
  makeNationalSpot({ id: 'castle-101', name: '上之国勝山館跡', category: 'castle', region: '北海道', coordinate: { latitude: 41.7878, longitude: 140.1040, elevationMeter: 90 }, era: 'muromachi', eraLabel: '蠣崎氏の交易拠点・道南の中世館跡', castleType: '国指定史跡・続日本100名城・館跡', summary: '渡島半島の交易とアイヌとの交流を考えられる中世の館跡です。', description: '上之国勝山館跡は蠣崎氏の拠点として築かれ、交易を背景に発展した中世の城館遺跡です。発掘資料と館跡の立地から、和人の活動とアイヌの人々との関係が交差する北の歴史を紹介します。', sourceName: '文化庁 国指定文化財等データベース（上之国勝山館跡）', sourceUrl: 'https://kunishitei.bunka.go.jp/heritage/detail/201/00011281' }),
  makeNationalSpot({ id: 'castle-102', name: '二本松城跡', category: 'castle', region: '東北', coordinate: { latitude: 37.5876, longitude: 140.4307, elevationMeter: 345 }, era: 'sengoku', eraLabel: '奥州の要・霞ヶ城と戊辰戦争の記憶', castleType: '国指定史跡・日本100名城・平山城', summary: '中世から近世へ続く築城技術と、二本松藩の歴史を伝える城跡です。', description: '二本松城跡は白旗ヶ峯を中心とする自然の要害に築かれ、中世から近世にかけて奥州の拠点となりました。石垣・箕輪門・城下町と戊辰戦争の記憶から、地域の政治史を学べます。', sourceName: '二本松城 公式サイト', sourceUrl: 'https://www.nihonmatsu-ed.jp/nihonmatsujyou/' }),
  makeNationalSpot({ id: 'castle-103', name: '白河小峰城跡', category: 'castle', region: '東北', coordinate: { latitude: 37.1295, longitude: 140.2115, elevationMeter: 350 }, era: 'edo', eraLabel: '奥州の抑え・白河藩の石垣城', castleType: '国指定史跡・日本100名城・平山城', summary: '総石垣の本丸と木造復元建物が残る、白河の城跡です。', description: '白河小峰城跡は阿武隈川南側の丘陵を利用し、江戸初期に総石垣の城として整えられました。戊辰戦争での落城と東日本大震災後の石垣修復から、城跡を守り伝える営みも学べます。', sourceName: '白河市公式サイト（小峰城跡）', sourceUrl: 'https://www.city.shirakawa.fukushima.jp/page/page001390.html' }),
  makeNationalSpot({ id: 'castle-104', name: '高田城跡', category: 'castle', region: '中部', coordinate: { latitude: 37.1053, longitude: 138.2497, elevationMeter: 10 }, era: 'edo', eraLabel: '松平忠輝の居城・高田城址公園', castleType: '県指定史跡・続日本100名城・平城', summary: '徳川家康の六男の居城で、堀と桜の景観が残る越後の城です。', description: '高田城は松平忠輝の居城として築かれ、現在は高田城址公園として堀と三重櫓を伝えます。城下町高田の雁木や日本三大夜桜の景観と合わせ、近世の都市計画を紹介します。', sourceName: '上越市公式サイト（高田城址公園）', sourceUrl: 'https://www.city.joetsu.niigata.jp/soshiki/toshiseibi/takada-castle-site-park.html' }),
  makeNationalSpot({ id: 'castle-105', name: '掛川城', category: 'castle', region: '中部', coordinate: { latitude: 34.7700, longitude: 138.0140, elevationMeter: 35 }, era: 'sengoku', eraLabel: '山内一豊ゆかり・東海の木造復元天守', castleType: '重要文化財・日本100名城・復元天守', summary: '天守と御殿が城下町に残る、東海道の城です。', description: '掛川城は戦国期から東海道の要衝を守り、近世には城下町と藩政の中心となりました。木造復元天守と現存する二の丸御殿から、城主の政務と街道の歴史をたどれます。', sourceName: '掛川城 公式サイト', sourceUrl: 'https://kakegawajo.com/' }),
  makeNationalSpot({ id: 'castle-106', name: '長篠城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.9254, longitude: 137.5738, elevationMeter: 50 }, era: 'sengoku', eraLabel: '長篠の戦い・豊川と宇連川の合流点の城', castleType: '国指定史跡・日本100名城・平城', summary: '河川の合流点と大土塁を生かした、長篠合戦の舞台です。', description: '長篠城跡は豊川と宇連川の合流点に築かれ、1575年の長篠の戦いで知られます。大土塁・堀跡と周辺の古戦場を合わせ、城の防御と戦国合戦の広がりを学べます。', sourceName: '新城市公式サイト（史跡長篠城跡）', sourceUrl: 'https://www.city.shinshiro.lg.jp/kanko/minzokugeino/nagashinojyoato.html' }),
  makeNationalSpot({ id: 'castle-107', name: '松坂城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.5753, longitude: 136.5270, elevationMeter: 38 }, era: 'sengoku', eraLabel: '蒲生氏郷の築城・伊勢商人の城下町', castleType: '国指定史跡・日本100名城・平山城', summary: '豪壮な石垣と御城番屋敷が、松阪の城下町の記憶を伝えます。', description: '松坂城は1588年に蒲生氏郷が築き、伊勢の商業と城下町の発展を支えました。現存する石垣と御城番屋敷から、戦国大名の築城と近世商業都市の関係を紹介します。', sourceName: '松阪市公式サイト（松坂城跡）', sourceUrl: 'https://www.city.matsusaka.mie.jp/site/kanko/matsusakajoato.html' }),
  makeNationalSpot({ id: 'castle-108', name: '赤穂城跡', category: 'castle', region: '近畿', coordinate: { latitude: 34.7482, longitude: 134.3926, elevationMeter: 8 }, era: 'edo', eraLabel: '赤穂藩の城・忠臣蔵の舞台', castleType: '国指定史跡・日本100名城・平城', summary: '海に近い縄張りと赤穂事件の記憶を伝える、播磨の城です。', description: '赤穂城跡は瀬戸内海に近い低地に築かれ、赤穂藩の政庁と城下町の中心となりました。大石神社や城下町の歴史と合わせ、藩政・塩業・忠臣蔵の物語をたどれます。', sourceName: '国史跡赤穂城跡 公式サイト', sourceUrl: 'https://www.ako-hyg.ed.jp/bunkazai/akojo/' }),
  makeNationalSpot({ id: 'castle-109', name: '箕輪城跡', category: 'castle', region: '関東', coordinate: { latitude: 36.4040, longitude: 138.9200, elevationMeter: 300 }, era: 'sengoku', eraLabel: '長野氏の本拠・西上野の大規模山城', castleType: '国指定史跡・日本100名城・平山城', summary: '広大な堀と曲輪が残る、武田・北条・徳川が争った城跡です。', description: '箕輪城跡は長野氏の本拠として築かれ、武田・織田・北条・徳川の勢力が交差した西上野の中核城郭です。大堀切や虎口を歩き、戦国大名の支配が城を変えた過程を学べます。', sourceName: '高崎市公式サイト（箕輪城跡）', sourceUrl: 'https://www.city.takasaki.gunma.jp/site/cultural-assets/6450.html' }),
  makeNationalSpot({ id: 'castle-110', name: '水戸城跡', category: 'castle', region: '関東', coordinate: { latitude: 36.3716, longitude: 140.4776, elevationMeter: 30 }, era: 'edo', eraLabel: '水戸徳川家の居城・弘道館と土造りの城', castleType: '国指定史跡・日本100名城・平山城', summary: '土塁と堀、藩校弘道館が残る水戸徳川家の城跡です。', description: '水戸城は那珂川と千波湖に挟まれた台地に築かれ、徳川頼房の入封後に水戸徳川家の居城となりました。土塁・堀・弘道館・復元大手門から、藩校と城下町を一体で学べます。', sourceName: '水戸市公式観光サイト（水戸城跡）', sourceUrl: 'https://mitokoumon.com/facility/historic/mitojoato/' }),
  makeNationalSpot({ id: 'castle-111', name: '多賀城跡', category: 'castle', region: '東北', coordinate: { latitude: 38.3026, longitude: 140.9945, elevationMeter: 20 }, era: 'nara', eraLabel: '古代東北の政治・軍事・文化の中心', castleType: '特別史跡・古代城柵', summary: '奈良・平安時代に東北の行政と交流を担った古代城柵です。', description: '多賀城跡は古代東北の政治・軍事・文化の中心として置かれ、陸奥国府や鎮守府の役割を担いました。政庁跡や南門の復元から、律令国家と地域社会の接点を学べます。', sourceName: '多賀城市公式サイト（多賀城跡）', sourceUrl: 'https://www.city.tagajo.miyagi.jp/bunkazai/shiseki/bunkazai/shitebunkazai/kunishite/terato.html' }),
  makeNationalSpot({ id: 'castle-112', name: '秋田城跡', category: 'castle', region: '東北', coordinate: { latitude: 39.7480, longitude: 140.0715, elevationMeter: 40 }, era: 'nara', eraLabel: '古代出羽の行政拠点・北方交流の城柵', castleType: '史跡・古代城柵', summary: '出羽国の行政と北方との交流を伝える、古代の城柵遺跡です。', description: '秋田城跡は奈良・平安時代に出羽北部の行政と軍事、外交を担った城柵です。政庁や古代水洗厠舎の遺構から、北方の人々との交流と古代都市の暮らしを紹介します。', sourceName: '秋田市公式サイト（秋田城跡）', sourceUrl: 'https://www.city.akita.lg.jp/kanko/kanrenshisetsu/1003616/1002306.html' }),
  makeNationalSpot({ id: 'castle-113', name: '金田城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 34.3160, longitude: 129.2930, elevationMeter: 276 }, era: 'asuka', eraLabel: '白村江の戦い後に築かれた対馬の山城', castleType: '特別史跡・古代山城', summary: '対馬海峡を見渡し、東アジアの緊張を背景に築かれた古代山城です。', description: '金田城跡は7世紀後半、朝鮮半島との関係が緊張した時代に対馬へ築かれた山城です。石垣や城門跡、海を望む立地から、日本列島が東アジアとつながっていた防衛史を学べます。', sourceName: '対馬市公式サイト（金田城跡）', sourceUrl: 'https://www.city.tsushima.nagasaki.jp/gyousei/bunka_sports/bunkazai/shinainobunkazai/1305.html' }),
  makeNationalSpot({ id: 'castle-114', name: '鞠智城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.0008, longitude: 130.7473, elevationMeter: 145 }, era: 'asuka', eraLabel: '大和政権が築いた九州の古代山城', castleType: '国指定史跡・古代山城', summary: '米倉や八角形鼓楼が復元され、古代九州の防衛と物流を伝える城跡です。', description: '鞠智城跡は7世紀後半に築かれた古代山城で、北部九州の防衛と兵站を担ったと考えられています。復元建物と広い城域から、東アジア情勢に対応した古代国家の仕組みを紹介します。', sourceName: '熊本県立装飾古墳館（鞠智城）', sourceUrl: 'https://kofunkan.pref.kumamoto.jp/kikuchijo/history/' }),
  makeNationalSpot({ id: 'castle-115', name: '宇陀松山城跡', category: 'castle', region: '近畿', coordinate: { latitude: 34.4750, longitude: 135.9510, elevationMeter: 470 }, era: 'sengoku', eraLabel: '宇陀郡を治めた山城・城下町の記憶', castleType: '国指定史跡・続日本100名城・山城', summary: '戦国から近世への変化と、宇陀松山の城下町を伝える山城跡です。', description: '宇陀松山城跡は宇陀郡を見渡す山上に築かれ、豊臣・福島氏らの支配を経て近世城下町の核となりました。石垣や登城道と松山地区の町並みから、山城と商業町の関係を学べます。', sourceName: '宇陀市公式サイト（宇陀松山城跡）', sourceUrl: 'https://www.city.uda.lg.jp/soshiki/41/1104.html' }),
  makeNationalSpot({ id: 'castle-116', name: '志布志城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 31.4760, longitude: 131.1000, elevationMeter: 50 }, era: 'muromachi', eraLabel: '日向・大隅の海上交通を押さえた中世山城群', castleType: '国指定史跡・中世山城', summary: '四つの城域が連なる、南九州の大規模な中世城郭です。', description: '志布志城跡は内城・松尾城・高城・新城の四つの城域からなる中世城郭群です。志布志港に近い立地と深い堀切から、南九州の領主支配と海上交通の結びつきを紹介します。', sourceName: '志布志市公式サイト（志布志城跡）', sourceUrl: 'https://www.city.shibushi.lg.jp/soshiki/22/1567.html' }),
  makeNationalSpot({ id: 'castle-117', name: '原城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.6290, longitude: 130.2500, elevationMeter: 30 }, era: 'edo', eraLabel: '島原・天草一揆と潜伏キリシタン史の城跡', castleType: '国指定史跡・世界文化遺産構成資産・平山城', summary: '島原・天草一揆の舞台で、キリスト教信仰と近世社会の記憶を伝えます。', description: '原城跡は有明海を望む南島原の城跡で、17世紀の島原・天草一揆の主戦場となりました。発掘された人骨や十字架などの資料から、禁教下の信仰と幕藩体制の歴史を考えられます。', sourceName: '南島原市公式サイト（原城跡）', sourceUrl: 'https://www.city.minamishimabara.lg.jp/kiji0035638/index.html' }),
  makeNationalSpot({ id: 'castle-118', name: '九戸城跡', category: 'castle', region: '東北', coordinate: { latitude: 40.2710, longitude: 141.2930, elevationMeter: 120 }, era: 'sengoku', eraLabel: '九戸政実の居城・豊臣秀吉天下統一最後の合戦場', castleType: '国指定史跡・続日本100名城・平山城', summary: '九戸の戦いを通じて、日本中世の終わりと近世の始まりを伝える城跡です。', description: '九戸城跡は九戸政実の居城で、1591年の九戸の戦いは豊臣秀吉の天下統一における最後の合戦となりました。中世の曲輪と近世的な石垣が重なる構造から、城郭の転換を学べます。', sourceName: '二戸市公式サイト（九戸城跡）', sourceUrl: 'https://www.city.ninohe.lg.jp/info/335' }),
  makeNationalSpot({ id: 'castle-119', name: '鶴ヶ岡城跡', category: 'castle', region: '東北', coordinate: { latitude: 38.7280, longitude: 139.8240, elevationMeter: 15 }, era: 'edo', eraLabel: '庄内藩酒井氏の居城・鶴岡公園', castleType: '城跡公園・庄内藩の居城', summary: '酒井氏が約250年治めた庄内の城下町と町割りを伝える城跡です。', description: '鶴ヶ岡城は大宝寺城を起源とし、江戸時代には庄内藩酒井氏の居城となりました。堀と公園、現在の市街地に残る町割りから、城が地域の都市構造を形づくった歴史を紹介します。', sourceName: '鶴岡市公式サイト（鶴岡公園）', sourceUrl: 'https://www.city.tsuruoka.lg.jp/seibi/koen-ryokuti/koen/tsurugaokajyoushi.html' }),
  makeNationalSpot({ id: 'castle-120', name: '小牧山城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.2917, longitude: 136.9120, elevationMeter: 86 }, era: 'sengoku', eraLabel: '織田信長の築城・小牧長久手の戦いの本陣', castleType: '史跡・戦国山城・陣城', summary: '信長が築き、家康が小牧長久手の戦いで改修した戦国の山城です。', description: '小牧山城跡は織田信長が築いた城を基礎に、1584年の小牧長久手の戦いで徳川家康軍が大規模に改修した陣城です。土塁・堀・城下町の痕跡から、戦国大名の城づくりを学べます。', sourceName: '小牧市公式サイト（史跡小牧山）', sourceUrl: 'https://www.city.komaki.aichi.jp/admin/soshiki/kyoiku/bunkazai/1_1/2/bunkazai/9152.html' }),
  makeNationalSpot({ id: 'castle-121', name: '津城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.7186, longitude: 136.5086, elevationMeter: 5 }, era: 'edo', eraLabel: '藤堂高虎が大改修した伊勢の城・津藩の政庁', castleType: '県指定史跡・続日本100名城・平城', summary: '高虎流の城郭整備と、伊勢の城下町の歴史を伝える城跡です。', description: '津城跡は藤堂高虎が大改修し、津藩の政庁と城下町の中心となりました。石垣や堀の痕跡、お城公園のAR・VR活用から、失われた城を地域で伝える現在の取り組みも紹介します。', sourceName: '津市公式サイト（津城跡）', sourceUrl: 'https://www.info.city.tsu.mie.jp/kosodate_kyouiku/kyouikuiinkai/1004357/1004663/1004603/1004615/1004617.html' }),
  makeNationalSpot({ id: 'castle-122', name: '一宮城跡', category: 'castle', region: '四国', coordinate: { latitude: 34.0380, longitude: 134.4330, elevationMeter: 140 }, era: 'muromachi', eraLabel: '阿波九城の一つ・徳島平野を望む山城', castleType: '県指定史跡・続日本100名城・山城', summary: '阿波九城の一つで、徳島の中世から近世への権力移動を伝える城跡です。', description: '一宮城跡は中世阿波の一宮氏の居城として築かれ、蜂須賀氏の支配下では阿波九城の一つとなりました。石垣・曲輪・山道から、戦国から近世へ移る阿波の城郭史を学べます。', sourceName: '徳島市公式サイト（一宮城跡）', sourceUrl: 'https://www.city.tokushima.tokushima.jp/kankou/bunkazai/ichinomiya2018.html' }),
  makeNationalSpot({ id: 'castle-123', name: '能島城跡', category: 'castle', region: '四国', coordinate: { latitude: 34.1680, longitude: 133.0780, elevationMeter: 40 }, era: 'muromachi', eraLabel: '村上海賊の本拠・瀬戸内海の海城', castleType: '国指定史跡・日本遺産・海城', summary: '潮流を利用した村上海賊の活動と、瀬戸内海の海上交通を伝える城跡です。', description: '能島城跡は瀬戸内海の島全体を城とした海城で、村上海賊の本拠として知られます。潮流・船着き場・曲輪の関係から、海を舞台にした中世の城と交易の歴史を紹介します。', sourceName: '今治市公式サイト（能島城跡）', sourceUrl: 'https://www.city.imabari.ehime.jp/bunka/bunkazai/hozon_nosima/' }),
  makeNationalSpot({ id: 'castle-124', name: '浦添城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 26.2480, longitude: 127.7310, elevationMeter: 148 }, era: 'muromachi', eraLabel: '中山の王都・首里の原型となった琉球グスク', castleType: '国指定史跡・琉球グスク・山城', summary: '王陵や寺院、御嶽を備え、琉球王国形成前の中山の拠点を伝える城跡です。', description: '浦添城跡は13世紀末に築かれたと考えられ、中山を治める支配者の拠点として発展しました。浦添ようどれや御嶽、海を望む高台の地形から、政治と信仰が一体となった琉球のグスクを学べます。', sourceName: '浦添市公式サイト（浦添城跡）', sourceUrl: 'https://www.city.urasoe.lg.jp/doc/609e8f1e3d59ae2434c01961/' }),
  makeNationalSpot({ id: 'castle-125', name: '伊賀上野城跡', category: 'castle', region: '近畿', coordinate: { latitude: 34.7686, longitude: 136.1300, elevationMeter: 185 }, era: 'edo', eraLabel: '藤堂高虎の高石垣・伊賀の城下町', castleType: '城跡・高石垣・復興天守', summary: '高石垣と城下町を通して、伊賀と伊勢を結ぶ近世の城づくりを伝えます。', description: '伊賀上野城跡は筒井氏の城を基礎に藤堂高虎が大改修し、高石垣を備えた近世城郭となりました。伊賀の盆地を見渡す立地と城下町から、街道・藩政・築城技術の関係を紹介します。', sourceName: '伊賀上野城 公式サイト', sourceUrl: 'https://igaueno-castle.jp/' }),
  makeNationalSpot({ id: 'castle-126', name: '浜松城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.7108, longitude: 137.7260, elevationMeter: 40 }, era: 'sengoku', eraLabel: '徳川家康の居城・出世城の記憶', castleType: '市指定史跡・平山城・復興天守', summary: '家康が長く居城とし、歴代城主から「出世城」と呼ばれる浜松の城跡です。', description: '浜松城跡は徳川家康が1570年から約17年間居城とし、浜松城下は遠江支配の拠点となりました。野面積みの石垣と天守曲輪から、戦国大名の成長と城下町の歴史を紹介します。', sourceName: '浜松市公式サイト（浜松城）', sourceUrl: 'https://www.city.hamamatsu.shizuoka.jp/park/park/park/hama/castle.html' }),
  makeNationalSpot({ id: 'castle-127', name: '堀越城跡', category: 'castle', region: '東北', coordinate: { latitude: 40.5890, longitude: 140.5400, elevationMeter: 35 }, era: 'sengoku', eraLabel: '津軽為信の居城・津軽氏城跡', castleType: '国指定史跡・津軽氏城跡・平城', summary: '津軽氏が大名として成長する過程を伝える、弘前城前身の城跡です。', description: '堀越城跡は津軽為信が1594年に居城を移し、弘前城へ移るまで津軽の政治・経済の中心となった城です。曲輪・土塁・堀の整備から、戦国大名の城館が近世城下町へ変化する過程を学べます。', sourceName: '弘前市公式サイト（堀越城跡）', sourceUrl: 'https://www.city.hirosaki.aomori.jp/gaiyou/chosya/gyousei/sisekihorikosijou.html' }),
  makeNationalSpot({ id: 'castle-128', name: '種里城跡', category: 'castle', region: '東北', coordinate: { latitude: 40.7530, longitude: 140.1900, elevationMeter: 80 }, era: 'muromachi', eraLabel: '津軽氏の祖・大浦光信の居城', castleType: '国指定史跡・津軽氏城跡・山城', summary: '津軽氏の祖が入部したとされる、津軽の中世山城です。', description: '種里城跡は津軽氏の祖とされる大浦光信が入部した城跡で、堀越城・弘前城へ続く津軽氏の発展を考える手がかりです。津軽半島南西部の地形と領主の移動から、中世北方の城郭史を紹介します。', sourceName: '弘前市公式サイト（津軽氏城跡）', sourceUrl: 'https://www.city.hirosaki.aomori.jp/gaiyou/bunkazai/kuni/kuni29.html' }),
  makeNationalSpot({ id: 'castle-129', name: '米沢城跡', category: 'castle', region: '東北', coordinate: { latitude: 37.9060, longitude: 140.1110, elevationMeter: 250 }, era: 'sengoku', eraLabel: '上杉氏の居城・松が岬公園', castleType: '城跡公園・上杉氏の居城', summary: '上杉謙信・景勝ゆかりの城下町米沢の中心となった城跡です。', description: '米沢城跡は上杉氏の居城として整えられ、現在は松が岬公園と上杉神社が本丸跡の記憶を伝えています。堀と城下町、人物祭祀が重なる景観から、戦国大名の移封と地域文化を紹介します。', sourceName: '米沢市公式サイト（上杉神社）', sourceUrl: 'https://www.city.yonezawa.yamagata.jp/category/kanko_iju/2/5105.html' }),
  makeNationalSpot({ id: 'castle-130', name: '大内氏館跡', category: 'castle', region: '中国', coordinate: { latitude: 34.1850, longitude: 131.4780, elevationMeter: 35 }, era: 'muromachi', eraLabel: '西の京・大内氏の政治と文化の拠点', castleType: '国指定史跡・続日本100名城・館跡', summary: '守護大名大内氏が山口を西の京として整えた、館と庭園の城館跡です。', description: '大内氏館跡は周防山口を本拠とした大内氏の政治・経済・文化の中心で、京都から公家や文化人が訪れました。庭園跡と龍福寺、高嶺城など周辺の遺跡から、室町期の国際都市山口を学べます。', sourceName: '山口市公式サイト（大内氏遺跡）', sourceUrl: 'https://www.city.yamaguchi.lg.jp/site/rekibunshigen/128125.html' }),
  makeNationalSpot({ id: 'castle-131', name: '高嶺城跡', category: 'castle', region: '中国', coordinate: { latitude: 34.1990, longitude: 131.4680, elevationMeter: 338 }, era: 'sengoku', eraLabel: '大内氏・毛利氏ゆかりの山城', castleType: '国指定史跡・続日本100名城・山城', summary: '大内氏館を見下ろし、山口の防衛を担った中世山城です。', description: '高嶺城跡は大内氏館跡の北にそびえる山上に築かれ、毛利氏の時代にも山口防衛の拠点となりました。館と山城の役割を合わせて見ることで、守護大名の都市支配と戦国の防衛を紹介します。', sourceName: '山口市公式サイト（大内氏遺跡）', sourceUrl: 'https://www.city.yamaguchi.lg.jp/site/rekibunshigen/128125.html' }),
  makeNationalSpot({ id: 'castle-132', name: '牧之島城跡', category: 'castle', region: '中部', coordinate: { latitude: 36.5860, longitude: 138.0000, elevationMeter: 520 }, era: 'sengoku', eraLabel: '武田信玄が馬場信房に築かせた犀川沿いの山城', castleType: '県指定史跡・平山城', summary: '犀川を望む高台で、武田流の縄張りを残す信州の城跡です。', description: '牧之島城跡は永禄年間に武田信玄の家臣・馬場信房が築いたとされ、犀川沿いの交通を押さえました。本丸・二の丸・空堀の地形から、川と山を利用した戦国城郭を学べます。', sourceName: '長野市公式サイト（牧之島城跡）', sourceUrl: 'https://www.city.nagano.nagano.jp/documents/1412/kankougaiyou.pdf' }),
  makeNationalSpot({ id: 'castle-133', name: '岩屋城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.5150, longitude: 130.5260, elevationMeter: 280 }, era: 'sengoku', eraLabel: '高橋紹運の籠城戦・大宰府を望む山城', castleType: '史跡・戦国山城', summary: '大友氏と島津氏が争った、太宰府の防衛拠点です。', description: '岩屋城跡は大宰府を見下ろす山城で、1586年に高橋紹運が島津軍を迎えた籠城戦の舞台となりました。大野城・水城と重なる眺望から、古代から戦国まで続く大宰府の防衛史を紹介します。', sourceName: '太宰府市公式サイト（大野城跡周辺）', sourceUrl: 'https://www.city.dazaifu.lg.jp/site/kanko/18464.html' }),
  makeNationalSpot({ id: 'castle-134', name: '水城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.5200, longitude: 130.5000, elevationMeter: 35 }, era: 'asuka', eraLabel: '天智天皇3年（664年）築造・大宰府の城壁', castleType: '特別史跡・古代防衛施設', summary: '唐・新羅の侵攻に備えた、長大な土塁と濠の古代防衛線です。', description: '水城跡は664年に築かれた土塁と濠による城壁で、大宰府を北から守る防衛施設でした。朝鮮半島の城壁技術と大野城・基肄城との連携から、東アジア情勢に対応した古代日本の築城を学べます。', sourceName: '太宰府市公式サイト（水城跡）', sourceUrl: 'https://www.city.dazaifu.lg.jp/site/kanko/11428.html' }),
  makeNationalSpot({ id: 'castle-135', name: '大野城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.5350, longitude: 130.5400, elevationMeter: 410 }, era: 'asuka', eraLabel: '天智天皇4年（665年）築造・大宰府背後の古代山城', castleType: '特別史跡・朝鮮式山城', summary: '土塁と石垣を山頂にめぐらせた、日本最古級の朝鮮式山城です。', description: '大野城跡は665年に大宰府の背後を守るため築かれ、百済から渡来した技術者が建設を指揮したと伝わります。尾根をめぐる土塁と石垣から、古代の国際関係と防衛施設を紹介します。', sourceName: '太宰府市公式サイト（大野城跡）', sourceUrl: 'https://www.city.dazaifu.lg.jp/site/bunkazai/2390.html' }),
  makeNationalSpot({ id: 'castle-136', name: '聖通寺城跡', category: 'castle', region: '四国', coordinate: { latitude: 34.3220, longitude: 133.8560, elevationMeter: 120 }, era: 'muromachi', eraLabel: '瀬戸大橋を望む讃岐の中世山城', castleType: '史跡・中世山城', summary: '瀬戸内海の海上交通を見渡し、生駒氏も拠点とした山城跡です。', description: '聖通寺城跡は室町時代に築かれたと伝わる山城で、生駒親正が高松城を築く前に拠った場所ともされます。山頂の曲輪と空堀、瀬戸内海を望む立地から、讃岐の海上交通と戦国領主の拠点を学べます。', sourceName: '坂出市公式サイト（常盤公園・聖通寺城跡）', sourceUrl: 'https://www.city.sakaide.lg.jp/soshiki/sangyoukankou/tokiwa-park.html' })
  ,makeNationalSpot({ id: 'religious-180', name: '住吉神社（小樽）', category: 'religious', region: '北海道', coordinate: { latitude: 43.1830, longitude: 141.0060, elevationMeter: 42 }, era: 'edo', eraLabel: '慶応元年（1865年）勧請・小樽港の総鎮守', religiousType: '神社・住吉信仰・港町の鎮守', summary: '北前船と小樽港の発展を見守ってきた、道央の港町の総鎮守です。', description: '住吉神社は1865年に住吉大神を勧請することが許され、小樽港へ入る船の安全と地域の平安を願う社として発展しました。高台の境内と祭礼から、港町の開拓と海上信仰の結びつきを紹介します。', sourceName: '北海道神社庁（住吉神社）', sourceUrl: 'https://hokkaidojinjacho.jp/%E4%BD%8F%E5%90%89%E7%A5%9E%E7%A4%BE-3/' }),
  makeNationalSpot({ id: 'religious-181', name: '樽前山神社', category: 'religious', region: '北海道', coordinate: { latitude: 42.6370, longitude: 141.6050, elevationMeter: 25 }, era: 'meiji', eraLabel: '霊峰樽前山を仰ぐ苫小牧の総鎮守', religiousType: '神社・火山信仰・地域の総鎮守', summary: '活火山を神体として仰ぐ、北海道の自然信仰と開拓の記憶を伝える神社です。', description: '樽前山神社は霊峰樽前山の山麓に祠を設けた信仰を起源とし、明治期に苫小牧の総鎮守として整えられました。火山・森林・港の恵みを祈る地域信仰をたどれます。', sourceName: '北海道神社庁（樽前山神社）', sourceUrl: 'https://hokkaidojinjacho.jp/%E6%A8%BD%E5%89%8D%E5%B1%B1%E7%A5%9E%E7%A4%BE/' }),
  makeNationalSpot({ id: 'religious-182', name: '慈恩寺', category: 'religious', region: '東北', coordinate: { latitude: 38.3800, longitude: 140.2300, elevationMeter: 230 }, era: 'nara', eraLabel: '奈良時代創建伝承・山形の法会と修験の寺', religiousType: '寺院・慈恩宗・修験道の宗教都市', summary: '本堂・三重塔と修験の山野が一体となった、東北を代表する古刹です。', description: '慈恩寺は古代に開かれたと伝わり、近世には本堂や三重塔、院坊、修験道の修行場が広がる大寺院となりました。法会を中心に続く祈りの場として、山形の仏教文化を紹介します。', sourceName: '本山慈恩寺 公式サイト', sourceUrl: 'https://honzan-jionji.jp/about-page/' }),
  makeNationalSpot({ id: 'religious-183', name: '金峯神社（鶴岡）', category: 'religious', region: '東北', coordinate: { latitude: 38.6640, longitude: 139.7900, elevationMeter: 460 }, era: 'heian', eraLabel: '金峯修験の聖地・庄内の山岳信仰', religiousType: '神社・修験道・金峯山信仰', summary: '熊野三山になぞらえた金峯三山の修験文化を伝える庄内の霊場です。', description: '鶴岡の金峯神社は、金峯山を中心とする山岳修験の聖地として信仰されてきました。雪灯籠や山開きの行事から、自然の峰を歩いて祈る庄内の宗教文化を紹介します。', sourceName: '金峯神社（鶴岡）公式サイト', sourceUrl: 'https://kinbo.jp/' }),
  makeNationalSpot({ id: 'religious-184', name: '秩父神社', category: 'religious', region: '関東', coordinate: { latitude: 35.9980, longitude: 139.0850, elevationMeter: 160 }, era: 'ancient', eraLabel: '知知夫国の総鎮守・秩父夜祭の社', religiousType: '神社・妙見信仰・総鎮守', summary: '古代の知知夫国から秩父妙見信仰、秩父夜祭へ続く盆地の中心です。', description: '秩父神社は知知夫国の祖神を祀ったことを起源とされ、中世以降は妙見信仰とも結びつきました。秩父夜祭の山車と神幸から、地域の歴史と祭礼が一体となる姿を学べます。', sourceName: '秩父神社 公式サイト（ご祭神・由緒）', sourceUrl: 'https://www.chichibu-jinja.or.jp/saijin/' }),
  makeNationalSpot({ id: 'religious-185', name: '箱根神社', category: 'religious', region: '関東', coordinate: { latitude: 35.2030, longitude: 139.0260, elevationMeter: 730 }, era: 'nara', eraLabel: '天平宝字元年（757年）奉遷伝承・関東総鎮守', religiousType: '神社・箱根山岳信仰・修験道', summary: '芦ノ湖と神体山を結ぶ、関東の山岳信仰と交通安全の霊場です。', description: '箱根神社は箱根山を神体山として仰ぐ古い信仰を基盤に、万巻上人が757年に現在地へ奉遷したと伝わります。鎌倉武士の崇敬や東海道の往来と重なる、山と道の信仰を紹介します。', sourceName: '箱根神社 公式サイト（由緒）', sourceUrl: 'https://hakonejinja.or.jp/hakone/' }),
  makeNationalSpot({ id: 'religious-186', name: '久能山東照宮', category: 'religious', region: '中部', coordinate: { latitude: 34.9640, longitude: 138.4680, elevationMeter: 300 }, era: 'edo', eraLabel: '元和3年（1617年）創建・徳川家康を祀る国宝社殿', religiousType: '神社・東照宮・徳川家康の霊廟', summary: '家康の遺命と江戸初期の権現造を伝える、最初の東照宮です。', description: '久能山東照宮は徳川家康を祀るため創建され、国宝の社殿は江戸初期の権現造を今に伝えます。久能寺以来の山の信仰と、近世の将軍家祭祀が重なる場所です。', sourceName: '久能山東照宮 公式サイト', sourceUrl: 'https://www.toshogu.or.jp/about/' }),
  makeNationalSpot({ id: 'religious-187', name: '瑞龍寺（高岡）', category: 'religious', region: '中部', coordinate: { latitude: 36.7430, longitude: 137.0140, elevationMeter: 8 }, era: 'edo', eraLabel: '前田利長の菩提寺・江戸初期の国宝伽藍', religiousType: '寺院・曹洞宗・大名菩提寺', summary: '加賀前田家の菩提寺として整えられた、国宝の禅宗伽藍です。', description: '瑞龍寺は加賀藩二代藩主前田利長を弔うため、三代利常が建立した曹洞宗寺院です。仏殿・法堂・山門を軸とする左右対称の伽藍から、大名文化と禅宗建築を紹介します。', sourceName: '国宝高岡山瑞龍寺 公式サイト', sourceUrl: 'https://www.zuiryuji.jp/' }),
  makeNationalSpot({ id: 'religious-188', name: '永保寺', category: 'religious', region: '中部', coordinate: { latitude: 35.3430, longitude: 137.1070, elevationMeter: 160 }, era: 'muromachi', eraLabel: '正和3年（1314年）開創・夢窓国師の禅寺', religiousType: '寺院・臨済宗・禅庭園', summary: '夢窓国師の庭園と国宝の観音堂・開山堂を伝える虎渓山の寺院です。', description: '永保寺は1314年に夢窓国師が観音堂を建てたことを起源とし、渓谷と庭園を生かした禅の景観を形成しました。堂宇と自然を一体で見ることで、中世禅宗文化を学べます。', sourceName: '岐阜県公式サイト（永保寺観音堂）', sourceUrl: 'https://www.pref.gifu.lg.jp/page/351158.html' }),
  makeNationalSpot({ id: 'religious-189', name: '多度大社', category: 'religious', region: '中部', coordinate: { latitude: 35.1150, longitude: 136.5740, elevationMeter: 45 }, era: 'ancient', eraLabel: '多度山を神体山とする北伊勢の古社', religiousType: '神社・神体山信仰・多度祭', summary: '多度山の磐座と上げ馬神事で知られる、北伊勢の山岳信仰拠点です。', description: '多度大社は多度山を神体山として仰ぎ、山中の磐座や御神石から古い信仰を伝えます。多度祭などの祭礼を通じ、農耕・武家・地域社会の祈りが重なる姿を紹介します。', sourceName: '多度大社 公式サイト（由緒）', sourceUrl: 'https://tadotaisya.or.jp/%E5%A4%9A%E5%BA%A6%E5%A4%A7%E7%A4%BE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/' }),
  makeNationalSpot({ id: 'religious-190', name: '御上神社', category: 'religious', region: '近畿', coordinate: { latitude: 35.0260, longitude: 136.0260, elevationMeter: 105 }, era: 'ancient', eraLabel: '三上山を神体山とする近江の国宝社殿', religiousType: '神社・神体山信仰・近江国の古社', summary: '近江富士・三上山を神体山として祀る、国宝本殿の古社です。', description: '御上神社は三上山を神体山とし、山に降臨した神を斎き祀ったと伝わります。神仏習合の面影を残す社殿と山の関係から、近江の古い祭祀文化を紹介します。', sourceName: '御上神社 公式サイト', sourceUrl: 'https://mikami-jinja.jp/mikami-jinja/' }),
  makeNationalSpot({ id: 'religious-191', name: '住吉神社（下関）', category: 'religious', region: '中国', coordinate: { latitude: 33.9880, longitude: 130.9490, elevationMeter: 25 }, era: 'ancient', eraLabel: '長門国一之宮・国宝本殿の住吉社', religiousType: '神社・住吉信仰・長門国一之宮', summary: '海上守護の住吉大神を祀り、室町期の国宝本殿を伝える長門の一宮です。', description: '下関の住吉神社は延喜式にも名が見える古社で、住吉大神の荒魂を祀る長門国一之宮です。海峡の交通と大内氏の崇敬、国宝本殿から西日本の海上信仰を紹介します。', sourceName: '山口県公式サイト（文化財・住吉神社）', sourceUrl: 'https://bunkazai.pref.yamaguchi.lg.jp/sp/bunkazai/summary.asp?mid=80032' }),
  makeNationalSpot({ id: 'religious-192', name: '佐太神社', category: 'religious', region: '中国', coordinate: { latitude: 35.4950, longitude: 132.9690, elevationMeter: 8 }, era: 'nara', eraLabel: '出雲国二之宮・神在の社', religiousType: '神社・出雲信仰・神在祭', summary: '佐太大神と神在祭を通して、出雲の神話と海辺の信仰を伝える社です。', description: '佐太神社は出雲国二之宮で、佐太大神を道開き・海上守護の神として祀ります。神在祭や加賀の潜戸に結びつく由緒から、出雲の神々と日本海沿岸の信仰を紹介します。', sourceName: '佐太神社 公式サイト（縁起）', sourceUrl: 'https://sadajinjya.jp/?WID=1717&m=wp' }),
  makeNationalSpot({ id: 'religious-194', name: '住吉神社（博多）', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 33.5860, longitude: 130.4160, elevationMeter: 6 }, era: 'nara', eraLabel: '筑前国一之宮・日本三大住吉の海上守護社', religiousType: '神社・住吉信仰・筑前国一之宮', summary: '博多の海上交通と都市の発展を見守ってきた、筑前国一之宮です。', description: '博多の住吉神社は奈良時代の天平年間に住吉三神を祀ったことを起源とし、海路の守護神として信仰されました。博多の港と都市文化に根づく住吉信仰を紹介します。', sourceName: '筑前國一之宮 住吉神社 公式サイト', sourceUrl: 'https://www.nihondaiichisumiyoshigu.jp/about/' }),
  makeNationalSpot({ id: 'religious-195', name: '大御神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 32.4260, longitude: 131.6610, elevationMeter: 12 }, era: 'ancient', eraLabel: '日向のお伊勢さま・日向灘の海辺の社', religiousType: '神社・天照大御神・海岸の自然信仰', summary: '日向灘に面し「日向のお伊勢さま」と呼ばれる、宮崎北部の古社です。', description: '大御神社は日向灘を望む海岸に鎮座し、天照大御神を祀ることから日向のお伊勢さまと親しまれています。海食洞や巨岩と社殿の関係から、日向の自然信仰を紹介します。', sourceName: '大御神社 公式サイト', sourceUrl: 'https://oomijinja.com/' }),
  makeNationalSpot({ id: 'castle-137', name: '忍城跡', category: 'castle', region: '関東', coordinate: { latitude: 36.1380, longitude: 139.4600, elevationMeter: 20 }, era: 'sengoku', eraLabel: '成田氏の居城・小田原攻めの水攻めの城', castleType: '県指定史跡・平城・水城', summary: '豊臣軍の水攻めに耐えた、関東平野の水城と城下町の記憶を伝えます。', description: '忍城は室町時代後半に成田氏の居城として築かれ、1590年の小田原攻めでは石田三成らの水攻めを受けました。堀と城下町、再建された櫓から、低地の城の防御を学べます。', sourceName: '行田市公式サイト（忍城跡）', sourceUrl: 'https://www.city.gyoda.lg.jp/soshiki/shougaigakusyubu/bunkazaihogo/gyomu/rekishi_bunkazai/1/2261.html' }),
  makeNationalSpot({ id: 'castle-138', name: '山中城跡', category: 'castle', region: '関東', coordinate: { latitude: 35.1800, longitude: 138.9910, elevationMeter: 580 }, era: 'sengoku', eraLabel: '小田原北条氏の西方防衛・障子堀の山城', castleType: '国指定史跡・日本100名城・山城', summary: '豊臣秀吉軍との攻防を伝える、障子堀が特徴的な箱根西麓の城跡です。', description: '山中城は小田原北条氏が西方防御の要として築いた山城で、1590年に豊臣軍の攻撃を受け落城しました。土塁・曲輪・障子堀の立体的な構造から、境目の城の役割を紹介します。', sourceName: '三島市公式サイト（山中城跡）', sourceUrl: 'https://www.city.mishima.shizuoka.jp/page/29769.html' }),
  makeNationalSpot({ id: 'castle-139', name: '高遠城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.8350, longitude: 138.0640, elevationMeter: 810 }, era: 'sengoku', eraLabel: '武田氏の南信濃支配・高遠城の戦い', castleType: '国指定史跡・日本100名城・平山城', summary: '南信濃の要衝を守り、織田軍との攻防を伝える城跡です。', description: '高遠城は南信濃の交通を押さえる山城として整えられ、武田氏の支配を経て1582年の高遠城の戦いの舞台となりました。曲輪と城下町の痕跡から、信州の戦国史を紹介します。', sourceName: '伊那市公式サイト（高遠城跡）', sourceUrl: 'https://www.inacity.jp/shisei/kakushuplanshiryo/rekishibunka/takatojo_keikaku.html' }),
  makeNationalSpot({ id: 'castle-140', name: '二俣城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.8660, longitude: 137.8170, elevationMeter: 70 }, era: 'sengoku', eraLabel: '徳川・武田の攻防と松平信康の居城', castleType: '国指定史跡・戦国山城・別城一郭', summary: '天竜川の要衝で徳川氏と武田氏が争った、石垣を備える戦国山城です。', description: '二俣城は天竜川水運と秋葉街道が交わる要衝に築かれ、1572年から徳川氏と武田氏の攻防が続きました。鳥羽山城と機能を分ける別城一郭の構造から、戦国城郭の変化を紹介します。', sourceName: '浜松市公式サイト（二俣城跡及び鳥羽山城跡）', sourceUrl: 'https://www.city.hamamatsu.shizuoka.jp/bunkazai/news/documents/hutamatatobayama.html' }),
  makeNationalSpot({ id: 'castle-141', name: '鳥羽城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.4830, longitude: 136.8430, elevationMeter: 35 }, era: 'sengoku', eraLabel: '九鬼水軍の海城・志摩の海上拠点', castleType: '県指定史跡・海城', summary: '九鬼嘉隆が築いた、海に向けて大手門を開く水軍の城です。', description: '鳥羽城は九鬼嘉隆が水軍運用を重視して築いた海城で、海岸側に大手水門を開いていました。残る石垣と港の位置から、海上交通と戦国大名の水軍支配を紹介します。', sourceName: '鳥羽市公式サイト（鳥羽城跡）', sourceUrl: 'https://www.city.toba.mie.jp/kanko_bunka_sports/rekishi_bunkazai/bunkazai/3910.html' }),
  makeNationalSpot({ id: 'castle-142', name: '勝瑞城館跡', category: 'castle', region: '四国', coordinate: { latitude: 34.1270, longitude: 134.4980, elevationMeter: 5 }, era: 'sengoku', eraLabel: '細川氏・三好氏の阿波政治文化の中心', castleType: '国指定史跡・城館跡', summary: '阿波国の守護所から三好氏の城館へ続く、政治・経済・文化の中心地です。', description: '勝瑞は室町後期に細川氏の守護所が置かれ、戦国期には三好氏の政治拠点となりました。発掘された堀や庭園から、阿波の守護大名と戦国領主の都市を紹介します。', sourceName: '藍住町公式サイト（勝瑞城館跡）', sourceUrl: 'https://www.town.aizumi.lg.jp/docs/2013122400052/' }),
  makeNationalSpot({ id: 'castle-143', name: '津和野城跡', category: 'castle', region: '中国', coordinate: { latitude: 34.4660, longitude: 131.7700, elevationMeter: 360 }, era: 'muromachi', eraLabel: '吉見氏から亀井氏へ続く山陰の山城', castleType: '国指定史跡・続日本100名城・山城', summary: '山頂の石垣と城下町を一望できる、津和野盆地の政治拠点です。', description: '津和野城は吉見氏の中世山城を起源とし、関ヶ原後に坂崎氏、続いて亀井氏が城域を拡張しました。本丸と出丸の石垣から、山陰の国境と城下町の歴史を紹介します。', sourceName: '津和野文化ポータル（津和野城跡）', sourceUrl: 'https://tsuwano-bunka.net/cultural-property/detail_tsuwano-jo/' }),
  makeNationalSpot({ id: 'castle-144', name: '吉田郡山城跡', category: 'castle', region: '中国', coordinate: { latitude: 34.6660, longitude: 132.7000, elevationMeter: 390 }, era: 'sengoku', eraLabel: '毛利元就の本拠・中国地方最大級の山城', castleType: '国指定史跡・続日本100名城・山城', summary: '毛利氏が勢力を広げた、安芸国の大規模な山城跡です。', description: '吉田郡山城は南北朝期以来、毛利氏が一貫して本拠とした山城で、毛利元就の時代に大規模化しました。無数の曲輪と尾根の構造から、中国地方の戦国大名の成長を紹介します。', sourceName: '安芸高田市公式サイト（郡山城跡）', sourceUrl: 'https://www.akitakata.jp/ja/shisei/section/kyouiku/shisekibunkazai/cultural_asset/siseki_kuni/mourisisiroato/kouriyamajyouato/' }),
  makeNationalSpot({ id: 'castle-145', name: '備中高松城跡', category: 'castle', region: '中国', coordinate: { latitude: 34.7040, longitude: 133.8270, elevationMeter: 8 }, era: 'sengoku', eraLabel: '清水宗治の居城・秀吉の水攻め', castleType: '国指定史跡・沼城・戦国城郭', summary: '毛利氏の境目七城の主城で、備中高松城の水攻めを伝える城跡です。', description: '備中高松城は低湿地に築かれた沼城で、1582年に羽柴秀吉軍の水攻めを受けました。城跡と築堤跡を合わせて見ることで、戦国の攻城戦と天下統一の転換点を紹介します。', sourceName: '岡山県公式サイト（備中高松城跡）', sourceUrl: 'https://www.pref.okayama.jp/site/kodai/628728.html' }),
  makeNationalSpot({ id: 'castle-146', name: '三原城跡', category: 'castle', region: '中国', coordinate: { latitude: 34.4000, longitude: 133.0780, elevationMeter: 5 }, era: 'sengoku', eraLabel: '小早川隆景の海城・瀬戸内の水運拠点', castleType: '国指定史跡・海城', summary: '海を取り込んだ縄張りと駅前に残る石垣から、小早川氏の水軍拠点を伝えます。', description: '三原城は小早川隆景が築き、海と堀を一体化した瀬戸内の海城として整備されました。天主台や船入櫓の石垣から、海上交通と毛利氏一門の支配を紹介します。', sourceName: '三原市公式サイト（三原城跡）', sourceUrl: 'https://www.city.mihara.hiroshima.jp/soshiki/50/139854.html' }),
  makeNationalSpot({ id: 'castle-147', name: '小倉城', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.8840, longitude: 130.8730, elevationMeter: 20 }, era: 'edo', eraLabel: '細川忠興の築城・九州五街道の起点', castleType: '城跡・海城・復興天守', summary: '関門海峡に近い海城として、細川・小笠原氏の小倉藩政を伝える城です。', description: '小倉城は1602年に細川忠興が本格的に築き、九州各地へ通じる街道の起点として発展しました。海に面した立地と野面積みの石垣から、城と港湾都市の関係を紹介します。', sourceName: '小倉城 公式サイト（歴史）', sourceUrl: 'https://kokura-castle.jp/history/' }),
  makeNationalSpot({ id: 'castle-148', name: '佐敷城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.3040, longitude: 130.4980, elevationMeter: 110 }, era: 'sengoku', eraLabel: '加藤清正の国境防備・薩摩街道の境目の城', castleType: '国指定史跡・近世初頭の山城', summary: '肥後と薩摩の境目を守り、破城の痕跡も残す加藤清正の支城です。', description: '佐敷城は1588年頃、加藤清正が島津氏に備える境目の城として整備したと考えられています。高石垣の曲輪と一国一城令後の破城から、近世初頭の政治・軍事を紹介します。', sourceName: '文化庁 文化遺産オンライン（佐敷城跡）', sourceUrl: 'https://online.bunka.go.jp/heritages/detail/164751' }),
  makeNationalSpot({ id: 'religious-196', name: '有珠善光寺', category: 'religious', region: '北海道', coordinate: { latitude: 42.5180, longitude: 140.7620, elevationMeter: 20 }, era: 'edo', eraLabel: '蝦夷三官寺・国指定史跡善光寺跡', religiousType: '寺院・浄土宗・蝦夷三官寺', summary: '江戸幕府が北辺政策のために置いた蝦夷三官寺の一つです。', description: '有珠善光寺は古代開基伝承を持ち、江戸後期には蝦夷三官寺の一つとして整えられました。火山災害時の救護や円空仏、国指定史跡の境内から、信仰と開拓・防災の歴史を紹介します。', sourceName: '有珠善光寺 公式サイト（歴史・沿革）', sourceUrl: 'https://www.usu-zenkoji.jp/history/' }),
  makeNationalSpot({ id: 'religious-197', name: '国泰寺（厚岸）', category: 'religious', region: '北海道', coordinate: { latitude: 43.0260, longitude: 144.8420, elevationMeter: 15 }, era: 'edo', eraLabel: '文化元年（1804年）創建・蝦夷三官寺', religiousType: '寺院・臨済宗・蝦夷三官寺', summary: 'ロシア南下への警備と蝦夷地の宗教政策を担った、厚岸の古刹です。', description: '厚岸国泰寺は1804年に設置が決まった蝦夷三官寺の一つで、北辺の警備と和人の葬祭、地域への布教を担いました。湾岸の境内と防風林から、海辺の寺院が果たした役割を紹介します。', sourceName: '厚岸町公式サイト（国泰寺跡）', sourceUrl: 'https://www.akkeshi-town.jp/syoukai/rekishi_bunka/culture/kokutaiji/' }),
  makeNationalSpot({ id: 'religious-198', name: '川崎大師 平間寺', category: 'religious', region: '関東', coordinate: { latitude: 35.5350, longitude: 139.7250, elevationMeter: 4 }, era: 'heian', eraLabel: '大治3年（1128年）創建・厄除弘法大師', religiousType: '寺院・真言宗智山派・厄除信仰', summary: '厄除けの大師として門前町と参詣鉄道を発展させた首都圏の大寺院です。', description: '川崎大師平間寺は1128年、海中から引き揚げられた弘法大師像を本尊として建立されたと伝わります。厄除けの民衆信仰と門前町、参詣交通の発展を紹介します。', sourceName: '川崎大師 公式サイト', sourceUrl: 'https://www.kawasakidaishi.com/' }),
  makeNationalSpot({ id: 'religious-199', name: '妙義神社', category: 'religious', region: '関東', coordinate: { latitude: 36.3000, longitude: 138.7450, elevationMeter: 430 }, era: 'ancient', eraLabel: '宣化天皇2年（537年）創建伝承・妙義山信仰', religiousType: '神社・山岳信仰・修験道', summary: '奇岩の妙義山を信仰の山として仰ぐ、関東の山岳霊場です。', description: '妙義神社は妙義山の主峰白雲山東麓に鎮座し、537年の鎮祭伝承を持ちます。権現造の社殿と岩峰の景観から、山の神を祀る信仰と文化財を紹介します。', sourceName: '妙義神社 公式サイト（歴史）', sourceUrl: 'https://myougi.or.jp/history/sample-history1/' }),
  makeNationalSpot({ id: 'religious-203', name: '高幡不動尊 金剛寺', category: 'religious', region: '関東', coordinate: { latitude: 35.6610, longitude: 139.4130, elevationMeter: 70 }, era: 'heian', eraLabel: '慈覚大師開創伝承・関東三大不動', religiousType: '寺院・真言宗智山派・不動尊信仰', summary: '重要文化財の不動堂と不動三尊を伝える、多摩の厄除け霊場です。', description: '高幡不動尊金剛寺は慈覚大師円仁が東関鎮護の霊場として開いたと伝わり、平安後期の不動三尊を本尊とします。八十八カ所巡りや護摩祈願から、都市近郊の巡礼文化を紹介します。', sourceName: '高幡不動尊 金剛寺 公式サイト', sourceUrl: 'https://www.takahatafudoson.or.jp/keidai/' }),
  makeNationalSpot({ id: 'religious-200', name: '竹林寺', category: 'religious', region: '四国', coordinate: { latitude: 33.5460, longitude: 133.5760, elevationMeter: 110 }, era: 'nara', eraLabel: '神亀元年（724年）開創伝承・四国霊場第31番', religiousType: '寺院・真言宗智山派・四国遍路', summary: '文殊菩薩を本尊とする、四国遍路と学問の山寺です。', description: '竹林寺は聖武天皇の命を受けた行基が開いたと伝わる四国霊場第31番札所です。五台山の自然、国重要文化財の本堂、文殊信仰から、遍路と学問の文化を紹介します。', sourceName: '高知市公式サイト（竹林寺）', sourceUrl: 'https://www.city.kochi.kochi.jp/site/kanko/chikurinji.html' }),
  makeNationalSpot({ id: 'religious-201', name: '志度寺', category: 'religious', region: '四国', coordinate: { latitude: 34.3230, longitude: 134.1740, elevationMeter: 8 }, era: 'asuka', eraLabel: '推古天皇33年（625年）創建伝承・四国霊場第86番', religiousType: '寺院・真言宗善通寺派・観音霊場', summary: '海女の玉取り縁起と閻魔信仰を伝える、志度湾岸の古刹です。', description: '志度寺は625年創建伝承を持つ四国霊場第86番札所で、十一面観音を本尊とします。海女の玉取り縁起、閻魔堂、海辺の補陀洛信仰から、瀬戸内の観音文化を紹介します。', sourceName: '志度寺 公式サイト（由緒）', sourceUrl: 'https://shidoji.or.jp/about/' }),
  makeNationalSpot({ id: 'religious-202', name: '等澍院', category: 'religious', region: '北海道', coordinate: { latitude: 42.1240, longitude: 142.9320, elevationMeter: 12 }, era: 'edo', eraLabel: '文化元年（1804年）創建・蝦夷三官寺筆頭', religiousType: '寺院・天台宗・蝦夷三官寺', summary: '様似山道と結びつき、蝦夷三官寺の筆頭とされた日高の寺院です。', description: '等澍院は江戸後期に蝦夷三官寺の筆頭寺院として置かれ、北辺の宗教政策と交通を支えました。様似山道や西国三十三観音の石仏とともに、巡礼と開拓の歴史を紹介します。', sourceName: '北海道教育委員会（蝦夷三官寺）', sourceUrl: 'https://www.pref.hokkaido.lg.jp/fs/8/5/9/3/7/5/2/_/62_%E8%9D%A6%E5%A4%B7%E4%B8%89%E5%AE%98%E5%AF%BA%28%E6%9C%89%E7%8F%A0%E5%96%84%E5%85%89%E5%AF%BA%E3%80%81%E6%A7%98%E4%BC%BC%E7%AD%89%E3%81%97%E3%82%85%E3%81%84%E3%82%93%E3%80%81%E5%8E%9A%E5%B2%B8%E5%9B%BD%E6%B3%B0%E5%AF%BA%29.pdf' }),
  makeNationalSpot({ id: 'castle-149', name: '清水山城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 34.2080, longitude: 129.2850, elevationMeter: 206 }, era: 'sengoku', eraLabel: '文禄・慶長の役の駅城・対馬の兵站拠点', castleType: '国指定史跡・陣城・山城', summary: '名護屋城から朝鮮半島へ続く兵站線を支えた、対馬の国境山城です。', description: '清水山城は文禄・慶長の役に際して壱岐・対馬の駅城として築かれたと伝えられます。一ノ丸から三ノ丸まで続く石垣と対馬海峡の眺望から、近世初頭の対外戦争を紹介します。', sourceName: '長崎県文化財データベース（清水山城跡）', sourceUrl: 'https://www.pref.nagasaki.jp/bunkadb/index.php/view/561' }),
  makeNationalSpot({ id: 'castle-150', name: '金石城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 34.2020, longitude: 129.2920, elevationMeter: 10 }, era: 'sengoku', eraLabel: '宗氏の居城・朝鮮通信使を迎えた対馬の外交拠点', castleType: '国指定史跡・館跡・外交城郭', summary: '日本と朝鮮の通交を担った、対馬藩宗家の居城跡です。', description: '金石城は1528年に築かれた宗氏の館を起源とし、近世には対馬藩の政庁と朝鮮通信使を迎える外交の場となりました。庭園と櫓門、国境の島の立地から、城と国際交流を紹介します。', sourceName: '文化庁 文化遺産オンライン（金石城跡）', sourceUrl: 'https://online.bunka.go.jp/heritages/detail/164041' }),
  makeNationalSpot({ id: 'castle-151', name: '引田城跡', category: 'castle', region: '四国', coordinate: { latitude: 34.2200, longitude: 134.4100, elevationMeter: 80 }, era: 'sengoku', eraLabel: '瀬戸内東部の海城・続日本100名城', castleType: '国指定史跡・続日本100名城・海城', summary: '港と山を一体化し、讃岐東部の海上交通を押さえた城跡です。', description: '引田城跡は瀬戸内海に突き出す城山に築かれ、港と山頂の曲輪を組み合わせた海城です。石垣と港町の関係から、讃岐東部の海上交通と戦国領主の拠点を紹介します。', sourceName: '東かがわ市公式サイト（引田城跡）', sourceUrl: 'https://www.higashikagawa.jp/soshikikarasagasu/shogaigakushuka/gyomuannai/8/hiketa_z/index.html' }),
  makeNationalSpot({ id: 'castle-152', name: '穆佐城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 31.9480, longitude: 131.3520, elevationMeter: 60 }, era: 'muromachi', eraLabel: '日向三高城・薩摩街道の中世山城', castleType: '国指定史跡・中世山城', summary: '大規模な曲輪群と空堀が残る、日向の古い中世山城です。', description: '穆佐城は穆佐院高城とも呼ばれ、佐土原から都城・薩摩へ向かう街道の要衝に築かれました。4つの曲輪群を分ける大規模な空堀から、南九州の中世城郭を紹介します。', sourceName: '宮崎市公式サイト（穆佐城跡）', sourceUrl: 'https://www.city.miyazaki.miyazaki.jp/culture/history/267430.html' }),
  makeNationalSpot({ id: 'castle-153', name: '佐土原城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.0270, longitude: 131.4040, elevationMeter: 90 }, era: 'sengoku', eraLabel: '伊東氏・島津氏の日向支配の中心', castleType: '国指定史跡・山城・城館', summary: '中世から近世まで日向の政治・経済・文化を支えた山城です。', description: '佐土原城は14世紀末から築かれ、伊東氏・島津氏の支配を経て佐土原藩の本城となりました。450年余り使われた城域から、中世山城が近世の城館へ変わる過程を紹介します。', sourceName: '宮崎市公式サイト（佐土原城跡）', sourceUrl: 'https://www.city.miyazaki.miyazaki.jp/culture/art/376870.html' }),
  makeNationalSpot({ id: 'castle-154', name: '勝本城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 33.8490, longitude: 129.6750, elevationMeter: 80 }, era: 'sengoku', eraLabel: '文禄・慶長の役の中継城・壱岐の国境防衛', castleType: '国指定史跡・陣城・海城', summary: '朝鮮出兵に際して築かれた、壱岐の海上中継と防衛の城跡です。', description: '勝本城は豊臣秀吉の朝鮮出兵に伴い、肥前名護屋城と対馬・朝鮮半島を結ぶ中継拠点として築かれました。壱岐の港と海峡を望む立地から、国境島の軍事史を紹介します。', sourceName: '長崎県公式サイト（文化財）', sourceUrl: 'https://www.pref.nagasaki.jp/bunkadb/intro1-2.html' }),
   makeNationalSpot({ id: 'castle-155', name: '日野江城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.6320, longitude: 130.2870, elevationMeter: 80 }, era: 'sengoku', eraLabel: '有馬氏の居城・キリシタン大名と南蛮交流', castleType: '国指定史跡・平山城・キリシタン史跡', summary: '有馬晴信の居城で、セミナリヨや南蛮交流の舞台となった城跡です。', description: '日野江城は有馬氏の本城で、キリシタン大名有馬晴信の時代には宣教師や南蛮文化との交流が進みました。大手道の階段や金箔瓦、城下の宗教史から、戦国期の国際交流を紹介します。', sourceName: '南島原市公式サイト（日野江城跡）', sourceUrl: 'https://www.city.minamishimabara.lg.jp/sekaiisan/kiji0034924/index.html' })
  ,makeNationalSpot({ id: 'religious-204', name: '大峯山寺', category: 'religious', region: '近畿', coordinate: { latitude: 34.1730, longitude: 135.9070, elevationMeter: 1719 }, era: 'nara', eraLabel: '修験道の山上道場・国指定重要文化財', religiousType: '寺院・修験道・山岳霊場', summary: '山上ヶ岳の頂上付近に建つ、修験道の中心道場です。', description: '大峯山寺は役行者が開いたと伝わる山上ヶ岳の宗教拠点で、現在の本堂は1691年に再建されました。大峯奥駈道と洞川の宿坊文化を含め、山岳修行と地域の暮らしが結びつく姿を紹介します。', sourceName: '奈良県公式サイト（大峯山寺）', sourceUrl: 'https://www.pref.nara.lg.jp/ikasu-nara/bunkashigen/main00267.html' })
  ,makeNationalSpot({ id: 'religious-205', name: '西國寺', category: 'religious', region: '中国', coordinate: { latitude: 34.4140, longitude: 133.1950, elevationMeter: 55 }, era: 'nara', eraLabel: '天平年間創建伝承・真言宗醍醐派大本山', religiousType: '寺院・真言宗・尾道三山', summary: '尾道三山の愛宕山に伽藍を広げる、瀬戸内の古刹です。', description: '西國寺は行基創建の伝承を持つ真言宗醍醐派の大本山です。国重要文化財の金堂や108段の石段、尾道水道を望む山腹の伽藍から、港町尾道の信仰と中世寺院文化を紹介します。', sourceName: '西國寺 公式サイト（歴史・境内）', sourceUrl: 'https://www.saikokuji.jp/history/' })
  ,makeNationalSpot({ id: 'religious-206', name: '大窪寺', category: 'religious', region: '四国', coordinate: { latitude: 34.1660, longitude: 134.2450, elevationMeter: 450 }, era: 'nara', eraLabel: '養老元年（717年）開創伝承・四国霊場第88番', religiousType: '寺院・真言宗・四国遍路結願所', summary: '四国八十八ヶ所巡礼を結ぶ、第88番札所の山寺です。', description: '大窪寺は四国八十八ヶ所の結願の霊場で、行基が草庵を結び、弘法大師が修行したと伝わります。本堂・大師堂・お砂踏みから、遍路の終着点に集まる祈りを紹介します。', sourceName: '四国八十八ヶ所霊場会（大窪寺）', sourceUrl: 'https://88shikokuhenro.jp/88ookuboji/' })
  ,makeNationalSpot({ id: 'religious-207', name: '久高島 フボー御嶽', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.1680, longitude: 127.8950, elevationMeter: 20 }, era: 'ancient', eraLabel: '琉球の七大御嶽・久高島の祭祀聖地', religiousType: '御嶽・琉球の自然信仰・島嶼聖地', summary: '久高島に受け継がれる、琉球の重要な御嶽の一つです。', description: 'フボー御嶽は久高島に点在する聖地の一つで、島全体を神聖な土地とみなす琉球の自然観を伝えます。拝所は信仰の場であるため、立入や撮影など現地の案内を尊重して紹介します。', sourceName: '久高島公式サイト（島の見どころ）', sourceUrl: 'https://kudaka-island.com/spot', verificationNote: '御嶽は現在も信仰の場です。立入禁止区域や祭祀中の場所には入らず、現地案内に従ってください。' })
  ,makeNationalSpot({ id: 'religious-208', name: '八坂神社', category: 'religious', region: '近畿', coordinate: { latitude: 35.0036, longitude: 135.7785, elevationMeter: 50 }, era: 'asuka', eraLabel: '斉明天皇2年（656年）創祀伝承・祇園祭の総本社', religiousType: '神社・祇園信仰・都市祭礼', summary: '祇園祭と疫病除けの信仰を受け継ぐ、京都の総鎮守です。', description: '八坂神社は平安京以前にさかのぼる創祀伝承を持ち、祇園祭と疫病除けの信仰を通じて京都の町を見守ってきました。神仏習合から近代の神仏分離まで、都市祭礼と宗教文化の変化を紹介します。', sourceName: '八坂神社 公式サイト（歴史）', sourceUrl: 'https://www.yasaka-jinja.or.jp/about/history/' })
  ,makeNationalSpot({ id: 'religious-209', name: '出羽三山神社（三神合祭殿）', category: 'religious', region: '東北', coordinate: { latitude: 38.7060, longitude: 139.9790, elevationMeter: 414 }, era: 'asuka', eraLabel: '推古天皇元年（593年）開山伝承・出羽三山信仰', religiousType: '神社・山岳信仰・羽黒修験', summary: '羽黒山・月山・湯殿山の信仰を一つの社殿に祀る山岳霊場です。', description: '出羽三山神社は蜂子皇子の開山伝承を持ち、羽黒山・月山・湯殿山をめぐる生まれかわりの旅の拠点です。三神合祭殿と羽黒山伏の峰入りから、神道と修験道が重なる東北の霊場を紹介します。', sourceName: '出羽三山神社 公式サイト（御由緒）', sourceUrl: 'https://www.dewasanzan.jp/publics/index/6/' })
  ,makeNationalSpot({ id: 'religious-210', name: '金剛三昧院', category: 'religious', region: '近畿', coordinate: { latitude: 34.2100, longitude: 135.5840, elevationMeter: 820 }, era: 'kamakura', eraLabel: '建暦元年（1211年）創建・高野山の国宝多宝塔', religiousType: '寺院・高野山・鎌倉仏教文化', summary: '北条政子が創建し、国宝の多宝塔を伝える高野山の塔頭です。', description: '金剛三昧院は1211年に北条政子が源頼朝の菩提を弔うため創建したと伝わる高野山の寺院です。国宝の多宝塔と宿坊文化から、弘法大師信仰と武家社会の結びつきを紹介します。', sourceName: '金剛三昧院 公式サイト（魅力）', sourceUrl: 'https://www.kongosanmaiin.or.jp/attractive' })
  ,makeNationalSpot({ id: 'religious-211', name: '久高島 ハビャーン（カベール岬）', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 26.1940, longitude: 127.9070, elevationMeter: 12 }, era: 'ancient', eraLabel: '琉球開闢神話の聖地・国指定天然記念物', religiousType: '聖地・琉球開闢神話・自然信仰', summary: 'アマミキヨが降臨したと伝わる、久高島北端の聖地です。', description: 'ハビャーン（カベール岬）は、琉球開闢の祖アマミキヨが降臨・上陸した聖地と伝えられます。海岸と植物群を含む景観から、島の自然と神話が一体となった信仰を紹介します。', sourceName: '久高島公式サイト（島の見どころ）', sourceUrl: 'https://kudaka-island.com/spot', verificationNote: '聖地の静けさを守り、祭祀や立入制限の案内に従ってください。' })
  ,makeNationalSpot({ id: 'castle-156', name: '玖島城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.9000, longitude: 129.9580, elevationMeter: 8 }, era: 'edo', eraLabel: '慶長4年（1599年）完成・大村藩の居城', castleType: '市指定史跡・平城・海城', summary: '大村藩の政治の中心となった、海辺の近世城郭跡です。', description: '玖島城は大村喜前が1599年に完成させ、明治の廃藩置県まで大村藩の政治の中心でした。海側の堀や石垣、城下の藩校・港の遺構から、海城と藩政の関係を紹介します。', sourceName: '大村市公式サイト（玖島城跡）', sourceUrl: 'https://www.city.omura.nagasaki.jp/kankou/kanko/spot/rekishi/shiroato/kushimajoato.html' })
  ,makeNationalSpot({ id: 'castle-157', name: '西尾城跡', category: 'castle', region: '中部', coordinate: { latitude: 34.8640, longitude: 137.0600, elevationMeter: 12 }, era: 'edo', eraLabel: '承久年間築城伝承・西尾藩の居城', castleType: '市指定史跡・平城・城下町', summary: '吉良氏から近世西尾藩へ続く、三河の城下町の核です。', description: '西尾城は承久年間に足利氏が築いたと伝わり、戦国期から江戸期まで多くの領主の居城となりました。本丸・東の丸の遺構と歴史公園から、三河の城下町の変化を紹介します。', sourceName: '西尾市公式サイト（西尾城跡）', sourceUrl: 'https://www.city.nishio.aichi.jp/sportskanko/bunkazai/1001485/1001610/1001685/1002901.html' })
  ,makeNationalSpot({ id: 'castle-158', name: '福江城跡（石田城）', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.6970, longitude: 128.8440, elevationMeter: 5 }, era: 'edo', eraLabel: '文久3年（1863年）完成・日本最後の海城', castleType: '続日本100名城・海城・幕末城郭', summary: '黒船来航への備えとして築かれた、日本最後の海城です。', description: '福江城（石田城）は五島家が幕末の海上防衛に備えて築き、1863年に完成しました。三方を海に囲む城域、砲台、石垣と五島氏庭園から、幕末の国境防衛と近代への転換を紹介します。', sourceName: '長崎県観光連盟公式サイト（福江城・石田城）', sourceUrl: 'https://www.nagasaki-tabinet.com/guide/348' })
  ,makeNationalSpot({ id: 'castle-159', name: '玉城城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 26.1550, longitude: 127.7950, elevationMeter: 180 }, era: 'muromachi', eraLabel: '琉球開闢神話・国指定史跡', castleType: '国指定史跡・グスク・祭祀拠点', summary: '天つぎの御嶽を抱え、東御廻りと結びつく琉球のグスクです。', description: '玉城城跡は高台の天然の要塞に築かれ、円形の城門と久高島を望む眺望を持ちます。主郭内の御嶽や東御廻りの拝所から、城郭と琉球の祭祀が重なる景観を紹介します。', sourceName: '南城市観光ポータル（玉城城跡）', sourceUrl: 'https://www.kankou-nanjo.okinawa/bunka/205/' })
  ,makeNationalSpot({ id: 'religious-212', name: '石手寺', category: 'religious', region: '四国', coordinate: { latitude: 33.8500, longitude: 132.7980, elevationMeter: 45 }, era: 'nara', eraLabel: '神亀5年（728年）創建伝承・四国霊場第51番', religiousType: '寺院・真言宗豊山派・四国遍路', summary: '国宝の二王門と衛門三郎伝説を伝える、道後の遍路拠点です。', description: '石手寺は四国八十八ヶ所第51番札所で、神亀5年（728年）創建の伝承を持ちます。国宝の二王門や重要文化財の本堂・三重塔、道後温泉と結びついた遍路宿の歴史から、巡礼が町を育てた姿を紹介します。', sourceName: '松山市公式サイト（石手寺本堂）', sourceUrl: 'https://www.city.matsuyama.ehime.jp/kanko/kankoguide/rekishibunka/bunkazai/kuni/isiteji_hondou.html' })
  ,makeNationalSpot({ id: 'religious-213', name: '岩屋寺', category: 'religious', region: '四国', coordinate: { latitude: 33.6550, longitude: 132.9050, elevationMeter: 670 }, era: 'nara', eraLabel: '四国霊場第45番・山全体を本尊とする山岳霊場', religiousType: '寺院・真言宗・山岳霊場', summary: '巨岩と岩窟に抱かれた、四国遍路を代表する山岳霊場です。', description: '岩屋寺は四国八十八ヶ所第45番札所で、巨岩や岩窟を生かした境内が特徴です。国の名勝に指定された寺域と重要文化財の大師堂から、自然そのものを修行の場とする信仰を紹介します。', sourceName: '岩屋寺 公式サイト', sourceUrl: 'https://shikoku88-iwayaji.com/' })
  ,makeNationalSpot({ id: 'religious-214', name: '最御崎寺', category: 'religious', region: '四国', coordinate: { latitude: 33.2480, longitude: 134.1770, elevationMeter: 165 }, era: 'heian', eraLabel: '大同2年（807年）開創伝承・四国霊場第24番', religiousType: '寺院・真言宗豊山派・室戸岬霊場', summary: '空海修行の地と伝わる室戸岬に立つ、土佐最初の霊場です。', description: '最御崎寺は室戸岬の突端にある四国霊場第24番札所で、空海が虚空蔵求聞持法を修行したと伝わる御厨人窟と結びつきます。太平洋と岬の地形から、海と山岳修行の信仰を紹介します。', sourceName: '四国八十八ヶ所霊場会（最御崎寺）', sourceUrl: 'https://88shikokuhenro.jp/24hotsumisakiji/' })
  ,makeNationalSpot({ id: 'religious-215', name: '金剛福寺', category: 'religious', region: '四国', coordinate: { latitude: 32.7250, longitude: 133.0120, elevationMeter: 70 }, era: 'heian', eraLabel: '弘仁13年（822年）開創伝承・四国霊場第38番', religiousType: '寺院・真言宗豊山派・足摺岬霊場', summary: '足摺岬に広大な境内を持つ、四国遍路の修行道場です。', description: '金剛福寺は四国最南端の足摺岬にある第38番札所で、弘法大師が観音の理想郷・補陀落を感得した場所に開かれたと伝わります。海の彼方への祈りと長距離の遍路道を通じ、土佐の修行文化を紹介します。', sourceName: '四国八十八ヶ所霊場会（金剛福寺）', sourceUrl: 'https://88shikokuhenro.jp/38kongofukuji/' })
  ,makeNationalSpot({ id: 'religious-216', name: '月山神社本宮', category: 'religious', region: '東北', coordinate: { latitude: 38.5480, longitude: 140.0330, elevationMeter: 1984 }, era: 'ancient', eraLabel: '月山山頂の出羽三山奥宮・山岳信仰', religiousType: '神社・出羽三山・山岳信仰', summary: '月山の山頂に鎮座する、出羽三山信仰の奥宮です。', description: '月山神社本宮は標高1984メートルの月山山頂にあり、羽黒山・湯殿山とともに出羽三山を構成します。開山期や登拝の条件があるため、季節と安全情報を確認して訪れる山岳霊場として紹介します。', sourceName: '山形県公式観光サイト（月山神社）', sourceUrl: 'https://yamagatakanko.com/attractions/detail_9189.html', verificationNote: '開山期間・お祓い・登山道の状況を公式案内で確認してください。高山のため天候が急変します。' })
  ,makeNationalSpot({ id: 'religious-217', name: '湯殿山神社本宮', category: 'religious', region: '東北', coordinate: { latitude: 38.5470, longitude: 139.9790, elevationMeter: 1100 }, era: 'ancient', eraLabel: '出羽三山の奥の院・修験道の霊地', religiousType: '神社・出羽三山・修験道', summary: '社殿を持たず、霊巌を御神体とする出羽三山の奥宮です。', description: '湯殿山神社本宮は、湯殿山の峡谷にある出羽三山の奥の院で、熱湯の湧く霊巌を御神体とします。江戸時代には伊勢参りと並ぶ「奥参り」として信仰を集めた、自然と修験道が一体の聖地です。', sourceName: '山形県公式観光サイト（湯殿山神社）', sourceUrl: 'https://yamagatakanko.com/attractions/detail_1339.html', verificationNote: '本宮は写真撮影禁止・土足厳禁などの決まりがあります。開山期間と現地の参拝案内に従ってください。' })
  ,makeNationalSpot({ id: 'religious-218', name: '松前神社', category: 'religious', region: '北海道', coordinate: { latitude: 41.4290, longitude: 140.1110, elevationMeter: 8 }, era: 'meiji', eraLabel: '明治14年（1881年）創立・松前藩の祖を祀る', religiousType: '神社・人物祭祀・松前藩', summary: '松前藩の祖・武田信廣を祀り、旧福山城と結びつく神社です。', description: '松前神社は、蝦夷地開拓の基礎を築いた武田信廣を祀るため、旧福山城北の丸跡に明治14年に建立されました。城跡と人物祭祀、松前神楽から、北海道の藩政と近代の記憶を紹介します。', sourceName: '北海道神社庁（松前神社）', sourceUrl: 'https://hokkaidojinjacho.jp/%E6%9D%BE%E5%89%8D%E7%A5%9E%E7%A4%BE/' })
  ,makeNationalSpot({ id: 'castle-160', name: '湯築城跡', category: 'castle', region: '四国', coordinate: { latitude: 33.8510, longitude: 132.7870, elevationMeter: 35 }, era: 'muromachi', eraLabel: '建武年間築城・伊予国守護河野氏の居城', castleType: '国指定史跡・日本100名城・平山城', summary: '道後の丘に堀と土塁を残す、中世伊予の守護所です。', description: '湯築城は河野氏が道後に築いた中世の平山城で、内堀・外堀と家臣の居住空間を備えていました。発掘された武家屋敷や輸入陶磁器から、守護大名の政治拠点と道後の町の歴史を紹介します。', sourceName: '松山市公式サイト（湯築城跡）', sourceUrl: 'https://www.city.matsuyama.ehime.jp/kanko/kankoguide/rekishibunka/bunkazai/kuni/yudukijou_ato.html' })
  ,makeNationalSpot({ id: 'castle-161', name: '松前藩戸切地陣屋跡', category: 'castle', region: '北海道', coordinate: { latitude: 41.8310, longitude: 140.6370, elevationMeter: 70 }, era: 'edo', eraLabel: '安政2年（1855年）築造・日本初の西洋式星形城郭', castleType: '国指定史跡・洋式城郭・幕末陣屋', summary: '蝦夷地防衛のために築かれた、星形の幕末城郭です。', description: '松前藩戸切地陣屋は1855年、箱館開港に伴う防衛強化のために築かれた日本で最初の西洋式星形城郭です。土塁と星形の縄張りから、幕末の国境防衛と西洋式築城の導入を紹介します。', sourceName: '北斗市公式サイト（松前藩戸切地陣屋跡）', sourceUrl: 'https://www.city.hokuto.hokkaido.jp/institution/shisetsu/hekirichijinya/' })
  ,makeNationalSpot({ id: 'religious-219', name: '大和神社', category: 'religious', region: '近畿', coordinate: { latitude: 34.5720, longitude: 135.8270, elevationMeter: 90 }, era: 'ancient', eraLabel: '大和国の国家鎮護・二十二社の名神大社', religiousType: '神社・国家祭祀・大和国の古社', summary: '大国魂大神を祀り、古代の国家祭祀と遣唐使の祈りを伝える神社です。', description: '大和神社は大国魂大神を祀り、宮中から移された国家鎮護の神として崇敬されてきました。延喜式の名神大社や二十二社に列し、遣唐使の交通安全祈願とも結びつく古代の宗教拠点を紹介します。', sourceName: '奈良県観光公式サイト（大和神社）', sourceUrl: 'https://yamatoji.nara-kankou.or.jp/01shaji/01jinja/03east_area/oyamatojinja/' })
  ,makeNationalSpot({ id: 'religious-220', name: '丹生川上神社（中社）', category: 'religious', region: '近畿', coordinate: { latitude: 34.4030, longitude: 135.9940, elevationMeter: 350 }, era: 'asuka', eraLabel: '天武天皇4年（675年）創祀伝承・雨乞いの神', religiousType: '神社・水神信仰・祈雨祭祀', summary: '吉野川上流で水と雨を祈る、古代からの水神の社です。', description: '丹生川上神社は水の神を祀り、古代から朝廷の祈雨奉幣を受けてきた神社です。黒馬・白馬を奉る雨乞いの習慣が絵馬の起源の一つとされることから、水と農耕、祈りの歴史を紹介します。', sourceName: '丹生川上神社 公式サイト（歴史）', sourceUrl: 'https://niukawakami-jinja.jp/about/' })
  ,makeNationalSpot({ id: 'religious-221', name: '若狭彦神社・若狭姫神社', category: 'religious', region: '中部', coordinate: { latitude: 35.4700, longitude: 135.7850, elevationMeter: 80 }, era: 'nara', eraLabel: '霊亀元年（715年）・若狭国一宮', religiousType: '神社・若狭国一宮・海上安全信仰', summary: '山幸彦と豊玉姫を祀り、若狭の海と水の信仰を伝える一宮です。', description: '若狭彦神社と若狭姫神社は若狭国一宮として、海上安全や豊漁、安産などの信仰を集めてきました。遠敷川の鵜の瀬に神が降臨したという由緒と上社・下社の構成から、若狭の海と水の文化を紹介します。', sourceName: '若狭彦神社 公式サイト（由緒）', sourceUrl: 'https://wakasahiko-jinja.jp/aboutus/' })
  ,makeNationalSpot({ id: 'religious-222', name: '青島神社', category: 'religious', region: '九州・沖縄', coordinate: { latitude: 31.8020, longitude: 131.4680, elevationMeter: 5 }, era: 'ancient', eraLabel: '青島の海上聖地・山幸彦と豊玉姫の信仰', religiousType: '神社・島嶼信仰・海の神話', summary: '奇岩に囲まれた島に鎮座し、日向神話と海の信仰を伝える神社です。', description: '青島神社は青島全体を神聖な場所とする信仰と、山幸彦・豊玉姫の神話に結びつく神社です。鬼の洗濯板と海岸の景観から、日向の海上交通や縁結びの信仰を紹介します。', sourceName: '宮崎県公式観光サイト（神話のふるさと）', sourceUrl: 'https://www.kanko-miyazaki.jp/shinwanofurusato/route_09' })
  ,makeNationalSpot({ id: 'religious-223', name: '恩山寺', category: 'religious', region: '四国', coordinate: { latitude: 34.0160, longitude: 134.5950, elevationMeter: 80 }, era: 'nara', eraLabel: '天平年間創建伝承・四国霊場第18番', religiousType: '寺院・高野山真言宗・四国遍路', summary: '小松島の山中にあり、母を思う弘法大師の伝承を伝える遍路札所です。', description: '恩山寺は四国八十八ヶ所第18番札所で、行基開基の伝承と、弘法大師が母のために女人禁制を解いたという物語を伝えます。遍路道と山寺の境内から、家族への祈りと四国遍路の文化を紹介します。', sourceName: '四国八十八ヶ所霊場会（恩山寺）', sourceUrl: 'https://88shikokuhenro.jp/18onzanji/' })
  ,makeNationalSpot({ id: 'religious-224', name: '平等寺', category: 'religious', region: '四国', coordinate: { latitude: 33.8380, longitude: 134.5840, elevationMeter: 65 }, era: 'heian', eraLabel: '弘仁年間創建伝承・四国霊場第22番', religiousType: '寺院・高野山真言宗・四国遍路', summary: '白水の霊水と薬師信仰に結びつく、阿波南部の遍路札所です。', description: '平等寺は四国八十八ヶ所第22番札所で、弘法大師が薬師如来を刻み、白水の霊水が湧いたという由緒を伝えます。水の信仰と病苦からの救いを願う遍路文化を紹介します。', sourceName: '四国八十八ヶ所霊場会（平等寺）', sourceUrl: 'https://88shikokuhenro.jp/22byodoji/' })
  ,makeNationalSpot({ id: 'religious-225', name: '薬王寺', category: 'religious', region: '四国', coordinate: { latitude: 33.7330, longitude: 134.5310, elevationMeter: 25 }, era: 'nara', eraLabel: '神亀3年（726年）創建伝承・四国霊場第23番', religiousType: '寺院・高野山真言宗・厄除け信仰', summary: '日和佐の町を見下ろし、厄除けの寺として知られる遍路札所です。', description: '薬王寺は四国八十八ヶ所第23番札所で、神亀3年（726年）に行基が開いたと伝わります。瑜祇塔や本堂へ続く石段、厄坂の参拝から、海辺の町と厄除け信仰が結びつく姿を紹介します。', sourceName: '四国八十八ヶ所霊場会（薬王寺）', sourceUrl: 'https://88shikokuhenro.jp/23yakuoji/' })
  ,makeNationalSpot({ id: 'religious-226', name: '神峯寺', category: 'religious', region: '四国', coordinate: { latitude: 33.4660, longitude: 134.0520, elevationMeter: 450 }, era: 'nara', eraLabel: '天平2年（730年）創建伝承・四国霊場第27番', religiousType: '寺院・真言宗豊山派・山岳霊場', summary: '急坂を登った神峯山にあり、土佐の海を望む山岳札所です。', description: '神峯寺は四国八十八ヶ所第27番札所で、神功皇后の伝承や行基・弘法大師の開創伝承を持つ神峯山の霊場です。山道と境内から、海を望む土佐の山岳信仰と遍路の難所を紹介します。', sourceName: '四国八十八ヶ所霊場会（神峯寺）', sourceUrl: 'https://88shikokuhenro.jp/27kounomineji/' })
  ,makeNationalSpot({ id: 'religious-227', name: '岩本寺', category: 'religious', region: '四国', coordinate: { latitude: 33.2090, longitude: 133.1370, elevationMeter: 300 }, era: 'nara', eraLabel: '天平年間創建伝承・四国霊場第37番', religiousType: '寺院・真言宗智山派・四国遍路', summary: '五つの本尊と天井画で知られる、土佐西部の遍路札所です。', description: '岩本寺は四国八十八ヶ所第37番札所で、五つの本尊を祀る独特の信仰を伝えます。大師堂の格天井に描かれた多彩な絵から、地域の人々が守ってきた遍路文化と現代の祈りを紹介します。', sourceName: '四国八十八ヶ所霊場会（岩本寺）', sourceUrl: 'https://88shikokuhenro.jp/37iwamotoji/' })
  ,makeNationalSpot({ id: 'religious-230', name: '安房神社', category: 'religious', region: '関東', coordinate: { latitude: 34.9720, longitude: 139.8290, elevationMeter: 35 }, era: 'ancient', eraLabel: '安房国一宮・延喜式名神大社', religiousType: '神社・安房国一宮・忌部氏の祭祀', summary: '房総南端で技術と産業の神を祀る、安房国一宮です。', description: '安房神社は安房国一宮として知られ、忌部氏の祖神を祀る古社です。房総半島の開拓や祭祀、ものづくりと結びつく由緒から、海を越えて移動した人々と地域文化の形成を紹介します。', sourceName: '安房神社 公式サイト', sourceUrl: 'https://www.awajinjya.org/' })
  ,makeNationalSpot({ id: 'religious-231', name: '氣多大社', category: 'religious', region: '中部', coordinate: { latitude: 36.9270, longitude: 136.7760, elevationMeter: 15 }, era: 'nara', eraLabel: '能登国一宮・万葉集に記される古社', religiousType: '神社・能登国一宮・原生林信仰', summary: '能登半島の海辺に鎮座し、古代から能登の信仰を集める一宮です。', description: '氣多大社は氣太神・能登大神などの名で古い文献に登場する能登国一宮です。社叢「入らずの森」を含む境内から、能登の海上交通と自然を神域とする信仰を紹介します。', sourceName: '氣多大社 公式サイト（由緒）', sourceUrl: 'https://keta.jp/history/' })
  ,makeNationalSpot({ id: 'religious-232', name: '丹生都比売神社', category: 'religious', region: '近畿', coordinate: { latitude: 34.2700, longitude: 135.4850, elevationMeter: 450 }, era: 'ancient', eraLabel: '1700年以上の歴史・高野山の鎮守・世界遺産', religiousType: '神社・神仏習合・紀伊山地の霊場', summary: '高野山と結びつく、神と仏が共存する世界遺産の古社です。', description: '丹生都比売神社は天野盆地に鎮座する古社で、弘法大師空海に高野山の地を示した高野御子大神の伝承を伝えます。高野山町石道や金剛峯寺と結ばれた宗教景観から、日本の神仏習合を紹介します。', sourceName: '丹生都比売神社 公式サイト（ご由緒）', sourceUrl: 'https://niutsuhime.or.jp/about/goyuisho/' })
  ,makeNationalSpot({ id: 'castle-162', name: '新宮城跡（丹鶴城跡）', category: 'castle', region: '近畿', coordinate: { latitude: 33.7250, longitude: 135.9890, elevationMeter: 60 }, era: 'edo', eraLabel: '元和年間築城・熊野川と海を望む紀州の城', castleType: '国指定史跡・続日本100名城・平山城', summary: '熊野川と太平洋を望み、港湾と城下町を支えた紀州の城跡です。', description: '新宮城は熊野川を見下ろす高台に築かれ、浅野家・水野家の居城として城下町と水運を支えました。水ノ手郭と港湾遺跡から、熊野の信仰圏と紀伊半島の交易を紹介します。', sourceName: '和歌山県公式サイト（新宮城跡）', sourceUrl: 'https://www.pref.wakayama.lg.jp/prefg/081300/d00214634.html' })
  ,makeNationalSpot({ id: 'castle-163', name: '浜田城跡', category: 'castle', region: '中国', coordinate: { latitude: 34.9000, longitude: 132.0790, elevationMeter: 65 }, era: 'edo', eraLabel: '元和9年（1623年）完成・浜田藩の居城', castleType: '県指定史跡・平山城・続日本100名城', summary: '日本海を望む山上に築かれ、約250年間浜田藩政を担った城跡です。', description: '浜田城は元和年間に古田氏が築き、浜田藩の政治の中心として約248年間使われました。本丸の三重櫓や港に近い城下町の位置から、日本海側の藩政と海運を紹介します。', sourceName: '浜田市公式サイト（浜田城跡）', sourceUrl: 'https://www.city.hamada.shimane.jp/www/contents/1392950863464/' })
  ,makeNationalSpot({ id: 'castle-164', name: '岩国城', category: 'castle', region: '中国', coordinate: { latitude: 34.1700, longitude: 132.1780, elevationMeter: 200 }, era: 'edo', eraLabel: '慶長13年（1608年）完成・吉川氏の山城', castleType: '日本100名城・山城・城下町', summary: '錦川を天然の外堀とする、岩国藩吉川氏の山上の城です。', description: '岩国城は関ヶ原後に岩国へ移った吉川広家が横山に築いた山城です。山上の城と麓の御土居、錦川と城下町の配置から、山城と河川防衛が一体となった近世の地域拠点を紹介します。', sourceName: '岩国市観光公式サイト（岩国城）', sourceUrl: 'https://kankou.iwakuni-city.net/iwakunijyo.html' })
  ,makeNationalSpot({ id: 'castle-165', name: '大多喜城跡', category: 'castle', region: '関東', coordinate: { latitude: 35.2850, longitude: 140.2350, elevationMeter: 70 }, era: 'sengoku', eraLabel: '本多忠勝の居城・房総の城下町', castleType: '県指定史跡・続日本100名城・平山城', summary: '本多忠勝が入封し、房総の城下町を形成した大多喜の城跡です。', description: '大多喜城は戦国から近世にかけて房総の政治拠点となり、徳川四天王の本多忠勝が入封した城として知られます。本丸跡と城下町の地形から、里見氏・徳川家臣団の地域支配を紹介します。', sourceName: '大多喜町公式サイト（大多喜城）', sourceUrl: 'https://www.town.otaki.chiba.jp/soshiki/shouko_kanko/1/1/1/5/index.html' })
  ,makeNationalSpot({ id: 'castle-166', name: '清洲城', category: 'castle', region: '中部', coordinate: { latitude: 35.2160, longitude: 136.8450, elevationMeter: 10 }, era: 'sengoku', eraLabel: '織田信長入城・清須会議の舞台', castleType: '城跡・戦国城下町・再建天守', summary: '織田信長の天下取りの出発点となり、清須会議の舞台となった城です。', description: '清洲城は尾張の政治・経済の中心として発展し、織田信長が入城した後、天下統一への足場となりました。清須会議や「清須越」による城下町の移転から、戦国城郭と都市の変化を紹介します。', sourceName: '清須市公式サイト（清洲城）', sourceUrl: 'https://www.city.kiyosu.aichi.jp/shisetsu_annai/kanko_shisetsu_sonota/kiyosujo.html' })
  ,makeNationalSpot({ id: 'castle-167', name: '郡山城（大和）', category: 'castle', region: '近畿', coordinate: { latitude: 34.6480, longitude: 135.7830, elevationMeter: 70 }, era: 'sengoku', eraLabel: '豊臣秀長の居城・大和の近世城郭', castleType: '国指定史跡・平山城・城下町', summary: '豊臣秀長が大和支配の拠点とした、石垣と堀が残る城跡です。', description: '郡山城は大和の政治拠点として整備され、豊臣秀長の入城後に大規模な城郭と城下町が築かれました。石垣に転用された石仏や寺院石材から、戦国末期の築城と地域社会の関係を紹介します。', sourceName: '大和郡山市公式サイト（史跡郡山城跡）', sourceUrl: 'https://www.city.yamatokoriyama.lg.jp/soshiki/machidukuri_senryaku/rekishi_bunkazai/bunkazai/11888.html' })
  ,makeNationalSpot({ id: 'castle-168', name: '一乗谷朝倉氏遺跡（城下町）', category: 'castle', region: '中部', coordinate: { latitude: 35.9950, longitude: 136.2980, elevationMeter: 120 }, era: 'sengoku', eraLabel: '朝倉氏五代103年の城下町・特別史跡', castleType: '特別史跡・日本100名城・山城と城下町遺跡', summary: '戦国大名朝倉氏の城下町全体が残る、福井の特別史跡です。', description: '一乗谷朝倉氏遺跡は朝倉氏が越前支配の拠点として築いた大規模な城下町跡です。館跡、武家屋敷、寺院跡、山上の一乗谷城が谷全体に残り、戦国期の都市と宗教を一体で学べます。', sourceName: '福井県立一乗谷朝倉氏遺跡博物館 公式サイト', sourceUrl: 'https://asakura-museum.pref.fukui.lg.jp/site/index' })
  ,makeNationalSpot({ id: 'religious-233', name: '江島神社', category: 'religious', region: '関東', coordinate: { latitude: 35.2990, longitude: 139.4810, elevationMeter: 45 }, era: 'asuka', eraLabel: '欽明天皇13年（552年）創建伝承・日本三大弁財天', religiousType: '神社・弁財天信仰・海上守護', summary: '宗像三女神と弁財天の信仰が重なる、江の島の霊場です。', description: '江島神社は辺津宮・中津宮・奥津宮の三社からなり、海運・漁業・交通の守護神として信仰されてきました。神仏習合による江島弁財天の信仰も伝え、日本三大弁財天の一つとして島全体の参詣文化を紹介します。', sourceName: '江島神社 公式サイト（ご祭神）', sourceUrl: 'https://enoshimajinja.or.jp/gosaijin/' })
  ,makeNationalSpot({ id: 'religious-234', name: '松尾大社', category: 'religious', region: '近畿', coordinate: { latitude: 35.0000, longitude: 135.6850, elevationMeter: 35 }, era: 'asuka', eraLabel: '大宝元年（701年）社殿建立伝承・酒造の神', religiousType: '神社・磐座祭祀・酒造信仰', summary: '松尾山の磐座祭祀を起源とし、酒造の守護神として崇敬される古社です。', description: '松尾大社は松尾山の山霊を祀る磐座祭祀を背景に、秦氏による社殿造営と平安京の皇城鎮護へ発展しました。中世以降は「日本第一酒造神」として信仰され、農業・醸造・都市の歴史をつなぎます。', sourceName: '松尾大社 公式サイト（歴史・由緒）', sourceUrl: 'https://www.matsunoo.or.jp/about01/' })
  ,makeNationalSpot({ id: 'religious-235', name: '瑞鳳殿', category: 'religious', region: '東北', coordinate: { latitude: 38.2520, longitude: 140.8630, elevationMeter: 45 }, era: 'edo', eraLabel: '寛永14年（1637年）造営・伊達政宗公霊屋', religiousType: '霊廟・伊達家墓所・桃山文化', summary: '仙台藩祖伊達政宗を祀る、桃山文化の豪華な霊廟です。', description: '瑞鳳殿は仙台藩祖伊達政宗の霊屋として造営され、豪華な装飾を持つ桃山文化の建築を伝えます。戦災による焼失と再建、伊達家墓所の発掘調査から、近世大名の記憶と慰霊の場を紹介します。', sourceName: '瑞鳳殿 公式サイト（ご案内）', sourceUrl: 'https://www.zuihoden.com/about/' })
  ,makeNationalSpot({ id: 'castle-169', name: '滝山城跡', category: 'castle', region: '関東', coordinate: { latitude: 35.6970, longitude: 139.3220, elevationMeter: 160 }, era: 'sengoku', eraLabel: '北条氏照の居城・国指定史跡', castleType: '国指定史跡・続日本100名城・平山城', summary: '土塁・空堀・馬出が良好に残る、北条氏照の関東の拠点です。', description: '滝山城は加住北丘陵に築かれ、北条氏照が拡張した関東屈指の平山城です。多摩川に面した地形と複雑な曲輪・堀の配置から、中世城郭の防御と北条氏の地域支配を紹介します。', sourceName: '八王子市公式サイト（滝山城跡）', sourceUrl: 'https://www.city.hachioji.tokyo.jp/kankobunka/003/003/001/001/p005254.html' })
  ,makeNationalSpot({ id: 'castle-170', name: '苗木城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.5020, longitude: 137.4420, elevationMeter: 432 }, era: 'sengoku', eraLabel: '遠山氏の山城・国指定史跡', castleType: '国指定史跡・山城・巨岩の石垣', summary: '巨岩を取り込んだ石垣と懸造りが特徴の、木曽川沿いの山城です。', description: '苗木城跡は高森山の頂部に築かれ、巨岩を取り込んだ石垣と懸造りの建物が特徴です。遠山氏の居城として戦国・近世を生きた山城の全域が残り、自然地形と築城技術の関係を紹介します。', sourceName: '中津川市公式サイト（苗木城跡）', sourceUrl: 'https://www.city.nakatsugawa.lg.jp/soshikikarasagasu/kankoka/5/2/749.html' })
  ,makeNationalSpot({ id: 'castle-171', name: '知覧城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 31.3670, longitude: 130.4390, elevationMeter: 120 }, era: 'muromachi', eraLabel: '佐多氏の居城・国指定史跡', castleType: '国指定史跡・山城・シラス台地の城', summary: 'シラス台地の崖を生かした、南九州を代表する山城です。', description: '知覧城はシラス台地の地形を最大限に利用して築かれた山城で、麓の武家屋敷群とも結びつきます。本丸や蔵之城などの曲輪群から、南九州の中世領主と城下の景観を紹介します。', sourceName: '南九州市公式サイト（知覧城跡）', sourceUrl: 'https://www.city.minamikyushu.lg.jp/soshikikarasagasu/rekishibunkazaika/bunkazai/4/2/397.html' })
  ,makeNationalSpot({ id: 'religious-239', name: '竹生島神社', category: 'religious', region: '近畿', coordinate: { latitude: 35.4070, longitude: 136.1740, elevationMeter: 197 }, era: 'ancient', eraLabel: '琵琶湖の湖上聖地・日本三大弁財天', religiousType: '神社・湖沼信仰・弁財天信仰', summary: '琵琶湖に浮かぶ竹生島で、水の神と弁財天を祀る湖上の霊場です。', description: '竹生島神社は琵琶湖の水面に浮かぶ島を信仰の対象とし、都久夫須麻神社として古くから湖上安全や水の恵みを祈ってきました。宝厳寺と一体になった神仏習合の景観と、日本三大弁財天の信仰を紹介します。', sourceName: '竹生島神社 公式サイト', sourceUrl: 'https://www.chikubusima.or.jp/housankai.html' })
  ,makeNationalSpot({ id: 'religious-240', name: '高尾山薬王院', category: 'religious', region: '関東', coordinate: { latitude: 35.6250, longitude: 139.2430, elevationMeter: 500 }, era: 'muromachi', eraLabel: '永和年間（1375年頃）中興・高尾山の修験霊場', religiousType: '寺院・真言宗智山派・修験道', summary: '高尾山の自然と飯縄大権現の信仰が重なる、関東の山岳霊場です。', description: '高尾山薬王院は高尾山の山中に伽藍を展開し、真言密教と修験の伝統を受け継いできました。山の神仏や天狗の信仰、参道を歩く修行の文化から、都市近郊に残る山岳霊場を紹介します。', sourceName: '高尾山薬王院 公式サイト（薬王院について）', sourceUrl: 'https://www.takaosan.or.jp/sp/about/' })
  ,makeNationalSpot({ id: 'religious-241', name: '建部大社', category: 'religious', region: '近畿', coordinate: { latitude: 34.9390, longitude: 135.9040, elevationMeter: 95 }, era: 'asuka', eraLabel: '天武天皇4年（676年）遷座伝承・近江国一宮', religiousType: '神社・近江国一宮・日本武尊信仰', summary: '日本武尊を祀り、近江国一宮として崇敬されてきた古社です。', description: '建部大社は日本武尊を祀る延喜式内社で、天武天皇4年に近江国府の置かれた現在地へ遷されたと伝わります。東海道や瀬田川の交通と結びつく近江の一宮の歴史を紹介します。', sourceName: '建部大社 公式サイト（由緒）', sourceUrl: 'https://takebetaisha.jp/about/' })
  ,makeNationalSpot({ id: 'castle-173', name: '沼田城跡', category: 'castle', region: '関東', coordinate: { latitude: 36.6470, longitude: 139.0450, elevationMeter: 420 }, era: 'sengoku', eraLabel: '天文元年（1532年）築城・真田氏の城', castleType: '市指定史跡・平山城・真田氏ゆかりの城', summary: '真田氏が五層の天守を築き、上州と信州を結ぶ要衝となった城跡です。', description: '沼田城は三浦氏の築城を起源とし、真田昌幸・信幸父子の時代に規模を広げた城です。利根川と片品川を望む河岸段丘の立地から、上州の交通と真田氏の領国支配を紹介します。', sourceName: '沼田市公式サイト（沼田城跡）', sourceUrl: 'https://www.city.numata.gunma.jp/kyouiku/bunkazai/ichiran/shi/1000876.html' })
  ,makeNationalSpot({ id: 'castle-174', name: '新府城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.7190, longitude: 138.4070, elevationMeter: 530 }, era: 'sengoku', eraLabel: '天正9年（1581年）築城・武田勝頼最後の居城', castleType: '国指定史跡・続日本100名城・平山城', summary: '武田勝頼が築き、武田氏最後の本拠となった戦国末期の城跡です。', description: '新府城は武田勝頼が甲府から本拠を移すため七里岩の台地に築いた城で、武田氏滅亡直前の政治と軍事を伝えます。丸馬出や三日月堀などの遺構から、武田流築城の到達点を紹介します。', sourceName: '韮崎市公式サイト（史跡新府城跡）', sourceUrl: 'https://www.city.nirasaki.lg.jp/soshikiichiran/kyoikuka/bunkazaitanto/sinnpu/1497.html' })
  ,makeNationalSpot({ id: 'castle-175', name: '高崎城址', category: 'castle', region: '関東', coordinate: { latitude: 36.3220, longitude: 139.0030, elevationMeter: 90 }, era: 'edo', eraLabel: '慶長3年（1598年）築城・井伊直政の城下町', castleType: '市指定史跡・平城・藩政拠点', summary: '井伊直政が築き、寺院や町を移して整えた高崎藩の城跡です。', description: '高崎城は井伊直政が和田城跡を取り込んで築き、城下町には箕輪から寺院や町が移されました。現在残る三の丸の堀と土居から、近世の城下町形成と都市の記憶を紹介します。', sourceName: '高崎市公式サイト（高崎城址）', sourceUrl: 'https://www.city.takasaki.gunma.jp/site/cultural-assets/3512.html' })
  ,makeNationalSpot({ id: 'religious-242', name: '伊豆山神社', category: 'religious', region: '中部', coordinate: { latitude: 35.1070, longitude: 139.0790, elevationMeter: 170 }, era: 'heian', eraLabel: '伊豆山権現・源頼朝と北条政子ゆかりの霊場', religiousType: '神社・神仏習合・関八州総鎮護', summary: '伊豆山権現として信仰され、源頼朝と北条政子の祈願の場となった古社です。', description: '伊豆山神社は古く伊豆山権現・走湯権現として神仏習合の信仰を集め、源頼朝と北条政子が源氏再興を祈願した場所としても知られます。海と山を結ぶ修行の道から、東国の武家と霊場の関係を紹介します。', sourceName: '伊豆山神社 公式サイト（由緒とご祭神）', sourceUrl: 'https://izusanjinjya.jp/free/about' })
  ,makeNationalSpot({ id: 'religious-243', name: '那智山青岸渡寺', category: 'religious', region: '近畿', coordinate: { latitude: 33.6680, longitude: 135.8910, elevationMeter: 330 }, era: 'asuka', eraLabel: '西国三十三所第一番札所・熊野修験の寺院', religiousType: '寺院・天台宗・観音霊場・神仏習合', summary: '那智の滝と熊野那智大社に隣接する、西国巡礼の第一番札所です。', description: '那智山青岸渡寺は那智大滝で修行した裸形上人の伝承を起源とし、西国三十三所観音霊場の第一番札所となりました。熊野修験、観音信仰、那智の滝の自然信仰が重なる世界遺産の霊場を紹介します。', sourceName: '那智山青岸渡寺 公式サイト（御由緒）', sourceUrl: 'https://seigantoji.or.jp/' })
  ,makeNationalSpot({ id: 'castle-176', name: '弘前城跡', category: 'castle', region: '東北', coordinate: { latitude: 40.6070, longitude: 140.4640, elevationMeter: 45 }, era: 'edo', eraLabel: '慶長16年（1611年）完成・津軽氏の居城', castleType: '国指定史跡・日本100名城・現存天守', summary: '津軽氏が築き、重要文化財の櫓や門が残る北国の城郭です。', description: '弘前城は津軽氏が津軽統一後に築き、弘前藩の政治と城下町の中心となりました。現存する天守・櫓・門と桜の名所としての弘前公園から、北東北の藩政都市の歴史を紹介します。', sourceName: '弘前市観光情報サイト（史跡弘前城）', sourceUrl: 'https://hirosaki-kanko.or.jp/details.html?id=CNT00403281549012844' })
  ,makeNationalSpot({ id: 'castle-177', name: '新発田城（跡）', category: 'castle', region: '中部', coordinate: { latitude: 37.9500, longitude: 139.3260, elevationMeter: 10 }, era: 'edo', eraLabel: '慶長3年（1598年）築城開始・日本100名城', castleType: '日本100名城・平城・三階櫓と表門', summary: '三階櫓と表門が復元され、越後の城下町を伝える新発田藩の城です。', description: '新発田城は溝口氏の入封後に築城が進められ、堀と土居を備えた越後の平城として整えられました。三階櫓の三匹の鯱や戊辰戦争、城郭破却と復元の歴史から、城が地域の記憶として残る過程を紹介します。', sourceName: '新発田市公式サイト（新発田城）', sourceUrl: 'https://www.city.shibata.lg.jp/shisetsu/kanko/kanko/1005061.html' })
  ,makeNationalSpot({ id: 'castle-178', name: '延岡城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.5820, longitude: 131.6650, elevationMeter: 55 }, era: 'edo', eraLabel: '慶長8年（1603年）築城・日向の近世城郭', castleType: '市指定史跡・平山城・千人殺しの石垣', summary: '五ヶ瀬川と城山を生かして築かれた、宮崎県を代表する近世城郭です。', description: '延岡城は高橋元種が慶長8年（1603年）に築き、本丸・二の丸・三の丸からなる日向の政治拠点となりました。城山の石垣と河川、城下町の配置から、北部宮崎の藩政都市の歴史を紹介します。', sourceName: '延岡市公式サイト（延岡城跡・城山公園）', sourceUrl: 'https://www.city.nobeoka.miyazaki.jp/site/miryoku/1288.html' })
  ,makeNationalSpot({ id: 'religious-244', name: '鎌倉宮', category: 'religious', region: '関東', coordinate: { latitude: 35.3260, longitude: 139.5600, elevationMeter: 35 }, era: 'meiji', eraLabel: '明治2年（1869年）創建・護良親王を祀る', religiousType: '神社・南朝ゆかり・鎌倉の歴史拠点', summary: '護良親王を祀り、中世鎌倉と明治の国家祭祀をつなぐ神社です。', description: '鎌倉宮は後醍醐天皇の皇子・護良親王を祀る神社で、明治天皇が親王ゆかりの地に創建しました。鎌倉幕府滅亡前後の記憶と、近代に新たな祭祀拠点がつくられた過程を紹介します。', sourceName: '公益社団法人神奈川県観光協会（鎌倉宮）', sourceUrl: 'https://www.kanagawa-kankou.or.jp/spot/617' })
  ,makeNationalSpot({ id: 'religious-245', name: '長滝白山神社・長瀧寺', category: 'religious', region: '中部', coordinate: { latitude: 35.8840, longitude: 136.8750, elevationMeter: 430 }, era: 'nara', eraLabel: '養老年間（717年頃）創建伝承・美濃禅定道の拠点', religiousType: '神社・寺院・白山信仰・神仏習合', summary: '白山登拝の美濃側の拠点として栄えた、神社と寺院が重なる霊場です。', description: '長滝白山神社・長瀧寺は泰澄大師の創建伝承を持ち、白山信仰の美濃側の中心地として発展しました。長滝の延年や重要文化財を通じ、神仏習合・山岳修行・地域の祭礼が重なる景観を紹介します。', sourceName: '岐阜県観光公式サイト（長滝白山神社・長瀧寺）', sourceUrl: 'https://www.kankou-gifu.jp/spot/detail_3489.html' })
  ,makeNationalSpot({ id: 'castle-179', name: '岐阜城跡', category: 'castle', region: '中部', coordinate: { latitude: 35.4330, longitude: 136.7810, elevationMeter: 329 }, era: 'sengoku', eraLabel: '永禄10年（1567年）織田信長入城・天下統一の拠点', castleType: '国指定史跡・日本100名城・山城', summary: '斎藤道三と織田信長の居城として知られる、金華山上の山城です。', description: '岐阜城跡は金華山に築かれ、斎藤氏の居城を織田信長が攻略して天下統一の拠点としました。山上の城郭遺構と長良川沿いの城下町を合わせ、戦国大名の政治と景観を紹介します。', sourceName: '岐阜市公式サイト（国史跡 岐阜城跡）', sourceUrl: 'https://www.city.gifu.lg.jp/kankoubunka/bunkazai/1005557/1005558.html' })
  ,makeNationalSpot({ id: 'castle-180', name: '本佐倉城跡', category: 'castle', region: '関東', coordinate: { latitude: 35.7390, longitude: 140.2550, elevationMeter: 35 }, era: 'muromachi', eraLabel: '15世紀後半以降・千葉氏の本拠', castleType: '国指定史跡・続日本100名城・中世城郭', summary: '千葉氏が戦国期の本拠とした、土塁と曲輪が残る城跡です。', description: '本佐倉城跡は15世紀後半以降に千葉氏が本拠とした戦国時代の城です。豊臣秀吉の小田原攻めで千葉氏が滅びるまでの地域支配と、佐倉市・酒々井町が協力して守る史跡の現在を紹介します。', sourceName: '佐倉市公式サイト（本佐倉城跡）', sourceUrl: 'https://www.city.sakura.lg.jp/soshiki/bunkaka/bunkazai/kunishiseki/motosakurazyouato/5542.html' })
  ,makeNationalSpot({ id: 'castle-181', name: '高鍋城跡', category: 'castle', region: '九州・沖縄', coordinate: { latitude: 32.1260, longitude: 131.5050, elevationMeter: 70 }, era: 'edo', eraLabel: '秋月氏の居城・高鍋藩の城下町', castleType: '城跡・平山城・高鍋藩政の拠点', summary: '秋月氏が治めた高鍋藩の政治拠点として、城下町の記憶を伝える城跡です。', description: '高鍋城跡は江戸時代に秋月氏が領有した高鍋藩の城地で、17世紀後半には城地名も高鍋へ定着しました。城跡と城下町の歴史から、日向の小藩が地域の中心として発展した過程を紹介します。', sourceName: '高鍋町公式サイト（高鍋の歴史と文化）', sourceUrl: 'https://www.town.takanabe.lg.jp/soshiki/chiikiseisaku/7/3/341.html' })
];

export const SPOT_DATA = [
  ...NATIONAL_CULTURAL_SPOTS,
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
    id: 'hist-11', name: '四天王寺', category: 'religious', region: '近畿', religiousType: '寺院・和宗総本山',
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
    id: 'hist-12', name: '生國魂神社（いくくにたま）', category: 'religious', region: '近畿', religiousType: '神社・上町台地の総鎮守',
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
    id: 'hist-13', name: '高津宮（こうづぐう）', category: 'religious', region: '近畿', religiousType: '神社・高津宮伝承地',
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
    id: 'hist-14', name: '大阪天満宮', category: 'religious', region: '近畿', religiousType: '神社・天満の天神さん',
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
    id: 'hist-15', name: '住吉大社', category: 'religious', region: '近畿', religiousType: '神社・住吉神社の総本社',
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
    id: 'hist-16', name: '三光神社（真田の抜け穴伝承地）', category: 'religious', region: '近畿', religiousType: '神社・真田丸伝承地',
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
    id: 'hist-17', name: '安居神社（真田幸村戦死跡伝承地）', category: 'religious', region: '近畿', religiousType: '神社・大坂の陣伝承地',
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
    id: 'hist-18', name: '一心寺', category: 'religious', region: '近畿', religiousType: '寺院・お骨佛で知られる寺',
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
    id: 'religious-1', name: '大阪城豊國神社', category: 'religious', region: '近畿', religiousType: '神社・豊臣秀吉公を祀る',
    coordinate: { latitude: 34.6842401, longitude: 135.526886, elevationMeter: 18 }, era: 'meiji', eraLabel: '明治期創立・昭和36年に大阪城内へ奉遷',
    verificationStatus: 'partially_verified',
    verification: { content: 'verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '豊臣秀吉公ゆかりの神社で、大阪城本丸の南側に鎮座します。',
    description: '豊國神社は、明治期に創立された大阪の豊國神社が、昭和36年（1961年）に大阪城内へ奉遷されたものです。秀吉公・秀頼公・秀長卿を御祭神として案内する、城内の宗教拠点です。',
    mediaAssets: [], historicalMaterials: [],
    source: '大阪城豊國神社 公式サイト', license: '公式由緒参照・座標は境内周辺の概略位置',
    sources: [
      { sourceName: '大阪城豊國神社 公式サイト（御由緒）', sourceUrl: 'https://www.osaka-hokokujinja.org/yuisyo/', claimStatus: 'verified' },
      { sourceName: '大阪府神社庁（豊國神社）', sourceUrl: 'https://www.osaka-jinjacho.jp/funai_jinja/dai7shibu/chuo-ku/07003hokokujinja.html', claimStatus: 'verified' }
    ],
    verificationNote: '大阪城内の境内周辺を示す概略位置です。参拝時間・行事・車両規制は公式サイトで確認してください。'
  },
  {
    id: 'religious-2', name: '坐摩神社', category: 'religious', region: '近畿', religiousType: '神社・摂津国一之宮',
    coordinate: { latitude: 34.6809544, longitude: 135.498738, elevationMeter: 4 }, era: 'ancient', eraLabel: '古代以来の由緒・天正11年（1583年）に現地へ遷座',
    verificationStatus: 'partially_verified',
    verification: { content: 'verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '土地や居所を守る神を祀る、船場の鎮守です。',
    description: '坐摩神社は、坐摩大神を祀る神社で、公式由緒では神武天皇の即位時に宮中へ奉斎されたことを起源としています。天正11年（1583年）に豊臣秀吉の大坂城築城に伴って現在地へ遷座したと伝えられ、摂津国一之宮としても案内されています。',
    mediaAssets: [], historicalMaterials: [],
    source: '坐摩神社 公式サイト', license: '公式由緒参照・座標は國學院大學資料等を基にした概略位置',
    sources: [
      { sourceName: '坐摩神社 公式サイト（神社のご由緒）', sourceUrl: 'https://www.ikasuri.or.jp/yuisho.html', claimStatus: 'verified' },
      { sourceName: '國學院大學デジタル・ミュージアム（坐摩神社）', sourceUrl: 'https://jmapps.ne.jp/kokugakuin/det.html?data_id=53479&data_idx=0&referer_id=53090', claimStatus: 'verified' }
    ],
    verificationNote: '社殿周辺の概略位置です。平日・土日祝で開門時間が異なるため、参拝前に公式サイトで確認してください。'
  },
  {
    id: 'religious-3', name: '難波神社', category: 'religious', region: '近畿', religiousType: '神社・仁徳天皇を祀る',
    coordinate: { latitude: 34.6787459, longitude: 135.5001184, elevationMeter: 5 }, era: 'ancient', eraLabel: '仁徳天皇ゆかり・天正年間に現在地へ遷座',
    verificationStatus: 'partially_verified',
    verification: { content: 'verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '船場の中心で信仰を集めてきた、仁徳天皇を御祭神とする神社です。',
    description: '難波神社は、公式サイトが仁徳天皇を御祭神とし、反正天皇の時代に創建されたと伝えています。その後、上本町を経て、豊臣秀吉の大坂城築城後の天正年間に現在地へ遷座したと案内されています。',
    mediaAssets: [], historicalMaterials: [],
    source: '難波神社 公式サイト', license: '公式由緒参照・座標は所在地周辺の概略位置',
    sources: [
      { sourceName: '難波神社 公式サイト', sourceUrl: 'https://www.nanba-jinja.or.jp/', claimStatus: 'verified' },
      { sourceName: '難波神社 地図・アクセス', sourceUrl: 'https://www.nanba-jinja.or.jp/map.html', claimStatus: 'verified' }
    ],
    verificationNote: '社殿周辺の概略位置です。祭礼・駐車場・参拝時間は公式サイトで確認してください。'
  },
  {
    id: 'religious-4', name: '大念佛寺', category: 'religious', region: '近畿', religiousType: '寺院・融通念佛宗総本山',
    coordinate: { latitude: 34.627079, longitude: 135.551392, elevationMeter: 7 }, era: 'heian', eraLabel: '大治2年（1127年）建立・融通念佛宗総本山',
    verificationStatus: 'partially_verified',
    verification: { content: 'verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '平安末期から続く融通念佛宗の総本山で、平野郷の信仰の核です。',
    description: '大念佛寺は、大阪市平野区にある融通念佛宗の総本山です。大阪市の案内では大治2年（1127年）に聖応大師良忍上人が建立したとされ、万部おねりなどの行事や大規模な木造本堂が地域の信仰と文化を伝えています。',
    mediaAssets: [], historicalMaterials: [],
    source: '融通念佛宗総本山 大念佛寺 公式サイト', license: '公式・大阪市案内参照・座標は歴史地名資料の概略位置',
    sources: [
      { sourceName: '融通念佛宗総本山 大念佛寺 公式サイト', sourceUrl: 'https://www.dainenbutsuji.com/', claimStatus: 'verified' },
      { sourceName: '大阪市平野区（大念佛寺）', sourceUrl: 'https://www.city.osaka.lg.jp/hirano/page/0000210310.html', claimStatus: 'verified' }
    ],
    verificationNote: '境内周辺の概略位置です。拝観時間・行事・境内利用は公式サイトで確認してください。'
  },
  {
    id: 'religious-5', name: '杭全神社', category: 'religious', region: '近畿', religiousType: '神社・平野郷の氏神',
    coordinate: { latitude: 34.627903, longitude: 135.554916, elevationMeter: 7 }, era: 'heian', eraLabel: '平安時代初期創建と伝わる古社',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '平野郷の氏神として、祭礼と連歌の文化を受け継ぐ神社です。',
    description: '杭全神社は、平野郷の氏神として信仰されてきた神社です。大阪ミュージアムの案内では平安時代初期の創建と伝えられ、公式サイトは全国唯一の連歌所やだんじり祭で知られることを紹介しています。',
    mediaAssets: [], historicalMaterials: [],
    source: '杭全神社 公式サイト・大阪ミュージアム', license: '公式・自治体関連案内参照・座標は歴史地名資料の概略位置',
    sources: [
      { sourceName: '杭全神社 公式サイト', sourceUrl: 'https://kumata.jp/page/3', claimStatus: 'verified' },
      { sourceName: '大阪ミュージアム（杭全神社）', sourceUrl: 'https://www.osaka-museum.com/spot/search/?act=detail&id=93', claimStatus: 'verified' }
    ],
    verificationNote: '社殿周辺の概略位置です。車両の進入・駐車や祭礼時の案内は公式サイトで確認してください。'
  },
  {
    id: 'religious-6', name: '全興寺', category: 'religious', region: '近畿', religiousType: '寺院・高野山真言宗',
    coordinate: { latitude: 34.623285, longitude: 135.555388, elevationMeter: 6 }, era: 'asuka', eraLabel: '創建不詳・薬師如来を祀る寺伝',
    verificationStatus: 'partially_verified',
    verification: { content: 'partially_verified', coordinate: 'approximate', media: 'not_applicable', license: 'verified', source: 'verified' },
    summary: '平野の町の起源と結びつく寺伝と、古い仏像群を伝える寺院です。',
    description: '全興寺は、寺伝で聖徳太子が薬師如来を安置したことを草創とし、平野の町の形成と結びつけて語られてきた寺院です。大阪市の案内では創建は不詳とされ、大阪市指定の仏像群など、確認済みの文化財情報と寺伝を分けて紹介します。',
    mediaAssets: [], historicalMaterials: [],
    source: '全興寺 公式サイト・大阪市文化財案内', license: '公式・大阪市案内参照・座標は所在地周辺の概略位置',
    sources: [
      { sourceName: '全興寺 公式サイト', sourceUrl: 'https://senkoji.net/', claimStatus: 'verified' },
      { sourceName: '大阪市（全興寺）', sourceUrl: 'https://www.city.osaka.lg.jp/kensetsu/page/0000009212.html', claimStatus: 'verified' },
      { sourceName: '大阪市（全興寺仏像群）', sourceUrl: 'https://www.city.osaka.lg.jp/kyoiku/cmsfiles/contents/0000669/669324/15.pdf', claimStatus: 'verified' }
    ],
    verificationNote: '寺院周辺の概略位置です。寺伝と文化財の説明を分けて表示しています。参拝・見学時間は公式サイトで確認してください。'
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

// 現況写真を対応するスポットへ結び付ける。
// 史料（mediaAssets）とは別枠の presentPhoto として持ち、
// 「昔の絵」と「今の写真」を取り違えないようにする。
SPOT_DATA.forEach(spot => {
  const photo = PRESENT_PHOTOS[spot.id];
  if (photo) spot.presentPhoto = photo;
});

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
