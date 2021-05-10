import { IMap } from '../interfaces/map.interface';
import { UiBackground } from '../objects/ui/uiBackground';
import { Game } from '../core/game';
import store from '../redux/store';
import hitNoteTop from '../../../assets/skin/hitNoteTop.png';
import hitNoteBottom from '../../../assets/skin/hitNoteBottom.png';
import hitPositionBottom from '../../../assets/skin/hitPositionBottom.png';
import hitPositionTop from '../../../assets/skin/hitPositionTop.png';
import background from '../../../assets/backgrounds/bg.png';
import gradient from '../../../assets/ui/gradient.png';
import hitSound from '../../../assets/sounds/hitSound.ogg';
import music1 from '../../../assets/sounds/music.mp3';
import music2 from '../../../assets/sounds/music2.mp3';
import healthBarBackground from '../../../assets/ui/healthBarBackground.png';
import healthBar from '../../../assets/ui/healthBar.png';
import { setCombo, setHittedNotes } from '../redux/mapResult';

export class GameField extends Phaser.Scene {
  currentMap: IMap;
  gameBackground: UiBackground;
  _game: Game;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.currentMap = store.getState().currentMap.currentMap;
    this.load.image('background', background);
    this.load.image('gradient', gradient);
    this.load.image('hitNoteTop', hitNoteTop);
    this.load.image('hitNoteBottom', hitNoteBottom);
    this.load.image('hitPositionTop', hitPositionTop);
    this.load.image('hitPositionBottom', hitPositionBottom);
    this.load.audio('hitSound', hitSound);
    this.load.audio('music1', music1);
    this.load.audio('music2', music2);
    this.load.image('healthBarBackground', healthBarBackground);
    this.load.image('healthBar', healthBar);
    this.load.audio(
      `beatmapAudio${this.currentMap.beatmapid}`,
      `beatmaps/${this.currentMap.beatmapid}/audio.mp3`,
    );
    this.load.image(
      `beatmapBackground${this.currentMap.beatmapid}`,
      `beatmaps/${this.currentMap.beatmapid}/background.png`,
    );
  }

  create(): void {
    store.dispatch(setHittedNotes([]));
    store.dispatch(
      setCombo({
        combo: 0,
        maxCombo: 0,
        id: Number(this.currentMap.beatmapid),
      }),
    );
    this.gameBackground = new UiBackground({
      scene: this,
      background: `beatmapBackground${this.currentMap.beatmapid}`,
    });
    this._game = new Game({
      scene: this,
      beatmap: this.currentMap,
    });
  }

  update(): void {
    this._game.update();
  }
}
