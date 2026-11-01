import React, { useState, useEffect, useRef, useCallback } from 'react';
import { eventsData } from '../../data/weddingData';
import ToranHangingBoard from './ToranHangingBoard';
import SunflowerStepperTrack from './SunflowerStepperTrack';
import { useScrollReveal, initScrollObserver } from '../../utils/useScrollReveal';

const CEREMONY_TAGLINES = {
  'ganesh-sthapana': 'Auspicious Divine Invocation',
  'mehendi': 'Fragrant Henna & Music',
  'engagement': 'Rings of Love & Sacred Promises',
  'sangeet': 'Musical Night of Glitz & Dance',
  'haldi': 'Auspicious Turmeric Ritual',
  'bhaat': 'Maternal Blessings & Mayera',
  'carnival': 'Festive Pre-Wedding Mela',
  'baraat': 'Grand Royal Procession',
  'wedding-dinner': 'Sacred Phere & Reception'
};

export default function HangingCeremonyBoards() {
  const [activeId, setActiveId] = useState(eventsData[0]?.id || 'ganesh-sthapana');
  const [desktopOffsets, setDesktopOffsets] = useState([]);
  const [mobileOffsets, setMobileOffsets] = useState([]);

  const [containerRef, isVisible] = useScrollReveal({ threshold: 0.02, rootMargin: '50px 0px -25px 0px' });
  const desktopTimelineRef = useRef(null);
  const mobileTimelineRef = useRef(null);
  const desktopRowRefs = useRef(new Map());
  const mobileCardRefs = useRef(new Map());

  // Function to calculate exact relative Y coordinates for each ceremony node
  const updateLayoutPositions = useCallback(() => {
    // 1. Desktop offsets calculation
    const dContainer = desktopTimelineRef.current;
    if (dContainer) {
      const parentRect = dContainer.getBoundingClientRect();
      const offsets = eventsData.map((evt) => {
        const el = desktopRowRefs.current.get(evt.id);
        if (el) {
          const r = el.getBoundingClientRect();
          // Center of the ceremony row relative to the desktop timeline container
          return (r.top - parentRect.top) + (r.height / 2);
        }
        return 0;
      });
      setDesktopOffsets(offsets);
    }

    // 2. Mobile offsets calculation
    const mContainer = mobileTimelineRef.current;
    if (mContainer) {
      const parentRect = mContainer.getBoundingClientRect();
      const offsets = eventsData.map((evt) => {
        const el = mobileCardRefs.current.get(evt.id);
        if (el) {
          const r = el.getBoundingClientRect();
          // Align flower with the top toran wooden beam
          return (r.top - parentRect.top) + 85;
        }
        return 0;
      });
      setMobileOffsets(offsets);
    }
  }, []);

  // Recalculate layout on mount and window resize
  useEffect(() => {
    updateLayoutPositions();

    const handleResize = () => {
      updateLayoutPositions();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Allow time for fonts, images, and layout to settle
    const t1 = setTimeout(updateLayoutPositions, 100);
    const t2 = setTimeout(updateLayoutPositions, 400);
    const t3 = setTimeout(updateLayoutPositions, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [updateLayoutPositions]);

  // Progressive scroll reveal for mobile ceremony cards
  useEffect(() => {
    const mobileEl = mobileTimelineRef.current;
    if (!mobileEl) return;
    const cleanup = initScrollObserver(mobileEl, '.sv-mobile-ceremony-card');
    return cleanup;
  }, []);

  // Track active ceremony on scroll without forcing layout recalcs on every frame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const isMobile = window.innerWidth < 992;
        const vh = window.innerHeight;
        const targetRefs = isMobile ? mobileCardRefs.current : desktopRowRefs.current;

        let closestId = null;
        let minDistance = Infinity;
        // Trigger line at 46% of the viewport for natural scroll activation
        const triggerY = vh * 0.46;

        targetRefs.forEach((el, id) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const elementCenter = r.top + (r.height / 2);
          const dist = Math.abs(elementCenter - triggerY);
          if (dist < minDistance) {
            minDistance = dist;
            closestId = id;
          }
        });

        if (closestId && closestId !== activeId) {
          setActiveId(closestId);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  // Current active index and target Y positions
  const activeIndex = Math.max(
    0,
    eventsData.findIndex((evt) => evt.id === activeId)
  );
  const desktopFlowerY = desktopOffsets[activeIndex] || 0;
  const mobileFlowerY = mobileOffsets[activeIndex] || 0;

  // Smooth scroll to a ceremony when clicking its dot node
  const handleSelectNode = (evtId) => {
    setActiveId(evtId);
    const isMobile = window.innerWidth < 992;
    const targetMap = isMobile ? mobileCardRefs.current : desktopRowRefs.current;
    const el = targetMap.get(evtId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className={`sv-ceremonies-section ${isVisible ? 'sv-section-animated' : ''}`} id="ceremonies" ref={containerRef}>
      <div className="sv-ceremonies-container">
        {/* Exact Section Header Matching Original Invitima */}
        <div className="sv-ceremonies-header">
          <span className="sv-ceremonies-kicker-script">Sacred Rituals & Celebrations</span>
          <h2 className="sv-ceremonies-title">WEDDING EVENTS & FESTIVITIES</h2>
          <div className="sv-ceremonies-motif" aria-hidden="true">❖</div>
        </div>

        {/* ========================================================
            A. DESKTOP CONTINUOUS TIMELINE STREAM (>= 992px)
            All events presented in sequence with 3D tilt & gliding sunflower
            ======================================================== */}
        <div
          ref={desktopTimelineRef}
          className="sv-ceremonies-desktop-timeline"
        >
          {/* Continuous Center Long Line (Lambi Line) with Gliding Sunflower (Fool) */}
          <div className="sv-timeline-center-track-col">
            <SunflowerStepperTrack
              events={eventsData}
              activeId={activeId}
              flowerY={desktopFlowerY}
              nodeOffsets={desktopOffsets}
              onSelectNode={handleSelectNode}
              className="sv-desktop-timeline-track"
            />
          </div>

          {/* All Ceremonies Rows in Sequence */}
          <div className="sv-timeline-rows-stream">
            {eventsData.map((evt, idx) => {
              const tagline = CEREMONY_TAGLINES[evt.id] || evt.desc || 'Auspicious Sacred Ritual';
              const isActive = evt.id === activeId;

              return (
                <div
                  key={evt.id}
                  id={`sv-timeline-row-${evt.id}`}
                  data-event-id={evt.id}
                  ref={(el) => {
                    if (el) desktopRowRefs.current.set(evt.id, el);
                    else desktopRowRefs.current.delete(evt.id);
                  }}
                  className={`sv-timeline-row ${isActive ? 'is-active-row' : ''}`}
                >
                  {/* Left Column: 3D Interactive Toran Hanging Board */}
                  <div className="sv-row-left-col">
                    <ToranHangingBoard
                      event={evt}
                      enableTilt={true}
                      className="sv-timeline-toran-board"
                    />
                  </div>

                  {/* Spacer for Center Long Line & Sunflower */}
                  <div className="sv-row-center-spacer" aria-hidden="true" />

                  {/* Right Column: Airy Ceremony Story directly on Parchment (Zero Action Buttons) */}
                  <div className="sv-row-right-col">
                    <div className="sv-story-content-wrap">
                      {/* Event Pill */}
                      <div className="sv-story-pill-row">
                        <span className="sv-story-event-pill">
                          EVENT {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Ceremony Title & Emoji */}
                      <h3 className="sv-story-heading">
                        {evt.name} <span className="sv-story-emoji">{evt.icon}</span>
                      </h3>

                      {/* Ritual Tagline in Cursive Script */}
                      <div className="sv-story-script-sub">
                        {tagline}
                      </div>

                      {/* Ceremonial Note / Description */}
                      <p className="sv-story-desc">
                        {evt.desc || 'Family and close friends are cordially invited to celebrate.'}
                      </p>

                      {/* Thin Golden Divider */}
                      <div className="sv-story-gold-rule" aria-hidden="true" />

                      {/* Minimalist Icon Specs (Pure Information, Zero Extra Buttons) */}
                      <div className="sv-story-specs">
                        <div className="sv-story-spec-line">
                          <span className="sv-spec-glyph">📅</span>
                          <span className="sv-spec-info">{evt.day}, {evt.date}</span>
                        </div>

                        <div className="sv-story-spec-line">
                          <span className="sv-spec-glyph">⏰</span>
                          <span className="sv-spec-info">{evt.time}</span>
                        </div>

                        <div className="sv-story-spec-line">
                          <span className="sv-spec-glyph">📍</span>
                          <span className="sv-spec-info">{evt.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            B. MOBILE CONTINUOUS SCROLL STREAM (< 992px)
            Continuous Left Stepper Line with Sunflower + Toran Stream
            ======================================================== */}
        <div
          ref={mobileTimelineRef}
          className="sv-ceremonies-mobile-stream"
        >
          {/* Continuous Left Stepper Long Line (Lambi Line) with Sliding Sunflower (Fool) */}
          <div className="sv-mobile-stepper-col">
            <SunflowerStepperTrack
              events={eventsData}
              activeId={activeId}
              flowerY={mobileFlowerY}
              nodeOffsets={mobileOffsets}
              onSelectNode={handleSelectNode}
              className="sv-mobile-sunflower-track"
            />
          </div>

          {/* Main Content Column with Full Hanging Toran Boards */}
          <div className="sv-mobile-boards-stream">
            {eventsData.map((evt, idx) => {
              const isActive = evt.id === activeId;

              return (
                <article
                  key={evt.id}
                  id={`sv-mobile-evt-${evt.id}`}
                  data-event-id={evt.id}
                  ref={(el) => {
                    if (el) mobileCardRefs.current.set(evt.id, el);
                    else mobileCardRefs.current.delete(evt.id);
                  }}
                  className={`sv-mobile-ceremony-card sv-scroll-reveal ${isActive ? 'is-active-card' : ''}`}
                >
                  {/* Event Pill */}
                  <div className="sv-mobile-badge-top">
                    <span className="sv-mobile-badge-pill">EVENT 0{idx + 1}</span>
                    <span className="sv-mobile-badge-day">{evt.day} · {evt.date}</span>
                  </div>

                  {/* Hanging Toran Board Component */}
                  <ToranHangingBoard
                    event={evt}
                    enableTilt={false}
                    className="sv-mobile-toran-board"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
