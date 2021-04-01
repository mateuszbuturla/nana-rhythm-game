import { Logo } from '../objects/logo';
import { HitNote } from '../objects/hitNote';
import { INote } from '../interfaces/note.interface';
import { HitPosition } from '../objects/hitPosition';

export class MainScene extends Phaser.Scene {
  logo: Logo;
  keyboard: any;
  notes: INote[];
  hittedNotes: number[] = [];
  notesObject: HitNote[] = [];
  scrollSpeed: number = 10;
  hitPosition: number = 100;
  startTime: number = 0;

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

  handleNoteClick(): void {
    const time =
      Date.now() -
      this.startTime -
      (this.game.renderer.width * this.scrollSpeed) / 6;

    this.notes.map((note, index) => {
      if (
        time - 250 < note.delay &&
        time + 250 > note.delay &&
        this.hittedNotes[index] === -1
      ) {
        switch (note.direction) {
          case 'up':
            if (this.keyboard.up.isDown) {
              this.hittedNotes[index] = 1;
            }
            break;
          case 'down':
            if (this.keyboard.down.isDown) {
              this.hittedNotes[index] = 1;
            }
            break;
          default:
            break;
        }
      } else if (time > note.delay + 250 && this.hittedNotes[index] === -1) {
        this.hittedNotes[index] = 0;
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
  }
}
