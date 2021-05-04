import { easeInOutExpo } from './../../../utils/eases';
import { IBeatmapInfo } from '../../../interfaces/beatmapInfo.interface';
import store from '../../../redux/store';

export class BeatmapInfo extends Phaser.GameObjects.Container {
  constructor(aParams: IBeatmapInfo) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initBeatmapInfo();
    this.scene.add.existing(this);
  }

  initBeatmapInfo(): void {}
}
