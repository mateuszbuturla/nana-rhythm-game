import { NoteAccuracy } from '../objects/game/noteAccuracy';

enum ENoteAccuracy {
  Perfect = 'Perfect',
  Miss = 'Miss',
  Good = 'Good',
  Bad = 'Bad',
  None = 'None',
}

interface INoteAccuracy {
  text: string;
  color: string;
  hitTime?: {
    min: number;
    max: number;
  };
  accuracyValue: number;
  scoreValue: number;
  enum: ENoteAccuracy;
}

interface INotesAccuracyArray {
  object: NoteAccuracy;
  createdTime: number;
}

interface INoteTypeAndCount {
  noteType: string;
  count: number;
}

export { ENoteAccuracy, INoteAccuracy, INotesAccuracyArray, INoteTypeAndCount };
