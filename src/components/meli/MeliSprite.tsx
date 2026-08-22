import React, { useState, useEffect } from 'react';
import type { MeliSpriteState } from '@/types/meliGuide';
import { MELI_ASSETS } from '@/data/meliAssets';
import { cn } from '@/lib/utils';

export interface MeliSpriteProps {
  state?: MeliSpriteState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  altText?: string;
}

const SIZE_MAP = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

export const MeliSprite: React.FC<MeliSpriteProps> = ({
  state = 'idle',
  size = 'md',
  className,
  altText = `Meli AI Companion (${state} state)`,
}) => {
  const asset = MELI_ASSETS[state] ?? MELI_ASSETS.idle;
  const [imgSrc, setImgSrc] = useState<string>(asset.webp);

  // Sync image source whenever state prop changes
  useEffect(() => {
    const currentAsset = MELI_ASSETS[state] ?? MELI_ASSETS.idle;
    setImgSrc(currentAsset.webp);
  }, [state]);

  const handleError = () => {
    const currentAsset = MELI_ASSETS[state] ?? MELI_ASSETS.idle;
    if (imgSrc === currentAsset.webp) {
      // 1. Fallback from WebP to PNG of the same state
      setImgSrc(currentAsset.png);
    } else if (imgSrc === currentAsset.png) {
      // 2. Fallback to idle WebP
      setImgSrc(MELI_ASSETS.idle.webp);
    } else if (imgSrc === MELI_ASSETS.idle.webp) {
      // 3. Fallback to idle PNG
      setImgSrc(MELI_ASSETS.idle.png);
    }
  };

  return (
    <div
      className={cn(
        'relative shrink-0 flex items-center justify-center select-none overflow-visible',
        SIZE_MAP[size],
        className
      )}
    >
      <img
        src={imgSrc}
        alt={altText}
        width={128}
        height={128}
        decoding="async"
        className="w-full h-full max-w-full max-h-full object-contain filter drop-shadow-md transition-opacity duration-200"
        onError={handleError}
      />
    </div>
  );
};
