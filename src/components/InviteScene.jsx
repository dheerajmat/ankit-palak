import React from 'react';

export default function InviteScene() {
  return (
    <section className="screen" id="invite" data-scene="03">
      <div className="section-index">A day to remember</div>
      <span className="floral a">❀</span>
      <span className="floral b">✿</span>

      <div className="content arch">
        <div className="eyebrow">Together with our families</div>
        
        <div className="ornament-text">✦ ❧ ✦</div>

        <p style={{ letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '13px', margin: '8px 0' }}>
          Joyfully invite you to celebrate
        </p>

        <h2 className="script" style={{ fontSize: 'clamp(64px, 15vw, 104px)', margin: '14px 0' }}>
          Our Wedding
        </h2>

        <div className="ornament" />

        <p>
          Two families, two hearts, one beautiful celebration.
        </p>

        <div className="footer-note" style={{ fontStyle: 'italic', marginTop: '16px' }}>
          Your presence and prayers will make this joyous occasion complete.
        </div>
      </div>
    </section>
  );
}

