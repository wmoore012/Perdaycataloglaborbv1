import { useRef, useEffect } from 'react';
import { DoorBets } from './doors/DoorBets';
import { DoorRisks } from './doors/DoorRisks';
import { DoorOpportunities } from './doors/DoorOpportunities';
import { DoorFocusShelf } from './doors/DoorFocusShelf';

interface FocusTrack {
  id: string;
  title: string;
  artist: string;
  artwork?: string;
}

interface HorizontalDoorsProps {
  focusTracks: FocusTrack[];
  onAddToFocus: (track: FocusTrack) => void;
  onRemoveTrack: (trackId: string) => void;
  activeDoor: number;
  setActiveDoor: (index: number) => void;
}

export function HorizontalDoors({
  focusTracks,
  onAddToFocus,
  onRemoveTrack,
  activeDoor,
  setActiveDoor,
}: HorizontalDoorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const doorWidth = container.offsetWidth;
    
    container.scrollTo({
      left: activeDoor * doorWidth,
      behavior: 'smooth',
    });
  }, [activeDoor]);

  return (
    <div id="horizontal-doors" className="relative py-16 bg-[#f2f2f2]">
      {/* Door navigation */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {[
            { title: 'Focus Bets', index: '01', color: 'violet' },
            { title: 'Active Risks', index: '02', color: 'amber' },
            { title: 'Quiet Wins', index: '03', color: 'teal' },
            { title: 'Focus Shelf', index: '04', color: 'gray' },
          ].map((door, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDoor(idx)}
              className={`door-nav-button ${activeDoor === idx ? 'active' : ''}`}
              data-color={door.color}
            >
              <span className="door-nav-index">{door.index}</span>
              <span className="door-nav-title">{door.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable door container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory"
      >
        <div className="w-full flex-shrink-0 snap-center">
          <DoorBets onAddToFocus={onAddToFocus} />
        </div>
        <div className="w-full flex-shrink-0 snap-center">
          <DoorRisks onAddToFocus={onAddToFocus} />
        </div>
        <div className="w-full flex-shrink-0 snap-center">
          <DoorOpportunities onAddToFocus={onAddToFocus} />
        </div>
        <div className="w-full flex-shrink-0 snap-center">
          <DoorFocusShelf tracks={focusTracks} onRemoveTrack={onRemoveTrack} />
        </div>
      </div>
    </div>
  );
}