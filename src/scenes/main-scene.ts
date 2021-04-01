import { Logo } from '../objects/logo';
import { INote } from '../interfaces/note.interface';

export class MainScene extends Phaser.Scene {
  logo: Logo;
  keyboard: any;
  notes: INote[];
  hittedNotes: number[] = [];
  timer: number = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('logo', '../assets/logo.png');
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
  }

  handleNoteClick(): void {
    const time = this.timer;

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

  renderNotes(): void {}

  updateTimer(): void {
    this.timer = this.game.loop.time;
  }

  update(): void {
    this.updateTimer();
    this.renderNotes();
    this.handleNoteClick();
  }
}
