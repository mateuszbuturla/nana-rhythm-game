import {
  ENoteAccuracy,
  INoteAccuracy,
} from '../interfaces/noteAccuracy.interface';

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
      enum: ENoteAccuracy.Perfect,
    },
    [ENoteAccuracy.Good]: {
      text: 'Good',
      color: 'green',
      hitTime: {
        min: 0.1,
        max: 0.3,
      },
      enum: ENoteAccuracy.Good,
    },
    [ENoteAccuracy.Bad]: {
      text: 'Bad',
      color: 'purple',
      hitTime: {
        min: 0.3,
        max: 1,
      },
      enum: ENoteAccuracy.Bad,
    },
    [ENoteAccuracy.Miss]: {
      text: 'Miss',
      color: 'red',
      enum: ENoteAccuracy.Miss,
    },
  },
  lifeTime: 200,
  hitTime: 200,
};

export { noteAccuracyConfig };
