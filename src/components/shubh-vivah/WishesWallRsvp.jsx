import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const defaultWishes = [
  {
    id: 1,
    author: "Anjali & Vikram Mehta",
    relation: "Family Friends",
    message: "Heartiest congratulations to Ankit and Palak! May your life together be blessed with endless happiness, love, and laughter."
  },
  {
    id: 2,
    author: "The Agarwal Family",
    relation: "Relatives",
    message: "Shubh Vivah! May your sacred union be filled with prosperity, harmony, and cherished memories. Looking forward to celebrating in Ajmer!"
  },
  {
    id: 3,
    author: "Kavita & Rajesh Verma",
    relation: "Cousins",
    message: "Super excited for the Sangeet and Baraat! Wishing you both a lifetime of togetherness and joyous moments."
  }
];

export default function WishesWallRsvp() {
  const [formData, setFormData] = useState({
    guestName: '',
    attendance: 'Joyfully accepts',
    guestCount: '2',
    message: ''
  });

  const [wishes, setWishes] = useState(defaultWishes);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedWishes = localStorage.getItem('sv_guest_wishes');
    if (savedWishes) {
      try {
        setWishes(JSON.parse(savedWishes));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;

    if (formData.message.trim()) {
      const newWish = {
        id: Date.now(),
        author: formData.guestName,
        relation: "Wedding Guest",
        message: formData.message
      };
      const updated = [newWish, ...wishes];
      setWishes(updated);
      localStorage.setItem('sv_guest_wishes', JSON.stringify(updated));
    }

    setSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D4A044', '#8A1F2B', '#ffeaae']
      });
    } catch {
      // ignore
    }
  };

  return (
    <section className="long-section" id="rsvp-wishes" style={{ background: '#fbf7f0' }}>
      <div className="long-inner" style={{ maxWidth: '960px' }}>
        <div className="section-kicker">YOUR PRESENCE IS OUR PRESENT</div>
        <h2 className="section-title" style={{ color: 'var(--sv-crimson)' }}>
          Will You Join Us?
        </h2>
        <p className="section-subtitle">
          Please confirm your gracious attendance and leave your auspicious blessings for Ankit & Palak.
        </p>

        {/* RSVP Card */}
        <div className="rsvp-card" style={{ borderColor: 'var(--sv-gold)' }}>
          {submitted ? (
            <div className="rsvp-success-badge" style={{ borderColor: 'var(--sv-gold)', background: '#fff9ed' }}>
              <h3 style={{ color: 'var(--sv-crimson)', fontSize: '24px', margin: '0 0 8px' }}>
                Dhanyawad, {formData.guestName}!
              </h3>
              <p style={{ fontSize: '17px', color: '#634346', margin: '0 0 6px' }}>
                Your RSVP response: <strong>“{formData.attendance}”</strong>
              </p>
              {formData.attendance === 'Joyfully accepts' && (
                <p style={{ fontSize: '15px', color: '#886266' }}>
                  Reserved for {formData.guestCount} {Number(formData.guestCount) === 1 ? 'guest' : 'guests'}. Your warm wishes have been added to the Wishes Wall below!
                </p>
              )}
              <button
                className="outline-btn"
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '16px', width: '100%' }}
              >
                ✏️ Update RSVP / Add Another Wish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="svGuestName">Your Full Name *</label>
              <input
                id="svGuestName"
                name="guestName"
                required
                value={formData.guestName}
                onChange={handleChange}
                placeholder="e.g. Smt. & Shri Sharma"
              />

              <label htmlFor="svAttendance">Will you be attending?</label>
              <select
                id="svAttendance"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
              >
                <option value="Joyfully accepts">Joyfully accepts</option>
                <option value="Regretfully declines">Regretfully declines</option>
              </select>

              {formData.attendance !== 'Regretfully declines' && (
                <>
                  <label htmlFor="svGuestCount">Number of Guests</label>
                  <select
                    id="svGuestCount"
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

              <label htmlFor="svMessage">Your Blessings & Wishes for the Couple</label>
              <textarea
                id="svMessage"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your heartfelt wishes for Ankit & Palak's auspicious new beginning..."
              />

              <button
                className="sv-open-btn"
                type="submit"
                style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
              >
                <span>SEND RSVP & BLESSINGS ♡</span>
              </button>
            </form>
          )}
        </div>

        {/* Wishes Wall Section */}
        <div style={{ marginTop: '60px' }}>
          <div className="section-kicker">COMMUNITY & FAMILY LOVE</div>
          <h3 style={{ fontSize: '32px', color: 'var(--sv-crimson)', margin: '6px 0 16px' }}>
            Guest Wishes Wall
          </h3>
          <p style={{ fontSize: '16px', color: '#7a5a5e' }}>
            Heartfelt blessings and messages left by family and loved ones.
          </p>

          <div className="sv-wishes-wall">
            {wishes.map((item) => (
              <div key={item.id} className="sv-wish-card">
                <div className="sv-wish-author">{item.author}</div>
                <div style={{ fontSize: '12px', color: 'var(--sv-brass)', letterSpacing: '0.08em' }}>
                  {item.relation}
                </div>
                <div className="sv-wish-message">“{item.message}”</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

