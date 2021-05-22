import { IPosition } from './properties.interface';

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
  index: number;
}

interface IRankingData {
  place: number;
  avatar: string;
  nick: string;
  score: number;
  accuracy: number;
  maxCombo: number;
}

interface IRankingContainer {
  scene: Phaser.Scene;
  x: number;
  y: number;
  places: IRankingData[];
  handleRankingTileClick: (rankingTileIndex: number) => void;
}

export { IRankingTile, IRankingData, IRankingContainer };
