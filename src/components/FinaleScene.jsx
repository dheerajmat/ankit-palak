import React from 'react';
import { coupleData } from '../data/weddingData';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function FinaleScene({ onReplay, theme = 'shubh-vivah' }) {
  const [sectionRef, isVisible] = useScrollReveal();
  const isShubhVivah = theme === 'shubh-vivah';

  return (
    <>
      <section
        ref={sectionRef}
        className={`screen sv-thankyou-section ${isVisible ? 'sv-section-animated' : ''}`}
        id="thank-you"
        data-scene="06"
        aria-label="Thank You and Blessings"
      >
        <div className="section-index">
          {isShubhVivah ? '॥ आभार एवं धन्यवाद ॥' : 'With Heartfelt Gratitude'}
        </div>
        <span className="floral a">{isShubhVivah ? '✿ ॐ ✿' : '✿ ❀ ✿'}</span>
        <span className="floral b">{isShubhVivah ? 'ॐ' : '❀'}</span>
        <span className="floral c">{isShubhVivah ? '✿ ॐ ✿' : '✿ ❀'}</span>

        <div className="content arch sv-thankyou-arch">
          <div className="eyebrow">
            {isShubhVivah ? 'WITH REVERENCE, LOVE & GRATITUDE' : 'With Our Deepest Gratitude'}
          </div>

          <h2
            className="script final-names"
            style={{
              margin: '14px 0 6px',
              fontSize: 'clamp(50px, 8.5vw, 76px)',
              color: isShubhVivah ? 'var(--sv-crimson)' : 'var(--rose)'
            }}
          >
            Dhanyawad
          </h2>

          <div
            className="sv-thankyou-subtitle"
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: 'clamp(15px, 2.4vw, 19px)',
              letterSpacing: '0.12em',
              color: isShubhVivah ? '#8A5A12' : '#8C5E58',
              marginBottom: '14px',
              fontWeight: 600
            }}
          >
            THANK YOU FOR BEING A PART OF OUR AUSPICIOUS CELEBRATION
          </div>

          <div className="ornament" />

          <p
            style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              marginTop: '12px',
              lineHeight: 1.6,
              maxWidth: '620px',
              margin: '12px auto 0'
            }}
          >
            We sincerely thank you from the bottom of our hearts for your love, divine blessings,
            and gracious presence. Your warmth makes our sacred union and joyful wedding memories truly unforgettable.
          </p>

          <p
            style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              color: isShubhVivah ? 'var(--sv-crimson)' : 'var(--rose)',
              fontSize: 'clamp(22px, 3.2vw, 28px)',
              fontWeight: 600,
              marginTop: '16px',
              marginBottom: '4px'
            }}
          >
            हृदय से आभार एवं धन्यवाद
          </p>

          <div
            className="ornament-text"
            style={{
              fontSize: '14px',
              letterSpacing: '0.14em',
              margin: '14px 0',
              color: isShubhVivah ? 'var(--sv-gold)' : 'var(--gold)',
              fontWeight: 700
            }}
          >
            — WITH LOVE &amp; BLESSINGS FROM ANKIT, PALAK &amp; BOTH FAMILIES —
          </div>

          <button
            className={isShubhVivah ? 'sv-open-invitation-btn replay' : 'next-btn replay'}
            id="replayBtn"
            onClick={onReplay}
            style={{ marginTop: '16px' }}
            aria-label="Revisit invitation from the beginning"
          >
            <span>↻</span>
            <span>OPEN INVITATION AGAIN</span>
          </button>

          <div className="footer-note" style={{ marginTop: '22px' }}>
            {coupleData.dateText} · {coupleData.location}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="script" style={{ fontSize: '52px' }}>
          {coupleData.names}
        </div>
        <p style={{ letterSpacing: '0.08em', fontSize: '16px' }}>
          A sacred union of two souls, two families and eternal love.
        </p>
        <p style={{ opacity: 0.85, fontSize: '13.5px', marginTop: '8px' }}>
          Hotel Grand Xenia &amp; Bravia Hotel · Ajmer, Rajasthan · 20 November 2026
        </p>
      </footer>
    </>
  );
}
