import { INoteAccuracy } from '../interfaces/simpleGameComponents.interface';
import { ENoteAccuracy } from '../interfaces/note.interface';

interface INoteAccuracyConfig {
  accuracy: Record<ENoteAccuracy, INoteAccuracy>;
  lifeTime: number;
  hitTime: number;
}

const noteAccuracyConfig: INoteAccuracyConfig = {
  accuracy: {
    [ENoteAccuracy.Perfect]: {
      text: 'Perfect',
      color: 'yellow',
      hitTime: {
        min: 0,
        max: 0.1,
      },
      accuracyValue: 1,
      scoreValue: 300,
      enum: ENoteAccuracy.Perfect,
    },
    [ENoteAccuracy.Good]: {
      text: 'Good',
      color: 'green',
      hitTime: {
        min: 0.1,
        max: 0.3,
      },
      accuracyValue: 0.33,
      scoreValue: 100,
      enum: ENoteAccuracy.Good,
    },
    [ENoteAccuracy.Bad]: {
      text: 'Bad',
      color: 'purple',
      hitTime: {
        min: 0.3,
        max: 1,
      },
      accuracyValue: 0.16,
      scoreValue: 500,
      enum: ENoteAccuracy.Bad,
    },
    [ENoteAccuracy.Miss]: {
      text: 'Miss',
      color: 'red',
      accuracyValue: 0,
      scoreValue: 0,
      enum: ENoteAccuracy.Miss,
    },
    [ENoteAccuracy.None]: {
      text: '',
      color: '',
      accuracyValue: 0,
      scoreValue: 0,
      enum: ENoteAccuracy.None,
    },
  },
  lifeTime: 200,
  hitTime: 200,
};

export { noteAccuracyConfig };
