import React from 'react';

export default function SunflowerStepperTrack({
  events = [],
  activeId,
  flowerY,
  nodeOffsets = [],
  onSelectNode,
  className = ''
}) {
  if (!events.length) return null;

  const totalSteps = events.length;
  const activeIndex = Math.max(
    0,
    events.findIndex((evt) => evt.id === activeId)
  );

  // If flowerY is a number, treat as px; if string, use as is; fallback to index percentage
  let cordHeightStyle;
  let flowerTopStyle;

  if (typeof flowerY === 'number') {
    cordHeightStyle = `${flowerY}px`;
    flowerTopStyle = `${flowerY}px`;
  } else if (typeof flowerY === 'string') {
    cordHeightStyle = flowerY;
    flowerTopStyle = flowerY;
  } else {
    const defaultPct = totalSteps > 1 ? (activeIndex / (totalSteps - 1)) * 100 : 50;
    cordHeightStyle = `${defaultPct}%`;
    flowerTopStyle = `${defaultPct}%`;
  }

  return (
    <div className={`sv-stepper-track-wrap ${className}`} aria-label="Ceremony progress stepper">
      {/* 1. Fine Continuous Golden Guide Line (Lambi Line) */}
      <div className="sv-stepper-guide-line" aria-hidden="true" />

      {/* 2. Hanging Golden Cord connected to sunflower from top */}
      <div
        className="sv-stepper-hanging-cord"
        style={{ height: cordHeightStyle }}
        aria-hidden="true"
      />

      {/* 3. Radiant Glowing Sunflower / Mandala Medallion (Fool) */}
      <div
        className="sv-stepper-sunflower-marker is-glowing"
        style={{ top: flowerTopStyle }}
        aria-hidden="true"
      >
        <img
          src="/assets/shubh-vivah/events/sign/sunflower-medallion.svg"
          alt="Active Ceremony Sunflower Indicator"
          className="sv-stepper-sunflower-img"
        />
        <div className="sv-stepper-sunflower-aura" />
      </div>

      {/* 4. Subtle Step Node Dots for each ceremony along the line */}
      <div className="sv-stepper-nodes-list" role="tablist">
        {events.map((evt, idx) => {
          const isActive = evt.id === activeId;
          const isPassed = idx <= activeIndex;

          let nodeTop;
          if (nodeOffsets && nodeOffsets[idx] !== undefined) {
            nodeTop = typeof nodeOffsets[idx] === 'number' ? `${nodeOffsets[idx]}px` : nodeOffsets[idx];
          } else {
            nodeTop = totalSteps > 1 ? `${(idx / (totalSteps - 1)) * 100}%` : '50%';
          }

          return (
            <button
              key={evt.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Event ${idx + 1}: ${evt.name}`}
              className={`sv-stepper-dot-node ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
              style={{ top: nodeTop }}
              onClick={() => onSelectNode && onSelectNode(evt.id, idx)}
            >
              <span className="sv-stepper-dot-core" />
              <span className="sv-stepper-node-tooltip">
                <span className="sv-node-tip-num">0{idx + 1}</span>
                <span className="sv-node-tip-name">{evt.name}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
