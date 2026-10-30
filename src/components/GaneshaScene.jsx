import React from 'react';

export default function GaneshaScene() {
  return (
    <section className="screen" id="ganesha" data-scene="02">
      <div className="section-index">An auspicious beginning</div>
      <span className="floral a">❀</span>
      <span className="floral c">✿</span>

      <div className="content arch">
        <div className="eyebrow">With divine blessings</div>
        
        <div className="ganesha-symbol" aria-label="Om Ganesh">
          ॐ
        </div>

        <h2 className="ganesha-shlok">
          श्री गणेशाय नमः
        </h2>

        <div className="ornament" />

        <p style={{ marginTop: '12px' }}>
          May this sacred union and new beginning be showered with lifelong love, joy, harmony and divine blessings.
        </p>

        <div className="footer-note">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </div>
      </div>
    </section>
  );
}

