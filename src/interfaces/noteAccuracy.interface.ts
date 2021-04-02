import { NoteAccuracy } from '../objects/noteAccuracy';

enum ENoteAccuracy {
  Perfect = 'Perfect',
  Miss = 'Miss',
  Good = 'Good',
  Bad = 'Bad',
}

interface INoteAccuracy {
  text: string;
  color: string;
  hitTime?: {
    min: number;
    max: number;
  };
  enum: ENoteAccuracy;
}

interface INotesAccuracyArray {
  object: NoteAccuracy;
  createdTime: number;
}

export { ENoteAccuracy, INoteAccuracy, INotesAccuracyArray };
