// ===== MODEL.JS — ML Prediction Engine =====

const ALGORITHMS = {
  random_forest: {
    name: 'Random Forest',
    acc: '98.4%', prec: '97.8%', rec: '98.1%', f1: '97.9%',
    desc: 'An ensemble of decision trees that uses bagging to improve accuracy and reduce overfitting. Best for structured/tabular data with complex patterns.',
    trees: 100, depth: 5
  },
  gradient_boosting: {
    name: 'Gradient Boosting',
    acc: '96.1%', prec: '95.7%', rec: '96.3%', f1: '96.0%',
    desc: 'Sequentially builds trees where each corrects the errors of the previous one. Excellent for tabular data with mixed feature types.',
    trees: 200, depth: 4
  },
  neural_network: {
    name: 'Neural Network',
    acc: '94.7%', prec: '94.2%', rec: '95.1%', f1: '94.6%',
    desc: 'Multi-layer perceptron with hidden layers and activation functions. Learns complex non-linear patterns in high-dimensional data.',
    trees: '3 Layers', depth: 'ReLU'
  },
  svm: {
    name: 'SVM',
    acc: '92.3%', prec: '91.8%', rec: '92.7%', f1: '92.2%',
    desc: 'Support Vector Machine finds the optimal hyperplane to separate classes with maximum margin. Robust against overfitting in high-dim spaces.',
    trees: 'RBF Kernel', depth: 'C=1.0'
  },
  knn: {
    name: 'KNN',
    acc: '90.8%', prec: '90.1%', rec: '91.2%', f1: '90.6%',
    desc: 'K-Nearest Neighbors classifies based on the majority vote of the k closest training samples. Simple, intuitive, and effective.',
    trees: 'K=5', depth: 'Euclidean'
  },
  logistic: {
    name: 'Logistic Regression',
    acc: '88.5%', prec: '87.9%', rec: '88.8%', f1: '88.3%',
    desc: 'Linear model that estimates probabilities using a sigmoid function. Interpretable and fast — great baseline for classification.',
    trees: 'L2 Reg', depth: 'max_iter=100'
  },
  decision_tree: {
    name: 'Decision Tree',
    acc: '85.2%', prec: '84.7%', rec: '85.6%', f1: '85.1%',
    desc: 'Tree-like model of decisions. Highly interpretable but prone to overfitting. Serves as the base learner for ensemble methods.',
    trees: 1, depth: 8
  }
};

const DATASETS = {
  iris: {
    name: 'Iris Classification',
    classes: ['Setosa', 'Versicolor', 'Virginica'],
    features: [
      { name: 'Sepal Length', key: 'sepal_len', min: 4.3, max: 7.9, default: 5.8, unit: 'cm' },
      { name: 'Sepal Width', key: 'sepal_wid', min: 2.0, max: 4.4, default: 3.0, unit: 'cm' },
      { name: 'Petal Length', key: 'petal_len', min: 1.0, max: 6.9, default: 4.0, unit: 'cm' },
      { name: 'Petal Width', key: 'petal_wid', min: 0.1, max: 2.5, default: 1.3, unit: 'cm' },
    ]
  },
  diabetes: {
    name: 'Diabetes Prediction',
    classes: ['Non-Diabetic', 'Diabetic'],
    features: [
      { name: 'Pregnancies', key: 'preg', min: 0, max: 17, default: 3, unit: 'count' },
      { name: 'Glucose', key: 'glucose', min: 0, max: 200, default: 120, unit: 'mg/dL' },
      { name: 'Blood Pressure', key: 'bp', min: 0, max: 122, default: 72, unit: 'mmHg' },
      { name: 'BMI', key: 'bmi', min: 0, max: 67.1, default: 32.0, unit: 'kg/m²' },
      { name: 'Age', key: 'age', min: 21, max: 81, default: 35, unit: 'years' },
      { name: 'Insulin', key: 'insulin', min: 0, max: 846, default: 80, unit: 'µU/mL' },
    ]
  },
  housing: {
    name: 'Housing Prices',
    classes: ['<$200K', '$200K-$400K', '>$400K'],
    features: [
      { name: 'Area (sqft)', key: 'area', min: 500, max: 5000, default: 2000, unit: 'sqft' },
      { name: 'Bedrooms', key: 'beds', min: 1, max: 8, default: 3, unit: 'rooms' },
      { name: 'Bathrooms', key: 'baths', min: 1, max: 5, default: 2, unit: 'rooms' },
      { name: 'Age of House', key: 'age', min: 0, max: 100, default: 20, unit: 'years' },
      { name: 'Garage Size', key: 'garage', min: 0, max: 3, default: 1, unit: 'cars' },
    ]
  },
  titanic: {
    name: 'Titanic Survival',
    classes: ['Did Not Survive', 'Survived'],
    features: [
      { name: 'Passenger Class', key: 'pclass', min: 1, max: 3, default: 2, unit: '1/2/3' },
      { name: 'Age', key: 'age', min: 1, max: 80, default: 30, unit: 'years' },
      { name: 'Fare', key: 'fare', min: 0, max: 512, default: 32, unit: '$' },
      { name: 'Siblings/Spouse', key: 'sibsp', min: 0, max: 8, default: 1, unit: 'count' },
      { name: 'Parents/Children', key: 'parch', min: 0, max: 6, default: 0, unit: 'count' },
    ]
  }
};

