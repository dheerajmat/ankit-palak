import React, { useEffect } from 'react';
import { groomsFamilyData, bridesFamilyData, coupleData } from '../data/weddingData';

export default function RoyalFamiliesPage({ onBackToInvitation }) {
  useEffect(() => {
    // Scroll to top when arriving on the family page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const renderFamilyCards = (members) => (
    <div className="sv-family-grid sv-page-family-grid">
      {members.map((member, idx) => (
        <div
          key={member.id}
          className={`sv-family-card sv-family-card-${idx + 1}`}
        >
          {/* 1. Deep Royal Maroon Arch Backdrop inside temple window */}
          <div className="sv-family-arch-bg" aria-hidden="true" />

          {/* 2. Hanging Golden Temple Bell at the arch apex */}
          <img
            src="/assets/shubh-vivah/family/bell.webp"
            alt=""
            className="sv-family-bell-asset"
            aria-hidden="true"
          />

          {/* 3. Person Illustration in Royal Traditional Attire */}
          <img
            src={member.image}
            alt={member.name}
            className="sv-family-person-img"
            loading="lazy"
          />

          {/* 4. Golden Temple Arch Frame with Leaves, Lamps & Solid Golden Plaque */}
          <img
            src="/assets/shubh-vivah/family/frame.webp"
            alt="Ornate Temple Arch Frame"
            className="sv-family-frame-asset"
            loading="lazy"
          />

          {/* 5. Plaque Typography: Role & Name centered in golden cartouche */}
          <div className="sv-family-plaque-content">
            <span className="sv-family-role">{member.role}</span>
            <span className="sv-family-name">{member.name}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="sv-family-standalone-page">
      {/* 1. Sticky Royal Navigation Bar */}
      <nav className="sv-family-page-nav" aria-label="Family page navigation">
        <div className="sv-family-nav-inner">
          <button
            type="button"
            className="sv-back-nav-btn"
            onClick={onBackToInvitation}
            aria-label="Back to Wedding Invitation"
          >
            <span className="sv-back-arrow" aria-hidden="true">←</span>
            <span>Back to Wedding Invitation</span>
          </button>

          <div className="sv-family-nav-brand">
            <span className="sv-brand-names">{coupleData.names}</span>
            <span className="sv-brand-sep" aria-hidden="true">❖</span>
            <span className="sv-brand-tag">The Royal Families</span>
          </div>
        </div>
      </nav>

      {/* 2. Grand Hero Header */}
      <header className="sv-family-page-hero">
        <div className="sv-family-page-kicker">
          <span className="sv-kicker-floret" aria-hidden="true">❖</span>
          <span>SACRED HERITAGE &amp; FAMILY BLESSINGS</span>
          <span className="sv-kicker-floret" aria-hidden="true">❖</span>
        </div>

        <h1 className="sv-family-page-title">The Royal Families</h1>
        <div className="sv-family-page-hindi">॥ कुल परंपरा एवं शुभाशीर्वाद ॥</div>

        <div className="sv-family-page-flourish" aria-hidden="true">
          <span className="sv-flourish-stem left">~ ❧</span>
          <span className="sv-flourish-bloom">✿</span>
          <span className="sv-flourish-stem right">❧ ~</span>
        </div>

        <p className="sv-family-page-subtitle">
          With eternal reverence, love, and gratitude to our beloved elders and families,
          whose sacred blessings guide Ankit &amp; Palak into an eternal union of harmony and joy.
        </p>
      </header>

      {/* 3. Main Family Showcases Container */}
      <main className="sv-family-page-container">
        {/* ================= 1. THE GROOM'S FAMILY ================= */}
        <section className="sv-family-showcase-section" aria-label="The Groom's Family">
          <div className="sv-family-header-wrap">
            <div className="sv-family-subkicker">GROOM'S LINEAGE</div>
            <h2 className="sv-family-title">The Groom's Family</h2>
            <div className="sv-family-divider-line">
              <span className="sv-family-line-left" />
              <span className="sv-family-line-dot">♦</span>
              <span className="sv-family-line-right" />
            </div>
            <p className="sv-family-lineage-note">
              {coupleData.groomParents}
            </p>
          </div>

          {renderFamilyCards(groomsFamilyData)}
        </section>

        {/* Sacred Inter-Family Harmony Banner */}
        <div className="sv-family-page-interlude" aria-hidden="true">
          <div className="sv-family-inter-divider">
            <span className="sv-family-inter-line" />
            <span className="sv-family-inter-motif">❖ &nbsp; ✿ &nbsp; ❖</span>
            <span className="sv-family-inter-line" />
          </div>

          <p className="sv-interlude-shloka">
            “द्वौ कुलौ सम्बद्धौ, द्वे हृदये संयुक्ते।<br />
            शुभाशीर्वादैः पूर्णम्, मङ्गलं भवतु सर्वदा॥”
          </p>
          <div className="sv-interlude-caption">
            Two noble families united in love, two sacred hearts joined for eternity.
          </div>
        </div>

        {/* ================= 2. THE BRIDE'S FAMILY ================= */}
        <section className="sv-family-showcase-section" aria-label="The Bride's Family">
          <div className="sv-family-header-wrap">
            <div className="sv-family-subkicker">BRIDE'S LINEAGE</div>
            <h2 className="sv-family-title">The Bride's Family</h2>
            <div className="sv-family-divider-line">
              <span className="sv-family-line-left" />
              <span className="sv-family-line-dot">♦</span>
              <span className="sv-family-line-right" />
            </div>
            <p className="sv-family-lineage-note">
              {coupleData.brideParents}
            </p>
          </div>

          {renderFamilyCards(bridesFamilyData)}
        </section>

        {/* 4. Bottom Return Action Callout */}
        <section className="sv-family-return-callout">
          <div className="sv-return-card">
            <span className="sv-return-floret" aria-hidden="true">❖</span>
            <h3 className="sv-return-heading">Join Us In Celebrating</h3>
            <p className="sv-return-prose">
              Celebrate the auspicious wedding rituals, dinners, and sacred pheras with the Mathur families in Ajmer.
            </p>
            <button
              type="button"
              className="sv-btn-return-invitation"
              onClick={onBackToInvitation}
              aria-label="Return to Wedding Invitation and RSVP"
            >
              <span className="sv-back-arrow" aria-hidden="true">←</span>
              <span>Return to Wedding Invitation (RSVP)</span>
            </button>
          </div>
        </section>
      </main>

      {/* 5. Page Footer */}
      <footer className="site-footer sv-family-page-footer">
        <div className="script" style={{ fontSize: '50px' }}>
          {coupleData.names}
        </div>
        <p style={{ letterSpacing: '0.08em', fontSize: '15px' }}>
          A sacred union of two souls, two families and eternal love.
        </p>
        <p style={{ opacity: 0.85, fontSize: '13px', marginTop: '6px' }}>
          Hotel Grand Xenia &amp; Bravia Hotel · Ajmer, Rajasthan · 20 November 2026
        </p>
      </footer>
    </div>
  );
}
