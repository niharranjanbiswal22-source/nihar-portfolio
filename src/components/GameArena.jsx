import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Play, Trophy, Sparkles, X, ChevronRight, Star, Flame, ShieldCheck, Music, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audioEffects';
import AngryBirdsGame from './games/AngryBirdsGame';
import SnakeGame from './games/SnakeGame';
import ArcheryGame from './games/ArcheryGame';
import QuizGame from './games/QuizGame';
import CarRacingGame from './games/CarRacingGame';
import DrDrivingGame from './games/DrDrivingGame';

const GAMES_LIST = [
  {
    id: 'angry-birds',
    title: 'Angry Birds: Slingshot Siege',
    category: 'Physics Slingshot',
    iconImg: '/games/angry_birds.png',
    badge: 'Official Rovio Art',
    color: 'from-red-600 to-amber-600',
    border: 'border-red-500/30 hover:border-red-500',
    shadow: 'shadow-red-600/20',
    rating: '4.9',
    plays: '28.4K',
    desc: 'Pull back the iconic red bird with trajectory physics to shatter wooden blocks and pop the green piggies across 3 castles!',
    component: AngryBirdsGame
  },
  {
    id: 'snake',
    title: 'Retro Neon Snake 97',
    category: 'Classic Arcade',
    iconImg: '/games/snake.png',
    badge: 'Retro Arcade',
    color: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-500/30 hover:border-emerald-500',
    shadow: 'shadow-emerald-600/20',
    rating: '4.8',
    plays: '34.1K',
    desc: 'Cyberpunk 60fps snake with glowing apples, golden bonus stars, progressive speed increments, and responsive touch D-pad.',
    component: SnakeGame
  },
  {
    id: 'archery',
    title: 'Archery Master 3D (Dhanush Teer)',
    category: 'Precision Shooting',
    iconImg: '/games/archery.png',
    badge: 'Bullseye Challenge',
    color: 'from-amber-600 to-yellow-600',
    border: 'border-amber-500/30 hover:border-amber-500',
    shadow: 'shadow-amber-600/20',
    rating: '4.9',
    plays: '19.8K',
    desc: 'Draw back the golden Dhanush bowstring, calibrate for shifting crosswinds, and hit consecutive 10-point Bullseyes!',
    component: ArcheryGame
  },
  {
    id: 'quiz',
    title: 'DevTech Quiz Blitz',
    category: 'Brain & Code Trivia',
    iconImg: '/games/quiz.png',
    badge: 'Engineering IQ',
    color: 'from-purple-600 to-indigo-600',
    border: 'border-purple-500/30 hover:border-purple-500',
    shadow: 'shadow-purple-600/20',
    rating: '4.7',
    plays: '22.2K',
    desc: '15-second timed engineering challenges covering React, JavaScript, Python, DSA and System Design with multiplier streaks.',
    component: QuizGame
  },
  {
    id: 'racing',
    title: 'Highway Turbo Racer',
    category: 'High-Speed Action',
    iconImg: '/games/car_racing.png',
    badge: 'Speed GT',
    color: 'from-cyan-600 to-blue-600',
    border: 'border-cyan-500/30 hover:border-cyan-500',
    shadow: 'shadow-cyan-600/20',
    rating: '4.8',
    plays: '31.6K',
    desc: 'Dodge multi-lane traffic at 240+ km/h, collect gold coins, and trigger cyan Nitro boost for pure adrenaline speed!',
    component: CarRacingGame
  },
  {
    id: 'dr-driving',
    title: 'Dr. Driving: Precision Parking',
    category: 'Real Simulation',
    iconImg: '/games/dr_driving.png',
    badge: 'Official SUD Inc',
    color: 'from-yellow-600 to-orange-600',
    border: 'border-amber-500/30 hover:border-amber-500',
    shadow: 'shadow-amber-600/20',
    rating: '4.9',
    plays: '42.0K',
    desc: 'Authentic cockpit controls: 360° steering wheel, Gas & Brake pedals, and Gear shifter (P/R/D) to park inside the yellow bay.',
    component: DrDrivingGame
  }
];

