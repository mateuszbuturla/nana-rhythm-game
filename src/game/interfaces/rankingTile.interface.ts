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
