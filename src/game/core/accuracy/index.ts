import { noteAccuracyConfig } from '../../config/noteAccuracyConfig';
import { ENoteAccuracy } from '../../interfaces/note.interface';

const calculateNoteAccuracy = (noteDelay: number, time: number): any => {
  const delta = Math.abs(
    ((noteDelay - time) * 100) / noteAccuracyConfig.hitTime,
  );

  for (const [key, value] of Object.entries(noteAccuracyConfig.accuracy)) {
    if (value.hitTime) {
      if (
        delta < (noteAccuracyConfig.hitTime / 2) * value.hitTime.max &&
        delta > (noteAccuracyConfig.hitTime / 2) * value.hitTime.min
      ) {
        return value.enum;
      }
    }
  }
};

const calculateOveralAccuracy = (hittedNotes: any[]): number => {
  const notesAccuracy = noteAccuracyConfig.accuracy;
  let accuracy: number = 0;
  let count: any = {};
  hittedNotes.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });

  let t1: number = 0;
  let t2: number = 0;

  for (const [key, value] of Object.entries(notesAccuracy)) {
    for (const [key2, value2] of Object.entries(count)) {
      if (key === key2 && key !== ENoteAccuracy.None) {
        t1 += Number(value2) * value.accuracyValue;
        t2 += Number(value2);
      }
    }
  }

  accuracy = Number.isNaN(t1 / t2) ? 0 : t1 / t2;

  return Number(Number(accuracy * 100).toFixed(2));
};

export { calculateNoteAccuracy, calculateOveralAccuracy };
