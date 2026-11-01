import React from 'react';
import { coupleData } from '../../data/weddingData';
import { useScrollReveal } from '../../utils/useScrollReveal';

export default function YouAreInvitedSection({ onOpenFamilyPage, onOpenFamilyModal }) {
  const [sectionRef, isVisible] = useScrollReveal();
  const handleOpenFamily = onOpenFamilyPage || onOpenFamilyModal;

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`long-section sv-invitation-section ${isVisible ? 'sv-section-animated' : ''}`}
      id="invitation"
      aria-label="Sacred Wedding Invitation"
    >
      <div className="sv-invitation-inner">
        {/* Royal Parchment Decree Card */}
        <div className="sv-invitation-card">
          {/* Corner Florets */}
          <div className="sv-card-corner tl" aria-hidden="true">❖</div>
          <div className="sv-card-corner tr" aria-hidden="true">❖</div>
          <div className="sv-card-corner bl" aria-hidden="true">❖</div>
          <div className="sv-card-corner br" aria-hidden="true">❖</div>

          {/* Ganesha Invocation & Kicker */}
          <div className="sv-invitation-kicker">
            <span className="sv-invitation-floret" aria-hidden="true">❖</span>
            <span>॥ ॐ श्री गणेशाय नमः ॥</span>
            <span className="sv-invitation-floret" aria-hidden="true">❖</span>
          </div>

          {/* Sacred Sanskrit Shloka */}
          <p className="sv-invitation-shloka">
            मंगलं भगवान विष्णुः, मंगलं गरुडध्वजः।<br />
            मंगलं पुण्डरीकाक्षः, मंगलाय तनो हरिः॥
          </p>

          <div className="sv-invitation-divider" aria-hidden="true">
            <span className="sv-divider-stem left">~ ❧</span>
            <span className="sv-divider-bloom">✿</span>
            <span className="sv-divider-stem right">❧ ~</span>
          </div>

          {/* Main Title */}
          <h2 className="sv-invitation-title">You Are Cordially Invited</h2>
          <div className="sv-invitation-hindi">आप सादर आमंत्रित हैं</div>

          {/* Invitation Prose */}
          <p className="sv-invitation-prose">
            With the divine grace of the Almighty and the cherished blessings of our elders,
            we invite you and your loved ones to grace the auspicious wedding celebrations
            and sacred pheras uniting
          </p>

          {/* Couple Feature Highlight */}
          <div className="sv-invitation-couple">
            <span className="sv-couple-name groom">{coupleData.groom}</span>
            <span className="sv-couple-amp">&amp;</span>
            <span className="sv-couple-name bride">{coupleData.bride}</span>
          </div>

          <div className="sv-invitation-parents">
            <p className="sv-parents-line">{coupleData.groomParents}</p>
            <p className="sv-parents-line">{coupleData.brideParents}</p>
          </div>

          {/* Auspicious Date & Destination Pill Banner */}
          <div className="sv-invitation-meta-strip">
            <div className="sv-meta-item">
              <span className="sv-meta-icon" aria-hidden="true">🗓️</span>
              <span className="sv-meta-text">20th November 2026</span>
            </div>
            <div className="sv-meta-sep" aria-hidden="true">✦</div>
            <div className="sv-meta-item">
              <span className="sv-meta-icon" aria-hidden="true">📍</span>
              <span className="sv-meta-text">Ajmer, Rajasthan</span>
            </div>
            <div className="sv-meta-sep" aria-hidden="true">✦</div>
            <div className="sv-meta-item">
              <span className="sv-meta-icon" aria-hidden="true">🏛️</span>
              <span className="sv-meta-text">Hotel Grand Xenia &amp; Bravia Hotel</span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="sv-invitation-actions">
            <button
              type="button"
              className="sv-btn-rsvp-jump"
              onClick={scrollToRsvp}
              aria-label="Confirm attendance on RSVP form"
            >
              <span>Confirm Your Presence (RSVP)</span>
              <span className="sv-btn-arrow" aria-hidden="true">↓</span>
            </button>

            <button
              type="button"
              className="sv-btn-family-modal"
              onClick={handleOpenFamily}
              aria-label="View the Groom and Bride royal families page"
            >
              <span className="sv-btn-sparkle" aria-hidden="true">✦</span>
              <span>Meet The Royal Families →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
