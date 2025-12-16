import { motion } from 'motion/react';
import { TrendingUp, Music, Activity, Zap, BarChart3, ArrowUpRight } from 'lucide-react';

interface CatalogViewProps {
  onAddToFocus: (track: any) => void;
}

export function CatalogView({ onAddToFocus }: CatalogViewProps) {
  // Sample catalog data - this would come from your API
  const topTracks = [
    { id: '1', title: 'Midnight in Tokyo', artist: 'Luna Wave', streams: '2.4M', velocity: '+127%', momentum: 92 },
    { id: '2', title: 'Desert Roads', artist: 'Echo Plains', streams: '1.8M', velocity: '+94%', momentum: 85 },
    { id: '3', title: 'Ocean Drive', artist: 'Coastal Sound', streams: '3.1M', velocity: '+73%', momentum: 78 },
    { id: '4', title: 'City Lights', artist: 'Urban Pulse', streams: '1.2M', velocity: '+156%', momentum: 95 },
    { id: '5', title: 'Mountain High', artist: 'Peak Collective', streams: '890K', velocity: '+68%', momentum: 71 },
  ];

  const metrics = [
    { label: 'Total Tracks', value: '247', change: '+12', icon: Music, color: '#7C3AED' },
    { label: 'Total Streams', value: '18.4M', change: '+94%', icon: TrendingUp, color: '#14B8A6' },
    { label: 'Avg Momentum', value: '82.4', change: '+8.3', icon: Activity, color: '#F59E0B' },
    { label: 'Active Signals', value: '34', change: '+6', icon: Zap, color: '#EF4444' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-[#111827]" strokeWidth={1.5} />
            <h1 className="text-4xl font-semibold text-[#111827]">Catalog Analytics</h1>
          </div>
          <p className="text-lg text-[#6B7280] max-w-3xl">
            Descriptive analytics for your entire catalog. See what's happening right now to build trust
            in your data before diving into predictive insights.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-6 hover:border-zinc-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: metric.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-mono text-[#14B8A6] font-semibold">
                    {metric.change}
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] mb-1 font-mono uppercase tracking-wider">
                  {metric.label}
                </p>
                <p className="text-3xl font-semibold text-[#111827]">{metric.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Top Tracks Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-200/60">
            <h2 className="text-xl font-semibold text-[#111827]">Top Performing Tracks</h2>
            <p className="text-sm text-[#6B7280] mt-1">Ranked by momentum score</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200/60 bg-zinc-50/50">
                  <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                    Track
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                    Streams
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                    Velocity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                    Momentum
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {topTracks.map((track, index) => (
                  <motion.tr
                    key={track.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="border-b border-zinc-200/40 hover:bg-white/40 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold text-[#111827] w-8">
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#111827]">{track.title}</p>
                        <p className="text-sm text-[#6B7280]">{track.artist}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-medium text-[#111827]">{track.streams}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#14B8A6]/10 text-[#14B8A6] rounded-lg font-mono text-sm font-semibold">
                        <ArrowUpRight className="w-3 h-3" />
                        {track.velocity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-full"
                            style={{ width: `${track.momentum}%` }}
                          />
                        </div>
                        <span className="font-mono text-sm font-medium text-[#111827] w-8">
                          {track.momentum}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onAddToFocus(track)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937]"
                      >
                        Add to Focus
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Additional Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {/* Growth Trends */}
          <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-6">
            <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#14B8A6]" strokeWidth={1.5} />
              Growth Trends
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B7280]">Last 7 days</span>
                <span className="font-mono font-semibold text-[#14B8A6]">+24.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B7280]">Last 30 days</span>
                <span className="font-mono font-semibold text-[#14B8A6]">+87.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B7280]">Last 90 days</span>
                <span className="font-mono font-semibold text-[#14B8A6]">+142.7%</span>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-6">
            <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#7C3AED]" strokeWidth={1.5} />
              Momentum Categories
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B7280]">Viral</span>
                <span className="font-mono font-semibold text-[#EF4444]">8 tracks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B7280]">Hot</span>
                <span className="font-mono font-semibold text-[#F59E0B]">26 tracks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B7280]">Rising</span>
                <span className="font-mono font-semibold text-[#14B8A6]">42 tracks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6B7280]">Steady</span>
                <span className="font-mono font-semibold text-[#6B7280]">171 tracks</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
