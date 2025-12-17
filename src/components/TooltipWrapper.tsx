import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, TrendingUp, Zap, HelpCircle, Sparkles, Info, Target, DollarSign } from 'lucide-react';

type TooltipIcon = 'lightbulb' | 'trending' | 'zap' | 'help' | 'sparkles' | 'info' | 'target' | 'dollar';
type TooltipVariant = 'default' | 'success' | 'warning' | 'info' | 'purple' | 'premium';

interface TooltipContent {
  title?: string;
  description: string;
  tip?: string;
  icon?: TooltipIcon;
  variant?: TooltipVariant;
  footer?: string;
  cta?: string;
}

interface TooltipWrapperProps {
  content: ReactNode | TooltipContent;
  children: ReactNode;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

const iconMap = {
  lightbulb: Lightbulb,
  trending: TrendingUp,
  zap: Zap,
  help: HelpCircle,
  sparkles: Sparkles,
  info: Info,
  target: Target,
  dollar: DollarSign,
};

const variantStyles: Record<TooltipVariant, { bg: string; border: string; text: string; accent: string; glow: string }> = {
  default: {
    bg: 'bg-zinc-900/95',
    border: 'border-zinc-800',
    text: 'text-zinc-100',
    accent: 'text-purple-400',
    glow: 'shadow-xl shadow-black/30',
  },
  success: {
    bg: 'bg-emerald-900/95',
    border: 'border-emerald-700/50',
    text: 'text-emerald-50',
    accent: 'text-emerald-300',
    glow: 'shadow-xl shadow-emerald-500/20',
  },
  warning: {
    bg: 'bg-amber-900/95',
    border: 'border-amber-700/50',
    text: 'text-amber-50',
    accent: 'text-amber-300',
    glow: 'shadow-xl shadow-amber-500/20',
  },
  info: {
    bg: 'bg-blue-900/95',
    border: 'border-blue-700/50',
    text: 'text-blue-50',
    accent: 'text-blue-300',
    glow: 'shadow-xl shadow-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-900/95',
    border: 'border-purple-700/50',
    text: 'text-purple-50',
    accent: 'text-purple-300',
    glow: 'shadow-xl shadow-purple-500/30',
  },
  premium: {
    bg: 'bg-gradient-to-br from-purple-900/95 via-violet-900/95 to-fuchsia-900/95',
    border: 'border-purple-500/50',
    text: 'text-white',
    accent: 'text-purple-200',
    glow: 'shadow-2xl shadow-purple-500/40',
  },
};

export function TooltipWrapper({
  content,
  children,
  delay = 200,
  position = 'top',
  disabled = false,
}: TooltipWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 700);
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

