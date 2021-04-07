import { noteAccuracyConfig } from '../../config/noteAccuracyConfig';
import {
  ENoteAccuracy,
  INoteTypeAndCount,
} from '../../interfaces/noteAccuracy.interface';

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

class Score {
  combo: number;
  maxCombo: number;

  constructor() {
    this.combo = 0;
    this.maxCombo = 0;
  }

  increaseCombo(): void {
    this.combo++;
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }
    console.log('combo: ', this.combo);
    console.log('max-combo: ', this.maxCombo);
  }

  breakCombo(): void {
    this.combo = 0;
    console.log('break');
    console.log('combo: ', this.combo);
    console.log('max-combo: ', this.maxCombo);
  }

  getCombo(): any {
    return {
      combo: this.combo,
      maxCombo: this.maxCombo,
    };
  }
}

export { calculateCurrentScore, getAllTypesAndCoundHittedNotes, Score };
