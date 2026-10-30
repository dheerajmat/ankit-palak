import React, { useState, useEffect } from 'react';
import { downloadWeddingIcs, getGoogleCalendarLink } from '../utils/calendar';
import { venueData } from '../data/weddingData';

export default function DetailsScene() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date('2026-11-20T00:00:00+05:30').getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000)
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const format2 = (num) => String(num).padStart(2, '0');

  return (
    <section className="screen" id="details" data-scene="05">
      <div className="section-index">The day · The place · The memories</div>
      <span className="floral a">❀</span>
      <span className="floral b">✿</span>

      <div className="content arch">
        <div className="eyebrow">Save the date</div>

        <div className="ornament-text">✦</div>

        <div className="date">20</div>

        <h2 style={{ fontSize: 'clamp(27px, 7vw, 42px)', letterSpacing: '0.14em', margin: '4px 0' }}>
          NOVEMBER 2026
        </h2>

        <div className="date-card">
          <div className="label">Wedding venue</div>
          <p className="venue-line">{venueData.primary.name}</p>
          <p>{venueData.primary.address}</p>
          <p>{venueData.primary.city}</p>
        </div>

        <div className="countdown" aria-label="Countdown to wedding day">
          <div className="count-box">
            <strong>{timeLeft.days}</strong>
            <span>Days</span>
          </div>
          <div className="count-box">
            <strong>{format2(timeLeft.hours)}</strong>
            <span>Hours</span>
          </div>
          <div className="count-box">
            <strong>{format2(timeLeft.minutes)}</strong>
            <span>Minutes</span>
          </div>
          <div className="count-box">
            <strong>{format2(timeLeft.seconds)}</strong>
            <span>Seconds</span>
          </div>
        </div>

        <div className="action-row">
          <a
            className="outline-btn"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/search/?api=1&query=${venueData.primary.mapQuery}`}
          >
            <span>⌖</span> View venue map
          </a>

          <button
            className="outline-btn"
            id="calendarBtn"
            onClick={downloadWeddingIcs}
            title="Download .ics calendar event file"
          >
            <span>＋</span> Add reminder (.ics)
          </button>

          <a
            className="outline-btn"
            target="_blank"
            rel="noopener noreferrer"
            href={getGoogleCalendarLink()}
            title="Add directly to Google Calendar"
          >
            <span>📅</span> Google Calendar
          </a>
        </div>
      </div>
    </section>
  );
}

