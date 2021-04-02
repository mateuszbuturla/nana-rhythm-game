import { noteAccuracyConfig } from '../config/noteAccuracyConfig';

const calculateNoteAccuracy = (noteDelay: number, time: number) => {
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

export default calculateNoteAccuracy;
