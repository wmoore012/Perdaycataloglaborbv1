import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { TrackCard } from './TrackCard';

const betsData = [
  {
    id: 'bet-1',
    title: 'Midnight Runner',
    artist: 'Nova Kaine',
    metric: '+127% streams (7d)',
    insight: 'Push this now — velocity spiking',
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  },
  {
    id: 'bet-2',
    title: 'Concrete Dreams',
    artist: 'TRE45ON',
    metric: '3.2K new listeners',
    insight: 'Heating up quietly — double down',
    artwork: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80',
  },
  {
    id: 'bet-3',
    title: 'Ghost Protocol',
    artist: 'Cipher & Maze',
    metric: '89% save rate',
    insight: 'Strong signal — lean in hard',
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
  },
];

interface DoorBetsProps {
  onAddToFocus: (track: { id: string; title: string; artist: string; artwork?: string }) => void;
}

export function DoorBets({ onAddToFocus }: DoorBetsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="door-bets" ref={ref} className="relative py-24 px-6 bg-white/20">
      {/* Door header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className="flex items-start gap-6 border-l-2 border-violet-400 pl-6">
          <div>
            <div className="font-mono tracking-wider text-xs text-neutral-400 mb-2">
              DOOR 01 /// BETS
            </div>
            <h2 className="text-violet-600 mb-2">
              Your winning moves this week
            </h2>
            <p className="text-neutral-600">
              These tracks have momentum. Put your energy here first.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Track cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {betsData.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <TrackCard
              {...track}
              accent="violet"
              onAddToFocus={onAddToFocus}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
