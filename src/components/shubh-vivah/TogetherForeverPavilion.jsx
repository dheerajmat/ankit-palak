import React, { useState } from 'react';
import { coupleData } from '../../data/weddingData';

const SAAT_PHERE_VOWS = [
  {
    step: 1,
    titleHindi: 'प्रथम फेरा',
    name: 'Nourishment & Harmony',
    sanskrit: 'ॐ एष एकपदो भवति',
    desc: 'With the first sacred step, we pray for divine nourishment, vitality, and peace in our home. We pledge to care for one another with respect and devotion.'
  },
  {
    step: 2,
    titleHindi: 'द्वितीय फेरा',
    name: 'Strength & Courage',
    sanskrit: 'द्विपदी भव',
    desc: 'With the second step, we pray for physical, mental, and spiritual strength to walk through all seasons of life with courage and unwavering trust.'
  },
  {
    step: 3,
    titleHindi: 'तृतीय फेरा',
    name: 'Prosperity & Righteousness',
    sanskrit: 'त्रिपदी भव',
    desc: 'With the third step, we pledge to cultivate prosperity through honesty and wisdom, sharing our blessings with family, elders, and the world.'
  },
  {
    step: 4,
    titleHindi: 'चतुर्थ फेरा',
    name: 'Family & Mutual Respect',
    sanskrit: 'चतुष्पदी भव',
    desc: 'With the fourth step, we promise to cherish our families, celebrate our traditions, and fill our sanctuary with warmth, laughter, and understanding.'
  },
  {
    step: 5,
    titleHindi: 'पंचम फेरा',
    name: 'Virtue & Wisdom',
    sanskrit: 'पंचपदी भव',
    desc: 'With the fifth step, we pray for virtuous lives, noble thoughts, and divine blessings for our family and future generations.'
  },
  {
    step: 6,
    titleHindi: 'षष्ठ फेरा',
    name: 'Everlasting Companionship',
    sanskrit: 'षट्पदी भव',
    desc: 'With the sixth step, we celebrate together in every season of life—sharing both sunny dawns and gentle rains hand in hand.'
  },
  {
    step: 7,
    titleHindi: 'सप्तम फेरा',
    name: 'Sacred Friendship',
    sanskrit: 'सखा सप्तापदा भव',
    desc: 'With the seventh and eternal step, we become true lifelong companions. Our hearts beat as one, united forever in love, trust, and spiritual harmony.'
  }
];

export default function TogetherForeverPavilion() {
  const [activeVowIndex, setActiveVowIndex] = useState(0);
  const activeVow = SAAT_PHERE_VOWS[activeVowIndex];

  return (
    <section className="sv-together-section" id="our-story" aria-label="Together, Forever Section">
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

        {/* 4. Interactive Saat Phere (Seven Sacred Vows) Keepsake */}
        <div className="sv-saat-phere-container">
          <div className="sv-saat-phere-header">
            <span className="sv-saat-phere-kicker">SACRED VOWS OF HINDU VIVAH</span>
            <h3 className="sv-saat-phere-title">सात फेरे · The Seven Vows</h3>
            <p className="sv-saat-phere-intro">
              The sacred promises taken around the holy Agni that bind two souls for seven lifetimes.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="sv-saat-phere-tabs" role="tablist" aria-label="Seven Sacred Vows">
            {SAAT_PHERE_VOWS.map((vow, idx) => {
              const isActive = idx === activeVowIndex;
              return (
                <button
                  key={vow.step}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Vow ${vow.step}: ${vow.name}`}
                  className={`sv-vow-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveVowIndex(idx)}
                >
                  <span className="sv-vow-step-num">0{vow.step}</span>
                  <span className="sv-vow-step-hindi">{vow.titleHindi}</span>
                </button>
              );
            })}
          </div>

          {/* Active Vow Display Card */}
          <div className="sv-active-vow-card">
            <div className="sv-vow-badge-row">
              <span className="sv-vow-step-pill">STEP 0{activeVow.step} OF 07</span>
              <span className="sv-vow-sanskrit-tag">{activeVow.sanskrit}</span>
            </div>

            <h4 className="sv-active-vow-title">
              {activeVow.name} <span className="sv-vow-hindi-sub">({activeVow.titleHindi})</span>
            </h4>

            <p className="sv-active-vow-desc">
              {activeVow.desc}
            </p>

            <div className="sv-vow-nav-footer">
              <button
                type="button"
                className="sv-vow-nav-btn"
                disabled={activeVowIndex === 0}
                onClick={() => setActiveVowIndex((prev) => Math.max(0, prev - 1))}
              >
                ← Previous Vow
              </button>

              <span className="sv-vow-nav-counter">
                {activeVowIndex + 1} / 7
              </span>

              <button
                type="button"
                className="sv-vow-nav-btn"
                disabled={activeVowIndex === SAAT_PHERE_VOWS.length - 1}
                onClick={() => setActiveVowIndex((prev) => Math.min(SAAT_PHERE_VOWS.length - 1, prev + 1))}
              >
                Next Vow →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
