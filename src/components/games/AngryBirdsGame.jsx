import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Trophy, Play, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function AngryBirdsGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('ab_highscore') || '0', 10); } catch { return 0; }
  });
  const [birdsLeft, setBirdsLeft] = useState(3);
  const [level, setLevel] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [gameState, setGameState] = useState('aiming'); // 'aiming', 'flying', 'level_clear', 'game_over'
  const [floatingTexts, setFloatingTexts] = useState([]);

  // Game internal state ref
  const gameRef = useRef({
    sling: { x: 130, y: 310 },
    bird: { x: 130, y: 310, r: 16, vx: 0, vy: 0, launched: false, settled: false },
    isDragging: false,
    dragPos: { x: 130, y: 310 },
    blocks: [],
    pigs: [],
    particles: [],
    clouds: [
      { x: 50, y: 50, speed: 0.2, s: 1 },
      { x: 300, y: 80, speed: 0.15, s: 0.8 },
      { x: 600, y: 40, speed: 0.25, s: 1.2 }
    ]
  });

  const setupLevel = (lvl) => {
    const blocks = [];
    const pigs = [];

    if (lvl === 1) {
      // Basic 2-pillar wooden structure
      blocks.push(
        { x: 540, y: 340, w: 20, h: 70, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 },
        { x: 620, y: 340, w: 20, h: 70, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 },
        { x: 530, y: 320, w: 120, h: 18, type: 'stone', hp: 80, rot: 0, vx: 0, vy: 0 },
        { x: 580, y: 260, w: 20, h: 60, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 }
      );
      pigs.push(
        { x: 580, y: 355, r: 18, hp: 30, alive: true }
      );
    } else if (lvl === 2) {
      // 3-Pillar Fort with 2 pigs
      blocks.push(
        { x: 500, y: 340, w: 18, h: 70, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 },
        { x: 570, y: 340, w: 18, h: 70, type: 'stone', hp: 70, rot: 0, vx: 0, vy: 0 },
        { x: 640, y: 340, w: 18, h: 70, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 },
        { x: 490, y: 320, w: 180, h: 16, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 },
        { x: 535, y: 260, w: 18, h: 60, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 },
        { x: 605, y: 260, w: 18, h: 60, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 },
        { x: 525, y: 240, w: 110, h: 16, type: 'stone', hp: 80, rot: 0, vx: 0, vy: 0 }
      );
      pigs.push(
        { x: 535, y: 355, r: 17, hp: 30, alive: true },
        { x: 570, y: 215, r: 16, hp: 30, alive: true }
      );
    } else {
      // Castle pyramid
      blocks.push(
        { x: 480, y: 340, w: 22, h: 70, type: 'stone', hp: 90, rot: 0, vx: 0, vy: 0 },
        { x: 550, y: 340, w: 22, h: 70, type: 'wood', hp: 45, rot: 0, vx: 0, vy: 0 },
        { x: 620, y: 340, w: 22, h: 70, type: 'stone', hp: 90, rot: 0, vx: 0, vy: 0 },
        { x: 470, y: 320, w: 180, h: 18, type: 'wood', hp: 50, rot: 0, vx: 0, vy: 0 },
        { x: 515, y: 260, w: 20, h: 60, type: 'ice', hp: 30, rot: 0, vx: 0, vy: 0 },
        { x: 585, y: 260, w: 20, h: 60, type: 'ice', hp: 30, rot: 0, vx: 0, vy: 0 },
        { x: 505, y: 240, w: 110, h: 16, type: 'stone', hp: 80, rot: 0, vx: 0, vy: 0 },
        { x: 550, y: 190, w: 20, h: 50, type: 'wood', hp: 40, rot: 0, vx: 0, vy: 0 }
      );
      pigs.push(
        { x: 515, y: 355, r: 16, hp: 30, alive: true },
        { x: 585, y: 355, r: 16, hp: 30, alive: true },
        { x: 550, y: 165, r: 18, hp: 35, alive: true }
      );
    }

    gameRef.current.blocks = blocks;
    gameRef.current.pigs = pigs;
    gameRef.current.particles = [];
    resetBird();
  };

  const resetBird = () => {
    const s = gameRef.current.sling;
    gameRef.current.bird = {
      x: s.x,
      y: s.y,
      r: 16,
      vx: 0,
      vy: 0,
      launched: false,
      settled: false
    };
    gameRef.current.dragPos = { x: s.x, y: s.y };
    gameRef.current.isDragging = false;
    setGameState('aiming');
  };

  useEffect(() => {
    setupLevel(level);
  }, [level]);

  // Main Canvas Rendering & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const spawnParticles = (x, y, color, count = 12, speed = 4) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * speed + 1;
        gameRef.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          color,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          size: Math.random() * 4 + 2
        });
      }
    };

    const addScore = (pts, x, y) => {
      setScore(prev => {
        const next = prev + pts;
        if (next > highScore) {
          setHighScore(next);
          try { localStorage.setItem('ab_highscore', next.toString()); } catch {}
        }
        return next;
      });
      setFloatingTexts(prev => [...prev, { id: Date.now() + Math.random(), text: `+${pts}`, x, y, alpha: 1 }]);
    };

    const loop = () => {
      const g = gameRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const groundY = 375;

      // 1. CLEAR & BACKGROUND
      ctx.clearRect(0, 0, W, H);

      // Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.7, '#bae6fd');
      skyGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, groundY);

      // Distant Hills
      ctx.fillStyle = '#86efac';
      ctx.beginPath();
      ctx.arc(200, 480, 240, 0, Math.PI * 2);
      ctx.arc(600, 520, 300, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(400, 460, 180, 0, Math.PI * 2);
      ctx.arc(750, 450, 200, 0, Math.PI * 2);
      ctx.fill();

      // Animated Clouds
      g.clouds.forEach(c => {
        c.x += c.speed;
        if (c.x > W + 80) c.x = -80;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(c.x, c.y, 22 * c.s, 0, Math.PI * 2);
        ctx.arc(c.x + 20 * c.s, c.y - 8 * c.s, 26 * c.s, 0, Math.PI * 2);
        ctx.arc(c.x + 45 * c.s, c.y, 20 * c.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ground (Dirt + Grass)
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, groundY, W, 18);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, groundY + 18, W, H - groundY - 18);

      // 2. SLINGSHOT BACK FORK
      const sx = g.sling.x;
      const sy = g.sling.y;
      ctx.fillStyle = '#854d0e';
      ctx.beginPath();
      ctx.moveTo(sx - 12, groundY);
      ctx.lineTo(sx - 8, sy + 30);
      ctx.lineTo(sx - 20, sy - 15);
      ctx.lineTo(sx - 10, sy - 15);
      ctx.lineTo(sx - 2, sy + 15);
      ctx.lineTo(sx + 6, sy - 15);
      ctx.lineTo(sx + 16, sy - 15);
      ctx.lineTo(sx + 4, sy + 30);
      ctx.lineTo(sx + 8, groundY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#5b2f0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Slingshot rubber band (back part)
      if (g.isDragging || !g.bird.launched) {
        ctx.strokeStyle = '#3e1c07';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(sx - 12, sy - 10);
        ctx.lineTo(g.dragPos.x, g.dragPos.y);
        ctx.stroke();
      }

      // 3. TRAJECTORY PREVIEW (when dragging)
      if (g.isDragging) {
        const pullX = sx - g.dragPos.x;
        const pullY = sy - g.dragPos.y;
        let simX = g.dragPos.x;
        let simY = g.dragPos.y;
        let simVx = pullX * 0.19;
        let simVy = pullY * 0.19;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < 22; i++) {
          simX += simVx;
          simY += simVy;
          simVy += 0.42; // gravity
          if (simY >= groundY - 5) break;
          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.arc(simX, simY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 4. DRAW BIRD
      const bx = g.bird.launched ? g.bird.x : g.dragPos.x;
      const by = g.bird.launched ? g.bird.y : g.dragPos.y;
      const br = g.bird.r;

      ctx.save();
      ctx.translate(bx, by);
      if (g.bird.launched) {
        const angle = Math.atan2(g.bird.vy, g.bird.vx);
        ctx.rotate(angle);
      }
      // Red Body
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(0, 0, br, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Belly
      ctx.fillStyle = '#fecaca';
      ctx.beginPath();
      ctx.arc(2, 6, br * 0.55, 0, Math.PI);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(4, -4, 4.5, 0, Math.PI * 2);
      ctx.arc(10, -4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(5.5, -4, 2, 0, Math.PI * 2);
      ctx.arc(11, -4, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Angry Eyebrows
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(1, -9);
      ctx.lineTo(8, -6);
      ctx.lineTo(8, -8);
      ctx.lineTo(1, -11);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(8, -6);
      ctx.lineTo(15, -9);
      ctx.lineTo(15, -11);
      ctx.lineTo(8, -8);
      ctx.fill();

      // Yellow Beak
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.moveTo(6, -2);
      ctx.lineTo(15, 0);
      ctx.lineTo(6, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Slingshot rubber band (front part)
      if (g.isDragging || !g.bird.launched) {
        ctx.strokeStyle = '#3e1c07';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(sx + 10, sy - 10);
        ctx.lineTo(g.dragPos.x, g.dragPos.y);
        ctx.stroke();
      }

      // 5. BIRD PHYSICS (WHEN LAUNCHED)
      if (g.bird.launched && !g.bird.settled) {
        g.bird.x += g.bird.vx;
        g.bird.y += g.bird.vy;
        g.bird.vy += 0.42; // Gravity
        g.bird.vx *= 0.995; // Drag

        // Ground bounce
        if (g.bird.y + br >= groundY) {
          g.bird.y = groundY - br;
          g.bird.vy = -g.bird.vy * 0.45;
          g.bird.vx *= 0.75;
          if (Math.abs(g.bird.vy) < 1 && Math.abs(g.bird.vx) < 0.5) {
            g.bird.settled = true;
          }
        }

        // Out of bounds right or bottom
        if (g.bird.x > W + 40 || g.bird.y > H + 40) {
          g.bird.settled = true;
        }

        // Collision with Blocks
        g.blocks.forEach(b => {
          if (b.hp <= 0) return;
          if (
            g.bird.x + br > b.x - b.w / 2 &&
            g.bird.x - br < b.x + b.w / 2 &&
            g.bird.y + br > b.y - b.h / 2 &&
            g.bird.y - br < b.y + b.h / 2
          ) {
            const impact = Math.hypot(g.bird.vx, g.bird.vy);
            b.hp -= impact * 7;
            b.vx += g.bird.vx * 0.4;
            b.vy += g.bird.vy * 0.3;
            g.bird.vx *= 0.6;
            g.bird.vy *= 0.6;
            sound.playHit();
            spawnParticles(b.x, b.y, b.type === 'wood' ? '#b45309' : b.type === 'ice' ? '#93c5fd' : '#94a3b8', 8);

            if (b.hp <= 0) {
              addScore(b.type === 'wood' ? 500 : b.type === 'ice' ? 400 : 800, b.x, b.y - 15);
            }
          }
        });

        // Collision with Pigs
        g.pigs.forEach(p => {
          if (!p.alive) return;
          const dist = Math.hypot(g.bird.x - p.x, g.bird.y - p.y);
          if (dist < br + p.r) {
            p.alive = false;
            sound.playHit();
            sound.playWin();
            spawnParticles(p.x, p.y, '#22c55e', 20, 6);
            addScore(5000, p.x, p.y - 20);
          }
        });
      }

      // 6. BLOCKS PHYSICS & DRAW
      g.blocks.forEach(b => {
        if (b.hp <= 0) return;

        // Gravity on blocks if moved
        if (b.vx !== 0 || b.vy !== 0) {
          b.x += b.vx;
          b.y += b.vy;
          b.vy += 0.35;
          b.vx *= 0.94;
          b.rot += b.vx * 0.04;

          if (b.y + b.h / 2 >= groundY) {
            b.y = groundY - b.h / 2;
            b.vy = 0;
            b.vx *= 0.6;
          }

          // Check if moving block crushes a pig
          g.pigs.forEach(p => {
            if (!p.alive) return;
            const dist = Math.hypot(b.x - p.x, b.y - p.y);
            if (dist < b.w / 2 + p.r && Math.hypot(b.vx, b.vy) > 1.2) {
              p.alive = false;
              sound.playHit();
              sound.playWin();
              spawnParticles(p.x, p.y, '#22c55e', 18);
              addScore(5000, p.x, p.y);
            }
          });
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot || 0);

        if (b.type === 'wood') {
          ctx.fillStyle = '#d97706';
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
          ctx.strokeStyle = '#78350f';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);
          // Wood grain line
          ctx.beginPath();
          ctx.moveTo(-b.w / 4, -b.h / 2 + 3);
          ctx.lineTo(-b.w / 4, b.h / 2 - 3);
          ctx.stroke();
        } else if (b.type === 'stone') {
          ctx.fillStyle = '#64748b';
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);
        } else {
          // Ice
          ctx.fillStyle = 'rgba(186, 230, 253, 0.75)';
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);
        }

        ctx.restore();
      });

      // 7. PIGS DRAW
      g.pigs.forEach(p => {
        if (!p.alive) return;
        ctx.save();
        ctx.translate(p.x, p.y);

        // Green Pig Body
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Ears
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.arc(-p.r * 0.6, -p.r * 0.8, 4.5, 0, Math.PI * 2);
        ctx.arc(p.r * 0.6, -p.r * 0.8, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-p.r * 0.35, -2, 4, 0, Math.PI * 2);
        ctx.arc(p.r * 0.35, -2, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-p.r * 0.35, -2, 1.8, 0, Math.PI * 2);
        ctx.arc(p.r * 0.35, -2, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#86efac';
        ctx.beginPath();
        ctx.ellipse(0, 4, 7, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#15803d';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Nostrils
        ctx.fillStyle = '#14532d';
        ctx.beginPath();
        ctx.arc(-2.5, 4, 1.3, 0, Math.PI * 2);
        ctx.arc(2.5, 4, 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 8. PARTICLES
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.2; // Gravity
        pt.life -= pt.decay;
        if (pt.life <= 0) {
          g.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.life);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 9. CHECK WIN/LOSE
      const allPigsDead = g.pigs.every(p => !p.alive);
      if (allPigsDead && gameState !== 'level_clear') {
        setGameState('level_clear');
        sound.playBullseye();
      } else if (g.bird.settled && !allPigsDead && gameState !== 'game_over') {
        if (birdsLeft > 1) {
          setBirdsLeft(prev => prev - 1);
          resetBird();
        } else {
          setBirdsLeft(0);
          setGameState('game_over');
          sound.playCrash();
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [birdsLeft, gameState, highScore]);

  // Mouse & Touch Controls for Slingshot Pull
  const handlePointerDown = (e) => {
    if (gameState !== 'aiming') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    const s = gameRef.current.sling;
    const dist = Math.hypot(x - s.x, y - s.y);
    if (dist < 60) {
      gameRef.current.isDragging = true;
      sound.playStretch();
    }
  };

  const handlePointerMove = (e) => {
    if (!gameRef.current.isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    const s = gameRef.current.sling;
    // Limit pull distance
    const dx = x - s.x;
    const dy = y - s.y;
    const dist = Math.hypot(dx, dy);
    const maxPull = 80;

    if (dist > maxPull) {
      gameRef.current.dragPos = {
        x: s.x + (dx / dist) * maxPull,
        y: s.y + (dy / dist) * maxPull
      };
    } else {
      gameRef.current.dragPos = { x, y };
    }
  };

  const handlePointerUp = () => {
    if (!gameRef.current.isDragging) return;
    gameRef.current.isDragging = false;
    const s = gameRef.current.sling;
    const p = gameRef.current.dragPos;

    const pullX = s.x - p.x;
    const pullY = s.y - p.y;
    const pullDist = Math.hypot(pullX, pullY);

    if (pullDist > 15) {
      const bird = gameRef.current.bird;
      bird.x = p.x;
      bird.y = p.y;
      bird.vx = pullX * 0.19;
      bird.vy = pullY * 0.19;
      bird.launched = true;
      bird.settled = false;
      setGameState('flying');
      sound.playLaunch();
    } else {
      gameRef.current.dragPos = { x: s.x, y: s.y };
    }
  };

  const nextLevel = () => {
    if (level < 3) {
      setLevel(prev => prev + 1);
    } else {
      setLevel(1);
    }
    setBirdsLeft(3);
    setGameState('aiming');
  };

  const restartCurrent = () => {
    setBirdsLeft(3);
    setupLevel(level);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col text-white">
      {/* Top Game Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/20 shadow-lg shrink-0">
            <img src="/games/angry_birds.png" alt="Angry Birds" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-tight flex items-center gap-2">
              <span>Angry Birds: Slingshot Siege</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-mono">
                Level {level}/3
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Pull back the red bird & smash the green piggies!
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-amber-400 text-sm">{score}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <span className="text-xs text-gray-400 font-mono mr-1">Birds:</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full transition-all ${
                  i < birdsLeft ? 'bg-red-500 scale-100 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-gray-700 scale-75 opacity-40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              const muted = sound.toggleMute();
              setIsMuted(muted);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title="Toggle Sound FX"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            onClick={restartCurrent}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title="Restart Level"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-sky-200 select-none overflow-hidden touch-none">
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
          className="w-full h-full cursor-grab active:cursor-grabbing block"
        />

        {/* Floating Scores */}
        {floatingTexts.map(item => (
          <div
            key={item.id}
            className="absolute pointer-events-none font-black text-amber-400 text-sm drop-shadow-md animate-bounce"
            style={{ left: `${(item.x / 800) * 100}%`, top: `${(item.y / 450) * 100}%` }}
          >
            {item.text}
          </div>
        ))}

        {/* Level Clear Overlay */}
        {gameState === 'level_clear' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-3xl animate-bounce">
              ⭐
            </div>
            <div>
              <h4 className="text-2xl font-black text-white">LEVEL CLEARED!</h4>
              <p className="text-xs text-amber-300 font-mono mt-1">All Piggies Eliminated · Score: {score}</p>
            </div>
            <button
              onClick={nextLevel}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/30 cursor-pointer"
            >
              <span>{level < 3 ? 'Next Level' : 'Replay Castle'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'game_over' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="text-4xl animate-pulse">🐷</div>
            <div>
              <h4 className="text-xl font-black text-red-400">OUT OF BIRDS!</h4>
              <p className="text-xs text-gray-300 font-mono mt-1">The pigs survived. Try another angle!</p>
            </div>
            <button
              onClick={restartCurrent}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Level</span>
            </button>
          </div>
        )}
      </div>

      {/* Controls Hint */}
      <div className="px-5 py-2.5 bg-slate-950 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-gray-400 font-mono">
        <span>Controls: Click / Tap & Drag Red Bird backwards to set power & angle, then release!</span>
        <span className="text-amber-400 font-bold">High Score: {highScore}</span>
      </div>
    </div>
  );
}