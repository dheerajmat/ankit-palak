import React from 'react';
import { coupleData } from '../data/weddingData';

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo" aria-label="Wedding Footer">
      <div className="script" style={{ fontSize: '52px' }}>
        {coupleData.names}
      </div>
      <p style={{ letterSpacing: '0.08em', fontSize: '16px' }}>
        A sacred union of two souls, two families and eternal love.
      </p>
      <p style={{ opacity: 0.85, fontSize: '13.5px', marginTop: '8px' }}>
        Hotel Grand Xenia &amp; Bravia Hotel · Ajmer, Rajasthan · 20 November 2026
      </p>
    </footer>
  );
}
