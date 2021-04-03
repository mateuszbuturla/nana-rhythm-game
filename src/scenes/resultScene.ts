import { Text } from '../objects/text';
import { calculateOveralAccuracy } from '../core/accuracy';
import { getHittedNotes } from '../redux/mapResult';
import {
  calculateCurrentScore,
  getAllTypesAndCoundHittedNotes,
} from '../core/score';

export class ResultScene extends Phaser.Scene {
  text: Text;
  accuracy: Text;
  score: Text;
  notesTypeAndCount: Text[] = [];

  constructor() {
    super({ key: 'ResultScene' });
  }

  preload(): void {}

  create(): void {
    this.preload();
    this.text = new Text({
      scene: this,
      x: 100,
      y: 50,
      text: 'Result',
    });
    this.accuracy = new Text({
      scene: this,
      x: 100,
      y: 100,
      text: `Accuracy: ${calculateOveralAccuracy(getHittedNotes())}%`,
    });
    this.score = new Text({
      scene: this,
      x: 100,
      y: 150,
      text: `Score: ${calculateCurrentScore(getHittedNotes())}`,
    });
    getAllTypesAndCoundHittedNotes(getHittedNotes()).map((note, index) => {
      const newNoteAndCount = new Text({
        scene: this,
        x: 100,
        y: 200 + index * 50,
        text: `${note.noteType}: ${note.count}`,
      });
      this.notesTypeAndCount = [...this.notesTypeAndCount, newNoteAndCount];
    });
  }
}
