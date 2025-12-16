import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipWrapperProps {
  content: ReactNode;
  children: ReactNode;
  delay?: number;
}

export function TooltipWrapper({ content, children, delay = 1500 }: TooltipWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none"
          >
            <div className="px-4 py-3 bg-[#111827] text-white text-sm rounded-lg shadow-xl max-w-xs whitespace-normal">
              {content}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                <div className="border-4 border-transparent border-t-[#111827]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
