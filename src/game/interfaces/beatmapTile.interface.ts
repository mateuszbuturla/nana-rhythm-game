import { INote } from './note.interface';

export interface IBeatmapTile {
  scene: Phaser.Scene;
  x: number;
  y: number;
  title: string;
  author: string;
  active: boolean;
  id: number;
  onClick: (beatmapId: number) => void;
}
