import React, { useState } from 'react';
import { weddingAudio } from '../utils/audio';

export default function Topbar({ currentScene = "01 / 06" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMusicToggle = async () => {
    try {
      if (isPlaying) {
        weddingAudio.pause();
        setIsPlaying(false);
      } else {
        await weddingAudio.play();
        setIsPlaying(true);
      }
    } catch {
      // Audio error
    }
  };

  return (
    <header className="topbar-container" style={{ justifyContent: 'flex-end' }}>
      {/* Right Corner: Music Toggle */}
      <div className="topbar-controls-right">
        <button
          className={`music-btn ${isPlaying ? 'playing' : ''}`}
          onClick={handleMusicToggle}
          title={isPlaying ? "Pause ambient melody" : "Play ambient romantic melody"}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
        >
          <span className="music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{isPlaying ? 'Music On' : 'Play Music'}</span>
        </button>
      </div>
    </header>
  );
}
