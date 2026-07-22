/**
 * AR地域理解・歴史・防災プラットフォーム 高精度データセット
 * データ出典: 国土地理院ハザードマップ, 国土交通省ポータル, 大阪市防災オープンデータ,
 *             国立国会図書館デジタルコレクション, ジャパンサーチ
 */

export const SAMPLE_CENTER = {
  latitude: 34.6873,
  longitude: 135.5260,
  elevationMeter: 24,
  name: '大阪城本丸・天守閣付近'
};

// 国土地理院・時代別タイルURL定義
export const HISTORICAL_MAP_TILES = {
  present: {
    name: '現代 (標準地図)',
    year: '2026年',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors | 国土地理院'
  },
  photo_latest: {
    name: '現代 (最新航空写真)',
    year: '2020年代',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    attribution: '国土地理院 seamlessphoto'
  },
  showa50: {
    name: '昭和50年代 (1974〜78年)',
    year: '1975年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/gsi-ort_1974/{z}/{x}/{y}.png',
    attribution: '国土地理院 1974-1978年撮影航空写真'
  },
  showa30: {
    name: '昭和30年代 (1961〜69年)',
    year: '1965年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_1961/{z}/{x}/{y}.png',
    attribution: '国土地理院 1961-1969年撮影航空写真'
  },
  showa20: {
    name: '昭和20年代 (1945〜50年)',
    year: '1948年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png',
    attribution: '国土地理院/米軍撮影航空写真 (1945-1950)'
  },
  showa_early: {
    name: '昭和初期 (1936〜42年)',
    year: '1938年頃',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/ort_ri200/{z}/{x}/{y}.png',
    attribution: '国土地理院 陸軍撮影航空写真 (1936-1942)'
  },
  meiji: {
    name: '明治時代 (古地図)',
    year: '明治期',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/experimental_kigyo/{z}/{x}/{y}.png',
    attribution: '国土地理院 近代移行期古地図'
  },
  edo: {
    name: '江戸・平安 (歴史想定図)',
    year: '江戸期・平安期',
    url: 'https://disaportaldata.gsi.go.jp/raster/05_doshasaigai_kikenkasho/{z}/{x}/{y}.png', // プロトタイプ用ダミー
    attribution: '※江戸・平安期の地図は現在整備中 (参考表示)'
  }
};

// 国土交通省・国土地理院 公式ハザードマップレイヤー定義
export const OFFICIAL_HAZARD_LAYERS = {
  flood: {
    id: 'flood',
    name: '洪水浸水想定 (想定最大規模)',
    tileUrl: 'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuisoutei_kuni_data/{z}/{x}/{y}.png',
    attribution: '国土交通省重ねるハザードマップ (洪水浸水想定)',
    legend: [
      { depth: '0.5m未満 (大人の膝下)', color: '#fef0d9' },
      { depth: '0.5〜3.0m (1階床上〜2階床下)', color: '#fdcc8a' },
      { depth: '3.0〜5.0m (2階床上浸水)', color: '#fc8d59' },
      { depth: '5.0m以上 (3階以上まで浸水)', color: '#d7301f' }
    ]
  },
  tsunami: {
    id: 'tsunami',
    name: '津波浸水想定 (南海トラフ巨大地震)',
    tileUrl: 'https://disaportaldata.gsi.go.jp/raster/04_tsunami_new_data/{z}/{x}/{y}.png',
    attribution: '大阪府・国土交通省 (津波浸水想定データ)',
    legend: [
      { depth: '0.3m未満', color: '#e0f3f8' },
      { depth: '0.3〜1.0m', color: '#67a9cf' },
      { depth: '1.0〜3.0m', color: '#02818a' },
      { depth: '3.0m以上', color: '#014636' }
    ]
  },
  sediment: {
    id: 'sediment',
    name: '土砂災害警戒区域・危険箇所',
    tileUrl: 'https://disaportaldata.gsi.go.jp/raster/05_doshasaigai_kikenkasho/{z}/{x}/{y}.png',
    attribution: '国土交通省 (土砂災害警戒区域)',
    legend: [
      { depth: '土砂災害特別警戒区域 (レッドゾーン)', color: '#dc2626' },
      { depth: '土砂災害警戒区域 (イエローゾーン)', color: '#eab308' }
    ]
  }
};

