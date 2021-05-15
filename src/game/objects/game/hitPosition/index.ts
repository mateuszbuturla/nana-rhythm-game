import { IHitPosition } from '../../../interfaces/inGame.interface';
import { Image } from '../../basic/image';

export class HitPosition extends Phaser.GameObjects.Container {
  top: Image;
  bottom: Image;
  hitPositionDistance: number;

  constructor(aParams: IHitPosition) {
    super(aParams.scene, 0, 0);

    this.hitPositionDistance = aParams.hitPositionDistance;
    this.initHitPosition();
    this.scene.add.existing(this);
  }

  initHitPosition(): void {
    this.top = new Image({
      scene: this.scene,
      x: this.hitPositionDistance,
      y: 350,
      texture: 'hitPositionTop',
    });
    this.top.setOrigin(0.5);

    this.bottom = new Image({
      scene: this.scene,
      x: this.hitPositionDistance,
      y: 650,
      texture: 'hitPositionBottom',
    });
    this.bottom.setOrigin(0.5);
    this.add(this.top);
    this.add(this.bottom);
  }
}
