import React, { useState, useEffect } from 'react';
import { venueData } from '../../data/weddingData';
import { useScrollReveal } from '../../utils/useScrollReveal';

// Samai Lamp Flame Coordinates (Aspect Ratio 2170 / 725)
const BANNER_FLAMES = [
  { left: '8.9%', top: '29.2%', delay: 0 },
  { left: '7.4%', top: '39.2%', delay: 0.3 },
  { left: '10.5%', top: '39.2%', delay: 0.6 },
  { left: '91%', top: '29.2%', delay: 0.15 },
  { left: '89.5%', top: '39.2%', delay: 0.45 },
  { left: '92.7%', top: '39.2%', delay: 0.75 }
];

// Countdown Frame Slots & Diya Flame Coordinates (Aspect Ratio 2003 / 785)
const COUNTDOWN_SLOTS = [
  { key: 'days', label: 'Days', left: '26.1%' },
  { key: 'hours', label: 'Hours', left: '42.45%' },
  { key: 'minutes', label: 'Minutes', left: '58.3%' },
  { key: 'seconds', label: 'Seconds', left: '74.2%' }
];

const COUNTDOWN_FLAMES = [
  { left: '2.3%', top: '51.6%', delay: 0 },
  { left: '3.4%', top: '51.6%', delay: 0.2 },
  { left: '4.85%', top: '52.2%', delay: 0.4 },
  { left: '6.35%', top: '51%', delay: 0.6 },
  { left: '7.6%', top: '51%', delay: 0.8 },
  { left: '92.6%', top: '51.8%', delay: 0.1 },
  { left: '93.8%', top: '51.8%', delay: 0.3 },
  { left: '95.3%', top: '52.2%', delay: 0.5 },
  { left: '96.8%', top: '51.8%', delay: 0.7 },
  { left: '98%', top: '51.8%', delay: 0.9 }
];

export default function DatePlaqueBanner() {
  const [sectionRef, isVisible] = useScrollReveal();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [tickPulse, setTickPulse] = useState(false);

  useEffect(() => {
    const target = new Date('2026-11-20T00:00:00+05:30').getTime();
    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const newSec = Math.floor((diff % 60000) / 1000);

      setTimeLeft((prev) => {
        if (prev.seconds !== newSec) {
          setTickPulse(true);
          setTimeout(() => setTickPulse(false), 500);
        }
        return {
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: newSec
        };
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const format2 = (n) => String(n).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      className={`sv-banner-section ${isVisible ? 'sv-section-animated' : ''}`}
      id="date-banner"
    >
      {/* 1. Atmospheric Transition Flourish from Hero Sunset Mandap */}
      <div className="sv-transition-motif-wrap" aria-hidden="true">
        <span className="sv-transition-line" />
        <span className="sv-transition-emblem">॥ शुभ लग्न मुहूर्त ॥</span>
        <span className="sv-transition-line" />
      </div>

      {/* 2. Panoramic Date Plaque with Brass Samai Lamps & Marigold Garlands */}
      <div className="sv-plaque-banner-wrap" role="region" aria-label="Wedding Date and Venue Plaque">
        {/* Center Golden Plaque Frame */}
        <img
          src="/assets/shubh-vivah/banner/plaque-v2.webp"
          alt="Golden Wedding Date Plaque"
          className="sv-plaque-center-asset"
          loading="lazy"
        />

        {/* Diagonal Soft Golden Shimmer Glint */}
        <div className="sv-plaque-shimmer-container" aria-hidden="true">
          <div className="sv-plaque-shimmer-beam" />
        </div>

        {/* Left Samai Oil Lamp & Marigold Garland Wing */}
        <img
          src="/assets/shubh-vivah/banner/left.webp"
          alt="Left Brass Samai Lamp with Marigolds"
          className="sv-plaque-wing left"
          loading="lazy"
        />

        {/* Right Samai Oil Lamp & Marigold Garland Wing */}
        <img
          src="/assets/shubh-vivah/banner/right.webp"
          alt="Right Brass Samai Lamp with Marigolds"
          className="sv-plaque-wing right"
          loading="lazy"
        />

        {/* 6 Real Flickering Diya Oil Flames on Lamp Wicks */}
        {BANNER_FLAMES.map((f, i) => (
          <span
            key={`banner-flame-${i}`}
            className="sv-flame-dot"
            style={{
              left: f.left,
              top: f.top,
              animationDelay: `${f.delay}s`
            }}
            aria-hidden="true"
          />
        ))}

        {/* High-Resolution Dynamic Typography inside Plaque */}
        <div className="sv-plaque-text-layer">
          <div className="sv-plaque-main-date">
            <span className="sv-plaque-floret" aria-hidden="true">❖</span>
            <span className="sv-date-text">20 NOVEMBER 2026</span>
            <span className="sv-plaque-floret" aria-hidden="true">❖</span>
          </div>
        </div>
      </div>

      {/* 3. Authentic Shubh Vivah Live Countdown Timer */}
      <div className="sv-countdown-banner-wrap" role="timer" aria-label="Live Wedding Countdown">
        {/* Background Countdown Frame (Aspect 2003 / 785) */}
        <img
          src="/assets/shubh-vivah/countdown/banner.webp"
          alt="Wedding Countdown Frame"
          className="sv-countdown-frame-asset"
          loading="lazy"
        />

        {/* Golden Shimmer Bar across countdown header */}
        <div className="sv-countdown-header-shimmer" aria-hidden="true">
          <div className="sv-countdown-shimmer-beam" />
        </div>

        {/* 10 Diya Flames Along Countdown Frame Edges */}
        {COUNTDOWN_FLAMES.map((f, i) => (
          <span
            key={`countdown-flame-${i}`}
            className="sv-flame-dot countdown-flame"
            style={{
              left: f.left,
              top: f.top,
              animationDelay: `${f.delay}s`
            }}
            aria-hidden="true"
          />
        ))}

        {/* 4 Themed Timer Slots (Days, Hours, Minutes, Seconds) */}
        {COUNTDOWN_SLOTS.map((slot) => {
          const val = slot.key === 'days' ? timeLeft.days : format2(timeLeft[slot.key]);
          const isSeconds = slot.key === 'seconds';

          return (
            <div
              key={slot.key}
              className="sv-timer-slot-box"
              style={{ left: slot.left }}
            >
              {/* Golden Twinkling Star above Slot */}
              <span className="sv-slot-sparkle" aria-hidden="true">✦</span>

              {/* Royal Lacquered Jewel Digits Box */}
              <div className={`sv-slot-inner-lacquer ${isSeconds && tickPulse ? 'tick-pulse' : ''}`}>
                <span className="sv-slot-digits">{val}</span>
              </div>

              {/* Themed Slot Label */}
              <span className="sv-slot-label">{slot.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
