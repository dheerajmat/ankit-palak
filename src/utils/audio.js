// Web Audio API romantic melodic synthesizer
// Plays delicate arpeggios on sine and triangle waves with soft envelopes

class WeddingAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.timer = null;
    this.noteIndex = 0;
    this.notes = [
      261.63, // C4
      329.63, // E4
      392.00, // G4
      523.25, // C5
      392.00, // G4
      329.63, // E4
      293.66, // D4
      349.23, // F4
      440.00, // A4
      523.25, // C5
      440.00, // A4
      349.23, // F4
      392.00, // G4
      493.88, // B4
      587.33, // D5
      493.88  // B4
    ];
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.55, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
  }

  makeNote(freq, start, duration, volume, type = 'sine') {
    if (!this.audioCtx || !this.masterGain) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.16);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + duration + 0.05);
    } catch {
      // Audio node scheduling guard
    }
  }

  step = () => {
    if (!this.isPlaying || !this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    const f = this.notes[this.noteIndex % this.notes.length];

    // Primary bell tone
    this.makeNote(f, t, 2.4, 0.024, 'sine');
    // Soft high harmonic overtone
    this.makeNote(f * 2, t + 0.08, 1.5, 0.008, 'triangle');
    // Warm bass foundation every 3rd note
    if (this.noteIndex % 3 === 0) {
      this.makeNote(f / 2, t, 1.2, 0.014, 'sine');
    }

    this.noteIndex++;
    this.timer = setTimeout(this.step, 1450);
  };

  async play() {
    this.init();
    if (!this.audioCtx) return false;
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
    this.isPlaying = true;
    this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.masterGain.gain.setTargetAtTime(0.55, this.audioCtx.currentTime, 0.3);
    this.step();
    return true;
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setTargetAtTime(0.0001, this.audioCtx.currentTime, 0.15);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return this.play();
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();

