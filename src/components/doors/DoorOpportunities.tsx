import { motion } from 'motion/react';
import { Plus, Eye } from 'lucide-react';

interface DoorOpportunitiesProps {
  onAddToFocus: (track: { id: string; title: string; artist: string }) => void;
}

const opportunitiesData = [
  {
    id: 'opp-1',
    title: 'Late Night Signal',
    artist: 'Phantom Theory',
    metric: '2.1K saves, low streams',
    insight: 'Ready for a push',
    tag: 'SLEEPER',
  },
  {
    id: 'opp-2',
    title: 'Bassline Theory',
    artist: 'Kova ft. Mercury',
    metric: '41% cross-fan overlap',
    insight: 'Make content together',
    tag: 'COLLAB EDGE',
  },
  {
    id: 'opp-3',
    title: 'Old City Lights',
    artist: 'Ether Waves',
    metric: '18mo old, 2.3K monthly',
    insight: 'Sample or remaster',
    tag: 'CATALOG FLOOR',
  },
];

export function DoorOpportunities({ onAddToFocus }: DoorOpportunitiesProps) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Door header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="door-header"
        style={{ borderLeftColor: '#14B8A6' }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Eye className="w-5 h-5 text-[#14B8A6]" strokeWidth={2} />
          <h3 className="text-[#111827]" style={{ fontSize: '1.875rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Quiet Wins
          </h3>
        </div>
        <p className="text-[#6B7280]">
          Sleepers, collabs, and forgotten tracks worth revisiting.
        </p>
        <div className="font-mono text-xs text-[#4B5563] uppercase tracking-wider mt-3">
          SEC.03 /// DISCOVERY
        </div>
      </motion.div>

      {/* Track cards with more whitespace */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opportunitiesData.map((track, idx) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="track-card opportunity-card"
            data-accent="teal"
          >
            <div className="track-card-stripe" style={{ backgroundColor: '#14B8A6' }} />
            
            <div className="tag-badge" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#14B8A6' }}>
              {track.tag}
            </div>

            <div className="mb-4 mt-3">
              <h4 className="text-[#111827] mb-1" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                {track.title}
              </h4>
              <p className="text-[#6B7280] text-sm">
                {track.artist}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-[#6B7280] text-xs font-mono uppercase tracking-wide">
                {track.metric}
              </p>
              <p className="text-[#111827] text-sm">
                {track.insight}
              </p>
            </div>

            <button
              onClick={() => onAddToFocus(track)}
              className="action-button"
              style={{ backgroundColor: '#14B8A6' }}
            >
              <Plus className="w-4 h-4" />
              <span>Add to Focus</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
