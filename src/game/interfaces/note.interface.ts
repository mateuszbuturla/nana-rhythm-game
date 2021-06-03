export type TDirection = 'up' | 'down';

enum ENoteAccuracy {
  Perfect = 'Perfect',
  Miss = 'Miss',
  Good = 'Good',
  Bad = 'Bad',
  None = 'None',
}

interface INoteTypeAndCount {
  noteType: string;
  count: number;
}

interface INote {
  direction: TDirection;
  delay: number;
}

export { ENoteAccuracy, INoteTypeAndCount, INote };
