import { IReplayStats } from '../../../interfaces/replayStats.interface';

export class ReplayStats extends Phaser.GameObjects.Container {
  backgroundDimObject: Phaser.GameObjects.Rectangle;

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

    this.add(this.backgroundDimObject);
  }
}
