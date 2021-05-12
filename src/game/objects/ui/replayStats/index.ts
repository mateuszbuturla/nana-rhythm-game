import { IReplayStats } from '../../../interfaces/replayStats.interface';

export class ReplayStats extends Phaser.GameObjects.Container {
  constructor(aParams: IReplayStats) {
    super(aParams.scene, aParams.x, aParams.y);

    this.scene.add.existing(this);
  }
}
