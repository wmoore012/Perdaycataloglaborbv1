import { motion } from 'motion/react';
import { X, Disc, Send } from 'lucide-react';

interface FocusTrack {
  id: string;
  title: string;
  artist: string;
  artwork?: string;
}

interface DoorFocusShelfProps {
  tracks: FocusTrack[];
  onRemoveTrack: (trackId: string) => void;
}

export function DoorFocusShelf({ tracks, onRemoveTrack }: DoorFocusShelfProps) {
  const currentTrack = tracks[0];
  const queueTracks = tracks.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Door header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="door-header"
        style={{ borderLeftColor: '#4B5563' }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Disc className="w-5 h-5 text-[#4B5563]" strokeWidth={2} />
          <h3 className="text-[#111827]" style={{ fontSize: '1.875rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Focus Shelf
          </h3>
        </div>
        <p className="text-[#6B7280]">
          Up to 10 tracks to focus on. Build your playlist, export when ready.
        </p>
        <div className="font-mono text-xs text-[#4B5563] uppercase tracking-wider mt-3">
          SEC.04 /// QUEUE: {tracks.length}/10
        </div>
      </motion.div>

      {tracks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="text-[#6B7280] mb-2">
            No tracks in focus yet
          </div>
          <p className="text-[#9CA3AF]">
            Add tracks from Bets, Risks, or Opportunities
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Now Focusing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs text-[#4B5563] uppercase tracking-wider mb-4">
              Now Focusing
            </div>
            
            {currentTrack && (
              <div className="focus-now-card group">
                <div className="focus-now-stripe" />
                
                <div className="w-full h-48 bg-zinc-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <Disc className="w-16 h-16 text-zinc-400" />
                </div>

                <h4 className="text-[#111827] mb-1" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {currentTrack.title}
                </h4>
                <p className="text-[#6B7280]">
                  {currentTrack.artist}
                </p>

                <button
                  onClick={() => onRemoveTrack(currentTrack.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <X className="w-4 h-4 text-[#6B7280]" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="font-mono text-xs text-[#4B5563] uppercase tracking-wider mb-4">
              Up Next ({queueTracks.length})
            </div>

            <div className="space-y-3">
              {queueTracks.map((track, idx) => (
                <div key={track.id} className="focus-queue-item group">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-zinc-200 rounded flex items-center justify-center flex-shrink-0">
                      <Disc className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[#111827] truncate" style={{ fontWeight: 500 }}>
                        {track.title}
                      </div>
                      <div className="text-sm text-[#6B7280] truncate">
                        {track.artist}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveTrack(track.id)}
                    className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-zinc-100 transition-all flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-[#6B7280]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button className="w-full px-6 py-3 bg-[#4B5563] text-white rounded-xl hover:bg-[#374151] transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 500 }}>
                <Send className="w-4 h-4" />
                <span>Sync to Spotify</span>
              </button>
              <button className="w-full px-6 py-3 bg-white border border-zinc-200 text-[#111827] rounded-xl hover:border-zinc-300 hover:bg-zinc-50 transition-all" style={{ fontWeight: 500 }}>
                Download Report
              </button>
            </div>

            {/* Status */}
            <div className="mt-4 font-mono text-xs text-[#4B5563] uppercase tracking-wider">
              SPOTIFY: CONNECTED ///
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
