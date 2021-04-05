import { IImageConstructorNoTexture } from '../interfaces/imageNoTexture.interface';

export class HitPosition extends Phaser.GameObjects.Image {
  constructor(aParams: IImageConstructorNoTexture) {
    super(aParams.scene, aParams.x, aParams.y, 'hitPosition', aParams.frame);

    this.initSprite();
    this.scene.add.existing(this);
  }

  private initSprite(): void {
    this.setScale(0.8);
  }
}
