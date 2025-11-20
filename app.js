// Recreates the animated particle canvas background from your TSX React file

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      speedZ: Math.random() * 2 + 1,
    });
  }

  function animate() {
    ctx.fillStyle = "rgba(10, 15, 30, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.z -= p.speedZ;
      if (p.z <= 0) {
        p.z = 1000;
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
      }

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      const scale = 1000 / (1000 + p.z);
      const x2d = (p.x - canvas.width / 2) * scale + canvas.width / 2;
      const y2d = (p.y - canvas.height / 2) * scale + canvas.height / 2;
      const size = p.size * scale;

      const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
      gradient.addColorStop(0, `rgba(59, 130, 246, ${0.8 * scale})`);
      gradient.addColorStop(0.5, `rgba(14, 165, 233, ${0.5 * scale})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
