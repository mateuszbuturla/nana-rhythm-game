import { easeInOutExpo } from './../../../utils/eases';
import { ISongsContainer } from '../../../interfaces/songsContainer.interface';
import { IMap } from '../../../interfaces/map.interface';
import { Text } from '../../basic/text';
import { LabelValue } from '../labelValue';

export class SongsContainer extends Phaser.GameObjects.Container {
  currentBeatmapId: number;
  numberOfBeatmaps: number;
  beatmaps: any[] = [];
  canBeScrolled: boolean = true;
  beatmapsMargin: number = 200;
  beatmpasWidth: number = 300;

  constructor(aParams: ISongsContainer) {
    super(aParams.scene, 100, 0);

    this.initSongContainer(aParams);
    this.scene.add.existing(this);
  }

  initSongContainer(aParams: ISongsContainer): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    this.currentBeatmapId = 0;

    aParams.beatmaps.map((beatmap, index) => {
      const newBeatmap = this.scene.add.container(
        0 + (this.beatmpasWidth + this.beatmapsMargin) * index,
        this.currentBeatmapId === index ? height / 2 - 150 : height / 2 - 50,
      );
      const newBeatmapDataBackground = this.scene.add.rectangle(
        0,
        150,
        380,
        200,
        0x000000,
      );
      newBeatmapDataBackground.setAlpha(0.8);
      const newBeatmapBackground = this.scene.add.sprite(0, 0, 'background');
      newBeatmapBackground.setDisplaySize(380, 230);
      const newBeatmapBackgroundDim = this.scene.add.rectangle(
        0,
        0,
        380,
        230,
        0x000000,
      );
      newBeatmapBackgroundDim.setAlpha(0.35);
      const newBeatmapTitle = new Text({
        scene: this.scene,
        x: newBeatmap.getBounds().width / 2,
        y: 0,
        text: beatmap.title,
        align: 'center',
        fontSize: '36px',
        color: 'white',
      });

      const newBeatmapLengthLabel = new LabelValue({
        scene: this.scene,
        x: newBeatmap.getBounds().width / 2 - 120,
        y: 150,
        label: 'Length',
        value: `1:30`,
        color: 'white',
        labelFontSize: '23px',
        valueFontSize: '44px',
        margin: 50,
      });
      const newBeatmapDifficultyLabel = new LabelValue({
        scene: this.scene,
        x: newBeatmap.getBounds().width / 2,
        y: 150,
        label: 'Difficulty',
        value: `4`,
        color: 'white',
        labelFontSize: '23px',
        valueFontSize: '44px',
        margin: 50,
      });
      const newBeatmapBPMLabel = new LabelValue({
        scene: this.scene,
        x: newBeatmap.getBounds().width / 2 + 120,
        y: 150,
        label: 'BPM',
        value: `120`,
        color: 'white',
        labelFontSize: '23px',
        valueFontSize: '44px',
        margin: 50,
      });

      newBeatmap.add(newBeatmapDataBackground);
      newBeatmap.add(newBeatmapBackground);
      newBeatmap.add(newBeatmapBackgroundDim);
      newBeatmap.add(newBeatmapTitle);
      newBeatmap.add(newBeatmapLengthLabel);
      newBeatmap.add(newBeatmapDifficultyLabel);
      newBeatmap.add(newBeatmapBPMLabel);

      this.add(newBeatmap);
      this.beatmaps = [...this.beatmaps, newBeatmap];
    });

    this.scene.add.existing(this);

    let maskShape = this.scene.make.graphics({ fillStroke: 0xffffff });
    maskShape.beginPath();

    maskShape.fillRect(0, 0, width, height);

    const mask = maskShape.createGeometryMask();

    this.numberOfBeatmaps = aParams.beatmaps.length;

    this.x = width / 2;

    this.setMask(mask);
  }

  nextBeatmap(): void {
    if (
      this.currentBeatmapId + 1 < this.numberOfBeatmaps &&
      this.canBeScrolled
    ) {
      this.currentBeatmapId++;
      this.canBeScrolled = false;
      const showAnimation = this.scene.tweens.createTimeline();

      showAnimation.add({
        targets: this,
        x: this.x - (this.beatmpasWidth + this.beatmapsMargin),
        ease: easeInOutExpo,
        duration: 300,
        onComplete: () => {
          this.canBeScrolled = true;
        },
      });

      this.showHideAnimation(this.currentBeatmapId, 'show');
      this.showHideAnimation(this.currentBeatmapId - 1, 'hide');

      showAnimation.play();
    }
  }

  private showHideAnimation(index: number, type: 'show' | 'hide'): void {
    const animation = this.scene.tweens.createTimeline();

    animation.add({
      targets: this.beatmaps[index],
      y:
        type === 'show'
          ? this.beatmaps[index].y - 100
          : this.beatmaps[index].y + 100,
      ease: easeInOutExpo,
      duration: 300,
    });

    animation.play();
  }

  prevousBeatmap(): void {
    if (this.currentBeatmapId > 0 && this.canBeScrolled) {
      this.currentBeatmapId--;
      this.canBeScrolled = false;
      const showAnimation = this.scene.tweens.createTimeline();

      showAnimation.add({
        targets: this,
        x: this.x + (this.beatmpasWidth + this.beatmapsMargin),
        ease: easeInOutExpo,
        duration: 300,
        onComplete: () => {
          this.canBeScrolled = true;
        },
      });

      this.showHideAnimation(this.currentBeatmapId, 'show');
      this.showHideAnimation(this.currentBeatmapId + 1, 'hide');

      showAnimation.play();
    }
  }
}
