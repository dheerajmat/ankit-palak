import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useScrollReveal } from '../utils/useScrollReveal';

const RSVP_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyKsXw8RAYE_JxNGfm1anEsNdeS6L9pV4Jbkoy6Jjwn_613BSuO1l2PJs-wzGEWbClB/exec";

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    guestName: '',
    attendance: '',
    guestCount: '2',
    dietary: '',
    message: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ankit_palak_rsvp');
    if (saved) {
      try {
        setSubmittedData(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestName.trim() || !formData.attendance) return;

    localStorage.setItem('ankit_palak_rsvp', JSON.stringify(formData));
    setSubmittedData(formData);
    setIsEditing(false);

    try {
      await fetch(RSVP_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          couple: 'Ankit & Palak Wedding'
        })
      });
    } catch (err) {
      console.warn('Google Sheet submission note:', err);
    }

    if (formData.attendance === 'Joyfully accepts') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#a64f61', '#c6a16b', '#f4b8c4']
        });
      } catch {
        // ignore
      }
    }
  };

  const handleEdit = () => {
    if (submittedData) {
      setFormData(submittedData);
    }
    setIsEditing(true);
  };

  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section ref={sectionRef} className={`long-section ${isVisible ? 'sv-section-animated' : ''}`} id="rsvp">
      <div className="long-inner">
        <div className="section-kicker">Your presence is our present</div>
        <h2 className="section-title">Will You Join Us?</h2>
        <p className="section-subtitle">
          Please let us know if you can celebrate with us in Ajmer.
        </p>

        {submittedData && !isEditing ? (
          <div className="rsvp-card">
            <div className="rsvp-success-badge">
              <h3 style={{ color: 'var(--rose)', fontSize: '24px', marginBottom: '8px' }}>
                Thank you, {submittedData.guestName}!
              </h3>
              <p style={{ fontSize: '18px', color: '#63494a', marginBottom: '6px' }}>
                Your RSVP response: <strong>“{submittedData.attendance}”</strong>
              </p>
              {submittedData.attendance === 'Joyfully accepts' && (
                <p style={{ fontSize: '16px', color: '#886266' }}>
                  Reserved for {submittedData.guestCount} {Number(submittedData.guestCount) === 1 ? 'guest' : 'guests'}. We eagerly look forward to seeing you!
                </p>
              )}
              {submittedData.message && (
                <p style={{ fontStyle: 'italic', fontSize: '15px', marginTop: '10px', color: '#90656a' }}>
                  “{submittedData.message}”
                </p>
              )}
            </div>

            <button 
              className="outline-btn" 
              onClick={handleEdit}
              style={{ width: '100%', marginTop: '16px' }}
            >
              ✏️ Modify your RSVP response
            </button>
            <p className="rsvp-note">
              Response saved locally. Connect to an API endpoint or Google Sheets when ready for deployment.
            </p>
          </div>
        ) : (
          <form className="rsvp-card" id="rsvpForm" onSubmit={handleSubmit}>
            <label htmlFor="guestName">Your Full Name *</label>
            <input
              id="guestName"
              name="guestName"
              required
              value={formData.guestName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
            />

            <label htmlFor="attendance">Will you be joining us? *</label>
            <select
              id="attendance"
              name="attendance"
              required
              value={formData.attendance}
              onChange={handleChange}
            >
              <option value="">Please select an option</option>
              <option value="Joyfully accepts">Joyfully accepts</option>
              <option value="Regretfully declines">Regretfully declines</option>
            </select>

            {formData.attendance !== 'Regretfully declines' && (
              <>
                <label htmlFor="guestCount">Number of guests attending</label>
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests (Family)</option>
                </select>
              </>
            )}

            <label htmlFor="message">A message for the couple (optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your warm wishes and blessings..."
            />

            <button className="open-btn" type="submit">
              Send RSVP ♡
            </button>

            <p className="rsvp-note" id="rsvpNote">
              This demo form saves your response to your browser session. Connect to a database or sheet anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

