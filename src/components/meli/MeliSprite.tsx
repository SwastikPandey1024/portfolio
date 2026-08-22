import React, { useState, useEffect } from 'react';
import type { MeliSpriteState } from '@/types/meliGuide';
import { MELI_ASSETS } from '@/data/meliAssets';
import { cn } from '@/lib/utils';

export interface MeliSpriteProps {
  state?: MeliSpriteState;
  size?: 'sm' | 'md' | 'lg' | 'avatar' | 'hero';
  className?: string;
  altText?: string;
}

const SIZE_MAP = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  avatar: 'w-20 sm:w-24 h-28 sm:h-36',
  hero: 'w-24 sm:w-28 h-36 sm:h-40',
};

export const MeliSprite: React.FC<MeliSpriteProps> = ({
  state = 'idle',
  size = 'avatar',
  className,
  altText = `Meli AI Companion (${state} state)`,
}) => {
  const asset = MELI_ASSETS[state] ?? MELI_ASSETS.idle;
  const [currentSrc, setCurrentSrc] = useState<string>(asset.webp);

  // Synchronize active source on state change
  useEffect(() => {
    const nextAsset = MELI_ASSETS[state] ?? MELI_ASSETS.idle;
    setCurrentSrc(nextAsset.webp);
  }, [state]);

  const handleError = () => {
    const nextAsset = MELI_ASSETS[state] ?? MELI_ASSETS.idle;
    if (currentSrc === nextAsset.webp) {
      // 1. Fallback from WebP to PNG
      setCurrentSrc(nextAsset.png);
    } else if (currentSrc === nextAsset.png) {
      // 2. Fallback to Idle WebP
      setCurrentSrc(MELI_ASSETS.idle.webp);
    } else if (currentSrc === MELI_ASSETS.idle.webp) {
      // 3. Fallback to Idle PNG
      setCurrentSrc(MELI_ASSETS.idle.png);
    }
  };

  return (
    <div
      className={cn(
        'relative shrink-0 flex items-center justify-center select-none',
        SIZE_MAP[size],
        className
      )}
    >
      <picture className="w-full h-full flex items-center justify-center">
        <source srcSet={asset.webp} type="image/webp" />
        <source srcSet={asset.png} type="image/png" />
        <img
          src={currentSrc}
          alt={altText}
          width={180}
          height={260}
          loading="eager"
          decoding="sync"
          onError={handleError}
          className="w-full h-full max-w-full max-h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-transform duration-300 hover:scale-105"
        />
      </picture>
    </div>
  );
};
