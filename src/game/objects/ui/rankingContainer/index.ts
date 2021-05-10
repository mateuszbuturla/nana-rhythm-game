import { IRankingContainer } from '../../../interfaces/rankingContainer.interface';
import { RankingTile } from '../rankingTile';

export class RankingContainer extends Phaser.GameObjects.Container {
  rankingTiles: RankingTile[] = [];
  canBeScrolled: boolean = true;
  rankingTileMargin: number = 30;

  constructor(aParams: IRankingContainer) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initSongContainer(aParams);
    this.scene.add.existing(this);
  }

  initSongContainer(aParams: IRankingContainer): void {
    let tileHeight: number = 0;

    aParams.places.map((place, index) => {
      const newRankingTile = new RankingTile({
        scene: this.scene,
        x: 0,
        y: index === 0 ? 0 : index * (tileHeight + this.rankingTileMargin),
        place: place.place,
        avatar: place.avatar,
        nick: place.nick,
        score: place.score,
        accuracy: place.accuracy,
        maxCombo: place.maxCombo,
      });
      tileHeight = newRankingTile.height;

      this.add(newRankingTile);
      this.rankingTiles = [...this.rankingTiles, newRankingTile];
    });
  }
}
