import { IReplayStats } from '../../../interfaces/replayStats.interface';
import { Image } from '../../basic/image';
import { Text } from '../../basic/text';
import { LabelValue } from '../labelValue';
import { noteAccuracyConfig } from '../../../config/noteAccuracyConfig';

export class ReplayStats extends Phaser.GameObjects.Container {
  backgroundDimObject: Phaser.GameObjects.Rectangle;
  backgroundObject: Image;
  markObject: Text;
  scoreObject: Text;
  accuracyObject: Text;
  perfectCountObject: LabelValue;
  goodCoungObject: LabelValue;

  constructor(aParams: IReplayStats) {
    super(aParams.scene, aParams.x, aParams.y);
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

    this.goodCoungObject = new LabelValue({
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

    this.add(this.backgroundDimObject);
    this.add(this.backgroundObject);
    this.add(this.markObject);
    this.add(this.scoreObject);
    this.add(this.accuracyObject);
    this.add(this.perfectCountObject);
    this.add(this.goodCoungObject);
  }
}
