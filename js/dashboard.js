// ===== DASHBOARD.JS =====

const CHART_DEFAULTS = {
  color: { grid: 'rgba(255,255,255,0.04)', text: '#64748b' },
  font: { family: 'Space Mono', size: 10 },
  tooltip: {
    backgroundColor: '#141d2e',
    borderColor: 'rgba(0,229,255,0.3)',
    borderWidth: 1,
    titleColor: '#e2e8f0',
    bodyColor: '#94a3b8'
  }
};

const COLORS = {
  cyan: 'rgba(0,229,255',
  purple: 'rgba(124,58,237',
  green: 'rgba(16,185,129',
  orange: 'rgba(245,158,11',
  red: 'rgba(239,68,68',
  blue: 'rgba(59,130,246'
};

function makeGrad(ctx, color1, color2) {
  const g = ctx.createLinearGradient(0, 0, 0, 300);
  g.addColorStop(0, color1);
  g.addColorStop(1, color2);
  return g;
}

// Timestamp
function updateTimestamp() {
  const el = document.getElementById('dash-timestamp');
  if (el) el.textContent = new Date().toLocaleString();
}
updateTimestamp();
setInterval(updateTimestamp, 1000);

// ===== CHART 1: Accuracy Comparison =====
let accChart;
function initAccChart(type = 'bar') {
  const ctx = document.getElementById('acc-compare');
  if (!ctx) return;
  if (accChart) accChart.destroy();
  const labels = ['Random Forest', 'Gradient Boosting', 'Neural Network', 'SVM', 'KNN', 'Logistic Reg.', 'Decision Tree'];
  const data = [98.4, 96.1, 94.7, 92.3, 90.8, 88.5, 85.2];
  accChart = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        label: 'Accuracy %',
        data,
        backgroundColor: type === 'radar'
          ? 'rgba(0,229,255,0.2)'
          : data.map((_, i) => `${COLORS.cyan},${0.9 - i * 0.08})`),
        borderColor: type === 'radar' ? '#00e5ff' : 'transparent',
        borderWidth: type === 'radar' ? 2 : 0,
        borderRadius: type === 'bar' ? 6 : 0,
        pointBackgroundColor: '#00e5ff',
        pointBorderColor: '#141d2e',
        pointBorderWidth: 2
      }, type === 'bar' ? {
        label: 'F1-Score %',
        data: [97.9, 96.0, 94.6, 92.2, 90.6, 88.3, 85.1],
        backgroundColor: data.map((_, i) => `${COLORS.purple},${0.85 - i * 0.07})`),
        borderRadius: 6, borderSkipped: false
      } : null].filter(Boolean)
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { family: 'Space Mono', size: 10 }, padding: 16 } },
        tooltip: CHART_DEFAULTS.tooltip
      },
      scales: type === 'radar' ? {
        r: {
          grid: { color: 'rgba(255,255,255,0.06)' },
          ticks: { display: false },
          pointLabels: { color: '#94a3b8', font: { family: 'Space Mono', size: 9 } },
          min: 80, max: 100
        }
      } : {
        y: { min: 80, max: 100, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font, callback: v => v + '%' } },
        x: { grid: { display: false }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } }
      }
    }
  });
}

// ===== CHART 2: Training Loss =====
function initLossChart() {
  const ctx = document.getElementById('loss-chart');
  if (!ctx) return;
  const epochs = Array.from({ length: 50 }, (_, i) => i + 1);
  function genLoss(start, end) {
    return epochs.map(e => {
      const decay = start * Math.exp(-0.1 * e) + end + (Math.random() - 0.5) * 0.01;
      return Math.max(end * 0.8, decay);
    });
  }
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: epochs,
      datasets: [
        { label: 'Train Loss', data: genLoss(1.2, 0.05), borderColor: '#00e5ff', backgroundColor: 'rgba(0,229,255,0.05)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0 },
        { label: 'Val Loss', data: genLoss(1.4, 0.08), borderColor: '#7c3aed', backgroundColor: 'rgba(124,58,237,0.05)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0 }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Space Mono', size: 10 } } }, tooltip: CHART_DEFAULTS.tooltip },
      scales: {
        y: { grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } },
        x: { grid: { display: false }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font, maxTicksLimit: 10 } }
      }
    }
  });
}

