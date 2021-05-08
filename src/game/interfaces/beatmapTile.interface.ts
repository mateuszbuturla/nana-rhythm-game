import { INote } from './note.interface';

export interface IBeatmapTile {
  scene: Phaser.Scene;
  x: number;
  y: number;
  title: string;
  creator: string;
  active: boolean;
}
