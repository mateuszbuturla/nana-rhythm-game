import { easeInOutExpo } from './../../../utils/eases';
import { ISongsContainer } from '../../../interfaces/songsContainer.interface';
import { BeatmapTile } from '../beatmapTile';
import store from '../../../redux/store';

export class SongsContainer extends Phaser.GameObjects.Container {
  currentBeatmapId: number;
  numberOfBeatmaps: number;
  beatmaps: BeatmapTile[] = [];
  canBeScrolled: boolean = true;
  beatmapsMargin: number = 35;
  beatmpasHeight: number = 115;

  constructor(aParams: ISongsContainer) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initSongContainer(aParams);
    this.scene.add.existing(this);
  }

  initSongContainer(aParams: ISongsContainer): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    this.currentBeatmapId = store.getState().currentMap.currentMapId;

    aParams.beatmaps.map((beatmap, index) => {
      const newBeatmap = new BeatmapTile({
        scene: this.scene,
        x: 0,
        y: 50 + index * (this.beatmapsMargin + this.beatmpasHeight),
        title: beatmap.title,
        author: beatmap.author,
        active: this.currentBeatmapId === index,
        id: index,
        onClick: this.changeBeatmap,
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

    this.setMask(mask);
  }

  changeBeatmap(beatmapId: number): void {
    console.log(beatmapId);
  }

  nextBeatmap(): number {
    return this.currentBeatmapId;
  }

  prevousBeatmap(): number {
    return this.currentBeatmapId;
  }
}
