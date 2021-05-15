import { Text } from './../../basic/text/index';
import { IReplayStats } from '../../../interfaces/replay.interface';
import { Image } from '../../basic/image';
import { LabelValue } from '../labelValue';
import { noteAccuracyConfig } from '../../../config/noteAccuracyConfig';
import { easeInOutExpo } from '../../../utils/eases';
import { IReplayData } from '../../../interfaces/replay.interface';

export class ReplayStats extends Phaser.GameObjects.Container {
  backgroundDimObject: Phaser.GameObjects.Rectangle;
  backgroundObject: Image;
  markObject: Text;
  scoreObject: Text;
  accuracyObject: Text;
  perfectCountObject: LabelValue;
  goodCountObject: LabelValue;
  badCountObject: LabelValue;
  missCountObject: LabelValue;
  maxComboObject: LabelValue;
  isActive: Boolean;

  constructor(aParams: IReplayStats) {
    super(aParams.scene, aParams.x, aParams.y);
    this.isActive = aParams.active ? true : false;
    this.createReplayStats(aParams);
    this.scene.add.existing(this);
  }

  createReplayStats(aParams: IReplayStats): void {
    this.backgroundDimObject = this.scene.add.rectangle(
      0,
      0,
      1920,
      1080,
      0x000000,
    );
    this.backgroundDimObject.setOrigin(0);
    this.backgroundDimObject.alpha = 0.8;

    this.backgroundObject = new Image({
      scene: this.scene,
      x: 1920 / 2,
      y: 1080 / 2,
      texture: 'replayStatsBackground',
    });
    this.backgroundObject.setOrigin(0.5, 0.5);

    this.markObject = new Text({
      scene: this.scene,
      x: this.backgroundObject.x,
      y: 288,
      text: aParams.mark,
      fontSize: '300px',
      color: '#89FF01',
    });
    this.markObject.setOrigin(0.5, 0);

    this.scoreObject = new Text({
      scene: this.scene,
      x: this.backgroundObject.x - 390,
      y: this.backgroundObject.y + 50,
      text: String(aParams.score),
      fontSize: '75px',
      color: 'white',
    });
    this.scoreObject.setOrigin(0, 0);

    this.accuracyObject = new Text({
      scene: this.scene,
      x: this.backgroundObject.x + 390,
      y: this.backgroundObject.y + 50,
      text: `${aParams.accuracy}%`,
      fontSize: '75px',
      color: 'white',
    });
    this.accuracyObject.setOrigin(1, 0);

    this.perfectCountObject = new LabelValue({
      scene: this.scene,
      x: this.backgroundObject.x - 260,
      y: this.backgroundObject.y + 150,
      label: 'PERFECT',
      value: String(aParams.perfectCount),
      color: noteAccuracyConfig.accuracy.Perfect.color,
      labelFontSize: '22px',
      valueFontSize: '81px',
      margin: 50,
    });

    this.goodCountObject = new LabelValue({
      scene: this.scene,
      x: this.backgroundObject.x - 70,
      y: this.backgroundObject.y + 150,
      label: 'GOOD',
      value: String(aParams.goodCount),
      color: noteAccuracyConfig.accuracy.Good.color,
      labelFontSize: '22px',
      valueFontSize: '81px',
      margin: 50,
    });

    this.badCountObject = new LabelValue({
      scene: this.scene,
      x: this.backgroundObject.x + 70,
      y: this.backgroundObject.y + 150,
      label: 'BAD',
      value: String(aParams.badCount),
      color: noteAccuracyConfig.accuracy.Bad.color,
      labelFontSize: '22px',
      valueFontSize: '81px',
      margin: 50,
    });

    this.missCountObject = new LabelValue({
      scene: this.scene,
      x: this.backgroundObject.x + 260,
      y: this.backgroundObject.y + 150,
      label: 'MISS',
      value: String(aParams.missCount),
      color: noteAccuracyConfig.accuracy.Miss.color,
      labelFontSize: '22px',
      valueFontSize: '81px',
      margin: 50,
    });

    this.maxComboObject = new LabelValue({
      scene: this.scene,
      x: this.backgroundObject.x,
      y: this.backgroundObject.y + 300,
      label: 'MAX COMBO',
      value: `${aParams.maxCombo}x`,
      color: 'white',
      labelFontSize: '22px',
      valueFontSize: '81px',
      margin: 50,
    });

    this.add(this.backgroundDimObject);
    this.add(this.backgroundObject);
    this.add(this.markObject);
    this.add(this.scoreObject);
    this.add(this.accuracyObject);
    this.add(this.perfectCountObject);
    this.add(this.goodCountObject);
    this.add(this.badCountObject);
    this.add(this.missCountObject);
    this.add(this.maxComboObject);

    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 1920, 1080),
      Phaser.Geom.Rectangle.Contains,
    );
    this.on('pointerdown', () => {
      this.hide();
    });

    if (!aParams.active) {
      this.setAlpha(0);
    }
  }

  hide(): void {
    this.isActive = false;
    const hideAnimation = this.scene.tweens.createTimeline();

    hideAnimation.add({
      targets: this,
      alpha: 0,
      ease: easeInOutExpo,
      duration: 1000,
    });

    hideAnimation.play();
  }

  show(): void {
    this.isActive = true;
    const showAnimation = this.scene.tweens.createTimeline();

    showAnimation.add({
      targets: this,
      alpha: 1,
      ease: easeInOutExpo,
      duration: 1000,
    });

    showAnimation.play();
  }

  setReplayData(newReplayData: IReplayData): void {
    this.markObject.text = newReplayData.mark;
    this.scoreObject.text = String(newReplayData.score);
    this.accuracyObject.text = `${newReplayData.accuracy}%`;
    this.perfectCountObject.value.text = String(newReplayData.perfectCount);
    this.goodCountObject.value.text = String(newReplayData.goodCount);
    this.badCountObject.value.text = String(newReplayData.badCount);
    this.missCountObject.value.text = String(newReplayData.missCount);
    this.maxComboObject.value.text = String(newReplayData.maxCombo);
  }
}
