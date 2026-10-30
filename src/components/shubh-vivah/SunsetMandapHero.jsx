import React, { useState, useEffect } from 'react';
import { coupleData } from '../../data/weddingData';

// Authentic Invitima Diya Flame Coordinates on Hero Mandap Lamps
const HERO_FLAMES_MOBILE = [
  { left: '4.6%', top: '76.9%' },
  { left: '95.4%', top: '76.9%' },
  { left: '4.3%', top: '87.7%' },
  { left: '9.8%', top: '87.9%' },
  { left: '90.6%', top: '88.1%' },
  { left: '96.2%', top: '87.8%' }
];

const HERO_FLAMES_DESKTOP = [
  { left: '1%', top: '78.1%' },
  { left: '98.5%', top: '78.1%' }
];

export default function SunsetMandapHero({ isGateOpened = false }) {
  // Trigger slide-in entrance animation on load or when temple doors open
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isGateOpened) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isGateOpened]);

  return (
    <section className="sv-hero-section-exact" id="mandap-hero">
      <div className={`sv-mandap-container ${isRevealed ? 'sv-revealed' : ''}`}>
        {/* Full Unclipped Mandap Artwork (Aspect 1024/1536 Mobile, 1672/941 Desktop) */}
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/assets/shubh-vivah/hero/mandap-mobile-v2.webp"
            width="1024"
            height="1536"
          />
          <img
            src="/assets/shubh-vivah/hero/mandap-desktop-v2.webp"
            alt="Ankit &amp; Palak under flower-decked temple mandap at sunset"
            width="1672"
            height="941"
            className="sv-mandap-img-exact"
            fetchPriority="high"
          />
        </picture>

        {/* Atmospheric Sky Glow */}
        <div className="sv-mandap-sky-glow" aria-hidden="true" />

        {/* 1. Auspicious Golden Crest (Top Ganesha Emblem) */}
        <div className="sv-hero-crest" aria-hidden="true">
          <svg
            viewBox="0 0 100 85"
            className="sv-crest-svg"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 8c3 4 8 7 12 7 2 0 4-1 5-3-1 7-5 13-11 16 6-1 12 2 15 7-4 0-8 2-10 5 8 1 14 6 16 13-5-2-10-1-14 2 8 4 11 11 9 19-5-4-11-5-16-2 4 7 3 15-2 20-3-5-7-7-13-6 0-7-4-13-11-16 6 1 11-2 14-7-4 0-8-2-10-5 8-1 14-6 16-13-5 2-10 1-14-2 8-4 11-11 9-19-5 4-11 5-16 2 4-7 3-15-2-20 4 5 9 6 15 5 1-7 6-13 13-16-6 1-11-2-14-7 4 0 8-2 10-5-8-1-14-6-16-13 5 2 10 1 14-2-8-4-11-11-9-19 5 4 11 5 16 2-4-7-3-15 2-20z" />
          </svg>
        </div>

        {/* 2. Shloka Invocation */}
        <div className="sv-hero-blessing-exact">
          <span className="sv-blessing-rule" />
          <span className="sv-blessing-text">॥ श्री गणेशाय नमः ॥</span>
          <span className="sv-blessing-rule" />
        </div>

        {/* 3. Names with Slide-In Animation (Optimized Size & Positioning) */}
        <div className="sv-hero-names-exact">
          <div className="sv-names-row">
            <span className={`sv-person-first sv-slide-left ${isRevealed ? 'sv-slide-active' : ''}`}>
              {coupleData.groom}
            </span>

            <span className={`sv-amp-cluster sv-slide-amp ${isRevealed ? 'sv-slide-active' : ''}`} aria-label="and">
              <span className="sv-cluster-line" />
              <span className="sv-cluster-amp">&amp;</span>
              <span className="sv-cluster-line" />
            </span>

            <span className={`sv-person-first sv-slide-right ${isRevealed ? 'sv-slide-active' : ''}`}>
              {coupleData.bride}
            </span>
          </div>

          {/* Underneath Ornamental Flourish with Center Marigold Bloom */}
          <div className={`sv-names-flourish sv-slide-flourish ${isRevealed ? 'sv-slide-active' : ''}`} aria-hidden="true">
            <span className="sv-flourish-stem left">~ ❧</span>
            <span className="sv-flourish-bloom">✿</span>
            <span className="sv-flourish-stem right">❧ ~</span>
          </div>
        </div>

        {/* 4. Active Flickering Diya Flames on Mandap Lamp Stands */}
        <div className="sv-mandap-flames-mobile" aria-hidden="true">
          {HERO_FLAMES_MOBILE.map((flame, idx) => (
            <span
              key={`hero-m-flame-${idx}`}
              className="sv-flame-dot mandap-flame"
              style={{
                left: flame.left,
                top: flame.top,
                animationDelay: `${idx * 0.28}s`
              }}
            />
          ))}
        </div>

        <div className="sv-mandap-flames-desktop" aria-hidden="true">
          {HERO_FLAMES_DESKTOP.map((flame, idx) => (
            <span
              key={`hero-d-flame-${idx}`}
              className="sv-flame-dot mandap-flame"
              style={{
                left: flame.left,
                top: flame.top,
                animationDelay: `${idx * 0.35}s`
              }}
            />
          ))}
        </div>

        {/* Seamless Soft Fade Blend from Mandap Courtyard into Cream Date Page */}
        <div className="sv-mandap-bottom-blend" aria-hidden="true" />

        {/* 6. Floating Royal Scroll Indicator ("Scroll To Explore") */}
        <div
          className={`sv-hero-scroll-indicator ${isRevealed ? 'sv-scroll-active' : ''}`}
          onClick={() => {
            const el = document.getElementById('date-banner');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          role="button"
          tabIndex={0}
          title="Scroll down to explore celebration"
          aria-label="Scroll down to date and celebration"
        >
          <span className="sv-scroll-tagline">
            <span className="sv-scroll-floret" aria-hidden="true">❖</span>
            <span>SCROLL TO EXPLORE</span>
            <span className="sv-scroll-floret" aria-hidden="true">❖</span>
          </span>
          <div className="sv-scroll-chevron-box" aria-hidden="true">
            <svg
              className="sv-scroll-arrow-svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* 5. Authentic Bottom Transition Floor Florets (as in Invitima reference) */}
      <div className="sv-hero-bottom-transition" aria-hidden="true">
        <span className="sv-gold-floret">❖</span>
        <span className="sv-gold-floret center">❖</span>
        <span className="sv-gold-floret">❖</span>
      </div>
    </section>
  );
}
