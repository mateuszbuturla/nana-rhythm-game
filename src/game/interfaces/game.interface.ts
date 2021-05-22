import { IBeatmap } from '../interfaces/beatmap.interface';

interface IGame {
  scene: Phaser.Scene;
  beatmap: IBeatmap;
}

export { IGame };
