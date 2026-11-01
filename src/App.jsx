import React, { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground';
import Topbar from './components/Topbar';
import NavDots from './components/NavDots';

// Shubh Vivah Temple Theme Components
import TempleGateOpening from './components/shubh-vivah/TempleGateOpening';
import SunsetMandapHero from './components/shubh-vivah/SunsetMandapHero';
import DatePlaqueBanner from './components/shubh-vivah/DatePlaqueBanner';
import CoupleGildedFrames from './components/shubh-vivah/CoupleGildedFrames';
import HangingCeremonyBoards from './components/shubh-vivah/HangingCeremonyBoards';
import TogetherForeverPavilion from './components/shubh-vivah/TogetherForeverPavilion';
import YouAreInvitedSection from './components/shubh-vivah/YouAreInvitedSection';
import WishesWallRsvp from './components/shubh-vivah/WishesWallRsvp';

// Standalone Royal Families Page
import RoyalFamiliesPage from './components/RoyalFamiliesPage';

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
import SiteFooter from './components/SiteFooter';
import EventModal from './components/EventModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selected_wedding_theme') || 'shubh-vivah';
  });

  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#family' || search.includes('page=family')) {
        return 'family';
      }
    }
    return 'invitation';
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

  const navigateToFamily = () => {
    try {
      window.history.pushState({ page: 'family' }, '', '#family');
    } catch {
      // ignore
    }
    setCurrentView('family');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToInvitation = () => {
    try {
      window.history.pushState({ page: 'invitation' }, '', '#invitation');
    } catch {
      // ignore
    }
    setCurrentView('invitation');
    setTimeout(() => {
      const el = document.getElementById('invitation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === '#family') {
        setCurrentView('family');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('invitation');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentView !== 'invitation') return;

    const sections = Array.from(
      document.querySelectorAll(
        '.screen, .long-section, .sv-hero-section-exact, .sv-banner-section, .sv-couple-section, .sv-ceremonies-section, .sv-together-section, .sv-venue-section, .sv-venues-section, .sv-invitation-section, .sv-rsvp-section'
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
      { threshold: 0.15 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [theme, isGateOpened, currentView]);

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

      {currentView === 'family' ? (
        /* ========================================================
           SEPARATE PAGE: THE ROYAL FAMILIES
           ======================================================== */
        <RoyalFamiliesPage onBackToInvitation={navigateToInvitation} />
      ) : (
        /* ========================================================
           MAIN INVITATION MULTI-SECTION FLOW
           ======================================================== */
        <>
          {/* Floating Section Navigation Dots */}
          <NavDots activeId={activeScene} theme={theme} />

          {theme === 'shubh-vivah' ? (
            /* SHUBH VIVAH (TEMPLE MANDAP & 3D GATE THEME) */
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

              {/* 5. Suspended Ceremony Boards (11 Ceremonies) */}
              <HangingCeremonyBoards onSelectEvent={setSelectedEvent} />

              {/* 6. Royal Together, Forever Pavilion (Our Story) */}
              <TogetherForeverPavilion />

              {/* 7. Venue Showcase (Grand Xenia & Bravia Hotel) */}
              <VenueSection />

              {/* 8. Sacred Royal Invitation (You Are Cordially Invited) */}
              <YouAreInvitedSection
                onOpenFamilyPage={navigateToFamily}
              />

              {/* 9. RSVP Confirmation (Will You Join Us?) */}
              <WishesWallRsvp />

              {/* 10. Gratitude & Thank You Finale (Dhanyawad) */}
              <FinaleScene onReplay={handleReplay} theme={theme} />

              {/* 11. Sacred Moments Wedding Gallery (Placed below Dhanyawad as requested) */}
              <GallerySection
                theme={theme}
                onSelectImage={setSelectedGalleryIndex}
              />

              {/* 12. Royal Site Footer */}
              <SiteFooter />
            </main>
          ) : (
            /* PASTEL PALACE (ROYAL ENVELOPE THEME) */
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
              <RsvpSection />
              <FinaleScene onReplay={handleReplay} theme={theme} />
              <GallerySection
                theme={theme}
                onSelectImage={setSelectedGalleryIndex}
              />
              <SiteFooter />
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
        </>
      )}
    </div>
  );
}
