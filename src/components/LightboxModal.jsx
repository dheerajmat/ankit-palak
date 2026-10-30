import React, { useEffect } from 'react';
import { galleryData, shubhVivahGalleryData } from '../data/weddingData';

export default function LightboxModal({ selectedIndex, onClose, onNavigate, theme = 'shubh-vivah' }) {
  const items = theme === 'shubh-vivah' ? shubhVivahGalleryData : galleryData;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((selectedIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((selectedIndex - 1 + items.length) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onClose, onNavigate, items.length]);

  if (selectedIndex === null || selectedIndex === undefined) return null;

  const currentItem = items[selectedIndex];
  if (!currentItem) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', background: '#fffdfa' }}
      >
        <button 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Close image preview"
        >
          ✕
        </button>

        <div style={{ position: 'relative', width: '100%', maxHeight: '68vh', overflow: 'hidden', background: '#2c1e20' }}>
          <img
            src={currentItem.image}
            alt={currentItem.title}
            style={{ width: '100%', maxHeight: '68vh', objectFit: 'contain', display: 'block', margin: 'auto' }}
          />

          {/* Navigation Arrows */}
          <button
            onClick={() => onNavigate((selectedIndex - 1 + items.length) % items.length)}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 250, 245, 0.85)',
              border: '1px solid #c6a16b',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'grid',
              placeItems: 'center',
              color: '#8c5960'
            }}
          >
            ‹
          </button>

          <button
            onClick={() => onNavigate((selectedIndex + 1) % items.length)}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 250, 245, 0.85)',
              border: '1px solid #c6a16b',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'grid',
              placeItems: 'center',
              color: '#8c5960'
            }}
          >
            ›
          </button>
        </div>

        <div style={{ padding: '20px 24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', color: 'var(--sv-crimson, var(--rose))', margin: '0 0 6px' }}>
            {currentItem.title}
          </h3>
          <p style={{ fontSize: '17px', color: '#7a5a5e', margin: 0 }}>
            {currentItem.desc}
          </p>
          <div style={{ fontSize: '13px', color: '#a77d65', marginTop: '10px' }}>
            {selectedIndex + 1} of {items.length}
          </div>
        </div>
      </div>
    </div>
  );
}
