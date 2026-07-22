import {
  SAMPLE_CENTER,
  HISTORICAL_MAP_TILES,
  OFFICIAL_HAZARD_LAYERS,
  SPOT_DATA,
  EVACUATION_SHELTERS,
  MATERIAL_TYPE_LABELS,
  PLACEHOLDER_IMAGE_URL,
  TRUST_LABELS
} from './data.js?v=p2-map-compare';

class ARRegionalApp {
  constructor() {
    // モードステート: 'ar' | 'map'
    this.viewMode = 'ar';
    this.currentLayer = 'history'; // history | community | disaster
    this.currentEra = 'present';   // 確認済みの現代・昭和期タイルのみ
    this.currentHazardType = 'flood'; // flood | tsunami | sediment

    this.userPos = { ...SAMPLE_CENTER };
    this.heading = 0; // 北 = 0度
    // 位置モード: 'explore'（地図から探索/自宅・PC） | 'onsite'（現地・GPS/センサー）
    this.locationMode = 'explore';
    this.headingSource = 'simulation'; // 'sensor' | 'simulation' | 'manual'
    this.orientationPermission = 'unknown'; // 'unknown' | 'granted' | 'denied' | 'not-required'
    this.orientationListenerAttached = false;
    this.cameraActive = false;
    this.mediaStream = null;
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

    // DOMエレメント
    this.canvas = document.getElementById('ar-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.video = document.getElementById('camera-feed');
    this.mapViewEl = document.getElementById('map-view');
    this.cameraPlaceholder = document.getElementById('camera-placeholder');
    this.locationText = document.getElementById('location-text');
    this.guideHintText = document.getElementById('guide-hint-text');

    // UI追加パネル
    this.eraTimelineBar = document.getElementById('era-timeline-bar');
    this.hazardLegendBox = document.getElementById('hazard-legend-box');
    this.mapDataStatus = document.getElementById('map-data-status');
    this.hazardSourceLink = document.getElementById('hazard-source-link');
    this.mapSpotsPanel = document.getElementById('map-spots-panel');
    this.mapCompareSlider = document.getElementById('map-opacity-slider');
    this.mapCompareValue = document.getElementById('map-opacity-val');
    this.timeTravelPanel = document.getElementById('time-travel-panel');
    this.timeTravelList = document.getElementById('time-travel-list');
    this.timeTravelLocation = document.getElementById('time-travel-location');

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
    this.mapOverlayOpacity = 0.65;
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
    this.setupGeolocationAndSensors();

    // Leafletマップ初期化を試行
    this.initLeafletMap();

    requestAnimationFrame(() => this.renderLoop());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
        html: `<div style="background:#3b82f6; width:18px; height:18px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 12px rgba(59,130,246,0.9);"></div>`,
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
    this.mapDataStatus.innerHTML = `<span>${message}</span>${sourceUrl ? ` <a href="${sourceUrl}" target="_blank" rel="noreferrer">出典</a>` : ''}`;
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
    this.mapMarkers.forEach(m => this.map.removeLayer(m));
    this.mapMarkers = [];

    // フィルタリングしたスポットの表示
    const filteredSpots = this.getPointSpots().filter(s => s.category === this.currentLayer);

    const spotsPanel = this.getMapSpotsPanel();
    if (spotsPanel) {
      const layerLabel = this.currentLayer === 'history' ? '歴史・観光' : this.currentLayer === 'community' ? '地域理解' : '防災';
      spotsPanel.innerHTML = `
        <div class="map-spots-title">${layerLabel}スポット</div>
        ${filteredSpots.length === 0 ? this.getSpotsEmptyMessage() : filteredSpots.map(spot => `<button type="button" class="map-spot-list-item" data-spot-id="${spot.id}">
          <strong>${spot.name}</strong><small>${spot.eraLabel || spot.hazardInfo?.typeName || '情報'}</small>
        </button>`).join('')}
      `;
    }

    filteredSpots.forEach(spot => {
      let color = '#f59e0b';
      if (spot.category === 'community') color = '#10b981';
      if (spot.category === 'disaster') color = '#ef4444';

      const icon = L.divIcon({
        className: 'custom-spot-pin',
        html: `<div style="background:${color}; padding:5px 10px; border-radius:14px; color:#fff; font-weight:bold; font-size:12px; border:2px solid #fff; box-shadow:0 4px 14px rgba(0,0,0,0.5); white-space:nowrap; cursor:pointer;">${spot.name.substring(0, 11)}</div>`,
        iconSize: [115, 26]
      });

      const marker = L.marker([spot.coordinate.latitude, spot.coordinate.longitude], { icon })
        .addTo(this.map)
        .on('click', () => {
          this.openSpotModal(spot);
        });

      this.mapMarkers.push(marker);
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

    // プロンプト内「部屋の中で地図から体験する」ボタン
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
    document.querySelectorAll('.layer-tabs-compact .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        document.querySelectorAll('.layer-tabs-compact .tab-btn').forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        this.currentLayer = targetBtn.dataset.layer;
        this.updateLayerUI();
      });
    });

    const spotsPanel = this.getMapSpotsPanel();
    if (spotsPanel) {
      spotsPanel.addEventListener('click', (event) => {
        const button = event.target.closest('[data-spot-id]');
        if (!button) return;
        const spot = this.spots.find(item => item.id === button.dataset.spotId);
        if (spot) this.openSpotModal(spot);
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

    const timeTravelButton = document.getElementById('btn-time-travel');
    if (timeTravelButton) timeTravelButton.addEventListener('click', () => this.openTimeTravel(this.selectedSpot));
    const closeTimeTravel = document.getElementById('btn-close-time-travel');
    if (closeTimeTravel) closeTimeTravel.addEventListener('click', () => this.closeTimeTravel());

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
        this.historicalOverlay.classList.remove('hidden');
        this.resetOverlayTransform();
      }
    });

    document.getElementById('btn-close-overlay').addEventListener('click', () => {
      this.historicalOverlay.classList.add('hidden');
    });

    document.getElementById('btn-reset-overlay').addEventListener('click', () => {
      this.resetOverlayTransform();
    });
  }

