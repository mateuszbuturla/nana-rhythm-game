import { noteAccuracyConfig } from '../config/noteAccuracyConfig';
import { ENoteAccuracy } from '../interfaces/noteAccuracy.interface';

const calculateCurrentScore = (hittedNotes: any[]): number => {
  const notesAccuracy = noteAccuracyConfig.accuracy;
  let score: number = 0;
  let count: any = {};
  hittedNotes.forEach(function (i) {
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

export { calculateCurrentScore };
