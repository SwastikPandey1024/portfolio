import { useState, useEffect } from 'react';

export function useScrollProgress(): { scrollY: number; isScrolled: number } {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollY,
    isScrolled: scrollY > 40 ? 1 : 0,
  };
}
