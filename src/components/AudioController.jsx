import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, MicOff, Play, Pause, SkipForward, Download, X, Laptop, Smartphone, ExternalLink, Check, Sparkles } from 'lucide-react';

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

// ── Full narration script, optimised for a natural human female voice ─────
const NARRATION_SCRIPT = [
  // Hero
  "Welcome! I am Nihar's voice assistant. Let me take you on a personal walk-through of his portfolio.",
  // About
  "Nihar Ranjan Biswal is a passionate MCA graduate and Full Stack Developer based in Bhubaneswar, Odisha, India. He combines strong backend engineering with clean, modern front-end design.",
  // Skills
  "His core tech stack includes React JS, Next JS, Node JS, Express, MongoDB, Java, Python, and SQL, with hands-on machine learning experience using Pandas, NumPy, and Scikit-Learn.",
  // Experience
  "Nihar gained hands-on software development experience at NIELIT, the National Institute of Electronics and Information Technology, building real-world production web systems. He also honed his client communication skills at Reliance Retail.",
  // Projects
  "His portfolio features over 50 core projects, including an AI-powered IPL Match Predictor, a Pharma CRM system, an AI Image Generator, a Code Compiler, and an AI Disease Detection model. Feel free to explore the interactive live demos below.",
  // Education
  "He holds a Master of Computer Applications degree from Maharaja Sriram Chandra Bhanja Deo University, and a Bachelor of Science in Physics from Utkal University.",
  // Certifications
  "Nihar has earned multiple technical certifications, including Google Analytics, Oracle Cloud Infrastructure, Full Stack Development from NIELIT, and top awards at the Odisha AI Symposium and University Startup competitions.",
  // Contact
  "Thank you for exploring Nihar's portfolio! He is actively available for Full Stack Developer, Software Engineer, and Data roles. Feel free to connect with him on LinkedIn, GitHub, or through the contact section below. Have a wonderful day!"
];

