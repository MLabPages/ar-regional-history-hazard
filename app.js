import { SAMPLE_CENTER, SPOT_DATA, EVACUATION_SHELTERS } from './data.js';

class ARRegionalApp {
  constructor() {
    // ステート
    this.currentLayer = 'history'; // history | community | disaster
    this.userPos = { ...SAMPLE_CENTER };
    this.heading = 0; // 北 = 0度
    this.isSimulating = true; // デフォルトでPC/ indoorでも動作確認できるように
    this.cameraActive = false;

    this.spots = [...SPOT_DATA];
    this.shelters = [...EVACUATION_SHELTERS];
    this.selectedSpot = null;

    // DOMエレメント
    this.canvas = document.getElementById('ar-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.video = document.getElementById('camera-feed');
    this.cameraPlaceholder = document.getElementById('camera-placeholder');
    this.locationText = document.getElementById('location-text');

    // UIモーダル・バナー
    this.disasterBanner = document.getElementById('disaster-alert-banner');
    this.hazardDepthText = document.getElementById('hazard-depth-text');
    this.shelterGuideText = document.getElementById('shelter-guide-text');
    this.historicalOverlay = document.getElementById('historical-overlay');
    this.overlayImg = document.getElementById('historical-overlay-img');
    this.opacitySlider = document.getElementById('opacity-slider');

    // ARスクリーンスポット情報 (クリック判定用)
    this.renderedPins = [];

    this.init();
  }

  async init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.setupEventListeners();
    this.setupGeolocationAndSensors();

    // アニメーションループ開始
    requestAnimationFrame(() => this.renderLoop());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupEventListeners() {
    // カメラ起動
    document.getElementById('btn-start-camera').addEventListener('click', () => this.startCamera());

    // レイヤー切り替えタブ
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        this.currentLayer = targetBtn.dataset.layer;
        this.updateLayerUI();
      });
    });

    // シミュレータパネル切り替え
    const simPanel = document.getElementById('simulator-panel');
    document.getElementById('btn-toggle-sim').addEventListener('click', () => {
      simPanel.classList.toggle('hidden');
    });
    document.getElementById('btn-close-sim').addEventListener('click', () => {
      simPanel.classList.add('hidden');
    });

    // シミュレータコントロール
    const headingInput = document.getElementById('sim-heading');
    const headingValText = document.getElementById('sim-heading-val');
    headingInput.addEventListener('input', (e) => {
      this.heading = parseFloat(e.target.value);
      this.isSimulating = true;
      headingValText.textContent = `${Math.round(this.heading)}° (${this.getHeadingDirectionName(this.heading)})`;
    });

    document.querySelectorAll('.sim-btn-grid .btn-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sim-btn-grid .btn-chip').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.userPos.latitude = parseFloat(e.target.dataset.lat);
        this.userPos.longitude = parseFloat(e.target.dataset.lng);
        this.isSimulating = true;
        this.updateLocationStatus();
      });
    });

    // キャンバスタップ判定（ARマーカーのタップ）
    this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));

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

    // AR古写真比較モーダルボタン
    document.getElementById('btn-compare-ar').addEventListener('click', () => {
      if (this.selectedSpot && this.selectedSpot.historicalImage) {
        document.getElementById('spot-modal').classList.add('hidden');
        this.overlayImg.src = this.selectedSpot.historicalImage;
        this.historicalOverlay.classList.remove('hidden');
      }
    });

    document.getElementById('btn-close-overlay').addEventListener('click', () => {
      this.historicalOverlay.classList.add('hidden');
    });

    this.opacitySlider.addEventListener('input', (e) => {
      this.overlayImg.style.opacity = e.target.value / 100;
    });
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.video.srcObject = stream;
      this.cameraActive = true;
      this.cameraPlaceholder.classList.add('hidden');
    } catch (err) {
      console.warn('カメラアクセスエラー:', err);
      alert('カメラにアクセスできませんでした。シミュレーターモードで継続します。');
    }
  }

  setupGeolocationAndSensors() {
    // Real Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          if (!this.isSimulating) {
            this.userPos.latitude = pos.coords.latitude;
            this.userPos.longitude = pos.coords.longitude;
            this.updateLocationStatus();
          }
        },
        (err) => console.log('位置情報通知:', err.message),
        { enableHighAccuracy: true }
      );
    }

    // Real Device Orientation (ジャイロ/コンパス)
    const handleOrientation = (e) => {
      if (!this.isSimulating) {
        let heading = e.alpha;
        if (e.webkitCompassHeading) {
          heading = e.webkitCompassHeading; // iOS
        }
        if (heading !== null && heading !== undefined) {
          this.heading = (360 - heading) % 360;
        }
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    this.updateLocationStatus();
  }

  updateLocationStatus() {
    const latStr = this.userPos.latitude.toFixed(4);
    const lngStr = this.userPos.longitude.toFixed(4);
    this.locationText.textContent = `現在地: 北緯 ${latStr}, 東経 ${lngStr} ${this.isSimulating ? '(Sim)' : ''}`;
    this.updateLayerUI();
  }

  updateLayerUI() {
    const banner = this.disasterBanner;
    if (this.currentLayer === 'disaster') {
      banner.classList.remove('hidden');

      // 最寄り避難所計算
      let nearestShelter = null;
      let minDistance = Infinity;

      this.shelters.forEach(s => {
        const dist = this.calculateDistance(
          this.userPos.latitude, this.userPos.longitude,
          s.coordinate.latitude, s.coordinate.longitude
        );
        if (dist < minDistance) {
          minDistance = dist;
          nearestShelter = s;
        }
      });

      if (nearestShelter) {
        const bearing = this.calculateBearing(
          this.userPos.latitude, this.userPos.longitude,
          nearestShelter.coordinate.latitude, nearestShelter.coordinate.longitude
        );
        const dirName = this.getHeadingDirectionName(bearing);
        this.shelterGuideText.innerHTML = `<i data-lucide="navigation"></i> 避難所: <strong>${nearestShelter.name}</strong> (${dirName}へ約${Math.round(minDistance)}m)`;
      }

      this.hazardDepthText.textContent = '想定浸水深: 3.5m (淀川・寝屋川溢水時想定)';
    } else {
      banner.classList.add('hidden');
    }

    if (window.lucide) lucide.createIcons();
  }

  // --- AR レンダリングメインループ ---
  renderLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderedPins = [];

    // ① 防災レイヤーの場合、カメラ画角内に「AR想定浸水ライン (高さウォーターライン)」を描画
    if (this.currentLayer === 'disaster') {
      this.drawARFloodWaterline();
    }

    // ② フィルタリングしたスポットのARピン描画
    const filteredSpots = this.spots.filter(s => s.category === this.currentLayer);

    filteredSpots.forEach(spot => {
      this.drawARSpotMarker(spot);
    });

    // ③ 避難所コンパス（防災レイヤー時）
    if (this.currentLayer === 'disaster') {
      this.drawARShelterMarkers();
    }

    requestAnimationFrame(() => this.renderLoop());
  }

  // AR浸水深ウォーターライン描画
  drawARFloodWaterline() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 浸水高3.5mに相当する画面的高さ
    const waterY = h * 0.58;

    // 半透明のグラデーション水中効果
    const grad = ctx.createLinearGradient(0, waterY, 0, h);
    grad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
    grad.addColorStop(1, 'rgba(185, 28, 28, 0.7)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, waterY, w, h - waterY);

    // 水面境界線 (波立つ赤ライン)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(254, 202, 202, 0.9)';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    ctx.moveTo(0, waterY);
    ctx.lineTo(w, waterY);
    ctx.stroke();
    ctx.setLineDash([]);

    // AR浸水標識テキスト
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText('▲ 想定浸水深 3.5m (ビル2階床上水準)', 20, waterY - 10);
    ctx.shadowBlur = 0;
  }

  // ARスポットピン描画
  drawARSpotMarker(spot) {
    const distanceMeters = this.calculateDistance(
      this.userPos.latitude, this.userPos.longitude,
      spot.coordinate.latitude, spot.coordinate.longitude
    );

    const bearing = this.calculateBearing(
      this.userPos.latitude, this.userPos.longitude,
      spot.coordinate.latitude, spot.coordinate.longitude
    );

    // カメラの画角 (FOV ≈ 60度) 内での相対角度
    let angleDiff = bearing - this.heading;
    while (angleDiff < -180) angleDiff += 360;
    while (angleDiff > 180) angleDiff -= 360;

    const fov = 65; // Horizontal Field of View
    if (Math.abs(angleDiff) > fov / 2 + 10) return; // 画面外はスキップ

    // スクリーンX座標
    const screenX = (this.canvas.width / 2) + (angleDiff / (fov / 2)) * (this.canvas.width / 2);
    // 距離に応じたスクリーンY座標
    const screenY = (this.canvas.height * 0.45) - Math.min(distanceMeters * 0.8, 120);

    const ctx = this.ctx;

    // ピンカラー
    let color = '#f59e0b';
    if (spot.category === 'community') color = '#10b981';
    if (spot.category === 'disaster') color = '#ef4444';

    // 描画
    ctx.save();
    ctx.translate(screenX, screenY);

    // 接続ポール
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // マーカー円ドット
    ctx.beginPath();
    ctx.arc(0, 40, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // カードフレーム
    const cardW = 180;
    const cardH = 58;
    const cardX = -cardW / 2;
    const cardY = -cardH;

    // 背景カード
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    this.drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 10);
    ctx.fill();
    ctx.stroke();

    // テキスト描画
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';

    // 年代バッジ
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
    ctx.fillText(`距離: 約${Math.round(distanceMeters)}m`, cardX + 10, cardY + 50);

    ctx.restore();

    // クリック判定用に保存
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

  // 避難所ARマーカー描画
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
      ctx.fillText(`緑避難所: ${shelter.name.substring(0, 8)}`, 0, -4);
      ctx.font = '9px sans-serif';
      ctx.fillText(`${Math.round(dist)}m`, 0, 10);
      ctx.restore();
    });
  }

  handleCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // クリックされたピンの検出
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

    document.getElementById('modal-title').textContent = spot.name;
    document.getElementById('modal-summary').textContent = spot.summary || '';
    document.getElementById('modal-desc').textContent = spot.description || '';
    document.getElementById('modal-img').src = spot.historicalImage || 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80';

    const eraBadge = document.getElementById('modal-era-badge');
    eraBadge.textContent = spot.eraLabel || '歴史';

    // 防災情報ボックス
    const hazardBox = document.getElementById('modal-hazard-box');
    if (spot.hazardInfo) {
      hazardBox.classList.remove('hidden');
      document.getElementById('modal-hazard-detail').textContent = spot.hazardInfo.description;
    } else {
      hazardBox.classList.add('hidden');
    }

    document.getElementById('modal-source').textContent = `出典: ${spot.source || '未指定'}`;
    document.getElementById('modal-license').textContent = `ライセンス: ${spot.license || 'パブリックドメイン'}`;

    modal.classList.remove('hidden');
  }

  // --- 計算ユーティリティ ---
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // 地球の半径 (m)
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

// 起動
window.addEventListener('DOMContentLoaded', () => {
  new ARRegionalApp();
});