  const isRichContent = typeof content === 'object' && content !== null && 'description' in content;
  const richContent = isRichContent ? (content as TooltipContent) : null;
  const variant = richContent?.variant || 'purple';
  const styles = variantStyles[variant];
  const IconComponent = richContent?.icon ? iconMap[richContent.icon] : null;

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-current',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-current',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-current',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-current',
  };

  const arrowColorMap: Record<TooltipVariant, string> = {
    default: 'text-zinc-900/95',
    purple: 'text-purple-900/95',
    success: 'text-emerald-900/95',
    warning: 'text-amber-900/95',
    info: 'text-blue-900/95',
    premium: 'text-purple-900/95',
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className={`absolute z-[200] ${positionClasses[position]} w-max max-w-[340px] pointer-events-none`}
          >
            <div className={`relative ${styles.bg} ${styles.text} rounded-2xl border ${styles.border} ${styles.glow} backdrop-blur-xl overflow-hidden`}>
              {/* Noise texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />

              {/* Sparkle animation */}
              {showSparkle && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                  initial={{ x: '-180%' }}
                  animate={{ x: '180%' }}
                  transition={{ duration: 0.85, ease: 'easeInOut' }}
                />
              )}

              {richContent ? (
                <div className="px-5 py-4 relative">
                  {/* Header with icon and title */}
                  {(richContent.title || IconComponent) && (
                    <div className="flex items-center gap-2.5 mb-2.5">
                      {IconComponent && (
                        <div className={`p-1.5 rounded-lg bg-white/10 ${styles.accent} backdrop-blur-sm`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      )}
                      {richContent.title && (
                        <span className="font-bold text-sm tracking-wide">{richContent.title}</span>
                      )}
                    </div>
                  )}

                  {/* Main description */}
                  <p className="text-sm leading-relaxed opacity-95 font-medium">
                    {richContent.description}
                  </p>

                  {/* Tip section */}
                  {richContent.tip && (
                    <motion.div
                      className={`mt-3 pt-3 border-t border-white/10 text-xs ${styles.accent} flex items-start gap-2`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span className="font-semibold italic leading-relaxed">{richContent.tip}</span>
                    </motion.div>
                  )}

                  {/* CTA */}
                  {richContent.cta && (
                    <div className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] font-bold text-white/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                      <Sparkles className="w-3 h-3" />
                      {richContent.cta}
                    </div>
                  )}

                  {/* Footer */}
                  {richContent.footer && (
                    <div className="mt-3 text-[10px] uppercase tracking-[0.1em] text-white/60 font-semibold">
                      {richContent.footer}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-4 py-2.5 text-sm font-medium">
                  {content as ReactNode}
                </div>
              )}

              {/* Arrow */}
              <div className={`absolute w-0 h-0 border-8 border-transparent ${arrowClasses[position]} ${arrowColorMap[variant]}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Pre-configured tooltip content for common use cases
export const tooltipContent = {
  momentum: {
    title: 'Velocity Score',
    description: "Your song's speedometer. This tracks how fast you're gaining new listeners week over week—the higher it climbs, the more algorithmic playlists notice.",
    tip: 'Songs scoring 80+ often trigger Spotify's Discover Weekly and Release Radar.',
    icon: 'trending' as const,
    variant: 'purple' as const,
    cta: 'See acceleration curve',
  },
  engagement: {
    title: 'Fan Connection',
    description: "Beyond plays: This measures saves, shares, completion rates, and repeats. It tells you if people actually care—not just skim.",
    tip: 'High engagement (70+) matters more to labels than raw streams. It proves loyalty.',
    icon: 'zap' as const,
    variant: 'success' as const,
    cta: 'Dive into behavior',
  },
  roi: {
    title: 'Bang for Buck',
    description: 'For every $1 you invest, this shows what you get back in streams, discovery, and fan growth. 3.5x means you triple your money in value.',
    tip: 'Anything above 2.0x is a win. Above 3x? Double down immediately.',
    icon: 'dollar' as const,
    variant: 'info' as const,
    cta: 'Build your plan',
  },
  saveRate: {
    title: 'Save Rate',
    description: 'The % of listeners who saved this track to their library. This is the #1 long-term success signal algorithms watch.',
    tip: 'A rate above 20% is viral territory. At 30%+, playlists start chasing you.',
    icon: 'sparkles' as const,
    variant: 'purple' as const,
  },
  prescriptive: {
    title: 'Next Move',
    description: 'We translate the math into one clear action. No guesswork—just the highest-ROI step to take in the next 72 hours.',
    tip: 'This is where data becomes money. Execute the plan, measure, repeat.',
    icon: 'target' as const,
    variant: 'premium' as const,
    cta: 'Launch the playbook',
  },
  descriptive: {
    title: 'What Happened',
    description: 'The story of your catalog so far: peaks, dips, and patterns. We surface the hidden narrative behind the numbers.',
    tip: 'Use this to pitch playlist partners and sponsors. Data storytelling wins deals.',
    icon: 'info' as const,
    variant: 'default' as const,
  },
  predictive: {
    title: 'Where You're Heading',
    description: 'Based on current momentum, this forecasts your trajectory. Linear or exponential—you choose the growth model.',
    tip: 'Adjust your strategy now to bend the curve. Small changes compound fast.',
    icon: 'trending' as const,
    variant: 'info' as const,
  },
};
