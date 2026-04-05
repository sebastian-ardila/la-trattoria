'use client';

import { useState, useEffect } from 'react';
import { CaretUp, CaretDown } from '@phosphor-icons/react';

export function ScrollButtons() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setShowUp(window.scrollY > 300);
      setShowDown(window.scrollY < document.documentElement.scrollHeight - window.innerHeight - 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollDown = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  return (
    <div className="fixed bottom-20 right-8 z-40 flex flex-col gap-1.5">
      {showUp && (
        <button
          onClick={scrollUp}
          className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white/45 hover:text-white/80 hover:bg-white/20 transition-all border border-white/10"
          aria-label="Scroll to top"
        >
          <CaretUp size={16} weight="bold" />
        </button>
      )}
      {showDown && (
        <button
          onClick={scrollDown}
          className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white/45 hover:text-white/80 hover:bg-white/20 transition-all border border-white/10"
          aria-label="Scroll to bottom"
        >
          <CaretDown size={16} weight="bold" />
        </button>
      )}
    </div>
  );
}
