import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Trophy, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function CarRacingGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('racing_highscore') || '0', 10); } catch { return 0; }
  });
  const [speedKmh, setSpeedKmh] = useState(100);
  const [nitro, setNitro] = useState(100);
  const [isNitroActive, setIsNitroActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameRef = useRef({
    player: { x: 200, y: 380, w: 38, h: 68, vx: 0 },
    keys: { left: false, right: false, nitro: false },
    roadOffset: 0,
    traffic: [],
    coins: [],
    particles: [],
    spawnTimer: 0
  });

  const resetGame = () => {
    gameRef.current.player = { x: 200, y: 380, w: 38, h: 68, vx: 0 };
    gameRef.current.traffic = [];
    gameRef.current.coins = [];
    gameRef.current.particles = [];
    gameRef.current.spawnTimer = 0;
    setScore(0);
    setNitro(100);
    setIsNitroActive(false);
    setGameOver(false);
    setSpeedKmh(100);
  };

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = true;
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = true;
        e.preventDefault();
      } else if (e.key === ' ' || e.key === 'Shift') {
        gameRef.current.keys.nitro = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = false;
      } else if (e.key === ' ' || e.key === 'Shift') {
        gameRef.current.keys.nitro = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const lanes = [115, 195, 275]; // 3 lane centers

    const spawnTraffic = () => {
      const lane = lanes[Math.floor(Math.random() * lanes.length)];
      const types = [
        { color: '#eab308', speed: 3.5, w: 36, h: 64 }, // Yellow Taxi
        { color: '#3b82f6', speed: 4.2, w: 36, h: 66 }, // Blue Sedan
        { color: '#ef4444', speed: 5.0, w: 38, h: 68 }, // Red Sports Car
        { color: '#64748b', speed: 2.8, w: 42, h: 85 }  // Gray Truck
      ];
      const model = types[Math.floor(Math.random() * types.length)];
      gameRef.current.traffic.push({
        x: lane,
        y: -90,
        ...model
      });

      // Chance to spawn gold coin
      if (Math.random() < 0.4) {
        const coinLane = lanes[Math.floor(Math.random() * lanes.length)];
        gameRef.current.coins.push({
          x: coinLane,
          y: -140,
          r: 9
        });
      }
    };

    const spawnParticles = (x, y, color, count = 15) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 5 + 1;
        gameRef.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          color,
          life: 1,
          decay: 0.04
        });
      }
    };

    const loop = () => {
      const g = gameRef.current;
      const W = canvas.width;
      const H = canvas.height;

      if (!gameOver) {
        // Handle Nitro
        const usingNitro = g.keys.nitro && nitro > 5;
        setIsNitroActive(usingNitro);
        if (usingNitro) {
          setNitro(prev => Math.max(0, prev - 0.4));
        } else {
          setNitro(prev => Math.min(100, prev + 0.1));
        }

        const baseSpeed = usingNitro ? 11 : 6.5;
        const currentSpeedKmh = Math.round((baseSpeed / 6.5) * (110 + Math.floor(score / 80) * 10));
        setSpeedKmh(currentSpeedKmh);

        // Sound Engine
        if (Math.random() < 0.15) {
          sound.playEngine(currentSpeedKmh / 260);
        }

        // Steer Player
        const steerSpeed = 6;
        if (g.keys.left) g.player.x -= steerSpeed;
        if (g.keys.right) g.player.x += steerSpeed;

        // Boundaries (Road limits)
        const roadLeft = 70;
        const roadRight = 330;
        if (g.player.x < roadLeft) g.player.x = roadLeft;
        if (g.player.x > roadRight) g.player.x = roadRight;

        // Road Scroll
        g.roadOffset = (g.roadOffset + baseSpeed) % 40;

        // Spawn Traffic
        g.spawnTimer++;
        if (g.spawnTimer > Math.max(35, 75 - Math.floor(score / 200) * 5)) {
          g.spawnTimer = 0;
          spawnTraffic();
        }

        // Update Traffic
        for (let i = g.traffic.length - 1; i >= 0; i--) {
          const car = g.traffic[i];
          car.y += baseSpeed - car.speed;

          // Out of screen
          if (car.y > H + 100) {
            g.traffic.splice(i, 1);
            setScore(prev => {
              const next = prev + 15;
              if (next > highScore) {
                setHighScore(next);
                try { localStorage.setItem('racing_highscore', next.toString()); } catch {}
              }
              return next;
            });
            continue;
          }

          // Collision Detection
          const p = g.player;
          if (
            Math.abs(p.x - car.x) < (p.w + car.w) * 0.42 &&
            Math.abs(p.y - car.y) < (p.h + car.h) * 0.44
          ) {
            setGameOver(true);
            sound.playCrash();
            spawnParticles(p.x, p.y, '#ef4444', 30);
            spawnParticles(p.x, p.y, '#f59e0b', 20);
            return;
          }
        }

        // Update Coins
        for (let i = g.coins.length - 1; i >= 0; i--) {
          const coin = g.coins[i];
          coin.y += baseSpeed;

          // Check pickup
          const dist = Math.hypot(g.player.x - coin.x, g.player.y - coin.y);
          if (dist < 32) {
            sound.playEat();
            spawnParticles(coin.x, coin.y, '#eab308', 8);
            setScore(prev => {
              const next = prev + 100;
              if (next > highScore) {
                setHighScore(next);
                try { localStorage.setItem('racing_highscore', next.toString()); } catch {}
              }
              return next;
            });
            g.coins.splice(i, 1);
            continue;
          }

          if (coin.y > H + 50) {
            g.coins.splice(i, 1);
          }
        }
      }

      // RENDER
      // 1. Grass Curbs
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 0, W, H);

      // Guard Rails (Red/White stripes)
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(45, 0, 10, H);
      ctx.fillRect(W - 55, 0, 10, H);

      // Asphalt Road
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(55, 0, W - 110, H);

      // Shoulder White Lines
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(65, 0);
      ctx.lineTo(65, H);
      ctx.moveTo(W - 65, 0);
      ctx.lineTo(W - 65, H);
      ctx.stroke();

      // Moving Dashed Lane Markers
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([22, 18]);
      ctx.lineDashOffset = -g.roadOffset;

      ctx.beginPath();
      ctx.moveTo(155, 0);
      ctx.lineTo(155, H);
      ctx.moveTo(235, 0);
      ctx.lineTo(235, H);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // 2. DRAW COINS
      g.coins.forEach(c => {
        ctx.fillStyle = '#eab308';
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 3. DRAW TRAFFIC CARS
      g.traffic.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);

        // Car Body
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.roundRect(-c.w / 2, -c.h / 2, c.w, c.h, 6);
        ctx.fill();

        // Windshield
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-c.w * 0.35, -c.h * 0.25, c.w * 0.7, c.h * 0.2);

        // Rear window
        ctx.fillRect(-c.w * 0.35, c.h * 0.15, c.w * 0.7, c.h * 0.15);

        // Red taillights
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(-c.w * 0.45, c.h * 0.4, 6, 3);
        ctx.fillRect(c.w * 0.45 - 6, c.h * 0.4, 6, 3);

        ctx.restore();
      });

      // 4. DRAW PLAYER CAR
      const p = g.player;
      ctx.save();
      ctx.translate(p.x, p.y);

      // Nitro Flames if active
      if (isNitroActive) {
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(-10, p.h / 2);
        ctx.lineTo(0, p.h / 2 + 25 + Math.random() * 8);
        ctx.lineTo(10, p.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Sports Car Chassis (Cyan & Carbon)
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = isNitroActive ? 16 : 8;
      ctx.beginPath();
      ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 7);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Dark Cockpit & Glass
      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.roundRect(-p.w * 0.35, -p.h * 0.25, p.w * 0.7, p.h * 0.45, 4);
      ctx.fill();

      // Front Headlights
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.fillRect(-p.w * 0.45, -p.h / 2, 6, 4);
      ctx.fillRect(p.w * 0.45 - 6, -p.h / 2, 6, 4);
      ctx.shadowBlur = 0;

      // Rear Spoiler
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-p.w * 0.45, p.h / 2 - 4, p.w * 0.9, 4);

      ctx.restore();

      // 5. DRAW PARTICLES
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          g.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameOver, nitro, isNitroActive, score, highScore]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col text-white">
      {/* Top Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/20 shadow-lg shrink-0">
            <img src="/games/car_racing.png" alt="Traffic Racer" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-tight flex items-center gap-2">
              <span>Highway Turbo Racer</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                Speed GT
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Weave through high-speed traffic, grab gold coins & unleash Nitro!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Trophy className="h-4 w-4 text-cyan-400" />
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-cyan-400 text-sm">{score}</span>
          </div>

          {/* Speedometer */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <span className="text-gray-400">Speed:</span>
            <span className="font-bold text-amber-400">{speedKmh} km/h</span>
          </div>

          <button
            onClick={() => {
              const muted = sound.toggleMute();
              setIsMuted(muted);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            onClick={resetGame}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title="Restart Race"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto bg-slate-950 select-none my-3 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
        <canvas
          ref={canvasRef}
          width={400}
          height={500}
          className="w-full h-full block"
        />

        {/* Nitro Gauge Bar on HUD */}
        <div className="absolute top-4 left-4 right-4 flex items-center gap-2 bg-slate-950/70 p-2 rounded-xl backdrop-blur-md border border-white/10">
          <Zap className="h-4 w-4 text-cyan-400 shrink-0" />
          <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ${
                isNitroActive ? 'bg-cyan-400 animate-pulse' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}
              style={{ width: `${nitro}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-cyan-300 font-bold">{Math.round(nitro)}%</span>
        </div>

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-3xl font-black">
              💥
            </div>
            <div>
              <h4 className="text-2xl font-black text-white tracking-wide">VEHICLE TOTALED!</h4>
              <p className="text-xs text-gray-300 font-mono mt-1">Final Score: <span className="text-cyan-400 font-bold">{score} Pts</span></p>
              <p className="text-xs text-amber-400 font-mono">Top Speed: {speedKmh} km/h</p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Drive Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Controls & Mobile Buttons */}
      <div className="p-4 bg-slate-950 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[11px] text-gray-400 font-mono">
          Desktop: Arrow Keys or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">A / D</kbd> to Steer · <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Spacebar</kbd> for Nitro Boost
        </div>

        {/* Mobile Steer Controls */}
        <div className="flex sm:hidden items-center gap-4">
          <button
            onTouchStart={() => { gameRef.current.keys.left = true; }}
            onTouchEnd={() => { gameRef.current.keys.left = false; }}
            className="w-14 h-12 rounded-xl bg-white/10 active:bg-cyan-500 flex items-center justify-center text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
            onTouchStart={() => { gameRef.current.keys.nitro = true; }}
            onTouchEnd={() => { gameRef.current.keys.nitro = false; }}
            className="px-4 h-12 rounded-xl bg-cyan-600 active:bg-cyan-400 font-black text-xs uppercase flex items-center gap-1.5 text-white"
          >
            <Zap className="h-4 w-4" />
            <span>NITRO</span>
          </button>
          <button
            onTouchStart={() => { gameRef.current.keys.right = true; }}
            onTouchEnd={() => { gameRef.current.keys.right = false; }}
            className="w-14 h-12 rounded-xl bg-white/10 active:bg-cyan-500 flex items-center justify-center text-white"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        <div className="font-mono text-xs text-cyan-400 font-bold">
          High Score: {highScore}
        </div>
      </div>
    </div>
  );
}