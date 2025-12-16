import { User } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'catalog' | 'settings';
  onNavigate: (view: 'home' | 'catalog' | 'settings') => void;
  onChatOpen: () => void;
}

export function Header({ currentView, onNavigate, onChatOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2.5">
        <div className="h-2.5 w-2.5 bg-[#111827] rounded-full" />
        <button 
          onClick={() => onNavigate('home')}
          className="tracking-tight text-[#111827] uppercase hover:opacity-70 transition-opacity" 
          style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.02em' }}
        >
          PERDAY
        </button>
      </div>
      
      <div className="pointer-events-auto">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-8 text-sm" style={{ fontWeight: 500 }}>
            <button 
              onClick={() => onNavigate('catalog')}
              className={`hover:text-[#111827] transition-colors ${
                currentView === 'catalog' ? 'text-[#111827]' : 'text-[#6B7280]'
              }`}
            >
              Catalog
            </button>
            <button 
              onClick={onChatOpen}
              className="text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Intelligence
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className={`hover:text-[#111827] transition-colors ${
                currentView === 'settings' ? 'text-[#111827]' : 'text-[#6B7280]'
              }`}
            >
              Settings
            </button>
          </nav>
          <div className="h-9 w-9 rounded-full border border-zinc-300/60 bg-white flex items-center justify-center text-[#6B7280] hover:border-zinc-400 hover:text-[#111827] transition-all cursor-pointer shadow-sm">
            <User className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </header>
  );
}