export default function AudioController() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [ttsPlaying, setTtsPlaying]     = useState(false);
  const [tourIndex, setTourIndex]       = useState(0);
  const [micActive, setMicActive]       = useState(false);
  const [transcript, setTranscript]     = useState('');
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled]   = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [downloadedShortcut, setDownloadedShortcut] = useState(false);

  const audioCtxRef       = useRef(null);
  const synthIntervalRef  = useRef(null);
  const recognitionRef    = useRef(null);
  const tourIndexRef      = useRef(0);   // keep ref in sync for closures
  const isTourRunningRef  = useRef(false);

  // ── Load voices (Chrome loads them async) ──────────────────────────────
  useEffect(() => {
    if (!window.speechSynthesis) return;
    const load = () => setVoicesLoaded(true);
    window.speechSynthesis.addEventListener('voiceschanged', load);
    // Try immediately in case they're already loaded (Firefox, Safari)
    if (window.speechSynthesis.getVoices().length > 0) setVoicesLoaded(true);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  // ── PWA Install Prompt Listener ─────────────────────────────────────────
  useEffect(() => {
    // Check if already running as standalone app
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    if (window.deferredInstallPrompt) {
      setInstallPrompt(window.deferredInstallPrompt);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredInstallPrompt = e;
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      window.deferredInstallPrompt = null;
    };

    const handlePwaReady = () => {
      if (window.deferredInstallPrompt) {
        setInstallPrompt(window.deferredInstallPrompt);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('pwa-ready', handlePwaReady);
    window.addEventListener('pwa-installed', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('pwa-ready', handlePwaReady);
      window.removeEventListener('pwa-installed', handleAppInstalled);
    };
  }, []);

  // 1-Click Desktop App Shortcut Download (.url file)
  const handleDownloadShortcut = () => {
    const origin = window.location.origin || 'https://niharbiswal.tiiny.site';
    const content = `[InternetShortcut]\nURL=${origin}\nIconIndex=0\nIconFile=${origin}/favicon.svg\nHotKey=0\n`;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const dlUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = dlUrl;
    link.download = 'Nihar_Portfolio_App.url';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(dlUrl);
    setDownloadedShortcut(true);
    setTimeout(() => setDownloadedShortcut(false), 4000);
  };

  // Open in standalone borderless window
  const handleOpenAppWindow = () => {
    window.open(window.location.origin, 'NiharPortfolioApp', 'popup=yes,width=1280,height=800,menubar=no,toolbar=no,location=no,status=no');
  };

  const handleInstallClick = async () => {
    const promptEvent = installPrompt || window.deferredInstallPrompt;
    if (promptEvent) {
      try {
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          setInstallPrompt(null);
          window.deferredInstallPrompt = null;
          setShowInstallModal(false);
          return;
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }
    // If native prompt is not directly available or dismissed, open the interactive modal
    setShowInstallModal(true);
  };

  // ── Pick the best realistic natural human female voice ────────────────
  const getFemaleVoice = () => {
    if (!window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Filter out robotic legacy desktop voices (Zira Desktop is notoriously robotic)
    const isRoboticOrMale = (v) => {
      const name = v.name.toLowerCase();
      return (
        name.includes('zira') ||
        name.includes('desktop') ||
        name.includes('male') ||
        name.includes('guy') ||
        name.includes('david') ||
        name.includes('george') ||
        name.includes('mark') ||
        name.includes('richard') ||
        name.includes('james') ||
        name.includes('stefan') ||
        name.includes('ravi')
      );
    };

    // 1. Ultra-Realistic Neural / Natural Online Female Voices (Microsoft Edge, Windows 11, Google Chrome, macOS)
    const naturalHumanVoices = [
      'Microsoft Jenny Online (Natural)',
      'Microsoft Aria Online (Natural)',
      'Microsoft Ava Online (Natural)',
      'Microsoft Emma Online (Natural)',
      'Microsoft Sonia Online (Natural)',
      'Microsoft Libby Online (Natural)',
      'Microsoft Michelle Online (Natural)',
      'Google UK English Female',
      'Google US English',
      'Ava (Premium)',
      'Ava (Enhanced)',
      'Samantha (Enhanced)',
      'Serena (Premium)',
      'Karen (Enhanced)',
      'Zoe (Premium)',
      'Victoria',
      'Samantha',
      'Microsoft Aria',
      'Microsoft Jenny',
      'en-US-Neural2-F'
    ];

    for (const name of naturalHumanVoices) {
      const match = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
      if (match) return match;
    }

    // 2. Any English voice that has "Natural" or "Neural" or "Premium" and is female
    const neuralFemale = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Enhanced') || v.name.includes('Premium')) &&
      !isRoboticOrMale(v)
    );
    if (neuralFemale) return neuralFemale;

    // 3. Modern Chrome/Edge/OS standard English female voices
    const femaleKeywords = ['female', 'woman', 'aria', 'jenny', 'samantha', 'karen', 'victoria', 'serena', 'ava', 'zoe', 'anna'];
    const standardFemale = voices.find(v => 
      v.lang.startsWith('en') && 
      femaleKeywords.some(k => v.name.toLowerCase().includes(k)) &&
      !isRoboticOrMale(v)
    );
    if (standardFemale) return standardFemale;

    // 4. Any English voice that is not robotic or male
    const anyFemaleEnglish = voices.find(v => 
      v.lang.startsWith('en') && !isRoboticOrMale(v)
    );
    if (anyFemaleEnglish) return anyFemaleEnglish;

    // 5. Last resort fallback
    return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
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
      utterance.rate   = 0.94;   // Warm, natural conversational pacing
      utterance.pitch  = 1.04;   // Natural human female pitch inflection
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

      if (window.speechSynthesis) window.speechSynthesis.speak(utterance);
    }, 900);
  };

  // ── Start / Stop TTS Tour ─────────────────────────────────────────────
  const handleToggleTTS = () => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      alert("Oops! The AI Voice Assistant is not supported inside this app's browser (like Instagram/Facebook). Please open the website in Google Chrome or Safari for the full interactive experience! 🎙️✨");
      return;
    }

    if (ttsPlaying) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      isTourRunningRef.current = false;
      setTtsPlaying(false);
      setCurrentLabel('');
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      isTourRunningRef.current = true;
      setTtsPlaying(true);
      speakSegment(tourIndexRef.current);
    }
  };

  // ── Skip to next section ───────────────────────────────────────────────
  const handleSkip = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
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
      if (window.speechSynthesis) window.speechSynthesis.cancel();
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

      {/* Install Portfolio PWA Button */}
      {!isInstalled && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleInstallClick}
          title="Install this portfolio as an app on your device"
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 text-white text-xs font-bold tracking-wide shadow-[0_4px_20px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border border-blue-400/20"
        >
          <Download className="h-4 w-4 text-white" />
          <span>Install Portfolio</span>
        </motion.button>
      )}

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

      {/* Interactive Install & Download Portfolio Modal */}
      <AnimatePresence>
        {showInstallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowInstallModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-blue-500/30 bg-slate-950 p-6 shadow-[0_0_50px_rgba(37,99,235,0.3)] text-left flex flex-col gap-4 overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden border border-blue-500/40 shadow-lg p-0.5 bg-gradient-to-br from-blue-500 to-cyan-400 shrink-0">
                    <img src="/icon-192.png" alt="Nihar Portfolio" className="h-full w-full object-cover rounded-[14px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      <span>Install Portfolio App</span>
                      <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                    </h3>
                    <p className="text-xs text-gray-400">Nihar Ranjan Biswal • Standalone App</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInstallModal(false)}
                  className="h-8 w-8 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Option 1: 1-Click Desktop Shortcut Download (.url file) */}
              <div className="rounded-2xl p-4 bg-blue-500/10 border border-blue-500/30 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-bold text-white">Direct Desktop App (Windows / PC)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold">1-Click</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Download the direct desktop app shortcut file. Place it on your Desktop to launch Nihar's portfolio anytime in 1 click!
                </p>
                <button
                  onClick={handleDownloadShortcut}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  {downloadedShortcut ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Downloaded! Check Downloads Folder</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 text-white" />
                      <span>Download Desktop App (.url)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Option 2: Browser Address Bar Installation Guide */}
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Browser Native Install (Chrome / Edge)</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Click the <strong className="text-blue-400">Install icon (🖥️ or 📥)</strong> on the right side of your browser URL bar at the top, then click <strong>Install</strong>.
                </p>
                {(installPrompt || (typeof window !== 'undefined' && window.deferredInstallPrompt)) && (
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                    <span>Open Native Install Prompt</span>
                  </button>
                )}
              </div>

              {/* Option 3: Mobile Devices (Android & iOS) */}
              <div className="rounded-2xl p-3 bg-white/5 border border-white/5 flex items-start gap-2.5 text-gray-400 text-[11px]">
                <Smartphone className="h-4 w-4 text-cyber-cyan shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-gray-200">Mobile Phone:</strong> Tap <span className="text-white font-mono">⋮ (menu)</span> in Chrome and tap <span className="text-blue-300">"Add to Home screen"</span> or <span className="text-blue-300">"Install app"</span>. (iPhone: tap Safari Share → Add to Home Screen).
                </div>
              </div>

              {/* Option 4: Open Standalone Window */}
              <button
                onClick={handleOpenAppWindow}
                className="w-full py-2 rounded-xl bg-transparent hover:bg-white/5 text-gray-400 hover:text-white text-xs font-medium border border-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Launch in Clean Standalone Window</span>
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
