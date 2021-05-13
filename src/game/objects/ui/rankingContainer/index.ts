import { IRankingContainer } from '../../../interfaces/rankingContainer.interface';
import { RankingTile } from '../rankingTile';

export class RankingContainer extends Phaser.GameObjects.Container {
  rankingTiles: RankingTile[] = [];
  canBeScrolled: boolean = true;
  rankingTileMargin: number = 10;

  constructor(aParams: IRankingContainer) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initSongContainer(aParams);
    this.scene.add.existing(this);
  }

  handleRankingTileClick(rankingTileIndex: number): void {
    console.log(rankingTileIndex);
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
        parentPosition: {
          x: this.x,
          y: this.y,
        },
        index: index,
      });
      tileHeight = newRankingTile.getSize().height;

      newRankingTile.setInteractive(
        new Phaser.Geom.Rectangle(
          0,
          0,
          newRankingTile.getSize().width,
          newRankingTile.getSize().height,
        ),
        Phaser.Geom.Rectangle.Contains,
      );
      newRankingTile.on('pointerdown', () => {
        this.handleRankingTileClick(index);
      });

      this.add(newRankingTile);
      this.rankingTiles = [...this.rankingTiles, newRankingTile];
    });
  }

  update(): void {
    this.rankingTiles.map((tile) => {
      tile.update();
    });
  }
}
