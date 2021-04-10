import { Text } from '../../basic/text';
import { calculateCurrentScore, Score } from '../../../core/score';
import { getHittedNotes } from '../../../redux/mapResult';
import { calculateOveralAccuracy } from '../../../core/accuracy';

export class ScoreBar extends Phaser.GameObjects.Container {
  scoreText: Text;
  accuracyText: Text;
  comboText: Text;
  scoreManager: Score;

  constructor(scene: Phaser.Scene, scoreManager: Score) {
    super(scene, 0, 0);
    this.scoreManager = scoreManager;
    this.initScoreBar();
    this.scene.add.existing(this);
  }

  initScoreBar(): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    this.scoreText = new Text({
      scene: this.scene,
      x: width / 2,
      y: height - 160,
      text: '0',
      fontSize: '86px',
      color: 'white',
      align: 'center',
    });
    this.accuracyText = new Text({
      scene: this.scene,
      x: (width / 4) * 3,
      y: height - 160,
      text: '100%',
      fontSize: '86px',
      color: 'white',
      align: 'center',
    });
    this.comboText = new Text({
      scene: this.scene,
      x: width / 4,
      y: height - 160,
      text: `0x`,
      fontSize: '86px',
      color: 'white',
      align: 'center',
    });
  }

  update(): void {
    this.scoreText.text = `${calculateCurrentScore(getHittedNotes())}`;
    this.accuracyText.text = `${calculateOveralAccuracy(getHittedNotes())}%`;
    this.comboText.text = `${this.scoreManager.getCombo().combo}x`;
  }
}
