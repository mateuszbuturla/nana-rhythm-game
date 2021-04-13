import { HitNote } from './../../objects/game/hitNote/index';
import { IGame } from '../../interfaces/game.interface';
import { IMap } from '../../interfaces/map.interface';
import { Audio } from '../audio';

export class Game {
  scene: Phaser.Scene;
  breakBeforeTakeOff: number = 3000;
  scrollSpeed: number = 10;
  beatmap: IMap;
  audio: Audio;
  notesObject: HitNote[] = [];
  hitPosition: number = 0;

  constructor(aParams: IGame) {
    this.scene = aParams.scene;
    this.beatmap = aParams.beatmap;

    this.initGameField();
  }

  initGameField() {
    const width: number = this.scene.game.canvas.width;
    this.audio = new Audio({
      scene: this.scene,
      beatmapMusic: this.beatmap.music,
    });
    this.hitPosition = 100 + 100;

    this.generateNotes();

    setTimeout(() => {
      this.audio.playMusic();
    }, this.breakBeforeTakeOff);
  }

  generateNotes(): void {
    const width: number = this.scene.game.canvas.width;
    this.beatmap.notes.map((note, index) => {
      setTimeout(() => {
        const newNote = new HitNote({
          scene: this.scene,
          x: width + this.hitPosition,
          y: note.direction === 'up' ? 150 : 450,
          texture: note.direction === 'up' ? 'hitNoteTop' : 'hitNoteBottom',
        });
        this.notesObject = [...this.notesObject, newNote];
      }, note.delay + width / this.scrollSpeed);
    });
  }

  handleNoteClick(): void {}

  update(): void {
    this.notesObject.map((note) => {
      note.updatePosition(this.scrollSpeed);
    });
  }
}
