import { IImageConstructor } from '../../../interfaces/image.interface';

export class HitNote extends Phaser.GameObjects.Image {
  dropped: boolean = false;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initSprite();
    this.scene.add.existing(this);
  }

  private initSprite(): void {
    this.setOrigin(0.5, 0.5);
  }

  updatePosition(scrollSpeed: number): void {
    this.x -= scrollSpeed;
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
