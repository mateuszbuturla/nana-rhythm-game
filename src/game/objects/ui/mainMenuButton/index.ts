import { IMainMenuButton } from '../../../interfaces/buttons.interface';
import { Text } from '../../basic/text';
import { Image } from '../../basic/image';

export class MainMenuButton extends Phaser.GameObjects.Container {
  buttonLabelObject: Text;
  buttonBackgroundObject: Image;

  constructor(aParams: IMainMenuButton) {
    super(aParams.scene, aParams.x, aParams.y);
    this.buttonBackgroundObject = new Image({
      scene: aParams.scene,
      x: 0,
      y: 0,
      texture: aParams.texture,
    });

    this.add(this.buttonBackgroundObject);

    this.buttonLabelObject = new Text({
      scene: aParams.scene,
      x: 0,
      y: 0,
      text: aParams.label,
      color: 'white',
      fontSize: '59px',
      align: 'center',
    });
    this.add(this.buttonLabelObject);

    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.getBounds().width / 2,
        -this.getBounds().height / 2,
        this.getBounds().width,
        this.getBounds().height,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    this.on('pointerdown', () => {
      aParams.callback();
    });

    this.scene.add.existing(this);
  }
}
