import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Trophy, Pause, Play, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

const GRID_SIZE = 22;
const INITIAL_SPEED = 110;

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('snake_highscore') || '0', 10); } catch { return 0; }
  });
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const gameState = useRef({
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 16, y: 10 },
    bonus: null,
    bonusTimer: 0,
    particles: []
  });

  const generateFood = () => {
    const s = gameState.current.snake;
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      if (!s.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  };

  const resetGame = () => {
    gameState.current.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    gameState.current.dir = { x: 1, y: 0 };
    gameState.current.nextDir = { x: 1, y: 0 };
    gameState.current.food = generateFood();
    gameState.current.bonus = null;
    gameState.current.particles = [];
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const spawnParticles = (x, y, color) => {
    const cellSize = 400 / GRID_SIZE;
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 3 + 1;
      gameState.current.particles.push({
        x: x * cellSize + cellSize / 2,
        y: y * cellSize + cellSize / 2,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color,
        life: 1,
        decay: 0.05
      });
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { dir } = gameState.current;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        if (dir.y === 0) gameState.current.nextDir = { x: 0, y: -1 };
        e.preventDefault();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        if (dir.y === 0) gameState.current.nextDir = { x: 0, y: 1 };
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if (dir.x === 0) gameState.current.nextDir = { x: -1, y: 0 };
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        if (dir.x === 0) gameState.current.nextDir = { x: 1, y: 0 };
        e.preventDefault();
      } else if (e.key === ' ') {
        setIsPaused(prev => !prev);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main game tick & render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let lastTick = Date.now();
    let animId;

    const gameLoop = () => {
      const now = Date.now();
      const currentSpeed = Math.max(65, INITIAL_SPEED - Math.floor(score / 50) * 5);

      if (!isPaused && !gameOver && now - lastTick > currentSpeed) {
        lastTick = now;
        const g = gameState.current;
        g.dir = g.nextDir;

        const head = { ...g.snake[0] };
        head.x += g.dir.x;
        head.y += g.dir.y;

        // Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          sound.playCrash();
          return;
        }

        // Self Collision
        if (g.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          sound.playCrash();
          return;
        }

        g.snake.unshift(head);

        // Eat Regular Food
        if (head.x === g.food.x && head.y === g.food.y) {
          sound.playEat();
          spawnParticles(head.x, head.y, '#10b981');
          setScore(prev => {
            const next = prev + 10;
            if (next > highScore) {
              setHighScore(next);
              try { localStorage.setItem('snake_highscore', next.toString()); } catch {}
            }
            return next;
          });
          g.food = generateFood();

          // Chance to spawn bonus orb
          if (!g.bonus && Math.random() < 0.25) {
            g.bonus = generateFood();
            g.bonusTimer = 40;
          }
        } else if (g.bonus && head.x === g.bonus.x && head.y === g.bonus.y) {
          // Eat Bonus
          sound.playBullseye();
          spawnParticles(head.x, head.y, '#f59e0b');
          setScore(prev => {
            const next = prev + 50;
            if (next > highScore) {
              setHighScore(next);
              try { localStorage.setItem('snake_highscore', next.toString()); } catch {}
            }
            return next;
          });
          g.bonus = null;
        } else {
          g.snake.pop();
        }

        // Bonus timer countdown
        if (g.bonus) {
          g.bonusTimer--;
          if (g.bonusTimer <= 0) g.bonus = null;
        }
      }

      // RENDER CANVAS
      const W = canvas.width;
      const H = canvas.height;
      const cellSize = W / GRID_SIZE;

      // Dark Matrix Background
      ctx.fillStyle = '#050a14';
      ctx.fillRect(0, 0, W, H);

      // Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, H);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(W, i * cellSize);
        ctx.stroke();
      }

      const g = gameState.current;

      // Draw Regular Food (Glowing Green Orb / Apple)
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(
        g.food.x * cellSize + cellSize / 2,
        g.food.y * cellSize + cellSize / 2,
        cellSize * 0.38,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Bonus Orb (Golden Star)
      if (g.bonus) {
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(
          g.bonus.x * cellSize + cellSize / 2,
          g.bonus.y * cellSize + cellSize / 2,
          cellSize * 0.44,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Snake
      g.snake.forEach((seg, idx) => {
        const isHead = idx === 0;
        ctx.save();
        ctx.translate(seg.x * cellSize + cellSize / 2, seg.y * cellSize + cellSize / 2);

        if (isHead) {
          ctx.fillStyle = '#06b6d4';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.roundRect(-cellSize * 0.45, -cellSize * 0.45, cellSize * 0.9, cellSize * 0.9, 4);
          ctx.fill();

          // Eyes
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#0f172a';
          const eyeOff = cellSize * 0.2;
          ctx.beginPath();
          ctx.arc(-eyeOff * g.dir.y + eyeOff * g.dir.x * 0.3, -eyeOff * g.dir.x + eyeOff * g.dir.y * 0.3, 2, 0, Math.PI * 2);
          ctx.arc(eyeOff * g.dir.y + eyeOff * g.dir.x * 0.3, eyeOff * g.dir.x + eyeOff * g.dir.y * 0.3, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Body gradient from cyan to violet
          const ratio = idx / g.snake.length;
          ctx.fillStyle = `hsl(${185 + ratio * 80}, 85%, ${55 - ratio * 15}%)`;
          ctx.beginPath();
          ctx.roundRect(-cellSize * 0.4, -cellSize * 0.4, cellSize * 0.8, cellSize * 0.8, 3);
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          g.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [score, isPaused, gameOver, highScore]);

  // Touch controls
  const handleTouchDir = (newDir) => {
    const { dir } = gameState.current;
    if (newDir.x !== 0 && dir.x === 0) gameState.current.nextDir = newDir;
    if (newDir.y !== 0 && dir.y === 0) gameState.current.nextDir = newDir;
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col text-white">
      {/* Top Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/20 shadow-lg shrink-0">
            <img src="/games/snake.png" alt="Snake 97" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-tight flex items-center gap-2">
              <span>Retro Neon Snake</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                Arcade
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Collect glowing orbs & grow without crashing into walls!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Trophy className="h-4 w-4 text-emerald-400" />
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-emerald-400 text-sm">{score}</span>
          </div>

          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="h-4 w-4 text-emerald-400" /> : <Pause className="h-4 w-4" />}
          </button>

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
            title="Restart Game"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative w-full aspect-square max-w-[480px] mx-auto bg-[#050a14] select-none my-3 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          className="w-full h-full block"
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-2xl font-black">
              💥
            </div>
            <div>
              <h4 className="text-2xl font-black text-white tracking-wide">GAME OVER!</h4>
              <p className="text-xs text-gray-400 font-mono mt-1">Final Score: <span className="text-emerald-400 font-bold">{score}</span></p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-center">
            <h4 className="text-xl font-bold text-white tracking-wider">PAUSED</h4>
            <p className="text-xs text-gray-400 mt-1">Press Spacebar or click Play to resume</p>
          </div>
        )}
      </div>

      {/* Mobile Touch D-Pad */}
      <div className="p-4 bg-slate-950 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[11px] text-gray-400 font-mono">
          Desktop: Arrow Keys or <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">W A S D</kbd> · Space to Pause
        </div>

        {/* Touch Controls for Mobile */}
        <div className="flex sm:hidden flex-col items-center gap-1.5">
          <button
            onClick={() => handleTouchDir({ x: 0, y: -1 })}
            className="w-12 h-10 rounded-xl bg-white/10 active:bg-emerald-500 flex items-center justify-center text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleTouchDir({ x: -1, y: 0 })}
              className="w-12 h-10 rounded-xl bg-white/10 active:bg-emerald-500 flex items-center justify-center text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleTouchDir({ x: 0, y: 1 })}
              className="w-12 h-10 rounded-xl bg-white/10 active:bg-emerald-500 flex items-center justify-center text-white"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleTouchDir({ x: 1, y: 0 })}
              className="w-12 h-10 rounded-xl bg-white/10 active:bg-emerald-500 flex items-center justify-center text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="font-mono text-xs text-emerald-400 font-bold">
          High Score: {highScore}
        </div>
      </div>
    </div>
  );
}