import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { coupleData, venueData } from '../../data/weddingData';

export default function ScratchCardReveal() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [coinPos, setCoinPos] = useState({ x: 50, y: 50, visible: false });
  const isRevealedRef = useRef(false);
  const lastPointRef = useRef(null);
  const checkThrottleRef = useRef(0);
  const sparkAnimRef = useRef([]);

  // Initialize and paint the royal gold foil surface on canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Reset composite operation to default
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic 24K gold foil gradient
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0, '#B8860B');
    goldGrad.addColorStop(0.18, '#FFEAA7');
    goldGrad.addColorStop(0.38, '#D4A044');
    goldGrad.addColorStop(0.58, '#FFF4D0');
    goldGrad.addColorStop(0.78, '#A06E1A');
    goldGrad.addColorStop(1, '#EAC06C');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle brushed metallic texture lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1;
    for (let y = 4; y < h; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Subtle royal lattice (jali) pattern overlay
    ctx.strokeStyle = 'rgba(123, 24, 36, 0.12)';
    ctx.lineWidth = 1;
    const step = 20;
    for (let x = -h; x < w + h; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + h, 0);
      ctx.stroke();
    }

    // Outer double gold & crimson decorative borders
    ctx.strokeStyle = '#8A1F2B';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.strokeStyle = '#FFEBB0';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Ornate 4 Corner Brackets
    const cornerSize = Math.min(24, w * 0.075);
    ctx.strokeStyle = '#8A1F2B';
    ctx.lineWidth = 2;
    // Top-left
    ctx.strokeRect(14, 14, cornerSize, cornerSize);
    // Top-right
    ctx.strokeRect(w - 14 - cornerSize, 14, cornerSize, cornerSize);
    // Bottom-left
    ctx.strokeRect(14, h - 14 - cornerSize, cornerSize, cornerSize);
    // Bottom-right
    ctx.strokeRect(w - 14 - cornerSize, h - 14 - cornerSize, cornerSize, cornerSize);

    // Center circular royal wax seal medallion
    const cx = w / 2;
    const cy = h / 2 - 14;
    const radius = Math.min(w, h) * 0.22;

    // Medallion outer beaded ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 160, 68, 0.6)';
    ctx.fill();

    // 16 Decorative Gold Beaded Studs around Seal
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      const bx = cx + (radius + 3) * Math.cos(angle);
      const by = cy + (radius + 3) * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(bx, by, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFEBB0';
      ctx.fill();
    }

    // Medallion inner lacquered crimson core
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#760E18';
    ctx.fill();
    ctx.strokeStyle = '#F0C975';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Sacred Devanagari Emblem inside medallion
    ctx.font = `700 ${Math.max(22, radius * 0.68)}px 'Noto Serif Devanagari', serif`;
    ctx.fillStyle = '#FFEBB0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('॥ ॐ ॥', cx, cy - 2);

    // Call to action text on the foil
    ctx.font = `700 ${Math.max(12, w * 0.035)}px 'Cinzel', serif`;
    ctx.fillStyle = '#4A1218';
    ctx.fillText('ROYAL SHUBH LAGAN PATRIKA', cx, cy + radius + 22);

    ctx.font = `700 ${Math.max(10, w * 0.027)}px 'Cinzel', serif`;
    ctx.fillStyle = '#7B1824';
    ctx.fillText('✦ SCRATCH TO UNVEIL THE SACRED DATE ✦', cx, cy + radius + 38);

    ctx.font = `italic 600 ${Math.max(10.5, w * 0.026)}px 'Cormorant Garamond', Georgia, serif`;
    ctx.fillStyle = '#5A1B22';
    ctx.fillText('Rub with gold coin or finger ✨', cx, cy + radius + 54);

    setIsRevealed(false);
    isRevealedRef.current = false;
    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealedRef.current) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // Check how much percentage has been scratched
  const calculateScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const stride = 24;
      let sampled = 0;

      for (let i = 3; i < data.length; i += 4 * stride) {
        sampled++;
        if (data[i] < 50) {
          transparentPixels++;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / sampled) * 100));
      setScratchPercent(percent);

      // Once 30% or more is scratched, auto-reveal completely!
      if (percent >= 30 && !isRevealedRef.current) {
        triggerSuccessReveal();
      }
    } catch {
      // ignore
    }
  };

  const triggerSuccessReveal = () => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setScratchPercent(100);

    // Haptic victory vibration pattern
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([60, 40, 100, 40, 140]);
      } catch {
        // ignore
      }
    }

    // Celebratory Gold & Crimson Confetti Shower
    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.62 },
        colors: ['#D4A044', '#8A1F2B', '#f3cf7a', '#fff9ed', '#e67e22']
      });

      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 65,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#D4A044', '#f3cf7a', '#8A1F2B']
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 65,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#D4A044', '#f3cf7a', '#8A1F2B']
        });
      }, 220);
    } catch {
      // ignore
    }

    // Fade canvas out smoothly
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = 'opacity 0.6s ease-out';
      canvas.style.opacity = '0';
      setTimeout(() => {
        if (canvas) canvas.style.pointerEvents = 'none';
      }, 600);
    }
  };

  // Erase stroke on canvas
  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    const brushRadius = Math.max(24, Math.min(34, canvas.offsetWidth * 0.07));
    ctx.lineWidth = brushRadius * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    }
    ctx.stroke();

    lastPointRef.current = { x, y };

    // Haptic tick
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(8);
      } catch {
        // ignore
      }
    }

    // Throttle percentage check
    const now = Date.now();
    if (now - checkThrottleRef.current > 100) {
      checkThrottleRef.current = now;
      calculateScratched();
    }
  };

  // Accurate logical canvas coordinates
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handlePointerDown = (e) => {
    if (isRevealedRef.current) return;
    try {
      if (e.target && e.target.setPointerCapture) {
        e.target.setPointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    setIsScratching(true);
    const coords = getCoordinates(e);
    if (coords) {
      lastPointRef.current = coords;
      scratchAt(coords.x, coords.y);
      setCoinPos({ x: coords.x, y: coords.y, visible: true });
    }
  };

  const handlePointerMove = (e) => {
    const coords = getCoordinates(e);
    if (coords) {
      setCoinPos({ x: coords.x, y: coords.y, visible: true });
      if (isScratching && !isRevealedRef.current) {
        scratchAt(coords.x, coords.y);
      }
    }
  };

  const handlePointerUp = (e) => {
    setIsScratching(false);
    lastPointRef.current = null;
    try {
      if (e.target && e.target.releasePointerCapture) {
        e.target.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    calculateScratched();
  };

  const handlePointerLeave = () => {
    setIsScratching(false);
    lastPointRef.current = null;
    setCoinPos((prev) => ({ ...prev, visible: false }));
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = 'none';
      canvas.style.opacity = '1';
      canvas.style.pointerEvents = 'auto';
    }
    initCanvas();
  };

  return (
    <div className="sv-scratch-section-wrap" id="scratch-date">
      {/* Header with Royal Tag */}
      <div className="sv-scratch-header">
        <span className="sv-scratch-tag">ROYAL CEREMONY SIGN</span>
        <h3 className="sv-scratch-title">Scratch The Royal Wedding Sign</h3>
        <p className="sv-scratch-desc">
          Rub across the 24K gold seal with your finger or cursor to unveil the auspicious wedding date!
        </p>
      </div>

      {/* Royal Arch Crest on Top of the Card */}
      <div className="sv-scratch-royal-crest" aria-hidden="true">
        <span className="sv-crest-flank">🪔</span>
        <span className="sv-crest-title">॥ राजसी शुभ लग्न पत्रिका ॥</span>
        <span className="sv-crest-flank">🪔</span>
      </div>

      {/* Outer Royal Card Frame */}
      <div className="sv-scratch-outer-card" ref={containerRef}>
        {/* Corner Gold Filigree Motifs */}
        <div className="sv-card-corner-motif top-left" aria-hidden="true">❖</div>
        <div className="sv-card-corner-motif top-right" aria-hidden="true">❖</div>
        <div className="sv-card-corner-motif bottom-left" aria-hidden="true">❖</div>
        <div className="sv-card-corner-motif bottom-right" aria-hidden="true">❖</div>

        {/* Background Revealed Signboard Content */}
        <div className="sv-scratch-revealed-content" aria-hidden={!isRevealed}>
          {/* Inner Ornate Gold Inlay Border */}
          <div className="sv-revealed-inlay-border" aria-hidden="true" />

          {/* Shloka Invocations */}
          <div className="sv-revealed-shloka">॥ ॐ श्री गणेशाय नमः ॥</div>
          <div className="sv-revealed-sub-shloka">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ</div>

          {/* Couple Calligraphy */}
          <div className="sv-revealed-couple">
            {coupleData.groom} <span className="sv-revealed-amp">&amp;</span> {coupleData.bride}
          </div>

          <div className="sv-revealed-motif">❖ ❖ ❖</div>

          {/* Golden Royal Date Cartouche */}
          <div className="sv-revealed-banner">
            <span className="sv-revealed-tagline">WEDDING CELEBRATION</span>
            <div className="sv-revealed-date-box">
              <span className="sv-revealed-date">20 NOVEMBER 2026</span>
            </div>
            <span className="sv-revealed-tithi">शुक्रवार · मार्गशीर्ष शुक्ल एकादशी · वि. सं. २०८३</span>
          </div>

          <div className="sv-revealed-venue">
            <strong>{venueData.primary.name}</strong>
            <span>{venueData.primary.address}, Ajmer</span>
          </div>

          <div className="sv-revealed-flourish">
            ✦ With Love &amp; Divine Elder Blessings ✦
          </div>
        </div>

        {/* Foreground Scratch Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="sv-scratch-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          aria-label="Interactive scratch card. Drag or swipe to scratch."
          role="img"
        />

        {/* Floating Gold Coin Scratcher Tool */}
        {!isRevealed && coinPos.visible && (
          <div
            className={`sv-scratch-coin-cursor ${isScratching ? 'active' : ''}`}
            style={{
              left: `${coinPos.x}px`,
              top: `${coinPos.y}px`
            }}
            aria-hidden="true"
          >
            <div className="sv-coin-inner">🪙</div>
          </div>
        )}

        {/* Scratch Progress Pill Badge */}
        {!isRevealed && scratchPercent > 0 && (
          <div className="sv-scratch-badge">
            Scratched {scratchPercent}%
          </div>
        )}
      </div>

      {/* Floating Prompt Bar */}
      {!isRevealed && scratchPercent === 0 && (
        <div className="sv-scratch-coin-prompt" aria-hidden="true">
          <span className="sv-coin-icon">🪙</span>
          <span>Scratch the golden seal with your coin or finger!</span>
        </div>
      )}

      {/* Instant Reveal & Reset Controls */}
      {!isRevealed ? (
        <div className="sv-scratch-actions-pre">
          <button
            type="button"
            className="sv-scratch-instant-btn"
            onClick={triggerSuccessReveal}
            title="Instantly reveal wedding date"
          >
            <span>✨</span> Tap To Reveal Instantly
          </button>
        </div>
      ) : (
        <div className="sv-scratch-revealed-actions">
          <span className="sv-scratch-success-pill">
            🎉 Date Unveiled Successfully!
          </span>
          <button
            type="button"
            className="sv-scratch-replay-btn"
            onClick={handleReset}
            title="Scratch the card again"
          >
            <span>↺</span> Scratch Again
          </button>
        </div>
      )}
    </div>
  );
}
