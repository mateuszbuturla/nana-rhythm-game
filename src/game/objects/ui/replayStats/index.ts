import { IReplayStats } from '../../../interfaces/replayStats.interface';
import { Image } from '../../basic/image';
import { Text } from '../../basic/text';

export class ReplayStats extends Phaser.GameObjects.Container {
  backgroundDimObject: Phaser.GameObjects.Rectangle;
  backgroundObject: Image;
  markObject: Text;
  scoreObject: Text;

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
      x: this.backgroundObject.x - 366,
      y: this.backgroundObject.y + 50,
      text: String(aParams.score),
      fontSize: '81px',
      color: 'white',
    });
    this.scoreObject.setOrigin(0, 0);

    this.add(this.backgroundDimObject);
    this.add(this.backgroundObject);
    this.add(this.markObject);
    this.add(this.scoreObject);
  }
}
