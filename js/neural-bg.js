// ===== NEURAL-BG.JS — Animated Neural Network Canvas =====
(function() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], animFrame;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNodes(n) {
    nodes = [];
    for (let i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > 0.6 ? '#00e5ff' : '#7c3aed'
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      n.pulse += 0.02;
      const glow = Math.sin(n.pulse) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * glow, 0, Math.PI * 2);
      ctx.fillStyle = n.color === '#00e5ff'
        ? `rgba(0, 229, 255, ${glow * 0.8})`
        : `rgba(124, 58, 237, ${glow * 0.8})`;
      ctx.fill();

      // Glow
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
      grad.addColorStop(0, n.color === '#00e5ff' ? 'rgba(0,229,255,0.15)' : 'rgba(124,58,237,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Move
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    animFrame = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createNodes(60);
    draw();
  }

  window.addEventListener('resize', () => {
    resize();
    createNodes(60);
  });

  init();
})();