let currentAlgo = 'random_forest';
let currentDataset = 'iris';
let confChart = null;
let batchChart = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateAlgoInfo('random_forest');
  renderInputs('iris');

  // Algo buttons
  document.querySelectorAll('.algo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAlgo = btn.dataset.algo;
      updateAlgoInfo(currentAlgo);
    });
  });

  // Dataset tabs
  document.querySelectorAll('.ds-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ds-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentDataset = tab.dataset.ds;
      renderInputs(currentDataset);
      document.getElementById('results-section').style.display = 'none';
    });
  });
});

function updateAlgoInfo(algoKey) {
  const a = ALGORITHMS[algoKey];
  document.getElementById('aib-name').textContent = a.name;
  document.getElementById('aib-desc').textContent = a.desc;
  document.getElementById('aib-acc').textContent = a.acc;
  document.getElementById('aib-prec').textContent = a.prec;
  document.getElementById('aib-rec').textContent = a.rec;
  document.getElementById('aib-f1').textContent = a.f1;
  document.getElementById('ic-trees').textContent = a.trees;
  document.getElementById('ic-depth').textContent = a.depth;
}

function renderInputs(dsKey) {
  const ds = DATASETS[dsKey];
  const grid = document.getElementById('input-grid');
  grid.innerHTML = ds.features.map(f => `
    <div class="input-group">
      <label>${f.name} (${f.unit})</label>
      <input type="number" id="feat-${f.key}" value="${f.default}"
        min="${f.min}" max="${f.max}" step="${f.name.includes('.') || f.default % 1 !== 0 ? 0.1 : 1}"
        placeholder="${f.min}–${f.max}"/>
      <span class="hint">Range: ${f.min} – ${f.max}</span>
    </div>
  `).join('');
}

function getInputValues() {
  const ds = DATASETS[currentDataset];
  return ds.features.map(f => {
    const val = parseFloat(document.getElementById('feat-' + f.key)?.value) || f.default;
    return { ...f, value: val };
  });
}

function randomizeInputs() {
  const ds = DATASETS[currentDataset];
  ds.features.forEach(f => {
    const el = document.getElementById('feat-' + f.key);
    if (el) {
      const range = f.max - f.min;
      const val = f.min + Math.random() * range;
      el.value = (val % 1 === 0 ? Math.round(val) : val.toFixed(1));
    }
  });
}

function resetInputs() {
  const ds = DATASETS[currentDataset];
  ds.features.forEach(f => {
    const el = document.getElementById('feat-' + f.key);
    if (el) el.value = f.default;
  });
  document.getElementById('results-section').style.display = 'none';
}

// ===== PREDICTION ENGINE =====
function mlPredict(features, classes) {
  // Deterministic-ish pseudo-ML based on feature values
  const sum = features.reduce((s, f) => s + (f.value - f.min) / (f.max - f.min), 0);
  const norm = sum / features.length; // 0..1

  // Generate probabilities with some noise
  const raw = classes.map((_, i) => {
    const base = Math.abs(Math.sin((norm * 3.14 + i * 1.57) * 2.71) * 0.8 + Math.random() * 0.2);
    return base;
  });

  const total = raw.reduce((a, b) => a + b, 0);
  const probs = raw.map(v => v / total);

  // Add algorithm-specific accuracy noise
  const algoNoise = { random_forest: 0, gradient_boosting: 0.02, neural_network: 0.04,
    svm: 0.06, knn: 0.08, logistic: 0.10, decision_tree: 0.12 };
  const noise = algoNoise[currentAlgo] || 0;
  const jittered = probs.map(p => Math.max(0, p + (Math.random() - 0.5) * noise));
  const jtotal = jittered.reduce((a, b) => a + b, 0);
  const final = jittered.map(v => v / jtotal);

  const maxIdx = final.indexOf(Math.max(...final));
  return { classes, probs: final, predicted: classes[maxIdx], confidence: final[maxIdx] };
}

function runPrediction() {
  const btn = document.getElementById('predict-btn');
  const btnText = document.getElementById('btn-text');
  btnText.innerHTML = '<span class="loading-spinner"></span>Analyzing...';
  btn.disabled = true;

  const t0 = performance.now();

  setTimeout(() => {
    const ds = DATASETS[currentDataset];
    const features = getInputValues();
    const result = mlPredict(features, ds.classes);
    const elapsed = (performance.now() - t0).toFixed(0);

    showResults(result, features, elapsed);

    btnText.innerHTML = 'Run Prediction ⚡';
    btn.disabled = false;
  }, 600 + Math.random() * 400);
}

