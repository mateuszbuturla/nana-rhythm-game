interface IReplay {
  beatmapId: number;
  score: number;
  accuracy: number;
  perfectCount: number;
  goodCount: number;
  badCount: number;
  missCount: number;
  maxCombo: number;
}

export { IReplay };
