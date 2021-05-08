import { INote } from './note.interface';

interface IMap {
  beatmapid: string;
  title: string;
  audio: string;
  notes: INote[];
  bpm: number;
  difficulty: number;
  creator: string;
}

export { IMap };
