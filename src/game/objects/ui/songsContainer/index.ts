import { easeInOutExpo } from './../../../utils/eases';
import { ISongsContainer } from '../../../interfaces/songsContainer.interface';
import { IMap } from '../../../interfaces/map.interface';
import { Text } from '../../basic/text';

export class SongsContainer extends Phaser.GameObjects.Container {
  currentBeatmapId: number;
  numberOfBeatmaps: number;
  beatmaps: any[] = [];
  canBeScrolled: boolean = true;
  beatmapsMargin: number = 100;
  beatmpasWidth: number = 300;

  constructor(aParams: ISongsContainer) {
    super(aParams.scene, 100, 0);

    this.initSongContainer(aParams);
    this.scene.add.existing(this);
  }

  initSongContainer(aParams: ISongsContainer): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    aParams.beatmaps.map((beatmap, index) => {
      const newBeatmap = this.scene.add.container(
        0 + (this.beatmpasWidth + this.beatmapsMargin) * index,
        height / 2 - 100,
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

      newBeatmap.add(newBeatmapDataBackground);
      newBeatmap.add(newBeatmapBackground);
      newBeatmap.add(newBeatmapBackgroundDim);
      newBeatmap.add(newBeatmapTitle);

      this.add(newBeatmap);
    });

    this.scene.add.existing(this);

    let maskShape = this.scene.make.graphics({ fillStroke: 0xffffff });
    maskShape.beginPath();

    maskShape.fillRect(0, 0, width, height);

    const mask = maskShape.createGeometryMask();

    this.currentBeatmapId = 0;
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

      showAnimation.play();
    }
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

      showAnimation.play();
    }
  }
}
