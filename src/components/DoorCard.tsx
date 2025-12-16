import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface DoorCardProps {
  index: string;
  title: string;
  description: string;
  accent: 'violet' | 'amber' | 'teal';
  onClick: () => void;
}

export function DoorCard({ index, title, description, accent, onClick }: DoorCardProps) {
  const accentColors = {
    violet: 'hover:border-violet-400/50 hover:bg-violet-50/30',
    amber: 'hover:border-amber-400/50 hover:bg-amber-50/30',
    teal: 'hover:border-teal-400/50 hover:bg-teal-50/30',
  };

  const accentText = {
    violet: 'text-violet-600',
    amber: 'text-amber-600',
    teal: 'text-teal-600',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white/40 backdrop-blur-sm border border-neutral-200/60 rounded-lg p-8 text-left transition-all duration-300 ${accentColors[accent]}`}
    >
      {/* Left caution stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-300 group-hover:bg-neutral-400 transition-colors" />
      
      {/* Door index number */}
      <div className="font-mono tracking-wider text-xs text-neutral-400 mb-4">
        SEC.{index}
      </div>

      {/* Title */}
      <h3 className={`text-neutral-900 mb-2 ${accentText[accent]}`}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 mb-6">
        {description}
      </p>

      {/* Enter arrow */}
      <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-600 transition-colors">
        <span className="font-mono tracking-wider text-xs">ENTER</span>
        <ChevronRight className="w-4 h-4" />
      </div>

      {/* Hover beam effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-lg border border-white/50 animate-pulse" />
      </div>
    </motion.button>
  );
}
