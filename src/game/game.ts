import 'Phaser';
import { GameConfig } from './config/config';

export class Game extends Phaser.Game {
  constructor() {
    super(GameConfig);
  }
}
