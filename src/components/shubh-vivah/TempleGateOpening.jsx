import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { coupleData } from '../../data/weddingData';
import { weddingAudio } from '../../utils/audio';

export default function TempleGateOpening({ isOpened, onOpen }) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [animPhase, setAnimPhase] = useState(() => isOpened ? 'done' : 'idle');
  const isOpeningRef = useRef(false);

  // Detect viewport aspect ratio for responsive portrait / landscape gate
  useEffect(() => {
    const updateOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  // Lock body scroll while gate is closed or animating
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpened]);

  // Handle opening sequence — ONLY triggered when "OPEN INVITATION" button is clicked
  // Slowed down for a majestic, cinematic temple gate opening experience
  const startOpenSequence = () => {
    if (isOpeningRef.current || isOpened) return;
    isOpeningRef.current = true;

    // Reset scroll to top immediately so nothing opens from below
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Play royal background flute instrumental music on gate open
    try {
      weddingAudio.play();
    } catch {
      // ignore
    }

    // Launch celebratory gold and crimson confetti
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D4A044', '#8A1F2B', '#f3cf7a', '#fff8eb']
      });
    } catch {
      // ignore
    }

    // Phase 1: Heavy wooden doors start slowly swinging open (0s)
    setAnimPhase('swinging');

    // Phase 2: Majestic camera dolly zoom smoothly pushes through doors (at 2.2s)
    setTimeout(() => {
      setAnimPhase('pushing');
    }, 2200);

    // Phase 3: Golden radiance flash floods from sanctum (at 4.2s)
    setTimeout(() => {
      setAnimPhase('flooding');
    }, 4200);

    // Phase 4: Complete transition & unlock page scroll (at 5.5s)
    setTimeout(() => {
      setAnimPhase('done');
      onOpen();
      isOpeningRef.current = false;
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 5500);
  };

  // Reset animation phase if reopened (replay)
  useEffect(() => {
    if (!isOpened) {
      setAnimPhase('idle');
      isOpeningRef.current = false;
    }
  }, [isOpened]);

  if (animPhase === 'done' && isOpened) {
    return null;
  }

  const prefix = '/assets/shubh-vivah/gate';

  // Responsive geometry calculations based on exact reference math
  const boxStyle = !isPortrait
    ? {
        width: 'max(100vw, calc(100vh * 1.5))',
        height: 'max(100vh, calc(100vw / 1.5))',
        left: 'clamp(calc(100vw - max(100vw, calc(100vh * 1.5))), calc(50vw - max(100vw, calc(100vh * 1.5)) * 0.4974), 0px)',
        top: 'clamp(calc(100vh - max(100vh, calc(100vw / 1.5))), calc(50vh - max(100vh, calc(100vw / 1.5)) * 0.4238), 0px)',
        transformOrigin: '49.74% 42.383%',
        perspectiveOrigin: '49.74% 42.383%'
      }
    : {
        width: 'max(100vw, calc(100vh * (1024 / 1536)))',
        height: 'max(100vh, calc(100vw / (1024 / 1536)))',
        left: 'clamp(calc(100vw - max(100vw, calc(100vh * (1024 / 1536)))), calc(50vw - max(100vw, calc(100vh * (1024 / 1536))) * 0.4951), 0px)',
        top: 'clamp(calc(100vh - max(100vh, calc(100vw / (1024 / 1536)))), calc(50vh - max(100vh, calc(100vw / (1024 / 1536))) * 0.5146), 0px)',
        transformOrigin: '49.512% 51.465%',
        perspectiveOrigin: '49.512% 51.465%'
      };

  const doorsSwung = animPhase === 'swinging' || animPhase === 'pushing' || animPhase === 'flooding';
  const cameraZoomed = animPhase === 'pushing' || animPhase === 'flooding';

  // Slowed, majestic door opening transition (3.8s)
  const leftDoorStyle = !isPortrait
    ? {
        left: '39.258%',
        top: '8.008%',
        width: '10.482%',
        height: '68.75%',
        transformOrigin: 'left center',
        transform: doorsSwung ? 'rotateY(-118deg)' : 'rotateY(0deg)',
        transition: 'transform 3.8s cubic-bezier(0.2, 0.7, 0.2, 1)'
      }
    : {
        left: '30.371%',
        top: '22.331%',
        width: '19.141%',
        height: '58.268%',
        transformOrigin: 'left center',
        transform: doorsSwung ? 'rotateY(-118deg)' : 'rotateY(0deg)',
        transition: 'transform 3.8s cubic-bezier(0.2, 0.7, 0.2, 1)'
      };

  const rightDoorStyle = !isPortrait
    ? {
        left: '49.74%',
        top: '8.008%',
        width: '10.547%',
        height: '68.75%',
        transformOrigin: 'right center',
        transform: doorsSwung ? 'rotateY(118deg)' : 'rotateY(0deg)',
        transition: 'transform 3.8s cubic-bezier(0.2, 0.7, 0.2, 1)'
      }
    : {
        left: '49.512%',
        top: '22.331%',
        width: '19.141%',
        height: '58.268%',
        transformOrigin: 'right center',
        transform: doorsSwung ? 'rotateY(118deg)' : 'rotateY(0deg)',
        transition: 'transform 3.8s cubic-bezier(0.2, 0.7, 0.2, 1)'
      };

  const sanctumStyle = !isPortrait
    ? {
        left: '39.258%',
        top: '8.008%',
        width: 'calc(10.482% + 10.547%)',
        height: '68.75%',
        maskImage: `url(${prefix}/landscape-opening.png)`,
        WebkitMaskImage: `url(${prefix}/landscape-opening.png)`
      }
    : {
        left: '30.371%',
        top: '22.331%',
        width: 'calc(19.141% + 19.141%)',
        height: '58.268%',
        maskImage: `url(${prefix}/portrait-opening.png)`,
        WebkitMaskImage: `url(${prefix}/portrait-opening.png)`
      };

  return (
    <div
      className="sv-gate-overlay"
      style={{
        opacity: animPhase === 'flooding' ? 0 : 1,
        transition: animPhase === 'flooding' ? 'opacity 1.4s ease-out' : 'none'
      }}
    >
      {/* 3D Gate Stage with Slow Camera Dolly Zoom */}
      <div
        className="sv-gate-stage"
        style={{
          transform: cameraZoomed ? 'scale(2.8)' : 'scale(1)',
          transition: 'transform 3.4s cubic-bezier(0.25, 1, 0.35, 1)'
        }}
      >
        <div className="sv-gate-container">
          <div className="sv-gate-box" style={boxStyle}>
            {/* Stone Temple Gateway Wall */}
            <img
              src={isPortrait ? `${prefix}/portrait.webp` : `${prefix}/landscape.webp`}
              alt="Stone Temple Gate"
              className="sv-gate-frame-img"
            />

            {/* Glowing Inner Sanctum Portal */}
            <div
              className="sv-gate-sanctum"
              style={{
                ...sanctumStyle,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                background: 'radial-gradient(ellipse at 50% 60%, #fff7dc 25%, #D4A044 65%, #8A1F2B 110%)'
              }}
            />

            {/* Left Carved Wooden Door (Does NOT open on click, only via button) */}
            <img
              src={isPortrait ? `${prefix}/portrait-left.webp` : `${prefix}/landscape-left.webp`}
              alt="Left Temple Door"
              className="sv-gate-door-left"
              style={leftDoorStyle}
            />

            {/* Right Carved Wooden Door (Does NOT open on click, only via button) */}
            <img
              src={isPortrait ? `${prefix}/portrait-right.webp` : `${prefix}/landscape-right.webp`}
              alt="Right Temple Door"
              className="sv-gate-door-right"
              style={rightDoorStyle}
            />

            {/* Slit Light Beam between closed doors */}
            {!doorsSwung && (
              <div
                className="sv-gate-light-beam"
                style={{
                  left: isPortrait ? '49.512%' : '49.74%',
                  top: isPortrait ? '23%' : '9%',
                  height: isPortrait ? '56%' : '66%'
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating Golden Sparks */}
      {!doorsSwung && (
        <div className="sv-sparks-container" aria-hidden="true">
          {[12, 28, 44, 58, 72, 86].map((l, i) => (
            <span
              key={i}
              className="sv-sparkle"
              style={{
                left: `${l}%`,
                '--dur': `${3 + (i % 3) * 0.8}s`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Radiant Golden Light Flood overlay on door swing */}
      <div
        className="sv-flood-flash"
        style={{
          opacity: animPhase === 'flooding' ? 0.95 : 0,
          pointerEvents: 'none'
        }}
      />

      {/* Fixed Bottom UI: Title & Open Invitation Button (Centered on Carved Doors) */}
      <div
        className="sv-gate-footer-fixed"
        style={{
          opacity: doorsSwung ? 0 : 1,
          transform: doorsSwung ? 'translateY(24px)' : 'translateY(0)',
          transition: 'all 0.6s ease'
        }}
      >
        <p className="sv-gate-subkicker" style={{ color: '#FAF4E8' }}>
          THE WEDDING OF
        </p>
        <h1 className="sv-gate-script-names" style={{ color: '#FFFFFF' }}>
          {coupleData.groom} &amp; {coupleData.bride}
        </h1>

        <button
          type="button"
          className="sv-open-invitation-btn"
          onClick={startOpenSequence}
          aria-label="Open wedding invitation"
        >
          {/* Animated Glowing Ring */}
          <span className="sv-btn-ring" aria-hidden="true" />
          {/* Shimmer sweep */}
          <span className="sv-btn-shimmer" aria-hidden="true" />

          {/* Door icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sv-btn-door-icon"
          >
            <path d="M11 20H2" />
            <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" />
            <path d="M11 4H8a2 2 0 0 0-2 2v14" />
            <path d="M14 12h.01" />
            <path d="M22 20h-3" />
          </svg>

          <span className="sv-btn-label">OPEN INVITATION</span>
        </button>
      </div>
    </div>
  );
}
