import { easeInOutExpo } from './../../../utils/eases';
import { ISongsContainer } from '../../../interfaces/songsContainer.interface';
import { Text } from '../../basic/text';
import { LabelValue } from '../labelValue';
import { BeatmapTile } from '../beatmapTile';

export class SongsContainer extends Phaser.GameObjects.Container {
  currentBeatmapId: number;
  numberOfBeatmaps: number;
  beatmaps: BeatmapTile[] = [];
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
      const newBeatmap = new BeatmapTile({
        scene: this.scene,
        x: (this.beatmpasWidth + this.beatmapsMargin) * index,
        y: height / 2,
        title: beatmap.title,
        active: this.currentBeatmapId === index,
        notes: beatmap.notes,
      });

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

      this.beatmaps[this.currentBeatmapId].showHide('show');
      this.beatmaps[this.currentBeatmapId - 1].showHide('hide');

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

      this.beatmaps[this.currentBeatmapId].showHide('show');
      this.beatmaps[this.currentBeatmapId + 1].showHide('hide');

      showAnimation.play();
    }
  }
}
