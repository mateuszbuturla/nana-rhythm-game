import { NoteAccuracy } from '../objects/game/noteAccuracy';
import { Score } from '../core/score';

enum ENoteAccuracy {
  Perfect = 'Perfect',
  Miss = 'Miss',
  Good = 'Good',
  Bad = 'Bad',
  None = 'None',
}

interface INoteAccuracy {
  text: string;
  color: string;
  hitTime?: {
    min: number;
    max: number;
  };
  accuracyValue: number;
  scoreValue: number;
  enum: ENoteAccuracy;
}

interface INotesAccuracyArray {
  object: NoteAccuracy;
  createdTime: number;
}

interface INoteTypeAndCount {
  noteType: string;
  count: number;
}

interface IHitPosition {
  scene: Phaser.Scene;
  hitPositionDistance: number;
}

interface IScoreBar {
  scene: Phaser.Scene;
  scoreManager: Score;
}

export {
  ENoteAccuracy,
  INoteAccuracy,
  INotesAccuracyArray,
  INoteTypeAndCount,
  IHitPosition,
  IScoreBar,
};
