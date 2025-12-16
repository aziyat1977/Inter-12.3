import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface TimerProps {
  initialSeconds: number;
}

export const Timer: React.FC<TimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (seconds / initialSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md mx-auto my-8 transition-colors duration-500">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Circle Background */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
            className={`transition-all duration-1000 ease-linear ${seconds < 10 ? 'text-red-500' : 'text-brand-accent'}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-6xl font-mono font-bold z-10 text-slate-800 dark:text-slate-100">{formatTime(seconds)}</div>
      </div>
      
      <div className="flex gap-4 mt-8">
        <Button onClick={toggle} variant="primary" className="flex items-center gap-2 text-lg">
          {isActive ? <Pause size={24} /> : <Play size={24} />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={reset} variant="secondary" className="flex items-center gap-2 text-lg">
          <RotateCcw size={24} />
          Reset
        </Button>
      </div>
    </div>
  );
};