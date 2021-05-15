interface IReplay {
  avatar: string;
  nick: string;
  beatmapId: number;
  score: number;
  accuracy: number;
  perfectCount: number;
  goodCount: number;
  badCount: number;
  missCount: number;
  maxCombo: number;
}

interface IReplayData {
  mark: string;
  score: number;
  accuracy: number;
  perfectCount: number;
  goodCount: number;
  badCount: number;
  missCount: number;
  maxCombo: number;
}

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
  maxCombo: number;
  active?: boolean;
}

export { IReplay, IReplayData, IReplayStats };
