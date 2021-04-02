import {
  ENoteAccuracy,
  INoteAccuracy,
} from '../interfaces/noteAccuracy.interface';

interface INoteAccuracyConfig {
  accuracy: Record<ENoteAccuracy, INoteAccuracy>;
  lifeTime: number;
}

const noteAccuracyConfig: INoteAccuracyConfig = {
  accuracy: {
    [ENoteAccuracy.Perfect]: {
      text: 'Perfect',
      color: 'yellow',
    },
    [ENoteAccuracy.Miss]: {
      text: 'Miss',
      color: 'red',
    },
  },
  lifeTime: 200,
};

export { noteAccuracyConfig };
