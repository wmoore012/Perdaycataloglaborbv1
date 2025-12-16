import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { TrackCard } from './TrackCard';

const opportunitiesData = [
  {
    id: 'opp-1',
    title: 'Late Night Signal',
    artist: 'Phantom Theory',
    metric: '2.1K saves, low streams',
    insight: 'SLEEPER — ready for a push',
    tag: 'SLEEPER',
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  },
  {
    id: 'opp-2',
    title: 'Bassline Theory',
    artist: 'Kova ft. Mercury',
    metric: 'Cross-fan overlap: 41%',
    insight: 'COLLAB EDGE — make content together',
    tag: 'COLLAB EDGE',
    artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80',
  },
  {
    id: 'opp-3',
    title: 'Old City Lights',
    artist: 'Ether Waves',
    metric: '18mo old, 2.3K monthly',
    insight: 'CATALOG FLOOR — sample or remaster',
    tag: 'CATALOG FLOOR',
    artwork: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80',
  },
  {
    id: 'opp-4',
    title: 'Underworld',
    artist: 'Nyx & Vanta',
    metric: 'High skip, but 78% finish',
    insight: 'SLEEPER — teaser clip could unlock',
    tag: 'SLEEPER',
    artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
  },
];

interface DoorOpportunitiesProps {
  onAddToFocus: (track: { id: string; title: string; artist: string; artwork?: string }) => void;
}

export function DoorOpportunities({ onAddToFocus }: DoorOpportunitiesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="door-opportunities" ref={ref} className="relative py-24 px-6 bg-white/20">
      {/* Door header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className="flex items-start gap-6 border-l-2 border-teal-400 pl-6">
          <div>
            <div className="font-mono tracking-wider text-xs text-neutral-400 mb-2">
              DOOR 03 /// OPPORTUNITIES
            </div>
            <h2 className="text-teal-600 mb-2">
              Hidden gems in your catalog
            </h2>
            <p className="text-neutral-600">
              Sleepers, collabs, and forgotten tracks worth revisiting.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Track cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunitiesData.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <TrackCard
              {...track}
              accent="teal"
              tag={track.tag}
              onAddToFocus={onAddToFocus}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
