import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TrackCardProps {
  id: string;
  title: string;
  artist: string;
  metric: string;
  insight: string;
  artwork?: string;
  accent: 'violet' | 'amber' | 'teal';
  tag?: string;
  onAddToFocus: (track: { id: string; title: string; artist: string; artwork?: string }) => void;
}

export function TrackCard({
  id,
  title,
  artist,
  metric,
  insight,
  artwork,
  accent,
  tag,
  onAddToFocus,
}: TrackCardProps) {
  const accentColors = {
    violet: 'border-violet-400/30 hover:border-violet-400/60',
    amber: 'border-amber-400/30 hover:border-amber-400/60',
    teal: 'border-teal-400/30 hover:border-teal-400/60',
  };

  const buttonColors = {
    violet: 'bg-violet-600 hover:bg-violet-700',
    amber: 'bg-amber-600 hover:bg-amber-700',
    teal: 'bg-teal-600 hover:bg-teal-700',
  };

  const tagColors = {
    violet: 'bg-violet-100 text-violet-700',
    amber: 'bg-amber-100 text-amber-700',
    teal: 'bg-teal-100 text-teal-700',
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white backdrop-blur-sm border ${accentColors[accent]} rounded-lg overflow-hidden transition-all duration-300`}
    >
      {/* Artwork */}
      {artwork && (
        <div className="aspect-square w-full overflow-hidden bg-neutral-200">
          <ImageWithFallback
            src={artwork}
            alt={`${title} artwork`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6">
        {/* Tag if present */}
        {tag && (
          <div className={`inline-block px-2 py-1 rounded text-xs font-mono tracking-wider mb-3 ${tagColors[accent]}`}>
            {tag}
          </div>
        )}

        {/* Track info */}
        <h3 className="text-neutral-900 mb-1">
          {title}
        </h3>
        <p className="text-neutral-500 mb-4">
          {artist}
        </p>

        {/* Metric */}
        <div className="font-mono text-xs text-neutral-600 mb-2">
          {metric}
        </div>

        {/* Insight */}
        <p className="text-neutral-700 mb-6">
          {insight}
        </p>

        {/* Add to Focus button */}
        <button
          onClick={() => onAddToFocus({ id, title, artist, artwork })}
          className={`group/btn relative w-full ${buttonColors[accent]} text-white px-4 py-3 rounded-full transition-colors duration-300 flex items-center justify-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          <span>Add to Focus</span>
          
          {/* Button border beam effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-full border border-white/40 animate-pulse" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}
