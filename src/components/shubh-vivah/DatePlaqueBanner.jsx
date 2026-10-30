import React, { useState, useEffect, useRef } from 'react';
import { getGoogleCalendarLink } from '../../utils/calendar';
import { venueData } from '../../data/weddingData';
import ScratchCardReveal from './ScratchCardReveal';

// Pure Self-Contained SVG Assets (100% Reliable, Never Fails or Shows Missing PNG Error)
function SvTempleBellSvg() {
  return (
    <svg viewBox="0 0 36 52" width="30" height="44" className="sv-mobile-cd-bell-svg" aria-hidden="true">
      <defs>
        <linearGradient id="bellGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2C6" />
          <stop offset="30%" stopColor="#E2AE48" />
          <stop offset="70%" stopColor="#9C6B16" />
          <stop offset="100%" stopColor="#5E3E08" />
        </linearGradient>
        <linearGradient id="bellChainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A044" />
          <stop offset="50%" stopColor="#FFF8E0" />
          <stop offset="100%" stopColor="#8A5A12" />
        </linearGradient>
      </defs>
      {/* Hanging Chain Links */}
      <line x1="18" y1="0" x2="18" y2="14" stroke="url(#bellChainGrad)" strokeWidth="2.5" strokeDasharray="3 1.5" />
      <circle cx="18" cy="15" r="3" fill="none" stroke="url(#bellGoldGrad)" strokeWidth="1.8" />
      {/* Bell Dome */}
      <path d="M12 19 C12 16, 24 16, 24 19 C24 26, 31 34, 30 39 C29 43, 23 44, 18 44 C13 44, 7 43, 6 39 C5 34, 12 26, 12 19 Z" fill="url(#bellGoldGrad)" stroke="#FFE89E" strokeWidth="0.8" />
      {/* Rim Bevel */}
      <ellipse cx="18" cy="40" rx="12" ry="3" fill="none" stroke="#FFEAA7" strokeWidth="1.4" />
      {/* Dangling Clapper Tongue */}
      <circle cx="18" cy="45" r="2.8" fill="#FFD56B" stroke="#664408" strokeWidth="0.8" />
      {/* Shimmer Highlight */}
      <path d="M13 22 C13 27, 9 33, 8 36" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function SvGoldDividerSvg({ className = '' }) {
  return (
    <svg viewBox="0 0 240 22" width="160" height="15" className={`sv-mobile-cd-gold-divider-svg ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="goldDivGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor="#C49132" />
          <stop offset="50%" stopColor="#FFEBB0" />
          <stop offset="75%" stopColor="#C49132" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* Center Lotus Flower & Petals */}
      <path d="M120 3 C116 7, 116 13, 120 17 C124 13, 124 7, 120 3 Z" fill="#FFEBB0" />
      <path d="M120 7 C113 8, 109 12, 112 16 C116 15, 118 12, 120 7 Z" fill="#D4A044" />
      <path d="M120 7 C127 8, 131 12, 128 16 C124 15, 122 12, 120 7 Z" fill="#D4A044" />
      {/* Left Filigree Line */}
      <path d="M108 14 C100 10, 94 16, 88 13 C82 10, 75 14, 62 14 L12 14" fill="none" stroke="url(#goldDivGrad)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="86" cy="13" r="1.5" fill="#FFEBB0" />
      {/* Right Filigree Line */}
      <path d="M132 14 C140 10, 146 16, 152 13 C158 10, 165 14, 178 14 L228 14" fill="none" stroke="url(#goldDivGrad)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="154" cy="13" r="1.5" fill="#FFEBB0" />
    </svg>
  );
}

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
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [tickPulse, setTickPulse] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

      {/* 3A. Authentic Shubh Vivah Live Countdown Timer (Desktop / Laptop View) */}
      <div className="sv-countdown-banner-wrap sv-desktop-countdown" role="timer" aria-label="Live Wedding Countdown">
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

      {/* 3B. Big Bold Royal Mobile Countdown Showcase (Mobile / Tablet View) */}
      <div className="sv-mobile-countdown-showcase" role="timer" aria-label="Live Wedding Countdown">
        {/* Hanging Brass Temple Bells on Left & Right Corners */}
        <div className="sv-mobile-cd-bell-wrap left" aria-hidden="true">
          <SvTempleBellSvg />
        </div>
        <div className="sv-mobile-cd-bell-wrap right" aria-hidden="true">
          <SvTempleBellSvg />
        </div>

        {/* Auspicious Blessing Tag */}
        <div className="sv-mobile-cd-auspicious">
          <span className="sv-cd-om">ॐ</span>
          <span className="sv-cd-mantra">॥ शुभ विवाह मुहूर्त ॥</span>
          <span className="sv-cd-om">ॐ</span>
        </div>

        {/* Header Title with Florets */}
        <div className="sv-mobile-cd-header">
          <span className="sv-mobile-cd-header-line" />
          <span className="sv-mobile-cd-title">AUSPICIOUS COUNTDOWN</span>
          <span className="sv-mobile-cd-header-line" />
        </div>

        {/* Royal Gold Filigree Divider */}
        <SvGoldDividerSvg />

        {/* 4 Majestic Countdown Jewel Cards */}
        <div className="sv-mobile-cd-grid">
          {COUNTDOWN_SLOTS.map((slot) => {
            const val = slot.key === 'days' ? timeLeft.days : format2(timeLeft[slot.key]);
            const isSeconds = slot.key === 'seconds';
            const shortLabel = slot.key === 'minutes' ? 'Mins' : slot.key === 'seconds' ? 'Secs' : slot.label;

            return (
              <div key={`m-${slot.key}`} className="sv-mobile-cd-card">
                {/* Diya Flame Crown */}
                <div className="sv-mobile-cd-card-crown" aria-hidden="true">
                  <span className="sv-mobile-card-flame" />
                </div>

                <div className={`sv-mobile-cd-lacquer ${isSeconds && tickPulse ? 'tick-pulse' : ''}`}>
                  <span className="sv-mobile-cd-sparkle" aria-hidden="true">✦</span>
                  <span className="sv-mobile-cd-num">{val}</span>
                  <div className="sv-mobile-cd-sheen" aria-hidden="true" />
                </div>
                <span className="sv-mobile-cd-unit">{shortLabel}</span>
              </div>
            );
          })}
        </div>

        {/* Golden Bottom Accent & Date Target */}
        <div className="sv-mobile-cd-footer">
          <SvGoldDividerSvg className="bottom" />
          <div className="sv-mobile-cd-target-wrap">
            <span className="sv-mobile-cd-target-floret">❖</span>
            <span className="sv-mobile-cd-target">20 NOVEMBER 2026</span>
            <span className="sv-mobile-cd-target-floret">❖</span>
          </div>
        </div>
      </div>

      {/* 4. Royal Themed Action Button (Google Calendar) */}
      <div className="sv-action-buttons-wrap">
        <a
          className="sv-btn-royal-primary"
          target="_blank"
          rel="noopener noreferrer"
          href={getGoogleCalendarLink()}
          title="Add celebration to Google Calendar"
          aria-label="Add celebration to Google Calendar"
        >
          <span className="sv-btn-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span>Google Calendar</span>
          <span className="sv-btn-shine" aria-hidden="true" />
        </a>
      </div>

      {/* 5. Interactive Royal Scratch Card Feature */}
      <ScratchCardReveal />
    </section>
  );
}