// ===== CHART 3: ROC Curve =====
function initROCChart() {
  const ctx = document.getElementById('roc-chart');
  if (!ctx) return;
  // Simulated ROC data
  const fpr = [0, 0.01, 0.02, 0.04, 0.06, 0.08, 0.12, 0.18, 0.28, 0.4, 0.6, 0.8, 1.0];
  const tpr = [0, 0.35, 0.60, 0.75, 0.83, 0.88, 0.92, 0.95, 0.97, 0.985, 0.993, 0.997, 1.0];
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: fpr,
      datasets: [
        { label: 'Random Forest (AUC=0.997)', data: tpr.map((t, i) => ({ x: fpr[i], y: t })), borderColor: '#00e5ff', backgroundColor: 'rgba(0,229,255,0.08)', fill: true, tension: 0.3, borderWidth: 2, pointRadius: 3, pointBackgroundColor: '#00e5ff' },
          { label: 'Random (baseline)', data: [{ x: 0, y: 0 }, { x: 1, y: 1 }], borderColor: 'rgba(255,255,255,0.2)', borderDash: [5, 5], borderWidth: 1, pointRadius: 0, fill: false }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { family: 'Space Mono', size: 10 } } },
        tooltip: CHART_DEFAULTS.tooltip
      },
      scales: {
        x: { type: 'linear', min: 0, max: 1, title: { display: true, text: 'False Positive Rate', color: '#64748b', font: { family: 'Space Mono', size: 10 } }, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } },
        y: { min: 0, max: 1, title: { display: true, text: 'True Positive Rate', color: '#64748b', font: { family: 'Space Mono', size: 10 } }, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } }
      }
    }
  });
}

// ===== CONFUSION MATRIX =====
function initConfusionMatrix() {
  const el = document.getElementById('confusion-matrix');
  if (!el) return;
  const classes = ['Setosa', 'Versicolor', 'Virginica'];
  const matrix = [
    [50, 0, 0],
    [0, 47, 3],
    [0, 2, 48]
  ];
  const maxVal = 50;
  el.style.gridTemplateColumns = `auto repeat(${classes.length}, 1fr)`;

  // Header row
  let html = '<div class="hm-label" style="background:transparent"></div>';
  classes.forEach(c => html += `<div class="hm-label" style="background:transparent;font-size:0.62rem;color:#64748b;">${c}</div>`);
  
  matrix.forEach((row, i) => {
    html += `<div class="hm-label" style="background:transparent;font-size:0.62rem;color:#64748b;">${classes[i]}</div>`;
    row.forEach((val, j) => {
      const isMain = i === j;
      const intensity = val / maxVal;
      const bg = isMain
        ? `rgba(0,229,255,${0.2 + intensity * 0.7})`
        : `rgba(239,68,68,${intensity * 0.6})`;
      const textColor = intensity > 0.3 ? '#fff' : '#94a3b8';
      html += `<div class="cm-cell" style="background:${bg};color:${textColor}" title="${classes[i]} → ${classes[j]}: ${val}">${val}</div>`;
    });
  });

  el.innerHTML = html;
  document.getElementById('cm-labels').innerHTML = classes.map(c => `<span class="cm-label">${c}</span>`).join('');
}

// ===== CHART 4: Feature Importance =====
function initFeatureChart() {
  const ctx = document.getElementById('feature-chart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Petal Length', 'Petal Width', 'Sepal Length', 'Sepal Width'],
      datasets: [{
        label: 'Importance',
        data: [0.44, 0.42, 0.10, 0.04],
        backgroundColor: ['rgba(0,229,255,0.85)', 'rgba(0,229,255,0.7)', 'rgba(124,58,237,0.75)', 'rgba(124,58,237,0.55)'],
        borderRadius: 6, borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { ...CHART_DEFAULTS.tooltip, callbacks: { label: c => ` Importance: ${(c.raw * 100).toFixed(1)}%` } } },
      scales: {
        x: { min: 0, max: 0.5, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font, callback: v => (v * 100).toFixed(0) + '%' } },
        y: { grid: { display: false }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } }
      }
    }
  });
}

// ===== CHART 5: Distribution =====
function initDistChart() {
  const ctx = document.getElementById('dist-chart');
  if (!ctx) return;
  const bins = Array.from({ length: 12 }, (_, i) => (i * 0.5 + 1).toFixed(1));
  function normalDist(mean, std, n) {
    return bins.map(b => {
      const x = parseFloat(b);
      return Math.round(n * Math.exp(-0.5 * Math.pow((x - mean) / std, 2)) / (std * Math.sqrt(2 * Math.PI)) * 0.5);
    });
  }
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: bins,
      datasets: [
        { label: 'Setosa', data: normalDist(2, 0.4, 50), backgroundColor: 'rgba(0,229,255,0.65)', borderRadius: 4, borderSkipped: false },
        { label: 'Versicolor', data: normalDist(3.5, 0.5, 50), backgroundColor: 'rgba(124,58,237,0.65)', borderRadius: 4, borderSkipped: false },
        { label: 'Virginica', data: normalDist(5, 0.6, 50), backgroundColor: 'rgba(16,185,129,0.65)', borderRadius: 4, borderSkipped: false }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Space Mono', size: 10 } } }, tooltip: CHART_DEFAULTS.tooltip },
      scales: {
        x: { stacked: false, grid: { display: false }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } },
        y: { grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } }
      }
    }
  });
}

