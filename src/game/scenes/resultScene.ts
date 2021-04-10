import { Text } from '../objects/basic/text';
import { calculateOveralAccuracy } from '../core/accuracy';
import { getCombo, getHittedNotes } from '../redux/mapResult';
import {
  calculateCurrentScore,
  getAllTypesAndCoundHittedNotes,
  getCountOfHittedNotesFromType,
} from '../core/score';
import { ResultLabelValue } from '../objects/ui/resultLabelValue';
import { ENoteAccuracy } from '../interfaces/noteAccuracy.interface';
import { noteAccuracyConfig } from '../config/noteAccuracyConfig';

export class ResultScene extends Phaser.Scene {
  text: Text;
  notesTypeAndCount: Text[] = [];
  comboObject: Text;
  maxComboObject: Text;

  mark: Text;

  score: ResultLabelValue;
  accuracy: ResultLabelValue;
  perfect: ResultLabelValue;
  good: ResultLabelValue;
  bad: ResultLabelValue;
  miss: ResultLabelValue;

  constructor() {
    super({ key: 'ResultScene' });
  }

  preload(): void {}

  create(): void {
    this.preload();
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;

    this.mark = new Text({
      scene: this,
      x: width / 2,
      y: height / 3,
      text: 'A',
      color: 'green',
      fontSize: '350px',
      align: 'center',
      fontFamily: 'mainFontB',
    });

    // this.scoreLabel = new Text({
    //   scene: this,
    //   x: width / 2 - 300,
    //   y: height / 3 + 200,
    //   text: `Score`,
    //   color: 'white',
    //   fontSize: '44px',
    //   align: 'center',
    // });
    // this.score = new Text({
    //   scene: this,
    //   x: width / 2 - 300,
    //   y: height / 3 + 300,
    //   text: `${calculateCurrentScore(getHittedNotes())}`,
    //   color: 'white',
    //   fontSize: '95px',
    //   align: 'center',
    // });

    this.score = new ResultLabelValue({
      scene: this,
      x: width / 2 - 300,
      y: height / 3 + 200,
      label: 'Score',
      value: `${calculateCurrentScore(getHittedNotes())}`,
      color: 'white',
    });
    this.accuracy = new ResultLabelValue({
      scene: this,
      x: width / 2 + 300,
      y: height / 3 + 200,
      label: 'Accuracy',
      value: `${calculateOveralAccuracy(getHittedNotes())}%`,
      color: 'white',
    });

    this.perfect = new ResultLabelValue({
      scene: this,
      x: width / 2 - 600,
      y: height / 3 + 400,
      label: 'Perfect',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Perfect,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Perfect.color,
    });

    this.good = new ResultLabelValue({
      scene: this,
      x: width / 2 - 300,
      y: height / 3 + 400,
      label: 'Good',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Good,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Good.color,
    });

    this.bad = new ResultLabelValue({
      scene: this,
      x: width / 2,
      y: height / 3 + 400,
      label: 'Bad',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Bad,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Bad.color,
    });

    this.miss = new ResultLabelValue({
      scene: this,
      x: width / 2 + 300,
      y: height / 3 + 400,
      label: 'Miss',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Miss,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Miss.color,
    });

    // this.text = new Text({
    //   scene: this,
    //   x: 100,
    //   y: 50,
    //   text: 'Result',
    // });
    // this.accuracy = new Text({
    //   scene: this,
    //   x: 100,
    //   y: 100,sdsdsdsd
    //   text: `Accuracy: ${calculateOveralAccuracy(getHittedNotes())}%`,
    // });
    // // this.comboObject = new Text({
    //   scene: this,
    //   x: 300,
    //   y: 100,
    //   text: `combo: ${getCombo().combo}`,
    // });
    // this.maxComboObject = new Text({
    //   scene: this,
    //   x: 300,
    //   y: 150,
    //   text: `max combo: ${getCombo().maxCombo}`,
    // });
    // getAllTypesAndCoundHittedNotes(getHittedNotes()).map((note, index) => {
    //   const newNoteAndCount = new Text({
    //     scene: this,
    //     x: 100,
    //     y: 200 + index * 50,
    //     text: `${note.noteType}: ${note.count}`,
    //   });
    //   this.notesTypeAndCount = [...this.notesTypeAndCount, newNoteAndCount];
    // });
  }
}
