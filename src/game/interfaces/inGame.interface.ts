import { NoteAccuracy } from '../objects/game/noteAccuracy';
import { Score } from '../core/score';
import { ENoteAccuracy } from './note.interface';

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

interface IHitPosition {
  scene: Phaser.Scene;
  hitPositionDistance: number;
}

interface IScoreBar {
  scene: Phaser.Scene;
  scoreManager: Score;
}

export { INoteAccuracy, IHitPosition, INotesAccuracyArray, IScoreBar };
