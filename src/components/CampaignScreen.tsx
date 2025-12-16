import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Target, DollarSign, TrendingUp, Calendar, MapPin, Users, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CampaignScreenProps {
  onBack: () => void;
}

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  platform: string;
  targetRegion: string;
  targetAge: string;
  actualSpend: number;
  streams: number;
  newListeners: number;
  roi: number;
}

export function CampaignScreen({ onBack }: CampaignScreenProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Push - Berlin',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      budget: 2000,
      platform: 'Spotify Ads',
      targetRegion: 'Berlin, Germany',
      targetAge: '18-24',
      actualSpend: 1847,
      streams: 45000,
      newListeners: 8200,
      roi: 3.2
    },
    {
      id: '2',
      name: 'Mexico City Promo',
      startDate: '2024-05-15',
      endDate: '2024-06-15',
      budget: 1500,
      platform: 'TikTok Ads',
      targetRegion: 'Mexico City, Mexico',
      targetAge: '18-28',
      actualSpend: 1420,
      streams: 38000,
      newListeners: 6800,
      roi: 2.8
    },
    {
      id: '3',
      name: 'NYC Club Circuit',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      budget: 3000,
      platform: 'Instagram Ads',
      targetRegion: 'New York, USA',
      targetAge: '21-30',
      actualSpend: 2890,
      streams: 52000,
      newListeners: 9500,
      roi: 2.4
    },
  ];

  const performanceData = [
    { month: 'Jan', streams: 12000, spend: 0 },
    { month: 'Feb', streams: 15000, spend: 0 },
    { month: 'Mar', streams: 18000, spend: 0 },
    { month: 'Apr', streams: 52000, spend: 2890 },
    { month: 'May', streams: 68000, spend: 2920 },
    { month: 'Jun', streams: 89000, spend: 3267 },
  ];

  const recommendation = {
    suggestedBudget: 2500,
    suggestedPlatform: 'Spotify + TikTok Bundle',
    suggestedRegions: ['Berlin', 'Mexico City', 'Toronto'],
    suggestedDuration: '45 days',
    projectedStreams: 75000,
    projectedROI: 3.5,
    reasoning: [
      'Berlin and Mexico City showed highest engagement rates (94% and 91%)',
      'Combined platform approach yielded 2.3x better results in previous campaigns',
      'Toronto emerging as new hot market based on organic growth patterns',
      '45-day campaigns have shown 18% better completion rates than 30-day'
    ]
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#f2f2f2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Catalog</span>
          </button>
          <div className="flex items-center gap-4 mb-3">
            <Target className="w-8 h-8 text-[#7C3AED]" strokeWidth={1.5} />
            <h1 className="text-4xl font-semibold text-[#111827]">Campaign Manager</h1>
          </div>
          <p className="text-[#6B7280] text-lg">
            Track your campaigns and get AI-powered recommendations for your next strategy.
          </p>
        </div>

        {/* AI Recommendation Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-8 bg-gradient-to-br from-[#7C3AED]/10 to-[#14B8A6]/10 border-2 border-[#7C3AED]/30 rounded-2xl"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#111827] mb-2">
                AI Strategy Recommendation
              </h2>
              <p className="text-[#6B7280] text-sm">
                Based on your historical campaign data and current momentum signals
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-zinc-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-[#14B8A6]" />
                <span className="text-sm font-mono text-[#6B7280] uppercase tracking-wider">
                  Suggested Budget
                </span>
              </div>
              <div className="text-3xl font-bold text-[#111827]">${recommendation.suggestedBudget}</div>
              <div className="text-sm text-[#6B7280] mt-1">
                Expected {recommendation.projectedStreams.toLocaleString()} streams
              </div>
            </div>

            <div className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-zinc-200">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-sm font-mono text-[#6B7280] uppercase tracking-wider">
                  Target Markets
                </span>
              </div>
              <div className="space-y-1 mt-2">
                {recommendation.suggestedRegions.map((region, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                    <span className="text-sm text-[#111827]">{region}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-zinc-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-[#EF4444]" />
                <span className="text-sm font-mono text-[#6B7280] uppercase tracking-wider">
                  Projected ROI
                </span>
              </div>
              <div className="text-3xl font-bold text-[#111827]">{recommendation.projectedROI}x</div>
              <div className="text-sm text-[#14B8A6] mt-1">
                +23% vs last campaign
              </div>
            </div>
          </div>

          <div className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-zinc-200">
            <h3 className="font-semibold text-[#111827] mb-3">Why this strategy?</h3>
            <ul className="space-y-2">
              {recommendation.reasoning.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <span className="text-[#7C3AED] mt-0.5">→</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-6 py-3 bg-[#7C3AED] text-white rounded-xl font-medium hover:bg-[#6D28D9] transition-colors">
              Apply This Strategy
            </button>
            <button className="px-6 py-3 bg-white border border-zinc-200 text-[#111827] rounded-xl font-medium hover:bg-zinc-50 transition-colors">
              Customize Parameters
            </button>
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 bg-white/60 backdrop-blur-sm border border-zinc-200 rounded-2xl"
        >
          <h3 className="font-semibold text-[#111827] mb-4">Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255,255,255,0.95)', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px' 
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="streams" 
                stroke="#7C3AED" 
                strokeWidth={2}
                name="Streams"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="spend" 
                stroke="#14B8A6" 
                strokeWidth={2}
                name="Ad Spend ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Campaign List */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#111827]">Campaign History</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white rounded-xl font-medium hover:bg-[#1f2937] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Campaign</span>
          </button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-6 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-2xl"
          >
            <h3 className="font-semibold text-[#111827] mb-4">Add New Campaign</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                  placeholder="e.g., Summer Push - Berlin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Platform
                </label>
                <select className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]">
                  <option>Spotify Ads</option>
                  <option>TikTok Ads</option>
                  <option>Instagram Ads</option>
                  <option>YouTube Ads</option>
                  <option>Facebook Ads</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Budget ($)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                  placeholder="2000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Target Region
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                  placeholder="Berlin, Germany"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-6 py-2 bg-[#7C3AED] text-white rounded-lg font-medium hover:bg-[#6D28D9] transition-colors">
                Save Campaign
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-white border border-zinc-200 text-[#111827] rounded-lg font-medium hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {campaigns.map((campaign, idx) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="p-6 bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-2xl hover:border-zinc-300 transition-all cursor-pointer"
              onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#111827] text-lg mb-1">{campaign.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {campaign.startDate} → {campaign.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {campaign.targetRegion}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {campaign.targetAge}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    ROI
                  </div>
                  <div className="text-2xl font-bold text-[#14B8A6]">{campaign.roi}x</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    Budget
                  </div>
                  <div className="font-semibold text-[#111827]">${campaign.budget}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    Actual Spend
                  </div>
                  <div className="font-semibold text-[#111827]">${campaign.actualSpend}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    Streams
                  </div>
                  <div className="font-semibold text-[#111827]">{campaign.streams.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                    New Listeners
                  </div>
                  <div className="font-semibold text-[#111827]">{campaign.newListeners.toLocaleString()}</div>
                </div>
              </div>

              {selectedCampaign === campaign.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-zinc-200"
                >
                  <div className="text-sm text-[#6B7280]">
                    <strong>Platform:</strong> {campaign.platform}<br/>
                    <strong>Cost per stream:</strong> ${(campaign.actualSpend / campaign.streams).toFixed(3)}<br/>
                    <strong>Cost per new listener:</strong> ${(campaign.actualSpend / campaign.newListeners).toFixed(2)}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
