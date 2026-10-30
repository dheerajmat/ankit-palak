import React, { useRef, useState, useEffect } from 'react';
import { coupleData } from '../../data/weddingData';

export default function CoupleGildedFrames() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sv-couple-section ${isVisible ? 'sv-section-animated' : ''}`}
      id="couple-gilded"
    >
      {/* Auspicious Royal Eyebrow / Kicker */}
      <div className="sv-couple-kicker">
        <span className="sv-couple-floret" aria-hidden="true">❖</span>
        <span>TWO SOULS · ONE SACRED JOURNEY</span>
        <span className="sv-couple-floret" aria-hidden="true">❖</span>
      </div>

      {/* Royal Main Section Title in Hero Pinyon Script with Golden Glint */}
      <div className="sv-couple-title-wrap">
        <h2 className="sv-couple-title">
          The Bride &amp; Groom
        </h2>
        {/* Animated Gold Shimmer Glint Sweep */}
        <div className="sv-couple-title-glint" aria-hidden="true">
          <div className="sv-title-glint-beam" />
        </div>
      </div>

      {/* Underneath Ornamental Flourish with Bloom (matching Hero names flourish) */}
      <div className="sv-couple-flourish" aria-hidden="true">
        <span className="sv-cpl-stem left">~ ❧</span>
        <span className="sv-cpl-bloom">✿</span>
        <span className="sv-cpl-stem right">❧ ~</span>
      </div>

      {/* Royal Gold Filigree Divider */}
      <div className="sv-couple-divider-wrap" aria-hidden="true">
        <svg viewBox="0 0 240 22" width="160" height="15" className="sv-couple-divider-svg">
          <defs>
            <linearGradient id="cplGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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
          <path d="M108 14 C100 10, 94 16, 88 13 C82 10, 75 14, 62 14 L12 14" fill="none" stroke="url(#cplGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="86" cy="13" r="1.5" fill="#FFEBB0" />
          <path d="M132 14 C140 10, 146 16, 152 13 C158 10, 165 14, 178 14 L228 14" fill="none" stroke="url(#cplGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="154" cy="13" r="1.5" fill="#FFEBB0" />
        </svg>
      </div>

      {/* Bold, Rich Contrast Blessing Quote */}
      <p className="sv-couple-quote">
        “Two hearts woven together by traditions, blessings and everlasting love.”
      </p>

      {/* Gilded Couple Cards Grid */}
      <div className="sv-couple-grid">
        {/* Groom: Ankit (Slides in from Left) */}
        <div className="sv-couple-card sv-card-groom">
          <div className="sv-gilded-frame">
            <img
              src="/assets/shubh-vivah/couple/groom-frame.webp"
              alt="Gilded Groom Frame"
              className="sv-frame-asset"
              loading="lazy"
            />
            <div className="sv-photo-slot">
              <img
                src="/assets/shubh-vivah/family/man.webp"
                alt="Groom Ankit"
                style={{ objectFit: 'contain', padding: '15%' }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="sv-person-name">{coupleData.groom}</div>
          <div className="sv-person-role">The Groom</div>
          <div className="sv-person-family">
            Son of Lt. Mrs. Rashmi &amp; Mr. Pradeep Mathur
          </div>
        </div>

        {/* Bride: Palak (Slides in from Right) */}
        <div className="sv-couple-card sv-card-bride">
          <div className="sv-gilded-frame">
            <img
              src="/assets/shubh-vivah/couple/bride-frame.webp"
              alt="Gilded Bride Frame"
              className="sv-frame-asset"
              loading="lazy"
            />
            <div className="sv-photo-slot">
              <img
                src="/assets/shubh-vivah/family/woman.webp"
                alt="Bride Palak"
                style={{ objectFit: 'contain', padding: '15%' }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="sv-person-name">{coupleData.bride}</div>
          <div className="sv-person-role">The Bride</div>
          <div className="sv-person-family">
            {coupleData.brideParents || "Daughter of Smt. & Shri Verma"}
          </div>
        </div>
      </div>

      {/* Royal Monogram / Hashtag Pill */}
      <div className="sv-couple-hashtag-wrap">
        <span className="sv-couple-hashtag-pill">
          <span className="sv-hashtag-sparkle" aria-hidden="true">✦</span>
          {coupleData.hashtag}
          <span className="sv-hashtag-sparkle" aria-hidden="true">✦</span>
        </span>
      </div>
    </section>
  );
}
