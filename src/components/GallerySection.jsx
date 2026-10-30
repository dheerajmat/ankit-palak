import React from 'react';
import { galleryData, shubhVivahGalleryData } from '../data/weddingData';

export default function GallerySection({ theme = 'shubh-vivah', onSelectImage }) {
  const items = theme === 'shubh-vivah' ? shubhVivahGalleryData : galleryData;

  return (
    <section className="long-section" id="gallery">
      <div className="long-inner">
        <div className="section-kicker">
          {theme === 'shubh-vivah' ? 'SACRED MOMENTS & MEMORIES' : 'A LITTLE ROMANCE, A LOT OF JOY'}
        </div>
        <h2 className="section-title">
          {theme === 'shubh-vivah' ? 'Wedding Gallery' : 'Moments & Details'}
        </h2>
        <p className="section-subtitle">
          {theme === 'shubh-vivah'
            ? 'A glimpse into the sacred rituals, royal palace settings, and joyful celebrations.'
            : 'A few lovely details inspired by the colors, fragrance and royal traditions of our wedding celebration.'}
        </p>

        <div className="gallery-grid">
          {items.map((tile, idx) => (
            <div
              key={tile.id}
              className="gallery-tile"
              onClick={() => onSelectImage(idx)}
              title={`Click to preview: ${tile.title}`}
            >
              <img src={tile.image} alt={tile.title} loading="lazy" />
              <small>{tile.title}</small>
            </div>
          ))}
        </div>

        <p className="rsvp-note" style={{ textAlign: 'center', marginTop: '20px' }}>
          Personal couple photos and wedding memories can be customized here anytime.
        </p>
      </div>
    </section>
  );
}
