import React from 'react';
import { coupleData } from '../data/weddingData';

export default function OurStorySection() {
  return (
    <section className="long-section" id="our-story">
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

