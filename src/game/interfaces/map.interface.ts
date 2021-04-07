import { INote } from './note.interface';

interface IMap {
  title: string;
  author: string;
  notes: INote[];
}

export { IMap };
