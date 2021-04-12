import { IMap } from './map.interface';

interface ISongsContainer {
  scene: Phaser.Scene;
  x: number;
  y: number;
  beatmaps: IMap[];
}

export { ISongsContainer };
