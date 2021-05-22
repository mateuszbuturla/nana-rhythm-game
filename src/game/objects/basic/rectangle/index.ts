import { IRectange } from '../../../interfaces/simpleUIComponents.interface';

export class Rectangle extends Phaser.GameObjects.Rectangle {
  constructor(aParams: IRectange) {
    super(
      aParams.scene,
      aParams.x,
      aParams.y,
      aParams.width,
      aParams.height,
      aParams.fillColor,
    );

    this.alpha = aParams.alpha ? aParams.alpha : 1;

    this.setSelfOrigin(aParams.xAlign);
  }

  private setSelfOrigin(xAlign: any) {
    let x = 0;
    if (typeof xAlign === 'number') {
      x = xAlign;
    } else {
      switch (xAlign) {
        case 'left':
          x = 0;
          break;
        case 'center':
          x = 0.5;
          break;
        case 'right':
          x = 1;
          break;
      }
    }

    this.setOrigin(x, 0);
  }
}
