import { IPosition } from './position.interface';

interface IRankingTile {
  scene: Phaser.Scene;
  x: number;
  y: number;
  place: number;
  avatar: string;
  nick: string;
  score: number;
  accuracy: number;
  maxCombo: number;
  parentPosition?: IPosition;
}

interface IRankingData {
  place: number;
  avatar: string;
  nick: string;
  score: number;
  accuracy: number;
  maxCombo: number;
}

export { IRankingTile, IRankingData };
