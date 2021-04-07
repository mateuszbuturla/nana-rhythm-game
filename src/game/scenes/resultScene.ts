import { Text } from '../objects/basic/text';
import { calculateOveralAccuracy } from '../core/accuracy';
import { getCombo, getHittedNotes } from '../redux/mapResult';
import {
  calculateCurrentScore,
  getAllTypesAndCoundHittedNotes,
} from '../core/score';

export class ResultScene extends Phaser.Scene {
  text: Text;
  accuracy: Text;
  score: Text;
  notesTypeAndCount: Text[] = [];
  comboObject: Text;
  maxComboObject: Text;

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
    this.comboObject = new Text({
      scene: this,
      x: 300,
      y: 100,
      text: `combo: ${getCombo().combo}`,
    });
    this.maxComboObject = new Text({
      scene: this,
      x: 300,
      y: 150,
      text: `max combo: ${getCombo().maxCombo}`,
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
