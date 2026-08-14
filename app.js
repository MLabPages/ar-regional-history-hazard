import {
  SAMPLE_CENTER,
  HISTORICAL_MAP_TILES,
  OFFICIAL_HAZARD_LAYERS,
  SPOT_DATA,
  EVACUATION_SHELTERS,
  MATERIAL_TYPE_LABELS,
  PLACEHOLDER_IMAGE_URL,
  TRUST_LABELS
} from './data.js?v=__BUILD_ID__';
import { OSM_BUILDINGS, OSM_BUILDINGS_META } from './buildings.js?v=__BUILD_ID__';

const CULTURAL_REGIONS = ['全国', '北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州・沖縄'];

class ARRegionalApp {
  constructor() {
    // モードステート: 'ar' | 'map'
    this.viewMode = 'map';
    this.currentLayer = 'history'; // history | community | religious | castle | disaster
    this.culturalRegionFilter = 'all';
    this.currentEra = 'present';   // 確認済みの現代・昭和期タイルのみ
    this.currentHazardType = 'flood'; // flood | tsunami | sediment

    this.userPos = { ...SAMPLE_CENTER };
    this.heading = 0; // 北 = 0度
    // 位置モード: 'explore'（地図から探索/自宅・PC） | 'onsite'（現地・GPS/センサー）
    this.locationMode = 'explore';
    this.headingSource = 'simulation'; // 'sensor' | 'simulation' | 'manual'
    this.orientationPermission = 'unknown'; // 'unknown' | 'granted' | 'denied' | 'not-required'
    this.orientationListenerAttached = false;
    this.geolocationWatchId = null;
    this.cameraActive = false;
    this.mediaStream = null;
    this.demoArActive = false;
    this.lastArHudUpdate = 0;
    this.arDiscoverySpotId = null;
    this.arDiscoveryDismissed = false;
    // 防災AR: 洪水の概念イメージ（水面）は明示的にONにした場合のみ描画
    this.showFloodConceptImage = false;

    // ARドラッグ操作ステート
    this.isDraggingCanvas = false;
    this.dragStartX = 0;
    this.startHeading = 0;

    // 古写真インタラクティブ操作ステート
    this.overlayState = {
      posX: 0,
      posY: 0,
      scale: 1.0,
      rotate: 0,
      opacity: 0.65,
      syncHeading: true,
      initialHeading: 0
    };
    this.isDraggingOverlay = false;
    this.overlayDragStart = { x: 0, y: 0 };

    this.spots = [...SPOT_DATA];
    this.shelters = [...EVACUATION_SHELTERS];
    this.selectedSpot = null;
    this.discoveredSpotIds = this.loadDiscoveredSpotIds();
    this.visitRecords = this.loadVisitRecords();
    this.discoveryToastTimer = null;

    // DOMエレメント
    this.canvas = document.getElementById('ar-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.video = document.getElementById('camera-feed');
    this.mapViewEl = document.getElementById('map-view');
    this.mapNavigationTools = document.getElementById('map-navigation-tools');
    this.mapSearchForm = document.getElementById('map-search-form');
    this.mapSearchInput = document.getElementById('map-search-input');
    this.mapSearchResults = document.getElementById('map-search-results');
    this.mapNavigationStatus = document.getElementById('map-navigation-status');
    this.mapSearchCancelButton = document.getElementById('btn-cancel-map-search');
    this.mapCurrentLocationButton = document.getElementById('btn-map-current-location');
    this.mapSearchController = null;
    this.recentMapSearchResults = [];
    this.cameraPlaceholder = document.getElementById('camera-placeholder');
    this.arHud = document.getElementById('ar-hud');
    this.arHeadingText = document.getElementById('ar-heading-text');
    this.arDirectionCue = document.getElementById('ar-direction-cue');
    this.arNearbyCount = document.getElementById('ar-nearby-count');
    this.arDiscoveryCard = document.getElementById('ar-discovery-card');
    this.arDiscoveryThumb = document.getElementById('ar-discovery-thumb');
    this.arDiscoveryMeta = document.getElementById('ar-discovery-meta');
    this.arDiscoveryTitle = document.getElementById('ar-discovery-title');
    this.arDiscoverySummary = document.getElementById('ar-discovery-summary');
    this.arDiscoveryRoute = this.arDiscoveryCard?.querySelector('.ar-discovery-route');
    this.locationText = document.getElementById('location-text');
    this.guideHintText = document.getElementById('guide-hint-text');
    this.guideHint = document.getElementById('drag-guide-hint');

    // UI追加パネル
    this.eraTimelineBar = document.getElementById('era-timeline-bar');
    this.reopenEraPanelButton = document.getElementById('btn-reopen-era-panel');
    this.reopenMapDataStatusButton = document.getElementById('btn-reopen-map-data-status');
    this.reopenMapGuideButton = document.getElementById('btn-reopen-map-guide');
    this.mapGuide = document.querySelector('.quick-status');
    this.attributionBar = document.getElementById('attribution-bar');
    this.attributionText = document.getElementById('attribution-text');
    this.reopenHazardSheetButton = document.getElementById('btn-reopen-hazard-sheet');
    this.openSpotsButton = document.getElementById('btn-open-spots');
    this.hazardLegendBox = document.getElementById('hazard-legend-box');
    this.mapDataStatus = document.getElementById('map-data-status');
    this.hazardSourceLink = document.getElementById('hazard-source-link');
    this.mapSpotsPanel = document.getElementById('map-spots-panel');
    this.mapCompareSlider = document.getElementById('map-opacity-slider');
    this.mapCompareValue = document.getElementById('map-opacity-val');
    this.timeTravelPanel = document.getElementById('time-travel-panel');
    this.timeTravelList = document.getElementById('time-travel-list');
    this.timeTravelLocation = document.getElementById('time-travel-location');
    this.mapFirstHint = document.getElementById('map-first-hint');
    this.mapSpotPreview = document.getElementById('map-spot-preview');
    this.discoveryProgress = document.getElementById('discovery-progress');
    this.discoveryProgressValue = document.getElementById('discovery-progress-value');
    this.discoveryPanel = document.getElementById('discovery-panel');
    this.discoveryList = document.getElementById('discovery-list');
    this.discoveryPanelSummary = document.getElementById('discovery-panel-summary');
    this.discoveryToast = document.getElementById('discovery-toast');
    this.walkPicksButton = document.getElementById('walk-picks-button');
    this.walkPicksPanel = document.getElementById('walk-picks-panel');
    this.walkPicksList = document.getElementById('walk-picks-list');
    this.walkPicksSummary = document.getElementById('walk-picks-summary');
    this.walkPicksProgress = document.getElementById('walk-picks-progress');
    this.visitLogProgress = document.getElementById('visit-log-progress');
    this.visitLogProgressLabel = document.getElementById('visit-log-progress-label');
    this.visitLogProgressValue = document.getElementById('visit-log-progress-value');
    this.visitLogPanel = document.getElementById('visit-log-panel');
    this.visitLogSummary = document.getElementById('visit-log-summary');
    this.visitLogStats = document.getElementById('visit-log-stats');
    this.visitNextStopContent = document.getElementById('visit-next-stop-content');
    this.visitLogList = document.getElementById('visit-log-list');
    this.modalVisitBox = document.getElementById('modal-visit-box');
    this.modalVisitStatus = document.getElementById('modal-visit-status');
    this.toggleVisitButton = document.getElementById('btn-toggle-visit');
    this.modalVisitForm = document.getElementById('modal-visit-form');
    this.modalVisitNote = document.getElementById('modal-visit-note');
    this.saveVisitNoteButton = document.getElementById('btn-save-visit-note');

    // 年代別航空写真オーバーレイ（AR）
    this.aerialOverlay = document.getElementById('aerial-overlay');
    this.aerialCanvas = document.getElementById('aerial-canvas');
    this.aerialEraRow = document.getElementById('aerial-era-row');
    this.aerialOpacitySlider = document.getElementById('aerial-opacity-slider');
    this.aerialStatus = document.getElementById('aerial-status');
    this.aerialEraKey = 'showa50';
    this.aerialOpacity = 0.7;

    // 簡易3Dビュー
    this.threeOverlay = document.getElementById('three-overlay');
    this.threeHolder = document.getElementById('three-canvas-holder');
    this.threeState = null;
    this.threeFocusSpot = null;

    try {
      if (window.localStorage?.getItem('ar-guide-dismissed') === '1') {
        this.guideHint?.classList.add('hidden');
      }
      if (window.localStorage?.getItem('map-first-hint-dismissed') === '1') {
        this.mapFirstHint?.classList.add('hidden');
      }
    } catch (_) {
      // Safariのプライベートブラウズ等で保存領域が使えなくても起動を継続する
    }

    // モード切替ボタン
    this.btnModeAr = document.getElementById('btn-mode-ar');
    this.btnModeMap = document.getElementById('btn-mode-map');

    // カメラON/OFFボタン
    this.toggleCameraBtn = document.getElementById('btn-toggle-camera');
    this.cameraIconOn = document.getElementById('camera-icon-on');
    this.cameraIconOff = document.getElementById('camera-icon-off');
    this.cameraBtnText = document.getElementById('camera-btn-text');

    // UIモーダル・バナー
    this.disasterBanner = document.getElementById('disaster-alert-banner');
    this.hazardDepthText = document.getElementById('hazard-depth-text');
    this.shelterGuideText = document.getElementById('shelter-guide-text');

    // 古写真オーバーレイDOM
    this.historicalOverlay = document.getElementById('historical-overlay');
    this.overlayImgWrapper = document.getElementById('overlay-image-wrapper');
    this.overlayImg = document.getElementById('historical-overlay-img');
    this.opacitySlider = document.getElementById('opacity-slider');
    this.scaleSlider = document.getElementById('scale-slider');
    this.rotateSlider = document.getElementById('rotate-slider');
    this.chkSyncHeading = document.getElementById('chk-sync-heading');

    // Leafletマップインスタンス ＆ レイヤー
    this.map = null;
    this.baseTileLayer = null;
    this.historicalOverlayTileLayer = null;
    this.mapOverlayTileErrors = 0;
    this.mapOverlayTileLoaded = 0;
    // 既定は不透明。薄いと「何が写っているか分からない」ため、
    // まずはっきり見せて、必要な人だけスライダーで薄くする。
    this.mapOverlayOpacity = 1;
    this.swipeCompareActive = false;
    this.swipeRatio = 0.5;
    this.officialHazardTileLayer = null;
    this.mapMarkers = [];
    this.userMapMarker = null;

    // ARスクリーンスポット情報
    this.renderedPins = [];

    this.init();
  }

  async init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.setupEventListeners();
    this.setupDragControls();
    this.setupOverlayControls();
    this.setupSwipeCompareControls();
    this.setupGeolocationAndSensors();

    // Leafletマップ初期化を試行
    this.initLeafletMap();
    this.switchViewMode('map');
    this.updateDiscoveryUI();

    requestAnimationFrame(() => this.renderLoop());
  }

