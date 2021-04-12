import { easeInOutExpo } from './../../../utils/eases';
import { ISongsContainer } from '../../../interfaces/songsContainer.interface';
import { IMap } from '../../../interfaces/map.interface';

export class SongsContainer extends Phaser.GameObjects.Container {
  currentBeatmapId: number;
  numberOfBeatmaps: number;
  beatmaps: any[] = [];
  canBeScrolled: boolean = true;

  constructor(aParams: ISongsContainer) {
    super(aParams.scene, 100, 0);

    this.initSongContainer(aParams);
    this.scene.add.existing(this);
  }

  initSongContainer(aParams: ISongsContainer): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    aParams.beatmaps.map((beatmap, index) => {
      const newBox = this.scene.add.rectangle(
        0 + 300 * index,
        height / 2,
        200,
        200,
        0xffffff,
      );
      this.beatmaps = [...this.beatmaps, newBox];
      this.add(newBox);
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
        x: this.x - 300,
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
        x: this.x + 300,
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
