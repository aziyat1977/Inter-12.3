import React, { useState } from 'react';
import { SlideData, SlideType } from '../types';
import { Timer } from './ui/Timer';
import { Button } from './ui/Button';
import { Check, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideRendererProps {
  slide: SlideData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden transition-colors duration-700">
      
      {/* Dynamic Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-brand-accent/20 dark:bg-brand-accent/10 blur-[150px] rounded-full animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-brand-secondary/20 dark:bg-brand-secondary/10 blur-[150px] rounded-full animate-pulse duration-7000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full h-full flex flex-col max-w-[1600px] mx-auto"
      >
        {/* Header */}
        {(slide.type !== SlideType.TITLE) && (
          <header className="mb-12 text-center shrink-0">
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl md:text-7xl lg:text-8xl font-black font-serif mb-4 text-slate-900 dark:text-white leading-tight tracking-tight"
            >
              {slide.title}
            </motion.h1>
            {slide.subtitle && (
              <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl text-slate-500 dark:text-slate-400 font-light max-w-4xl mx-auto">
                {slide.subtitle}
              </motion.h2>
            )}
          </header>
        )}

        {/* Content Body */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
          <motion.div variants={itemVariants} className="w-full h-full flex flex-col items-center justify-center">
            {renderSpecificContent(slide)}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

function renderSpecificContent(slide: SlideData) {
  switch (slide.type) {
    case SlideType.TITLE:
      return (
        <div className="text-center flex flex-col items-center justify-center h-full gap-8">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="text-7xl md:text-9xl font-black font-serif tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-brand-accent via-slate-800 to-brand-secondary dark:via-white"
          >
            {slide.title}
          </motion.h1>
          <motion.p 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="text-3xl md:text-5xl text-slate-600 dark:text-slate-300 max-w-5xl leading-relaxed"
          >
            {slide.subtitle}
          </motion.p>
          {slide.content}
        </div>
      );

    case SlideType.HOOK:
      return (
        <div className="flex flex-col items-center gap-12 w-full">
          {slide.image && (
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={slide.image} 
              alt="Visual" 
              className="rounded-3xl shadow-2xl shadow-brand-accent/20 max-h-[50vh] object-cover border-4 border-white dark:border-slate-800" 
            />
          )}
          {slide.content}
        </div>
      );

    case SlideType.SPLIT:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full items-stretch p-4">
          <motion.div variants={itemVariants} className="h-full">{slide.splitLeft}</motion.div>
          <motion.div variants={itemVariants} className="h-full">{slide.splitRight}</motion.div>
        </div>
      );

    case SlideType.TIMER:
      return (
        <div className="flex flex-col items-center w-full scale-110">
          {slide.content}
          {slide.durationSeconds && <Timer initialSeconds={slide.durationSeconds} />}
        </div>
      );

    case SlideType.REVEAL_LIST:
    case SlideType.CHECKLIST:
      return <Checklist slide={slide} />;

    case SlideType.DRILL:
      return <Drill slide={slide} />;

    case SlideType.QUIZ:
      return <Quiz slide={slide} />;

    case SlideType.INPUT_EXERCISE:
      return <InputExercise slide={slide} />;

    case SlideType.HOMEWORK:
        return (
            <div className="flex flex-col items-center gap-12 text-center bg-white dark:bg-slate-800/50 p-16 rounded-3xl border-4 border-dashed border-slate-300 dark:border-slate-600 shadow-2xl w-full max-w-4xl">
                {slide.content}
                <div className="text-left space-y-6">
                    {slide.checklistItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-3xl text-slate-700 dark:text-slate-200">
                            {idx < 2 ? <div className="w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(56,189,248,0.8)]" /> : <ArrowRight className="text-brand-secondary" size={32} />}
                            <span className={idx >= 2 ? "text-brand-secondary font-bold text-4xl" : ""}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        )

    default: // STANDARD, FEEDBACK, etc.
      return (
        <div className="flex flex-col items-center gap-12 w-full">
          {slide.image && (
             <motion.img 
              whileHover={{ rotate: [-1, 1, 0] }}
              src={slide.image} 
              alt="Slide Visual" 
              className="rounded-3xl shadow-2xl max-h-[45vh] object-contain bg-white dark:bg-transparent" 
            />
          )}
          <div className="text-2xl md:text-3xl leading-relaxed max-w-6xl text-center w-full">
            {slide.content}
          </div>
        </div>
      );
  }
}

// Sub-components

const Checklist: React.FC<{ slide: SlideData }> = ({ slide }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl">
      {slide.checklistItems?.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.15, type: "spring" }}
          className="flex items-center gap-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <div className="bg-brand-accent/20 p-3 rounded-full text-brand-accent shrink-0">
             <Check size={32} strokeWidth={3} />
          </div>
          <span className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100">{item}</span>
        </motion.div>
      ))}
    </div>
  );
};

