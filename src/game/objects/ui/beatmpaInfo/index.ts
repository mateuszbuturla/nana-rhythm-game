import { easeInOutExpo } from './../../../utils/eases';
import { IBeatmapInfo } from '../../../interfaces/beatmapInfo.interface';
import store from '../../../redux/store';
import { IMap } from '../../../interfaces/map.interface';

export class BeatmapInfo extends Phaser.GameObjects.Container {
  beatmapDifficultyBarObject: Phaser.GameObjects.Sprite;
  currentBeatmap: IMap;

  constructor(aParams: IBeatmapInfo) {
    super(aParams.scene, aParams.x, aParams.y);

    this.currentBeatmap = aParams.currentBeatmap;
    this.initBeatmapInfo();
    this.scene.add.existing(this);
  }

  private getBeatmapDifficultyBarexture(): string {
    const difficulty = this.currentBeatmap.difficulty;
    switch (true) {
      case difficulty < 2:
        return 'difficultyEasy';
      case difficulty < 4 && difficulty >= 2:
        return 'difficultyMedium';
      case difficulty < 6 && difficulty >= 4:
        return 'difficultyHard';
      case difficulty < 8 && difficulty >= 6:
        return 'difficultyInsane';
      default:
        return 'difficultyImposible';
    }
  }

  initBeatmapInfo(): void {
    this.beatmapDifficultyBarObject = this.scene.add.sprite(
      0,
      0,
      this.getBeatmapDifficultyBarexture(),
    );
    this.beatmapDifficultyBarObject.setOrigin(0, 0);

    this.add(this.beatmapDifficultyBarObject);
  }
}
