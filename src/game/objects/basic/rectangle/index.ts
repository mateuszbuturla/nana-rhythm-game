import { IRectange } from '../../../interfaces/simpleUIComponents.interface';
import { TypeXAlign } from '../../../interfaces/properties.interface';

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

    this.setSelfOrigin(aParams.xAlign ? aParams.xAlign : 0, aParams.yAlign);
  }

  private setSelfOrigin(xAlign: TypeXAlign, yAlign: any) {
    let x = 0;
    let y = 0;
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

    if (typeof yAlign === 'number') {
      y = yAlign;
    } else {
      switch (yAlign) {
        case 'top':
          y = 0;
          break;
        case 'center':
          y = 0.5;
          break;
        case 'bottom':
          y = 1;
          break;
      }
    }

    this.setOrigin(x, y);
  }
}
