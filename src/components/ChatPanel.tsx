import { motion } from 'motion/react';
import { ArrowRight, X, TrendingUp, Users, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import { ReceiptCard } from './ReceiptCard';
import { useRotatingPlaceholder } from '../hooks/useRotatingPlaceholder';

interface ChatPanelProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
}

export function ChatPanel({ inputValue, setInputValue, onSend, onClose }: ChatPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { placeholder } = useRotatingPlaceholder();

  return (
    <motion.div 
      animate={{
        width: isExpanded ? '100vw' : '100%',
        maxWidth: isExpanded ? '100vw' : '1200px',
        height: isExpanded ? '100vh' : 'auto',
      }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className={`chat-panel ${isExpanded ? 'fixed inset-0 z-50 rounded-none m-0' : 'relative'}`}
      style={isExpanded ? { margin: 0, borderRadius: 0 } : {}}
    >
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="chat-label">
          <span className="font-mono text-[10px] tracking-widest text-[#4B5563] uppercase">
            ORBITAL.AI — INTELLIGENCE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            title={isExpanded ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4 text-[#6B7280]" />
            ) : (
              <Maximize2 className="w-4 h-4 text-[#6B7280]" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className={`space-y-6 mb-6 ${isExpanded ? 'max-h-[calc(100vh-200px)] overflow-y-auto' : ''}`}>
        {/* User message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end"
        >
          <div className="chat-bubble chat-bubble-user">
            Which record should I push this week?
          </div>
        </motion.div>

        {/* Orb response */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-start gap-3"
        >
          <div className="chat-bubble chat-bubble-orb">
            <p className="mb-4">
              Based on your catalog momentum, <strong>Midnight in Tokyo</strong> has the strongest signal right now. Stream velocity is up 127% in the last 7 days, with concentrated engagement across multiple platforms.
            </p>
            <p className="text-[#6B7280]">
              Here are the receipts:
            </p>
          </div>

          {/* Receipt cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
            <ReceiptCard
              title="Stream Velocity"
              metric="+127%"
              subtitle="Last 7 days"
              trend="up"
              color="violet"
              chartData={[45, 52, 61, 73, 89, 102, 127]}
            />
            <ReceiptCard
              title="Engagement Score"
              metric="94.2"
              subtitle="Cross-platform"
              trend="up"
              color="teal"
              icon={<Users className="w-4 h-4" />}
            />
          </div>

          {/* Follow-up suggestions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            <button className="code-pill-small hover:bg-zinc-200 transition-colors">
              Show me platform breakdown
            </button>
            <button className="code-pill-small hover:bg-zinc-200 transition-colors">
              What's the ad spend recommendation?
            </button>
            <button className="code-pill-small hover:bg-zinc-200 transition-colors">
              Compare to last campaign
            </button>
          </motion.div>

          {/* Strategy pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="code-pill"
          >
            <div className="code-pill-dot" style={{ backgroundColor: '#7C3AED' }} />
            <span className="code-pill-text">Strategy_Push_Quality_Signal</span>
            <div className="code-pill-grip">
              <div />
              <div />
              <div />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder={placeholder}
          className="w-full pl-6 pr-14 py-4 bg-white border border-zinc-200/60 rounded-xl text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#111827]/10 focus:border-zinc-300 transition-all"
        />
        <button
          onClick={onSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#111827] text-white rounded-lg hover:bg-[#1f2937] transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}