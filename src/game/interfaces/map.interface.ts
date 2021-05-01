import { INote } from './note.interface';

interface IMap {
  beatmapid: string;
  title: string;
  author: string;
  audio: string;
  notes: INote[];
}

export { IMap };
