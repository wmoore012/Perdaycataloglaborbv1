import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HorizontalDoors } from './components/HorizontalDoors';
import { CatalogView } from './components/CatalogView';
import { useSmoothScroll } from './hooks/useSmoothScroll';

interface FocusTrack {
  id: string;
  title: string;
  artist: string;
  artwork?: string;
}

export default function App() {
  const [focusTracks, setFocusTracks] = useState<FocusTrack[]>([]);
  const [activeDoor, setActiveDoor] = useState(0);
  const [isChatActive, setIsChatActive] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'settings'>('home');

  // Initialize smooth scrolling
  useSmoothScroll();

  const addToFocus = (track: FocusTrack) => {
    if (focusTracks.length >= 10) return;
    if (!focusTracks.find(t => t.id === track.id)) {
      setFocusTracks([...focusTracks, track]);
    }
  };

  const removeFromFocus = (trackId: string) => {
    setFocusTracks(focusTracks.filter(t => t.id !== trackId));
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] relative">
      {/* Global grain texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] grain-texture" />
      
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
        onChatOpen={() => setIsChatActive(true)}
      />
      
      {currentView === 'home' && (
        <>
          <Hero 
            activeDoor={activeDoor}
            setActiveDoor={setActiveDoor}
            isChatActive={isChatActive}
            setIsChatActive={setIsChatActive}
          />
          
          <HorizontalDoors
            focusTracks={focusTracks}
            onAddToFocus={addToFocus}
            onRemoveTrack={removeFromFocus}
            activeDoor={activeDoor}
            setActiveDoor={setActiveDoor}
          />
        </>
      )}

      {currentView === 'catalog' && (
        <CatalogView onAddToFocus={addToFocus} />
      )}

      {currentView === 'settings' && (
        <div className="min-h-screen pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold mb-4 text-[#111827]">Settings</h1>
            <p className="text-[#6B7280] mb-8">Configure your Perday Intelligence experience.</p>
            <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-8">
              <p className="text-[#6B7280]">Settings panel coming soon...</p>
            </div>
          </div>
        </div>
      )}

      <footer className="py-12 text-center bg-[#f2f2f2] border-t border-zinc-200/60 relative z-10">
        <p className="text-sm text-[#6B7280] font-mono uppercase tracking-wider">
          Perday Intelligence Systems © 2024
        </p>
      </footer>
    </div>
  );
}