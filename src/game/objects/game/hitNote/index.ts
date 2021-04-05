import { IImageConstructor } from '../interfaces/image.interface';

export class HitNote extends Phaser.GameObjects.Image {
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initSprite();
    this.scene.add.existing(this);
  }

  private initSprite(): void {
    this.setScale(0.3);
  }

  updatePosition(scrollSpeed: number): void {
    this.x -= scrollSpeed;
  }
}
