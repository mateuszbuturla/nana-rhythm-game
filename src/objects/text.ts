import { IText } from '../interfaces/text.interface';

export class Text extends Phaser.GameObjects.Text {
  constructor(aParams: IText) {
    super(aParams.scene, aParams.x, aParams.y, aParams.text, {
      color: 'black',
      fontSize: '20px',
    });

    this.initText();
    this.scene.add.existing(this);
  }

  private initText(): void {
    this.setOrigin(0.5, 0.5);
  }
}
