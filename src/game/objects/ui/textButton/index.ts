import { Text } from '../../basic/text';
import { ITextButton } from '../../../interfaces/buttons.interface';

export class TextButton extends Phaser.GameObjects.Container {
  buttonLabel: Text;

  constructor(aParams: ITextButton) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initTextButton(aParams);
    this.scene.add.existing(this);
  }

  initTextButton(aParams: ITextButton): void {
    this.buttonLabel = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: aParams.label,
      fontSize: aParams.fontSize,
      color: aParams.color,
      align: aParams.align,
    });
    this.add(this.buttonLabel);

    this.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        0,
        this.getBounds().width,
        this.getBounds().height,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    this.on('pointerdown', () => {
      aParams.callback();
    });
  }
}
