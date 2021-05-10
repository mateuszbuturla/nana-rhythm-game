interface IReplay {
  beatmapId: string;
  score: number;
  accuracy: number;
  perfectCount: number;
  goodCount: number;
  badCount: number;
  missCount: number;
  maxCombo: number;
}

export { IReplay };
