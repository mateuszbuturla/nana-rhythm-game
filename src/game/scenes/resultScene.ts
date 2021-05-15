import { Text } from '../objects/basic/text';
import { calculateOveralAccuracy } from '../core/accuracy';
import {
  getCombo,
  getHittedNotes,
  setCombo,
  setHittedNotes,
} from '../redux/mapResult';
import { getCurrentMap } from '../redux/currentMap';
import {
  calculateCurrentScore,
  getCountOfHittedNotesFromType,
} from '../core/score';
import { LabelValue } from '../objects/ui/labelValue';
import { ENoteAccuracy } from '../interfaces/note.interface';
import { noteAccuracyConfig } from '../config/noteAccuracyConfig';
import { UiBackground } from '../objects/ui/uiBackground';
import background from '../../../assets/backgrounds/bg.png';
import gradient from '../../../assets/ui/gradient.png';
import backButton from '../../../assets/ui/backButton.png';
import backButtonDecoration from '../../../assets/ui/backButtonDecoration.png';
import { TopBar } from '../objects/ui/topBar';
import store from '../redux/store';
import { SceneTransition } from '../objects/ui/sceneTransition';
import { Replay } from '../core/replay';
import { IBeatmap } from '../interfaces/beatmap.interface';

export class ResultScene extends Phaser.Scene {
  background: UiBackground;
  mark: Text;
  score: LabelValue;
  accuracy: LabelValue;
  perfect: LabelValue;
  good: LabelValue;
  bad: LabelValue;
  miss: LabelValue;
  maxCombo: LabelValue;
  topBar: TopBar;
  transition: SceneTransition;
  replay: Replay;

  constructor() {
    super({ key: 'ResultScene' });
  }

  preload(): void {
    this.scene.stop('MainScene');
    this.load.image('background', background);
    this.load.image('gradient', gradient);
    this.load.image('backButton', backButton);
    this.load.image('backButtonDecoration', backButtonDecoration);
  }

  create(): void {
    this.preload();
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.replay = new Replay();
    this.replay.saveLocalReplay({
      avatar: '',
      nick: 'Bucik689',
      beatmapId: Number(store.getState().currentMap.currentMap.beatmapid),
      score: calculateCurrentScore(getHittedNotes()),
      accuracy: calculateOveralAccuracy(getHittedNotes()),
      perfectCount: getCountOfHittedNotesFromType(
        ENoteAccuracy.Perfect,
        getHittedNotes(),
      ),
      goodCount: getCountOfHittedNotesFromType(
        ENoteAccuracy.Good,
        getHittedNotes(),
      ),
      badCount: getCountOfHittedNotesFromType(
        ENoteAccuracy.Bad,
        getHittedNotes(),
      ),
      missCount: getCountOfHittedNotesFromType(
        ENoteAccuracy.Miss,
        getHittedNotes(),
      ),
      maxCombo: getCombo().maxCombo,
    });

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
      fontFamily: 'GoodTimes',
    });

    this.score = new LabelValue({
      scene: this,
      x: width / 2 - 300,
      y: height / 3 + 200,
      label: 'Score',
      value: `${calculateCurrentScore(getHittedNotes())}`,
      color: 'white',
      labelFontSize: '44px',
      valueFontSize: '95px',
      margin: 100,
    });
    this.accuracy = new LabelValue({
      scene: this,
      x: width / 2 + 300,
      y: height / 3 + 200,
      label: 'Accuracy',
      value: `${calculateOveralAccuracy(getHittedNotes())}%`,
      color: 'white',
      labelFontSize: '44px',
      valueFontSize: '95px',
      margin: 100,
    });

    this.perfect = new LabelValue({
      scene: this,
      x: width / 2 - 600,
      y: height / 3 + 400,
      label: 'Perfect',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Perfect,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Perfect.color,
      labelFontSize: '44px',
      valueFontSize: '95px',
      margin: 100,
    });

    this.good = new LabelValue({
      scene: this,
      x: width / 2 - 300,
      y: height / 3 + 400,
      label: 'Good',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Good,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Good.color,
      labelFontSize: '44px',
      valueFontSize: '95px',
      margin: 100,
    });

    this.bad = new LabelValue({
      scene: this,
      x: width / 2,
      y: height / 3 + 400,
      label: 'Bad',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Bad,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Bad.color,
      labelFontSize: '44px',
      valueFontSize: '95px',
      margin: 100,
    });

    this.miss = new LabelValue({
      scene: this,
      x: width / 2 + 300,
      y: height / 3 + 400,
      label: 'Miss',
      value: `${getCountOfHittedNotesFromType(
        ENoteAccuracy.Miss,
        getHittedNotes(),
      )}`,
      color: noteAccuracyConfig.accuracy.Miss.color,
      labelFontSize: '44px',
      valueFontSize: '95px',
      margin: 100,
    });

    this.maxCombo = new LabelValue({
      scene: this,
      x: width / 2 + 600,
      y: height / 3 + 400,
      label: 'Max combo',
      value: `${getCombo().maxCombo}x`,
      color: 'white',
      labelFontSize: '44px',
      valueFontSize: '95px',
      margin: 100,
    });

    this.topBar = new TopBar({
      scene: this,
      onBackClick: () => {
        this.scene.start('SongSelection');
      },
    });

    this.transition = new SceneTransition({
      scene: this,
      isShow: true,
    });
    this.transition.show();
  }

  update(): void {
    this.topBar.update();
  }
}
