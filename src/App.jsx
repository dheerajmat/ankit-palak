import React, { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground';
import Topbar from './components/Topbar';
import NavDots from './components/NavDots';

// Shubh Vivah Temple Theme Components
import TempleGateOpening from './components/shubh-vivah/TempleGateOpening';
import SunsetMandapHero from './components/shubh-vivah/SunsetMandapHero';
import DatePlaqueBanner from './components/shubh-vivah/DatePlaqueBanner';
import CoupleGildedFrames from './components/shubh-vivah/CoupleGildedFrames';
import SwingingBellsShrine from './components/shubh-vivah/SwingingBellsShrine';
import HangingCeremonyBoards from './components/shubh-vivah/HangingCeremonyBoards';
import TogetherForeverPavilion from './components/shubh-vivah/TogetherForeverPavilion';
import WishesWallRsvp from './components/shubh-vivah/WishesWallRsvp';

// Pastel Palace Envelope Theme Components
import EnvelopeScene from './components/EnvelopeScene';
import GaneshaScene from './components/GaneshaScene';
import InviteScene from './components/InviteScene';
import CoupleScene from './components/CoupleScene';
import DetailsScene from './components/DetailsScene';
import CelebrationsSection from './components/CelebrationsSection';
import RsvpSection from './components/RsvpSection';

// Shared Components
import OurStorySection from './components/OurStorySection';
import VenueSection from './components/VenueSection';
import GallerySection from './components/GallerySection';
import FinaleScene from './components/FinaleScene';
import EventModal from './components/EventModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selected_wedding_theme') || 'shubh-vivah';
  });

  const [isGateOpened, setIsGateOpened] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('opened') === 'true') return true;
    }
    return false;
  });
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [activeScene, setActiveScene] = useState('mandap-hero');
  const [currentSceneText, setCurrentSceneText] = useState('01 / 06');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'shubh-vivah' ? 'pastel' : 'shubh-vivah';
    setTheme(nextTheme);
    localStorage.setItem('selected_wedding_theme', nextTheme);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll(
        '.screen, .long-section, .sv-hero-section-exact, .sv-banner-section, .sv-couple-section, .sv-shrine-section, .sv-ceremonies-section, .sv-together-section'
      )
    );
    const totalScenes = Math.max(sections.length, 6);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(entry.target.id);
            const index = sections.indexOf(entry.target);
            if (index !== -1) {
              const currentNum = String(index + 1).padStart(2, '0');
              const totalNum = String(totalScenes).padStart(2, '0');
              setCurrentSceneText(`${currentNum} / ${totalNum}`);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [theme, isGateOpened]);

  const handleReplay = () => {
    if (theme === 'shubh-vivah') {
      setIsGateOpened(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setIsEnvelopeOpened(false);
      const openingEl = document.getElementById('opening');
      if (openingEl) openingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`wedding-app-container ${theme === 'shubh-vivah' ? 'sv-root' : ''}`}>
      {/* Ambient Canvas + Falling Petals (Marigold for Temple, Rose for Pastel) */}
      <AmbientBackground theme={theme} />

      {/* Top Navigation & Status Bar */}
      <Topbar
        currentScene={currentSceneText}
      />

      {/* Floating Section Navigation Dots */}
      <NavDots activeId={activeScene} />

      {theme === 'shubh-vivah' ? (
        /* ========================================================
           SHUBH VIVAH (TEMPLE MANDAP & 3D GATE THEME)
           ======================================================== */
        <main>
          {/* 1. 3D Carved Mandir Gate Opening */}
          <TempleGateOpening
            isOpened={isGateOpened}
            onOpen={() => setIsGateOpened(true)}
          />

          {/* 2. Sunset Marigold Mandap Hero */}
          <SunsetMandapHero isGateOpened={isGateOpened} />

          {/* 3. Samai-Lit Date Banner & Live Countdown */}
          <DatePlaqueBanner />

          {/* 4. Gilded Couple Portraits (Ankit & Palak) */}
          <CoupleGildedFrames />

          {/* 5. The Groom's Family (Royal Temple Arches) */}
          <SwingingBellsShrine />

          {/* 6. Suspended Ceremony Boards (11 Ceremonies) */}
          <HangingCeremonyBoards onSelectEvent={setSelectedEvent} />

          {/* 7. Royal Together, Forever Pavilion (Our Story) */}
          <TogetherForeverPavilion />

          {/* 8. Venue Showcase (Grand Xenia & Bravia Hotel) */}
          <VenueSection />

          {/* 9. Arched Gallery & Lightbox */}
          <GallerySection
            theme={theme}
            onSelectImage={setSelectedGalleryIndex}
          />

          {/* 10. RSVP & Interactive Guest Wishes Wall */}
          <WishesWallRsvp />

          {/* 11. Finale & Replay */}
          <FinaleScene onReplay={handleReplay} theme={theme} />
        </main>
      ) : (
        /* ========================================================
           PASTEL PALACE (ROYAL ENVELOPE THEME)
           ======================================================== */
        <main>
          <EnvelopeScene
            isOpened={isEnvelopeOpened}
            onOpen={() => setIsEnvelopeOpened(true)}
          />
          <GaneshaScene />
          <InviteScene />
          <CoupleScene />
          <DetailsScene />
          <CelebrationsSection onSelectEvent={setSelectedEvent} />
          <OurStorySection />
          <VenueSection />
          <GallerySection
            theme={theme}
            onSelectImage={setSelectedGalleryIndex}
          />
          <RsvpSection />
          <FinaleScene onReplay={handleReplay} theme={theme} />
        </main>
      )}

      {/* Ceremony Details Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        theme={theme}
        selectedIndex={selectedGalleryIndex}
        onClose={() => setSelectedGalleryIndex(null)}
        onNavigate={setSelectedGalleryIndex}
      />
    </div>
  );
}
