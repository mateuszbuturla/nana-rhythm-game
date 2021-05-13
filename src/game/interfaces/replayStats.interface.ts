interface IReplayStats {
  scene: Phaser.Scene;
  x: number;
  y: number;
  mark: 'A' | 'B';
  score: number;
  accuracy: number;
}

export { IReplayStats };
