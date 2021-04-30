import { INote } from './note.interface';

interface IMap {
  title: string;
  author: string;
  music: string;
  notes: INote[];
}

export { IMap };
