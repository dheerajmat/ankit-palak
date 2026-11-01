import React from 'react';
import { coupleData } from '../../data/weddingData';
import { useScrollReveal } from '../../utils/useScrollReveal';

export default function TogetherForeverPavilion() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className={`sv-together-section ${isVisible ? 'sv-section-animated' : ''}`}
      id="our-story"
      aria-label="Together, Forever Section"
    >
      <div className="sv-together-container">
        {/* 1. Royal Section Header */}
        <div className="sv-together-header">
          <span className="sv-together-kicker">A SACRED UNION OF TWO SOULS</span>
          <h2 className="sv-together-title">Together, Forever</h2>
          <div className="sv-together-motif" aria-hidden="true">
            <span className="sv-motif-line" />
            <span className="sv-motif-symbol">❖</span>
            <span className="sv-motif-line" />
          </div>
        </div>

        {/* 2. Sacred Rigveda Vivah Shloka Cartouche */}
        <div className="sv-shloka-cartouche">
          <div className="sv-shloka-corner tl" aria-hidden="true" />
          <div className="sv-shloka-corner tr" aria-hidden="true" />
          <div className="sv-shloka-corner bl" aria-hidden="true" />
          <div className="sv-shloka-corner br" aria-hidden="true" />

          <p className="sv-shloka-sanskrit">
            ॥ यदेतद्धृदयं तव तदस्तु हृदयं मम । यदिदं हृदयं मम तदस्तु हृदयं तव ॥
          </p>
          <p className="sv-shloka-meaning">
            “May your heart be mine, and my heart be yours.”
          </p>
          <span className="sv-shloka-source">— Rigveda Vivah Sukta</span>
        </div>

        {/* 3. Central Monogram & Couple's Invitation Keepsake */}
        <div className="sv-keepsake-card">
          <div className="sv-monogram-halo-wrap">
            <div className="sv-monogram-halo" />
            <img
              src="/assets/ap-monogram.webp"
              alt="Ankit & Palak Royal Monogram"
              className="sv-monogram-emblem"
              loading="lazy"
            />
          </div>

          <blockquote className="sv-keepsake-quote">
            {coupleData.invitationQuote}
          </blockquote>

          <p className="sv-keepsake-sub">
            {coupleData.subQuote}
          </p>

          <div className="sv-keepsake-names-row">
            <span className="sv-keepsake-name">Ankit</span>
            <span className="sv-keepsake-amp">&</span>
            <span className="sv-keepsake-name">Palak</span>
          </div>
        </div>
      </div>
    </section>
  );
}
