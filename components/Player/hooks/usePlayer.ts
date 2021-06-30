import React, { useEffect, useState, useRef } from 'react';

import { EVideoType, TCallback } from './../interface';

export const usePlayer = (
  src: string,
  videoRef: React.RefObject<HTMLVideoElement>,
  type: EVideoType,
  onError: TCallback,
) => {
  console.log(type);
  const [playerLib, setPlayerLib] = useState(null);

  useEffect(() => {
    const videoEL = videoRef.current;

    if (src && videoEL) {
      const assignPlayer = async () => {
        switch (type) {
          // case EVideoType.FLV_JS:
          //     const flvPlayer = (await import('./flv')).default
          case EVideoType.HLS_JS:
            const hlsPlayer = (await import('../streamLib/streamLib')).HlsPlayer;
            return hlsPlayer(videoEL, src, onError);
          case EVideoType.HLS_NATIVE:
            return null;
        }
      };

      assignPlayer().then(res => {
        setPlayerLib(res);
      });
    }

    return () => {
      if (playerLib) {
        playerLib.destroy();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, src]);

  return playerLib;
};
