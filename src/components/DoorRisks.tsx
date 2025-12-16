import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { TrackCard } from './TrackCard';

const risksData = [
  {
    id: 'risk-1',
    title: 'Neon Fade',
    artist: 'Juno Arts',
    metric: '-34% engagement (7d)',
    insight: 'Fans cooling off — drop BTS clip',
    artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
  },
  {
    id: 'risk-2',
    title: 'Empty Streets',
    artist: 'Lunar & Sol',
    metric: 'Playlist drops: 12',
    insight: 'Losing curator love — refresh story',
    artwork: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
  },
];

interface DoorRisksProps {
  onAddToFocus: (track: { id: string; title: string; artist: string; artwork?: string }) => void;
}

export function DoorRisks({ onAddToFocus }: DoorRisksProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="door-risks" ref={ref} className="relative py-24 px-6">
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none grain-texture" />

      {/* Door header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className="flex items-start gap-6 border-l-2 border-amber-400 pl-6">
          <div>
            <div className="font-mono tracking-wider text-xs text-neutral-400 mb-2">
              DOOR 02 /// RISKS
            </div>
            <h2 className="text-amber-600 mb-2">
              Tracks losing momentum
            </h2>
            <p className="text-neutral-600">
              Act now before they go cold. Small moves can turn these around.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Track cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {risksData.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <TrackCard
              {...track}
              accent="amber"
              onAddToFocus={onAddToFocus}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
