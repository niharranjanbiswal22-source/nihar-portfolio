import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Trophy, Target, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function ArcheryGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [arrowsLeft, setArrowsLeft] = useState(5);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('archery_highscore') || '0', 10); } catch { return 0; }
  });
  const [isMuted, setIsMuted] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [lastHitScore, setLastHitScore] = useState(null);
  const [wind, setWind] = useState(0);

  const gameRef = useRef({
    bow: { x: 90, y: 220, r: 45 },
    arrow: { x: 90, y: 220, vx: 0, vy: 0, active: false, stuck: false, targetY: 0 },
    isPulling: false,
    pullPos: { x: 90, y: 220 },
    target: { x: 710, y: 220, r: 65, vy: 1.2, moving: true },
    stuckArrows: [],
    particles: []
  });

  const nextWind = () => {
    const w = (Math.random() * 2.8 - 1.4).toFixed(1);
    setWind(parseFloat(w));
  };

  const resetRound = () => {
    setArrowsLeft(5);
    setScore(0);
    setRoundOver(false);
    setLastHitScore(null);
    gameRef.current.stuckArrows = [];
    gameRef.current.arrow.active = false;
    gameRef.current.arrow.stuck = false;
    nextWind();
  };

  useEffect(() => {
    nextWind();
  }, []);

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const spawnParticles = (x, y, color) => {
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 3 + 1;
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

      // CLEAR
      ctx.clearRect(0, 0, W, H);

      // Background Gradient (Open Archery Range)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.7, '#1e293b');
      bgGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Grass strip
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, H - 25, W, 25);
      ctx.fillStyle = '#166534';
      ctx.fillRect(0, H - 20, W, 20);

      // 1. UPDATE TARGET (moves vertically)
      if (g.target.moving) {
        g.target.y += g.target.vy;
        if (g.target.y - g.target.r < 30 || g.target.y + g.target.r > H - 40) {
          g.target.vy = -g.target.vy;
        }
      }

      // DRAW TARGET (Standard Archery Rings)
      const tx = g.target.x;
      const ty = g.target.y;
      const tr = g.target.r;

      // Wooden Stand
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.moveTo(tx - 10, ty + tr);
      ctx.lineTo(tx - 25, H - 20);
      ctx.lineTo(tx - 15, H - 20);
      ctx.lineTo(tx, ty + tr);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(tx + 10, ty + tr);
      ctx.lineTo(tx + 25, H - 20);
      ctx.lineTo(tx + 15, H - 20);
      ctx.lineTo(tx, ty + tr);
      ctx.fill();

      // White ring (2 pts)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(tx, ty, tr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Black ring (4 pts)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(tx, ty, tr * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Blue ring (6 pts)
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(tx, ty, tr * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Red ring (8 pts)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(tx, ty, tr * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Yellow Center / Bullseye (10 pts)
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(tx, ty, tr * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ca8a04';
      ctx.beginPath();
      ctx.arc(tx, ty, 3, 0, Math.PI * 2);
      ctx.fill();

      // 2. DRAW STUCK ARROWS (relative to target)
      g.stuckArrows.forEach(st => {
        const ax = tx - st.relX;
        const ay = ty + st.relY;
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(st.angle);

        // Arrow Shaft
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-40, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // Arrow Feathers (Fletching)
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(-40, 0);
        ctx.lineTo(-32, -4);
        ctx.lineTo(-24, 0);
        ctx.lineTo(-32, 4);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      // 3. DRAW BOW & STRING (DHANUSH)
      const bx = g.bow.x;
      const by = g.bow.y;
      const br = g.bow.r;

      let pullX = g.isPulling ? g.pullPos.x : bx;
      let pullY = g.isPulling ? g.pullPos.y : by;

      // Golden Dhanush Arc
      ctx.save();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(bx + 10, by, br, -Math.PI * 0.45, Math.PI * 0.45, false);
      ctx.stroke();

      // Bow tips & string
      const tipTop = { x: bx + 10 + Math.cos(-Math.PI * 0.45) * br, y: by + Math.sin(-Math.PI * 0.45) * br };
      const tipBottom = { x: bx + 10 + Math.cos(Math.PI * 0.45) * br, y: by + Math.sin(Math.PI * 0.45) * br };

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tipTop.x, tipTop.y);
      ctx.lineTo(pullX, pullY);
      ctx.lineTo(tipBottom.x, tipBottom.y);
      ctx.stroke();
      ctx.restore();

      // 4. DRAW CURRENT LOADED ARROW (if aiming)
      if (g.isPulling) {
        const angle = Math.atan2(by - pullY, bx - pullX);
        ctx.save();
        ctx.translate(pullX, pullY);
        ctx.rotate(angle);

        // Shaft
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(55, 0);
        ctx.stroke();

        // Arrowhead
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.moveTo(55, 0);
        ctx.lineTo(46, -4);
        ctx.lineTo(46, 4);
        ctx.closePath();
        ctx.fill();

        // Feathers
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(8, -5);
        ctx.lineTo(16, 0);
        ctx.lineTo(8, 5);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // 5. ARROW IN FLIGHT
      if (g.arrow.active) {
        g.arrow.x += g.arrow.vx;
        g.arrow.y += g.arrow.vy;
        g.arrow.vy += 0.22; // Gravity
        g.arrow.vx += wind * 0.015; // Wind influence

        const angle = Math.atan2(g.arrow.vy, g.arrow.vx);

        ctx.save();
        ctx.translate(g.arrow.x, g.arrow.y);
        ctx.rotate(angle);

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-35, 0);
        ctx.lineTo(15, 0);
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(6, -4);
        ctx.lineTo(6, 4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(-35, 0);
        ctx.lineTo(-27, -5);
        ctx.lineTo(-19, 0);
        ctx.lineTo(-27, 5);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Check Target Hit
        const distToCenter = Math.hypot(g.arrow.x - tx, g.arrow.y - ty);

        if (g.arrow.x >= tx - 10 && distToCenter <= tr) {
          // Arrow Hit the Target!
          g.arrow.active = false;
          sound.playHit();

          let pts = 0;
          let hitLabel = '';
          if (distToCenter <= tr * 0.2) {
            pts = 10;
            hitLabel = '🎯 BULLSEYE! +10';
            sound.playBullseye();
            spawnParticles(g.arrow.x, g.arrow.y, '#eab308');
          } else if (distToCenter <= tr * 0.4) {
            pts = 8;
            hitLabel = 'GREAT SHOT! +8';
            sound.playWin();
            spawnParticles(g.arrow.x, g.arrow.y, '#ef4444');
          } else if (distToCenter <= tr * 0.6) {
            pts = 6;
            hitLabel = 'GOOD HIT! +6';
            spawnParticles(g.arrow.x, g.arrow.y, '#3b82f6');
          } else if (distToCenter <= tr * 0.8) {
            pts = 4;
            hitLabel = '+4 Points';
            spawnParticles(g.arrow.x, g.arrow.y, '#94a3b8');
          } else {
            pts = 2;
            hitLabel = '+2 Points';
            spawnParticles(g.arrow.x, g.arrow.y, '#f8fafc');
          }

          setLastHitScore(hitLabel);
          setScore(prev => {
            const next = prev + pts;
            if (next > highScore) {
              setHighScore(next);
              try { localStorage.setItem('archery_highscore', next.toString()); } catch {}
            }
            return next;
          });

          g.stuckArrows.push({
            relX: tx - g.arrow.x,
            relY: g.arrow.y - ty,
            angle
          });

          checkNextArrow();
        } else if (g.arrow.x > W + 40 || g.arrow.y > H + 40) {
          // Missed
          g.arrow.active = false;
          setLastHitScore('MISS! 0 Pts');
          checkNextArrow();
        }
      }

      // 6. PARTICLES
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
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(loop);
    };

    const checkNextArrow = () => {
      setArrowsLeft(prev => {
        if (prev <= 1) {
          setRoundOver(true);
          return 0;
        }
        nextWind();
        return prev - 1;
      });
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [arrowsLeft, highScore, wind]);

  // Pointer Handlers for Bow Pull
  const handlePointerDown = (e) => {
    if (arrowsLeft <= 0 || gameRef.current.arrow.active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    const b = gameRef.current.bow;
    if (Math.hypot(x - b.x, y - b.y) < 70) {
      gameRef.current.isPulling = true;
      sound.playStretch();
    }
  };

  const handlePointerMove = (e) => {
    if (!gameRef.current.isPulling) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    const b = gameRef.current.bow;
    const dx = x - b.x;
    const dy = y - b.y;
    const dist = Math.hypot(dx, dy);
    const maxPull = 70;

    if (dist > maxPull) {
      gameRef.current.pullPos = {
        x: b.x + (dx / dist) * maxPull,
        y: b.y + (dy / dist) * maxPull
      };
    } else {
      gameRef.current.pullPos = { x, y };
    }
  };

  const handlePointerUp = () => {
    if (!gameRef.current.isPulling) return;
    gameRef.current.isPulling = false;
    const b = gameRef.current.bow;
    const p = gameRef.current.pullPos;

    const pullX = b.x - p.x;
    const pullY = b.y - p.y;
    const pullDist = Math.hypot(pullX, pullY);

    if (pullDist > 15) {
      const arrow = gameRef.current.arrow;
      arrow.x = b.x;
      arrow.y = b.y;
      arrow.vx = pullX * 0.28;
      arrow.vy = pullY * 0.28;
      arrow.active = true;
      sound.playBowTwang();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col text-white">
      {/* Top Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/20 shadow-lg shrink-0">
            <img src="/games/archery.png" alt="Archery Master" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-tight flex items-center gap-2">
              <span>Archery Master (Dhanush Teer)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">
                Precision
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Pull back the golden bowstring, counter the wind, hit the Bullseye!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-amber-400 text-sm">{score}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <span className="text-xs text-gray-400 font-mono mr-1">Quiver:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-4 w-1 rounded transition-all ${
                  i < arrowsLeft ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-gray-700 opacity-40'
                }`}
              />
            ))}
          </div>

          {/* Wind Indicator */}
          <div className="hidden md:flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <span className="text-gray-400">Wind:</span>
            <span className={`font-bold ${wind > 0 ? 'text-cyan-400' : wind < 0 ? 'text-pink-400' : 'text-gray-300'}`}>
              {wind > 0 ? `+${wind}m/s ⬇` : wind < 0 ? `${wind}m/s ⬆` : '0 m/s'}
            </span>
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
            onClick={resetRound}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title="Restart Quiver"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-slate-950 select-none overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="w-full h-full cursor-crosshair block"
        />

        {/* Last Hit Popup */}
        {lastHitScore && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/50 text-amber-400 font-black text-sm tracking-wide shadow-xl animate-bounce">
            {lastHitScore}
          </div>
        )}

        {/* Round Over Modal */}
        {roundOver && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-3xl font-black">
              🎯
            </div>
            <div>
              <h4 className="text-2xl font-black text-white">QUIVER COMPLETED!</h4>
              <p className="text-sm text-amber-400 font-mono mt-1">Final Score: {score}/50 Pts</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Accuracy: {Math.round((score / 50) * 100)}%
              </p>
            </div>
            <button
              onClick={resetRound}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Shoot Another Round</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="px-5 py-2.5 bg-slate-950 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-gray-400 font-mono">
        <span>Controls: Click & Drag bow backward to aim, adjust for wind drift, then release arrow!</span>
        <span className="text-amber-400 font-bold">High Score: {highScore}</span>
      </div>
    </div>
  );
}