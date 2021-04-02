import { NoteAccuracy } from '../objects/noteAccuracy';

enum ENoteAccuracy {
  Perfect = 'perfect',
  Miss = 'miss',
}

interface INoteAccuracy {
  text: string;
  color: string;
}

interface INotesAccuracyArray {
  object: NoteAccuracy;
  createdTime: number;
}

export { ENoteAccuracy, INoteAccuracy, INotesAccuracyArray };
