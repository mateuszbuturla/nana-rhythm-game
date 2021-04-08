import { IText } from '../../../interfaces/text.interface';

export class Text extends Phaser.GameObjects.Text {
  constructor(aParams: IText) {
    super(aParams.scene, aParams.x, aParams.y, aParams.text, {
      color: aParams.color ? aParams.color : 'black',
      fontSize: aParams.fontSize ? aParams.fontSize : '20px',
      fontFamily: aParams.fontFamily ? aParams.fontFamily : 'mainFontEL',
    });

    this.initText(aParams);
    this.scene.add.existing(this);
  }

  private initText(aParams: IText): void {
    this.setOrigin(0.5);
    if (aParams.shadow) {
      this.setShadow(0, 3, 'rgba(0,0,0,0.3)', 6);
    }
  }
}
