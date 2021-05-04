import { ILedearboardButton } from '../../../interfaces/buttons.interface';
import { Text } from '../../basic/text';
import { Image } from '../../basic/image';

export class LeaderboardButton extends Phaser.GameObjects.Container {
  buttonLabelObject: Text;
  buttonBackgroundObject: Image;

  constructor(aParams: ILedearboardButton) {
    super(aParams.scene, aParams.x, aParams.y);

    this.buttonBackgroundObject = new Image({
      scene: aParams.scene,
      x: 0,
      y: 0,
      texture: 'leaderboardButton',
    });
    this.buttonBackgroundObject.setOrigin(0.5, 1);

    this.add(this.buttonBackgroundObject);

    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.getBounds().width / 2,
        -this.getBounds().height,
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
      x: 0,
      y: -this.getBounds().height / 2,
      text: aParams.label,
      color: 'white',
      fontSize: '38px',
      align: 'center',
      fontFamily: 'GoodTimes',
      shadow: true,
    });
    this.add(this.buttonLabelObject);

    this.scene.add.existing(this);
  }
}
