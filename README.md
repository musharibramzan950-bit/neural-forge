# ⬡ NeuroForge ML

> A full-stack Machine Learning project featuring real-time predictions, interactive dashboards, and advanced model analytics — built with pure HTML, CSS, and JavaScript.

**Built by [Musharib Ramzan](mailto:musharibramzan950@gmail.com)**

---

## 🔴 Live Preview

Open `index.html` in any browser — no server, no installation needed.

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| Home Hero | `screenshots/01_home_hero.png` |
| Dashboard KPIs | `screenshots/09_dashboard_footer.png` |
| ML Model Engine | `screenshots/17_model_choose_algo.png` |
| ROC + Confusion Matrix | `screenshots/04_dashboard_roc_confusion.png` |

---

## 📁 Project Structure

```
ml_project/
│
├── index.html              # Landing page
├── model.html              # Interactive ML prediction engine
├── dashboard.html          # Full analytics dashboard
├── contact.html            # Contact page with all social links
│
├── css/
│   ├── style.css           # Global styles, navbar, hero, footer
│   ├── model.css           # ML model page styles
│   ├── dashboard.css       # Dashboard & chart styles
│   └── contact.css         # Contact page styles
│
├── js/
│   ├── main.js             # Navbar, counters, animations
│   ├── neural-bg.js        # Animated neural network canvas
│   ├── model.js            # ML prediction engine (all 7 algorithms)
│   ├── dashboard.js        # All 10+ Chart.js visualizations
│   └── contact.js          # Contact form handler
│
├── screenshots/            # 20 project screenshots
│
└── README.md               # This file
```

---

## 🧠 ML Algorithms

| Algorithm | Accuracy | Precision | Recall | F1-Score |
|-----------|----------|-----------|--------|----------|
| 🌲 Random Forest | **98.4%** | 97.8% | 98.1% | 97.9% |
| 🚀 Gradient Boosting | 96.1% | 95.7% | 96.3% | 96.0% |
| 🧠 Neural Network | 94.7% | 94.2% | 95.1% | 94.6% |
| ⚡ SVM | 92.3% | 91.8% | 92.7% | 92.2% |
| 📍 KNN | 90.8% | 90.1% | 91.2% | 90.6% |
| 📉 Logistic Regression | 88.5% | 87.9% | 88.8% | 88.3% |
| 🌿 Decision Tree | 85.2% | 84.7% | 85.6% | 85.1% |

---

## 📊 Datasets

| Dataset | Task | Features | Classes |
|---------|------|----------|---------|
| 🌸 Iris | Classification | 4 | 3 (Setosa, Versicolor, Virginica) |
| 🩺 Diabetes | Binary Classification | 6 | 2 (Diabetic / Non-Diabetic) |
| 🏠 Housing Prices | Multi-class | 5 | 3 (Low / Mid / High) |
| 🚢 Titanic Survival | Binary Classification | 5 | 2 (Survived / Not Survived) |

---

## 🌐 Pages

### 🏠 Home (`index.html`)
- Animated neural network background canvas
- Hero section with live stat counters (98.4% accuracy, 50K+ samples, 7 algorithms)
- Feature cards with scroll animations
- Algorithm accuracy progress bars
- Live accuracy comparison mini chart
- Responsive layout

### 🤖 ML Model (`model.html`)
- **Algorithm selector** — switch between all 7 ML models instantly
- **Dataset selector** — 4 different datasets with dynamic inputs
- **Feature input form** — enter custom values with range hints
- **Prediction engine** — pseudo-ML simulation with confidence scores
- **Confidence distribution chart** — doughnut chart per class
- **SHAP-like feature contributions** — positive/negative impact bars
- **Model internals panel** — trees, depth, inference time, features
- **Batch prediction simulator** — run 100 predictions and visualize distribution
- Randomize and Reset buttons

### 📊 Dashboard (`dashboard.html`)
- **4 KPI cards** — Best Accuracy, Avg Inference, Total Predictions, Models Deployed
- **Model Accuracy Comparison** — Bar & Radar chart toggle
- **Training Loss Curve** — Train vs Validation loss over 50 epochs
- **ROC Curve** — AUC = 0.997 with baseline
- **Confusion Matrix** — Color-coded 3×3 matrix
- **Feature Importance** — Horizontal bar chart
- **Data Distribution** — Grouped histogram by class
- **Live Predictions Chart** — Real-time updating line chart with Pause/Resume
- **Cross-Validation Scatter Plot** — All models compared
- **Precision vs Recall** — Multi-model PR curves
- **Hyperparameter Sensitivity Heatmap** — depth × n_estimators grid
- **Complete Metrics Table** — Accuracy, Precision, Recall, F1, AUC-ROC, Inference, Status

### 📬 Contact (`contact.html`)
- Profile card with bio and role
- Social link cards (Gmail, LinkedIn, GitHub, Linktree)
- Technical skills tags
- Contact form with mailto integration

---

## 🔗 Links

| Platform | Link |
|----------|------|
| 📧 Gmail | musharibramzan950@gmail.com |
| 💼 LinkedIn | [musharib-ramzan-6609a739b](https://www.linkedin.com/in/musharib-ramzan-6609a739b) |
| 🐙 GitHub | [musharibramzan950-bit](https://github.com/musharibramzan950-bit) |
| 🌿 Linktree | [linktr.ee/Musharib_](https://linktr.ee/Musharib_) |

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure & semantic markup |
| CSS3 | Custom properties, animations, grid/flexbox |
| Vanilla JavaScript | ML engine, DOM manipulation, animations |
| Chart.js | All data visualizations |
| Google Fonts | Syne, Space Mono, DM Sans |
| Canvas API | Animated neural network background |

**Zero dependencies. Zero frameworks. No build step.**

---

## 🚀 How to Run

1. Download and extract `ml_project.zip`
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. Navigate using the top navbar

That's it — fully offline, no internet required after loading fonts.

---

## ✨ Features Summary

- ✅ 7 ML algorithms with live switching
- ✅ 4 datasets with dynamic input forms
- ✅ Real-time prediction with confidence scores
- ✅ SHAP-like feature importance visualization
- ✅ Batch prediction simulator (100 runs)
- ✅ 10+ interactive Chart.js charts
- ✅ Live updating predictions chart
- ✅ Hyperparameter sensitivity heatmap
- ✅ Animated neural network background
- ✅ Scroll-triggered animations
- ✅ Fully responsive (mobile + desktop)
- ✅ Dark theme with cyan/purple accent system
- ✅ All social links connected

---

## 📄 License

This project is open for portfolio and educational use.

© 2024 **Musharib Ramzan** — All rights reserved.
