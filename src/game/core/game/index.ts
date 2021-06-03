import { UserConfig } from '../userConfig/index';
import { SceneTransition } from './../../objects/ui/sceneTransition';
import { HitPosition } from './../../objects/game/hitPosition';
import { HitNote } from './../../objects/game/hitNote/index';
import { IGame } from '../../interfaces/game.interface';
import { IBeatmap } from '../../interfaces/beatmap.interface';
import { Audio } from '../audio';
import { noteAccuracyConfig } from '../../config/noteAccuracyConfig';
import { calculateNoteAccuracy } from '../accuracy';
import store from '../../redux/store';
import { Score } from '../score';
import { INotesAccuracyArray } from '../../interfaces/simpleGameComponents.interface';
import { NoteAccuracy } from '../../objects/game/noteAccuracy';
import { BeatmapTimer } from './../../objects/game/beatmapTimer';
import { Health } from '../health';
import { LoseScreen } from '../../objects/loseScreen';
import { EGameState } from '../../enums/game.enum';
import { fallAnimation } from '../../animations/fall.animation';
import {
  ENoteAccuracy,
  INote,
  TDirection,
} from '../../interfaces/note.interface';

interface ITest {
  up: INote[];
  down: INote[];
}

export class Game {
  keyboard: any;
  scene: Phaser.Scene;
  scrollSpeed: number = 10;
  beatmap: IBeatmap;
  notesObject: HitNote[] = [];
  hitPosition: number = 0;
  startTime: number = 0;
  hitPositionObj: HitPosition;
  gameState: EGameState;
  userConfig: any;
  isHoldingTop: boolean = false;
  isHoldingDown: boolean = false;
  hits = {
    perfect: 0,
    good: 0,
    bad: 0,
    miss: 0,
  };
  notes: ITest = {
    up: [],
    down: [],
  };
  noteIndex: { up: number; down: number } = {
    up: 0,
    down: 0,
  };
  canClick: {
    up: boolean;
    down: boolean;
  } = {
    up: true,
    down: true,
  };

  constructor(aParams: IGame) {
    this.scene = aParams.scene;
    this.beatmap = aParams.beatmap;

    this.initGameField();
  }

  initGameField() {
    const width: number = this.scene.game.canvas.width;
    this.userConfig = new UserConfig().getUserConfig();
    this.hitPosition = this.userConfig.hitPosition;

    this.hitPositionObj = new HitPosition({
      scene: this.scene,
      hitPositionDistance: this.hitPosition,
    });

    this.keyboard = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
    });

    this.setupKeys();

    this.generateNotes();

    this.gameState = EGameState.playing;

    this.startTime = Date.now();
  }

  generateNotes(): void {
    const width: number = this.scene.game.canvas.width;
    this.beatmap.notes.map((note, index) => {
      note.direction === 'up'
        ? (this.notes.up = [...this.notes.up, note])
        : (this.notes.down = [...this.notes.down, note]);

      setTimeout(() => {
        const newNote = new HitNote({
          scene: this.scene,
          x: width + Number(this.hitPosition),
          y: note.direction === 'up' ? 350 : 650,
          texture: note.direction === 'up' ? 'hitNoteTop' : 'hitNoteBottom',
        });
        this.notesObject = [...this.notesObject, newNote];
      }, Number(note.delay) - width / this.scrollSpeed);
    });
  }

  setupKeys(): void {
    this.keyboard = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
    });
  }

  handleNoteClick(direction: TDirection): void {
    const timeInSecond = (Date.now() - this.startTime) / 1000;
    const nextNote = this.notes[direction][this.noteIndex[direction]];
    const accuracy = Math.abs(timeInSecond - nextNote.delay);

    const hitJudgement = this.getHitJudgment(accuracy);

    console.log(this.notes[direction][this.noteIndex[direction]]);

    // console.log(timeInSecond, nextNote.delay);
    // console.log(accuracy);
    // console.log(hitJudgement);
  }

  updateNextNote(direction: TDirection): void {
    this.noteIndex[direction]++;
  }

  getHitJudgment(accuracy: number): ENoteAccuracy {
    if (accuracy < 0.1) {
      return ENoteAccuracy.Perfect;
    } else if (accuracy < 0.2) {
      return ENoteAccuracy.Good;
    } else if (accuracy < 0.3) {
      return ENoteAccuracy.Bad;
    } else {
      return ENoteAccuracy.Miss;
    }
  }

  handleKeyboardClick(): void {
    if (this.keyboard.up.isDown && this.canClick['up']) {
      this.canClick['up'] = false;
      this.handleNoteClick('up');
    } else if (!this.keyboard.up.isDown) {
      this.canClick['up'] = true;
    }
    if (this.keyboard.down.isDown && this.canClick['down']) {
      this.canClick['down'] = false;
      this.handleNoteClick('down');
    } else if (!this.keyboard.down.isDown) {
      this.canClick['down'] = true;
    }
  }

  update(): void {
    this.handleKeyboardClick();
    this.notesObject.map((note) => {
      note.updatePosition(this.scrollSpeed);
    });
  }
}
