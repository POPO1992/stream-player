export enum EVideoType {
  FLV_JS = 'FLV_JS',
  HLS_JS = 'HLS_JS',
  HLS_NATIVE = ' HLS_NATIVE',
}

export enum EVideoError {
  // That will happen on IOS with Power Saving Mode!!
  AUTO_PLAY_PERMISSION_ERROR = 'AUTO_PLAY_PERMISSION_ERROR',
  AUTO_PLAY_ERROR = 'AUTO_PLAY_ERROR',
}

export type TCallback = (args?: any) => void;
