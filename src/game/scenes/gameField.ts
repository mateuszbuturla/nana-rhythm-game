import { HitNote } from '../objects/game/hitNote';
import { HitPosition } from '../objects/game/hitPosition';
import { NoteAccuracy } from '../objects/game/noteAccuracy';
import {
  ENoteAccuracy,
  INotesAccuracyArray,
} from '../interfaces/noteAccuracy.interface';
import { noteAccuracyConfig } from '../config/noteAccuracyConfig';
import {
  calculateNoteAccuracy,
  calculateOveralAccuracy,
} from '../core/accuracy';
import { Text } from '../objects/basic/text';
import { calculateCurrentScore, Score } from '../core/score';
import store from '../redux/store';
import { addHittedNote, getHittedNotes } from '../redux/mapResult';
import { getCurrentMap } from '../redux/currentMap';
import { IMap } from '../interfaces/map.interface';
import hitNote from '../../../assets/skin/hitNote.png';
import hitPosition from '../../../assets/skin/hitPosition.png';
import { getUserConfig } from '../redux/userConfig';

export class GameField extends Phaser.Scene {
  keyboard: any;
  notesObject: HitNote[] = [];
  scrollSpeed: number = 10;
  hitPosition: number;
  startTime: number = 0;
  notesAccuracy: INotesAccuracyArray[] = [];
  accuracyText: any;
  scoreText: any;
  breakAfterLastNote: number = 3000;
  currentMap: IMap;
  score: Score;
  comboObject: Text;
  maxComboObject: Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('hitNote', hitNote);
    this.load.image('hitPosition', hitPosition);

    this.currentMap = getCurrentMap();
    this.score = new Score();
    this.hitPosition = getUserConfig().hitPosition;
  }

  create(): void {
    this.keyboard = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
    });
    this.renderNotes();
    this.startTime = Date.now();
    const newHitPositionUp = new HitPosition({
      scene: this,
      x: this.hitPosition,
      y: 150,
    });
    const newHitPositionDown = new HitPosition({
      scene: this,
      x: this.hitPosition,
      y: 250,
    });
    this.scoreText = new Text({
      scene: this,
      x: 500,
      y: 50,
      text: '0',
    });
    this.accuracyText = new Text({
      scene: this,
      x: 500,
      y: 75,
      text: '0',
    });
    this.comboObject = new Text({
      scene: this,
      x: 100,
      y: 400,
      text: `combo ${this.score.getCombo().combo}`,
    });
    this.maxComboObject = new Text({
      scene: this,
      x: 100,
      y: 450,
      text: `max combo ${this.score.getCombo().maxCombo}`,
    });
  }

  updateScoreUi() {
    this.comboObject.text = `combo: ${this.score.getCombo().combo}`;
    this.maxComboObject.text = `max combo: ${this.score.getCombo().maxCombo}`;
  }

  createNoteAccuracy(direction: 'up' | 'down', type: ENoteAccuracy) {
    if (!getUserConfig().showNoteAccuracy) {
      return;
    }

    if (type === ENoteAccuracy.Perfect && !getUserConfig().showPerfectHit) {
      return;
    }

    const noteAccuracy = new NoteAccuracy({
      scene: this,
      x: this.hitPosition,
      y: direction === 'up' ? 150 : 250,
      text: noteAccuracyConfig.accuracy[type].text,
      color: noteAccuracyConfig.accuracy[type].color,
    });
    this.notesAccuracy = [
      ...this.notesAccuracy,
      { object: noteAccuracy, createdTime: Date.now() },
    ];
  }

  handleNoteClick(): void {
    const time =
      Date.now() -
      this.startTime -
      (this.game.renderer.width * this.scrollSpeed) / 6;

    this.currentMap.notes.map((note, index) => {
      if (
        time - noteAccuracyConfig.hitTime / 2 < note.delay &&
        time + noteAccuracyConfig.hitTime / 2 > note.delay &&
        getHittedNotes()[index] === undefined
      ) {
        switch (note.direction) {
          case 'up':
            if (this.keyboard.up.isDown) {
              const accuracy = calculateNoteAccuracy(note.delay, time);

              this.createNoteAccuracy('up', accuracy);
              store.dispatch(addHittedNote(accuracy));
              this.score.increaseCombo();
              this.updateScoreUi();
            }
            break;
          case 'down':
            if (this.keyboard.down.isDown) {
              const accuracy = calculateNoteAccuracy(note.delay, time);
              this.createNoteAccuracy('down', accuracy);
              store.dispatch(addHittedNote(accuracy));
              this.score.increaseCombo();
              this.updateScoreUi();
            }
            break;
          default:
            break;
        }
      } else if (
        time > note.delay + noteAccuracyConfig.hitTime / 2 &&
        getHittedNotes()[index] === undefined
      ) {
        this.createNoteAccuracy(note.direction, ENoteAccuracy.Miss);
        store.dispatch(addHittedNote(ENoteAccuracy.Miss));
        this.score.breakCombo();
      }
    });
  }

  renderNotes(): void {
    this.currentMap.notes.map((note) => {
      const newNote = new HitNote({
        scene: this,
        x:
          (note.delay / 1000) * (60 * this.scrollSpeed) +
          this.hitPosition +
          this.game.renderer.width,
        y: note.direction === 'up' ? 150 : 250,
        texture: 'hitNote',
      });
      this.notesObject = [...this.notesObject, newNote];
    });
  }

  update(): void {
    this.handleNoteClick();
    this.notesObject.map((note) => {
      note.updatePosition(this.scrollSpeed);
    });
    this.notesAccuracy.map((noteAccuracy, index) => {
      noteAccuracy.object.updatePosition();
      if (Date.now() - noteAccuracy.createdTime > noteAccuracyConfig.lifeTime) {
        noteAccuracy.object.destroy();
        this.notesAccuracy.splice(index, 1);
      }
    });
    this.accuracyText.text = `${calculateOveralAccuracy(getHittedNotes())}%`;
    this.scoreText.text = calculateCurrentScore(getHittedNotes());
    if (
      Date.now() - this.startTime >
      this.currentMap.notes[this.currentMap.notes.length - 1].delay +
        this.breakAfterLastNote
    ) {
      this.scene.start('ResultScene');
    }
  }
}
