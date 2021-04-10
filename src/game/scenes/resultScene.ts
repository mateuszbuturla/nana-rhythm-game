import { Text } from '../objects/basic/text';
import { calculateOveralAccuracy } from '../core/accuracy';
import { getCombo, getHittedNotes } from '../redux/mapResult';
import {
  calculateCurrentScore,
  getCountOfHittedNotesFromType,
} from '../core/score';
import { ResultLabelValue } from '../objects/ui/resultLabelValue';
import { ENoteAccuracy } from '../interfaces/noteAccuracy.interface';
import { noteAccuracyConfig } from '../config/noteAccuracyConfig';
import { UiBackground } from '../objects/ui/uiBackground';
import background from '../../../assets/backgrounds/bg.png';
import gradient from '../../../assets/ui/gradient.png';

export class ResultScene extends Phaser.Scene {
  background: UiBackground;
  mark: Text;
  score: ResultLabelValue;
  accuracy: ResultLabelValue;
  perfect: ResultLabelValue;
  good: ResultLabelValue;
  bad: ResultLabelValue;
  miss: ResultLabelValue;
  maxCombo: ResultLabelValue;

  constructor() {
    super({ key: 'ResultScene' });
  }

  preload(): void {
    this.load.image('background', background);
    this.load.image('gradient', gradient);
  }

  create(): void {
    this.preload();
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;

    this.background = new UiBackground({
      scene: this,
      background: 'background',
    });

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

    this.maxCombo = new ResultLabelValue({
      scene: this,
      x: width / 2 + 600,
      y: height / 3 + 400,
      label: 'Max combo',
      value: `${getCombo().maxCombo}x`,
      color: 'white',
    });
  }
}
