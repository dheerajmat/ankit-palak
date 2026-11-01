import React from 'react';
import { venueData } from '../data/weddingData';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function VenueSection() {
  const venues = [
    {
      ...venueData.bravia,
      buttonText: "Directions · Bravia Hotel"
    },
    {
      ...venueData.grandXenia,
      buttonText: "Directions · Hotel Grand Xenia"
    }
  ];

  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className={`long-section sv-venue-section sv-venues-section ${isVisible ? 'sv-section-animated' : ''}`}
      id="venue"
      aria-label="Wedding Venues"
    >
      <div className="sv-venues-inner">
        {/* Royal Section Header */}
        <div className="sv-venue-header sv-venues-header">
          <div className="sv-venues-kicker">
            <span className="sv-venues-floret" aria-hidden="true">❖</span>
            <span>SACRED CELEBRATION DESTINATIONS</span>
            <span className="sv-venues-floret" aria-hidden="true">❖</span>
          </div>

          <h2 className="sv-venues-title">The Wedding Venues</h2>

          <div className="sv-venues-flourish" aria-hidden="true">
            <span className="sv-flourish-stem left">~ ❧</span>
            <span className="sv-flourish-bloom">✿</span>
            <span className="sv-flourish-stem right">❧ ~</span>
          </div>

          <p className="sv-venues-subtitle">
            Join us in the royal city of Ajmer, Rajasthan, as our auspicious wedding celebrations unfold across two magnificent celebration venues.
          </p>
        </div>

        {/* 2 Royal Venue Showcase Cards */}
        <div className="sv-venues-grid">
          {venues.map((venue, idx) => (
            <div key={venue.id} className={`sv-venue-card sv-venue-card-${idx}`}>
              {/* Corner Gold Motifs */}
              <div className="sv-card-corner tl" aria-hidden="true">❖</div>
              <div className="sv-card-corner tr" aria-hidden="true">❖</div>
              <div className="sv-card-corner bl" aria-hidden="true">❖</div>
              <div className="sv-card-corner br" aria-hidden="true">❖</div>

              {/* Venue Details & Celebrations Content */}
              <div className="sv-venue-content">
                {/* Role / Ceremony Category Badge */}
                <div className="sv-venue-badge-row">
                  <span className="sv-venue-role-badge">
                    <span className="sv-badge-sparkle" aria-hidden="true">✦</span>
                    {venue.role}
                    <span className="sv-badge-sparkle" aria-hidden="true">✦</span>
                  </span>
                </div>

                {/* Venue Name */}
                <h3 className="sv-venue-name">{venue.name}</h3>

                {/* Location / Address */}
                <div className="sv-venue-address">
                  <span className="sv-address-pin" aria-hidden="true">📍</span>
                  <span>{venue.address}, {venue.city}</span>
                </div>

                {/* Dates Active */}
                <div className="sv-venue-dates">
                  <span className="sv-dates-icon" aria-hidden="true">🗓️</span>
                  <span>{venue.dates}</span>
                </div>

                {/* Ornate Gold Filigree Separator */}
                <div className="sv-venue-card-divider" aria-hidden="true" />

                {/* Functions Hosted Header */}
                <div className="sv-venue-functions-header">
                  <span className="sv-functions-bullet">♦</span>
                  <span>Ceremonies Hosted Here ({venue.ceremonies.length})</span>
                  <span className="sv-functions-bullet">♦</span>
                </div>

                {/* Ceremonies List Grid */}
                <div className="sv-venue-ceremonies-list">
                  {venue.ceremonies.map((c, idx) => (
                    <div key={idx} className="sv-venue-ceremony-pill">
                      <span className="sv-ceremony-pill-icon" aria-hidden="true">{c.icon}</span>
                      <div className="sv-ceremony-pill-info">
                        <span className="sv-ceremony-pill-name">{c.name}</span>
                        <span className="sv-ceremony-pill-time">{c.date} · {c.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Google Maps Action Button */}
                <div className="sv-venue-action-wrap">
                  <a
                    className="sv-venue-directions-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={venue.mapUrl}
                    title={`Open Google Maps directions to ${venue.name}`}
                    aria-label={`Get directions to ${venue.name} in Ajmer on Google Maps`}
                  >
                    <span className="sv-dir-icon" aria-hidden="true">⌖</span>
                    <span>{venue.buttonText}</span>
                    <span className="sv-dir-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