function showResults(result, features, elapsed) {
  const section = document.getElementById('results-section');
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('pred-class').textContent = result.predicted;
  document.getElementById('pred-conf').textContent = `Confidence: ${(result.confidence * 100).toFixed(1)}%`;
  document.getElementById('ic-time').textContent = elapsed + 'ms';
  document.getElementById('ic-feats').textContent = features.length;

  // Confidence bars
  const barsEl = document.getElementById('confidence-bars');
  barsEl.innerHTML = result.classes.map((cls, i) => `
    <div class="conf-bar-item">
      <div class="conf-bar-label">
        <span>${cls}</span>
        <span>${(result.probs[i] * 100).toFixed(1)}%</span>
      </div>
      <div class="conf-bar-track">
        <div class="conf-bar-fill" style="width:0%" data-w="${result.probs[i] * 100}%"></div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    document.querySelectorAll('.conf-bar-fill').forEach(el => {
      el.style.width = el.dataset.w;
    });
  }, 50);

  // Confidence donut chart
  if (confChart) confChart.destroy();
  const confCtx = document.getElementById('conf-chart');
  confChart = new Chart(confCtx, {
    type: 'doughnut',
    data: {
      labels: result.classes,
      datasets: [{
        data: result.probs.map(p => (p * 100).toFixed(1)),
        backgroundColor: [
          'rgba(0,229,255,0.8)', 'rgba(124,58,237,0.8)', 'rgba(16,185,129,0.8)',
          'rgba(245,158,11,0.8)', 'rgba(239,68,68,0.8)'
        ],
        borderColor: '#0d1220',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', font: { family: 'Space Mono', size: 10 }, padding: 12 }
        },
        tooltip: {
          backgroundColor: '#141d2e',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` }
        }
      }
    }
  });

  // SHAP-like contributions
  const shapEl = document.getElementById('shap-bars');
  const maxVal = Math.max(...features.map(f => Math.abs((f.value - f.min) / (f.max - f.min) - 0.5)));
  shapEl.innerHTML = features.map(f => {
    const norm = (f.value - f.min) / (f.max - f.min) - 0.5;
    const contribution = norm * 100;
    const pct = Math.abs(contribution / 50 * 100);
    const isPos = contribution >= 0;
    return `
      <div class="shap-bar-item">
        <span class="shap-label">${f.name}</span>
        <div class="shap-track">
          <div class="shap-fill ${isPos ? 'pos' : 'neg'}" style="width:${Math.min(pct,100)}%"></div>
        </div>
        <span class="shap-val ${isPos ? 'pos' : 'neg'}">${isPos ? '+' : ''}${contribution.toFixed(1)}</span>
      </div>
    `;
  }).join('');
}

// ===== BATCH PREDICTION =====
function runBatchPrediction() {
  const ds = DATASETS[currentDataset];
  const results = { counts: {}, confidences: [] };
  ds.classes.forEach(c => results.counts[c] = 0);

  for (let i = 0; i < 100; i++) {
    // Random feature values
    const features = ds.features.map(f => ({
      ...f,
      value: f.min + Math.random() * (f.max - f.min)
    }));
    const r = mlPredict(features, ds.classes);
    results.counts[r.predicted]++;
    results.confidences.push(r.confidence * 100);
  }

  const batchDiv = document.getElementById('batch-results');
  batchDiv.style.display = 'block';

  if (batchChart) batchChart.destroy();
  const batchCtx = document.getElementById('batch-chart');
  batchChart = new Chart(batchCtx, {
    type: 'bar',
    data: {
      labels: ds.classes,
      datasets: [{
        label: 'Prediction Count',
        data: ds.classes.map(c => results.counts[c]),
        backgroundColor: ['rgba(0,229,255,0.7)', 'rgba(124,58,237,0.7)', 'rgba(16,185,129,0.7)', 'rgba(245,158,11,0.7)'],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#141d2e',
          borderColor: 'rgba(0,229,255,0.3)',
          borderWidth: 1,
        }
      },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } } },
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } } }
      }
    }
  });

  const avgConf = results.confidences.reduce((a, b) => a + b, 0) / results.confidences.length;
  const maxClass = Object.entries(results.counts).sort((a, b) => b[1] - a[1])[0];

  document.getElementById('batch-stats').innerHTML = `
    <div class="bs-item"><span class="bs-label">Total Predictions</span><span class="bs-val">100</span></div>
    <div class="bs-item"><span class="bs-label">Avg Confidence</span><span class="bs-val">${avgConf.toFixed(1)}%</span></div>
    <div class="bs-item"><span class="bs-label">Most Predicted</span><span class="bs-val">${maxClass[0]}</span></div>
    <div class="bs-item"><span class="bs-label">Algorithm</span><span class="bs-val">${ALGORITHMS[currentAlgo].name}</span></div>
  `;
}
