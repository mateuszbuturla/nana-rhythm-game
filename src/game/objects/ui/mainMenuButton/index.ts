import { easeOutBounce } from './../../../utils/eases';
import { IMainMenuButton } from '../../../interfaces/buttons.interface';
import { Text } from '../../basic/text';
import { Image } from '../../basic/image';
import { ISize } from '../../../interfaces/size.interface';

export class MainMenuButton extends Phaser.GameObjects.Container {
  buttonLabelObject: Text;
  buttonBackgroundObject: Image;
  decorations: Image[] = [];
  decorationsData: any[] = [];

  constructor(aParams: IMainMenuButton) {
    super(aParams.scene, aParams.x, aParams.y);
    this.buttonBackgroundObject = new Image({
      scene: aParams.scene,
      x: 0,
      y: 0,
      texture: aParams.texture,
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
    this.on('pointerover', this.hover);
    this.on('pointerout', this.unHover);

    let maskShape = this.scene.make.graphics({ fillStroke: 0xffffff });
    maskShape.beginPath();

    maskShape.fillRect(
      aParams.x,
      aParams.y,
      this.getBounds().width,
      this.getBounds().height,
    );

    const mask = maskShape.createGeometryMask();

    this.setMask(mask);

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * this.getBounds().width;
      const y = Math.random() * this.getBounds().height;
      const speed = Math.random() * 4 + 1;
      const newDecoration = new Image({
        scene: aParams.scene,
        x: x,
        y: y,
        texture: aParams.textureDecoration,
      });
      this.add(newDecoration);
      this.decorations = [...this.decorations, newDecoration];
      this.decorationsData = [...this.decorationsData, { x, y, speed }];
    }

    this.buttonLabelObject = new Text({
      scene: aParams.scene,
      x: this.buttonBackgroundObject.width / 2,
      y: this.buttonBackgroundObject.height / 2,
      text: aParams.label,
      color: 'white',
      fontSize: '59px',
      align: 'center',
      fontFamily: 'mainFontB',
      shadow: true,
    });
    this.add(this.buttonLabelObject);

    this.scene.add.existing(this);
  }

  hover(): void {}

  unHover(): void {}

  getSize(): ISize {
    return {
      width: this.buttonBackgroundObject.width,
      height: this.buttonBackgroundObject.height,
    };
  }

  update() {
    this.decorations.map((decoration, index) => {
      decoration.y += 1 * this.decorationsData[index].speed;
      if (decoration.y > this.decorationsData[index].y + 200) {
        decoration.y = -150;
      }
    });
  }
}
