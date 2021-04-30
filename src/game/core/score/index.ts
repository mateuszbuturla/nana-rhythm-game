import { noteAccuracyConfig } from '../../config/noteAccuracyConfig';
import {
  ENoteAccuracy,
  INoteTypeAndCount,
} from '../../interfaces/noteAccuracy.interface';
import { IMap } from '../../interfaces/map.interface';
import store from '../../redux/store';
import { addHittedNote, setCombo } from '../../redux/mapResult';

class Score {
  combo: number;
  maxCombo: number;
  hittedNotes: string[];

  constructor() {
    this.combo = 0;
    this.maxCombo = 0;
    this.hittedNotes = [];
  }

  addHittedNotes(type: ENoteAccuracy): void {
    this.hittedNotes = [...this.hittedNotes, type];
    store.dispatch(addHittedNote(type));
  }

  increaseCombo(): void {
    this.combo++;
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }
    store.dispatch(
      setCombo({
        combo: this.combo,
        maxCombo: this.maxCombo,
      }),
    );
  }

  breakCombo(): void {
    this.combo = 0;
  }

  getCombo(): any {
    return {
      combo: this.combo,
      maxCombo: this.maxCombo,
    };
  }

  getMaxCombo(map: IMap): number {
    return this.calculateMaxCombo(map);
  }

  private calculateMaxCombo(map: IMap): number {
    return map.notes.length;
  }
}

const calculateCurrentScore = (hittedNotes: string[]): number => {
  const notesAccuracy = noteAccuracyConfig.accuracy;
  let score: number = 0;
  let count: any = {};
  hittedNotes.forEach((i) => {
    count[i] = (count[i] || 0) + 1;
  });

  for (const [key, value] of Object.entries(notesAccuracy)) {
    for (const [key2, value2] of Object.entries(count)) {
      if (key === key2 && key !== ENoteAccuracy.None) {
        score += Number(value2) * value.scoreValue;
      }
    }
  }

  return score;
};

const getAllTypesAndCoundHittedNotes = (
  hittedNotes: string[],
): INoteTypeAndCount[] => {
  let count: any = {};
  let i = 0;
  for (const [key] of Object.entries(noteAccuracyConfig.accuracy)) {
    if (key !== ENoteAccuracy.None) {
      count[key] = 0;
    }
    i++;
  }
  hittedNotes.forEach((i) => {
    count[i] = (count[i] || 0) + 1;
  });

  let newCount: any[] = [];

  for (const [key, value] of Object.entries(count)) {
    newCount = [...newCount, { noteType: key, count: value }];
  }

  return newCount;
};

const getCountOfHittedNotesFromType = (
  type: ENoteAccuracy,
  hittedNotes: string[],
): number => {
  let count: number = 0;
  hittedNotes.forEach((note) => {
    if (note === type) {
      count++;
    }
  });
  return count;
};

export {
  calculateCurrentScore,
  getAllTypesAndCoundHittedNotes,
  getCountOfHittedNotesFromType,
  Score,
};
