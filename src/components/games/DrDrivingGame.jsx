import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Trophy, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function DrDrivingGame() {
  const canvasRef = useRef(null);
  const [level, setLevel] = useState(1);
  const [gear, setGear] = useState('D'); // 'P', 'R', 'D'
  const [speedKmh, setSpeedKmh] = useState(0);
  const [health, setHealth] = useState(100);
  const [isGasPressed, setIsGasPressed] = useState(false);
  const [isBrakePressed, setIsBrakePressed] = useState(false);
  const [steerAngle, setSteerAngle] = useState(0); // -45 to +45
  const [missionComplete, setMissionComplete] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [score, setScore] = useState(0);

  const gameRef = useRef({
    car: {
      x: 120,
      y: 340,
      angle: -Math.PI / 2, // Facing UP
      speed: 0,
      w: 36,
      h: 68,
      steer: 0
    },
    parkingBay: { x: 520, y: 150, w: 80, h: 120, angle: 0 },
    obstacles: [],
    cones: []
  });

  const setupLevel = (lvl) => {
    setMissionComplete(false);
    setMissionFailed(false);
    setHealth(100);
    setGear('D');
    setSpeedKmh(0);

    const g = gameRef.current;
    if (lvl === 1) {
      // Level 1: Straight Bay
      g.car = { x: 140, y: 350, angle: -Math.PI / 2, speed: 0, w: 36, h: 68, steer: 0 };
      g.parkingBay = { x: 540, y: 120, w: 75, h: 110, angle: 0 };
      g.cones = [
        { x: 300, y: 220 },
        { x: 300, y: 280 },
        { x: 420, y: 120 },
        { x: 420, y: 230 }
      ];
    } else if (lvl === 2) {
      // Level 2: 90 Degree Angle Turn
      g.car = { x: 120, y: 360, angle: -Math.PI / 2, speed: 0, w: 36, h: 68, steer: 0 };
      g.parkingBay = { x: 620, y: 240, w: 110, h: 75, angle: Math.PI / 2 };
      g.cones = [
        { x: 260, y: 160 },
        { x: 340, y: 160 },
        { x: 420, y: 160 },
        { x: 420, y: 260 },
        { x: 420, y: 340 }
      ];
    } else {
      // Level 3: Parallel Parking
      g.car = { x: 140, y: 360, angle: -Math.PI / 2, speed: 0, w: 36, h: 68, steer: 0 };
      g.parkingBay = { x: 380, y: 90, w: 70, h: 115, angle: 0 };
      g.cones = [
        { x: 380, y: 20 },
        { x: 380, y: 230 },
        { x: 250, y: 200 },
        { x: 500, y: 200 }
      ];
    }
  };

  useEffect(() => {
    setupLevel(level);
  }, [level]);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        setIsGasPressed(true);
        e.preventDefault();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setIsBrakePressed(true);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setSteerAngle(prev => Math.max(-45, prev - 15));
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setSteerAngle(prev => Math.min(45, prev + 15));
        e.preventDefault();
      } else if (e.key === 'd' || e.key === 'D') {
        if (!e.ctrlKey) setGear('D');
      } else if (e.key === 'r' || e.key === 'R') {
        setGear('R');
      } else if (e.key === 'p' || e.key === 'P') {
        setGear('P');
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        setIsGasPressed(false);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setIsBrakePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main Canvas & Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const loop = () => {
      const g = gameRef.current;
      const car = g.car;
      const bay = g.parkingBay;

      if (!missionComplete && !missionFailed) {
        // 1. CAR PHYSICS
        const maxForward = 4.2;
        const maxReverse = 2.2;
        const accel = 0.12;
        const friction = 0.96;

        if (gear === 'D') {
          if (isGasPressed) {
            car.speed = Math.min(maxForward, car.speed + accel);
            if (Math.random() < 0.2) sound.playEngine(car.speed / maxForward);
          }
        } else if (gear === 'R') {
          if (isGasPressed) {
            car.speed = Math.max(-maxReverse, car.speed - accel);
            if (Math.random() < 0.2) sound.playEngine(Math.abs(car.speed) / maxReverse);
          }
        } else {
          // Park Mode
          car.speed = 0;
        }

        // Brake pedal
        if (isBrakePressed) {
          car.speed *= 0.82;
          if (Math.abs(car.speed) > 1 && Math.random() < 0.15) {
            sound.playBrake();
          }
          if (Math.abs(car.speed) < 0.05) car.speed = 0;
        } else {
          // Coasting friction
          car.speed *= friction;
          if (Math.abs(car.speed) < 0.03) car.speed = 0;
        }

        // Steer angle calculation
        const steerRad = (steerAngle * Math.PI) / 180;
        if (Math.abs(car.speed) > 0.05) {
          const turnMultiplier = car.speed > 0 ? 1 : -1;
          car.angle += (car.speed / 45) * Math.sin(steerRad) * turnMultiplier;
        }

        // Update Car Position
        car.x += Math.cos(car.angle) * car.speed;
        car.y += Math.sin(car.angle) * car.speed;

        setSpeedKmh(Math.round(Math.abs(car.speed) * 18));

        // 2. BOUNDARY COLLISION (Curbs)
        const pad = 25;
        if (car.x < pad || car.x > canvas.width - pad || car.y < pad || car.y > canvas.height - pad) {
          car.speed = -car.speed * 0.5;
          sound.playCrash();
          setHealth(prev => {
            const next = prev - 25;
            if (next <= 0) setMissionFailed(true);
            return Math.max(0, next);
          });
        }

        // 3. CONE COLLISION
        g.cones.forEach(cone => {
          const dist = Math.hypot(car.x - cone.x, car.y - cone.y);
          if (dist < 28) {
            car.speed = -car.speed * 0.4;
            sound.playHit();
            setHealth(prev => {
              const next = prev - 15;
              if (next <= 0) setMissionFailed(true);
              return Math.max(0, next);
            });
          }
        });

        // 4. PARKING EVALUATION
        // When user is inside the bay, stopped, and gear is shifted to 'P'
        const inBayX = Math.abs(car.x - bay.x) < bay.w * 0.4;
        const inBayY = Math.abs(car.y - bay.y) < bay.h * 0.4;

        if (inBayX && inBayY && Math.abs(car.speed) < 0.1 && gear === 'P') {
          setMissionComplete(true);
          sound.playBullseye();
          setScore(prev => prev + 1000 + health * 10);
        }
      }

      // RENDER
      const W = canvas.width;
      const H = canvas.height;

      // Dark City Asphalt
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, W, H);

      // Sidewalk Curbs
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, W, 20);
      ctx.fillRect(0, H - 20, W, 20);
      ctx.fillRect(0, 0, 20, H);
      ctx.fillRect(W - 20, 0, 20, H);

      // Curb Yellow Stripes
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, W - 40, H - 40);

      // Lane Guide Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([15, 15]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(250, 20);
      ctx.lineTo(250, H - 20);
      ctx.moveTo(500, 20);
      ctx.lineTo(500, H - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // DRAW PARKING BAY (Yellow Glowing Box)
      ctx.save();
      ctx.translate(bay.x, bay.y);
      ctx.rotate(bay.angle);

      ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
      ctx.fillRect(-bay.w / 2, -bay.h / 2, bay.w, bay.h);

      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 3;
      ctx.strokeRect(-bay.w / 2, -bay.h / 2, bay.w, bay.h);

      // Parking Sign Text
      ctx.fillStyle = '#eab308';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('[ P A R K ]', 0, 4);

      ctx.restore();

      // DRAW CONES (Orange / White Traffic Cones)
      g.cones.forEach(cone => {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(cone.x, cone.y, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cone.x, cone.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(cone.x, cone.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // DRAW CAR
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.rotate(car.angle + Math.PI / 2);

      // Car Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.roundRect(-car.w / 2 + 3, -car.h / 2 + 4, car.w, car.h, 6);
      ctx.fill();

      // Red Metallic Sedan Body
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.roundRect(-car.w / 2, -car.h / 2, car.w, car.h, 7);
      ctx.fill();
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Windshield & Sunroof
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-car.w * 0.35, -car.h * 0.28, car.w * 0.7, car.h * 0.22);
      ctx.fillRect(-car.w * 0.35, car.h * 0.12, car.w * 0.7, car.h * 0.18);

      // Headlights (Yellow/White beams)
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 12;
      ctx.fillRect(-car.w * 0.45, -car.h / 2, 7, 3);
      ctx.fillRect(car.w * 0.45 - 7, -car.h / 2, 7, 3);
      ctx.shadowBlur = 0;

      // Brake Lights (Bright red if braking or stopped)
      if (isBrakePressed || car.speed === 0) {
        ctx.fillStyle = '#ff2222';
        ctx.shadowColor = '#ff2222';
        ctx.shadowBlur = 14;
        ctx.fillRect(-car.w * 0.45, car.h / 2 - 3, 7, 3);
        ctx.fillRect(car.w * 0.45 - 7, car.h / 2 - 3, 7, 3);
        ctx.shadowBlur = 0;
      }

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gear, isGasPressed, isBrakePressed, steerAngle, missionComplete, missionFailed, health]);

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(prev => prev + 1);
    } else {
      setLevel(1);
    }
    setupLevel(level < 3 ? level + 1 : 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col text-white">
      {/* Top Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/20 shadow-lg shrink-0">
            <img src="/games/dr_driving.png" alt="Dr Driving" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-tight flex items-center gap-2">
              <span>Dr. Driving: Precision Parking</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">
                Level {level}/3
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Steer smoothly, navigate parking cones, and shift to [P] inside the yellow bay!
            </p>
          </div>
        </div>

        {/* Vehicle Health & Score */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-amber-400 text-sm">{score}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-mono">Condition:</span>
            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  health > 50 ? 'bg-emerald-500' : health > 25 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${health}%` }}
              />
            </div>
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
            onClick={() => setupLevel(level)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title="Restart Level"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950 select-none overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          width={760}
          height={430}
          className="w-full h-full block"
        />

        {/* Mission Complete Overlay */}
        {missionComplete && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-3xl font-black">
              ⭐
            </div>
            <div>
              <h4 className="text-2xl font-black text-white">PARKED PERFECTLY!</h4>
              <p className="text-xs text-emerald-400 font-mono mt-1">Vehicle Intact: {health}% · Mission Complete!</p>
            </div>
            <button
              onClick={handleNextLevel}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <span>{level < 3 ? 'Next Parking Challenge' : 'Replay Level 1'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Mission Failed Overlay */}
        {missionFailed && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-3xl font-black">
              💥
            </div>
            <div>
              <h4 className="text-2xl font-black text-red-400">VEHICLE DAMAGED!</h4>
              <p className="text-xs text-gray-300 font-mono mt-1">Too many cone collisions. Drive carefully!</p>
            </div>
            <button
              onClick={() => setupLevel(level)}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Parking</span>
            </button>
          </div>
        )}
      </div>

      {/* Dr. Driving Authentic Cockpit Dashboard */}
      <div className="p-4 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
        
        {/* Left: Interactive Rotating Steering Wheel */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="h-20 w-20 rounded-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center transition-transform duration-100 shadow-xl"
              style={{ transform: `rotate(${steerAngle * 2.8}deg)` }}
            >
              <div className="h-6 w-6 rounded-full bg-slate-800 border-2 border-amber-500 flex items-center justify-center text-[10px] font-bold text-amber-400">
                DR
              </div>
              {/* Steering Wheel Spokes */}
              <div className="absolute top-0 bottom-0 w-1.5 bg-slate-700" />
              <div className="absolute left-0 right-0 h-1.5 bg-slate-700" />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onMouseDown={() => setSteerAngle(prev => Math.max(-45, prev - 20))}
              onTouchStart={() => setSteerAngle(prev => Math.max(-45, prev - 20))}
              onMouseUp={() => setSteerAngle(0)}
              onTouchEnd={() => setSteerAngle(0)}
              className="px-3 py-2 rounded-xl bg-white/10 active:bg-amber-500 font-mono text-xs font-bold"
            >
              ◀ Left
            </button>
            <button
              onMouseDown={() => setSteerAngle(prev => Math.min(45, prev + 20))}
              onTouchStart={() => setSteerAngle(prev => Math.min(45, prev + 20))}
              onMouseUp={() => setSteerAngle(0)}
              onTouchEnd={() => setSteerAngle(0)}
              className="px-3 py-2 rounded-xl bg-white/10 active:bg-amber-500 font-mono text-xs font-bold"
            >
              Right ▶
            </button>
          </div>
        </div>

        {/* Center: Gear Shift Stick */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-white/10">
          {(['P', 'R', 'D']).map(g => (
            <button
              key={g}
              onClick={() => setGear(g)}
              className={`h-10 w-12 rounded-xl font-mono text-sm font-black transition-all ${
                gear === g
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Right: Accelerator & Brake Pedals */}
        <div className="flex items-center gap-3">
          {/* Brake Pedal */}
          <button
            onMouseDown={() => setIsBrakePressed(true)}
            onMouseUp={() => setIsBrakePressed(false)}
            onTouchStart={() => setIsBrakePressed(true)}
            onTouchEnd={() => setIsBrakePressed(false)}
            className={`h-14 w-16 rounded-xl border-2 font-mono text-xs font-extrabold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
              isBrakePressed
                ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-600/40 scale-95'
                : 'bg-slate-800 border-slate-600 text-gray-300'
            }`}
          >
            <span>BRAKE</span>
          </button>

          {/* Gas Accelerator Pedal */}
          <button
            onMouseDown={() => setIsGasPressed(true)}
            onMouseUp={() => setIsGasPressed(false)}
            onTouchStart={() => setIsGasPressed(true)}
            onTouchEnd={() => setIsGasPressed(false)}
            className={`h-16 w-14 rounded-xl border-2 font-mono text-xs font-extrabold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
              isGasPressed
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/40 scale-95'
                : 'bg-slate-800 border-slate-600 text-gray-300'
            }`}
          >
            <span>GAS</span>
          </button>
        </div>

      </div>

      {/* Footer Hint */}
      <div className="px-5 py-2 bg-slate-950 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-gray-400 font-mono">
        <span>Controls: Arrow Keys or W/A/S/D to Accelerate & Steer · Shift to [P] inside Yellow Box to Park</span>
        <span className="text-amber-400 font-bold">{speedKmh} km/h</span>
      </div>
    </div>
  );
}