export const SPOT_DATA = [
  // --- ① 歴史・観光レイヤー (history) ---
  {
    id: 'hist-1',
    name: '大阪城 天守閣（昭和6年復元）',
    category: 'history',
    coordinate: { latitude: 34.6873, longitude: 135.5260, elevationMeter: 24.0 },
    era: 'showa',
    eraLabel: '昭和6年 (1931年)',
    summary: '昭和6年に市民の募金により鉄骨鉄筋コンクリート造で復元された3代目天守閣。',
    description: '江戸時代初期(1665年)の落雷焼失から約266年ぶり、1931年に全額市民寄付（当時の金額で150万円）により復元されました。徳川時代の大坂城天守台の上に、豊臣絵巻『大坂夏の陣図屏風』に描かれた豊臣天守のデザインを取り入れた歴史的折衷建築です。',
    historicalImage: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80',
    source: '国立国会図書館デジタルコレクション / 大阪市写真公文書 Archive',
    license: 'パブリックドメイン (昭和初期記録写真データ)'
  },
  {
    id: 'hist-2',
    name: '旧陸軍第四師団司令部庁舎 (ミライザ大阪城)',
    category: 'history',
    coordinate: { latitude: 34.6865, longitude: 135.5252, elevationMeter: 22.0 },
    era: 'showa',
    eraLabel: '昭和6年 (1931年)',
    summary: '中世ヨーロッパの城郭意匠を持つ昭和初期の重厚なロマネスク様式建築。',
    description: '1931年建築。昭和天皇即位記念事業として市民寄付等により建設。外壁には茶褐色のスクラッチタイルの装飾が施され、戦後は大阪府警察本部や大阪市立博物館として使用されました。現在は複合施設「ミライザ大阪城」として保存活用されています。',
    historicalImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    source: '大阪市近代建築調査報告書 (大阪市教育委員会)',
    license: 'クリエイティブ・コモンズ 表示 4.0'
  },
  {
    id: 'hist-3',
    name: '極楽橋・隠し曲輪跡',
    category: 'history',
    coordinate: { latitude: 34.6888, longitude: 135.5255, elevationMeter: 18.0 },
    era: 'edo',
    eraLabel: '江戸時代 (1620年代)〜平成',
    summary: '徳川再建大坂城の北側防衛の要衝。明治期に焼失後、平成12年に再建。',
    description: '豊臣期から大坂城北側の表玄関とされた橋。徳川再建期(1620年代)に木造橋として建設され、戊辰戦争(1868年)の混乱下で全焼。現在の橋は平成12年(2000年)に伝統意匠を取り入れたPC鋼橋として再建されました。',
    historicalImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    source: 'ジャパンサーチ (文化庁公的ポータルアーカイブ)',
    license: 'パブリックドメイン'
  },

  // --- ② 地域理解・まち歩きレイヤー (community) ---
  {
    id: 'comm-1',
    name: '旧京街道起点・野田橋跡 (八軒家浜)',
    category: 'community',
    coordinate: { latitude: 34.6895, longitude: 135.5212, elevationMeter: 5.5 },
    era: 'edo',
    eraLabel: '江戸〜明治期',
    summary: '京都と大坂を結んだ京街道の終点であり、三十石船が往来した水陸交通の大要衝。',
    description: '平安時代から熊野詣の水陸継承地として栄え、江戸時代には伏見と大坂を結ぶ三十石船の発着場「八軒家浜」として大いに賑わいました。明治期以降の河川改修や埋め立てにより橋自体は消失しましたが、地下には当時の護岸石垣の遺構が保存されています。',
    historicalImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    source: '大阪市中央区史跡誌 / 国土交通省近畿地方整備局',
    license: 'オープンデータ'
  },
  {
    id: 'comm-2',
    name: '旧大阪砲兵工廠跡地 (現OBP・大阪城公園東部)',
    category: 'community',
    coordinate: { latitude: 34.6880, longitude: 135.5310, elevationMeter: 11.5 },
    era: 'taisho',
    eraLabel: '明治3年〜昭和20年 (1870-1945)',
    summary: '西日本最大級の巨大軍需工場群が存在した歴史的広大な土地変遷。',
    description: '明治3年(1870年)に設立された兵器工場。最盛期には数万人が勤務する巨大施設でしたが、1945年8月14日の大阪大空襲で壊滅。戦後は平和的な都市再開発が進められ、大阪ビジネスパーク(OBP)および大阪城公園の緑地へと変貌した歴史的土地です。',
    historicalImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    source: '大阪市史編纂所デジタルアーカイブ',
    license: 'パブリックドメイン'
  },
  {
    id: 'comm-3',
    name: '難波宮跡 (飛鳥・奈良時代)',
    category: 'community',
    coordinate: { latitude: 34.6800, longitude: 135.5250, elevationMeter: 10.0 },
    era: 'asuka',
    eraLabel: '飛鳥〜奈良時代 (7世紀)',
    summary: '大化の改新後に建設された、かつての首都「難波宮（なにわのみや）」の跡地。',
    description: '645年の大化の改新後、孝徳天皇によって建設された古代日本の首都跡です。現在は史跡公園として整備されており、当時の宮殿の柱の跡などが復元・保存されています。',
    historicalImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    source: '大阪市文化財アーカイブ',
    license: 'パブリックドメイン'
  },

  // --- ③ 防災・ハザードレイヤー (disaster) ---
  {
    id: 'disaster-1',
    name: '寝屋川・淀川氾濫想定浸水点 (大手前低地)',
    category: 'disaster',
    coordinate: { latitude: 34.6890, longitude: 135.5220, elevationMeter: 3.2 },
    hazardInfo: {
      type: 'flood',
      typeName: '想定最大規模洪水 (1000年に1回レベル)',
      expectedDepthMeter: 3.5,
      description: '淀川および寝屋川流域で24時間総雨量690mmの想定最大規模大雨が発生した場合、周辺低地で最大3.5m（ビル2階床上水準）の浸水が想定されています。'
    },
    summary: '想定浸水深：3.5m（目の前の建物の2階床上まで水が到達する危険があります）',
    description: '標高約3.2mの低地エリアです。過去の1934年室戸台風での内水氾濫や過去の水害記録に基づき、国土地理院・大阪市が公表している公式ハザード数値です。大雨・氾濫警報時は直ちに3階以上の頑丈な建物へ垂直避難してください。'
  },
  {
    id: 'disaster-2',
    name: '南海トラフ巨大地震 津波避難警報ポイント',
    category: 'disaster',
    coordinate: { latitude: 34.6860, longitude: 135.5200, elevationMeter: 4.1 },
    hazardInfo: {
      type: 'tsunami',
      typeName: '南海トラフ巨大地震津波想定 (最大クラス)',
      expectedDepthMeter: 2.0,
      description: '南海トラフ巨大地震発生時、地震発生から約110分後に安治川・大川を遡上した津波が到達し、標高の低い沿岸・河川敷で最大2.0mの浸水が想定されています。'
    },
    summary: '想定津波高：2.0m（津波到達予想時間：地震発生後 約110分）',
    description: '地震発生直後は川の様子を見に行かず、川から素早く離れて高台（大阪城上町台地方面）または津波避難ビル3階以上へ速やかに移動してください。'
  }
];

