import React, { useEffect, useRef } from 'react';

export default function AmbientBackground({ theme = 'shubh-vivah' }) {
  const canvasRef = useRef(null);
  const isShubhVivah = theme === 'shubh-vivah';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Warm golden particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.2,
      color: isShubhVivah
        ? (Math.random() > 0.4 ? 'rgba(212, 160, 68, ' : 'rgba(235, 140, 30, ')
        : (Math.random() > 0.4 ? 'rgba(198, 161, 107, ' : 'rgba(217, 144, 160, ')
    }));

    // Falling floral petal particles: Marigolds (Genda Phool) for Shubh Vivah, Rose for Pastel
    const petalCount = 18;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 4,
      speedY: Math.random() * 0.6 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      alpha: Math.random() * 0.35 + 0.25,
      isOrange: Math.random() > 0.4
    }));

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Render glowing ambient particles
      for (let p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = isShubhVivah ? 'rgba(212, 160, 68, 0.6)' : 'rgba(198, 161, 107, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render falling petals
      for (let pet of petals) {
        pet.y += pet.speedY;
        pet.x += pet.speedX + Math.sin(pet.y * 0.015) * 0.5;
        pet.rotation += pet.rotSpeed;

        if (pet.y > height + 20) {
          pet.y = -20;
          pet.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(pet.x, pet.y);
        ctx.rotate((pet.rotation * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(0, 0, pet.size * 0.6, pet.size, 0, 0, Math.PI * 2);

        if (isShubhVivah) {
          // Marigold yellow / orange
          ctx.fillStyle = pet.isOrange
            ? `rgba(235, 140, 25, ${pet.alpha})`
            : `rgba(248, 195, 45, ${pet.alpha})`;
        } else {
          // Blush rose
          ctx.fillStyle = `rgba(224, 153, 168, ${pet.alpha})`;
        }

        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isShubhVivah]);

  // CSS Petals
  const cssPetals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 6.2 + Math.sin(i) * 3) % 100}%`,
    size: `${6 + (i % 6)}px`,
    duration: `${14 + (i % 8) * 2}s`,
    delay: `-${(i * 1.8) % 20}s`,
    drift: `${((i % 5) - 2) * 50}px`,
    opacity: 0.2 + (i % 4) * 0.08
  }));

  return (
    <>
      <canvas id="ambient-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      {cssPetals.map((p) => (
        <i
          key={p.id}
          className={`petal ${isShubhVivah ? 'sv-marigold-petal' : ''}`}
          style={{
            '--left': p.left,
            '--size': p.size,
            '--duration': p.duration,
            '--delay': p.delay,
            '--drift': p.drift,
            '--opacity': p.opacity
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
