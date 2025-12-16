import { motion } from 'motion/react';
import { Plus, AlertTriangle } from 'lucide-react';

interface DoorRisksProps {
  onAddToFocus: (track: { id: string; title: string; artist: string }) => void;
}

const risksData = [
  {
    id: 'risk-1',
    title: 'Neon Fade',
    artist: 'Juno Arts',
    metric: '-34% engagement',
    insight: 'Fans cooling off — drop BTS clip',
    action: 'Content refresh needed',
  },
  {
    id: 'risk-2',
    title: 'Empty Streets',
    artist: 'Lunar & Sol',
    metric: '12 playlist drops',
    insight: 'Losing curator love — refresh story',
    action: 'Playlist pitching urgent',
  },
];

export function DoorRisks({ onAddToFocus }: DoorRisksProps) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Door header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="door-header"
        style={{ borderLeftColor: '#F59E0B' }}
      >
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
          <h3 className="text-[#111827]" style={{ fontSize: '1.875rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Active Risks
          </h3>
        </div>
        <p className="text-[#6B7280]">
          Act now before they go cold. Small moves can turn these around.
        </p>
        <div className="font-mono text-xs text-[#4B5563] uppercase tracking-wider mt-3">
          SEC.02 /// WARNING
        </div>
      </motion.div>

      {/* Track cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {risksData.map((track, idx) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="track-card risk-card"
            data-accent="amber"
          >
            <div className="track-card-stripe" style={{ backgroundColor: '#F59E0B' }} />
            <div className="risk-notch" />
            
            <div className="mb-4">
              <h4 className="text-[#111827] mb-1" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                {track.title}
              </h4>
              <p className="text-[#6B7280] text-sm">
                {track.artist}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="metric-pill" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                  {track.metric}
                </div>
              </div>
              <p className="text-[#111827] text-sm">
                {track.insight}
              </p>
              <div className="code-pill-small">
                <div className="code-pill-dot" style={{ backgroundColor: '#F59E0B' }} />
                <span>{track.action}</span>
              </div>
            </div>

            <button
              onClick={() => onAddToFocus(track)}
              className="action-button"
              style={{ backgroundColor: '#F59E0B' }}
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
