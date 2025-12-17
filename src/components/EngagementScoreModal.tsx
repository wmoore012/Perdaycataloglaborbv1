import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, Sparkles, TrendingUp, Share2, Bookmark, PartyPopper, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { TooltipWrapper, tooltipContent } from './TooltipWrapper';

interface EngagementScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EngagementScoreModal({ isOpen, onClose }: EngagementScoreModalProps) {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const engagementHistory = [
    { month: 'Jan', engagement: 67, spotify: 45, tidal: 22 },
    { month: 'Feb', engagement: 71, spotify: 48, tidal: 23 },
    { month: 'Mar', engagement: 76, spotify: 52, tidal: 24 },
    { month: 'Apr', engagement: 81, spotify: 58, tidal: 23 },
    { month: 'May', engagement: 87, spotify: 65, tidal: 22 },
    { month: 'Jun', engagement: 91, spotify: 71, tidal: 20 },
    { month: 'Jul', engagement: 94.2, spotify: 73, tidal: 21.2 },
  ];

  const spotifyPopularity = [
    { month: 'Jan', popularity: 42 },
    { month: 'Feb', popularity: 48 },
    { month: 'Mar', popularity: 54 },
    { month: 'Apr', popularity: 61 },
    { month: 'May', popularity: 68 },
    { month: 'Jun', popularity: 75 },
    { month: 'Jul', popularity: 82 },
  ];

