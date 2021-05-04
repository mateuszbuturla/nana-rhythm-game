import { INote } from './note.interface';

interface IMap {
  beatmapid: string;
  title: string;
  author: string;
  audio: string;
  notes: INote[];
  bpm: number;
  difficulty: number;
}

export { IMap };
