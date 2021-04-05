import { IImageConstructor } from '../../../interfaces/image.interface';

export class Image extends Phaser.GameObjects.Image {
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initSprite();
    this.scene.add.existing(this);
  }

  private initSprite() {
    this.setScale(0.5);
    this.setOrigin(0.5, 0.5);
  }
}
