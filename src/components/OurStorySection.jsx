import React from 'react';
import { coupleData } from '../data/weddingData';
import { useScrollReveal } from '../utils/useScrollReveal';

export default function OurStorySection() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section ref={sectionRef} className={`long-section ${isVisible ? 'sv-section-animated' : ''}`} id="our-story">
      <div className="long-inner">
        <div className="section-kicker">A new chapter begins</div>
        <h2 className="section-title">Together, Forever</h2>
        
        <div className="ornament" />

        <blockquote className="story-quote">
          {coupleData.invitationQuote}
        </blockquote>

        <p className="section-subtitle" style={{ marginTop: '25px' }}>
          {coupleData.subQuote}
        </p>

        <div className="ornament-text" style={{ fontSize: '24px' }}>
          ♡
        </div>
      </div>
    </section>
  );
}

