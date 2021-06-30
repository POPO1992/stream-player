import { FC, useEffect, useMemo, useRef } from 'react';
import { isIOS, isSafari } from '../../util/browser';
import { useAutoPlay } from './hooks/useAutoPlay';
import { useListener, EmptyCallback } from './hooks/useListener';
import { usePlayer } from './hooks/usePlayer';

import { EVideoType, TCallback } from './interface';

interface IProps {
  poster: string;
  src: string;
  playsInline?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  volume?: number;
  onError: TCallback;
  onPlay?: TCallback;
  onWaiting?: TCallback;
  onPlaying?: TCallback;
  onProgress?: TCallback;
  onPause?: TCallback;
  onEnded?: TCallback;
  onVolumeChange?: TCallback;
}

const determineVideoType = (): EVideoType => {
  const isUseHlsNative = isIOS() && isSafari();
  if (isUseHlsNative) return EVideoType.HLS_NATIVE;
  return EVideoType.HLS_JS;
  // return {
  //   src: flvSrc,
  //   type: EVideoType.FLV_JS,
  // }

  // return {
  //     src: hlsSrc,
  //     type: EVideoType.HLS_JS,
  // }
  //   return {
  //     src: flvSrc,
  //     type: EVideoType.FLV_JS,
  //   }
};

export const Player: FC<IProps> = ({
  src,
  playsInline = true,
  autoPlay = false,
  muted = false,
  volume = 1,
  onError,
  onPlay = EmptyCallback,
  onWaiting = EmptyCallback,
  onPlaying = EmptyCallback,
  onProgress = EmptyCallback,
  onPause = EmptyCallback,
  onEnded = EmptyCallback,
  onVolumeChange = EmptyCallback,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const type = useMemo(() => determineVideoType(), []);

  usePlayer(src, videoRef, type, onError);
  useAutoPlay(autoPlay, videoRef, type, onError);
  useListener(videoRef, onError, onPlay, onWaiting, onPlaying, onProgress, onPause, onEnded, onVolumeChange);

  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (videoEl) {
        videoEl.src = '';
        videoEl.load();
      }
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) videoEl.volume = volume;
  }, [volume]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) videoEl.muted = muted;
  }, [muted]);

  return (
    <video
      key={type} // re-render video when type change
      ref={videoRef}
      src={src}
      muted={muted}
      controls
      preload="auto"
      x-webkit-airplay="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      {...props}>
      <track src="" kind="captions" label="captions" />
      <source type="video/mp4" src={src} />
    </video>
  );
};
