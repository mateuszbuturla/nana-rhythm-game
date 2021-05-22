import { IBackButton } from '../../../interfaces/simpleUIComponents.interface';
import { Text } from '../../basic/text';
import { Image } from '../../basic/image';

export class BackButton extends Phaser.GameObjects.Container {
  buttonLabelObject: Text;
  buttonBackgroundObject: Image;

  constructor(aParams: IBackButton) {
    super(aParams.scene, aParams.x, aParams.y);

    this.buttonBackgroundObject = new Image({
      scene: aParams.scene,
      x: 0,
      y: 0,
      texture: 'backButton',
    });
    this.buttonBackgroundObject.setOrigin(0, 0);

    this.add(this.buttonBackgroundObject);

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

    this.buttonLabelObject = new Text({
      scene: aParams.scene,
      x: this.getBounds().width / 3,
      y: this.getBounds().height / 2,
      text: aParams.label,
      color: 'white',
      fontSize: '43px',
      align: 'center',
      fontFamily: 'GoodTimes',
      shadow: true,
    });
    this.add(this.buttonLabelObject);

    this.scene.add.existing(this);
  }
}
