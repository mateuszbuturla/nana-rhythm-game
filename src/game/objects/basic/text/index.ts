import { IText } from '../../../interfaces/text.interface';

export class Text extends Phaser.GameObjects.Text {
  constructor(aParams: IText) {
    super(aParams.scene, aParams.x, aParams.y, aParams.text, {
      color: aParams.color ? aParams.color : 'black',
      fontSize: aParams.fontSize ? aParams.fontSize : '20px',
      fontFamily: aParams.fontFamily ? aParams.fontFamily : 'GoodTimes',
    });

    this.initText(aParams);
    this.scene.add.existing(this);
  }

  private initText(aParams: IText): void {
    switch (aParams.align) {
      case 'left':
        this.setOrigin(0);
        break;
      case 'center':
        this.setOrigin(0.5);
        break;
      case 'right':
        this.setOrigin(1);
        break;
      default:
        this.setOrigin(0);
        break;
    }
    if (aParams.shadow) {
      this.setShadow(0, 3, 'rgba(0,0,0,0.3)', 6);
    }
  }
}
