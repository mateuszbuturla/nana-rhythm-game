import { HitNote } from '../objects/game/hitNote';
import { HitPosition } from '../objects/game/hitPosition';
import { NoteAccuracy } from '../objects/game/noteAccuracy';
import {
  ENoteAccuracy,
  INotesAccuracyArray,
} from '../interfaces/noteAccuracy.interface';
import { noteAccuracyConfig } from '../config/noteAccuracyConfig';
import { calculateNoteAccuracy } from '../core/accuracy';
import { Score } from '../core/score';
import { getHittedNotes } from '../redux/mapResult';
import { getCurrentMap } from '../redux/currentMap';
import { IMap } from '../interfaces/map.interface';
import hitNoteTop from '../../../assets/skin/hitNoteTop.png';
import hitNoteBottom from '../../../assets/skin/hitNoteBottom.png';
import hitPositionBottom from '../../../assets/skin/hitPositionBottom.png';
import hitPositionTop from '../../../assets/skin/hitPositionTop.png';
import { getUserConfig } from '../redux/userConfig';
import background from '../../../assets/backgrounds/bg.png';
import gradient from '../../../assets/ui/gradient.png';
import { UiBackground } from '../objects/ui/uiBackground';
import { ScoreBar } from '../objects/game/scoreBar';
import hitSound from '../../../assets/sounds/hitSound.ogg';
import { Audio } from '../core/audio';
import music1 from '../../../assets/sounds/music.mp3';
import music2 from '../../../assets/sounds/music2.mp3';
import { Game } from '../core/game';
import store from '../redux/store';

export class GameField extends Phaser.Scene {
  keyboard: any;
  notesObject: HitNote[] = [];
  scrollSpeed: number = 10;
  hitPositionDistance: number;
  startTime: number = 0;
  notesAccuracy: INotesAccuracyArray[] = [];
  breakAfterLastNote: number = 3000;
  currentMap: IMap;
  score: Score;
  gameBackground: UiBackground;
  scoreBar: ScoreBar;
  hitPosition: HitPosition;
  audio: Audio;
  _game: Game;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('background', background);
    this.load.image('gradient', gradient);
    this.load.image('hitNoteTop', hitNoteTop);
    this.load.image('hitNoteBottom', hitNoteBottom);
    this.load.image('hitPositionTop', hitPositionTop);
    this.load.image('hitPositionBottom', hitPositionBottom);
    this.load.audio('hitSound', hitSound);
    this.load.audio('music1', music1);
    this.load.audio('music2', music2);

    this.currentMap = store.getState().currentMap.currentMap;
  }

  create(): void {
    this.startTime = Date.now();
    this.keyboard = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
    });
    this.gameBackground = new UiBackground({
      scene: this,
      background: 'background',
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