  resizeCanvas() {
    // 端末のピクセル密度に合わせて実解像度を上げ、描画はCSSピクセル基準に揃える。
    // これをしないと高精細スマホでピンの文字がぼやける。
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    this.viewW = window.innerWidth;
    this.viewH = window.innerHeight;
    this.canvas.width = Math.round(this.viewW * dpr);
    this.canvas.height = Math.round(this.viewH * dpr);
    this.canvas.style.width = `${this.viewW}px`;
    this.canvas.style.height = `${this.viewH}px`;
    // 以降の描画座標はすべてCSSピクセルで扱えるようにする
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.map) {
      setTimeout(() => this.map.invalidateSize(), 100);
    }
  }

  // --- Leaflet 地図モードの初期化 ---
  initLeafletMap() {
    if (this.map) return true;
    if (typeof L === 'undefined') {
      console.warn('Leaflet JS 読み込み待ち...');
      return false;
    }

    try {
      this.map = L.map('map-view', {
        center: [this.userPos.latitude, this.userPos.longitude],
        zoom: 16,
        zoomControl: false
      });

      // 初期のベース地図タイル (現代標準地図)
      this.updateMapBaseTile(this.currentEra);

      // ユーザー現在地ピン
      const userIcon = L.divIcon({
        className: 'custom-user-pin',
        html: `<div class="map-user-location"></div>`,
        iconSize: [18, 18]
      });
      this.userMapMarker = L.marker([this.userPos.latitude, this.userPos.longitude], { icon: userIcon })
        .addTo(this.map)
        .bindPopup('現在地 (シミュレート位置)');

      this.renderMapMarkers();
      return true;
    } catch (e) {
      console.error('Leaflet初期化エラー:', e);
      return false;
    }
  }

  // 現代地図を下地に置き、選択した過去資料を透明度付きで重ねる。
  updateMapBaseTile(eraKey) {
    if (!this.map) return;
    const tileDef = HISTORICAL_MAP_TILES[eraKey];
    if (!tileDef) {
      this.showMapDataStatus('この年代の位置精度を持つ地図データは現在未収録です。', 'warning');
      return;
    }

    const presentDef = HISTORICAL_MAP_TILES.present;
    if (!this.baseTileLayer) {
      this.baseTileLayer = L.tileLayer(presentDef.url, {
        minZoom: presentDef.minZoom,
        maxZoom: 18,
        maxNativeZoom: presentDef.maxNativeZoom,
        attribution: presentDef.attribution,
        crossOrigin: true
      }).addTo(this.map);
    }

    if (this.historicalOverlayTileLayer) {
      this.map.removeLayer(this.historicalOverlayTileLayer);
      this.historicalOverlayTileLayer = null;
    }

    if (eraKey === 'present') {
      this.showMapDataStatus(`${presentDef.name}｜出典: ${presentDef.sourceName}`, 'success', presentDef.sourceUrl);
      return;
    }

    this.mapOverlayTileErrors = 0;
    this.mapOverlayTileLoaded = 0;
    this.showMapDataStatus(`${tileDef.name}を現代地図に重ねて読み込み中…`, 'info', tileDef.sourceUrl);
    this.historicalOverlayTileLayer = L.tileLayer(tileDef.url, {
      minZoom: tileDef.minZoom,
      maxZoom: 18,
      maxNativeZoom: tileDef.maxNativeZoom,
      opacity: this.mapOverlayOpacity,
      attribution: tileDef.attribution,
      crossOrigin: true
    });
    this.historicalOverlayTileLayer.on('tileload', () => {
      this.mapOverlayTileLoaded += 1;
      this.showComparisonTileStatus(tileDef);
    });
    this.historicalOverlayTileLayer.on('tileerror', () => {
      this.mapOverlayTileErrors += 1;
      this.showComparisonTileStatus(tileDef);
    });
    this.historicalOverlayTileLayer.addTo(this.map);
    this.updateCompareControlsVisibility();
    this.applySwipeClip();
  }

  // 「現代地図に戻す」「スワイプ比較」は、過去の年代を選んでいるときだけ意味がある
  updateCompareControlsVisibility() {
    const overlayOn = Boolean(this.historicalOverlayTileLayer);
    document.getElementById('btn-back-to-present')?.classList.toggle('hidden', !overlayOn);
    document.getElementById('btn-swipe-compare')?.classList.toggle('hidden', !overlayOn);
    if (!overlayOn && this.swipeCompareActive) this.setSwipeCompare(false);
  }

  // 現代地図へ戻す（重ね合わせを解除する明示的な出口）
  backToPresentMap() {
    this.currentEra = 'present';
    this.setSwipeCompare(false);
    document.querySelectorAll('.era-chip').forEach(chip =>
      chip.classList.toggle('active', chip.dataset.era === 'present'));
    this.updateMapBaseTile('present');
    this.updateCompareControlsVisibility();
  }

  // 左右スワイプで「過去 / 現代」を見比べる。
  // 重ねるより、境界を動かすほうが違いが分かりやすい。
  setSwipeCompare(on) {
    this.swipeCompareActive = on && Boolean(this.historicalOverlayTileLayer);
    const handle = document.getElementById('swipe-handle');
    const btn = document.getElementById('btn-swipe-compare');
    handle?.classList.toggle('hidden', !this.swipeCompareActive);
    btn?.setAttribute('aria-pressed', String(this.swipeCompareActive));
    btn?.classList.toggle('active-highlight', this.swipeCompareActive);

    if (this.swipeCompareActive) {
      // 比較中は過去側を完全不透明にして、境界の差をはっきりさせる
      this.historicalOverlayTileLayer?.setOpacity(1);
    } else if (this.historicalOverlayTileLayer) {
      this.historicalOverlayTileLayer.setOpacity(this.mapOverlayOpacity);
    }
    this.applySwipeClip();
  }

  // 過去レイヤーを左側だけ表示するようclip-pathで切る
  applySwipeClip() {
    const container = this.historicalOverlayTileLayer?.getContainer?.();
    if (!container) return;
    if (this.swipeCompareActive) {
      const pct = Math.round(this.swipeRatio * 100);
      container.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      container.style.webkitClipPath = `inset(0 ${100 - pct}% 0 0)`;
    } else {
      container.style.clipPath = '';
      container.style.webkitClipPath = '';
    }
  }

  setupSwipeCompareControls() {
    const handle = document.getElementById('swipe-handle');
    if (!handle) return;
    let dragging = false;
    const moveTo = (clientX) => {
      const w = window.innerWidth;
      this.swipeRatio = Math.min(0.95, Math.max(0.05, clientX / w));
      handle.style.left = `${this.swipeRatio * 100}%`;
      this.applySwipeClip();
    };
    handle.style.left = '50%';
    handle.addEventListener('pointerdown', (e) => { dragging = true; e.preventDefault(); });
    window.addEventListener('pointermove', (e) => { if (dragging) moveTo(e.clientX); });
    window.addEventListener('pointerup', () => { dragging = false; });
  }

  showComparisonTileStatus(tileDef) {
    const loaded = this.mapOverlayTileLoaded || 0;
    const errored = this.mapOverlayTileErrors || 0;
    if (loaded > 0 && errored === 0) {
      this.showMapDataStatus(`${tileDef.name}を現代地図に重ねて表示中（透明度 ${Math.round(this.mapOverlayOpacity * 100)}%）`, 'success', tileDef.sourceUrl);
    } else if (loaded > 0 && errored > 0) {
      this.showMapDataStatus(`${tileDef.name}：一部タイルにデータがありません（取得できた範囲のみ表示）。`, 'info', tileDef.sourceUrl);
    } else if (loaded === 0 && errored > 0) {
      this.showMapDataStatus(`この地域・ズームの「${tileDef.name}」データはありません。現代地図へ自動切替していません。`, 'warning', tileDef.sourceUrl);
    }
  }

  // 「全部ない」「一部ない」「正常」をタイルの成功/失敗数から区別する。
  showBaseTileStatus(tileDef) {
    const loaded = this.mapDataTileLoaded || 0;
    const errored = this.mapDataTileErrors || 0;
    if (loaded > 0 && errored === 0) {
      this.showMapDataStatus(`${tileDef.name}｜出典: ${tileDef.sourceName}`, 'success', tileDef.sourceUrl);
    } else if (loaded > 0 && errored > 0) {
      this.showMapDataStatus(`${tileDef.name}：この範囲の一部にデータがありません（表示できる部分のみ表示）。`, 'info', tileDef.sourceUrl);
    } else if (loaded === 0 && errored > 0) {
      this.showMapDataStatus(`この地域・ズームの「${tileDef.name}」データはありません。現代地図には自動切替していません。`, 'warning', tileDef.sourceUrl);
    }
  }

  // 国土交通省・国土地理院 公式ハザードマップタイルの重畳表示
  updateOfficialHazardTile(hazardKey) {
    if (!this.map) return;

    if (this.officialHazardTileLayer) {
      this.map.removeLayer(this.officialHazardTileLayer);
      this.officialHazardTileLayer = null;
    }
    this.officialHazardLayerKey = null;

    if (this.currentLayer === 'disaster') {
      const hazardDef = OFFICIAL_HAZARD_LAYERS[hazardKey];
      if (hazardDef) {
        this.hazardTileErrors = 0;
        this.hazardTileLoaded = 0;
        this.officialHazardLayerKey = hazardKey;
        this.officialHazardTileLayer = L.tileLayer(hazardDef.tileUrl, {
          minZoom: hazardDef.minZoom,
          maxZoom: 17,
          maxNativeZoom: hazardDef.maxNativeZoom,
          opacity: 0.75,
          attribution: hazardDef.attribution
        });
        this.officialHazardTileLayer.on('tileload', () => {
          this.hazardTileLoaded += 1;
          this.showHazardTileStatus(hazardDef);
        });
        this.officialHazardTileLayer.on('tileerror', () => {
          this.hazardTileErrors += 1;
          this.showHazardTileStatus(hazardDef);
        });
        this.officialHazardTileLayer.addTo(this.map);

        this.renderHazardLegend(hazardDef);
        if (this.hazardSourceLink) {
          this.hazardSourceLink.href = hazardDef.sourceUrl;
          this.hazardSourceLink.textContent = `公式出典: ${hazardDef.sourceName}`;
        }
      }
      else {
        this.showMapDataStatus(
          `「${hazardKey}」のハザードデータは現在未確認のため表示できません。公式一次資料での検証後に有効化します。`,
          'warning'
        );
        this.renderHazardLegend(null);
      }
    }
  }

  showHazardTileStatus(hazardDef) {
    const loaded = this.hazardTileLoaded || 0;
    const errored = this.hazardTileErrors || 0;
    if (loaded > 0 && errored === 0) {
      this.showMapDataStatus(`${hazardDef.name}｜公式タイルを表示中`, 'success', hazardDef.sourceUrl);
    } else if (loaded > 0 && errored > 0) {
      this.showMapDataStatus(`${hazardDef.name}：この範囲の一部にデータがありません（着色区域のみ表示）。`, 'info', hazardDef.sourceUrl);
    } else if (loaded === 0 && errored > 0) {
      this.showMapDataStatus(`この地域・ズームの「${hazardDef.name}」データはありません。`, 'warning', hazardDef.sourceUrl);
    }
  }

  showMapDataStatus(message, tone = 'info', sourceUrl = null) {
    if (!this.mapDataStatus) return;
    this.mapDataStatus.className = `map-data-status ${tone}`;
    this.mapDataStatus.innerHTML = `<div class="map-status-content"><span>${message}</span>${sourceUrl ? ` <a href="${sourceUrl}" target="_blank" rel="noreferrer">出典</a>` : ''}</div><button id="btn-close-map-data-status" class="guide-close map-status-close" type="button" title="案内を隠す" aria-label="状態を隠す"><i data-lucide="x"></i></button>`;
    this.reopenMapDataStatusButton?.classList.add('hidden');
    this.mapDataStatus.classList.remove('hidden');
    this.updateAttribution(message, sourceUrl);
    if (window.lucide) lucide.createIcons();
  }

  hideMapDataStatus() {
    this.mapDataStatus?.classList.add('hidden');
    this.reopenMapDataStatusButton?.classList.remove('hidden');
  }

  updateAttribution(message, sourceUrl = null) {
    if (!this.attributionText) return;
    const shortMsg = String(message || '').replace(/\s+/g, ' ').trim();
    const compact = shortMsg.length > 72 ? `${shortMsg.slice(0, 70)}…` : shortMsg;
    if (sourceUrl) {
      // メッセージ側に「出典:」が含まれる場合があるため、リンク名を「詳細」にして重複を避ける。
      this.attributionText.innerHTML = `${compact} <a href="${sourceUrl}" target="_blank" rel="noreferrer">詳細</a>`;
    } else {
      this.attributionText.textContent = compact || '出典は地図・資料ごとに表示します';
    }
  }

  renderHazardLegend(hazardDef) {
    if (!this.hazardLegendBox) return;
    if (!hazardDef || !hazardDef.legend) {
      this.hazardLegendBox.innerHTML = '';
      return;
    }

    const html = hazardDef.legend.map(item => `
      <div class="legend-item">
        <div class="legend-color-box" style="background:${item.color};"></div>
        <span>${item.depth}</span>
      </div>
    `).join('');

    this.hazardLegendBox.innerHTML = html;
  }

  renderMapMarkers() {
    if (!this.map) return;

    // 既存マーカークリア
    this.mapMarkers.forEach(item => this.map.removeLayer(item.marker || item));
    this.mapMarkers = [];

    // フィルタリングしたスポットの表示
    const isCulturalLayer = this.currentLayer === 'religious' || this.currentLayer === 'castle';
    const allLayerSpots = this.getPointSpots().filter(s => s.category === this.currentLayer);
    const filteredSpots = allLayerSpots.filter(spot => !isCulturalLayer
      || this.culturalRegionFilter === 'all'
      || this.getSpotRegion(spot) === this.culturalRegionFilter);

    const spotsPanel = this.getMapSpotsPanel();
    if (spotsPanel) {
      const layerLabel = this.currentLayer === 'history'
        ? '歴史・観光'
        : this.currentLayer === 'community'
          ? '地域理解'
          : this.currentLayer === 'religious'
            ? '寺社'
            : this.currentLayer === 'castle'
              ? '城'
              : '防災';
      const regionFilters = isCulturalLayer
        ? `<div class="cultural-region-filters" role="group" aria-label="地域で絞り込む">
            ${CULTURAL_REGIONS.map(region => {
              const value = region === '全国' ? 'all' : region;
              const count = region === '全国' ? allLayerSpots.length : allLayerSpots.filter(spot => this.getSpotRegion(spot) === region).length;
              return `<button type="button" class="cultural-region-filter${this.culturalRegionFilter === value ? ' active' : ''}" data-region-filter="${value}"${count === 0 ? ' disabled' : ''}>${region}<span>${count}</span></button>`;
            }).join('')}
          </div>`
        : '';
      spotsPanel.innerHTML = `
        <div class="map-spots-title">${layerLabel}スポット</div>
        ${isCulturalLayer ? `<p class="${this.currentLayer}-layer-note">${this.currentLayer === 'castle' ? '城域の概略位置と公式案内を地域別に表示' : '由緒・創建年は各公式情報の記載範囲で表示'}</p>${regionFilters}` : ''}
        ${filteredSpots.length === 0 ? this.getSpotsEmptyMessage() : filteredSpots.map(spot => `<button type="button" class="map-spot-list-item" data-spot-id="${spot.id}">
          <strong>${spot.name}</strong><small>${this.getSpotRegion(spot)}・${spot.eraLabel || spot.hazardInfo?.typeName || '情報'}</small>
        </button>`).join('')}
      `;
    }

    filteredSpots.forEach(spot => {
      let color = '#d95d20';
      if (spot.category === 'community') color = '#277c78';
      if (spot.category === 'religious') color = '#b45309';
      if (spot.category === 'castle') color = '#7c3aed';
      if (spot.category === 'disaster') color = '#ef4444';

      const icon = L.divIcon({
        className: `custom-spot-pin${this.selectedSpot?.id === spot.id ? ' is-selected' : ''}`,
        html: `<div class="map-pin-marker" style="--pin-color:${color}"><span class="map-pin-dot"><i></i></span><span class="map-pin-label">${spot.name.substring(0, 11)}</span></div>`,
        iconSize: [130, 44],
        iconAnchor: [20, 40]
      });

      const marker = L.marker([spot.coordinate.latitude, spot.coordinate.longitude], { icon })
        .addTo(this.map)
        .on('click', () => {
          this.selectMapSpot(spot, marker);
        });

      this.mapMarkers.push({ marker, spot });
    });

    // 防災レイヤー時は避難所もプロット（公式データ検証後に再有効化）
    if (this.currentLayer === 'disaster') {
      // 避難所マーカーは座標・種別の公式確認後に再有効化

      if (!this.officialHazardTileLayer || this.officialHazardLayerKey !== this.currentHazardType) {
        this.updateOfficialHazardTile(this.currentHazardType);
      }
    } else {
      if (this.officialHazardTileLayer) {
        this.map.removeLayer(this.officialHazardTileLayer);
        this.officialHazardTileLayer = null;
      }
      this.officialHazardLayerKey = null;
    }
  }

  // --- イベントリスナー設定 ---
  setupEventListeners() {
    // 視点切替 (AR ↔ 地図)
    this.btnModeAr.addEventListener('click', () => this.switchViewMode('ar'));
    this.btnModeMap.addEventListener('click', () => this.switchViewMode('map'));

    // 旧レイアウト互換: プロンプト内の地図ボタンが残る場合も動作させる
    const mapPromptBtn = document.getElementById('btn-switch-to-map-prompt');
    if (mapPromptBtn) {
      mapPromptBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.cameraPlaceholder.classList.add('hidden');
        this.switchViewMode('map');
      });
    }

    // カメラ起動プロンプト
    const startCamBtn = document.getElementById('btn-start-camera');
    if (startCamBtn) {
      startCamBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startCamera();
      });
    }
    document.getElementById('btn-start-demo-ar')?.addEventListener('click', () => this.startDemoAR());

    // 地図上の場所検索・現在地移動
    this.mapSearchForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.searchMapLocation();
    });
    this.mapSearchCancelButton?.addEventListener('click', () => this.cancelMapLocationSearch());
    this.mapCurrentLocationButton?.addEventListener('click', () => this.moveMapToCurrentLocation());

    document.getElementById('btn-close-map-first-hint')?.addEventListener('click', () => {
      this.mapFirstHint?.classList.add('hidden');
      try { window.localStorage?.setItem('map-first-hint-dismissed', '1'); } catch (_) {}
    });
    document.getElementById('btn-close-spot-preview')?.addEventListener('click', () => this.clearMapSpotSelection());
    document.getElementById('btn-open-spot-preview')?.addEventListener('click', () => {
      if (this.selectedSpot) this.openSpotModal(this.selectedSpot);
    });
    this.discoveryProgress?.addEventListener('click', () => this.openDiscoveryPanel());
    document.getElementById('btn-close-discovery-panel')?.addEventListener('click', () => {
      this.discoveryPanel?.classList.add('hidden');
    });
    this.discoveryList?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-discovery-spot-id]');
      if (!button) return;
      const spot = this.spots.find(item => item.id === button.dataset.discoverySpotId);
      if (!spot) return;
      this.discoveryPanel?.classList.add('hidden');
      this.currentLayer = spot.category;
      this.culturalRegionFilter = 'all';
      document.querySelectorAll('.layer-tabs-compact .tab-btn[data-layer]').forEach(item => {
        item.classList.toggle('active', item.dataset.layer === spot.category);
      });
      this.switchViewMode('map');
      this.updateLayerUI();
      if (this.map) this.map.setView([spot.coordinate.latitude, spot.coordinate.longitude], 17);
      this.selectMapSpot(spot);
    });
    this.walkPicksButton?.addEventListener('click', () => this.openWalkPicksPanel());
    document.getElementById('btn-close-walk-picks')?.addEventListener('click', () => {
      this.walkPicksPanel?.classList.add('hidden');
    });
    this.walkPicksList?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-walk-pick-id]');
      if (!button) return;
      const spot = this.spots.find(item => item.id === button.dataset.walkPickId);
      if (spot) this.selectWalkPick(spot);
    });
    this.visitLogProgress?.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleVisitLogPanel();
    });
    document.getElementById('btn-close-visit-log')?.addEventListener('click', () => this.closeVisitLogPanel());
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !this.visitLogPanel?.classList.contains('hidden')) {
        this.closeVisitLogPanel();
      }
    });
    document.addEventListener('click', (event) => {
      if (this.visitLogPanel?.classList.contains('hidden')) return;
      if (this.visitLogPanel.contains(event.target) || this.visitLogProgress?.contains(event.target)) return;
      this.closeVisitLogPanel();
    });
    this.visitLogList?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-visit-spot-id]');
      if (!button) return;
      const spot = this.spots.find(item => item.id === button.dataset.visitSpotId);
      if (spot) {
        this.closeVisitLogPanel();
        this.openSpotModal(spot);
      }
    });
    this.visitNextStopContent?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-next-stop-id]');
      if (!button) return;
      const spot = this.spots.find(item => item.id === button.dataset.nextStopId);
      if (spot) {
        this.closeVisitLogPanel();
        this.selectWalkPick(spot);
      }
    });
    this.toggleVisitButton?.addEventListener('click', () => this.toggleVisitRecord());
    this.saveVisitNoteButton?.addEventListener('click', () => this.saveVisitNote());

    // ヘッダー カメラON/OFFボタン
    if (this.toggleCameraBtn) {
      this.toggleCameraBtn.addEventListener('click', () => {
        if (this.cameraActive) {
          this.stopCamera();
        } else {
          this.startCamera();
        }
      });
    }

    // レイヤー切り替えタブ
    document.querySelectorAll('.layer-tabs-compact .tab-btn[data-layer]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        document.querySelectorAll('.layer-tabs-compact .tab-btn').forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        this.currentLayer = targetBtn.dataset.layer;
        this.culturalRegionFilter = 'all';
        this.updateLayerUI();
      });
    });

    const spotsPanel = this.getMapSpotsPanel();
    if (spotsPanel) {
      spotsPanel.addEventListener('click', (event) => {
        const filter = event.target.closest('[data-region-filter]');
        if (filter) {
          this.culturalRegionFilter = filter.dataset.regionFilter || 'all';
          this.renderMapMarkers();
          return;
        }
        const button = event.target.closest('[data-spot-id]');
        if (!button) return;
        const spot = this.spots.find(item => item.id === button.dataset.spotId);
        if (spot) {
          if (this.map && (spot.category === 'religious' || spot.category === 'castle')) {
            this.map.setView([spot.coordinate.latitude, spot.coordinate.longitude], 15);
          }
          this.selectMapSpot(spot);
          this.openSpotModal(spot);
        }
      });
    }

    // 時代別航空写真・タイムライン切替
    document.querySelectorAll('.era-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.era-chip').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentEra = e.currentTarget.dataset.era;
        this.updateMapBaseTile(this.currentEra);
      });
    });

    // 防災サブレイヤー（洪水・津波・土砂災害）切替
    document.querySelectorAll('.hazard-type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.hazard-type-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentHazardType = e.currentTarget.dataset.hazard;
        this.updateOfficialHazardTile(this.currentHazardType);
        this.updateFloodConceptToggleVisibility();
      });
    });

    // 洪水の概念イメージ（水面）表示トグル
    const floodConceptChk = document.getElementById('chk-flood-concept');
    if (floodConceptChk) {
      floodConceptChk.addEventListener('change', (e) => {
        this.showFloodConceptImage = e.target.checked;
      });
    }

    // 体験モード切替（探索 / 現地）
    const exploreBtn = document.getElementById('btn-mode-explore');
    const onsiteBtn = document.getElementById('btn-mode-onsite');
    if (exploreBtn) exploreBtn.addEventListener('click', () => this.enableExploreMode());
    if (onsiteBtn) onsiteBtn.addEventListener('click', () => this.enableOnsiteMode());

    // シミュレータパネル切り替え
    const simPanel = document.getElementById('simulator-panel');
    const simToggleBtn = document.getElementById('btn-toggle-sim');
    simToggleBtn.addEventListener('click', () => {
      simPanel.classList.toggle('hidden');
      simToggleBtn.classList.toggle('active-highlight', !simPanel.classList.contains('hidden'));
    });
    document.getElementById('btn-close-sim').addEventListener('click', () => {
      simPanel.classList.add('hidden');
      simToggleBtn.classList.remove('active-highlight');
    });

    // シミュレータコントロール
    const headingInput = document.getElementById('sim-heading');
    headingInput.addEventListener('input', (e) => {
      this.setHeading(parseFloat(e.target.value), 'manual');
    });

    if (this.mapCompareSlider) {
      this.mapCompareSlider.addEventListener('input', (e) => {
        this.mapOverlayOpacity = Number(e.target.value) / 100;
        if (this.historicalOverlayTileLayer) this.historicalOverlayTileLayer.setOpacity(this.mapOverlayOpacity);
        if (this.mapCompareValue) this.mapCompareValue.textContent = `${e.target.value}%`;
      });
    }

    // 現代地図へ戻す / スワイプ比較
    document.getElementById('btn-back-to-present')?.addEventListener('click', () => {
      this.backToPresentMap();
    });
    document.getElementById('btn-swipe-compare')?.addEventListener('click', () => {
      this.setSwipeCompare(!this.swipeCompareActive);
    });

    const timeTravelButton = document.getElementById('btn-time-travel');
    if (timeTravelButton) timeTravelButton.addEventListener('click', () => this.openTimeTravel(this.selectedSpot));
    const closeTimeTravel = document.getElementById('btn-close-time-travel');
    if (closeTimeTravel) closeTimeTravel.addEventListener('click', () => this.closeTimeTravel());

    document.getElementById('btn-close-era-panel')?.addEventListener('click', () => {
      this.eraTimelineBar?.classList.add('hidden');
      this.reopenEraPanelButton?.classList.remove('hidden');
      try { window.localStorage?.setItem('ar-era-panel-dismissed', '1'); } catch (_) {}
    });
    this.reopenEraPanelButton?.addEventListener('click', () => {
      this.eraTimelineBar?.classList.remove('hidden');
      this.reopenEraPanelButton.classList.add('hidden');
      try { window.localStorage?.removeItem('ar-era-panel-dismissed'); } catch (_) {}
    });
    document.getElementById('btn-close-hazard-sheet')?.addEventListener('click', () => {
      this.disasterBanner?.classList.add('hidden');
      this.reopenHazardSheetButton?.classList.remove('hidden');
    });
    this.reopenHazardSheetButton?.addEventListener('click', () => {
      if (this.currentLayer === 'disaster') {
        this.disasterBanner?.classList.remove('hidden');
        this.reopenHazardSheetButton.classList.add('hidden');
      }
    });
    this.openSpotsButton?.addEventListener('click', () => {
      const panel = this.getMapSpotsPanel();
      if (!panel) return;
      if (this.currentLayer === 'disaster') {
        panel.classList.add('hidden');
        this.openSpotsButton.classList.remove('active');
        this.openSpotsButton.setAttribute('aria-pressed', 'false');
        return;
      }
      const willShow = panel.classList.contains('hidden');
      panel.classList.toggle('hidden', !willShow);
      this.openSpotsButton.classList.toggle('active', willShow);
      this.openSpotsButton.setAttribute('aria-pressed', willShow ? 'true' : 'false');
      if (willShow) this.renderMapMarkers();
    });
    this.reopenMapDataStatusButton?.addEventListener('click', () => {
      this.mapDataStatus?.classList.remove('hidden');
      this.reopenMapDataStatusButton.classList.add('hidden');
    });
    this.mapDataStatus?.addEventListener('click', (event) => {
      if (event.target.closest('#btn-close-map-data-status')) this.hideMapDataStatus();
    });
    document.getElementById('btn-close-map-guide')?.addEventListener('click', () => {
      this.mapGuide?.classList.add('hidden');
      this.reopenMapGuideButton?.classList.remove('hidden');
    });
    this.reopenMapGuideButton?.addEventListener('click', () => {
      this.mapGuide?.classList.remove('hidden');
      this.reopenMapGuideButton.classList.add('hidden');
    });
    document.getElementById('btn-close-guide')?.addEventListener('click', () => {
      this.guideHint?.classList.add('hidden');
      try {
        window.localStorage?.setItem('ar-guide-dismissed', '1');
      } catch (_) {
        // 保存できない環境では今回の表示だけを閉じる
      }
    });

    document.querySelectorAll('.sim-btn-grid .btn-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sim-btn-grid .btn-chip').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.userPos.latitude = parseFloat(e.currentTarget.dataset.lat);
        this.userPos.longitude = parseFloat(e.currentTarget.dataset.lng);
        // 位置プリセットは探索モードの操作
        this.locationMode = 'explore';
        this.updateLocationStatus();
      });
    });

    // キャンバスタップ判定
    this.canvas.addEventListener('click', (e) => {
      if (!this.isDraggingMoved && this.viewMode === 'ar') {
        this.handleCanvasClick(e);
      }
    });

    // モーダル操作
    document.getElementById('btn-close-modal').addEventListener('click', () => {
      document.getElementById('spot-modal').classList.add('hidden');
    });

    document.getElementById('btn-info').addEventListener('click', () => {
      document.getElementById('info-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-info').addEventListener('click', () => {
      document.getElementById('info-modal').classList.add('hidden');
    });

    // 古写真リアルAR比較開始
    document.getElementById('btn-compare-ar').addEventListener('click', () => {
      const media = this.getPrimaryMedia(this.selectedSpot);
      if (this.selectedSpot && media?.isHistorical && media.imageUrl && media.imageUrlVerified !== false) {
        document.getElementById('spot-modal').classList.add('hidden');
        this.overlayImg.src = media.imageUrl;
        this.overlayImg.alt = `${media.title}（${media.sourceName}）`;
        this.renderOverlayCredit(media);
        this.historicalOverlay.classList.remove('hidden');
        document.body.classList.add('comparing');
        this.resetOverlayTransform();
        // 名所絵は重ねても位置が合わないため、既定は「絵として鑑賞」。
        // 測量に近い資料（絵図・航空写真）だけ重ね合わせを既定にする。
        this.setOverlayViewMode(media.positionAccuracy === 'reference_only' ? 'artwork' : 'blend', media);
      }
    });

    document.getElementById('btn-close-overlay').addEventListener('click', () => {
      this.historicalOverlay.classList.add('hidden');
      document.body.classList.remove('comparing');
    });

    // 年代別航空写真をARで見る
    document.getElementById('btn-aerial-ar')?.addEventListener('click', () => {
      this.openAerialOverlay(this.selectedSpot);
    });
    document.getElementById('btn-close-aerial')?.addEventListener('click', () => {
      this.aerialOverlay?.classList.add('hidden');
    });
    this.aerialOpacitySlider?.addEventListener('input', (e) => {
      this.aerialOpacity = Number(e.target.value) / 100;
      const label = document.getElementById('aerial-opacity-val');
      if (label) label.textContent = `${e.target.value}%`;
      if (this.aerialCanvas) this.aerialCanvas.style.opacity = String(this.aerialOpacity);
    });

    // 簡易3Dビュー
    document.getElementById('btn-view-3d')?.addEventListener('click', () => {
      this.openThreeView(this.selectedSpot);
    });
    document.getElementById('btn-close-three')?.addEventListener('click', () => {
      this.closeThreeView();
    });
    document.getElementById('btn-close-ar-discovery')?.addEventListener('click', () => {
      this.arDiscoveryDismissed = true;
      this.hideArDiscoveryCard();
    });
    document.getElementById('btn-ar-card-materials')?.addEventListener('click', () => {
      if (!this.selectedSpot) return;
      this.openSpotModal(this.selectedSpot);
      requestAnimationFrame(() => document.getElementById('material-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
    document.getElementById('btn-ar-card-three')?.addEventListener('click', () => {
      if (this.selectedSpot) this.openThreeView(this.selectedSpot);
    });
    document.getElementById('btn-ar-card-next')?.addEventListener('click', () => {
      this.openWalkPicksPanel();
    });
    document.getElementById('btn-ar-card-visit')?.addEventListener('click', () => {
      if (!this.selectedSpot) return;
      this.openSpotModal(this.selectedSpot);
      requestAnimationFrame(() => document.getElementById('modal-visit-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    });
    document.getElementById('btn-three-materials')?.addEventListener('click', () => {
      const spot = this.threeFocusSpot || this.selectedSpot;
      if (!spot) return;
      this.closeThreeView();
      this.openSpotModal(spot);
      requestAnimationFrame(() => document.getElementById('material-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
    document.getElementById('btn-three-next')?.addEventListener('click', () => {
      this.closeThreeView();
      this.openWalkPicksPanel();
    });

    document.getElementById('btn-reset-overlay').addEventListener('click', () => {
      this.resetOverlayTransform();
    });

    // 「絵として見る」「重ねる」の切替
    document.querySelectorAll('[data-overlay-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setOverlayViewMode(btn.dataset.overlayMode);
      });
    });
  }

  // モード切り替え (AR ↔ 地図)
  switchViewMode(mode) {
    this.viewMode = mode;
    const appContainer = document.getElementById('app-container');
    appContainer?.classList.toggle('map-mode', mode === 'map');
    appContainer?.classList.toggle('ar-idle', mode === 'ar' && !this.cameraActive && !this.demoArActive);
    appContainer?.classList.toggle('ar-running', mode === 'ar' && (this.cameraActive || this.demoArActive));
    const spotsPanel = this.getMapSpotsPanel();

    if (mode === 'map') {
      this.arHud?.classList.add('hidden');
      this.mapNavigationTools?.classList.remove('hidden');
      this.btnModeAr.classList.remove('active');
      this.btnModeMap.classList.add('active');
      this.btnModeAr.setAttribute('aria-selected', 'false');
      this.btnModeMap.setAttribute('aria-selected', 'true');
      this.mapViewEl.classList.remove('hidden');
      this.canvas.classList.add('hidden');
      this.eraTimelineBar.classList.add('hidden');
      this.reopenEraPanelButton?.classList.remove('hidden');
      if (this.mapDataStatus) this.mapDataStatus.classList.remove('hidden');
      if (spotsPanel) spotsPanel.classList.add('hidden');
      this.openSpotsButton?.classList.remove('active');
      this.openSpotsButton?.setAttribute('aria-pressed', 'false');
      this.guideHint?.classList.add('hidden');
      if (this.guideHintText) {
        this.guideHintText.textContent = '地図上のピンや「一覧」から詳細・出典を確認できます';
      }

      const simPanel = document.getElementById('simulator-panel');
      if (simPanel) simPanel.classList.add('hidden');

      if (!this.map) {
        this.initLeafletMap();
      }

      if (this.map) {
        setTimeout(() => {
          this.map.invalidateSize();
          this.map.panTo([this.userPos.latitude, this.userPos.longitude]);
          this.renderMapMarkers();
        }, 50);
      }
    } else {
      this.mapNavigationTools?.classList.add('hidden');
      this.btnModeAr.classList.add('active');
      this.btnModeMap.classList.remove('active');
      this.btnModeAr.setAttribute('aria-selected', 'true');
      this.btnModeMap.setAttribute('aria-selected', 'false');
      this.mapViewEl.classList.add('hidden');
      if (this.mapDataStatus) this.mapDataStatus.classList.add('hidden');
      if (spotsPanel) spotsPanel.classList.add('hidden');
      this.canvas.classList.remove('hidden');
      this.eraTimelineBar.classList.add('hidden');
      this.reopenEraPanelButton?.classList.add('hidden');
      this.reopenMapDataStatusButton?.classList.add('hidden');
      this.reopenMapGuideButton?.classList.add('hidden');
      this.reopenHazardSheetButton?.classList.add('hidden');
      this.mapGuide?.classList.add('hidden');
      this.guideHint?.classList.remove('hidden');
      if (this.guideHintText) {
        this.guideHintText.textContent = '画面を左右にドラッグして見回します';
      }
      this.updateARExperienceVisibility();
      if (!this.cameraActive && !this.demoArActive) this.cameraPlaceholder?.classList.remove('hidden');
    }
  }

  // --- 古写真リアルAR重ね合わせ インタラクティブ操作機能 ---
  setupOverlayControls() {
    this.opacitySlider.addEventListener('input', (e) => {
      this.overlayState.opacity = e.target.value / 100;
      document.getElementById('opacity-val').textContent = `${e.target.value}%`;
      this.applyOverlayTransform();
    });

    this.scaleSlider.addEventListener('input', (e) => {
      this.overlayState.scale = e.target.value / 100;
      document.getElementById('scale-val').textContent = `${e.target.value}%`;
      this.applyOverlayTransform();
    });

    this.rotateSlider.addEventListener('input', (e) => {
      this.overlayState.rotate = parseFloat(e.target.value);
      document.getElementById('rotate-val').textContent = `${e.target.value}°`;
      this.applyOverlayTransform();
    });

    this.chkSyncHeading.addEventListener('change', (e) => {
      this.overlayState.syncHeading = e.target.checked;
      this.applyOverlayTransform();
    });

    const wrapper = this.overlayImgWrapper;

    const onPointerDown = (e) => {
      this.isDraggingOverlay = true;
      this.overlayDragStart = {
        x: e.clientX - this.overlayState.posX,
        y: e.clientY - this.overlayState.posY
      };
      wrapper.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!this.isDraggingOverlay) return;
      this.overlayState.posX = e.clientX - this.overlayDragStart.x;
      this.overlayState.posY = e.clientY - this.overlayDragStart.y;
      this.applyOverlayTransform();
    };

    const onPointerUp = (e) => {
      this.isDraggingOverlay = false;
      try { wrapper.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    wrapper.addEventListener('pointerdown', onPointerDown);
    wrapper.addEventListener('pointermove', onPointerMove);
    wrapper.addEventListener('pointerup', onPointerUp);
    wrapper.addEventListener('pointercancel', onPointerUp);
  }

  resetOverlayTransform() {
    this.overlayState = {
      posX: 0,
      posY: 0,
      scale: 1.0,
      rotate: 0,
      opacity: 0.65,
      syncHeading: true,
      initialHeading: this.heading
    };

    this.opacitySlider.value = 65;
    this.scaleSlider.value = 100;
    this.rotateSlider.value = 0;
    this.chkSyncHeading.checked = true;

    document.getElementById('opacity-val').textContent = '65%';
    document.getElementById('scale-val').textContent = '100%';
    document.getElementById('rotate-val').textContent = '0°';

    this.applyOverlayTransform();
  }

  applyOverlayTransform() {
    if (!this.overlayImgWrapper) return;

    let headingOffset = 0;
    if (this.overlayState.syncHeading) {
      let diff = this.heading - this.overlayState.initialHeading;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;
      headingOffset = -diff * (window.innerWidth / 60);
    }

    const totalX = this.overlayState.posX + headingOffset;
    const totalY = this.overlayState.posY;

    this.overlayImgWrapper.style.transform =
      `translate(calc(-50% + ${totalX}px), calc(-50% + ${totalY}px)) ` +
      `scale(${this.overlayState.scale}) ` +
      `rotate(${this.overlayState.rotate}deg)`;

    this.overlayImg.style.opacity = this.overlayState.opacity;
  }

  // --- 直感的なAR画面ドラッグによる方位変更 ---
  setupDragControls() {
    this.isDraggingMoved = false;

    const onPointerDown = (e) => {
      if (this.viewMode !== 'ar') return;
      this.isDraggingCanvas = true;
      this.isDraggingMoved = false;
      this.dragStartX = e.clientX;
      this.startHeading = this.heading;
    };

    const onPointerMove = (e) => {
      if (!this.isDraggingCanvas) return;
      const deltaX = e.clientX - this.dragStartX;
      if (Math.abs(deltaX) > 4) {
        this.isDraggingMoved = true;
      }
      const degreesPerPixel = 120 / window.innerWidth;
      let newHeading = (this.startHeading - deltaX * degreesPerPixel) % 360;
      if (newHeading < 0) newHeading += 360;
      this.setHeading(newHeading, 'manual');
    };

    const onPointerUp = () => {
      this.isDraggingCanvas = false;
    };

    this.canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  // source: 'sensor' | 'simulation' | 'manual'
  setHeading(deg, source = 'manual') {
    this.heading = deg;
    this.headingSource = source;
    const headingInput = document.getElementById('sim-heading');
    const headingValText = document.getElementById('sim-heading-val');

    if (headingInput) headingInput.value = Math.round(deg);
    if (headingValText) {
      headingValText.textContent = `${Math.round(deg)}° (${this.getHeadingDirectionName(deg)})`;
    }

    this.applyOverlayTransform();
  }

  async startCamera() {
    this.switchViewMode('ar');
    if (!navigator.mediaDevices?.getUserMedia) {
      this.showCameraError('このブラウザではカメラを利用できません。HTTPSの公開ページを開くか、カメラなしARをお試しください。');
      return;
    }
    try {
      // iOSの方位許可は、ボタン操作直後のユーザー操作中に要求する必要がある。
      await this.enableOnsiteMode();
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      this.video.srcObject = this.mediaStream;
      await this.video.play().catch(() => {});
      this.cameraActive = true;
      this.demoArActive = false;
      document.getElementById('app-container')?.classList.remove('demo-ar');
      this.cameraPlaceholder.classList.add('hidden');

      this.cameraIconOn.classList.add('hidden');
      this.cameraIconOff.classList.remove('hidden');
      this.cameraBtnText.textContent = 'カメラOFF';
      this.toggleCameraBtn.classList.add('active-highlight');
      this.updateARExperienceVisibility();
      if (this.orientationPermission === 'denied') {
        this.showARHint('方位センサーが使えないため、画面を左右にドラッグして見回せます。');
      } else {
        this.showARHint('スマートフォンをゆっくり動かして、周辺の歴史スポットを探してみましょう。');
      }
    } catch (err) {
      console.warn('カメラアクセスエラー:', err);
      this.enableExploreMode();
      const message = err?.name === 'NotAllowedError'
        ? 'カメラが許可されていません。ブラウザの設定から許可するか、カメラなしARをお試しください。'
        : 'カメラを起動できませんでした。別のカメラを閉じて再試行するか、カメラなしARをお試しください。';
      this.showCameraError(message);
    }
  }

  startDemoAR() {
    this.switchViewMode('ar');
    this.demoArActive = true;
    this.cameraActive = false;
    this.arDiscoveryDismissed = false;
    this.hideArDiscoveryCard();
    this.cameraPlaceholder.classList.add('hidden');
    document.getElementById('app-container')?.classList.add('demo-ar');
    this.enableExploreMode();
    this.setHeading(0, 'simulation');
    this.updateARExperienceVisibility();
    this.showARHint('カメラなし体験です。画面を左右にドラッグしてピンを探し、タップしてみましょう。');
  }

  showCameraError(message) {
    this.cameraPlaceholder.classList.remove('hidden');
    this.arHud?.classList.add('hidden');
    const messageEl = this.cameraPlaceholder.querySelector('p');
    if (messageEl) messageEl.innerHTML = `<strong>カメラを開始できませんでした。</strong><br>${message}`;
  }

  showARHint(message) {
    if (this.guideHintText) this.guideHintText.textContent = message;
    this.guideHint?.classList.remove('hidden');
  }

  updateARExperienceVisibility() {
    const isRunning = this.viewMode === 'ar' && (this.cameraActive || this.demoArActive);
    this.arHud?.classList.toggle('hidden', !isRunning);
    if (!isRunning) this.hideArDiscoveryCard();
    const appContainer = document.getElementById('app-container');
    appContainer?.classList.toggle('ar-running', isRunning);
    appContainer?.classList.toggle('ar-idle', this.viewMode === 'ar' && !isRunning);
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.video.srcObject = null;
    this.cameraActive = false;
    this.demoArActive = false;
    document.getElementById('app-container')?.classList.remove('demo-ar');
    this.cameraPlaceholder.classList.remove('hidden');

    this.cameraIconOn.classList.remove('hidden');
    this.cameraIconOff.classList.add('hidden');
    this.cameraBtnText.textContent = 'カメラON';
    this.toggleCameraBtn.classList.remove('active-highlight');
    this.arHud?.classList.add('hidden');
    this.updateARExperienceVisibility();
    // カメラを切ったら探索モードへ戻す
    this.enableExploreMode();
  }

  setMapNavigationStatus(message, kind = 'info') {
    if (!this.mapNavigationStatus) return;
    this.mapNavigationStatus.textContent = message || '';
    this.mapNavigationStatus.dataset.kind = kind;
    this.mapNavigationStatus.classList.toggle('hidden', !message);
  }

  moveMapToCurrentLocation() {
    if (!navigator.geolocation) {
      this.setMapNavigationStatus('この端末では現在地を取得できません。', 'warning');
      return;
    }

    this.mapCurrentLocationButton?.setAttribute('aria-busy', 'true');
    this.setMapNavigationStatus('現在地を取得しています…', 'info');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userPos.latitude = position.coords.latitude;
        this.userPos.longitude = position.coords.longitude;
        this.locationMode = 'onsite';
        this.updateLocationModeUI();
        this.updateLocationStatus();
        if (this.map) {
          this.map.setView([this.userPos.latitude, this.userPos.longitude], Math.max(this.map.getZoom(), 16));
          this.userMapMarker?.openPopup();
        }
        this.setMapNavigationStatus('現在地へ移動しました（現地GPS）', 'success');
        this.mapCurrentLocationButton?.removeAttribute('aria-busy');
      },
      (error) => {
        const message = error?.code === 1
          ? '位置情報の許可が必要です。ブラウザの設定を確認してください。'
          : '現在地を取得できませんでした。屋外や電波の届く場所で再試行してください。';
        this.setMapNavigationStatus(message, 'warning');
        this.mapCurrentLocationButton?.removeAttribute('aria-busy');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }

  async searchMapLocation() {
    const query = this.mapSearchInput?.value.trim();
    if (!query) {
      this.setMapNavigationStatus('地名や住所を入力してください。', 'warning');
      this.mapSearchInput?.focus();
      return;
    }

    // 新しい検索を始める前に、前の通信だけを中断する。
    this.cancelMapLocationSearch({ announce: false });

    // 収録済みスポットは外部通信を待たずに検索できるようにする。
    const localResults = this.getLocalMapSearchResults(query);
    if (localResults.length) {
      this.renderMapSearchResults(localResults);
      this.setMapNavigationStatus(`登録済みスポット${localResults.length}件を表示しています。`, 'info');
      return;
    }

    const endpoint = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(query)}`;
    this.setMapNavigationStatus('地名を検索しています… 候補は待たずに選べます。', 'info');
    if (!this.recentMapSearchResults.length) {
      this.renderMapSearchResults(this.getRegisteredMapSearchResults(), '登録済みスポット');
    }

    let timeoutId;
    try {
      const controller = new AbortController();
      this.mapSearchController = controller;
      this.setMapSearchBusy(true);
      // 町名検索は候補の照合に時間がかかることがあるため、
      // 短すぎるタイムアウトで「見つからない」と誤認させない。
      timeoutId = window.setTimeout(() => controller.abort('timeout'), 20000);
      const response = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      window.clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      // 国土地理院の応答は通常配列だが、プロキシ等で results/data に
      // 包まれる場合もあるため、検索結果の入れ物だけを安全に許容する。
      const results = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
          ? payload.results
          : Array.isArray(payload?.data)
            ? payload.data
            : [];
      const normalized = results
        .map((item) => {
          const properties = item?.properties || item?.property || {};
          const coordinates = item?.geometry?.coordinates;
          const coordinateLongitude = Array.isArray(coordinates) ? coordinates[0] : undefined;
          const coordinateLatitude = Array.isArray(coordinates) ? coordinates[1] : undefined;
          return {
            name: String(
              item.title
              || item.name
              || item.address
              || item.address1
              || properties.title
              || properties.name
              || properties.address
              || query
            ),
            latitude: Number(
              item.lat
              ?? item.latitude
              ?? item.y
              ?? properties.lat
              ?? properties.latitude
              ?? properties.y
              ?? coordinateLatitude
            ),
            longitude: Number(
              item.lon
              ?? item.longitude
              ?? item.lng
              ?? item.x
              ?? properties.lon
              ?? properties.longitude
              ?? properties.lng
              ?? properties.x
              ?? coordinateLongitude
            )
          };
        })
        .filter((item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude))
        .slice(0, 5);

      if (!normalized.length) {
        const localResults = this.getLocalMapSearchResults(query);
        if (localResults.length) {
          this.renderMapSearchResults(localResults);
          this.setMapNavigationStatus(`外部検索ではなく、登録済みスポット${localResults.length}件を表示しています。`, 'info');
          return;
        }
        this.setMapNavigationStatus(`「${query}」に一致する場所が見つかりませんでした。`, 'warning');
        return;
      }
      this.renderMapSearchResults(normalized);
      this.setMapNavigationStatus(`${normalized.length}件の候補が見つかりました。`, 'success');
    } catch (error) {
      // 表示中の候補を選んだ場合は、移動完了メッセージを後続の中断処理で上書きしない。
      if (error?.name === 'AbortError' && controller.signal.reason === 'selection') return;
      if (error?.name !== 'AbortError') console.warn('地名検索エラー:', error);
      const message = error?.name === 'AbortError'
        ? (this.mapSearchController?.signal.reason === 'user'
          ? '検索を中断しました。表示中の候補はそのまま選べます。'
          : '検索に時間がかかっています。地名を短くするか、しばらくして再試行してください。')
        : '検索できませんでした。通信状態を確認して再試行してください。';
      const localResults = this.getLocalMapSearchResults(query);
      if (localResults.length) {
        this.renderMapSearchResults(localResults);
        this.setMapNavigationStatus(`外部検索に接続できないため、登録済みスポット${localResults.length}件を表示しています。`, 'info');
      } else {
      this.setMapNavigationStatus(message, 'warning');
      }
    } finally {
      // 成功・失敗・タイムアウトのいずれでもタイマーを残さない。
      window.clearTimeout(timeoutId);
      if (this.mapSearchController === controller) {
        this.mapSearchController = null;
        this.setMapSearchBusy(false);
      }
    }
  }

  cancelMapLocationSearch({ announce = true, reason = 'user' } = {}) {
    if (!this.mapSearchController) return;
    this.mapSearchController.abort(reason);
    this.setMapSearchBusy(false);
    if (announce) this.setMapNavigationStatus('検索を中断しました。表示中の候補はそのまま選べます。', 'info');
  }

  setMapSearchBusy(isBusy) {
    this.mapSearchForm?.toggleAttribute('aria-busy', isBusy);
    this.mapSearchCancelButton?.classList.toggle('hidden', !isBusy);
    this.mapSearchForm?.classList.toggle('is-searching', isBusy);
  }

  getRegisteredMapSearchResults() {
    return this.getPointSpots()
      .map((spot) => ({
        name: `${spot.name}（登録スポット）`,
        latitude: Number(spot.coordinate?.latitude),
        longitude: Number(spot.coordinate?.longitude)
      }))
      .filter((item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude))
      .slice(0, 5);
  }

  getLocalMapSearchResults(query) {
    const keyword = String(query || '').toLocaleLowerCase('ja-JP');
    return this.spots
      .filter((spot) => {
        const text = [spot.name, spot.summary, spot.description, spot.eraLabel]
          .filter(Boolean)
          .join(' ')
          .toLocaleLowerCase('ja-JP');
        return text.includes(keyword);
      })
      .map((spot) => ({
        name: `${spot.name}（登録スポット）`,
        latitude: Number(spot.coordinate?.latitude),
        longitude: Number(spot.coordinate?.longitude)
      }))
      .filter((item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude))
      .slice(0, 5);
  }

  renderMapSearchResults(results, label = '検索候補') {
    if (!this.mapSearchResults) return;
    this.recentMapSearchResults = results.map((result) => ({ ...result }));
    this.mapSearchResults.replaceChildren();
    const heading = document.createElement('div');
    heading.className = 'map-search-results-label';
    heading.textContent = label;
    this.mapSearchResults.appendChild(heading);
    results.forEach((result) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'map-search-result';
      button.setAttribute('role', 'option');
      button.textContent = result.name;
      button.addEventListener('click', () => {
        this.cancelMapLocationSearch({ announce: false, reason: 'selection' });
        this.locationMode = 'explore';
        this.userPos.latitude = result.latitude;
        this.userPos.longitude = result.longitude;
        this.updateLocationModeUI();
        this.updateLocationStatus();
        if (this.map) this.map.setView([result.latitude, result.longitude], 16);
        this.mapSearchResults.classList.add('hidden');
        this.setMapNavigationStatus(`${result.name}へ移動しました（地図探索）`, 'success');
      });
      this.mapSearchResults.appendChild(button);
    });
    this.mapSearchResults.classList.remove('hidden');
  }

  setupGeolocationAndSensors() {
    this.handleOrientation = (e) => {
      if (this.locationMode !== 'onsite') return;
      // calculateBearing と同じ「真北=0、東=90」の時計回り角度にそろえる。
      let heading = null;
      if (typeof e.webkitCompassHeading === 'number') {
        heading = e.webkitCompassHeading; // iOSはすでに時計回りの方位
      } else if (typeof e.alpha === 'number') {
        const screenAngle = Number(screen.orientation?.angle ?? window.orientation ?? 0);
        heading = (360 - e.alpha + screenAngle + 360) % 360;
      }
      if (heading !== null && heading !== undefined && !Number.isNaN(heading)) {
        this.setHeading(this.smoothHeading(heading), 'sensor');
      }
    };

    // iOS 13+ 以外は許可不要とみなす
    const needsPermission = typeof DeviceOrientationEvent !== 'undefined'
      && typeof DeviceOrientationEvent.requestPermission === 'function';
    this.orientationPermission = needsPermission ? 'unknown' : 'not-required';
    if (!needsPermission && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => this.handleOrientation(e), true);
      this.orientationListenerAttached = true;
    }

    this.updateLocationStatus();
  }

  // iOS などユーザー操作起点のセンサー許可を要求し、現地モードを開始する
  async enableOnsiteMode() {
    const needsPermission = typeof DeviceOrientationEvent !== 'undefined'
      && typeof DeviceOrientationEvent.requestPermission === 'function';
    if (needsPermission) {
      try {
        const res = await DeviceOrientationEvent.requestPermission();
        this.orientationPermission = res === 'granted' ? 'granted' : 'denied';
        if (res === 'granted' && !this.orientationListenerAttached) {
          window.addEventListener('deviceorientation', (e) => this.handleOrientation(e), true);
          this.orientationListenerAttached = true;
        }
      } catch (err) {
        console.warn('方位センサー許可エラー:', err);
        this.orientationPermission = 'denied';
      }
    }
    this.locationMode = 'onsite';
    this.startGeolocationWatch();
    this.updateLocationStatus();
    this.updateLocationModeUI();
  }

  enableExploreMode() {
    this.locationMode = 'explore';
    this.stopGeolocationWatch();
    this.updateLocationStatus();
    this.updateLocationModeUI();
  }

  startGeolocationWatch() {
    if (!navigator.geolocation || this.geolocationWatchId !== null) return;
    this.geolocationWatchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (this.locationMode !== 'onsite') return;
        this.userPos.latitude = pos.coords.latitude;
        this.userPos.longitude = pos.coords.longitude;
        this.updateLocationStatus();
      },
      (err) => {
        console.info('位置情報を利用できません:', err.message);
        this.showARHint('現在地を取得できません。画面をドラッグして体験するか、位置情報の許可を確認してください。');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 }
    );
  }

  stopGeolocationWatch() {
    if (this.geolocationWatchId === null || !navigator.geolocation) return;
    navigator.geolocation.clearWatch(this.geolocationWatchId);
    this.geolocationWatchId = null;
  }

  smoothHeading(nextHeading) {
    if (this.headingSource !== 'sensor') return nextHeading;
    const currentRad = this.deg2rad(this.heading);
    const nextRad = this.deg2rad(nextHeading);
    const x = Math.cos(currentRad) * 0.72 + Math.cos(nextRad) * 0.28;
    const y = Math.sin(currentRad) * 0.72 + Math.sin(nextRad) * 0.28;
    return (this.rad2deg(Math.atan2(y, x)) + 360) % 360;
  }

  updateLocationModeUI() {
    const onsiteBtn = document.getElementById('btn-mode-onsite');
    const exploreBtn = document.getElementById('btn-mode-explore');
    if (onsiteBtn) onsiteBtn.classList.toggle('active', this.locationMode === 'onsite');
    if (exploreBtn) exploreBtn.classList.toggle('active', this.locationMode === 'explore');
  }

  // 洪水選択時のみ「概念イメージ表示」トグルを見せる
  updateFloodConceptToggleVisibility() {
    const wrap = document.getElementById('flood-concept-toggle-wrap');
    if (!wrap) return;
    const show = this.currentLayer === 'disaster' && this.currentHazardType === 'flood';
    wrap.classList.toggle('hidden', !show);
    if (!show) {
      this.showFloodConceptImage = false;
      const chk = document.getElementById('chk-flood-concept');
      if (chk) chk.checked = false;
    }
  }

  updateLocationStatus() {
    const latStr = this.userPos.latitude.toFixed(4);
    const lngStr = this.userPos.longitude.toFixed(4);
    const modeTag = this.locationMode === 'onsite' ? '現地GPS' : '地図探索';
    this.locationText.textContent = `${modeTag}｜${latStr}, ${lngStr}`;

    if (this.userMapMarker) {
      this.userMapMarker.setLatLng([this.userPos.latitude, this.userPos.longitude]);
      if (this.map && this.viewMode === 'map') {
        this.map.panTo([this.userPos.latitude, this.userPos.longitude]);
      }
    }

    this.updateLayerUI();
    this.updateMapSpotPreview(this.selectedSpot);
  }

  updateLayerUI() {
    const banner = this.disasterBanner;
    document.getElementById('app-container')?.classList.toggle('religious-layer', this.currentLayer === 'religious');
    document.getElementById('app-container')?.classList.toggle('castle-layer', this.currentLayer === 'castle');
    if (this.selectedSpot && this.selectedSpot.category !== this.currentLayer) {
      this.clearMapSpotSelection();
    }
    if (this.currentLayer === 'disaster') {
      this.mapSpotsPanel?.classList.add('hidden');
      this.openSpotsButton?.classList.remove('active');
      this.openSpotsButton?.setAttribute('aria-pressed', 'false');
      banner?.classList.remove('hidden');
      this.reopenHazardSheetButton?.classList.add('hidden');
      document.getElementById('explore-quick-actions')?.classList.add('hidden');
      this.updateFloodConceptToggleVisibility();

      // 避難所データは公式一次資料で未検証のため、具体的な方向・距離の案内を一時停止。
      // 公式データで施設名・座標・対象災害・種別を確認後に再有効化する。
      if (this.shelterGuideText) {
        this.shelterGuideText.innerHTML = `<i data-lucide="info"></i> 避難所情報は現在確認中です。災害時は<a href="https://www.city.osaka.lg.jp/kikikanrishitsu/page/0000349214.html" target="_blank" rel="noreferrer" style="color:#93c5fd;">大阪市の最新避難所情報</a>を確認してください。`;
      }
      this.updateAttribution('防災ハザード（公式出典: 国交省・国土地理院）', 'https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/opendata.html');
    } else {
      banner?.classList.add('hidden');
      this.reopenHazardSheetButton?.classList.add('hidden');
      document.getElementById('explore-quick-actions')?.classList.remove('hidden');
    }

    // 地図ツールは地図モードかつ歴史/地域で表示
    if (this.viewMode === 'map' && this.currentLayer !== 'disaster') {
      this.eraTimelineBar?.classList.add('hidden');
      this.reopenEraPanelButton?.classList.remove('hidden');
    } else if (this.currentLayer === 'disaster') {
      this.eraTimelineBar?.classList.add('hidden');
      this.reopenEraPanelButton?.classList.add('hidden');
    }

    this.renderMapMarkers();
    if (window.lucide) lucide.createIcons();
  }

  renderLoop() {
    if (this.viewMode === 'ar') {
      this.ctx.clearRect(0, 0, this.viewW, this.viewH);
      this.renderedPins = [];

      // AR開始前は操作選択に集中できるよう、背景のピンを描かない。
      if (!this.cameraActive && !this.demoArActive) {
        requestAnimationFrame(() => this.renderLoop());
        return;
      }

      // 防災AR: 洪水を選択中かつユーザーが概念イメージ表示をONにした場合のみ水面を描画。
      // 津波は洪水用イメージを流用しない。土砂災害は水面表現を一切描かない。
      if (this.currentLayer === 'disaster'
        && this.currentHazardType === 'flood'
        && this.showFloodConceptImage) {
        this.drawARFloodWaterline();
      }

      const filteredSpots = this.getPointSpots()
        .filter(s => s.category === this.currentLayer)
        .sort((a, b) => this.calculateDistance(this.userPos.latitude, this.userPos.longitude, a.coordinate.latitude, a.coordinate.longitude)
          - this.calculateDistance(this.userPos.latitude, this.userPos.longitude, b.coordinate.latitude, b.coordinate.longitude));
      // 近い順に配置し、近いスポットが優先的に見やすい位置を取れるようにする
      const offscreen = [];
      filteredSpots.forEach(spot => {
        const result = this.drawARSpotMarker(spot);
        if (result && result.offscreen) offscreen.push(result);
      });
      this.drawAROffscreenCues(offscreen);
      const now = Date.now();
      if (now - this.lastArHudUpdate > 150) {
        this.updateARHud(filteredSpots);
        this.lastArHudUpdate = now;
      }
    }

    requestAnimationFrame(() => this.renderLoop());
  }

  updateARHud(spots) {
    if (!this.arHud || this.arHud.classList.contains('hidden')) return;
    if (this.arHeadingText) {
      this.arHeadingText.textContent = `${this.getHeadingDirectionName(this.heading)} ${Math.round(this.heading)}°`;
    }
    const ranked = spots.map((spot) => {
      const distance = this.calculateDistance(this.userPos.latitude, this.userPos.longitude, spot.coordinate.latitude, spot.coordinate.longitude);
      const bearing = this.calculateBearing(this.userPos.latitude, this.userPos.longitude, spot.coordinate.latitude, spot.coordinate.longitude);
      let angle = bearing - this.heading;
      while (angle < -180) angle += 360;
      while (angle > 180) angle -= 360;
      return { spot, distance, angle };
    }).sort((a, b) => a.distance - b.distance);

    if (this.arNearbyCount) this.arNearbyCount.textContent = `このレイヤーのスポット ${ranked.length}件`;
    if (!this.arDirectionCue) return;
    if (!ranked.length) {
      this.arDirectionCue.textContent = 'このレイヤーには表示できる地点がありません';
      this.arDirectionCue.dataset.direction = 'none';
      this.hideArDiscoveryCard();
      return;
    }
    const nearest = ranked[0];
    const inView = Math.abs(nearest.angle) <= 42.5;
    const direction = inView ? '正面' : nearest.angle < 0 ? '左' : '右';
    const arrow = inView ? '◎' : nearest.angle < 0 ? '←' : '→';
    this.arDirectionCue.textContent = `${arrow} ${direction}：${nearest.spot.name}（約${this.formatDistance(nearest.distance)}）`;
    this.arDirectionCue.dataset.direction = inView ? 'front' : nearest.angle < 0 ? 'left' : 'right';
    this.updateArDiscoveryCard(nearest, inView);
  }

  updateArDiscoveryCard(nearest, inView) {
    if (!this.arDiscoveryCard || this.arDiscoveryDismissed) return;
    if (!this.arDiscoverySpotId && nearest.distance <= 1800) {
      this.showArDiscoveryCard(nearest.spot, nearest.distance, inView);
      return;
    }
    if (this.arDiscoverySpotId === nearest.spot.id) {
      this.arDiscoveryMeta.textContent = `${inView ? '正面' : nearest.angle < 0 ? '左方向' : '右方向'}・約${this.formatDistance(nearest.distance)}`;
    }
  }

  showArDiscoveryCard(spot, distance = 0, inView = true) {
    if (!this.arDiscoveryCard || !spot) return;
    this.selectedSpot = spot;
    this.arDiscoverySpotId = spot.id;
    this.arDiscoveryDismissed = false;
    const categoryLabel = spot.category === 'castle' ? '城' : spot.category === 'religious' ? '寺社' : spot.category === 'community' ? '地域' : '歴史';
    const mediaCount = (spot.historicalMaterials?.length || 0) + (spot.mediaAssets?.length || 0);
    const materialButton = document.getElementById('btn-ar-card-materials');
    const threeButton = document.getElementById('btn-ar-card-three');
    const visitButton = document.getElementById('btn-ar-card-visit');

    if (this.arDiscoveryThumb) {
      this.arDiscoveryThumb.textContent = categoryLabel;
      this.arDiscoveryThumb.dataset.category = spot.category || 'history';
    }
    if (this.arDiscoveryMeta) this.arDiscoveryMeta.textContent = `${inView ? '正面' : '方向を探す'}・約${this.formatDistance(distance)}`;
    if (this.arDiscoveryTitle) this.arDiscoveryTitle.textContent = spot.name || '歴史スポット';
    if (this.arDiscoverySummary) this.arDiscoverySummary.textContent = spot.summary || spot.description || 'この場所の物語を見つけました。';

    this.arDiscoveryCard.dataset.category = spot.category || 'history';
    this.arDiscoveryCard.classList.toggle('has-materials', mediaCount > 0);
    this.arDiscoveryCard.classList.toggle('has-visit', this.isVisited(spot));
    const routeSteps = this.arDiscoveryRoute?.querySelectorAll('span') || [];
    routeSteps[1]?.classList.toggle('is-ready', mediaCount > 0);
    routeSteps[2]?.classList.toggle('is-ready', !spot.isAreaHazard);
    if (materialButton) materialButton.querySelector('span').textContent = mediaCount > 0 ? `資料を見る（${mediaCount}）` : '場所の資料';
    if (threeButton) threeButton.classList.toggle('hidden', Boolean(spot.isAreaHazard));
    if (visitButton) {
      visitButton.classList.toggle('is-visited', this.isVisited(spot));
      visitButton.querySelector('span').textContent = this.isVisited(spot) ? '巡り帳に記録済み・メモを見る' : 'この場所を巡り帳に記録';
    }
    this.arDiscoveryCard.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  hideArDiscoveryCard() {
    this.arDiscoverySpotId = null;
    this.arDiscoveryCard?.classList.add('hidden');
  }

  formatDistance(distance) {
    return distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${Math.max(1, Math.round(distance))}m`;
  }

  drawARFloodWaterline() {
    const ctx = this.ctx;
    const w = this.viewW;
    const h = this.viewH;
    const waterY = h * 0.58;

    const grad = ctx.createLinearGradient(0, waterY, 0, h);
    grad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
    grad.addColorStop(1, 'rgba(185, 28, 28, 0.7)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, waterY, w, h - waterY);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(254, 202, 202, 0.9)';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    ctx.moveTo(0, waterY);
    ctx.lineTo(w, waterY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText('⚠ シミュレーションイメージ', 20, waterY - 30);
    ctx.font = '14px sans-serif';
    ctx.fillText('この高さは実際の想定浸水深を示していません', 20, waterY - 10);
    ctx.fillText('正確な想定浸水深は地図表示の公式ハザードタイルで確認してください', 20, waterY + 16);
    ctx.shadowBlur = 0;
  }

  drawARSpotMarker(spot) {
    const distanceMeters = this.calculateDistance(
      this.userPos.latitude, this.userPos.longitude,
      spot.coordinate.latitude, spot.coordinate.longitude
    );

    const bearing = this.calculateBearing(
      this.userPos.latitude, this.userPos.longitude,
      spot.coordinate.latitude, spot.coordinate.longitude
    );

    let angleDiff = bearing - this.heading;
    while (angleDiff < -180) angleDiff += 360;
    while (angleDiff > 180) angleDiff -= 360;

    const fov = 65;
    // 視野外のスポットは画面端の方向キューに回す（完全に消さない）
    if (Math.abs(angleDiff) > fov / 2 + 10) {
      return { offscreen: true, spot, angleDiff, distanceMeters };
    }

    const w = this.viewW;
    const h = this.viewH;
    let screenX = (w / 2) + (angleDiff / (fov / 2)) * (w / 2);

    // 距離に応じた遠近感。近いほど大きく・低く、遠いほど小さく・水平線寄りに描く。
    const near = 30;      // これより近ければ最大サイズ
    const far = 1500;     // これより遠ければ最小サイズ
    const clamped = Math.min(Math.max(distanceMeters, near), far);
    // 対数スケールにすると、数十m〜数kmの幅を自然に圧縮できる
    const t = Math.log(clamped / near) / Math.log(far / near); // 0(近い)〜1(遠い)
    const scale = 1.05 - 0.45 * t; // 1.05倍〜0.6倍
    const baseScreenY = (h * 0.52) - t * (h * 0.16);
    let screenY = baseScreenY;

    const poleH = Math.round(40 * scale);

    // フォント寸法からカード高さを積み上げて決める。
    // 固定値だと縮小時に距離テキストが枠外へはみ出すため。
    const pad = Math.round(10 * scale);
    const badgeFont = Math.max(8, Math.round(10 * scale));
    const titleFont = Math.max(10, Math.round(12 * scale));
    const metaFont = Math.max(9, Math.round(10 * scale));
    const gap = Math.round(5 * scale);
    const badgeH = spot.eraLabel ? badgeFont + 6 : 0;

    // カード幅は画面幅も超えないようにする
    const cardW = Math.min(Math.round(190 * scale), w - 16);
    const cardH = pad + badgeH + (spot.eraLabel ? gap : 0) + titleFont + gap + metaFont + pad;
    const cardX = -cardW / 2;
    const cardY = -cardH;

    // カードが画面左右で見切れないよう、中心Xを内側へ寄せる
    const half = cardW / 2;
    screenX = Math.min(Math.max(screenX, half + 8), w - half - 8);

    // 近接スポットのカードが重ならないよう、上下交互に候補位置をずらして空きを探す。
    // 候補が尽きた場合は、最も重なりが小さい位置を選ぶ。
    const step = cardH + 12;
    const minY = 150;
    // 方向キュー（h*0.72付近）とフッターを避けつつ、下の空き領域も使えるようにする
    const maxY = h * 0.68;
    const overlapAreaAt = (y) => {
      const cx = screenX + cardX;
      const cy = y + cardY;
      const cw = cardW;
      const ch = cardH + poleH;
      let area = 0;
      this.renderedPins.forEach(({ bounds }) => {
        const ox = Math.min(cx + cw, bounds.x + bounds.width) - Math.max(cx, bounds.x);
        const oy = Math.min(cy + ch, bounds.y + bounds.height) - Math.max(cy, bounds.y);
        if (ox > 0 && oy > 0) area += ox * oy;
      });
      return area;
    };

    let best = { y: screenY, area: Infinity };
    for (let attempt = 0; attempt < 14; attempt++) {
      // 0, +1, -1, +2, -2 ... の順に上下へ探る
      const k = Math.ceil(attempt / 2) * (attempt % 2 === 1 ? 1 : -1);
      const candidateY = baseScreenY + k * step;
      if (candidateY < minY || candidateY > maxY) continue;
      const area = overlapAreaAt(candidateY);
      if (area === 0) { best = { y: candidateY, area: 0 }; break; }
      if (area < best.area) best = { y: candidateY, area };
    }
    screenY = best.y;

    // 空き位置が見つからない場合、カードを重ねて潰さず「点マーカー」に落とす。
    // 画面が狭いほどカード表示は近いスポットに絞られる。
    if (best.area > 0) {
      this.drawARDotMarker(spot, screenX, baseScreenY, scale, t, distanceMeters);
      return { offscreen: false, collapsed: true };
    }

    const ctx = this.ctx;

    let color = '#d95d20';
      if (spot.category === 'community') color = '#277c78';
      if (spot.category === 'religious') color = '#b45309';
      if (spot.category === 'castle') color = '#7c3aed';
      if (spot.category === 'disaster') color = '#ef4444';

    ctx.save();
    ctx.translate(screenX, screenY);
    // 遠いスポットはわずかに透過させ、奥行きを感じさせる
    ctx.globalAlpha = 1 - 0.35 * t;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, poleH);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, 3 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, poleH, Math.max(4, 6 * scale), 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    this.drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 10 * scale);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    let textTop = cardY + pad;

    // 時代ラベルは実測幅に合わせたバッジにする（機械的な文字切りをやめる）
    if (spot.eraLabel) {
      ctx.font = `bold ${badgeFont}px sans-serif`;
      const badgeText = this.truncateToWidth(ctx, this.shortEraLabel(spot.eraLabel), cardW - pad * 2 - 6);
      const badgeW = ctx.measureText(badgeText).width + 10;
      ctx.fillStyle = color;
      this.drawRoundedRect(ctx, cardX + pad, textTop, badgeW, badgeH, 3);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.fillText(badgeText, cardX + pad + 5, textTop + badgeFont + 1);
      textTop += badgeH + gap;
    }

    // スポット名も実測幅で省略する
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${titleFont}px sans-serif`;
    const titleText = this.truncateToWidth(ctx, spot.name, cardW - pad * 2);
    ctx.fillText(titleText, cardX + pad, textTop + titleFont);
    textTop += titleFont + gap;

    ctx.fillStyle = '#94a3b8';
    ctx.font = `${metaFont}px sans-serif`;
    ctx.fillText(`約${this.formatDistance(distanceMeters)}・タップで詳しく`, cardX + pad, textTop + metaFont);

    ctx.restore();

    this.renderedPins.push({
      spot,
      bounds: {
        x: screenX + cardX,
        y: screenY + cardY,
        width: cardW,
        height: cardH + poleH
      }
    });
    return { offscreen: false };
  }

  // カードを置く空きがないスポットは、小さな点と短い名前だけで示す。
  // タップ判定は残すので、詳細は開ける。
  drawARDotMarker(spot, screenX, screenY, scale, t, distanceMeters) {
    const ctx = this.ctx;
    let color = '#d95d20';
      if (spot.category === 'community') color = '#277c78';
      if (spot.category === 'religious') color = '#b45309';
      if (spot.category === 'castle') color = '#7c3aed';
      if (spot.category === 'disaster') color = '#ef4444';

    const r = Math.max(5, 7 * scale);
    ctx.save();
    ctx.globalAlpha = 1 - 0.35 * t;
    ctx.beginPath();
    ctx.arc(screenX, screenY, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const font = Math.max(9, Math.round(10 * scale));
    ctx.font = `bold ${font}px sans-serif`;
    ctx.textAlign = 'center';
    const label = this.truncateToWidth(ctx, spot.name, 110);
    const tw = ctx.measureText(label).width;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    this.drawRoundedRect(ctx, screenX - tw / 2 - 5, screenY + r + 3, tw + 10, font + 7, 4);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, screenX, screenY + r + font + 7);
    ctx.restore();

    this.renderedPins.push({
      spot,
      bounds: {
        x: screenX - Math.max(r, tw / 2 + 5),
        y: screenY - r,
        width: Math.max(r * 2, tw + 10),
        height: r + font + 12
      }
    });
  }

  // ---- 簡易3Dビュー ----
  // 建物形状は復元せず、実測座標にもとづく「位置関係の模式図」に徹する。
  // 高さは標高（elevationMeter）のみを反映し、建物高さは表現しない。
  async openThreeView(spot) {
    const THREE = await this.loadThree();
    if (!THREE) {
      this.setMapNavigationStatus?.('3D表示の読み込みに失敗しました', 'error');
      return;
    }
    document.getElementById('spot-modal')?.classList.add('hidden');
    this.threeOverlay.classList.remove('hidden');

    const center = spot || this.selectedSpot || { coordinate: this.userPos, name: '現在地' };
    this.threeFocusSpot = center;
    this.selectedSpot = center;
    const holder = this.threeHolder;
    holder.innerHTML = '';

    const width = holder.clientWidth || window.innerWidth;
    const height = holder.clientHeight || Math.round(window.innerHeight * 0.55);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 20000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    holder.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(200, 400, 200);
    scene.add(dir);

    const cLat = center.coordinate.latitude;
    const cLon = center.coordinate.longitude;
    const mPerDegLat = 111320;
    const mPerDegLon = 111320 * Math.cos(this.deg2rad(cLat));

    // 地面グリッド（1マス=100m相当）
    const grid = new THREE.GridHelper(2000, 20, 0x334155, 0x1e293b);
    scene.add(grid);

    // --- 実測の建物輪郭を立体化する ---
    // OSMの輪郭ポリゴンを押し出し、実際の建物の形を再現する。
    // 高さは height タグ（実測）を優先し、無い場合は階数から推定する。
    let builtCount = 0;
    let measuredCount = 0;
    const centerName = center.name || '';

    OSM_BUILDINGS.forEach(b => {
      if (!b.geometry || b.geometry.length < 3) return;

      // 中心からの相対メートル座標へ変換
      const pts = b.geometry.map(([lat, lon]) => new THREE.Vector2(
        (lon - cLon) * mPerDegLon,
        (lat - cLat) * mPerDegLat
      ));
      // 範囲外は描かない（描画負荷を抑える）
      const near = pts.some(p => Math.abs(p.x) < 900 && Math.abs(p.y) < 900);
      if (!near) return;

      const shape = new THREE.Shape(pts);
      const geo = new THREE.ExtrudeGeometry(shape, { depth: b.height, bevelEnabled: false });
      // ExtrudeGeometryはXY平面に作られるので、地面（XZ平面）へ倒す
      geo.rotateX(-Math.PI / 2);

      // 中心スポットに対応する建物と、歴史的建造物を強調する
      const isFocus = Boolean(b.name && centerName && (centerName.includes(b.name) || b.name.includes(centerName.replace(/^大阪城\s*/, ''))));
      const color = isFocus ? 0xfbbf24 : b.historic ? 0xd97706 : 0x64748b;

      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        color,
        roughness: 0.72,
        metalness: 0.05,
        // 高さが推定値の建物は少し透かして「確かではない」ことを示す
        transparent: b.heightSource !== 'measured',
        opacity: b.heightSource === 'measured' ? 1 : 0.82
      }));
      scene.add(mesh);

      // 輪郭線を足して形を読み取りやすくする
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: isFocus ? 0xfff7ed : 0x94a3b8, transparent: true, opacity: 0.5 })
      );
      scene.add(edges);

      builtCount++;
      if (b.heightSource === 'measured') measuredCount++;
    });

    const focusNameEl = document.getElementById('three-focus-name');
    const focusSummaryEl = document.getElementById('three-focus-summary');
    const buildingCountEl = document.getElementById('three-building-count');
    const materialCountEl = document.getElementById('three-material-count');
    if (focusNameEl) focusNameEl.textContent = center.name || '現在地';
    if (focusSummaryEl) focusSummaryEl.textContent = center.summary || '現在の建物と周辺スポットの位置関係を見ています。';
    if (buildingCountEl) buildingCountEl.textContent = String(builtCount);
    if (materialCountEl) materialCountEl.textContent = String((center.historicalMaterials?.length || 0) + (center.mediaAssets?.length || 0));

    const colorFor = (cat) => cat === 'community' ? 0x10b981 : cat === 'disaster' ? 0xef4444 : 0xf59e0b;
    const labels = [];

    this.getPointSpots().forEach(s => {
      const dx = (s.coordinate.longitude - cLon) * mPerDegLon;
      const dz = -(s.coordinate.latitude - cLat) * mPerDegLat;
      if (Math.abs(dx) > 3000 || Math.abs(dz) > 3000) return;

      const isCenter = s.id === center.id;
      // 建物を主役にするため、スポット標識は細いピンにとどめる
      const h = isCenter ? 70 : 45;
      const geo = new THREE.CylinderGeometry(1.6, 1.6, h, 8);
      const mat = new THREE.MeshStandardMaterial({
        color: colorFor(s.category),
        emissive: isCenter ? 0x664400 : 0x000000,
        roughness: 0.5
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(dx, h / 2, dz);
      scene.add(mesh);

      // 名前をスプライトで表示（建物を隠さない大きさに抑える）
      const cv = document.createElement('canvas');
      const fontPx = 26;
      const g = cv.getContext('2d');
      g.font = `bold ${fontPx}px sans-serif`;
      const tw = g.measureText(s.name).width;
      cv.width = Math.ceil(tw + 20);
      cv.height = fontPx + 14;
      const g2 = cv.getContext('2d');
      g2.fillStyle = 'rgba(15,23,42,0.8)';
      g2.fillRect(0, 0, cv.width, cv.height);
      g2.font = `bold ${fontPx}px sans-serif`;
      g2.fillStyle = '#ffffff';
      g2.textBaseline = 'middle';
      g2.fillText(s.name, 10, cv.height / 2);
      const tex = new THREE.CanvasTexture(cv);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: tex, depthTest: false, transparent: true, opacity: isCenter ? 1 : 0.9
      }));
      sprite.position.set(dx, h + 14, dz);
      // ワールド単位に対して控えめなスケール（従来の約1/4）
      const labelScale = isCenter ? 0.17 : 0.14;
      sprite.scale.set(cv.width * labelScale, cv.height * labelScale, 1);
      scene.add(sprite);
      labels.push(sprite);
    });

    // カメラ操作（ドラッグ回転・ホイールズーム）
    // 建物が見える距離・角度から始める
    const state = { theta: Math.PI / 4, phi: Math.PI / 3.6, radius: 520, running: true };
    const applyCamera = () => {
      camera.position.set(
        state.radius * Math.sin(state.phi) * Math.cos(state.theta),
        state.radius * Math.cos(state.phi),
        state.radius * Math.sin(state.phi) * Math.sin(state.theta)
      );
      camera.lookAt(0, 0, 0);
    };
    applyCamera();

    let dragging = false; let lastX = 0; let lastY = 0;
    const el = renderer.domElement;
    el.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener('pointerup', () => { dragging = false; });
    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      state.theta += (e.clientX - lastX) * 0.008;
      state.phi = Math.min(Math.PI / 2.05, Math.max(0.25, state.phi - (e.clientY - lastY) * 0.006));
      lastX = e.clientX; lastY = e.clientY;
      applyCamera();
    });
    el.addEventListener('wheel', e => {
      e.preventDefault();
      state.radius = Math.min(3000, Math.max(120, state.radius + e.deltaY));
      applyCamera();
    }, { passive: false });

    const tick = () => {
      if (!state.running) return;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    const srcEl = document.getElementById('three-credit-source');
    if (srcEl) {
      srcEl.innerHTML = `中心: ${center.name}｜建物${builtCount}棟（うち高さ実測${measuredCount}棟）｜`
        + `建物形状・高さ: <a href="${OSM_BUILDINGS_META.licenseUrl}" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors（${OSM_BUILDINGS_META.license}）</a>`;
    }
    const caveatEl = document.querySelector('#three-credit .overlay-credit-caveat');
    if (caveatEl) {
      caveatEl.textContent = '建物の輪郭と高さは、現存する建物の実測データ（OpenStreetMap）です。'
        + '半透明の建物は高さが実測ではなく、階数などからの推定値です。'
        + 'いずれも「現在の姿」であり、江戸期など過去の建物を復元したものではありません。';
    }

    this.threeState = { state, renderer, scene, center };
  }

  closeThreeView() {
    if (this.threeState) {
      this.threeState.state.running = false;
      this.threeState.renderer.dispose();
      this.threeState = null;
    }
    this.threeOverlay?.classList.add('hidden');
    if (this.threeHolder) this.threeHolder.innerHTML = '';
    this.threeFocusSpot = null;
  }

  // Three.js は必要になったときだけ読み込む（初期表示を重くしない）
  async loadThree() {
    if (window.__THREE__) return window.__THREE__;
    try {
      const mod = await import('https://unpkg.com/three@0.160.0/build/three.module.js');
      window.__THREE__ = mod;
      return mod;
    } catch (e) {
      console.error('Three.js の読み込みに失敗しました', e);
      return null;
    }
  }

  // ---- 年代別航空写真をARに重ねる ----
  // 航空写真は位置合わせ済み（georeferenced）なので、名所絵より正確に重なる。
  // ただし真上から撮った写真なので、地上視点の風景とは見え方が違う点を明示する。
  openAerialOverlay(spot) {
    if (!this.aerialOverlay) return;
    this.aerialSpot = spot || this.selectedSpot;
    document.getElementById('spot-modal')?.classList.add('hidden');
    this.aerialOverlay.classList.remove('hidden');
    this.renderAerialEraButtons();
    this.drawAerialTiles();
  }

  renderAerialEraButtons() {
    if (!this.aerialEraRow) return;
    const entries = Object.entries(HISTORICAL_MAP_TILES)
      .filter(([, def]) => def.materialType === 'aerial_photo');
    this.aerialEraRow.innerHTML = entries.map(([key, def]) => `
      <button type="button" class="aerial-era-chip${key === this.aerialEraKey ? ' active' : ''}" data-aerial-era="${key}">
        ${def.year}
      </button>`).join('');
    this.aerialEraRow.querySelectorAll('[data-aerial-era]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.aerialEraKey = btn.dataset.aerialEra;
        this.renderAerialEraButtons();
        this.drawAerialTiles();
      });
    });
  }

  // 緯度経度からWebメルカトルのタイル座標を求める
  latLonToTile(lat, lon, z) {
    const latRad = this.deg2rad(lat);
    const n = Math.pow(2, z);
    return {
      x: ((lon + 180) / 360) * n,
      y: ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
    };
  }

  async drawAerialTiles() {
    const def = HISTORICAL_MAP_TILES[this.aerialEraKey];
    const canvas = this.aerialCanvas;
    if (!def || !canvas) return;

    const spot = this.aerialSpot || this.selectedSpot;
    const lat = spot?.coordinate?.latitude ?? this.userPos.latitude;
    const lon = spot?.coordinate?.longitude ?? this.userPos.longitude;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = Math.min(window.innerWidth - 24, 520);
    const cssH = Math.round(cssW * 0.75);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    // 年代別の航空写真は、場所やズームによって提供がまばら。
    // 高いズームから順に下げて、実際に取得できた段階で描画する。
    this.setAerialCredit(def, '読み込み中…');
    const tileSize = 256;
    const maxZ = Math.min(def.maxNativeZoom ?? 17, 17);
    const minZ = Math.max(def.minZoom ?? 10, 10);

    let loaded = 0;
    let failed = 0;
    let usedZoom = null;

    for (let z = maxZ; z >= minZ; z--) {
      const t = this.latLonToTile(lat, lon, z);
      const centerPx = { x: t.x * tileSize, y: t.y * tileSize };
      const originPx = { x: centerPx.x - cssW / 2, y: centerPx.y - cssH / 2 };
      const x0 = Math.floor(originPx.x / tileSize);
      const y0 = Math.floor(originPx.y / tileSize);
      const x1 = Math.floor((originPx.x + cssW) / tileSize);
      const y1 = Math.floor((originPx.y + cssH) / tileSize);

      let zLoaded = 0;
      let zFailed = 0;
      const drawOps = [];

      await Promise.all((() => {
        const jobs = [];
        for (let tx = x0; tx <= x1; tx++) {
          for (let ty = y0; ty <= y1; ty++) {
            const url = def.url
              .replace('{z}', z).replace('{x}', tx).replace('{y}', ty)
              .replace('{s}', 'a');
            jobs.push(new Promise(resolve => {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => {
                drawOps.push([img, tx * tileSize - originPx.x, ty * tileSize - originPx.y]);
                zLoaded++;
                resolve();
              };
              img.onerror = () => { zFailed++; resolve(); };
              img.src = url;
            }));
          }
        }
        return jobs;
      })());

      if (zLoaded > 0) {
        drawOps.forEach(([img, dx, dy]) => ctx.drawImage(img, dx, dy, tileSize, tileSize));
        loaded = zLoaded;
        failed = zFailed;
        usedZoom = z;
        break;
      }
    }

    if (loaded === 0) {
      ctx.fillStyle = 'rgba(15,23,42,0.9)';
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.fillStyle = '#fca5a5';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('この年代・この場所の航空写真はありません', cssW / 2, cssH / 2);
      this.setAerialCredit(def, 'データなし（別の年代を選んでください）');
    } else {
      // 中心（スポット位置）を示す十字
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.95)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cssW / 2 - 14, cssH / 2); ctx.lineTo(cssW / 2 + 14, cssH / 2);
      ctx.moveTo(cssW / 2, cssH / 2 - 14); ctx.lineTo(cssW / 2, cssH / 2 + 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cssW / 2, cssH / 2, 20, 0, Math.PI * 2);
      ctx.stroke();
      // どの縮尺で取得できたかを正直に伝える（年代により精細さが違うため）
      const zoomNote = usedZoom !== null ? `ズーム${usedZoom}` : '';
      this.setAerialCredit(def, failed > 0
        ? `${loaded}枚表示（${zoomNote}・一部のタイルは提供範囲外）`
        : `${loaded}枚のタイルを表示（${zoomNote}）`);
    }

    canvas.style.opacity = String(this.aerialOpacity);
  }

  setAerialCredit(def, statusText) {
    const titleEl = document.getElementById('aerial-credit-title');
    const sourceEl = document.getElementById('aerial-credit-source');
    const caveatEl = document.getElementById('aerial-credit-caveat');
    if (titleEl) titleEl.textContent = `${def.name}（${def.year}）`;
    if (sourceEl) {
      sourceEl.innerHTML = `${def.attribution}｜出典: <a href="${def.sourceUrl}" target="_blank" rel="noopener noreferrer">${def.sourceName}</a>`;
    }
    if (caveatEl) {
      caveatEl.textContent = '航空写真は位置合わせ済みですが、真上から撮影したものです。地上から見た景色とは見え方が異なります。また撮影年に幅があるため、写っている状態がその年代の一時点を正確に示すとは限りません。';
    }
    if (this.aerialStatus) this.aerialStatus.textContent = statusText || '';
  }

  // 現況写真（ウィキメディア・コモンズ）を表示する。
  // CC BY / CC BY-SA は著作者表示が条件のため、撮影者名を必ず添える。
  renderPresentPhoto(spot) {
    const box = document.getElementById('modal-present-photo');
    if (!box) return;
    const photo = spot.presentPhoto;
    if (!photo) { box.classList.add('hidden'); box.innerHTML = ''; return; }

    const credit = photo.attributionRequired
      ? `撮影: ${photo.author}｜${photo.license}`
      : `${photo.license}（権利者表示は不要）｜提供: ${photo.author}`;

    box.classList.remove('hidden');
    box.innerHTML = `
      <div class="present-photo-label"><i data-lucide="camera"></i> 現在の様子</div>
      <img class="present-photo-img" src="${photo.imageUrl}" alt="${spot.name}の現在の様子" loading="lazy">
      <div class="present-photo-credit">
        ${credit}
        <a href="${photo.sourceUrl}" target="_blank" rel="noopener noreferrer">ウィキメディア・コモンズ</a>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  // 表示モードを切り替える。
  //  artwork: 絵として鑑賞（不透明・画面にフィット）
  //  blend  : カメラ映像に重ねる（透過あり）
  setOverlayViewMode(mode, media = null) {
    this.overlayViewMode = mode;
    const isArtwork = mode === 'artwork';
    document.body.classList.toggle('overlay-artwork', isArtwork);

    if (isArtwork) {
      // 絵はそのまま見せる。透過や回転はいじらない。
      this.overlayState.opacity = 1;
      this.overlayState.scale = 1;
      this.overlayState.rotate = 0;
      this.overlayState.posX = 0;
      this.overlayState.posY = 0;
    } else if (this.overlayState.opacity >= 0.99) {
      this.overlayState.opacity = 0.7;
    }
    this.applyOverlayTransform();

    const slider = this.opacitySlider;
    if (slider) slider.value = String(Math.round(this.overlayState.opacity * 100));
    const val = document.getElementById('opacity-val');
    if (val) val.textContent = `${Math.round(this.overlayState.opacity * 100)}%`;

    document.querySelectorAll('[data-overlay-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.overlayMode === mode);
    });

    const hint = document.getElementById('overlay-mode-hint');
    if (hint) {
      const m = media || this.getPrimaryMedia(this.selectedSpot);
      hint.textContent = isArtwork
        ? 'この資料は測量図ではないため、絵として表示しています。重ねたい場合は「重ねる」を選んでください。'
        : (m?.positionAccuracy === 'reference_only'
            ? '位置は正確に一致しません。雰囲気を重ねて楽しむ表示です。'
            : '現在の風景に重ねて表示しています。ドラッグ・拡大で位置を調整できます。');
    }
  }

  // 重ね合わせ中に出典を常時表示し、資料ごとの「重ならない理由」も明示する。
  // 出典表示はNDLが求めている表記であり、消せないUIとして置く。
  renderOverlayCredit(media) {
    const titleEl = document.getElementById('overlay-credit-title');
    const sourceEl = document.getElementById('overlay-credit-source');
    const caveatEl = document.getElementById('overlay-credit-caveat');
    if (!titleEl || !sourceEl || !caveatEl) return;

    titleEl.textContent = media.title || '資料';

    // 機関名・ライセンス・資料ページへのリンクを必ず添える
    const parts = [];
    if (media.sourceName) parts.push(media.sourceName);
    if (media.date) parts.push(media.date);
    if (media.license) parts.push(media.license);
    sourceEl.innerHTML = `${parts.join('｜')} <a href="${media.sourceUrl}" target="_blank" rel="noopener noreferrer">資料ページ</a>`;

    // 資料種別ごとに、なぜ現実の景観と一致しないのかを具体的に書く
    const caveats = {
      pictorial_map: '名所絵は絵師が構図を整えて描いた作品で、測量図ではありません。建物の位置・大きさ・角度は現実と一致しません。当時の雰囲気を重ねて楽しむための表示です。',
      historical_map: '江戸期の絵図は現代の測量図とは作図方法が異なります。方角や縮尺が場所ごとにずれるため、現在の風景とはぴったり重なりません。',
      aerial_photo: '航空写真は位置合わせ済みですが、撮影高度・角度の違いにより、地上から見た景観とは見え方が異なります。'
    };
    caveatEl.textContent = caveats[media.materialType]
      || '資料と現在の風景は正確には一致しません。参考としてご覧ください。';
  }

  // 指定幅に収まるよう末尾を「…」で省略する（文字数ではなく実測幅で判断）
  truncateToWidth(ctx, text, maxWidth) {
    if (!text) return '';
    if (ctx.measureText(text).width <= maxWidth) return text;
    let lo = 0;
    let hi = text.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (ctx.measureText(text.slice(0, mid) + '…').width <= maxWidth) lo = mid;
      else hi = mid - 1;
    }
    return lo > 0 ? text.slice(0, lo) + '…' : '';
  }

  // 「元和6年（1620年）」のような表記から、バッジ向けの短い見出しを取り出す
  shortEraLabel(label) {
    const paren = label.indexOf('（');
    const head = paren > 0 ? label.slice(0, paren) : label;
    return head.trim() || label;
  }

  // 視野外のスポットを画面端の矢印で示し、どちらを向けばよいか分かるようにする
  drawAROffscreenCues(items) {
    if (!items || !items.length) return;
    const ctx = this.ctx;
    const h = this.viewH;
    const w = this.viewW;

    const left = items.filter(i => i.angleDiff < 0).sort((a, b) => a.distanceMeters - b.distanceMeters);
    const right = items.filter(i => i.angleDiff >= 0).sort((a, b) => a.distanceMeters - b.distanceMeters);

    [['left', left], ['right', right]].forEach(([side, list]) => {
      if (!list.length) return;
      const nearest = list[0];
      const isLeft = side === 'left';
      // カード群と重ならないよう、画面のやや下側に固定する
      const y = h * 0.72;
      const boxH = 40;
      const boxW = 150;
      const x = isLeft ? 10 : w - boxW - 10;

      let color = '#d95d20';
      if (nearest.spot.category === 'community') color = '#277c78';
      if (nearest.spot.category === 'religious') color = '#b45309';
      if (nearest.spot.category === 'castle') color = '#7c3aed';
      if (nearest.spot.category === 'disaster') color = '#ef4444';

      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      this.drawRoundedRect(ctx, x, y, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = isLeft ? 'left' : 'right';
      const arrow = isLeft ? '←' : '→';
      const arrowX = isLeft ? x + 8 : x + boxW - 8;
      ctx.fillText(arrow, arrowX, y + 25);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      const textX = isLeft ? x + 30 : x + 8;
      const textW = boxW - 38;
      ctx.fillText(this.truncateToWidth(ctx, nearest.spot.name, textW), textX, y + 18);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      const more = list.length > 1 ? `ほか${list.length - 1}件` : '';
      ctx.fillText(`約${this.formatDistance(nearest.distanceMeters)} ${more}`.trim(), textX, y + 32);
      ctx.restore();
    });
  }

  drawARShelterMarkers() {
    const ctx = this.ctx;
    this.shelters.forEach(shelter => {
      const dist = this.calculateDistance(
        this.userPos.latitude, this.userPos.longitude,
        shelter.coordinate.latitude, shelter.coordinate.longitude
      );
      const bearing = this.calculateBearing(
        this.userPos.latitude, this.userPos.longitude,
        shelter.coordinate.latitude, shelter.coordinate.longitude
      );

      let angleDiff = bearing - this.heading;
      while (angleDiff < -180) angleDiff += 360;
      while (angleDiff > 180) angleDiff -= 360;

      const fov = 65;
      if (Math.abs(angleDiff) > fov / 2) return;

      const screenX = (this.viewW / 2) + (angleDiff / (fov / 2)) * (this.viewW / 2);
      const screenY = this.viewH * 0.25;

      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
      this.drawRoundedRect(ctx, -75, -20, 150, 36, 18);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`避難所: ${shelter.name.substring(0, 8)}`, 0, -4);
      ctx.font = '9px sans-serif';
      ctx.fillText(`${Math.round(dist)}m (標高${shelter.elevationMeter}m)`, 0, 10);
      ctx.restore();
    });
  }

  handleCanvasClick(e) {
    if (!this.cameraPlaceholder.classList.contains('hidden')) return;

    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let i = this.renderedPins.length - 1; i >= 0; i--) {
      const item = this.renderedPins[i];
      const b = item.bounds;
      if (clickX >= b.x && clickX <= b.x + b.width && clickY >= b.y && clickY <= b.y + b.height) {
        const distance = this.calculateDistance(this.userPos.latitude, this.userPos.longitude, item.spot.coordinate.latitude, item.spot.coordinate.longitude);
        this.showArDiscoveryCard(item.spot, distance, true);
        this.openSpotModal(item.spot);
        break;
      }
    }
  }

  openSpotModal(spot) {
    this.selectedSpot = spot;
    const modal = document.getElementById('spot-modal');
    const media = this.getPrimaryMedia(spot);
    const newlyDiscovered = this.saveDiscoveredSpot(spot);

    document.getElementById('modal-title').textContent = spot.name;
    const discoveryStatus = document.getElementById('modal-discovery-status');
    if (discoveryStatus) {
      discoveryStatus.innerHTML = `<i data-lucide="${newlyDiscovered ? 'stamp' : 'check'}"></i><span>${newlyDiscovered ? '発見ノートに新しく記録しました' : '発見ノートに記録済みです'}</span>`;
      discoveryStatus.classList.toggle('hidden', spot.category === 'disaster');
      discoveryStatus.classList.toggle('is-new', newlyDiscovered);
    }
    this.renderVisitRecordControls(spot);
    // 直感的な信頼度バッジ（✓公式資料確認済み / ◐一部確認済み / △未確認情報を含む など）
    this.renderTrustBadge(spot, media);
    document.getElementById('modal-summary').textContent = spot.summary || '';
    document.getElementById('modal-desc').textContent = `${spot.description || ''}${spot.verificationNote ? `\n\n注意: ${spot.verificationNote}` : ''}`;
    const modalImg = document.getElementById('modal-img');
    const hasVerifiedImage = Boolean(media?.imageUrl && media.imageUrlVerified !== false);
    modalImg.src = hasVerifiedImage ? media.imageUrl : (media?.isHistorical ? '' : PLACEHOLDER_IMAGE_URL);
    modalImg.alt = hasVerifiedImage ? (media?.title || `${spot.name}の画像`) : '画像未検証（資料ページで確認してください）';
    modalImg.classList.toggle('hidden', !hasVerifiedImage);

    // 現況写真は史料と別枠で表示し、必要なら撮影者名も明記する
    this.renderPresentPhoto(spot);

    const eraBadge = document.getElementById('modal-era-badge');
    eraBadge.textContent = spot.eraLabel || '歴史';

    const hazardBox = document.getElementById('modal-hazard-box');
    if (spot.hazardInfo) {
      hazardBox.classList.remove('hidden');
      document.getElementById('modal-hazard-detail').innerHTML = `
        <strong>【${spot.hazardInfo.typeName}】</strong><br>
        ${spot.hazardInfo.description}
      `;
    } else {
      hazardBox.classList.add('hidden');
    }

    document.getElementById('modal-source').textContent = `出典: ${media?.sourceName || spot.source || '未指定'}`;
    document.getElementById('modal-license').textContent = `ライセンス: ${media?.license || spot.license || '未確認'}`;

    const mediaStatus = document.getElementById('modal-media-status');
    if (mediaStatus) {
      mediaStatus.textContent = !media
        ? '表示画像: なし（現地の建造物・遺構を観察するスポットです）'
        : media?.isHistorical && !hasVerifiedImage
        ? `表示画像: 個別画像URL未検証（${media.sourceName}の資料ページで閲覧）`
        : media?.isHistorical
        ? `表示画像: ${MATERIAL_TYPE_LABELS[media.materialType] || media.materialType}（確認済み資料）`
        : '表示画像: イメージ画像（開発用プレースホルダー。史料ではありません）';
      mediaStatus.className = `media-status ${!media || (media?.isHistorical && hasVerifiedImage) ? 'verified' : 'unverified'}`;
    }
    const materialType = document.getElementById('modal-material-type');
    if (materialType) materialType.textContent = `資料種別: ${media ? (media.displayType || MATERIAL_TYPE_LABELS[media.materialType] || media.materialType) : '資料画像なし'}`;
    const positionAccuracy = document.getElementById('modal-position-accuracy');
    if (positionAccuracy) {
      const accuracy = !media
        ? (spot.verification?.coordinate === 'verified' ? '確認済み座標' : '概略位置（現地で位置を確認してください）')
        : media.positionAccuracy === 'reference_only'
          ? '参考資料（現代地図との一致は保証されません）'
          : (media.positionAccuracy || '不明');
      positionAccuracy.textContent = `位置精度: ${accuracy}`;
    }

    const compareButton = document.getElementById('btn-compare-ar');
    compareButton.classList.toggle('hidden', !media?.isHistorical || !hasVerifiedImage);

    // 航空写真は面的なタイルなので、点スポットであれば常に見られる
    const aerialButton = document.getElementById('btn-aerial-ar');
    aerialButton?.classList.toggle('hidden', Boolean(spot.isAreaHazard));
    const threeButton = document.getElementById('btn-view-3d');
    threeButton?.classList.toggle('hidden', Boolean(spot.isAreaHazard));

    this.renderHistoricalMaterials(spot);

    modal.classList.remove('hidden');
    this.updateMapSpotPreview(spot);
    if (window.lucide) lucide.createIcons();
  }

  openTimeTravel(spot = null) {
    if (!this.timeTravelPanel || !this.timeTravelList) return;
    const target = spot || this.spots.find(item => item.id === 'hist-1') || null;
    this.timeTravelPanel.classList.remove('hidden');
    this.timeTravelLocation.textContent = target
      ? `${target.name}｜地図上で確認できる資料と年代別航空写真`
      : '大阪城周辺｜地図上で確認できる資料と年代別航空写真';

    const mapItems = Object.entries(HISTORICAL_MAP_TILES)
      .filter(([key]) => key !== 'present')
      .map(([key, def]) => `<button type="button" class="time-travel-item" data-era="${key}">
        <span class="time-travel-year">${def.year}</span><span><strong>${def.name}</strong><small>位置合わせ済み航空写真・地理院タイル</small></span><i data-lucide="chevron-right"></i>
      </button>`).join('');
    const materials = target?.historicalMaterials || [];
    const materialItems = materials.map(material => `<article class="time-travel-material">
      <span class="time-travel-year">${material.date || '年代未詳'}</span><span><strong>${material.title}</strong><small>${material.displayType || MATERIAL_TYPE_LABELS[material.materialType] || '歴史資料'}｜${material.license || 'ライセンス未確認'}</small><a href="${material.sourceUrl}" target="_blank" rel="noreferrer">NDL資料ページで確認</a></span>
    </article>`).join('');
    this.timeTravelList.innerHTML = `<div class="time-travel-section"><h3>航空写真・現在地図</h3>${mapItems}</div><div class="time-travel-section"><h3>江戸期などの歴史資料</h3>${materialItems || '<p class="material-empty">この地点に紐づく歴史資料は未収録です。地図上の別スポットを選択してください。</p>'}</div><div class="time-travel-section future"><h3>未来のリスク</h3><p>防災タブで洪水・津波・土砂災害の公式ハザード面データを確認できます。避難先の具体案内は未検証のため表示していません。</p></div>`;
    this.timeTravelList.querySelectorAll('[data-era]').forEach(button => button.addEventListener('click', () => {
      this.currentEra = button.dataset.era;
      document.querySelectorAll('.era-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.era === this.currentEra));
      this.updateMapBaseTile(this.currentEra);
    }));
    if (window.lucide) lucide.createIcons();
  }

  closeTimeTravel() {
    this.timeTravelPanel?.classList.add('hidden');
  }

  loadDiscoveredSpotIds() {
    try {
      const saved = JSON.parse(window.localStorage?.getItem('ar-discovered-spots') || '[]');
      return new Set(Array.isArray(saved) ? saved.filter(id => typeof id === 'string') : []);
    } catch (_) {
      return new Set();
    }
  }

  loadVisitRecords() {
    try {
      const saved = JSON.parse(window.localStorage?.getItem('ar-visit-records') || '{}');
      return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
    } catch (_) {
      return {};
    }
  }

  saveVisitRecords() {
    try {
      window.localStorage?.setItem('ar-visit-records', JSON.stringify(this.visitRecords));
    } catch (_) {
      // 保存領域が使えなくても、閲覧中の記録はメモリ上で維持する
    }
  }

  getVisitKind(spot) {
    if (spot?.category === 'castle') return '城';
    if (spot?.category === 'religious') {
      const label = `${spot.religiousType || ''}${spot.name || ''}`;
      return /寺|院/.test(label) && !/神社|神宮|大社|宮/.test(label) ? 'お寺' : '神社';
    }
    return spot?.category === 'community' ? '地域' : '歴史';
  }

  getVisitedSpots() {
    const validIds = new Set(this.getDiscoverableSpots()
      .filter(spot => spot.category === 'castle' || spot.category === 'religious')
      .map(spot => spot.id));
    return Object.entries(this.visitRecords)
      .filter(([id, record]) => validIds.has(id) && record?.visitedAt)
      .map(([id, record]) => ({
        spot: this.spots.find(item => item.id === id),
        record
      }))
      .filter(item => item.spot)
      .sort((a, b) => String(b.record.visitedAt).localeCompare(String(a.record.visitedAt)));
  }

  formatVisitDate(value) {
    if (!value) return '訪問日未記録';
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getVisitStats() {
    const spots = this.getDiscoverableSpots().filter(spot => spot.category === 'castle' || spot.category === 'religious');
    return ['城', 'お寺', '神社'].map(kind => {
      const total = spots.filter(spot => this.getVisitKind(spot) === kind).length;
      const visited = spots.filter(spot => this.getVisitKind(spot) === kind && this.visitRecords[spot.id]?.visitedAt).length;
      return { kind, total, visited };
    });
  }

  isVisited(spot) {
    return Boolean(spot && this.visitRecords[spot.id]?.visitedAt);
  }

  renderVisitRecordControls(spot) {
    if (!this.modalVisitBox || !spot || (spot.category !== 'castle' && spot.category !== 'religious')) {
      this.modalVisitBox?.classList.add('hidden');
      return;
    }
    const record = this.visitRecords[spot.id];
    const visited = Boolean(record?.visitedAt);
    this.modalVisitBox.classList.remove('hidden');
    this.modalVisitStatus.textContent = visited ? `${this.formatVisitDate(record.visitedAt)}に訪問` : '未訪問';
    this.modalVisitStatus.classList.toggle('is-visited', visited);
    this.toggleVisitButton.classList.toggle('is-visited', visited);
    this.toggleVisitButton.innerHTML = `<i data-lucide="${visited ? 'rotate-ccw' : 'map-pin-check'}"></i><span>${visited ? '訪問記録を取り消す' : '訪問したら記録する'}</span>`;
    this.modalVisitForm.classList.toggle('hidden', !visited);
    this.modalVisitNote.value = visited ? String(record.note || '') : '';
    if (window.lucide) lucide.createIcons();
  }

  toggleVisitRecord() {
    const spot = this.selectedSpot;
    if (!spot || (spot.category !== 'castle' && spot.category !== 'religious')) return;
    if (this.isVisited(spot)) {
      delete this.visitRecords[spot.id];
      this.saveVisitRecords();
      this.updateVisitUI();
      this.renderVisitRecordControls(spot);
      this.showDiscoveryToast({ ...spot, name: `${spot.name}の訪問記録を取り消しました`, toastTitle: '巡り帳を更新' });
      return;
    }
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    this.visitRecords[spot.id] = { visitedAt: today, note: '' };
    this.saveVisitRecords();
    this.updateVisitUI();
    this.renderVisitRecordControls(spot);
    this.showDiscoveryToast({ ...spot, name: `${spot.name}を巡り帳に記録しました`, toastTitle: '巡り帳に記録' });
  }

  saveVisitNote() {
    const spot = this.selectedSpot;
    if (!spot || !this.isVisited(spot)) return;
    this.visitRecords[spot.id].note = this.modalVisitNote.value.trim();
    this.saveVisitRecords();
    this.updateVisitUI();
    this.showDiscoveryToast({ ...spot, name: `${spot.name}のメモを保存しました`, toastTitle: '巡り帳を更新' });
  }

  updateVisitUI() {
    const visited = this.getVisitedSpots();
    if (this.visitLogProgressValue) this.visitLogProgressValue.textContent = String(visited.length);
    this.visitLogProgress?.classList.toggle('has-visits', visited.length > 0);
    this.renderVisitLogPanel();
  }

  setVisitLogOpen(isOpen) {
    if (!this.visitLogPanel || !this.visitLogProgress) return;
    this.visitLogPanel.classList.toggle('hidden', !isOpen);
    this.visitLogProgress.setAttribute('aria-expanded', String(isOpen));
    this.visitLogProgress.setAttribute('aria-label', isOpen ? '巡り帳を閉じる（開閉）' : '巡り帳を開く（開閉）');
    this.visitLogProgress.classList.toggle('is-open', isOpen);
    if (this.visitLogProgressLabel) this.visitLogProgressLabel.textContent = isOpen ? '巡り帳を閉じる' : '巡り帳';
  }

  closeVisitLogPanel() {
    this.setVisitLogOpen(false);
  }

  renderVisitLogPanel() {
    if (!this.visitLogSummary || !this.visitLogList) return;
    const discoverable = this.getDiscoverableSpots().filter(spot => spot.category === 'castle' || spot.category === 'religious');
    const visited = this.getVisitedSpots();
    this.visitLogSummary.textContent = visited.length
      ? `${discoverable.length}か所のうち${visited.length}か所を訪問しました。次の一歩を見つけましょう。`
      : '気になった場所へ出かけたら、巡り帳に日付とひとことを残せます。';
    this.visitLogStats.innerHTML = this.getVisitStats().map(({ kind, visited: count, total }) => `<div class="visit-stat"><strong>${count}</strong><span>${kind}</span><small>/ ${total}</small></div>`).join('');

    const next = this.getWalkPicks()
      .filter(spot => spot.category === 'castle' || spot.category === 'religious')
      .find(spot => !this.isVisited(spot))
      || discoverable
        .filter(spot => !this.isVisited(spot))
        .map(spot => ({
          ...spot,
          distanceFromMapCenter: this.calculateDistance(
            this.map?.getCenter?.()?.lat || this.userPos.latitude,
            this.map?.getCenter?.()?.lng || this.userPos.longitude,
            spot.coordinate.latitude,
            spot.coordinate.longitude
          )
        }))
        .sort((a, b) => a.distanceFromMapCenter - b.distanceFromMapCenter)[0];
    this.visitNextStopContent.innerHTML = next
      ? `<button type="button" class="visit-next-stop-card" data-next-stop-id="${next.id}"><span class="visit-next-icon"><i data-lucide="map-pin"></i></span><span><strong>${next.name}</strong><small>${this.getVisitKind(next)}・約${this.formatDistance(next.distanceFromMapCenter || 0)}｜地図で見る</small></span><i data-lucide="chevron-right"></i></button>`
      : '<div class="visit-complete"><i data-lucide="trophy"></i><strong>登録スポットを巡りました</strong><span>発見ノートで物語を振り返れます。</span></div>';
    this.visitLogList.innerHTML = visited.length
      ? visited.map(({ spot, record }) => `<button type="button" class="visit-log-item" data-visit-spot-id="${spot.id}"><span class="visit-kind">${this.getVisitKind(spot)}</span><span class="visit-log-copy"><strong>${spot.name}</strong><small>${this.formatVisitDate(record.visitedAt)}${record.note ? `｜${this.escapeHtml(record.note)}` : ''}</small></span><i data-lucide="chevron-right"></i></button>`).join('')
      : '<div class="visit-log-empty"><i data-lucide="footprints"></i><span>訪問した場所がここに並びます。</span></div>';
    if (window.lucide) lucide.createIcons();
  }

  openVisitLogPanel() {
    this.discoveryPanel?.classList.add('hidden');
    this.walkPicksPanel?.classList.add('hidden');
    this.renderVisitLogPanel();
    this.setVisitLogOpen(true);
  }

  toggleVisitLogPanel() {
    const isOpen = !this.visitLogPanel?.classList.contains('hidden');
    if (isOpen) {
      this.closeVisitLogPanel();
    } else {
      this.openVisitLogPanel();
    }
  }

  escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  getDiscoverableSpots() {
    return this.getPointSpots().filter(spot => spot.category !== 'disaster');
  }

  saveDiscoveredSpot(spot) {
    if (!spot || spot.category === 'disaster' || this.discoveredSpotIds.has(spot.id)) return false;
    this.discoveredSpotIds.add(spot.id);
    try {
      window.localStorage?.setItem('ar-discovered-spots', JSON.stringify([...this.discoveredSpotIds]));
    } catch (_) {
      // 保存領域が使えない場合も、その閲覧中は発見状態を維持する
    }
    this.updateDiscoveryUI();
    this.showDiscoveryToast(spot);
    return true;
  }

  updateDiscoveryUI() {
    const discoverable = this.getDiscoverableSpots();
    const validIds = new Set(discoverable.map(spot => spot.id));
    const count = [...this.discoveredSpotIds].filter(id => validIds.has(id)).length;
    if (this.discoveryProgressValue) this.discoveryProgressValue.textContent = `${count} / ${discoverable.length}`;
    this.discoveryProgress?.classList.toggle('has-discoveries', count > 0);
    this.renderDiscoveryPanel();
    this.renderWalkPicks();
    this.updateVisitUI();
    this.updateMapSpotPreview(this.selectedSpot);
  }

  renderDiscoveryPanel() {
    if (!this.discoveryList || !this.discoveryPanelSummary) return;
    const discoverable = this.getDiscoverableSpots();
    const discovered = discoverable.filter(spot => this.discoveredSpotIds.has(spot.id));
    this.discoveryPanelSummary.textContent = discovered.length
      ? `${discoverable.length}か所のうち${discovered.length}か所の物語を読みました。この記録はこの端末内だけに保存されます。`
      : `スポットの「詳しく見る」を開くと、${discoverable.length}か所の発見がここに記録されます。記録はこの端末内だけに保存されます。`;
    this.discoveryList.innerHTML = discovered.length
      ? discovered.map(spot => `<button type="button" class="discovery-list-item" data-discovery-spot-id="${spot.id}">
          <span class="discovery-stamp"><i data-lucide="check"></i></span>
          <span><strong>${spot.name}</strong><small>${spot.eraLabel || (spot.category === 'community' ? '地域' : spot.category === 'religious' ? '寺社' : '歴史')}</small></span>
          <i data-lucide="chevron-right"></i>
        </button>`).join('')
      : '<div class="discovery-empty"><i data-lucide="map-pin-plus"></i><strong>最初の発見を探しましょう</strong><span>地図のピンを選び、物語を開いてみてください。</span></div>';
    if (window.lucide) lucide.createIcons();
  }

  openDiscoveryPanel() {
    this.renderDiscoveryPanel();
    this.discoveryPanel?.classList.remove('hidden');
  }

  getWalkPicks() {
    const center = this.map?.getCenter?.();
    const origin = center
      ? { latitude: center.lat, longitude: center.lng }
      : this.userPos;
    return this.getDiscoverableSpots()
      .map(spot => ({
        ...spot,
        distanceFromMapCenter: this.calculateDistance(
          origin.latitude,
          origin.longitude,
          spot.coordinate.latitude,
          spot.coordinate.longitude
        )
      }))
      .sort((a, b) => a.distanceFromMapCenter - b.distanceFromMapCenter)
      .slice(0, 3);
  }

  renderWalkPicks() {
    if (!this.walkPicksList || !this.walkPicksProgress) return;
    const picks = this.getWalkPicks();
    const discoveredCount = picks.filter(spot => this.discoveredSpotIds.has(spot.id)).length;
    this.walkPicksProgress.textContent = `${discoveredCount} / ${picks.length}`;
    this.walkPicksProgress.classList.toggle('is-complete', picks.length > 0 && discoveredCount === picks.length);
    this.walkPicksButton?.classList.toggle('has-progress', discoveredCount > 0);
    if (this.walkPicksSummary) {
      this.walkPicksSummary.textContent = discoveredCount === picks.length && picks.length > 0
        ? 'この3スポットを発見しました。次は発見ノートへ。'
        : '地図の中心に近い3スポット';
    }
    this.walkPicksList.innerHTML = picks.length
      ? picks.map((spot, index) => {
        const discovered = this.discoveredSpotIds.has(spot.id);
        const meta = spot.religiousType || spot.eraLabel || (spot.category === 'community' ? '地域スポット' : spot.category === 'religious' ? '寺社' : '歴史スポット');
        return `<button type="button" class="walk-pick-item${discovered ? ' is-discovered' : ''}" data-walk-pick-id="${spot.id}">
          <span class="walk-pick-index">${index + 1}</span>
          <span class="walk-pick-copy"><strong>${spot.name}</strong><small>${meta}・約${this.formatDistance(spot.distanceFromMapCenter)}</small></span>
          <span class="walk-pick-action">${discovered ? '発見済み' : '地図で見る'}<i data-lucide="${discovered ? 'check' : 'map'}"></i></span>
        </button>`;
      }).join('')
      : '<div class="walk-picks-empty"><i data-lucide="route-off"></i><strong>近くのスポットが見つかりません</strong><span>地図を少し動かして、もう一度開いてください。</span></div>';
    if (window.lucide) lucide.createIcons();
  }

  openWalkPicksPanel() {
    this.discoveryPanel?.classList.add('hidden');
    this.renderWalkPicks();
    this.walkPicksPanel?.classList.remove('hidden');
  }

  selectWalkPick(spot) {
    this.walkPicksPanel?.classList.add('hidden');
    this.currentLayer = spot.category;
    this.culturalRegionFilter = 'all';
    document.querySelectorAll('.layer-tabs-compact .tab-btn[data-layer]').forEach(item => {
      item.classList.toggle('active', item.dataset.layer === spot.category);
    });
    this.switchViewMode('map');
    this.updateLayerUI();
    if (this.map) this.map.setView([spot.coordinate.latitude, spot.coordinate.longitude], 17);
    this.selectMapSpot(spot);
  }

  showDiscoveryToast(spot) {
    if (!this.discoveryToast) return;
    window.clearTimeout(this.discoveryToastTimer);
    this.discoveryToast.innerHTML = `<i data-lucide="stamp"></i><span><strong>${spot.toastTitle || '発見ノートに記録'}</strong>${spot.name}</span>`;
    this.discoveryToast.classList.remove('hidden');
    this.discoveryToast.classList.add('is-visible');
    if (window.lucide) lucide.createIcons();
    this.discoveryToastTimer = window.setTimeout(() => {
      this.discoveryToast?.classList.remove('is-visible');
      window.setTimeout(() => this.discoveryToast?.classList.add('hidden'), 220);
    }, 2600);
  }

  selectMapSpot(spot, marker = null) {
    if (!spot) return;
    this.selectedSpot = spot;
    document.getElementById('app-container')?.classList.add('has-spot-selection');
    this.mapMarkers.forEach(item => {
      const element = item.marker?.getElement?.();
      element?.classList.toggle('is-selected', item.spot.id === spot.id);
    });
    if (marker?.getElement) marker.getElement()?.classList.add('is-selected');
    this.updateMapSpotPreview(spot);
    this.mapSpotPreview?.classList.remove('hidden');
    this.mapFirstHint?.classList.add('hidden');
    try { window.localStorage?.setItem('map-first-hint-dismissed', '1'); } catch (_) {}
  }

  clearMapSpotSelection() {
    this.selectedSpot = null;
    document.getElementById('app-container')?.classList.remove('has-spot-selection');
    this.mapSpotPreview?.classList.add('hidden');
    this.mapMarkers.forEach(item => item.marker?.getElement?.()?.classList.remove('is-selected'));
  }

  updateMapSpotPreview(spot) {
    if (!spot || !this.mapSpotPreview) return;
    const meta = spot.religiousType || spot.castleType || spot.eraLabel || (spot.category === 'community' ? '地域スポット' : spot.category === 'religious' ? '寺社' : spot.category === 'castle' ? '城郭' : '歴史スポット');
    const distance = this.calculateDistance(this.userPos.latitude, this.userPos.longitude, spot.coordinate.latitude, spot.coordinate.longitude);
    document.getElementById('spot-preview-meta').textContent = `${meta}・約${this.formatDistance(distance)}`;
    document.getElementById('spot-preview-title').textContent = spot.name;
    document.getElementById('spot-preview-summary').textContent = spot.summary || '';
    const discovery = document.getElementById('spot-preview-discovery');
    const isDiscovered = this.discoveredSpotIds.has(spot.id);
    if (discovery) {
      discovery.textContent = isDiscovered ? '発見済み' : '未発見';
      discovery.classList.toggle('is-discovered', isDiscovered);
    }
  }

  getMapSpotsPanel() {
    return this.mapSpotsPanel || document.getElementById('map-spots-panel');
  }

  getSpotRegion(spot) {
    if (!spot) return '国内';
    if (spot.region) return spot.region;
    if (spot.category === 'religious' || spot.category === 'castle') return '近畿';
    return '国内';
  }

  getDisplayableSpots() {
    // unverified は本番表示しない。partially_verified はモーダルで明示する。
    return this.spots.filter(spot => spot.verificationStatus !== 'unverified');
  }

  // ARピン・地図マーカーとして「点」で表示してよいスポット。
  // 洪水・津波などの面ハザード（isAreaHazard）は点表示せず、ハザードタイルで表現する。
  getPointSpots() {
    return this.getDisplayableSpots().filter(spot => !spot.isAreaHazard);
  }

  getSpotsEmptyMessage() {
    if (this.currentLayer === 'disaster') {
      return '<p class="material-empty">防災は面的なハザードタイルで表示します。公式確認済みの避難所・防災施設などの点データは現在未収録です。</p>';
    }
    return '<p class="material-empty">検証済みまたは一部確認済みのスポットは現在未収録です。</p>';
  }

  // スポットの信頼度を1つの直感的バッジで示す。資料種別も併記して
  // 「正確な地図」と「歴史的な名所絵」を混同させない。
  renderTrustBadge(spot, media) {
    const el = document.getElementById('modal-trust-badge');
    if (!el) return;
    let key = spot.verificationStatus || 'unverified';
    // 名所絵・絵図など非測量資料は参考扱いを優先表示
    if (media && media.isHistorical && media.positionAccuracy === 'reference_only') {
      key = media.materialType === 'historical_map' || media.materialType === 'pictorial_map' ? 'non_survey' : 'reference_only';
    }
    const label = TRUST_LABELS[key] || TRUST_LABELS.unverified;
    el.className = `trust-badge ${label.className}`;
    el.textContent = `${label.icon} ${label.text}`;
  }

  getPrimaryMedia(spot) {
    return spot?.mediaAssets?.[0] || null;
  }

  renderHistoricalMaterials(spot) {
    const gallery = document.getElementById('material-gallery');
    if (!gallery) return;
    const materials = spot?.historicalMaterials || [];
    const escape = (value) => this.escapeHtml(value || '');
    if (materials.length === 0) {
      const sourceCards = (spot?.sources || []).slice(0, 2).map(source => `
        <a class="place-evidence-card" href="${escape(source.sourceUrl)}" target="_blank" rel="noreferrer">
          <span class="place-evidence-icon">↗</span>
          <span><small>${escape(source.claimStatus === 'verified' ? '確認済み出典' : '参照先')}</small><strong>${escape(source.sourceName)}</strong></span>
        </a>
      `).join('');
      const coordinate = spot?.coordinate;
      gallery.innerHTML = `
        <div class="material-intro material-intro-empty">
          <div><span class="material-intro-kicker">場所の資料</span><strong>公式情報と位置の手がかりから始める</strong></div>
          <p>歴史資料が未収録の地点も、公式情報・座標・現地観察を一つの画面でたどれます。</p>
          <div class="material-route" aria-hidden="true">
            <span class="is-active">01 公式情報</span><i>→</i><span>02 地図で位置</span><i>→</i><span>03 現地で観察</span>
          </div>
        </div>
        <div class="place-evidence-grid">${sourceCards}
          <div class="place-evidence-card is-static">
            <span class="place-evidence-icon">◎</span>
            <span><small>ARピンの位置</small><strong>${coordinate ? `${Number(coordinate.latitude).toFixed(4)}, ${Number(coordinate.longitude).toFixed(4)}` : '概略位置'}</strong></span>
          </div>
        </div>
      `;
      return;
    }
    const materialSummary = `${materials.length}件の確認済み資料｜リンク先で原資料を開けます`;
    gallery.innerHTML = `
      <div class="material-intro">
        <div>
          <span class="material-intro-kicker">資料でたどる</span>
          <strong>この場所を、資料と現在地で見比べる</strong>
        </div>
        <p>${escape(materialSummary)}</p>
        <div class="material-route" aria-hidden="true">
          <span class="is-active">01 場所を発見</span><i>→</i><span>02 原資料を読む</span><i>→</i><span>03 現地で確かめる</span>
        </div>
      </div>
      <h3 class="material-gallery-title"><span>関連する歴史資料</span><small>${materials.length}件</small></h3>
      ${materials.map((material, index) => {
        const accuracy = material.positionAccuracy === 'reference_only' ? '位置は参考資料' : (material.positionAccuracy || '位置精度未記載');
        const image = material.imageUrl && material.imageUrlVerified !== false
          ? `<img src="${escape(material.imageUrl)}" alt="${escape(material.title)}" loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.querySelector('.img-fallback').classList.remove('hidden');">`
          : '';
        const sourceLink = material.sourceUrl
          ? `<a href="${escape(material.sourceUrl)}" target="_blank" rel="noreferrer">原資料を開く</a>`
          : '';
        const manifestLink = material.manifestUrl
          ? `<a href="${escape(material.manifestUrl)}" target="_blank" rel="noreferrer">IIIFで見る</a>`
          : '';
        const licenseLink = material.licenseSourceUrl
          ? `<a href="${escape(material.licenseSourceUrl)}" target="_blank" rel="noreferrer">利用条件</a>`
          : '';
        return `
        <article class="material-card">
          <div class="material-card-index"><span>${String(index + 1).padStart(2, '0')}</span>${image}</div>
          <div>
            <p class="img-fallback${material.imageUrl && material.imageUrlVerified !== false ? ' hidden' : ''}">個別画像URLは未検証です。リンク先の原資料で確認してください。</p>
            <div class="material-card-topline"><span>${escape(material.date)}</span><small>${escape(material.displayType || MATERIAL_TYPE_LABELS[material.materialType] || material.materialType)}</small></div>
            <strong>${escape(material.title)}</strong>
            <small>${escape(material.license)}｜${escape(accuracy)}${material.imageUrlVerified === false ? '｜画像URL未検証' : ''}</small>
            <p>${escape(material.note)}</p>
            <div class="material-source-links">${sourceLink}${manifestLink}${licenseLink}</div>
          </div>
        </article>
        `;
      }).join('')}
    `;
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  calculateBearing(lat1, lon1, lat2, lon2) {
    const φ1 = this.deg2rad(lat1);
    const φ2 = this.deg2rad(lat2);
    const Δλ = this.deg2rad(lon2 - lon1);
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    return (this.rad2deg(θ) + 360) % 360;
  }

  deg2rad(deg) { return deg * (Math.PI / 180); }
  rad2deg(rad) { return rad * (180 / Math.PI); }

  getHeadingDirectionName(deg) {
    const dirs = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];
    const idx = Math.round(deg / 45) % 8;
    return dirs[idx];
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // グローバル公開はE2Eテスト・デバッグ用途（本番動作には影響しない）
  window.arApp = new ARRegionalApp();
});
