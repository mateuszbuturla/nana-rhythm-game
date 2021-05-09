import { IRankingTile } from '../../../interfaces/rankingTile.interface';
import { Text } from '../../basic/text';

export class RankingTile extends Phaser.GameObjects.Container {
  backgroundObject: Phaser.GameObjects.Sprite;
  placeObject: Text;
  nickObject: Text;
  scoreObject: Text;
  maxComboObject: Text;

  constructor(aParams: IRankingTile) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initRankingTile(aParams);
    this.scene.add.existing(this);
  }

  initRankingTile(aParams: IRankingTile): void {
    this.backgroundObject = this.scene.add.sprite(
      0,
      0,
      'rankingTileBackground',
    );
    this.backgroundObject.setOrigin(0, 0);

    this.placeObject = new Text({
      scene: this.scene,
      x: 30,
      y: this.backgroundObject.height / 2,
      text: `#${aParams.place}`,
      fontSize: '44px',
      color: 'white',
    });
    this.placeObject.setOrigin(0, 0.5);

    this.nickObject = new Text({
      scene: this.scene,
      x: 200,
      y: this.backgroundObject.height / 2,
      text: aParams.nick,
      fontSize: '28px',
      color: 'white',
    });
    this.nickObject.setOrigin(0, 0.5);

    this.scoreObject = new Text({
      scene: this.scene,
      x: 400,
      y: this.backgroundObject.height / 2,
      text: String(aParams.score),
      fontSize: '28px',
      color: 'white',
    });
    this.scoreObject.setOrigin(0, 0.5);

    this.maxComboObject = new Text({
      scene: this.scene,
      x: 600,
      y: this.backgroundObject.height / 4,
      text: `${aParams.maxCombo}x`,
      fontSize: '28px',
      color: 'white',
    });
    this.maxComboObject.setOrigin(0, 0.5);

    this.add(this.backgroundObject);
    this.add(this.placeObject);
    this.add(this.nickObject);
    this.add(this.scoreObject);
    this.add(this.maxComboObject);
  }
}
