import { IReplayStats } from '../../../interfaces/replayStats.interface';
import { Image } from '../../basic/image';

export class ReplayStats extends Phaser.GameObjects.Container {
  backgroundDimObject: Phaser.GameObjects.Rectangle;
  backgroundObject: Image;

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

    this.add(this.backgroundDimObject);
    this.add(this.backgroundObject);
  }
}
