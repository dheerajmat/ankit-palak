import React, { useRef, useState, useEffect } from 'react';
import { groomsFamilyData } from '../../data/weddingData';

export default function SwingingBellsShrine() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sv-shrine-section sv-grooms-family-section ${isVisible ? 'sv-section-animated' : ''}`}
      id="family-shrine"
    >
      {/* Royal Section Header: The Groom's Family */}
      <div className="sv-family-header-wrap">
        <h2 className="sv-family-title">The Groom's Family</h2>
        <div className="sv-family-divider-line">
          <span className="sv-family-line-left" />
          <span className="sv-family-line-dot">♦</span>
          <span className="sv-family-line-right" />
        </div>
      </div>

      {/* 3 Arched Royal Family Cards Grid */}
      <div className="sv-family-grid">
        {groomsFamilyData.map((member, idx) => (
          <div
            key={member.id}
            className={`sv-family-card sv-family-card-${idx + 1}`}
          >
            {/* 1. Deep Royal Maroon Arch Backdrop inside temple window */}
            <div className="sv-family-arch-bg" aria-hidden="true" />

            {/* 2. Hanging Golden Temple Bell at the arch apex */}
            <img
              src="/assets/shubh-vivah/family/bell.webp"
              alt=""
              className="sv-family-bell-asset"
              aria-hidden="true"
            />

            {/* 3. Person Illustration in Royal Traditional Attire */}
            <img
              src={member.image}
              alt={member.name}
              className="sv-family-person-img"
              loading="lazy"
            />

            {/* 4. Golden Temple Arch Frame with Leaves, Lamps & Solid Golden Plaque */}
            <img
              src="/assets/shubh-vivah/family/frame.webp"
              alt="Ornate Temple Arch Frame"
              className="sv-family-frame-asset"
              loading="lazy"
            />

            {/* 5. Plaque Typography: Role & Name centered in golden cartouche */}
            <div className="sv-family-plaque-content">
              <span className="sv-family-role">{member.role}</span>
              <span className="sv-family-name">{member.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
