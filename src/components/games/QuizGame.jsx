import { useState, useEffect } from 'react';
import { RotateCcw, Volume2, VolumeX, Trophy, Timer, Flame, CheckCircle2, XCircle, ArrowRight, Brain } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

const ALL_QUESTIONS = [
  {
    q: "In React 18+, which hook is used to defer updating a part of the UI to keep it responsive?",
    options: ["useDeferredValue", "useTransition", "useCallback", "useLayoutEffect"],
    answer: 0,
    explanation: "useDeferredValue accepts a value and returns a new copy of the value that will defer updating to higher-priority UI tasks."
  },
  {
    q: "What is the time complexity of searching an element in a balanced Binary Search Tree (AVL / Red-Black)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    explanation: "Because a balanced BST splits search candidates in half at every level, its height is O(log n)."
  },
  {
    q: "Which HTTP status code signifies 'Idempotent' updates to an existing resource in RESTful API design?",
    options: ["201 Created", "304 Not Modified", "200 OK (PUT)", "429 Too Many Requests"],
    answer: 2,
    explanation: "PUT is designed to be idempotent: invoking it multiple times with the exact same payload produces the exact same state."
  },
  {
    q: "In JavaScript, what does `[...'hello']` evaluate to?",
    options: ["['hello']", "['h', 'e', 'l', 'l', 'o']", "Error: Strings not iterable", "['h-e-l-l-o']"],
    answer: 1,
    explanation: "Strings are iterable in JavaScript; the spread operator spreads each UTF-16 code point into an array."
  },
  {
    q: "Which database indexing strategy is most optimal for querying range values (e.g. BETWEEN 10 AND 50)?",
    options: ["Hash Index", "B-Tree Index", "Bitmap Index", "Full-Text Index"],
    answer: 1,
    explanation: "B-Trees keep entries sorted in leaf nodes connected by pointers, making range scans sequential and fast."
  },
  {
    q: "In Node.js, which thread pool library handles asynchronous file I/O operations behind the event loop?",
    options: ["libuv", "V8 Engine", "Reactor Core", "ChakraCore"],
    answer: 0,
    explanation: "libuv provides Node.js with its cross-platform asynchronous I/O and thread pool handling disk operations."
  },
  {
    q: "What does the ACID 'I' stand for in relational transaction guarantees?",
    options: ["Integrity", "Isolation", "Immutability", "Indexing"],
    answer: 1,
    explanation: "Isolation ensures concurrent transactions execute without interfering with one another's intermediate state."
  },
  {
    q: "Which CSS property enables GPU hardware acceleration for smooth 60fps animations?",
    options: ["transform: translateZ(0) / will-change", "float: left", "box-sizing: border-box", "display: inline-block"],
    answer: 0,
    explanation: "will-change or 3D transform triggers composited GPU layer rendering, avoiding CPU repaint bottlenecks."
  }
];

export default function QuizGame() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('quiz_highscore') || '0', 10); } catch { return 0; }
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isMuted, setIsMuted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const startNewQuiz = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 6);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(15);
    setQuizFinished(false);
  };

  useEffect(() => {
    startNewQuiz();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isAnswered || quizFinished || questions.length === 0) return;

    if (timeLeft <= 0) {
      handleAnswer(-1); // Timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, quizFinished, questions]);

  const handleAnswer = (optionIdx) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(optionIdx);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.answer;

    if (isCorrect) {
      sound.playWin();
      const bonus = streak * 20;
      const pts = 100 + timeLeft * 5 + bonus;
      setScore(prev => {
        const next = prev + pts;
        if (next > highScore) {
          setHighScore(next);
          try { localStorage.setItem('quiz_highscore', next.toString()); } catch {}
        }
        return next;
      });
      setStreak(prev => prev + 1);
    } else {
      sound.playHit();
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setQuizFinished(true);
      sound.playBullseye();
    }
  };

  const getRankBadge = (pts) => {
    if (pts >= 750) return { title: "Staff Principal Engineer", icon: "👑", color: "text-amber-400" };
    if (pts >= 500) return { title: "Senior Full-Stack Architect", icon: "🚀", color: "text-cyan-400" };
    if (pts >= 300) return { title: "Full-Stack Developer", icon: "⚡", color: "text-emerald-400" };
    return { title: "Junior Code Explorer", icon: "💡", color: "text-slate-300" };
  };

  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col text-white">
      {/* Top Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/20 shadow-lg shrink-0">
            <img src="/games/quiz.png" alt="Dev Quiz" className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-tight flex items-center gap-2">
              <span>DevTech Quiz Blitz</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 font-mono">
                Question {currentIndex + 1}/{questions.length}
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Test your engineering logic, algorithmic speed & stack IQ!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 animate-pulse">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>{streak}x Streak</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <Trophy className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-purple-400 text-sm">{score}</span>
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
            onClick={startNewQuiz}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            title="Restart Quiz"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Quiz Body */}
      {!quizFinished ? (
        <div className="p-6 md:p-8 space-y-6">
          {/* Question Header & Countdown */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                Knowledge Probe #{currentIndex + 1}
              </span>
            </div>

            {/* Circular Timer Display */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 font-mono text-xs">
              <Timer className={`h-4 w-4 ${timeLeft <= 5 ? 'text-red-400 animate-bounce' : 'text-gray-400'}`} />
              <span className={`font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Question Text */}
          <h4 className="text-lg md:text-xl font-bold text-white leading-relaxed tracking-tight min-h-[56px]">
            {currentQ.q}
          </h4>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = isAnswered && idx === currentQ.answer;
              const isWrongSelected = isAnswered && isSelected && idx !== currentQ.answer;

              let btnClass = "border-white/10 bg-white/5 text-gray-200 hover:border-purple-500/50 hover:bg-purple-500/10";
              if (isCorrectAnswer) {
                btnClass = "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
              } else if (isWrongSelected) {
                btnClass = "border-red-500 bg-red-500/20 text-red-300";
              } else if (isAnswered) {
                btnClass = "border-white/5 bg-white/[0.02] text-gray-500 opacity-60";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-lg bg-white/10 flex items-center justify-center font-mono text-xs font-bold text-gray-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isCorrectAnswer && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />}
                  {isWrongSelected && <XCircle className="h-5 w-5 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2 animate-fadeIn">
              <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="h-4 w-4" />
                <span>Engineering Insight:</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished View */
        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-6">
          <div className="h-20 w-20 rounded-3xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-4xl shadow-xl">
            {getRankBadge(score).icon}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Quiz Certification Result</span>
            <h4 className={`text-2xl md:text-3xl font-extrabold ${getRankBadge(score).color}`}>
              {getRankBadge(score).title}
            </h4>
            <p className="text-sm font-mono text-gray-300">
              Total Score: <span className="font-bold text-purple-400 text-lg">{score} Pts</span>
            </p>
          </div>

          <button
            onClick={startNewQuiz}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Engineering Quiz</span>
          </button>
        </div>
      )}

      {/* Footer Hint */}
      <div className="px-5 py-2.5 bg-slate-950 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-gray-400 font-mono">
        <span>15s per question · Consecutive correct answers trigger Multiplier Streaks!</span>
        <span className="text-purple-400 font-bold">High Score: {highScore}</span>
      </div>
    </div>
  );
}