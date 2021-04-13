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

    this.currentMap = getCurrentMap();
    this.score = new Score();
    this.hitPositionDistance = getUserConfig().hitPosition;
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
    this.renderNotes();
    this.hitPosition = new HitPosition({
      scene: this,
      hitPositionDistance: this.hitPositionDistance,
    });
    this.scoreBar = new ScoreBar(this, this.score);
    this.audio = new Audio({
      scene: this,
      beatmapMusic: this.currentMap.music,
    });
    setTimeout(() => {
      this.audio.playMusic();
    }, 3000);
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
      x: this.hitPositionDistance,
      y: direction === 'up' ? 150 : 450,
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
              this.score.addHittedNotes(accuracy);
              this.score.increaseCombo();
              this.scoreBar.update();
              this.audio.playHitsound();
            }
            break;
          case 'down':
            if (this.keyboard.down.isDown) {
              const accuracy = calculateNoteAccuracy(note.delay, time);
              this.createNoteAccuracy('down', accuracy);
              this.score.addHittedNotes(accuracy);
              this.score.increaseCombo();
              this.scoreBar.update();
              this.audio.playHitsound();
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
        this.score.addHittedNotes(ENoteAccuracy.Miss);
        this.score.breakCombo();
        this.scoreBar.update();
      }
    });
  }

  renderNotes(): void {
    this.currentMap.notes.map((note) => {
      const newNote = new HitNote({
        scene: this,
        x:
          (note.delay / 1000) * (60 * this.scrollSpeed) +
          this.hitPositionDistance +
          this.game.renderer.width,
        y: note.direction === 'up' ? 150 : 450,
        texture: note.direction === 'up' ? 'hitNoteTop' : 'hitNoteBottom',
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
    if (
      Date.now() - this.startTime >
      this.currentMap.notes[this.currentMap.notes.length - 1].delay +
        this.breakAfterLastNote
    ) {
      this.scene.start('ResultScene');
    }
  }
}
