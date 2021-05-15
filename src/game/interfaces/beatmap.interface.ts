import { INote } from './note.interface';

interface IBeatmap {
  beatmapid: string;
  title: string;
  audio: string;
  notes: INote[];
  bpm: number;
  difficulty: number;
  creator: string;
}

interface IBeatmapInfo {
  scene: Phaser.Scene;
  x: number;
  y: number;
  currentBeatmap: IBeatmap;
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
  beatmaps: IBeatmap[];
  onBeatmapUpdate: (beatmapId: number) => void;
  onBeatmapSelect: () => void;
}

export { IBeatmap, IBeatmapInfo, IBeatmapTile, IBeatmapContainer };
