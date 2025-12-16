import { useEffect, useRef } from 'react';
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

interface HorizontalScrollProps {
  focusTracks: FocusTrack[];
  onAddToFocus: (track: FocusTrack) => void;
  onRemoveTrack: (trackId: string) => void;
  activeNav: number;
  setActiveNav: (index: number) => void;
}

export function HorizontalScroll({
  focusTracks,
  onAddToFocus,
  onRemoveTrack,
  activeNav,
  setActiveNav,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, -rect.top) / (container.offsetHeight - window.innerHeight);
      
      // Horizontal scroll based on vertical scroll
      const maxScroll = wrapper.scrollWidth - wrapper.offsetWidth;
      wrapper.scrollLeft = scrollProgress * maxScroll;

      // Update active nav based on scroll position
      const doorIndex = Math.min(3, Math.floor(scrollProgress * 4));
      if (doorIndex !== activeNav) {
        setActiveNav(doorIndex);
      }

      clearTimeout(scrollTimeout);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeNav, setActiveNav]);

  return (
    <div
      id="horizontal-doors"
      ref={containerRef}
      className="relative bg-[#f2f2f2]"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex h-full overflow-x-hidden"
          style={{ width: '400%' }}
        >
          <div className="w-screen h-full flex-shrink-0">
            <DoorBets onAddToFocus={onAddToFocus} />
          </div>
          <div className="w-screen h-full flex-shrink-0">
            <DoorRisks onAddToFocus={onAddToFocus} />
          </div>
          <div className="w-screen h-full flex-shrink-0">
            <DoorOpportunities onAddToFocus={onAddToFocus} />
          </div>
          <div className="w-screen h-full flex-shrink-0">
            <DoorFocusShelf tracks={focusTracks} onRemoveTrack={onRemoveTrack} />
          </div>
        </div>
      </div>
    </div>
  );
}
