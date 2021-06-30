import { TCallback } from '../interface';

export const HlsPlayer = (video: HTMLVideoElement, src: string = video.src, onError: TCallback) => {
  const HLS = require('./hls.min.js');
  const player = new HLS();
  player.on(HLS.Events.ERROR, onError);
  player.loadSource(src);
  player.attachMedia(video);
  return player;
};
