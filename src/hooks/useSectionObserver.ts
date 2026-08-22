import { useEffect } from 'react';
import { useMeliGuide } from '@/hooks/useMeliGuide';

const OBSERVED_SECTION_IDS = [
  'hero',
  'work',
  'salespulse',
  'docuchat',
  'meli',
  'medvision',
  'build',
  'lab',
  'experience',
  'about',
  'contact',
];

export const useSectionObserver = (): void => {
  const { setActiveSectionId, guideEnabled } = useMeliGuide();

  useEffect(() => {
    if (!guideEnabled) return;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the highest intersection ratio or is currently intersecting
      const intersectingEntries = entries.filter((e) => e.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Pick the one most visible
        const mostVisible = intersectingEntries.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev
        );
        if (mostVisible.target.id) {
          setActiveSectionId(mostVisible.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6],
    });

    OBSERVED_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [guideEnabled, setActiveSectionId]);
};
