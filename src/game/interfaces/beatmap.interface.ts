import { IMap } from './map.interface';

interface IBeatmapInfo {
  scene: Phaser.Scene;
  x: number;
  y: number;
  currentBeatmap: IMap;
}

interface IBeatmapTile {
  scene: Phaser.Scene;
  x: number;
  y: number;
  title: string;
  creator: string;
  active: boolean;
}

interface IBeatmapContainer {
  scene: Phaser.Scene;
  x: number;
  y: number;
  beatmaps: IMap[];
  onBeatmapUpdate: (beatmapId: number) => void;
  onBeatmapSelect: () => void;
}

export { IBeatmapInfo, IBeatmapTile, IBeatmapContainer };
