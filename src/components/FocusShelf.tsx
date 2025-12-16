import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { X, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FocusTrack {
  id: string;
  title: string;
  artist: string;
  artwork?: string;
}

interface FocusShelfProps {
  tracks: FocusTrack[];
  onRemoveTrack: (trackId: string) => void;
}

export function FocusShelf({ tracks, onRemoveTrack }: FocusShelfProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const currentTrack = tracks[0];
  const queueTracks = tracks.slice(1);

  return (
    <section id="door-focus" ref={ref} className="relative py-24 px-6 min-h-screen bg-neutral-900 text-white">
      {/* Door header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className="flex items-start gap-6 border-l-2 border-neutral-500 pl-6">
          <div>
            <div className="font-mono tracking-wider text-xs text-neutral-400 mb-2">
              DOOR 04 /// FOCUS SHELF
            </div>
            <h2 className="text-white mb-2">
              Your active listening queue
            </h2>
            <p className="text-neutral-400">
              Up to 10 tracks to focus on. Build your playlist, export when ready.
            </p>
            <div className="font-mono tracking-wider text-xs text-neutral-500 mt-4">
              STATUS: SYNCED /// QUEUE: {tracks.length}/10
            </div>
          </div>
        </div>
      </motion.div>

      {tracks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center py-20"
        >
          <div className="text-neutral-500 mb-4">
            No tracks in focus yet
          </div>
          <p className="text-neutral-600">
            Add tracks from Bets, Risks, or Opportunities to build your focus queue
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Now Focusing - Large artwork */}
            <div className="space-y-6">
              <div className="font-mono tracking-wider text-xs text-neutral-400">
                NOW FOCUSING
              </div>
              
              {currentTrack && (
                <div className="relative group">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-800">
                    {currentTrack.artwork ? (
                      <ImageWithFallback
                        src={currentTrack.artwork}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-neutral-700 rounded-full" />
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onRemoveTrack(currentTrack.id)}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="mt-6">
                    <h3 className="text-white mb-1">
                      {currentTrack.title}
                    </h3>
                    <p className="text-neutral-400">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Queue list */}
            <div className="space-y-6">
              <div className="font-mono tracking-wider text-xs text-neutral-400">
                UP NEXT ({queueTracks.length})
              </div>

              <div className="space-y-3">
                {queueTracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group flex items-center gap-4 bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/50 rounded-lg p-4 hover:border-neutral-600 transition-all"
                  >
                    {/* Small artwork */}
                    <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-neutral-700">
                      {track.artwork ? (
                        <ImageWithFallback
                          src={track.artwork}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-neutral-600 rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Track info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-white truncate">
                        {track.title}
                      </div>
                      <div className="text-neutral-400 truncate">
                        {track.artist}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveTrack(track.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-neutral-700 rounded-full transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-neutral-900 px-8 py-4 rounded-full hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>Export to Spotify</span>
            </button>
            <button className="bg-neutral-800 text-white px-8 py-4 rounded-full hover:bg-neutral-700 transition-colors border border-neutral-700">
              Download Focus Report
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
