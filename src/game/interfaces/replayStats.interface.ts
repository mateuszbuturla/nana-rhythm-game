interface IReplayStats {
  scene: Phaser.Scene;
  x: number;
  y: number;
  mark: 'A' | 'B';
  score: number;
  accuracy: number;
  perfectCount: number;
  goodCount: number;
  badCount: number;
  missCount: number;
}

export { IReplayStats };
