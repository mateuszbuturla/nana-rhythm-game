import { IMap } from './map.interface';

interface IBeatmapInfo {
  scene: Phaser.Scene;
  x: number;
  y: number;
  currentBeatmap: IMap;
}

export { IBeatmapInfo };
