import React, { useEffect } from 'react';
import { downloadEventIcs, getGoogleCalendarLink } from '../utils/calendar';

export default function EventModal({ event, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close event details">
          ✕
        </button>

        <img
          src={event.image}
          alt={event.name}
          style={{ width: '100%', height: '220px', objectFit: 'cover' }}
        />

        <div style={{ padding: '24px 28px' }}>
          <div className="event-day" style={{ fontSize: '13px', color: 'var(--rose)' }}>
            {event.day} · {event.date}
          </div>

          <h2 style={{ fontSize: '32px', margin: '4px 0 10px', color: '#62494a' }}>
            {event.name}
          </h2>

          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', margin: '14px 0', fontSize: '16px', color: '#7a5559' }}>
            <div>
              <strong>Time:</strong> {event.time}
            </div>
          </div>

          <p style={{ fontSize: '18px', lineHeight: 1.4, color: '#634b4c', margin: '12px 0 18px' }}>
            {event.desc}
          </p>

          <div style={{ background: '#fdf3f4', padding: '12px 16px', borderRadius: '12px', border: '1px solid #ebd0d5', marginBottom: '20px' }}>
            <div className="label" style={{ marginBottom: '2px' }}>Ceremony Venue</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#8d6260' }}>
              {event.venue}
            </div>
          </div>

          <div className="action-row" style={{ justifyContent: 'flex-start' }}>
            <a
              className="outline-btn"
              target="_blank"
              rel="noopener noreferrer"
              href={event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${event.mapQuery}`}
            >
              <span>⌖</span> Directions
            </a>

            <button
              className="outline-btn"
              onClick={() => downloadEventIcs(event)}
              title="Add this ceremony to your calendar"
            >
              <span>＋</span> Add to Calendar
            </button>

            <a
              className="outline-btn"
              target="_blank"
              rel="noopener noreferrer"
              href={getGoogleCalendarLink(event)}
              title="Add to Google Calendar"
            >
              <span>📅</span> Google Cal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