export default function GameArena() {
  const [activeGameId, setActiveGameId] = useState(null);
  const [isBgmOn, setIsBgmOn] = useState(false);
  const arcadeRef = useRef(null);

  const handleSelectGame = (gameId) => {
    setActiveGameId(gameId);
    if (!isBgmOn) {
      sound.startBGM();
      setIsBgmOn(true);
    }
    if (arcadeRef.current) {
      arcadeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleBgmTune = () => {
    const next = sound.toggleBGM();
    setIsBgmOn(next);
  };

  const handleCloseGame = () => {
    setActiveGameId(null);
    sound.stopBGM();
    setIsBgmOn(false);
  };

  const activeGameObj = GAMES_LIST.find(g => g.id === activeGameId);
  const ActiveGameComponent = activeGameObj?.component;

  return (
    <section 
      id="game-arena" 
      ref={arcadeRef}
      className="py-24 px-4 md:px-8 border-t border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-[#050811] relative overflow-hidden transition-colors"
    >
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-800/60 text-xs font-semibold text-blue-700 dark:text-cyan-400">
            <Gamepad2 className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
            <span>Interactive Web Arcade · Developed by Nihar</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Playable <span className="gradient-text">Game Arena</span>
          </h2>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Take a quick break and play 6 authentic, physics-engineered web games directly in your browser. Real-time canvas rendering, zero lag, official app artwork, and dynamic arcade soundtrack.
          </p>

          {/* Arcade Music Controller Pill */}
          <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm">
            <button
              onClick={toggleBgmTune}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isBgmOn
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Music className={`h-3.5 w-3.5 ${isBgmOn ? 'animate-bounce' : ''}`} />
              <span>{isBgmOn ? 'Arcade Music: ON 🎵' : 'Play Arcade Music 🎵'}</span>
            </button>

            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              {isBgmOn ? '120 BPM Chiptune Groove' : 'Click to enable BGM'}
            </span>
          </div>
        </div>

        {/* ACTIVE GAME VIEWPORT (When a game is selected) */}
        {activeGameId && ActiveGameComponent && (
          <div className="space-y-4 animate-fadeIn">
            {/* Quick Switch Tab Bar with real game icons */}
            <div className="flex items-center justify-between gap-4 p-2.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 backdrop-blur-xl overflow-x-auto shadow-md">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {GAMES_LIST.map(game => (
                  <button
                    key={game.id}
                    onClick={() => setActiveGameId(game.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      activeGameId === game.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="h-5 w-5 rounded-md overflow-hidden shrink-0">
                      <img src={game.iconImg} alt={game.title} className="h-full w-full object-cover" />
                    </div>
                    <span>{game.title.split(':')[0]}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={toggleBgmTune}
                  className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isBgmOn
                      ? 'bg-blue-600/20 text-blue-600 dark:text-cyan-400 border border-blue-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                  title="Toggle Background Music"
                >
                  <Music className="h-4 w-4" />
                </button>

                <button
                  onClick={handleCloseGame}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                  <span className="hidden sm:inline">Close Game</span>
                </button>
              </div>
            </div>

            {/* Active Game Canvas Component */}
            <ActiveGameComponent />
          </div>
        )}

        {/* 6 GAME CARDS GRID WITH OFFICIAL ICONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES_LIST.map((game, index) => {
            const isCurrentActive = activeGameId === game.id;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={`group rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between space-y-5 bg-white dark:bg-slate-900/70 backdrop-blur-xl ${
                  isCurrentActive
                    ? 'border-blue-600 dark:border-cyan-400 ring-2 ring-blue-500/20 shadow-xl'
                    : 'border-slate-200/90 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-white/25 hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  {/* Top: Official App Icon & Rating */}
                  <div className="flex items-center justify-between">
                    <div className="h-16 w-16 rounded-2xl bg-slate-900 border border-slate-700/80 overflow-hidden shadow-lg group-hover:scale-105 group-hover:border-blue-500/50 transition-all shrink-0">
                      <img 
                        src={game.iconImg} 
                        alt={game.title} 
                        className="h-full w-full object-cover" 
                      />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>{game.rating}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {game.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tag */}
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                      {game.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-0.5 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {game.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {game.desc}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {game.plays} plays
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSelectGame(game.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:shadow-glow-blue hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    style={{ color: '#ffffff' }}
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>{isCurrentActive ? 'Currently Playing' : 'Play Now'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}