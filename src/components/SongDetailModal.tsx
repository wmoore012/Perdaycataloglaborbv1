import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, DollarSign, Target, PlayCircle, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SongDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: {
    id: string;
    title: string;
    artist: string;
    velocity: string;
  };
}

export function SongDetailModal({ isOpen, onClose, song }: SongDetailModalProps) {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [glitching, setGlitching] = useState(true);
  const [highlightedCharts, setHighlightedCharts] = useState([0, 3, 6]);
  const [userFeedback, setUserFeedback] = useState<string | null>(null);
  const [predictionModel, setPredictionModel] = useState<'linear' | 'quadratic'>('quadratic');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setLoadingProgress(0);
      setGlitching(true);

      // Glitch effect
      const glitchTimer = setTimeout(() => setGlitching(false), 400);

      // Loading progress
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 300);
            return 100;
          }
          return prev + 10;
        });
      }, 150);

      return () => {
        clearTimeout(glitchTimer);
        clearInterval(interval);
      };
    }
  }, [isOpen]);

  // Mock data for charts
  const streamHistory = [
    { month: 'Jan', streams: 45000, spotify: 30000, tidal: 15000 },
    { month: 'Feb', streams: 52000, spotify: 35000, tidal: 17000 },
    { month: 'Mar', streams: 61000, spotify: 42000, tidal: 19000 },
    { month: 'Apr', streams: 73000, spotify: 50000, tidal: 23000 },
    { month: 'May', streams: 89000, spotify: 61000, tidal: 28000 },
    { month: 'Jun', streams: 108000, spotify: 75000, tidal: 33000 },
    { month: 'Jul', streams: 245000, spotify: 170000, tidal: 75000 },
  ];

  const predictiveLinear = [
    { month: 'Aug', predicted: 320000, confidence: 85 },
    { month: 'Sep', predicted: 395000, confidence: 78 },
    { month: 'Oct', predicted: 470000, confidence: 72 },
  ];

  const predictiveQuadratic = [
    { month: 'Aug', predicted: 380000, confidence: 82 },
    { month: 'Sep', predicted: 550000, confidence: 75 },
    { month: 'Oct', predicted: 780000, confidence: 68 },
  ];

  const platformBreakdown = [
    { platform: 'Spotify', percentage: 69, streams: 170000 },
    { platform: 'Tidal', percentage: 31, streams: 75000 },
  ];

  const roiProjections = [
    { spend: 0, growth: 0, roi: 0 },
    { spend: 500, growth: 15, roi: 2.3 },
    { spend: 1000, growth: 28, roi: 3.1 },
    { spend: 2000, growth: 45, roi: 2.8 },
    { spend: 5000, growth: 72, roi: 1.9 },
  ];

  const saveRate = [
    { month: 'Jan', rate: 12 },
    { month: 'Feb', rate: 14 },
    { month: 'Mar', rate: 18 },
    { month: 'Apr', rate: 23 },
    { month: 'May', rate: 31 },
    { month: 'Jun', rate: 42 },
    { month: 'Jul', rate: 89 },
  ];

  const charts = [
    // DESCRIPTIVE
    {
      title: 'Stream History',
      subtitle: 'Where your song is',
      type: 'descriptive',
      component: (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={streamHistory}>
            <defs>
              <linearGradient id="streamGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="streams" stroke="#7C3AED" strokeWidth={2} fill="url(#streamGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      )
    },
    {
      title: 'Platform Split',
      subtitle: 'Current distribution',
      type: 'descriptive',
      component: (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={platformBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="platform" stroke="#6B7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Bar dataKey="percentage" fill="#14B8A6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      title: 'Save Rate Trend',
      subtitle: 'Listener commitment',
      type: 'descriptive',
      component: (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={saveRate}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="rate" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    // PREDICTIVE
    {
      title: 'Growth Projection',
      subtitle: `${predictionModel === 'linear' ? 'Linear' : 'Exponential'} model`,
      type: 'predictive',
      component: (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={[...streamHistory.slice(-3), ...(predictionModel === 'linear' ? predictiveLinear : predictiveQuadratic)]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="streams" stroke="#7C3AED" strokeWidth={2} />
            <Line type="monotone" dataKey="predicted" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      title: 'Confidence Interval',
      subtitle: 'Prediction accuracy',
      type: 'predictive',
      component: (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={predictionModel === 'linear' ? predictiveLinear : predictiveQuadratic}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Bar dataKey="confidence" fill="#14B8A6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      title: 'Momentum Score',
      subtitle: 'Velocity indicator',
      type: 'predictive',
      component: (
        <div className="flex items-center justify-center h-[180px]">
          <div className="text-center">
            <div className="text-6xl font-bold text-[#7C3AED] mb-2">94</div>
            <div className="text-sm text-[#6B7280] font-mono">MOMENTUM INDEX</div>
            <div className="mt-4 px-4 py-2 bg-[#7C3AED]/10 rounded-lg">
              <span className="text-[#7C3AED] text-sm font-semibold">Top 3% in catalog</span>
            </div>
          </div>
        </div>
      )
    },
    // PRESCRIPTIVE
    {
      title: 'ROI Projection',
      subtitle: 'Investment impact',
      type: 'prescriptive',
      component: (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={roiProjections}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="spend" stroke="#6B7280" style={{ fontSize: '11px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="growth" stroke="#14B8A6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      title: 'Optimal Spend',
      subtitle: 'Recommended action',
      type: 'prescriptive',
      component: (
        <div className="flex items-center justify-center h-[180px]">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#14B8A6] mb-2">$1,000</div>
            <div className="text-sm text-[#6B7280] font-mono mb-3">SWEET SPOT</div>
            <div className="text-xs text-[#6B7280]">Expected +28% growth</div>
            <div className="text-xs text-[#6B7280]">3.1x ROI average</div>
          </div>
        </div>
      )
    },
    {
      title: 'Strategy Recommendation',
      subtitle: 'Next best move',
      type: 'prescriptive',
      component: (
        <div className="flex flex-col justify-center h-[180px] px-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-sm text-[#111827]">Push Berlin & Mexico City</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#14B8A6]" />
            <span className="text-sm text-[#111827]">Target 18-24 demographic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-sm text-[#111827]">Consider playlist placement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-sm text-[#111827]">Maintain posting velocity</span>
          </div>
        </div>
      )
    },
  ];

  const julyEvent = {
    month: 'July',
    event: 'Featured on "Urban Vibes" playlist (2.3M followers) + TikTok viral moment',
    options: [
      'Playlist feature drove growth',
      'TikTok trend was the catalyst',
      'Both factors synergized',
      'Other: _____________'
    ]
  };

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
          {/* Gaussian blur background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: glitching ? [1, 1.02, 0.98, 1.01, 1] : 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-auto bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-zinc-200 px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <PlayCircle className="w-6 h-6 text-[#7C3AED]" />
                    <h2 className="text-2xl font-semibold text-[#111827]">{song.title}</h2>
                  </div>
                  <p className="text-[#6B7280]">{song.artist}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-lg text-sm font-mono font-semibold">
                      {song.velocity}
                    </span>
                    <span className="text-xs font-mono text-[#6B7280] uppercase tracking-wider">
                      Stream velocity trending
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="animate-pulse text-[#7C3AED]">Analyzing song data...</div>
                </div>
                <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7C3AED] to-[#14B8A6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="mt-2 text-xs text-[#6B7280] font-mono">
                  {loadingProgress}% complete
                </div>
              </div>
            )}

            {/* Content */}
            {!loading && (
              <div className="p-8 space-y-8">
                {/* Model Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Song Analytics Pack</h3>
                    <p className="text-sm text-[#6B7280]">Descriptive · Predictive · Prescriptive insights</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6B7280]">Growth Model:</span>
                    <button
                      onClick={() => setPredictionModel(predictionModel === 'linear' ? 'quadratic' : 'linear')}
                      className="px-4 py-2 bg-[#7C3AED] text-white text-sm font-medium rounded-lg hover:bg-[#6D28D9] transition-colors"
                    >
                      {predictionModel === 'linear' ? 'Linear' : 'Exponential'}
                    </button>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {charts.map((chart, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`relative p-5 rounded-xl border transition-all cursor-pointer ${
                        highlightedCharts.includes(idx)
                          ? 'bg-[#7C3AED]/5 border-[#7C3AED] shadow-lg shadow-[#7C3AED]/10'
                          : 'bg-white border-zinc-200 hover:border-zinc-300'
                      }`}
                      onClick={() => {
                        if (highlightedCharts.includes(idx)) {
                          setHighlightedCharts(highlightedCharts.filter(i => i !== idx));
                        } else {
                          setHighlightedCharts([...highlightedCharts.slice(1), idx]);
                        }
                      }}
                    >
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-[#111827] text-sm">{chart.title}</h4>
                          {highlightedCharts.includes(idx) && (
                            <div className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs text-[#6B7280]">{chart.subtitle}</p>
                      </div>
                      {chart.component}
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-mono uppercase tracking-wider ${
                          chart.type === 'descriptive' ? 'bg-blue-50 text-blue-600' :
                          chart.type === 'predictive' ? 'bg-purple-50 text-purple-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {chart.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* User Feedback Section */}
                <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#111827] mb-1">
                        In {julyEvent.month}, this happened:
                      </h4>
                      <p className="text-sm text-[#6B7280] mb-3">{julyEvent.event}</p>
                      <p className="text-sm font-medium text-[#111827] mb-3">
                        Can you tell us why you think that was happening?
                      </p>
                      <div className="space-y-2">
                        {julyEvent.options.map((option, idx) => (
                          <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="feedback"
                              value={option}
                              checked={userFeedback === option}
                              onChange={(e) => setUserFeedback(e.target.value)}
                              className="w-4 h-4 text-[#7C3AED] border-zinc-300 focus:ring-[#7C3AED]"
                            />
                            <span className="text-sm text-[#111827] group-hover:text-[#7C3AED] transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      {userFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 px-4 py-2 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-lg"
                        >
                          <p className="text-xs text-[#7C3AED]">
                            ✓ Thanks! We'll use this to build better predictions for you.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-[#7C3AED] text-white rounded-xl font-medium hover:bg-[#6D28D9] transition-colors">
                    Apply Recommended Strategy
                  </button>
                  <button className="px-6 py-3 bg-white border border-zinc-200 text-[#111827] rounded-xl font-medium hover:bg-zinc-50 transition-colors">
                    Export Report
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