  // モード切り替え (AR ↔ 地図)
  switchViewMode(mode) {
    this.viewMode = mode;
    document.getElementById('app-container')?.classList.toggle('map-mode', mode === 'map');
    const spotsPanel = this.getMapSpotsPanel();

    if (mode === 'map') {
      this.btnModeAr.classList.remove('active');
      this.btnModeMap.classList.add('active');
      this.mapViewEl.classList.remove('hidden');
      this.canvas.classList.add('hidden');
      this.eraTimelineBar.classList.remove('hidden');
      if (this.mapDataStatus) this.mapDataStatus.classList.remove('hidden');
      if (spotsPanel) spotsPanel.classList.remove('hidden');

      if (this.guideHintText) {
        this.guideHintText.textContent = '地図上のピンをタップすると古写真・公的データ解説を閲覧できます';
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
      this.btnModeAr.classList.add('active');
      this.btnModeMap.classList.remove('active');
      this.mapViewEl.classList.add('hidden');
      if (this.mapDataStatus) this.mapDataStatus.classList.add('hidden');
      if (spotsPanel) spotsPanel.classList.add('hidden');
      this.canvas.classList.remove('hidden');
      this.eraTimelineBar.classList.add('hidden');

      if (this.guideHintText) {
        this.guideHintText.textContent = '画面を左右にドラッグして全方位 (360°) 見回せます';
      }
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
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.video.srcObject = this.mediaStream;
      this.cameraActive = true;
      this.cameraPlaceholder.classList.add('hidden');

      this.cameraIconOn.classList.add('hidden');
      this.cameraIconOff.classList.remove('hidden');
      this.cameraBtnText.textContent = 'カメラOFF';
      this.toggleCameraBtn.classList.add('active-highlight');
      // カメラ起動は「現地で体験」意図とみなし、GPS/センサーを許可要求して現地モードへ
      await this.enableOnsiteMode();
    } catch (err) {
      console.warn('カメラアクセスエラー:', err);
      alert('カメラアクセスの許可が必要です。\n※スマートフォン実機やHTTPS環境でお使いいただくか、このまま「地図表示」でお試しください。');
      this.cameraPlaceholder.classList.add('hidden');
      this.switchViewMode('map');
    }
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.video.srcObject = null;
    this.cameraActive = false;
    this.cameraPlaceholder.classList.remove('hidden');

    this.cameraIconOn.classList.remove('hidden');
    this.cameraIconOff.classList.add('hidden');
    this.cameraBtnText.textContent = 'カメラON';
    this.toggleCameraBtn.classList.remove('active-highlight');
    // カメラを切ったら探索モードへ戻す
    this.enableExploreMode();
  }

  setupGeolocationAndSensors() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          if (this.locationMode === 'onsite') {
            this.userPos.latitude = pos.coords.latitude;
            this.userPos.longitude = pos.coords.longitude;
            this.updateLocationStatus();
          }
        },
        (err) => console.log('位置情報通知:', err.message),
        { enableHighAccuracy: true }
      );
    }

    this.handleOrientation = (e) => {
      if (this.locationMode !== 'onsite') return;
      // iOS Safari: webkitCompassHeading は「真北からの時計回り角度（0=北, 90=東）」。
      //   画面上の方位に合わせるため 360 - heading で反時計回りへ変換して扱う。
      // Android Chrome: absolute な deviceorientation の alpha は「反時計回り（0=北, 90=西）」。
      //   端末・ブラウザ差が大きく、要実機確認。ここでは iOS と同様の式で暫定処理する。
      let heading = null;
      if (typeof e.webkitCompassHeading === 'number') {
        heading = e.webkitCompassHeading; // iOS
      } else if (e.absolute === true && typeof e.alpha === 'number') {
        heading = e.alpha; // Android(absolute)
      } else if (typeof e.alpha === 'number') {
        heading = e.alpha; // フォールバック（要実機確認）
      }
      if (heading !== null && heading !== undefined && !Number.isNaN(heading)) {
        this.setHeading((360 - heading) % 360, 'sensor');
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
    this.updateLocationStatus();
    this.updateLocationModeUI();
  }

  enableExploreMode() {
    this.locationMode = 'explore';
    this.updateLocationStatus();
    this.updateLocationModeUI();
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
    const modeTag = this.locationMode === 'onsite' ? '(現地GPS)' : '(探索/シミュレーション)';
    this.locationText.textContent = `現在地: 北緯 ${latStr}, 東経 ${lngStr} ${modeTag}`;

    if (this.userMapMarker) {
      this.userMapMarker.setLatLng([this.userPos.latitude, this.userPos.longitude]);
      if (this.map && this.viewMode === 'map') {
        this.map.panTo([this.userPos.latitude, this.userPos.longitude]);
      }
    }

    this.updateLayerUI();
  }

  updateLayerUI() {
    const banner = this.disasterBanner;
    if (this.currentLayer === 'disaster') {
      banner.classList.remove('hidden');
      this.updateFloodConceptToggleVisibility();

      // 避難所データは公式一次資料で未検証のため、具体的な方向・距離の案内を一時停止。
      // 公式データで施設名・座標・対象災害・種別を確認後に再有効化する。
      this.shelterGuideText.innerHTML = `<i data-lucide="info"></i> 避難所情報は現在確認中です。災害時は<a href="https://www.city.osaka.lg.jp/kikikanrishitsu/page/0000349214.html" target="_blank" rel="noreferrer" style="color:#93c5fd;">大阪市の最新避難所情報</a>を確認してください。`;
    } else {
      banner.classList.add('hidden');
    }

    this.renderMapMarkers();
    if (window.lucide) lucide.createIcons();
  }

  renderLoop() {
    if (this.viewMode === 'ar') {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.renderedPins = [];

      // 防災AR: 洪水を選択中かつユーザーが概念イメージ表示をONにした場合のみ水面を描画。
      // 津波は洪水用イメージを流用しない。土砂災害は水面表現を一切描かない。
      if (this.currentLayer === 'disaster'
        && this.currentHazardType === 'flood'
        && this.showFloodConceptImage) {
        this.drawARFloodWaterline();
      }

      const filteredSpots = this.getPointSpots().filter(s => s.category === this.currentLayer);
      filteredSpots.forEach(spot => {
        this.drawARSpotMarker(spot);
      });
    }

    requestAnimationFrame(() => this.renderLoop());
  }

  drawARFloodWaterline() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
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
    if (Math.abs(angleDiff) > fov / 2 + 10) return;

    const screenX = (this.canvas.width / 2) + (angleDiff / (fov / 2)) * (this.canvas.width / 2);
    const screenY = (this.canvas.height * 0.45) - Math.min(distanceMeters * 0.8, 120);

    const ctx = this.ctx;

    let color = '#f59e0b';
    if (spot.category === 'community') color = '#10b981';
    if (spot.category === 'disaster') color = '#ef4444';

    ctx.save();
    ctx.translate(screenX, screenY);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 40, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    const cardW = 180;
    const cardH = 58;
    const cardX = -cardW / 2;
    const cardY = -cardH;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    this.drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';

    if (spot.eraLabel) {
      ctx.fillStyle = color;
      ctx.fillRect(cardX + 8, cardY + 8, 48, 14);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(spot.eraLabel.substring(0, 4), cardX + 12, cardY + 18);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    const titleText = spot.name.length > 12 ? spot.name.substring(0, 11) + '…' : spot.name;
    ctx.fillText(titleText, cardX + 10, cardY + 36);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.fillText(`距離: 約${Math.round(distanceMeters)}m (タップで表示)`, cardX + 10, cardY + 50);

    ctx.restore();

    this.renderedPins.push({
      spot,
      bounds: {
        x: screenX + cardX,
        y: screenY + cardY,
        width: cardW,
        height: cardH + 40
      }
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

      const screenX = (this.canvas.width / 2) + (angleDiff / (fov / 2)) * (this.canvas.width / 2);
      const screenY = this.canvas.height * 0.25;

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
        this.openSpotModal(item.spot);
        break;
      }
    }
  }

  openSpotModal(spot) {
    this.selectedSpot = spot;
    const modal = document.getElementById('spot-modal');
    const media = this.getPrimaryMedia(spot);

    document.getElementById('modal-title').textContent = spot.name;
    // 直感的な信頼度バッジ（✓公式資料確認済み / ◐一部確認済み / △未確認情報を含む など）
    this.renderTrustBadge(spot, media);
    document.getElementById('modal-summary').textContent = spot.summary || '';
    document.getElementById('modal-desc').textContent = `${spot.description || ''}${spot.verificationNote ? `\n\n注意: ${spot.verificationNote}` : ''}`;
    const modalImg = document.getElementById('modal-img');
    const hasVerifiedImage = Boolean(media?.imageUrl && media.imageUrlVerified !== false);
    modalImg.src = hasVerifiedImage ? media.imageUrl : (media?.isHistorical ? '' : PLACEHOLDER_IMAGE_URL);
    modalImg.alt = hasVerifiedImage ? (media?.title || `${spot.name}の画像`) : '画像未検証（資料ページで確認してください）';
    modalImg.classList.toggle('hidden', !hasVerifiedImage);

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
      mediaStatus.textContent = media?.isHistorical && !hasVerifiedImage
        ? `表示画像: 個別画像URL未検証（${media.sourceName}の資料ページで閲覧）`
        : media?.isHistorical
        ? `表示画像: ${MATERIAL_TYPE_LABELS[media.materialType] || media.materialType}（確認済み資料）`
        : '表示画像: イメージ画像（開発用プレースホルダー。史料ではありません）';
      mediaStatus.className = `media-status ${media?.isHistorical && hasVerifiedImage ? 'verified' : 'unverified'}`;
    }
    const materialType = document.getElementById('modal-material-type');
    if (materialType) materialType.textContent = `資料種別: ${media ? (media.displayType || MATERIAL_TYPE_LABELS[media.materialType] || media.materialType) : '資料画像なし'}`;
    const positionAccuracy = document.getElementById('modal-position-accuracy');
    if (positionAccuracy) positionAccuracy.textContent = `位置精度: ${media?.positionAccuracy === 'reference_only' ? '参考資料（現代地図との一致は保証されません）' : (media?.positionAccuracy || '不明')}`;

    const compareButton = document.getElementById('btn-compare-ar');
    compareButton.classList.toggle('hidden', !media?.isHistorical || !hasVerifiedImage);
    this.renderHistoricalMaterials(spot);

    modal.classList.remove('hidden');
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

  getMapSpotsPanel() {
    return this.mapSpotsPanel || document.getElementById('map-spots-panel');
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
    if (materials.length === 0) {
      gallery.innerHTML = '<p class="material-empty">この地点に紐づく確認済み歴史資料は未収録です。</p>';
      return;
    }
    gallery.innerHTML = `
      <h3>関連する歴史資料</h3>
      ${materials.map(material => `
        <article class="material-card">
          ${material.imageUrl && material.imageUrlVerified !== false ? `<img src="${material.imageUrl}" alt="${material.title}" loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.querySelector('.img-fallback').classList.remove('hidden');">` : ''}
          <div>
            <p class="img-fallback" style="color:#fbbf24; font-size:0.72rem;">個別画像URLは未検証です。下記リンクからNDLで直接閲覧してください。</p>
            <strong>${material.title}</strong>
            <small>${material.date}｜${material.displayType || MATERIAL_TYPE_LABELS[material.materialType] || material.materialType}</small>
            <small>${material.license}｜位置精度: 参考資料${material.imageUrlVerified === false ? '｜画像URL未検証' : ''}</small>
            <p>${material.note}</p>
            <a href="${material.sourceUrl}" target="_blank" rel="noreferrer">NDL資料ページを開く</a>
            <a href="${material.manifestUrl}" target="_blank" rel="noreferrer">IIIFマニフェスト</a>
            ${material.licenseSourceUrl ? `<a href="${material.licenseSourceUrl}" target="_blank" rel="noreferrer">ライセンス確認元</a>` : ''}
          </div>
        </article>
      `).join('')}
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
