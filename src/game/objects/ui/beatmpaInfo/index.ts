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
  beatmapDifficultyObject: Text;
  beatmapNotesCountObject: Text;
  beatmapSlidersCountObject: Text;
  beatmapBpmObject: Text;
  beatmapMaxComboObject: Text;
  currentBeatmap: IMap;

  constructor(aParams: IBeatmapInfo) {
    super(aParams.scene, aParams.x, aParams.y);

    this.currentBeatmap = aParams.currentBeatmap;
    this.initBeatmapInfo();
    this.scene.add.existing(this);
  }

  private getBeatmapDifficultyBarTexture(): string {
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
      775,
      0x000000,
    );
    this.backgroundDimObject.setOrigin(0);
    this.backgroundDimObject.alpha = 0.25;

    this.beatmapDifficultyBarObject = this.scene.add.sprite(
      0,
      0,
      this.getBeatmapDifficultyBarTexture(),
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
      text: this.currentBeatmap.creator,
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

    this.beatmapDifficultyObject = new Text({
      scene: this.scene,
      x: 40,
      y: 282,
      text: `${Number(this.currentBeatmap.difficulty)}*`,
      color: 'white',
      fontSize: '121px',
    });

    this.beatmapNotesCountObject = new Text({
      scene: this.scene,
      x: 40,
      y: 463,
      text: `${this.currentBeatmap.notes.length} Notes`,
      color: 'white',
      fontSize: '44px',
    });

    this.beatmapSlidersCountObject = new Text({
      scene: this.scene,
      x: 40,
      y: 533,
      text: `${this.currentBeatmap.notes.length} Sliders`,
      color: 'white',
      fontSize: '44px',
    });

    this.beatmapBpmObject = new Text({
      scene: this.scene,
      x: 40,
      y: 606,
      text: `${Number(this.currentBeatmap.bpm)} BPM`,
      color: 'white',
      fontSize: '44px',
    });

    this.beatmapMaxComboObject = new Text({
      scene: this.scene,
      x: 40,
      y: 679,
      text: `${Number(this.currentBeatmap.notes.length)} Max Combo`,
      color: 'white',
      fontSize: '44px',
    });

    this.add(this.beatmapBackgroundObject);
    this.add(this.backgroundDimObject);
    this.add(this.beatmapDifficultyBarObject);
    this.add(this.beatmapTitleObject);
    this.add(this.beatmapArtistObject);
    this.add(this.beatmapCreatorObject);
    this.add(this.beatmapDifficultyObject);
    this.add(this.beatmapNotesCountObject);
    this.add(this.beatmapSlidersCountObject);
    this.add(this.beatmapBpmObject);
    this.add(this.beatmapMaxComboObject);
  }

  changeBeatmap(newBeatmap: IMap) {
    this.currentBeatmap = newBeatmap;
    this.beatmapDifficultyBarObject.setTexture(
      this.getBeatmapDifficultyBarTexture(),
    );
    this.beatmapBackgroundObject.setTexture(
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
    );
    this.beatmapTitleObject.text = this.currentBeatmap.title;
    this.beatmapArtistObject.text = this.currentBeatmap.creator;
    this.beatmapCreatorObject.text = this.currentBeatmap.creator;
    this.beatmapDifficultyObject.text = `${Number(
      this.currentBeatmap.difficulty,
    )}*`;
    this.beatmapNotesCountObject.text = `${this.currentBeatmap.notes.length} Notes`;
    this.beatmapSlidersCountObject.text = `${this.currentBeatmap.notes.length} Sliders`;
    this.beatmapBpmObject.text = `${Number(this.currentBeatmap.bpm)} BPM`;
    this.beatmapMaxComboObject.text = `${Number(
      this.currentBeatmap.notes.length,
    )} Max Combo`;
  }
}
