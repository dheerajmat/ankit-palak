import React, { useState } from 'react';
import { eventsData } from '../data/weddingData';

export default function CelebrationsSection({ onSelectEvent }) {
  const [filter, setFilter] = useState('all');

  const filteredEvents = eventsData.filter((evt) => {
    if (filter === 'all') return true;
    return evt.dayGroup === filter;
  });

  return (
    <section className="long-section" id="celebrations">
      <div className="long-inner">
        <div className="section-kicker">Two days · A lifetime of memories</div>
        <h2 className="section-title">The Celebrations</h2>
        <p className="section-subtitle">
          With love in our hearts and blessings from our families, join us for every beautiful moment of music, dance, rituals and festivities.
        </p>

        {/* Filter Tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Event day filter">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            role="tab"
            aria-selected={filter === 'all'}
          >
            All Events ({eventsData.length})
          </button>
          <button
            className={`filter-tab ${filter === 'day1' ? 'active' : ''}`}
            onClick={() => setFilter('day1')}
            role="tab"
            aria-selected={filter === 'day1'}
          >
            Thursday · 19 Nov
          </button>
          <button
            className={`filter-tab ${filter === 'day2' ? 'active' : ''}`}
            onClick={() => setFilter('day2')}
            role="tab"
            aria-selected={filter === 'day2'}
          >
            Friday · 20 Nov
          </button>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="event-card"
              onClick={() => onSelectEvent(event)}
              title="Click to view full ceremony details"
            >
              <img
                className="event-art"
                src={event.image}
                alt={`Illustration for ${event.name}`}
                loading="lazy"
              />
              <div className="event-card-body">
                <span className="event-day">
                  {event.day} · {event.date}
                </span>
                <h3>{event.name}</h3>
                <div className="event-time">
                  <span>🕒</span> {event.time}
                </div>
                <p>{event.desc}</p>
                <div className="event-place">
                  <span>📍</span> {event.venue}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

