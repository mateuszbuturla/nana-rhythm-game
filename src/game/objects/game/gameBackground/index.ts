import { Image } from '../../basic/image';

export class GameBackground extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Sprite;
  backgroundDim: Phaser.GameObjects.Rectangle;
  dimGradientTop: Phaser.GameObjects.Rectangle;
  dimGradientBottom: Phaser.GameObjects.Rectangle;
  gradientTop: Image;
  gradientBottom: Image;

  constructor(scene: Phaser.Scene, background: string) {
    super(scene, 0, 0);

    this.initGameBackground(background);
    this.scene.add.existing(this);
  }

  initGameBackground(background: string): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    this.background = this.scene.add.sprite(width / 2, height / 2, background);
    this.background.setDisplaySize(width, height);
    this.backgroundDim = this.scene.add.rectangle(
      0,
      0,
      width,
      height,
      0x000000,
    );
    this.backgroundDim.setOrigin(0);
    this.backgroundDim.alpha = 0.9;
    this.gradientTop = new Image({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'gradient',
    });
    this.gradientTop.setOrigin(1, 0);
    this.gradientTop.y = this.gradientTop.height;
    this.gradientTop.angle = 180;
    this.gradientBottom = new Image({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'gradient',
    });
    this.gradientBottom.setOrigin(0, 0.3);
    this.gradientBottom.y = height - this.gradientBottom.height;
  }
}
