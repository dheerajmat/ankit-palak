import React, { useRef, useState, useCallback } from 'react';

// Ceremony specific poetic ritual taglines matching traditional royal Rajasthani vivah
const CEREMONY_TAGLINES = {
  'ganesh-sthapana': 'Auspicious Divine Invocation',
  'mehendi': 'Fragrant Henna & Music',
  'engagement': 'Rings of Love & Sacred Vows',
  'sangeet': 'Musical Night of Glitz & Dance',
  'dinner-day1': 'Royal Welcome Feast',
  'lagun': 'Sacred Dawn Patrika Rituals',
  'haldi': 'Auspicious Turmeric Ritual',
  'bhaat': 'Maternal Blessings & Mayera',
  'carnival': 'Festive Pre-Wedding Mela',
  'baraat': 'Grand Royal Procession',
  'wedding-dinner': 'Sacred Phere & Reception'
};

// Formatted short ceremony title for the main carved wooden plaque
function getCeremonyHeading(name) {
  if (name.includes('Haldi')) return { main: 'HALDI', sub: 'CEREMONY' };
  if (name.includes('Mehendi')) return { main: 'MEHENDI', sub: 'CELEBRATION' };
  if (name.includes('Sangeet')) return { main: 'SANGEET', sub: 'SANDHYA' };
  if (name.includes('Engagement')) return { main: 'SAGAI', sub: 'ENGAGEMENT' };
  if (name.includes('Ganesh')) return { main: 'GANESH', sub: 'STHAPANA' };
  if (name.includes('Baraat')) return { main: 'BARAAT', sub: 'ROYAL PROCESSION' };
  if (name.includes('Wedding')) return { main: 'VIVAH', sub: 'RECEPTION' };
  if (name.includes('Carnival')) return { main: 'CARNIVAL', sub: 'FESTIVE MELA' };
  if (name.includes('Bhaat')) return { main: 'MAYERA', sub: 'BHAAT CEREMONY' };
  if (name.includes('Lagun')) return { main: 'LAGUN', sub: 'PATRIKA RITUAL' };
  return { main: name.toUpperCase(), sub: 'CEREMONY' };
}

// Crisp short dress code labels for wooden slats
function getShortDressCode(dress) {
  if (!dress) return 'FESTIVE ATTIRE';
  if (dress.includes('Yellow')) return 'YELLOW';
  if (dress.includes('Mehendi') || dress.includes('Green')) return 'GREEN & YELLOW';
  if (dress.includes('Pastel')) return 'ROYAL PASTELS';
  if (dress.includes('Glamorous') || dress.includes('Indo-Western')) return 'INDO-WESTERN';
  if (dress.includes('Poshak')) return 'RAJASTHANI POSHAK';
  if (dress.includes('Sherwani') || dress.includes('Bandhgala')) return 'ROYAL BANDHGALA';
  if (dress.includes('Formal') || dress.includes('Ethnic')) return 'GRAND ETHNIC';
  if (dress.includes('Casual') || dress.includes('Chic')) return 'CHIC FESTIVE';
  return dress.toUpperCase();
}

export default function ToranHangingBoard({
  event,
  enableTilt = true,
  className = '',
  style = {}
}) {
  const boardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback((e) => {
    if (!enableTilt || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const rawX = (e.clientX - rect.left) / rect.width - 0.5;
    const rawY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: rawX * 2, y: rawY * 2, active: true });
  }, [enableTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, active: false });
  }, []);

  if (!event) return null;

  const heading = getCeremonyHeading(event.name);
  const tagline = CEREMONY_TAGLINES[event.id] || event.desc || 'Auspicious Sacred Ritual';
  const shortDress = getShortDressCode(event.dressCode);

  const venueShort = event.venue.includes('Grand Xenia')
    ? { title: 'HOTEL GRAND XENIA', location: 'Foy Sagar Road, Ajmer' }
    : { title: 'BRAVIA HOTEL', location: 'Panchsheel Nagar, Ajmer' };

  return (
    <div
      ref={boardRef}
      className={`sv-toran-container ${tilt.active ? 'is-tilting' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        '--tilt-x': tilt.x,
        '--tilt-y': tilt.y,
        transform: tilt.active
          ? `perspective(1100px) rotateY(${tilt.x * 6.5}deg) rotateX(${-tilt.y * 5.5}deg) rotateZ(${tilt.x * 1.2}deg)`
          : undefined
      }}
    >
      {/* 1. MASTER HANGING WOODEN TORAN BOARD */}
      <div className="sv-toran-master-frame">
        <img
          src="/assets/shubh-vivah/events/sign/frame.webp"
          alt={`${event.name} Toran Frame`}
          className="sv-toran-frame-asset"
          loading="lazy"
        />

        {/* Text Layer over Carved Wooden Center Plaque */}
        <div className="sv-toran-plaque-typography">
          <span className="sv-toran-ceremony-main">{heading.main}</span>
          <span className="sv-toran-ceremony-sub">{heading.sub}</span>
          <div className="sv-toran-plaque-ornament">❖</div>
          <span className="sv-toran-ceremony-tagline">{tagline}</span>
        </div>
      </div>

      {/* 2. FOUR CHAIN-LINKED HANGING WOODEN SLATS */}
      <div className="sv-toran-slats-wrapper">
        {/* Slat 1: Date */}
        <div className="sv-toran-slat sv-toran-slat-date" style={{ '--slat-order': 1 }}>
          <img
            src="/assets/shubh-vivah/events/sign/date.webp"
            alt="Date Slat"
            className="sv-toran-slat-asset"
          />
          <div className="sv-toran-slat-content">
            <span className="sv-toran-slat-primary">{event.date.toUpperCase()}</span>
            <span className="sv-toran-slat-secondary">{event.day.toUpperCase()}</span>
          </div>
        </div>

        {/* Slat 2: Time */}
        <div className="sv-toran-slat sv-toran-slat-time" style={{ '--slat-order': 2 }}>
          <img
            src="/assets/shubh-vivah/events/sign/time.webp"
            alt="Time Slat"
            className="sv-toran-slat-asset"
          />
          <div className="sv-toran-slat-content">
            <span className="sv-toran-slat-primary sv-slat-time-text">{event.time.toUpperCase()}</span>
          </div>
        </div>

        {/* Slat 3: Venue */}
        <div className="sv-toran-slat sv-toran-slat-venue" style={{ '--slat-order': 3 }}>
          <img
            src="/assets/shubh-vivah/events/sign/venue.webp"
            alt="Venue Slat"
            className="sv-toran-slat-asset"
          />
          <div className="sv-toran-slat-content">
            <span className="sv-toran-slat-label">VENUE</span>
            <span className="sv-toran-slat-primary sv-slat-venue-name">{venueShort.title}</span>
            <span className="sv-toran-slat-secondary sv-slat-venue-sub">{venueShort.location}</span>
          </div>
        </div>

        {/* Slat 4: Dress Code */}
        <div className="sv-toran-slat sv-toran-slat-dress" style={{ '--slat-order': 4 }}>
          <img
            src="/assets/shubh-vivah/events/sign/dress.webp"
            alt="Dress Code Slat"
            className="sv-toran-slat-asset"
          />
          <div className="sv-toran-slat-content">
            <span className="sv-toran-slat-label">DRESS CODE</span>
            <span className="sv-toran-slat-primary sv-slat-dress-text">{shortDress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}