import React, { useEffect } from 'react';
import { TCallback } from '../interface';

export const EmptyCallback = () => null;

// remember to use useCallback or useRef to save func instance
export const useListener = (
  videoRef: React.RefObject<HTMLVideoElement> | null,
  onError: TCallback,
  onPlay: TCallback,
  onWaiting: TCallback,
  onPlaying: TCallback,
  onProgress: TCallback,
  onPause: TCallback,
  onEnded: TCallback,
  onVolumeChange: TCallback,
) => {
  useEffect(() => {
    const video = videoRef?.current;
    if (video) {
      video.addEventListener('play', onPlay);
      video.addEventListener('error', onError);
      video.addEventListener('waiting', onWaiting);
      video.addEventListener('playing', onPlaying);
      video.addEventListener('progress', onProgress);
      video.addEventListener('ended', onEnded);
      video.addEventListener('volumechange', onVolumeChange);
    }

    return () => {
      if (video) {
        video.removeEventListener('play', onPlay);
        video.removeEventListener('error', onError);
        video.removeEventListener('waiting', onWaiting);
        video.removeEventListener('playing', onPlaying);
        video.removeEventListener('progress', onProgress);
        video.removeEventListener('ended', onEnded);
        video.removeEventListener('volumechange', onVolumeChange);
      }
    };
  }, [videoRef, onPlay, onError, onWaiting, onPlaying, onPause, onProgress, onEnded, onVolumeChange]);
};
