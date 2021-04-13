import { IGame } from '../../interfaces/game.interface';
import { IMap } from '../../interfaces/map.interface';
import { Audio } from '../audio';

export class Game {
  scene: Phaser.Scene;
  breakBeforeTakeOff: number = 3000;
  beatmap: IMap;
  audio: Audio;

  constructor(aParams: IGame) {
    this.scene = aParams.scene;
    this.beatmap = aParams.beatmap;

    this.initGameField();
  }

  initGameField() {
    this.audio = new Audio({
      scene: this.scene,
      beatmapMusic: this.beatmap.music,
    });

    setTimeout(() => {
      this.audio.playMusic();
    }, this.breakBeforeTakeOff);
  }

  generateNotes(): void {}

  handleNoteClick(): void {}

  update(): void {}
}
