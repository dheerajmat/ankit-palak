import React from 'react';
import { venueData } from '../data/weddingData';

export default function VenueSection() {
  return (
    <section className="long-section" id="venue">
      <div className="long-inner">
        <div className="section-kicker">Where forever begins</div>
        <h2 className="section-title">The Wedding Venues</h2>
        <p className="section-subtitle">
          We look forward to celebrating this special milestone with you in the historic city of Ajmer, Rajasthan.
        </p>

        {/* Primary Venue: Hotel Grand Xenia */}
        <div className="venue-panel">
          <div className="venue-art" aria-label="Hotel Grand Xenia concept artwork">
            <img
              src={venueData.primary.image}
              alt="Illustrative venue artwork for Hotel Grand Xenia"
              loading="lazy"
            />
          </div>

          <div className="venue-info">
            <div className="label">{venueData.primary.title}</div>
            <h3>{venueData.primary.name}</h3>
            <p>{venueData.primary.address}</p>
            <p>{venueData.primary.city}</p>

            <div className="venue-features">
              {venueData.primary.features.map((feat, idx) => (
                <span key={idx} className="venue-pill">
                  ✓ {feat}
                </span>
              ))}
            </div>

            <div className="action-row" style={{ justifyContent: 'flex-start' }}>
              <a
                className="outline-btn"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${venueData.primary.mapQuery}`}
              >
                <span>⌖</span> Get Directions
              </a>
            </div>

            <div className="ornament-text" style={{ margin: '14px 0 6px 0', justifyContent: 'flex-start' }}>
              ✦ ❀ ✦
            </div>
            <p className="small">{venueData.primary.date}</p>
          </div>
        </div>

        {/* Secondary Venue: Bravia Hotel */}
        <div className="venue-secondary">
          <img
            src={venueData.secondary.image}
            alt="Illustrative hotel concept artwork for Bravia Hotel"
            loading="lazy"
          />
          <div>
            <div className="label">{venueData.secondary.title}</div>
            <h3>{venueData.secondary.name}</h3>
            <p>{venueData.secondary.address}, {venueData.secondary.city}</p>
            <p className="asset-note">{venueData.secondary.note}</p>

            <div className="action-row" style={{ justifyContent: 'flex-start', marginTop: '14px' }}>
              <a
                className="outline-btn"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${venueData.secondary.mapQuery}`}
              >
                <span>⌖</span> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

