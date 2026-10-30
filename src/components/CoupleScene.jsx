import React from 'react';

export default function CoupleScene() {
  return (
    <section className="screen" id="couple" data-scene="04">
      <div className="section-index">Two hearts · One beautiful journey</div>
      <span className="floral a">✿ ❀</span>
      <span className="floral b">❀</span>
      <span className="floral c">✿</span>

      <div className="content arch">
        <div className="eyebrow">With love and happiness</div>

        <h1 className="script" style={{ marginTop: '18px' }}>
          Ankit
        </h1>

        <div className="ornament-text" style={{ fontSize: '28px', margin: '10px auto' }}>
          &
        </div>

        <h1 className="script">
          Palak
        </h1>

        <div className="ornament" />

        <p style={{ fontSize: 'clamp(18px, 4.5vw, 24px)', fontStyle: 'italic' }}>
          “Together is a wonderful place to be.”
        </p>

        <div className="footer-note" style={{ marginTop: '16px' }}>
          Stepping into a lifetime of laughter, friendship, and cherished moments.
        </div>
      </div>
    </section>
  );
}