// ===== LIVE CHART =====
let liveChart, liveData = [], liveRunning = true, liveInterval;
function initLiveChart() {
  const ctx = document.getElementById('live-chart');
  if (!ctx) return;
  const labels = Array.from({ length: 20 }, (_, i) => `-${20 - i}s`);
  liveData = Array.from({ length: 20 }, () => Math.floor(40 + Math.random() * 30));
  liveChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Predictions/sec',
        data: [...liveData],
        borderColor: '#00e5ff',
        backgroundColor: 'rgba(0,229,255,0.1)',
        fill: true, tension: 0.4, borderWidth: 2,
        pointRadius: 0, pointHoverRadius: 4
      }]
    },
    options: {
      responsive: true, animation: { duration: 300 },
      plugins: { legend: { display: false }, tooltip: CHART_DEFAULTS.tooltip },
      scales: {
        y: { min: 0, max: 100, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } },
        x: { grid: { display: false }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } }
      }
    }
  });
  liveInterval = setInterval(updateLive, 1200);
}
function updateLive() {
  if (!liveRunning) return;
  liveData.push(Math.floor(40 + Math.random() * 45));
  liveData.shift();
  liveChart.data.datasets[0].data = [...liveData];
  liveChart.update('none');
}
function toggleLive() {
  liveRunning = !liveRunning;
  const btn = document.getElementById('pause-live');
  btn.textContent = liveRunning ? '⏸ Pause' : '▶ Resume';
  btn.classList.toggle('active', liveRunning);
}

// ===== CHART: Cross-Validation =====
function initCVChart() {
  const ctx = document.getElementById('cv-chart');
  if (!ctx) return;
  const models = ['RF', 'GB', 'NN', 'SVM', 'KNN', 'LR', 'DT'];
  const means = [98.4, 96.1, 94.7, 92.3, 90.8, 88.5, 85.2];
  const stds = [0.8, 1.1, 1.4, 1.8, 2.0, 1.6, 2.5];
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: models.map((m, i) => ({
        label: m,
        data: [{ x: i, y: means[i] }],
        backgroundColor: i < 3 ? '#00e5ff' : '#7c3aed',
        pointRadius: 8, pointHoverRadius: 10
      }))
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { ...CHART_DEFAULTS.tooltip, callbacks: { label: c => `${models[c.datasetIndex]}: ${c.parsed.y}% ± ${stds[c.datasetIndex]}%` } } },
      scales: {
        x: { type: 'linear', min: -0.5, max: 6.5, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font, callback: (v) => models[v] || '' }, grid: { display: false } },
        y: { min: 80, max: 100, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font, callback: v => v + '%' } }
      }
    }
  });
}

// ===== CHART: Precision-Recall =====
function initPRChart() {
  const ctx = document.getElementById('pr-chart');
  if (!ctx) return;
  const thresholds = Array.from({ length: 20 }, (_, i) => i / 19);
  function prCurve(base) {
    return thresholds.map(t => ({ x: 1 - t * 0.4, y: base - (1 - t) * (1 - base) * 0.5 + Math.random() * 0.01 }));
  }
  new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        { label: 'Random Forest', data: prCurve(0.98), borderColor: '#00e5ff', fill: false, tension: 0.4, borderWidth: 2, pointRadius: 0 },
        { label: 'Gradient Boosting', data: prCurve(0.96), borderColor: '#7c3aed', fill: false, tension: 0.4, borderWidth: 2, pointRadius: 0 },
        { label: 'Neural Network', data: prCurve(0.94), borderColor: '#10b981', fill: false, tension: 0.4, borderWidth: 2, pointRadius: 0 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Space Mono', size: 10 } } }, tooltip: CHART_DEFAULTS.tooltip },
      scales: {
        x: { type: 'linear', min: 0.5, max: 1.0, title: { display: true, text: 'Recall', color: '#64748b', font: { family: 'Space Mono', size: 10 } }, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } },
        y: { min: 0.7, max: 1.0, title: { display: true, text: 'Precision', color: '#64748b', font: { family: 'Space Mono', size: 10 } }, grid: { color: CHART_DEFAULTS.color.grid }, ticks: { color: CHART_DEFAULTS.color.text, font: CHART_DEFAULTS.font } }
      }
    }
  });
}

