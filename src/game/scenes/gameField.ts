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
import { addHittedNote, getHittedNotes, setCombo } from '../redux/mapResult';
import { getCurrentMap } from '../redux/currentMap';
import { IMap } from '../interfaces/map.interface';
import hitNoteTop from '../../../assets/skin/hitNoteTop.png';
import hitNoteBottom from '../../../assets/skin/hitNoteBottom.png';
import hitPositionBottom from '../../../assets/skin/hitPositionBottom.png';
import hitPositionTop from '../../../assets/skin/hitPositionTop.png';
import { getUserConfig } from '../redux/userConfig';
import background from '../../../assets/backgrounds/bg.png';
import gradient from '../../../assets/ui/gradient.png';
import { Image } from '../objects/basic/image';
import { GameBackground } from '../objects/game/gameBackground';

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
  gameBackground: GameBackground;

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

    this.currentMap = getCurrentMap();
    this.score = new Score();
    this.hitPosition = getUserConfig().hitPosition;
  }

  create(): void {
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.keyboard = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
    });
    this.gameBackground = new GameBackground(this, 'background');
    const newHitPositionUp = new HitPosition({
      scene: this,
      x: this.hitPosition,
      y: 150,
      texture: 'hitPositionTop',
    });
    this.renderNotes();
    this.startTime = Date.now();
    const newHitPositionDown = new HitPosition({
      scene: this,
      x: this.hitPosition,
      y: 450,
      texture: 'hitPositionBottom',
    });
    this.scoreText = new Text({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height - 160,
      text: '0',
      fontSize: '86px',
      color: 'white',
      align: 'center',
    });
    this.accuracyText = new Text({
      scene: this,
      x: (this.game.canvas.width / 4) * 3,
      y: this.game.canvas.height - 160,
      text: '100%',
      fontSize: '86px',
      color: 'white',
      align: 'center',
    });
    this.comboObject = new Text({
      scene: this,
      x: this.game.canvas.width / 4,
      y: this.game.canvas.height - 160,
      text: `${this.score.getCombo().combo}x`,
      fontSize: '86px',
      color: 'white',
      align: 'center',
    });
  }

  updateScoreUi() {
    this.comboObject.text = `${this.score.getCombo().combo}x`;
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
              this.updateScoreUi();
            }
            break;
          case 'down':
            if (this.keyboard.down.isDown) {
              const accuracy = calculateNoteAccuracy(note.delay, time);
              this.createNoteAccuracy('down', accuracy);
              this.score.addHittedNotes(accuracy);
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
        this.score.addHittedNotes(ENoteAccuracy.Miss);
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
