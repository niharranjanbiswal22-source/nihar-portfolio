import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, MicOff, Play, Pause, SkipForward } from 'lucide-react';

// ── Sections for auto-scroll tour ─────────────────────────────────────────
const TOUR_SECTIONS = [
  { id: 'hero',          label: 'Introduction' },
  { id: 'about',         label: 'About Me'     },
  { id: 'skills',        label: 'Tech Skills'  },
  { id: 'experience',    label: 'Experience'   },
  { id: 'premium-system-vault', label: 'Projects' },
  { id: 'education',     label: 'Education'    },
  { id: 'certifications',label: 'Certifications' },
  { id: 'contact',       label: 'Contact'      }
];

// ── Full narration script, optimised for a female voice ───────────────────
const NARRATION_SCRIPT = [
  // Hero
  "Welcome! I'm Nihar's AI voice assistant. Let me take you on a personal tour of his portfolio.",
  // About
  "Nihar Ranjan Biswal is a passionate MCA graduate and Full Stack Developer from Bhubaneswar, Odisha, India. He blends strong backend engineering with a clean eye for front-end design.",
  // Skills
  "His core tech stack includes React dot js, Next dot js, Node dot js, Express, MongoDB, Java, Python, and SQL — with hands-on experience in machine learning using Pandas, NumPy, and Scikit-Learn.",
  // Experience
  "Nihar gained professional Full Stack development experience at NIELIT — the National Institute of Electronics and Information Technology — building real production applications. He also developed strong communication skills at Reliance Retail.",
  // Projects
  "His portfolio includes over fifteen projects — from an AI-powered IPL Match Predictor, to a Pharma CRM system, an AI Image Generator, a Code Compiler, and a real-time Disease Detection model. Please explore the project cards for live demos.",
  // Education
  "He holds a Master of Computer Applications degree from Maharaja Sriram Chandra Bhanja Deo University, and a Bachelor of Science in Physics from Utkal University.",
  // Certifications
  "Nihar has earned multiple certifications — including Google Analytics, Oracle Cloud Foundations, Full Stack Development from NIELIT, a First Place award at the Odisha AI Symposium 2025, and a First Prize at the University Level Innovation and Startup Competition.",
  // Contact
  "Thank you for visiting Nihar's portfolio! He is actively seeking Full Stack Developer, Software Engineer, or Data Analyst roles. Feel free to connect with him on LinkedIn, GitHub, or via the contact section. He is flexible with timezones and ready to join your team!"
];

