import React from 'react';

const svSections = [
  { id: 'mandap-hero', label: 'Mandap & Hero' },
  { id: 'date-banner', label: 'Auspicious Date & Countdown' },
  { id: 'couple-gilded', label: 'The Groom & Bride' },
  { id: 'ceremonies', label: 'Wedding Ceremonies' },
  { id: 'our-story', label: 'Together, Forever' },
  { id: 'venue', label: 'The Wedding Venues' },
  { id: 'gallery', label: 'Sacred Moments Gallery' },
  { id: 'invitation', label: 'Cordially Invited' },
  { id: 'rsvp-section', label: 'Will You Join Us (RSVP)' },
  { id: 'thank-you', label: 'Thank You & Blessings' },
];

const pastelSections = [
  { id: 'opening', label: 'Opening Envelope' },
  { id: 'ganesha', label: 'Divine Blessings' },
  { id: 'invite', label: 'The Wedding' },
  { id: 'couple', label: 'The Couple' },
  { id: 'details', label: 'Save The Date' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'venue', label: 'Venue & Directions' },
  { id: 'gallery', label: 'Moments & Details' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'thank-you', label: 'Thank You' },
];

export default function NavDots({ activeId, theme = 'shubh-vivah' }) {
  const sections = theme === 'shubh-vivah' ? svSections : pastelSections;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav-dots" aria-label="Invitation navigation">
      {sections.map((sec) => (
        <button
          key={sec.id}
          className={activeId === sec.id ? 'active' : ''}
          onClick={() => scrollTo(sec.id)}
          aria-label={`Scroll to ${sec.label}`}
        >
          <span className="nav-tooltip">{sec.label}</span>
        </button>
      ))}
    </nav>
  );
}