// ===== HYPERPARAMETER HEATMAP =====
function initHeatmap() {
  const container = document.getElementById('heatmap-container');
  if (!container) return;
  const depths = [1, 2, 3, 5, 8, 10, 15, 20];
  const estimators = [10, 25, 50, 100, 200, 500];
  
  let html = '<div class="heatmap-grid" style="grid-template-columns: auto ' + estimators.map(() => '1fr').join(' ') + '">';
  
  // Header
  html += '<div class="hm-label" style="background:transparent;font-size:0.6rem;color:#475569;">depth↓ / est→</div>';
  estimators.forEach(e => html += `<div class="hm-label" style="font-size:0.6rem;color:#64748b;">${e}</div>`);
  
  depths.forEach(d => {
    html += `<div class="hm-label" style="font-size:0.6rem;color:#64748b;">${d}</div>`;
    estimators.forEach(e => {
      const base = 75 + Math.log(e) * 3 + Math.min(d, 6) * 2.5;
      const val = Math.min(98.5, base + (Math.random() - 0.5) * 1.5);
      const t = (val - 75) / 23.5;
      const r = Math.round(0 + t * 0);
      const g = Math.round(100 + t * 129);
      const b = Math.round(200 + t * 55);
      const alpha = 0.3 + t * 0.65;
      const textColor = t > 0.5 ? '#fff' : '#94a3b8';
      html += `<div class="hm-cell" style="background:rgba(${r},${g},${b},${alpha});color:${textColor}" title="Depth:${d}, Est:${e} → ${val.toFixed(1)}%">${val.toFixed(0)}</div>`;
    });
  });
  html += '</div>';
  
  const xLabel = `<div style="text-align:center;margin-top:8px;font-family:Space Mono;font-size:0.65rem;color:#475569">n_estimators →</div>`;
  container.innerHTML = html + xLabel;
}

// ===== METRICS TABLE =====
function initMetricsTable() {
  const tbody = document.getElementById('metrics-tbody');
  if (!tbody) return;
  const models = [
    { name: 'Random Forest', acc: 98.4, prec: 97.8, rec: 98.1, f1: 97.9, auc: 0.997, inf: 12 },
    { name: 'Gradient Boosting', acc: 96.1, prec: 95.7, rec: 96.3, f1: 96.0, auc: 0.989, inf: 18 },
    { name: 'Neural Network', acc: 94.7, prec: 94.2, rec: 95.1, f1: 94.6, auc: 0.981, inf: 8 },
    { name: 'SVM', acc: 92.3, prec: 91.8, rec: 92.7, f1: 92.2, auc: 0.971, inf: 22 },
    { name: 'KNN', acc: 90.8, prec: 90.1, rec: 91.2, f1: 90.6, auc: 0.965, inf: 35 },
    { name: 'Logistic Regression', acc: 88.5, prec: 87.9, rec: 88.8, f1: 88.3, auc: 0.951, inf: 5 },
    { name: 'Decision Tree', acc: 85.2, prec: 84.7, rec: 85.6, f1: 85.1, auc: 0.932, inf: 3 }
  ];
  const maxAcc = Math.max(...models.map(m => m.acc));
  tbody.innerHTML = models.map(m => `
    <tr>
      <td>${m.name}</td>
      <td class="${m.acc === maxAcc ? 'best' : ''}">
        <div class="progress-cell">
          ${m.acc}%
          <div class="p-bar"><div class="p-fill" style="width:${(m.acc - 80) / 20 * 100}%"></div></div>
        </div>
      </td>
      <td>${m.prec}%</td>
      <td>${m.rec}%</td>
      <td>${m.f1}%</td>
      <td>${m.auc}</td>
      <td>${m.inf}ms</td>
      <td><span class="status-badge active">● Active</span></td>
    </tr>
  `).join('');
}

// ===== CHART TYPE SWITCHER =====
document.querySelectorAll('.dc-btn[data-chart]').forEach(btn => {
  btn.addEventListener('click', () => {
    const chartId = btn.dataset.chart;
    const type = btn.dataset.type;
    document.querySelectorAll(`.dc-btn[data-chart="${chartId}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (chartId === 'acc-compare') initAccChart(type);
  });
});

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initAccChart('bar');
  initLossChart();
  initROCChart();
  initConfusionMatrix();
  initFeatureChart();
  initDistChart();
  initLiveChart();
  initCVChart();
  initPRChart();
  initHeatmap();
  initMetricsTable();
});