const Drill: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReveal = (idx: number) => {
    if (revealed.includes(idx)) {
      setRevealed(revealed.filter(i => i !== idx));
    } else {
      setRevealed([...revealed, idx]);
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="grid grid-cols-2 gap-6 mb-6 text-slate-400 font-black uppercase tracking-[0.2em] px-6 text-xl">
        <div>The Word</div>
        <div>The Partner</div>
      </div>
      <div className="space-y-4">
        {slide.drillPairs?.map((pair, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-6">
             <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl text-3xl md:text-4xl font-black border-l-8 border-brand-secondary flex items-center text-slate-800 dark:text-slate-100 shadow-md">
               {pair.term}
             </div>
             <motion.button 
               whileTap={{ scale: 0.98 }}
               onClick={() => toggleReveal(idx)}
               className={`p-8 rounded-2xl text-3xl md:text-4xl font-black flex items-center justify-between transition-all shadow-md ${
                 revealed.includes(idx) 
                  ? 'bg-brand-accent text-brand-dark' 
                  : 'bg-slate-200 dark:bg-slate-700/50 text-transparent hover:bg-slate-300 dark:hover:bg-slate-700 hover:text-slate-400/30 cursor-pointer'
               }`}
             >
               <span>{pair.partner}</span>
               {revealed.includes(idx) ? <EyeOff size={32} className="opacity-50" /> : <Eye size={32} className="text-slate-400" />}
             </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Quiz: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (qIdx: number, option: string) => {
    setAnswers({ ...answers, [qIdx]: option });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
      {slide.quizData?.map((q, idx) => {
        const isAnswered = !!answers[idx];
        const isCorrect = answers[idx] === q.correct;

        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col gap-6 shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight">{q.question}</h3>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              {q.options.map((opt) => {
                let btnStyle = "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200";
                if (isAnswered) {
                  if (opt === q.correct) btnStyle = "bg-green-500 text-white shadow-lg shadow-green-500/30 ring-2 ring-green-400 scale-105";
                  else if (opt === answers[idx]) btnStyle = "bg-red-500 text-white opacity-50";
                  else btnStyle = "bg-slate-100 dark:bg-slate-700 opacity-30";
                }
                
                return (
                  <button
                    key={opt}
                    onClick={() => !isAnswered && handleSelect(idx, opt)}
                    disabled={isAnswered}
                    className={`py-4 rounded-xl font-bold text-xl transition-all duration-300 ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const InputExercise: React.FC<{ slide: SlideData }> = ({ slide }) => {
    return (
        <div className="flex flex-col gap-10 w-full max-w-5xl">
            {slide.inputPrompts?.map((prompt, i) => {
                const parts = prompt.split('________');
                return (
                    <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        key={i} 
                        className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700"
                    >
                        <div className="text-3xl md:text-5xl leading-loose font-medium text-slate-800 dark:text-slate-200">
                            {parts.map((part, pIdx) => (
                                <React.Fragment key={pIdx}>
                                    {part}
                                    {pIdx < parts.length - 1 && (
                                        <span className="relative inline-block mx-4">
                                            <input 
                                                type="text" 
                                                className="bg-slate-50 dark:bg-slate-900 border-b-4 border-brand-accent text-brand-accent px-4 py-2 w-64 focus:outline-none focus:border-brand-highlight focus:scale-105 transition-all text-center font-handwriting rounded-t-lg"
                                                placeholder="..."
                                            />
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}