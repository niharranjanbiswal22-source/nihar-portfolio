// Professional Web Audio Synthesizer & Arcade BGM Music Engine
// Zero external network dependencies, 100% reliable in any browser.

class ArcadeAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmVolume = 0.18; // Comfortable gentle volume
    this.bgmTimer = null;
    this.bgmStep = 0;
    this.bgmGain = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
        this.bgmGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  setBgmVolume(val) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(this.bgmVolume, this.ctx.currentTime, 0.05);
    }
  }

  // ==========================================
  // PLEASANT RETRO ARCADE BGM (Background Music)
  // Upbeat, melodic, joyful pentatonic chord progression
  // ==========================================
  startBGM(theme = 'retro') {
    if (this.bgmPlaying) return;
    this.init();
    if (!this.ctx) return;
    this.bgmPlaying = true;
    this.bgmStep = 0;

    // Melody notes (Hz frequencies): C4, D4, E4, G4, A4, C5, D5, E5
    const notes = {
      C3: 130.81, G3: 196.00, A3: 220.00, F3: 174.61,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
      G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
      D5: 587.33, E5: 659.25, G5: 783.99
    };

    // Upbeat 16-step arcade melody loop
    const melody = [
      notes.E5, notes.G5, notes.A4, notes.C5,
      notes.D5, notes.E5, notes.G4, notes.C5,
      notes.A4, notes.C5, notes.D5, notes.E5,
      notes.G5, notes.E5, notes.D5, notes.C5
    ];

    // Warm bassline (C -> Am -> F -> G progression)
    const bassline = [
      notes.C3, notes.C3, notes.A3, notes.A3,
      notes.F3, notes.F3, notes.G3, notes.G3,
      notes.C3, notes.C3, notes.A3, notes.A3,
      notes.F3, notes.F3, notes.G3, notes.G3
    ];

    const tempoMs = 155; // ~120 BPM upbeat groove

    this.bgmTimer = setInterval(() => {
      if (!this.bgmPlaying || this.isMuted) return;
      if (!this.ctx) return;

      const idx = this.bgmStep % melody.length;
      const t = this.ctx.currentTime;

      try {
        // 1. Lead Melody Note (Warm Triangle with filter)
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(melody[idx], t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, t);

        noteGain.gain.setValueAtTime(0.22, t);
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.bgmGain);

        osc.start(t);
        osc.stop(t + 0.14);

        // 2. Warm Bass (Every 2 steps)
        if (idx % 2 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'sine';
          bassOsc.frequency.setValueAtTime(bassline[idx], t);

          bassGain.gain.setValueAtTime(0.35, t);
          bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

          bassOsc.connect(bassGain);
          bassGain.connect(this.bgmGain);

          bassOsc.start(t);
          bassOsc.stop(t + 0.28);
        }

        // 3. Subtle Hi-Hat / Tap (Every 4 steps)
        if (idx % 2 === 1) {
          const hatOsc = this.ctx.createOscillator();
          const hatGain = this.ctx.createGain();
          hatOsc.type = 'sine';
          hatOsc.frequency.setValueAtTime(2400, t);

          hatGain.gain.setValueAtTime(0.04, t);
          hatGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

          hatOsc.connect(hatGain);
          hatGain.connect(this.bgmGain);

          hatOsc.start(t);
          hatOsc.stop(t + 0.04);
        }

        this.bgmStep++;
      } catch {}
    }, tempoMs);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  // ==========================================
  // POLISHED GAME SOUND EFFECTS (SFX)
  // Clean, melodic, filtered, zero harsh buzzing
  // ==========================================

  // 1. Slingshot Pull / Tension (Smooth rising pitch)
  playStretch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  // 2. Launch / Whoosh (Smooth wind sweep)
  playLaunch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {}
  }

  // 3. Impact / Wooden Block Hit (Crisp pop)
  playHit() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  // 4. Snake Eat / Pick Coin (Juicy melodic chime)
  playEat() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      [659.25, 987.77].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + i * 0.05;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(start);
        osc.stop(start + 0.1);
      });
    } catch {}
  }

  // 5. Bow & Arrow Release (Vibrating bowstring)
  playBowTwang() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(95, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {}
  }

  // 6. Bullseye / Gold Star (Rich major chord fanfare)
  playBullseye() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      // C5, E5, G5, C6 (Major arpeggio)
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + i * 0.07;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {}
  }

  // 7. Engine Acceleration (Smooth purr)
  playEngine(speedRatio = 0.5) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      const baseFreq = 65 + speedRatio * 140;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  // 8. Car Brake (Soft tire friction)
  playBrake() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.12);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  // 9. Correct / Stage Win (Triumphant chime)
  playWin() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      [587.33, 739.99, 880.00].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    } catch {}
  }

  // 10. Crash / Game Over (Muffled thump)
  playCrash() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.25);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }
}

export const sound = new ArcadeAudioEngine();
