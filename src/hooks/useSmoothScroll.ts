import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    // Simple CSS-based smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
}
