import React from 'react';

const sections = [
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
  { id: 'finale', label: 'Warmest Wishes' },
];

export default function NavDots({ activeId }) {
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

