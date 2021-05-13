import { IRankingData } from './rankingTile.interface';

export interface IRankingContainer {
  scene: Phaser.Scene;
  x: number;
  y: number;
  places: IRankingData[];
  handleRankingTileClick: (rankingTileIndex: number) => void;
}
