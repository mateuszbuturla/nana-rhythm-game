import { easeInOutExpo } from './../../../utils/eases';
import { ISongsContainer } from '../../../interfaces/songsContainer.interface';
import { BeatmapTile } from '../beatmapTile';
import store from '../../../redux/store';
import { IMap } from '_/game/interfaces/map.interface';

export class SongsContainer extends Phaser.GameObjects.Container {
  currentBeatmapId: number;
  prevousBeatmapId: number;
  numberOfBeatmaps: number;
  beatmaps: BeatmapTile[] = [];
  canBeScrolled: boolean = true;
  beatmapsMargin: number = 30;
  beatmpasHeight: number = 100;
  onBeatmapUpdate: (beatmapId: number) => void;
  onBeatmapSelect: () => void;

  constructor(aParams: ISongsContainer) {
    super(aParams.scene, aParams.x, aParams.y);

    this.onBeatmapUpdate = aParams.onBeatmapUpdate;
    this.onBeatmapSelect = aParams.onBeatmapSelect;
    this.initSongContainer(aParams);
    this.scene.add.existing(this);
  }

  initSongContainer(aParams: ISongsContainer): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    this.currentBeatmapId = store.getState().currentMap.currentMapId;

    aParams.beatmaps.map((beatmap: IMap, index) => {
      const newBeatmap = new BeatmapTile({
        scene: this.scene,
        x: 0,
        y: 50 + index * (this.beatmapsMargin + this.beatmpasHeight),
        title: beatmap.title,
        creator: beatmap.creator,
        active: this.currentBeatmapId === index,
      });

      newBeatmap.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, 950, 115),
        Phaser.Geom.Rectangle.Contains,
      );
      newBeatmap.on('pointerdown', () => {
        this.changeBeatmap(index);
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
    if (beatmapId !== this.currentBeatmapId) {
      this.prevousBeatmapId = this.currentBeatmapId;
      this.currentBeatmapId = beatmapId;
      this.beatmaps[this.prevousBeatmapId].showHide('hide');
      this.beatmaps[beatmapId].showHide('show');
      this.onBeatmapUpdate(beatmapId);
    } else {
      this.onBeatmapSelect();
    }
  }
}
