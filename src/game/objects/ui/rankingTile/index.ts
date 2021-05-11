import { easeInOutExpo } from './../../../utils/eases';
import { IRankingTile } from '../../../interfaces/rankingTile.interface';
import { Text } from '../../basic/text';
import { Image } from '../../basic/image';
import { IPosition } from '../../../interfaces/position.interface';

export class RankingTile extends Phaser.GameObjects.Container {
  backgroundObject: Phaser.GameObjects.Sprite;
  decorations: Image[] = [];
  decorationsData: any[] = [];
  mask: any;
  placeObject: Text;
  nickObject: Text;
  scoreObject: Text;
  maxComboObject: Text;
  accuracyObject: Text;
  parentPosition?: IPosition;

  constructor(aParams: IRankingTile) {
    super(aParams.scene, aParams.x, aParams.y);

    if (aParams.parentPosition) {
      this.parentPosition = aParams.parentPosition;
    }

    this.initRankingTile(aParams);
    this.scene.add.existing(this);
  }

  showTileAnimation(delay: number) {
    const showAnimation = this.scene.tweens.createTimeline();

    showAnimation.add({
      delay: delay,
      targets: this,
      alpha: 1,
      x: this.x + 30,
      ease: easeInOutExpo,
      duration: 400,
    });

    showAnimation.play();
  }

  initRankingTile(aParams: IRankingTile): void {
    this.backgroundObject = this.scene.add.sprite(
      0,
      0,
      'rankingTileBackground',
    );
    this.backgroundObject.setOrigin(0, 0);
    this.add(this.backgroundObject);

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * this.backgroundObject.getBounds().width;
      const y = Math.random() * this.backgroundObject.getBounds().height;
      const speed = Math.random() * 4 + 1;
      const newDecoration = new Image({
        scene: aParams.scene,
        x: x,
        y: y,
        texture: 'rankingTileBackgroundDecoration',
      });
      this.add(newDecoration);
      this.decorations = [...this.decorations, newDecoration];
      this.decorationsData = [...this.decorationsData, { x, y, speed }];
    }

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

    this.accuracyObject = new Text({
      scene: this.scene,
      x: 600,
      y: (this.backgroundObject.height / 4) * 3,
      text: `${aParams.accuracy}%`,
      fontSize: '28px',
      color: 'white',
    });
    this.accuracyObject.setOrigin(0, 0.5);

    this.add(this.placeObject);
    this.add(this.nickObject);
    this.add(this.scoreObject);
    this.add(this.maxComboObject);
    this.add(this.accuracyObject);
    this.setAlpha(0);
    this.setX(this.x - 30);
    this.showTileAnimation(200 + aParams.index * 300);
  }

  getSize() {
    return {
      width: this.backgroundObject.width,
      height: this.backgroundObject.height,
    };
  }

  updateMask() {
    this.mask = this.scene.make.graphics({ fillStroke: 0xffffff });
    this.mask.beginPath();

    let x = this.x;
    let y = this.y;

    if (this.parentPosition) {
      x += this.parentPosition.x;
      y += this.parentPosition.y;
    }

    this.mask.fillRect(
      x,
      y,
      this.backgroundObject.width,
      this.backgroundObject.height,
    );

    const mask = this.mask.createGeometryMask();

    this.mask.fillRect = this.mask = mask;
  }

  update() {
    this.updateMask();

    this.decorations.map((decoration, index) => {
      decoration.y += 1 * this.decorationsData[index].speed;
      if (decoration.y > this.decorationsData[index].y + 200) {
        decoration.y = -150;
      }
    });
  }
}
