import { easeInOutExpo } from './../../../utils/eases';
import { IBeatmapInfo } from '../../../interfaces/beatmapInfo.interface';
import store from '../../../redux/store';
import { IMap } from '../../../interfaces/map.interface';
import { Text } from '../../basic/text';

export class BeatmapInfo extends Phaser.GameObjects.Container {
  beatmapDifficultyBarObject: Phaser.GameObjects.Sprite;
  beatmapBackgroundObject: Phaser.GameObjects.Sprite;
  backgroundDimObject: Phaser.GameObjects.Rectangle;
  beatmapTitleObject: Text;
  beatmapArtistObject: Text;
  beatmapCreatorObject: Text;
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
    this.beatmapBackgroundObject = this.scene.add.sprite(
      0,
      0,
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
    );
    this.beatmapBackgroundObject.setOrigin(0, 0);
    this.beatmapBackgroundObject.setDisplaySize(789, 444);

    this.backgroundDimObject = this.scene.add.rectangle(
      0,
      0,
      789,
      444,
      0x000000,
    );
    this.backgroundDimObject.setOrigin(0);
    this.backgroundDimObject.alpha = 0.25;

    this.beatmapDifficultyBarObject = this.scene.add.sprite(
      0,
      0,
      this.getBeatmapDifficultyBarexture(),
    );
    this.beatmapDifficultyBarObject.setOrigin(0, 0);

    this.beatmapTitleObject = new Text({
      scene: this.scene,
      x: 40,
      y: 40,
      text: this.currentBeatmap.title,
      color: 'white',
      fontSize: '58px',
    });

    this.beatmapArtistObject = new Text({
      scene: this.scene,
      x: 40,
      y: 100,
      text: this.currentBeatmap.author,
      color: 'white',
      fontSize: '37px',
    });

    this.beatmapCreatorObject = new Text({
      scene: this.scene,
      x: 40,
      y: 147,
      text: this.currentBeatmap.creator,
      color: 'white',
      fontSize: '37px',
    });

    this.add(this.beatmapBackgroundObject);
    this.add(this.backgroundDimObject);
    this.add(this.beatmapDifficultyBarObject);
    this.add(this.beatmapTitleObject);
    this.add(this.beatmapArtistObject);
    this.add(this.beatmapCreatorObject);
  }
}