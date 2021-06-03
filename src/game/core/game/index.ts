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
import { ENoteAccuracy } from '../../interfaces/note.interface';

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

    this.generateNotes();

    this.gameState = EGameState.playing;

    this.startTime = Date.now();
  }

  generateNotes(): void {
    const width: number = this.scene.game.canvas.width;
    this.beatmap.notes.map((note, index) => {
      setTimeout(() => {
        if (note.direction === 'double') {
          const newNoteTop = new HitNote({
            scene: this.scene,
            x: width + Number(this.hitPosition),
            y: 350,
            texture: 'hitNoteTop',
          });
          const newNoteBottom = new HitNote({
            scene: this.scene,
            x: width + Number(this.hitPosition),
            y: 650,
            texture: 'hitNoteBottom',
          });
          this.notesObject = [...this.notesObject, newNoteTop, newNoteBottom];
          return;
        }

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

  update(): void {
    this.notesObject.map((note) => {
      note.updatePosition(this.scrollSpeed);
    });
  }
}
