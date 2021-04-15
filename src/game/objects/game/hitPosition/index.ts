import { IHitPosition } from '../../../interfaces/hitPosition.interface';
import { Image } from '../../basic/image';

export class HitPosition extends Phaser.GameObjects.Container {
  top: Image;
  bottom: Image;
  hitPositionDistance: number;
  dropped: boolean = false;

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
      y: 150,
      texture: 'hitPositionTop',
    });
    this.top.setOrigin(0.5);

    this.bottom = new Image({
      scene: this.scene,
      x: this.hitPositionDistance,
      y: 450,
      texture: 'hitPositionBottom',
    });
    this.bottom.setOrigin(0.5);
    this.add(this.top);
    this.add(this.bottom);
  }

  drop(): void {
    if (!this.dropped) {
      const showAnimation = this.scene.tweens.createTimeline();

      showAnimation.add({
        targets: this,
        y: this.scene.game.canvas.height + this.height + 100,
        duration: 1000,
      });

      showAnimation.play();
      this.dropped = true;
    }
  }
}
