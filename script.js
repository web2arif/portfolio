// ── CANVAS TESSELLATION ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let t = 0;
const mouse = { x: -9999, y: -9999 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
  mouse.x = -9999;
  mouse.y = -9999;
});

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const W = window.innerWidth;
  const H = window.innerHeight;

  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
}

function drawCell(cx, cy, R, phase, influence) {

  // outer hexagon
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = phase + (i * Math.PI / 3);
    const x = cx + R * Math.cos(angle);
    const y = cy + R * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#0d1f2d';
  ctx.fill();
  ctx.strokeStyle = '#0e7490';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // 6 kite petals
  for (let i = 0; i < 6; i++) {
    const angle = phase + (i * Math.PI / 3);
    const tip = [
      cx + R * 0.85 * Math.cos(angle),
      cy + R * 0.85 * Math.sin(angle)
    ];
    const left = [
      cx + R * 0.45 * Math.cos(angle - Math.PI / 6),
      cy + R * 0.45 * Math.sin(angle - Math.PI / 6)
    ];
    const right = [
      cx + R * 0.45 * Math.cos(angle + Math.PI / 6),
      cy + R * 0.45 * Math.sin(angle + Math.PI / 6)
    ];
    ctx.beginPath();
    ctx.moveTo(tip[0], tip[1]);
    ctx.lineTo(left[0], left[1]);
    ctx.lineTo(cx, cy);
    ctx.lineTo(right[0], right[1]);
    ctx.closePath();
    ctx.fillStyle = '#0e749033';
    ctx.fill();
    ctx.strokeStyle = `rgba(34, 211, 238, ${0.3 + influence * 0.7})`;
    ctx.lineWidth = 0.5 + influence * 1.5;
    ctx.stroke();
  }

  // inner hexagon
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = phase + (i * Math.PI / 3);
    const x = cx + R * 0.28 * Math.cos(angle);
    const y = cy + R * 0.28 * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#0e749033';
  ctx.fill();
  ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 + influence * 0.6})`;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // centre dot
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.06 + influence * R * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = '#f59e0b';
  ctx.fill();
}

function draw(timestamp) {
  t = timestamp * 0.0006;

  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width / dpr;
  const H = canvas.height / dpr;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const R = 40;
  const hexW = Math.sqrt(3) * R;
  const hexH = 1.5 * R;
  const cols = Math.ceil(W / hexW) + 2;
  const rows = Math.ceil(H / hexH) + 2;
  const reach = R * 6;

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * hexW + (row % 2 === 0 ? 0 : hexW / 2);
      const cy = row * hexH;

      const dx = cx - mouse.x;
      const dy = cy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const influence = Math.max(0, 1 - dist / reach);
      const smooth = influence * influence * (3 - 2 * influence);
      const phase = Math.PI / 6 + t + smooth * Math.PI * 0.4;

      drawCell(cx, cy, R, phase, smooth);
    }
  }

  // vignette — darkens edges so content stays readable
  const vg = ctx.createRadialGradient(W/2, H/2, H * 0.05, W/2, H/2, H * 0.7);
  vg.addColorStop(0, 'rgba(0,0,0,0.1)');
  vg.addColorStop(1, 'rgba(0,0,0,0.75)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  requestAnimationFrame(draw);
}

resize();
window.addEventListener('resize', resize);
requestAnimationFrame(draw);


// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = e.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ── PROJECT FILTER ──
function filterProjects(event, cat) {
  document.querySelectorAll('.proj-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.proj-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
  });
}
