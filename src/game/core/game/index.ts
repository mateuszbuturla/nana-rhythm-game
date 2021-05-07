import { UserConfig } from '../userConfig/index';
import { SceneTransition } from './../../objects/ui/sceneTransition';
import { HitPosition } from './../../objects/game/hitPosition';
import { HitNote } from './../../objects/game/hitNote/index';
import { IGame } from '../../interfaces/game.interface';
import { IMap } from '../../interfaces/map.interface';
import { Audio } from '../audio';
import { noteAccuracyConfig } from '../../config/noteAccuracyConfig';
import { calculateNoteAccuracy } from '../accuracy';
import store from '../../redux/store';
import { Score } from '../score';
import {
  ENoteAccuracy,
  INotesAccuracyArray,
} from '../../interfaces/noteAccuracy.interface';
import { NoteAccuracy } from '../../objects/game/noteAccuracy';
import { BeatmapTimer } from './../../objects/game/beatmapTimer';
import { Health } from '../health';
import { LoseScreen } from '../../objects/loseScreen';
import { EGameState } from '../../enums/game.enum';
import { fallAnimation } from '../../animations/fall.animation';
import { IIserConfig } from '../../interfaces/userConfig.interface';

export class Game {
  keyboard: any;
  scene: Phaser.Scene;
  breakBeforeTakeOff: number = 3000;
  breakAfterLastNote: number = 1500;
  scrollSpeed: number = 10;
  beatmap: IMap;
  audio: Audio;
  notesObject: HitNote[] = [];
  hitPosition: number = 0;
  startTime: number = 0;
  score: Score;
  notesAccuracy: INotesAccuracyArray[] = [];
  hitPositionObj: HitPosition;
  isLoadingResultScrean: boolean = false;
  totalBeatmapTime: number;
  beatmapTimer: BeatmapTimer;
  transition: SceneTransition;
  health: Health;
  loseScreen: LoseScreen;
  gameState: EGameState;
  userConfig: any;

  constructor(aParams: IGame) {
    this.scene = aParams.scene;
    this.beatmap = aParams.beatmap;

    this.initGameField();
  }

  initGameField() {
    const width: number = this.scene.game.canvas.width;
    this.audio = new Audio({
      scene: this.scene,
      beatmapMusic: `beatmapAudio${this.beatmap.beatmapid}`,
      hitsounds: true,
    });
    this.score = new Score();
    this.userConfig = new UserConfig().getUserConfig();
    this.hitPosition = this.userConfig.hitPosition;
    this.totalBeatmapTime =
      this.beatmap.notes[this.beatmap.notes.length - 1].delay +
      this.breakBeforeTakeOff +
      this.breakAfterLastNote;

    this.beatmapTimer = new BeatmapTimer({ scene: this.scene });

    this.hitPositionObj = new HitPosition({
      scene: this.scene,
      hitPositionDistance: this.hitPosition,
    });

    this.keyboard = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
    });

    this.health = new Health({
      scene: this.scene,
      healthDrain: 30,
    });

    this.transition = new SceneTransition({
      scene: this.scene,
      isShow: true,
    });
    this.transition.show();

    this.generateNotes();

    this.loseScreen = new LoseScreen(this.scene);

    this.gameState = EGameState.playing;

    this.startTime = Date.now();

    setTimeout(() => {
      this.audio.playMusic();
    }, this.breakBeforeTakeOff + 500);
  }

  generateNotes(): void {
    const width: number = this.scene.game.canvas.width;
    this.beatmap.notes.map((note, index) => {
      setTimeout(() => {
        const newNote = new HitNote({
          scene: this.scene,
          x: width + this.hitPosition,
          y: note.direction === 'up' ? 350 : 650,
          texture: note.direction === 'up' ? 'hitNoteTop' : 'hitNoteBottom',
        });
        this.notesObject = [...this.notesObject, newNote];
      }, note.delay - width / this.scrollSpeed);
    });
  }

  createNoteAccuracy(direction: 'up' | 'down', type: ENoteAccuracy) {
    const noteAccuracy = new NoteAccuracy({
      scene: this.scene,
      x: this.hitPosition,
      y: direction === 'up' ? 350 : 650,
      text: noteAccuracyConfig.accuracy[type].text,
      color: noteAccuracyConfig.accuracy[type].color,
    });
    this.notesAccuracy = [
      ...this.notesAccuracy,
      { object: noteAccuracy, createdTime: Date.now() },
    ];
  }

  handleNoteClick(): void {
    const width: number = this.scene.game.canvas.width;
    const time = Date.now() - (this.startTime + this.breakBeforeTakeOff);

    if (this.startTime !== 0) {
      const hittedNotes = store.getState().mapResult.hittedNotes;
      this.beatmap.notes.map((note, index) => {
        if (
          time - noteAccuracyConfig.hitTime / 2 < note.delay &&
          time + noteAccuracyConfig.hitTime / 2 > note.delay &&
          hittedNotes[index] === undefined
        ) {
          switch (note.direction) {
            case 'up':
              if (this.keyboard.up.isDown) {
                const accuracy = calculateNoteAccuracy(note.delay, time);
                this.audio.playHitsound();
                this.createNoteAccuracy('up', accuracy);
                this.score.addHittedNotes(accuracy);
                this.score.increaseCombo();
                this.health.increaseHealth(accuracy);
              }
              break;
            case 'down':
              if (this.keyboard.down.isDown) {
                const accuracy = calculateNoteAccuracy(note.delay, time);
                this.audio.playHitsound();
                this.createNoteAccuracy('down', accuracy);
                this.score.addHittedNotes(accuracy);
                this.score.increaseCombo();
                this.health.increaseHealth(accuracy);
              }
              break;
            default:
              break;
          }
        } else if (
          time > note.delay + noteAccuracyConfig.hitTime / 2 &&
          hittedNotes[index] === undefined
        ) {
          this.createNoteAccuracy(note.direction, ENoteAccuracy.Miss);
          this.score.addHittedNotes(ENoteAccuracy.Miss);
          this.score.breakCombo();
          this.health.decrementHealth();
        }
      });
    }
  }

  update(): void {
    if (
      !this.health.checkIfIsAliver() &&
      this.gameState === EGameState.playing
    ) {
      this.gameState = EGameState.lose;
      this.audio.stopMusic();
      this.loseScreen.show();
      this.notesObject.map((note) => {
        fallAnimation(this.scene, note);
      });
      fallAnimation(this.scene, this.hitPositionObj);
      fallAnimation(this.scene, this.health.getHealthBar());
    } else if (this.gameState === EGameState.playing) {
      this.handleNoteClick();
      this.beatmapTimer.updateTimer(this.startTime, this.totalBeatmapTime);
      this.notesObject.map((note) => {
        note.updatePosition(this.scrollSpeed);
      });

      if (
        store.getState().mapResult.hittedNotes.length ===
          this.beatmap.notes.length &&
        !this.isLoadingResultScrean
      ) {
        this.isLoadingResultScrean = true;
        setTimeout(() => {
          this.audio.stopMusic();
          this.transition.hide(() => {
            this.scene.scene.start('ResultScene');
          });
        }, this.breakAfterLastNote);
      }
    }

    this.notesAccuracy.map((noteAccuracy, index) => {
      noteAccuracy.object.updatePosition();
      if (Date.now() - noteAccuracy.createdTime > noteAccuracyConfig.lifeTime) {
        noteAccuracy.object.destroy();
        this.notesAccuracy.splice(index, 1);
      }
    });
  }
}