  const tidalPopularity = [
    { month: 'Jan', popularity: 38 },
    { month: 'Feb', popularity: 41 },
    { month: 'Mar', popularity: 45 },
    { month: 'Apr', popularity: 48 },
    { month: 'May', popularity: 52 },
    { month: 'Jun', popularity: 56 },
    { month: 'Jul', popularity: 61 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-zinc-200 px-8 py-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#111827] mb-2">Engagement Score</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-5xl font-bold text-[#7C3AED]">94.2</div>
                    <span className="text-[#6B7280] font-mono text-sm">Cross-platform</span>
                  </div>
                  <p className="text-sm text-[#6B7280] max-w-2xl">
                    This score measures how deeply listeners connect with your music across all platforms. 
                    It combines saves, playlist adds, completion rates, and sharing behavior to give you 
                    a complete picture of true engagement—not just passive plays.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Premium Story Mode Banner */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-200 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-[#111827]">Plain-Language Story</h4>
                      <span className="px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-bold uppercase tracking-wider">
                        Premium
                      </span>
                    </div>
                    <p className="text-sm text-[#111827] leading-relaxed mb-3">
                      Listeners aren't just playing the track—they're <strong>saving</strong> it, <strong>finishing</strong> it, and <strong>sharing</strong> it. That's the signal labels watch. We mix descriptive (what happened), predictive (where it's heading), and prescriptive (what to do) so you can act without being a data nerd.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <TooltipWrapper content={tooltipContent.engagement}>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-purple-200 text-[#7C3AED] text-xs font-semibold hover:shadow-md transition-shadow cursor-help">
                          <Lightbulb className="w-3.5 h-3.5" />
                          What does 94.2 mean?
                        </span>
                      </TooltipWrapper>
                      <TooltipWrapper content={tooltipContent.saveRate}>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 text-xs font-semibold hover:shadow-md transition-shadow cursor-help">
                          <Bookmark className="w-3.5 h-3.5" />
                          Why saves beat streams
                        </span>
                      </TooltipWrapper>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Score Breakdown with Enhanced Cards */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: 'Save Rate',
                    value: '89%',
                    delta: '+12% vs avg',
                    icon: Bookmark,
                    gradient: 'from-purple-500/10 to-purple-100/40',
                    border: 'border-purple-300/50',
                    shadow: 'shadow-purple-200/60',
                    tip: tooltipContent.saveRate,
                  },
                  {
                    label: 'Completion',
                    value: '94%',
                    delta: '+18% vs avg',
                    icon: TrendingUp,
                    gradient: 'from-emerald-500/10 to-emerald-100/40',
                    border: 'border-emerald-300/50',
                    shadow: 'shadow-emerald-200/60',
                    tip: tooltipContent.engagement,
                  },
                  {
                    label: 'Share Rate',
                    value: '34%',
                    delta: '+22% vs avg',
                    icon: Share2,
                    gradient: 'from-amber-500/10 to-amber-100/40',
                    border: 'border-amber-300/50',
                    shadow: 'shadow-amber-200/60',
                    tip: tooltipContent.momentum,
                  },
                ].map((card, idx) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`group relative overflow-hidden p-5 rounded-xl border ${card.border} bg-gradient-to-br ${card.gradient} backdrop-blur-sm hover:shadow-lg ${card.shadow} transition-all cursor-pointer`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/20 via-white/40 to-transparent" />
                    <TooltipWrapper content={card.tip}>
                      <div className="relative">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                          <card.icon className="w-4 h-4" />
                          {card.label}
                        </div>
                        <div className="text-3xl font-black text-[#111827] mb-1">{card.value}</div>
                        <div className="text-xs font-semibold text-[#14B8A6]">{card.delta}</div>
                      </div>
                    </TooltipWrapper>
                  </motion.div>
                ))}
              </div>

              {/* Storytelling Chips: Descriptive, Predictive, Prescriptive */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    title: 'Descriptive',
                    subtitle: 'What happened',
                    detail: 'Fans finish 94% of the track. They\'re not casual listeners—they\'re leaning in and hitting save.',
                    gradient: 'from-blue-500/15 to-blue-100/40',
                    border: 'border-blue-200',
                  },
                  {
                    title: 'Predictive',
                    subtitle: 'Where you\'re heading',
                    detail: hoveredMonth ? `In ${hoveredMonth}, expect momentum to sustain at this rate if content velocity stays high.` : 'Hover on the chart to see month-specific forecasts.',
                    gradient: 'from-purple-500/15 to-purple-100/40',
                    border: 'border-purple-200',
                  },
                  {
                    title: 'Prescriptive',
                    subtitle: 'What to do next',
                    detail: 'Double down on short-form clips highlighting the hook. High completion = viral-ready content.',
                    gradient: 'from-emerald-500/15 to-emerald-100/40',
                    border: 'border-emerald-200',
                  },
                ].map((story, idx) => (
                  <motion.div
                    key={story.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * idx }}
                    className={`relative overflow-hidden p-5 rounded-2xl border ${story.border} bg-gradient-to-br ${story.gradient} shadow-sm`}
                  >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#7C3AED,_transparent_50%)]" />
                    <div className="relative">
                      <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-1">
                        {story.title}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-[#6B7280] mb-2">
                        {story.subtitle}
                      </div>
                      <p className="text-sm text-[#111827] leading-relaxed">
                        {story.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call-to-Action Story Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-gradient-to-r from-[#7C3AED]/10 via-purple-50 to-[#7C3AED]/5 border border-[#7C3AED]/30 shadow-lg shadow-purple-100/50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white shadow-sm">
                    <PartyPopper className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#111827] mb-2">Story to Tell Your Team</h4>
                    <p className="text-sm text-[#111827] leading-relaxed mb-3">
                      "Fans aren't just clicking play—they're saving and finishing the track. That's 89% save rate and 94% completion. Let's double down on the hook in short-form clips and ride this momentum."
                    </p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-purple-200 text-[#7C3AED]">
                        💡 Pitch-ready language
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-emerald-200 text-emerald-700">
                        🎯 Data-backed narrative
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Engagement History Chart */}
              <div>
                <h3 className="font-semibold text-[#111827] mb-4">Engagement Score History</h3>
                <div className="p-6 bg-white border border-zinc-200 rounded-xl">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart 
                      data={engagementHistory}
                      onMouseMove={(e: any) => {
                        if (e && e.activeLabel) {
                          setHoveredMonth(e.activeLabel);
                        }
                      }}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      <defs>
                        <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#6B7280"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        style={{ fontSize: '12px' }}
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255,255,255,0.95)', 
                          border: '1px solid #E5E7EB', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value: any, name: string) => {
                          const labels: {[key: string]: string} = {
                            'engagement': 'Overall Score',
                            'spotify': 'Spotify',
                            'tidal': 'Tidal'
                          };
                          return [value, labels[name] || name];
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        formatter={(value: string) => {
                          const labels: {[key: string]: string} = {
                            'engagement': 'Overall Score',
                            'spotify': 'Spotify',
                            'tidal': 'Tidal'
                          };
                          return labels[value] || value;
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#7C3AED" 
                        strokeWidth={3}
                        fill="url(#engagementGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Platform Popularity History */}
              <div>
                <h3 className="font-semibold text-[#111827] mb-4">Platform Popularity History</h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* Spotify */}
                  <div className="p-6 bg-white border border-zinc-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#1DB954]" />
                      <span className="font-medium text-[#111827]">Spotify Popularity</span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart 
                        data={spotifyPopularity}
                        onMouseMove={(e: any) => {
                          if (e && e.activeLabel) {
                            setHoveredMonth(e.activeLabel);
                          }
                        }}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        <defs>
                          <linearGradient id="spotifyGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #E5E7EB', 
                            borderRadius: '8px' 
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="popularity" 
                          stroke="#1DB954" 
                          strokeWidth={2}
                          fill="url(#spotifyGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Tidal */}
                  <div className="p-6 bg-white border border-zinc-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#000000]" />
                      <span className="font-medium text-[#111827]">Tidal Popularity</span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart 
                        data={tidalPopularity}
                        onMouseMove={(e: any) => {
                          if (e && e.activeLabel) {
                            setHoveredMonth(e.activeLabel);
                          }
                        }}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        <defs>
                          <linearGradient id="tidalGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#000000" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255,255,255,0.95)', 
                            border: '1px solid #E5E7EB', 
                            borderRadius: '8px' 
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="popularity" 
                          stroke="#000000" 
                          strokeWidth={2}
                          fill="url(#tidalGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#111827] mb-1">What makes a good score?</h4>
                    <ul className="text-sm text-[#6B7280] space-y-1">
                      <li>• <strong>70-80:</strong> Solid engagement, room to grow</li>
                      <li>• <strong>80-90:</strong> Strong connection with listeners</li>
                      <li>• <strong>90+:</strong> Exceptional engagement, top-tier performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}