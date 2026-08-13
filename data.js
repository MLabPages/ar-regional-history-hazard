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
    thumbnailUrl: 'https://upload.wikimedia.org/wiki…71051 tokens truncated…いた出丸「真田丸」があったとされる一帯に位置します。境内には真田信繁の像と、大坂城へ通じていたと伝わる「真田の抜け穴」の穴口が残ります。大阪城の南に築かれた防衛線を、現地の高低差とともに体感できるスポットです。',
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

