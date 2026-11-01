import React from 'react';
import confetti from 'canvas-confetti';
import { weddingAudio } from '../utils/audio';

export default function EnvelopeScene({ isOpened, onOpen }) {
  const handleOpen = () => {
    if (isOpened) return;

    // Start background flute music on envelope open
    try {
      weddingAudio.play();
    } catch {
      // ignore
    }
    
    // Trigger festive pastel & gold confetti shower
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c6a16b', '#f4b8c4', '#e8c6cc', '#d4af37', '#fffaf5']
      });
    } catch {
      // Fallback gracefully if confetti fails
    }

    onOpen();

    setTimeout(() => {
      const ganeshaEl = document.getElementById('ganesha');
      if (ganeshaEl) {
        ganeshaEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1150);
  };

  return (
    <section className={`screen ${isOpened ? 'opened' : ''}`} id="opening" data-scene="01">
      <span className="floral a">✿ ❀</span>
      <span className="floral b">✿</span>
      <span className="floral c">❀ ✿</span>

      <div className="content">
        <div className="eyebrow opening-kicker">
          A celebration of love
        </div>

        <div 
          className={`envelope-wrap ${isOpened ? 'opened' : ''}`} 
          id="envelope" 
          aria-label="Decorative royal wedding envelope"
          onClick={!isOpened ? handleOpen : undefined}
          style={{ cursor: !isOpened ? 'pointer' : 'default' }}
        >
          {/* Back panel */}
          <div className="env-back" />

          {/* Invitation Card tucked inside */}
          <div className="envelope-card">
            <div className="mini">
              <strong>WEDDING INVITATION</strong>
              <span className="names">Ankit & Palak</span>
              <div className="ornament" style={{ margin: '4px 0', height: '24px' }} />
              <small>20 · 11 · 2026</small>
            </div>
          </div>

          {/* Front triangular pockets */}
          <div className="env-front" />

          {/* Top envelope flap that rotates 180deg */}
          <div className="env-flap" />

          {/* Dori cords with tassels */}
          <div className="dori left" />
          <div className="dori right" />

          {/* Royal wax seal */}
          <button 
            type="button" 
            className="seal" 
            onClick={handleOpen} 
            title="Tap to unseal envelope"
            aria-label="Unseal wedding envelope"
          >
            ❀
          </button>
        </div>

        <button 
          className="open-btn" 
          id="openBtn" 
          onClick={handleOpen} 
          disabled={isOpened}
        >
          {isOpened ? 'Your invitation awaits below ✦' : 'Open Your Invitation ✦'}
        </button>

        <div className="scroll-hint">
          {isOpened ? 'Scroll down to explore' : 'Tap to untie the dori & open'}
        </div>
        
        <span 
          className="scroll-arrow" 
          onClick={() => {
            const el = document.getElementById(isOpened ? 'ganesha' : 'opening');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          title="Scroll down"
        >
          ⌄
        </span>
      </div>
    </section>
  );
}

