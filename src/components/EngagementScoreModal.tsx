import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

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
              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-xl">
                  <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    Save Rate
                  </div>
                  <div className="text-2xl font-bold text-[#111827]">89%</div>
                  <div className="text-xs text-[#14B8A6] mt-1">+12% vs avg</div>
                </div>
                <div className="p-4 bg-[#14B8A6]/5 border border-[#14B8A6]/20 rounded-xl">
                  <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    Completion Rate
                  </div>
                  <div className="text-2xl font-bold text-[#111827]">94%</div>
                  <div className="text-xs text-[#14B8A6] mt-1">+18% vs avg</div>
                </div>
                <div className="p-4 bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl">
                  <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    Share Rate
                  </div>
                  <div className="text-2xl font-bold text-[#111827]">34%</div>
                  <div className="text-xs text-[#14B8A6] mt-1">+22% vs avg</div>
                </div>
              </div>

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
