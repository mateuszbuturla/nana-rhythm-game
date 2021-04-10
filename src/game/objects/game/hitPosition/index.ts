import { Image } from '../../basic/image';

export class HitPosition extends Phaser.GameObjects.Container {
  top: Image;
  bottom: Image;
  hitPositionDistance: number;

  constructor(scene: Phaser.Scene, hitPositionDistance: number) {
    super(scene, 0, 0);

    this.hitPositionDistance = hitPositionDistance;
    this.initHitPosition();
    this.scene.add.existing(this);
  }

  initHitPosition(): void {
    this.top = new Image({
      scene: this.scene,
      x: this.hitPositionDistance,
      y: 150,
      texture: 'hitPositionTop',
    });

    this.bottom = new Image({
      scene: this.scene,
      x: this.hitPositionDistance,
      y: 450,
      texture: 'hitPositionBottom',
    });
  }
}
