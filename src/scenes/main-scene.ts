import { Logo } from '../objects/logo';
import { HitNote } from '../objects/hitNote';
import { INote } from '../interfaces/note.interface';
import { HitPosition } from '../objects/hitPosition';
import { NoteAccuracy } from '../objects/noteAccuracy';
import {
  ENoteAccuracy,
  INotesAccuracyArray,
} from '../interfaces/noteAccuracy.interface';
import { noteAccuracyConfig } from '../config/noteAccuracyConfig';

export class MainScene extends Phaser.Scene {
  logo: Logo;
  keyboard: any;
  notes: INote[];
  hittedNotes: number[] = [];
  notesObject: HitNote[] = [];
  scrollSpeed: number = 10;
  hitPosition: number = 100;
  startTime: number = 0;
  notesAccuracy: INotesAccuracyArray[] = [];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('logo', '../assets/logo.png');
    this.load.image('hitNote', '../assets/skin/hitNote.png');
    this.load.image('hitPosition', '../assets/skin/hitPosition.png');
    this.notes = [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
    ];
    this.notes.map(() => {
      this.hittedNotes = [...this.hittedNotes, -1];
    });
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
  }

  createNoteAccuracy(direction: 'up' | 'down', type: ENoteAccuracy) {
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

    this.notes.map((note, index) => {
      if (
        time - 100 < note.delay &&
        time + 100 > note.delay &&
        this.hittedNotes[index] === -1
      ) {
        switch (note.direction) {
          case 'up':
            if (this.keyboard.up.isDown) {
              this.hittedNotes[index] = 1;
              this.createNoteAccuracy('up', ENoteAccuracy.Perfect);
            }
            break;
          case 'down':
            if (this.keyboard.down.isDown) {
              this.hittedNotes[index] = 1;
              this.createNoteAccuracy('down', ENoteAccuracy.Perfect);
            }
            break;
          default:
            break;
        }
      } else if (time > note.delay + 100 && this.hittedNotes[index] === -1) {
        this.hittedNotes[index] = 0;
        this.createNoteAccuracy(note.direction, ENoteAccuracy.Miss);
      }
    });
  }

  renderNotes(): void {
    this.notes.map((note) => {
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
    this.notesObject.map((note, index) => {
      note.updatePosition(this.scrollSpeed);
    });
    this.notesAccuracy.map((noteAccuracy, index) => {
      noteAccuracy.object.updatePosition();
      if (Date.now() - noteAccuracy.createdTime > noteAccuracyConfig.lifeTime) {
        noteAccuracy.object.destroy();
        this.notesAccuracy.splice(index, 1);
      }
    });
  }
}
