// Background Audio Player for Royal Wedding Website
// Plays Rohit Kushwaha's Flute Instrumental Cover of A R Rahman's "Dam Tara Dam Tara"
// Automatically pauses when browser tab is inactive, minimized, or in recent tabs
// Automatically resumes only when the tab is live and active

class WeddingAudioPlayer {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.userWantsAudio = false;
    this.wasPlayingBeforeBackground = false;
    this.listeners = new Set();
    this.src = '/assets/wedding-bg-music.mp3';
    this.isInitialized = false;

    // Initialize lifecycle listeners as soon as window/document is available
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.setupVisibilityListeners();
    }
  }

  setupVisibilityListeners() {
    // 1. Page Visibility API: Detect tab switch, minimize, and mobile recent-apps switcher
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Tab is hidden or in recent tabs / background: stop audio immediately
        if (this.isPlaying) {
          this.wasPlayingBeforeBackground = true;
          if (this.audio) {
            this.audio.pause();
          }
        }
      } else if (document.visibilityState === 'visible') {
        // Tab is live and active again: resume only if it was actively playing before leaving
        if (this.wasPlayingBeforeBackground && this.userWantsAudio) {
          this.wasPlayingBeforeBackground = false;
          if (this.audio) {
            this.audio.play().catch(() => {
              // Ignore autoplay policy if browser requires a new gesture
            });
          }
        }
      }
    });

    // 2. Mobile Page Lifecycle / Tab Close / Navigation
    window.addEventListener('pagehide', () => {
      if (this.audio) {
        this.audio.pause();
      }
    });

    window.addEventListener('beforeunload', () => {
      if (this.audio) {
        this.audio.pause();
      }
    });
  }

  init() {
    if (this.audio || typeof window === 'undefined') return;

    this.audio = new Audio(this.src);
    this.audio.loop = true;
    this.audio.volume = 0.6;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.isPlaying);
      } catch {
        // ignore
      }
    });
  }

  async play() {
    this.init();
    if (!this.audio) return false;
    this.userWantsAudio = true;
    this.wasPlayingBeforeBackground = false;

    // Do not attempt to play if the tab is currently in the background or hidden
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      this.wasPlayingBeforeBackground = true;
      return false;
    }

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio autoplay requires user interaction:', err);
      return false;
    }
  }

  pause() {
    this.userWantsAudio = false;
    this.wasPlayingBeforeBackground = false;
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
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