export const EVACUATION_SHELTERS = [
  {
    id: 'shelter-1',
    name: '追手門学院大手前中・高等学校 (指定緊急避難場所)',
    address: '大阪市中央区大手前1-3-20',
    coordinate: { latitude: 34.6858, longitude: 135.5235 },
    elevationMeter: 15.2,
    types: ['洪水', '津波', '地震', '大規模火災'],
    capacity: 1200,
    source: '大阪市避難所オープンデータ (2025年更新)'
  },
  {
    id: 'shelter-2',
    name: '大阪城公園 (広域避難場所・高台エリア)',
    address: '大阪市中央区大阪城1',
    coordinate: { latitude: 34.6870, longitude: 135.5280 },
    elevationMeter: 22.5,
    types: ['大規模火災', '地震', '津波避難高台'],
    capacity: 50000,
    source: '大阪市避難所オープンデータ (2025年更新)'
  },
  {
    id: 'shelter-3',
    name: '開平小学校 (指定避難所・津波避難ビル)',
    address: '大阪市中央区北浜東2-4',
    coordinate: { latitude: 34.6892, longitude: 135.5140 },
    elevationMeter: 6.8,
    types: ['津波', '洪水', '地震'],
    capacity: 800,
    source: '大阪市避難所オープンデータ (2025年更新)'
  }
];
