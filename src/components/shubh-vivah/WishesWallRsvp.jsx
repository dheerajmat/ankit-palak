import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useScrollReveal } from '../../utils/useScrollReveal';

// Static Google Apps Script Webhook URL for live Google Sheet updates & instant notifications
const RSVP_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyKsXw8RAYE_JxNGfm1anEsNdeS6L9pV4Jbkoy6Jjwn_613BSuO1l2PJs-wzGEWbClB/exec";

export default function WishesWallRsvp() {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    attendance: 'Joyfully accepts',
    guestCount: '2',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const savedRsvp = localStorage.getItem('sv_guest_rsvp');
    if (savedRsvp) {
      try {
        const parsed = JSON.parse(savedRsvp);
        setFormData(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      ...formData,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      couple: 'Ankit & Palak Wedding'
    };

    // 1. Always persist to localStorage for instant client recovery
    localStorage.setItem('sv_guest_rsvp', JSON.stringify(formData));

    // 2. If a Google Sheet / Webhook endpoint is provided, post live data
    if (RSVP_WEBHOOK_URL) {
      try {
        await fetch(RSVP_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Google Sheet delivery notice:', err);
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#D4A044', '#8A1F2B', '#FFEAA7', '#FFC837']
      });
    } catch {
      // ignore
    }
  };

  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className={`long-section sv-rsvp-section ${isVisible ? 'sv-section-animated' : ''}`}
      id="rsvp-section"
      aria-label="Wedding RSVP"
    >
      <div className="sv-rsvp-inner">
        {/* Royal Section Header */}
        <div className="sv-rsvp-header">
          <div className="sv-rsvp-kicker">
            <span className="sv-rsvp-floret" aria-hidden="true">❖</span>
            <span>YOUR PRESENCE IS OUR PRESENT</span>
            <span className="sv-rsvp-floret" aria-hidden="true">❖</span>
          </div>

          <h2 className="sv-rsvp-title">Will You Join Us?</h2>
          <div className="sv-rsvp-hindi">॥ अथातिथि सत्कारः ॥</div>

          <div className="sv-rsvp-flourish" aria-hidden="true">
            <span className="sv-flourish-stem left">~ ❧</span>
            <span className="sv-flourish-bloom">✿</span>
            <span className="sv-flourish-stem right">❧ ~</span>
          </div>

          <p className="sv-rsvp-subtitle">
            Please confirm your gracious attendance and shower your auspicious blessings upon Ankit &amp; Palak.
          </p>
        </div>

        {/* Royal Parchment Form Card */}
        <div className="sv-rsvp-royal-card">
          {/* Corner Florets */}
          <div className="sv-card-corner tl" aria-hidden="true">❖</div>
          <div className="sv-card-corner tr" aria-hidden="true">❖</div>
          <div className="sv-card-corner bl" aria-hidden="true">❖</div>
          <div className="sv-card-corner br" aria-hidden="true">❖</div>

          {submitted ? (
            /* ================= SUCCESS STATE ================= */
            <div className="sv-rsvp-success-card">
              <span className="sv-success-icon" aria-hidden="true">🪔</span>
              <h3 className="sv-success-title">Dhanyawad, {formData.guestName}!</h3>
              <div className="sv-success-hindi">हृदय से आभार एवं धन्यवाद</div>

              <div className="sv-success-summary-box">
                <div className="sv-summary-row">
                  <span className="sv-summary-label">Attendance:</span>
                  <span className={`sv-summary-val ${formData.attendance === 'Joyfully accepts' ? 'accept' : 'decline'}`}>
                    {formData.attendance === 'Joyfully accepts' ? '✓ Joyfully Attending' : '✕ Regretfully Declining'}
                  </span>
                </div>

                {formData.attendance === 'Joyfully accepts' && (
                  <div className="sv-summary-row">
                    <span className="sv-summary-label">Party Size:</span>
                    <span className="sv-summary-val">
                      {formData.guestCount} {Number(formData.guestCount) === 1 ? 'Guest' : 'Guests'} Reserved
                    </span>
                  </div>
                )}

                {formData.phone && (
                  <div className="sv-summary-row">
                    <span className="sv-summary-label">Contact:</span>
                    <span className="sv-summary-val">{formData.phone}</span>
                  </div>
                )}

                {formData.message && (
                  <div className="sv-summary-msg">
                    <span className="sv-msg-quote">“</span>
                    {formData.message}
                    <span className="sv-msg-quote">”</span>
                  </div>
                )}
              </div>

              <p className="sv-success-note">
                Your blessings have been joyfully shared with Ankit &amp; Palak and the Mathur families!
              </p>

              <button
                type="button"
                className="sv-btn-update-rsvp"
                onClick={() => setSubmitted(false)}
              >
                <span>✏️ Update Response</span>
              </button>
            </div>
          ) : (
            /* ================= ROYAL FORM ================= */
            <form onSubmit={handleSubmit} className="sv-royal-form">
              {/* Field 1: Full Name */}
              <div className="sv-form-group">
                <label htmlFor="svGuestName" className="sv-form-label">
                  <span className="sv-label-icon" aria-hidden="true">👤</span>
                  <span>Your Full Name *</span>
                </label>
                <input
                  id="svGuestName"
                  name="guestName"
                  className="sv-form-input"
                  required
                  value={formData.guestName}
                  onChange={handleChange}
                  placeholder="e.g. Smt. & Shri Sharma / Varun Mathur"
                  autoComplete="name"
                />
              </div>

              {/* Field 2: Phone Number (Optional for Wedding updates) */}
              <div className="sv-form-group">
                <label htmlFor="svPhone" className="sv-form-label">
                  <span className="sv-label-icon" aria-hidden="true">📱</span>
                  <span>Mobile / WhatsApp Number (Optional for Event Updates)</span>
                </label>
                <input
                  id="svPhone"
                  name="phone"
                  type="tel"
                  className="sv-form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  autoComplete="tel"
                />
              </div>

              {/* Field 3: Attendance Selection */}
              <div className="sv-form-group">
                <label className="sv-form-label">
                  <span className="sv-label-icon" aria-hidden="true">✨</span>
                  <span>Will You Be Joining The Celebrations? *</span>
                </label>
                <div className="sv-attendance-pill-group">
                  <label className={`sv-attendance-pill ${formData.attendance === 'Joyfully accepts' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="Joyfully accepts"
                      checked={formData.attendance === 'Joyfully accepts'}
                      onChange={handleChange}
                      className="sv-radio-hidden"
                    />
                    <span className="sv-pill-floret">✿</span>
                    <span>Joyfully Accepts</span>
                  </label>

                  <label className={`sv-attendance-pill decline ${formData.attendance === 'Regretfully declines' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="Regretfully declines"
                      checked={formData.attendance === 'Regretfully declines'}
                      onChange={handleChange}
                      className="sv-radio-hidden"
                    />
                    <span className="sv-pill-floret">✕</span>
                    <span>Regretfully Declines</span>
                  </label>
                </div>
              </div>

              {/* Field 4: Number of Guests (Only if accepting) */}
              {formData.attendance !== 'Regretfully declines' && (
                <div className="sv-form-group">
                  <label htmlFor="svGuestCount" className="sv-form-label">
                    <span className="sv-label-icon" aria-hidden="true">👥</span>
                    <span>Total Number of Guests Attending</span>
                  </label>
                  <select
                    id="svGuestCount"
                    name="guestCount"
                    className="sv-form-select"
                    value={formData.guestCount}
                    onChange={handleChange}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests (Couple)</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests (Family)</option>
                  </select>
                </div>
              )}

              {/* Field 5: Heartfelt Message / Wishes */}
              <div className="sv-form-group">
                <label htmlFor="svMessage" className="sv-form-label">
                  <span className="sv-label-icon" aria-hidden="true">💌</span>
                  <span>Your Heartfelt Blessings &amp; Wishes for Ankit &amp; Palak</span>
                </label>
                <textarea
                  id="svMessage"
                  name="message"
                  className="sv-form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your loving blessings and wishes for the couple's auspicious new beginning..."
                  rows={4}
                />
              </div>

              {submitError && (
                <div className="sv-submit-error" role="alert">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <div className="sv-form-action-wrap">
                <button
                  type="submit"
                  className="sv-btn-rsvp-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Sending Auspicious RSVP...</span>
                  ) : (
                    <>
                      <span className="sv-btn-sparkle" aria-hidden="true">✦</span>
                      <span>CONFIRM RSVP &amp; SEND BLESSINGS</span>
                      <span className="sv-btn-sparkle" aria-hidden="true">✦</span>
                    </>
                  )}
                </button>
              </div>

              <div className="sv-rsvp-footer-note">
                <span>📍 Hotel Grand Xenia &amp; Bravia Hotel · Ajmer, Rajasthan</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
