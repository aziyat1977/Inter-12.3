import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import { SlideRenderer } from './components/SlideRenderer';
import { ChevronLeft, ChevronRight, MessageSquare, Maximize2, Menu, Sun, Moon, GraduationCap, Presentation, MonitorPlay } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type UserMode = 'teacher' | 'student';
type Theme = 'dark' | 'light';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // App Settings State
  const [theme, setTheme] = useState<Theme>('dark');
  const [userMode, setUserMode] = useState<UserMode>('teacher');
  const [quizMode, setQuizMode] = useState(false);

  const currentSlide = SLIDES[currentSlideIndex];
  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const progress = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className={`${theme} transition-colors duration-500`}>
      <div className="h-screen w-screen bg-slate-50 dark:bg-brand-dark text-slate-900 dark:text-slate-100 flex flex-col relative overflow-hidden font-sans transition-colors duration-500">
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50 pointer-events-none">
          <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md px-6 py-3 rounded-full pointer-events-auto border border-slate-200 dark:border-white/5 shadow-lg flex items-center gap-4">
            <span className="font-bold text-brand-accent tracking-wider">SOFT POWER</span>
            <span className="opacity-30">|</span>
            {quizMode ? (
              <span className="text-brand-highlight font-bold animate-pulse">QUIZ MODE ACTIVE</span>
            ) : (
              <span className="opacity-70 text-sm font-mono">Slide {currentSlideIndex + 1} / {totalSlides}</span>
            )}
          </div>
          
          <div className="flex gap-3 pointer-events-auto">
             {/* Only show Notes toggle if in Teacher Mode */}
             {userMode === 'teacher' && (
               <button 
                onClick={() => setShowNotes(!showNotes)} 
                className={`p-3 rounded-full transition-all duration-300 ${showNotes ? 'bg-brand-accent text-brand-dark shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10'}`}
                title="Speaker Notes"
              >
                 <MessageSquare size={20} />
               </button>
             )}
             
             <button onClick={toggleTheme} className="p-3 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 transition-colors">
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>

             <button onClick={toggleFullScreen} className="p-3 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 transition-colors">
               <Maximize2 size={20} />
             </button>
          </div>
        </div>

        {/* Main Slide Stage */}
        <main className={`flex-1 relative ${quizMode ? 'bg-slate-100 dark:bg-slate-900' : ''}`}>
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentSlideIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <SlideRenderer slide={currentSlide} />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Speaker Notes Drawer (Teacher Only) */}
        {userMode === 'teacher' && (
          <div className={`absolute bottom-24 right-8 w-96 bg-white/90 dark:bg-black/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-8 transition-all duration-300 transform origin-bottom-right z-40 shadow-2xl ${showNotes ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}>
            <h4 className="text-brand-secondary dark:text-brand-highlight font-black mb-4 uppercase text-xs tracking-widest border-b border-slate-300 dark:border-slate-700 pb-2">Speaker Notes</h4>
            <div className="text-slate-800 dark:text-slate-300 space-y-3 text-lg leading-relaxed max-h-80 overflow-y-auto pr-2">
              {currentSlide.speakerNotes.map((note, i) => (
                <p key={i} className="flex gap-2">
                  <span className="text-brand-accent">•</span>
                  {note}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation Control Bar */}
        <div className={`h-24 shrink-0 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200 dark:border-white/5 flex items-center px-8 justify-between z-50 transition-transform duration-500 ${quizMode ? 'translate-y-full' : ''}`}>
           <div className="flex gap-4">
               <button 
                 onClick={() => setShowMenu(!showMenu)}
                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-all"
               >
                 <Menu size={24} />
                 <span className="font-semibold">Menu</span>
               </button>
           </div>

           {/* Navigation Buttons */}
           <div className="flex items-center gap-8">
              <button 
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="p-4 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95"
              >
                <ChevronLeft size={36} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentSlideIndex === totalSlides - 1}
                className="p-4 rounded-full bg-brand-accent text-brand-dark hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95 hover:scale-105"
              >
                <ChevronRight size={36} />
              </button>
           </div>

           <div className="w-24"></div> 
        </div>

        {/* Progress Bar */}
        {!quizMode && (
          <div className="h-1.5 bg-slate-200 dark:bg-slate-800 w-full absolute bottom-0 left-0 z-50">
            <div 
              className="h-full bg-gradient-to-r from-brand-accent to-brand-secondary shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Slide Menu Overlay */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-[60] p-8 md:p-12 overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Presentation Control</h2>
                    <p className="text-slate-500">Configure your session mode and jump to slides.</p>
                  </div>
                  
                  <div className="flex gap-4 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button 
                      onClick={() => { setUserMode('teacher'); setQuizMode(false); }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${userMode === 'teacher' && !quizMode ? 'bg-brand-accent text-brand-dark shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                      <Presentation size={20} /> Teacher
                    </button>
                    <button 
                      onClick={() => { setUserMode('student'); setQuizMode(false); }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${userMode === 'student' && !quizMode ? 'bg-brand-secondary text-brand-dark shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                      <GraduationCap size={20} /> Student
                    </button>
                    <button 
                      onClick={() => { setQuizMode(!quizMode); setShowMenu(false); }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${quizMode ? 'bg-brand-highlight text-brand-dark shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                      <MonitorPlay size={20} /> Quiz Mode
                    </button>
                  </div>

                  <button onClick={() => setShowMenu(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white px-6 py-3 font-bold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors">
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {SLIDES.map((slide, idx) => (
                    <button 
                      key={slide.id}
                      onClick={() => { setCurrentSlideIndex(idx); setShowMenu(false); }}
                      className={`text-left p-6 rounded-2xl border transition-all hover:scale-105 group ${
                        currentSlideIndex === idx 
                        ? 'bg-brand-accent/10 border-brand-accent ring-2 ring-brand-accent/50 dark:ring-brand-accent/50' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-brand-accent/50 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-accent">Slide {idx + 1}</span>
                        <div className={`w-2 h-2 rounded-full ${currentSlideIndex === idx ? 'bg-brand-accent' : 'bg-slate-300 dark:bg-slate-600'}`} />
                      </div>
                      <div className="font-bold text-lg leading-snug text-slate-800 dark:text-slate-200 group-hover:text-brand-accent transition-colors line-clamp-3">{slide.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default App;