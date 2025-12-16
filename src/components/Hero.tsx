import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Orb } from './Orb';
import { ChatPanel } from './ChatPanel';
import { useRotatingPlaceholder } from '../hooks/useRotatingPlaceholder';

interface HeroProps {
  activeDoor: number;
  setActiveDoor: (index: number) => void;
  isChatActive: boolean;
  setIsChatActive: (active: boolean) => void;
}

export function Hero({ activeDoor, setActiveDoor, isChatActive, setIsChatActive }: HeroProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder } = useRotatingPlaceholder();

  const doors = [
    { title: 'Make these your bets', subtitle: 'Focus Bets', index: '01' },
    { title: "Don't let these stall", subtitle: 'Active Risks', index: '02' },
    { title: 'Sleepers and collabs', subtitle: 'Quiet Wins', index: '03' },
    { title: 'Your focus shelf', subtitle: 'Focus Shelf', index: '04' },
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setIsChatActive(true);
    console.log('Sending:', inputValue);
  };

  const handleInputFocus = () => {
    setIsChatActive(true);
  };

  const scrollToDoor = (index: number) => {
    setActiveDoor(index);
    const doorSection = document.getElementById('horizontal-doors');
    if (doorSection) {
      doorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      
      {/* STATE A: IDLE HERO */}
      <AnimatePresence>
        {!isChatActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 w-full max-w-5xl mx-auto text-center"
          >
            {/* Status label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="font-mono tracking-widest text-xs text-[#6B7280] uppercase">
                Portfolio momentum: saves up 24% · calm
              </span>
            </motion.div>

            {/* Orb - centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <Orb isActive={false} />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-[#111827] mb-3 leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Your catalog's next best moves.
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto" style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>
                Here's what to push, where to push it, and how to show up with receipts.
              </p>
            </motion.div>

            {/* Navigation Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto"
            >
              {doors.map((door, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToDoor(idx)}
                  className="door-pill group"
                >
                  <span className="door-pill-index">{door.index}</span>
                  <span className="door-pill-text">{door.title}</span>
                </button>
              ))}
            </motion.div>

            {/* Chat Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative group">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={handleInputFocus}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={placeholder}
                  className="w-full pl-6 pr-14 py-5 bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-2xl text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#111827]/10 focus:border-zinc-300 transition-all shadow-sm"
                  style={{ fontSize: '1rem' }}
                />
                <button
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#111827] text-white rounded-xl hover:bg-[#1f2937] transition-all group-hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATE B: ACTIVE CHAT MODE */}
      <AnimatePresence>
        {isChatActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 w-full h-full max-w-7xl mx-auto"
          >
            <div className="flex gap-8 items-start min-h-[80vh]">
              {/* Orb - top-left position */}
              <motion.div
                initial={{ x: '40vw', y: '20vh', scale: 1 }}
                animate={{ x: 0, y: 0, scale: 0.7 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.19, 1, 0.22, 1],
                  delay: 0.1
                }}
                className="flex-shrink-0 pt-8"
              >
                <Orb isActive={true} />
              </motion.div>

              {/* Chat Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex-1"
              >
                <ChatPanel 
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  onSend={handleSend}
                  onClose={() => setIsChatActive(false)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
    </section>
  );
}