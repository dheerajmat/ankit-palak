import React from 'react';
import { coupleData } from '../data/weddingData';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function FinaleScene({ onReplay, theme = 'shubh-vivah' }) {
  const [sectionRef, isVisible] = useScrollReveal();
  const isShubhVivah = theme === 'shubh-vivah';

  return (
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

        {/* Pure Vector Royal SVG Gold Divider (Zero external image dependencies) */}
        <div className="sv-thankyou-flourish" aria-hidden="true">
          <span className="sv-flourish-stem left">~ ❧</span>
          <span className="sv-flourish-bloom">✿</span>
          <span className="sv-flourish-stem right">❧ ~</span>
        </div>

        <div className="sv-thankyou-divider-wrap" aria-hidden="true" style={{ margin: '8px auto 14px', display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 240 22" width="180" height="17" className="sv-thankyou-divider-svg">
            <defs>
              <linearGradient id="tyGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="25%" stopColor="#C49132" />
                <stop offset="50%" stopColor="#FFEBB0" />
                <stop offset="75%" stopColor="#C49132" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d="M120 3 C116 7, 116 13, 120 17 C124 13, 124 7, 120 3 Z" fill="#FFEBB0" />
            <path d="M120 7 C113 8, 109 12, 112 16 C116 15, 118 12, 120 7 Z" fill="#D4A044" />
            <path d="M120 7 C127 8, 131 12, 128 16 C124 15, 122 12, 120 7 Z" fill="#D4A044" />
            <path d="M108 14 C100 10, 94 16, 88 13 C82 10, 75 14, 62 14 L12 14" fill="none" stroke="url(#tyGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="86" cy="13" r="1.5" fill="#FFEBB0" />
            <path d="M132 14 C140 10, 146 16, 152 13 C158 10, 165 14, 178 14 L228 14" fill="none" stroke="url(#tyGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="154" cy="13" r="1.5" fill="#FFEBB0" />
          </svg>
        </div>

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
  );
}
