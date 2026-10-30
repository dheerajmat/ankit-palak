import React from 'react';
import { coupleData } from '../data/weddingData';

export default function FinaleScene({ onReplay, theme = 'shubh-vivah' }) {
  const isShubhVivah = theme === 'shubh-vivah';

  return (
    <>
      <section className="screen" id="finale" data-scene="06">
        <div className="section-index">
          {isShubhVivah ? '॥ शुभ विवाह ॥' : 'The beginning of forever'}
        </div>
        <span className="floral a">{isShubhVivah ? '✿ ॐ ✿' : '✿ ❀ ✿'}</span>
        <span className="floral b">{isShubhVivah ? 'ॐ' : '❀'}</span>
        <span className="floral c">{isShubhVivah ? '✿ ॐ ✿' : '✿ ❀'}</span>

        <div className="content arch">
          <div className="eyebrow">
            {isShubhVivah ? 'WITH REVERENCE & JOY' : 'With warmest wishes'}
          </div>

          <h2
            className="script final-names"
            style={{
              margin: '18px 0',
              color: isShubhVivah ? 'var(--sv-crimson)' : 'var(--rose)'
            }}
          >
            {coupleData.groom}{' '}
            <span
              style={{
                fontSize: '0.6em',
                color: isShubhVivah ? 'var(--sv-gold)' : 'var(--gold)'
              }}
            >
              &amp;
            </span>{' '}
            {coupleData.bride}
          </h2>

          <div className="ornament" />

          <p style={{ fontSize: '20px', marginTop: '6px' }}>
            Your gracious presence and heartfelt blessings will make this sacred milestone unforgettable.
          </p>

          <p
            style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              color: isShubhVivah ? 'var(--sv-crimson)' : 'var(--rose)',
              fontSize: '26px',
              fontWeight: 600,
              marginTop: '18px'
            }}
          >
            आप सादर आमंत्रित हैं
          </p>

          <div
            className="ornament-text"
            style={{
              fontSize: '15px',
              letterSpacing: '0.14em',
              margin: '14px 0',
              color: isShubhVivah ? 'var(--sv-gold)' : 'var(--gold)'
            }}
          >
            — WITH LOVE &amp; BLESSINGS FROM BOTH FAMILIES —
          </div>

          <button
            className={isShubhVivah ? 'sv-open-invitation-btn replay' : 'next-btn replay'}
            id="replayBtn"
            onClick={onReplay}
            style={{ marginTop: '20px' }}
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
          A celebration of two souls, two families and sacred eternal love.
        </p>
        <p style={{ opacity: 0.85, fontSize: '13.5px', marginTop: '8px' }}>
          Hotel Grand Xenia · Ajmer, Rajasthan · 20 November 2026
        </p>
      </footer>
    </>
  );
}
