/**
 * AR地域理解・歴史・防災アプリ サンプルデータセット
 * 大阪城〜大手前・中之島エリアを想定したプロトタイプデータ
 */

export const SAMPLE_CENTER = {
  latitude: 34.6873,
  longitude: 135.5260,
  name: '大阪城大手門付近'
};

export const SPOT_DATA = [
  // --- ① 歴史・観光レイヤー (history) ---
  {
    id: 'hist-1',
    name: '大阪城 天守閣（昭和復元）',
    category: 'history',
    coordinate: { latitude: 34.6873, longitude: 135.5260, elevationMeter: 24 },
    era: 'showa',
    eraLabel: '昭和 (1931年)',
    summary: '昭和6年に市民の寄付によって鉄骨鉄筋コンクリート造で復元された3代目天守閣。',
    description: '江戸時代の天守焼失から約260年ぶり、昭和6年(1931)に全額市民寄付により復元されました。徳川大坂城の天守台の上に豊臣時代のデザインを取り入れた折衷様式となっています。',
    historicalImage: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80',
    source: '国立国会図書館 / 大阪市デジタルアーカイブ',
    license: 'パブリックドメイン (昭和初期記録画像)'
  },
  {
    id: 'hist-2',
    name: '旧陸軍第四師団司令部庁舎（ミライザ大阪城）',
    category: 'history',
    coordinate: { latitude: 34.6865, longitude: 135.5252, elevationMeter: 22 },
    era: 'showa',
    eraLabel: '昭和 (1931年)',
    summary: '中世ヨーロッパの城郭風意匠を持つ昭和初期の重厚なロマネスク建築。',
    description: '1931年建築。昭和天皇即位記念事業として市民の寄付等で建設。戦後は大阪市立博物館としても親しまれました。',
    historicalImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    source: '大阪市文化財アーカイブ',
    license: 'CC BY 4.0'
  },
  {
    id: 'hist-3',
    name: '極楽橋・隠し曲輪',
    category: 'history',
    coordinate: { latitude: 34.6888, longitude: 135.5255, elevationMeter: 18 },
    era: 'edo',
    eraLabel: '江戸時代 (1620年代)',
    summary: '徳川再建期に架けられた北側の要衝。',
    description: '明治維新の戊辰戦争時に焼失し、現在の橋は平成12年(2000)に再建された木造風PC鋼橋です。',
    historicalImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    source: 'ジャパンサーチ（古写真資料）',
    license: 'パブリックドメイン'
  },

  // --- ② 地域理解・まち歩きレイヤー (community) ---
  {
    id: 'comm-1',
    name: '旧京街道の起点・野田橋跡',
    category: 'community',
    coordinate: { latitude: 34.6895, longitude: 135.5212, elevationMeter: 6 },
    era: 'edo',
    eraLabel: '江戸〜明治',
    summary: 'かつて京都と伏見・大阪を結んだ重要交通路「京街道」の玄関口。',
    description: '大坂城の北西に位置し、三十石船の船着き場や旅籠が賑わった街道の歴史的拠点です。現在は埋め立てられ近代的な道路となっていますが、地下には当時の護岸石垣が残ります。',
    historicalImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    source: '地域史誌・フィールドワーク資料',
    license: 'オープンデータ'
  },
  {
    id: 'comm-2',
    name: '旧砲兵工廠跡と戦後の産業遺構',
    category: 'community',
    coordinate: { latitude: 34.6880, longitude: 135.5310, elevationMeter: 12 },
    era: 'taisho',
    eraLabel: '明治〜大正・昭和',
    summary: '東洋一と呼ばれた巨大軍需工場跡地。現在は公園や緑地へ変貌。',
    description: '明治初期から大正・昭和にかけて広大な工場が広がっていました。戦後、緑地化と近代的なオフィス街（OBP）への再開発が進んだ土地変遷の歴史を持ちます。',
    historicalImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    source: '産業遺構デジタルアーカイブ',
    license: 'パブリックドメイン'
  },

  // --- ③ 防災・ハザードレイヤー (disaster) ---
  {
    id: 'disaster-1',
    name: '想定洪水浸水標識 (寝屋川・淀川氾濫時)',
    category: 'disaster',
    coordinate: { latitude: 34.6890, longitude: 135.5220, elevationMeter: 3 },
    hazardInfo: {
      type: 'flood',
      typeName: '洪水浸水想定',
      expectedDepthMeter: 3.5,
      description: '大雨による寝屋川流域溢水時、最大3.5m（2階床下〜床上）の浸水が想定されるエリアです。'
    },
    summary: '想定浸水深：3.5m （目の前の建物の2階高さまで水が来る可能性があります）',
    description: '過去の室戸台風(1934年)や高潮・内水氾濫の記憶を教訓とした想定値です。水害時には早期の高所避難が重要です。'
  },
  {
    id: 'disaster-2',
    name: '津波浸水想定・標高警報スポット',
    category: 'disaster',
    coordinate: { latitude: 34.6860, longitude: 135.5200, elevationMeter: 4 },
    hazardInfo: {
      type: 'tsunami',
      typeName: '南海トラフ津波想定',
      expectedDepthMeter: 2.0,
      description: '南海トラフ巨大地震発生時、安治川・大川を遡上する津波により約2.0mの浸水が懸念されます。'
    },
    summary: '想定津波高：2.0m （津波到達予測時間：約110分）',
    description: '地震発生後は河川から離れ、鉄筋コンクリート造の3階以上の頑丈な建物へ速やかに一時避難してください。'
  }
];

export const EVACUATION_SHELTERS = [
  {
    id: 'shelter-1',
    name: '追手門学院大手前中・高等学校（指定避難所）',
    address: '大阪市中央区大手前1-3-20',
    coordinate: { latitude: 34.6858, longitude: 135.5235 },
    elevationMeter: 15,
    types: ['洪水', '地震', '大規模火災'],
    capacity: 1200
  },
  {
    id: 'shelter-2',
    name: '大阪城公園（広域避難場所）',
    address: '大阪市中央区大阪城1',
    coordinate: { latitude: 34.6870, longitude: 135.5280 },
    elevationMeter: 20,
    types: ['大規模火災', '地震'],
    capacity: 50000
  },
  {
    id: 'shelter-3',
    name: '開平小学校（津波避難ビル・指定避難所）',
    address: '大阪市中央区北浜東2-4',
    coordinate: { latitude: 34.6892, longitude: 135.5140 },
    elevationMeter: 7,
    types: ['津波', '洪水', '地震'],
    capacity: 800
  }
];
