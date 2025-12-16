import { motion } from 'motion/react';
import { Plus, TrendingUp } from 'lucide-react';

interface DoorBetsProps {
  onAddToFocus: (track: { id: string; title: string; artist: string }) => void;
}

const betsData = [
  {
    id: 'bet-1',
    title: 'Midnight in Tokyo',
    artist: 'Nova Kaine',
    metric: '+127% streams',
    insight: 'Push this now — velocity spiking',
    region: 'Berlin, Mexico City',
  },
  {
    id: 'bet-2',
    title: 'Concrete Dreams',
    artist: 'TRE45ON',
    metric: '3.2K new listeners',
    insight: 'Heating up quietly — double down',
    region: 'Lagos, Toronto',
  },
  {
    id: 'bet-3',
    title: 'Ghost Protocol',
    artist: 'Cipher & Maze',
    metric: '89% save rate',
    insight: 'Strong signal — lean in hard',
    region: 'London, NYC',
  },
];

export function DoorBets({ onAddToFocus }: DoorBetsProps) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Door header with left stripe */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="door-header"
        style={{ borderLeftColor: '#7C3AED' }}
      >
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-[#7C3AED]" strokeWidth={2} />
          <h3 className="text-[#111827]" style={{ fontSize: '1.875rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Focus Bets
          </h3>
        </div>
        <p className="text-[#6B7280]">
          These tracks have momentum. Put your energy here first.
        </p>
        <div className="font-mono text-xs text-[#4B5563] uppercase tracking-wider mt-3">
          SEC.01 /// PRIORITY
        </div>
      </motion.div>

      {/* Track cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {betsData.map((track, idx) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="track-card"
            data-accent="violet"
          >
            <div className="track-card-stripe" style={{ backgroundColor: '#7C3AED' }} />
            
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
                <div className="metric-pill" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED' }}>
                  {track.metric}
                </div>
              </div>
              <p className="text-[#111827] text-sm">
                {track.insight}
              </p>
              <p className="text-[#6B7280] text-xs font-mono uppercase tracking-wide">
                {track.region}
              </p>
            </div>

            <button
              onClick={() => onAddToFocus(track)}
              className="action-button"
              style={{ backgroundColor: '#7C3AED' }}
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
