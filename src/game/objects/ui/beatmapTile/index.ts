import { easeInOutExpo } from './../../../utils/eases';
import { IBeatmapTile } from '../../../interfaces/beatmapTile.interface';
import { Text } from '../../basic/text';

export class BeatmapTile extends Phaser.GameObjects.Container {
  beatmapBackground: Phaser.GameObjects.Sprite;
  titleObject: Text;
  authorObject: Text;

  constructor(aParams: IBeatmapTile) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initSongTile(aParams);
    this.scene.add.existing(this);
  }

  initSongTile(aParams: IBeatmapTile): void {
    this.beatmapBackground = this.scene.add.sprite(0, 0, 'background');
    this.beatmapBackground.setDisplaySize(190, 115);
    this.titleObject = new Text({
      scene: this.scene,
      x: 170,
      y: 0,
      text: aParams.title,
      align: 'left',
      fontSize: '36px',
      color: 'white',
    });
    this.titleObject.setOrigin(0.5, 0.5);

    this.authorObject = new Text({
      scene: this.scene,
      x: 165,
      y: 50,
      text: aParams.author,
      align: 'left',
      fontSize: '25px',
      color: 'white',
    });
    this.authorObject.setOrigin(0.5, 0.5);

    this.add(this.beatmapBackground);
    this.add(this.titleObject);
    this.add(this.authorObject);
  }

  showHide(type: 'show' | 'hide') {}
}
