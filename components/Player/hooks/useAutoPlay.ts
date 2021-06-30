import { useEffect } from 'react';
import { EVideoType, TCallback, EVideoError } from './../interface';

export const useAutoPlay = (
  autoPlay: boolean,
  videoRef: React.RefObject<HTMLVideoElement>,
  type: EVideoType,
  onError: TCallback,
) => {
  useEffect(() => {
    const readyPlayerEvent = type === EVideoType.HLS_NATIVE ? 'loadedmetadata' : 'canplay';
    const videoEl = videoRef.current;

    const autoPlayerHandler = () => {
      videoEl?.play().catch(err => {
        console.log('first auto play error:', err);
        onError(EVideoError.AUTO_PLAY_ERROR);
        videoEl.muted = true;
        videoEl.play().catch(err => {
          console.log('second auto play error:', err);
          onError(EVideoError.AUTO_PLAY_PERMISSION_ERROR);
        });
      });
    };

    if (videoEl && autoPlay) videoEl.addEventListener(readyPlayerEvent, autoPlayerHandler);

    return () => {
      if (videoEl && autoPlay) videoEl.removeEventListener(readyPlayerEvent, autoPlayerHandler);
    };
  }, [autoPlay, type, onError, videoRef]);
};
