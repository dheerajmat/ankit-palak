import React from 'react';

export default function ThemeSwitcher({ currentTheme, onToggleTheme }) {
  const isShubhVivah = currentTheme === 'shubh-vivah';

  return (
    <button
      className="sv-theme-switch-btn"
      onClick={onToggleTheme}
      title={isShubhVivah ? "Switch to Pastel Envelope Theme" : "Switch to Shubh Vivah Temple Theme"}
      aria-label="Switch wedding website theme"
    >
      <span>{isShubhVivah ? '💌' : '🌺'}</span>
      <span>{isShubhVivah ? 'Pastel Theme' : 'Temple Theme'}</span>
    </button>
  );
}

