import { IRankingTile } from '../../../interfaces/rankingTile.interface';
import { Text } from '../../basic/text';

export class RankingTile extends Phaser.GameObjects.Container {
  backgroundObject: Phaser.GameObjects.Sprite;

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

    this.add(this.backgroundObject);
  }
}