export default function AudioController() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [ttsPlaying, setTtsPlaying]     = useState(false);
  const [tourIndex, setTourIndex]       = useState(0);
  const [micActive, setMicActive]       = useState(false);
  const [transcript, setTranscript]     = useState('');
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');

  const audioCtxRef       = useRef(null);
  const synthIntervalRef  = useRef(null);
  const recognitionRef    = useRef(null);
  const tourIndexRef      = useRef(0);   // keep ref in sync for closures
  const isTourRunningRef  = useRef(false);

  // ── Load voices (Chrome loads them async) ──────────────────────────────
  useEffect(() => {
    const load = () => setVoicesLoaded(true);
    window.speechSynthesis.addEventListener('voiceschanged', load);
    // Try immediately in case they're already loaded (Firefox, Safari)
    if (window.speechSynthesis.getVoices().length > 0) setVoicesLoaded(true);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  // ── Pick the best female English voice ────────────────────────────────
  const getFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Prefer high-quality female voices by name (works on Chrome / Edge / Windows)
    const preferred = [
      'Microsoft Zira',     // Windows — clear, pleasant female
      'Microsoft Aria',     // Edge Canary / Windows 11
      'Google UK English Female',
      'Google US English',  // often female on Android/Chrome
      'Samantha',           // macOS
      'Karen',              // macOS/iOS AU
      'Moira',              // macOS
    ];
    for (const name of preferred) {
      const v = voices.find(v => v.name.includes(name));
      if (v) return v;
    }
    // Fallback: any English female-sounding voice
    const femaleKws = ['female', 'woman', 'girl', 'zira', 'aria', 'siri', 'samantha', 'karen'];
    const fb = voices.find(v => femaleKws.some(k => v.name.toLowerCase().includes(k)) && v.lang.startsWith('en'));
    if (fb) return fb;
    // Last resort: first English voice
    return voices.find(v => v.lang.startsWith('en')) || null;
  };

  // ── Speak a single segment, then scroll to the next section ───────────
  const speakSegment = (index) => {
    if (index >= TOUR_SECTIONS.length) {
      // Tour finished
      isTourRunningRef.current = false;
      setTtsPlaying(false);
      setTourIndex(0);
      tourIndexRef.current = 0;
      setCurrentLabel('');
      return;
    }

    // Scroll to section first
    const section = TOUR_SECTIONS[index];
    const el = document.getElementById(section.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrentLabel(section.label);
    setTourIndex(index);
    tourIndexRef.current = index;

    // Small delay to let scroll settle, then speak
    setTimeout(() => {
      if (!isTourRunningRef.current) return;

      const utterance = new SpeechSynthesisUtterance(NARRATION_SCRIPT[index]);
      utterance.rate   = 0.92;   // slightly slower — clear & professional
      utterance.pitch  = 1.08;   // slightly higher — female warmth
      utterance.volume = 1.0;

      const voice = getFemaleVoice();
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (!isTourRunningRef.current) return;
        // Pause 1 second between sections, then advance
        setTimeout(() => speakSegment(index + 1), 1000);
      };
      utterance.onerror = () => {
        isTourRunningRef.current = false;
        setTtsPlaying(false);
        setCurrentLabel('');
      };

      window.speechSynthesis.speak(utterance);
    }, 900);
  };

  // ── Start / Stop TTS Tour ─────────────────────────────────────────────
  const handleToggleTTS = () => {
    if (ttsPlaying) {
      window.speechSynthesis.cancel();
      isTourRunningRef.current = false;
      setTtsPlaying(false);
      setCurrentLabel('');
    } else {
      window.speechSynthesis.cancel();
      isTourRunningRef.current = true;
      setTtsPlaying(true);
      speakSegment(tourIndexRef.current);
    }
  };

  // ── Skip to next section ───────────────────────────────────────────────
  const handleSkip = () => {
    window.speechSynthesis.cancel();
    const next = Math.min(tourIndexRef.current + 1, TOUR_SECTIONS.length - 1);
    if (ttsPlaying) speakSegment(next);
  };

  // ── Ambient Space Synth Music ──────────────────────────────────────────
  const startSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const dMinor = [146.83, 174.61, 220.00, 261.63];
      const gMajor = [196.00, 246.94, 293.66, 369.99];
      let useDMinor = true;

      const playChord = () => {
        if (ctx.state === 'suspended') return;
        const freqs = useDMinor ? dMinor : gMajor;
        useDMinor = !useDMinor;
        freqs.forEach((freq) => {
          const osc    = ctx.createOscillator();
          const gain   = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 4.8);
        });
      };

      playChord();
      synthIntervalRef.current = setInterval(playChord, 5000);
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
  };

  const handleToggleMusic = () => {
    if (musicPlaying) { stopSynth(); setMusicPlaying(false); }
    else { startSynth(); setMusicPlaying(true); }
  };

  // ── Voice Command Scroll (STT) ─────────────────────────────────────────
  const startSpeechRecognition = () => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) { alert('Speech Recognition not supported. Try Chrome or Edge!'); return; }
    const rec = new SpeechRecognitionClass();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.onstart  = () => { setMicActive(true); setTranscript('Listening…'); };
    rec.onresult = (event) => {
      const cmd = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      setTranscript(`"${cmd}"`);
      if (cmd.includes('down'))        window.scrollBy({ top: 500, behavior: 'smooth' });
      else if (cmd.includes('up'))     window.scrollBy({ top: -500, behavior: 'smooth' });
      else if (cmd.includes('top') || cmd.includes('home'))
        window.scrollTo({ top: 0, behavior: 'smooth' });
      else {
        TOUR_SECTIONS.forEach(s => {
          if (cmd.includes(s.label.toLowerCase()) || cmd.includes(s.id))
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };
    rec.onerror = () => setMicActive(false);
    rec.onend   = () => setMicActive(false);
    recognitionRef.current = rec;
    rec.start();
  };

  const stopSpeechRecognition = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setMicActive(false);
  };

  const handleToggleMic = () => micActive ? stopSpeechRecognition() : startSpeechRecognition();

  // Cleanup
  useEffect(() => {
    return () => {
      stopSynth();
      window.speechSynthesis.cancel();
      isTourRunningRef.current = false;
      stopSpeechRecognition();
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans flex flex-col gap-2 items-start">

      {/* Live tour label HUD */}
      <AnimatePresence>
        {ttsPlaying && currentLabel && (
          <motion.div
            key="tour-label"
            initial={{ opacity: 0, x: -16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -16, scale: 0.9 }}
            className="glass-panel text-[10px] text-cyber-violet border border-cyber-violet/30 px-3.5 py-1.5 rounded-lg font-mono flex items-center gap-2 shadow-[0_0_12px_rgba(139,92,246,0.2)] bg-black/70 max-w-[200px]"
          >
            <div className="h-2 w-2 rounded-full bg-cyber-violet animate-ping shrink-0" />
            <span className="truncate">Now: {currentLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice command transcript */}
      <AnimatePresence>
        {micActive && (
          <motion.div
            key="transcript"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="glass-panel text-[10px] text-cyber-cyan border border-cyber-cyan/30 px-3.5 py-1.5 rounded-lg font-mono flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.2)] bg-black/70 max-w-[200px]"
          >
            <div className="h-2 w-2 rounded-full bg-cyber-cyan animate-ping shrink-0" />
            <span className="truncate">{transcript}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 bg-cyber-card/85 flex items-center gap-1.5 shadow-2xl backdrop-blur-xl">

        {/* Ambient Music */}
        <button
          onClick={handleToggleMusic}
          title={musicPlaying ? 'Mute ambient music' : 'Play ambient space music'}
          className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
            musicPlaying
              ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[0_0_10px_rgba(6,182,212,0.25)]'
              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
          }`}
        >
          {musicPlaying ? <Volume2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
        </button>

        {/* Female Voice Tour */}
        <button
          onClick={handleToggleTTS}
          title={ttsPlaying ? 'Stop voice tour' : 'Start female voice portfolio tour (auto-scrolls)'}
          className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
            ttsPlaying
              ? 'bg-cyber-violet/10 border-cyber-violet text-cyber-violet shadow-[0_0_10px_rgba(139,92,246,0.25)]'
              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
          }`}
        >
          {ttsPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        {/* Skip Section (visible only during tour) */}
        <AnimatePresence>
          {ttsPlaying && (
            <motion.button
              key="skip"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 36 }}
              exit={{ opacity: 0, width: 0 }}
              onClick={handleSkip}
              title="Skip to next section"
              className="h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20 overflow-hidden shrink-0"
            >
              <SkipForward className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Voice Command Scroll */}
        <button
          onClick={handleToggleMic}
          title={micActive ? 'Stop voice scroll' : 'Voice scroll: say "down", "about", "projects"…'}
          className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
            micActive
              ? 'bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.25)]'
              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
          }`}
        >
          {micActive ? <Mic className="h-4 w-4 animate-pulse" /> : <MicOff className="h-4 w-4" />}
        </button>
      </div>

    </div>
  );
}
