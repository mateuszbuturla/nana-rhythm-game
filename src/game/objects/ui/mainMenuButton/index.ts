import { easeOutBounce, easeInOutExpo } from './../../../utils/eases';
import { IMainMenuButton } from '../../../interfaces/simpleUIComponents.interface';
import { Text } from '../../basic/text';
import { Image } from '../../basic/image';
import { ISize } from '../../../interfaces/properties.interface';

export class MainMenuButton extends Phaser.GameObjects.Container {
  buttonLabelObject: Text;
  buttonBackgroundObject: Image;
  buttonIconObject: Image;
  decorations: Image[] = [];
  decorationsData: any[] = [];
  mask: any;

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

    for (let i = 0; i < 100; i++) {
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

      this.buttonIconObject = new Image({
        scene: aParams.scene,
        x: this.buttonBackgroundObject.width / 2,
        y: this.buttonBackgroundObject.height * 1.1,
        texture: aParams.icon,
      });
      this.buttonIconObject.setOrigin(0.5, 0.5);
      this.buttonIconObject.alpha = 0;
      this.add(this.buttonIconObject);
    }

    this.buttonLabelObject = new Text({
      scene: aParams.scene,
      x: this.buttonBackgroundObject.width / 2,
      y: this.buttonBackgroundObject.height / 2,
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

  hover(): void {
    const hoverAnimation = this.scene.tweens.createTimeline();

    hoverAnimation.add({
      targets: this.buttonBackgroundObject,
      scaleY: 1.5,
      ease: easeOutBounce,
      duration: 1000,
    });

    hoverAnimation.play();

    const iconAnimation = this.scene.tweens.createTimeline();

    iconAnimation.add({
      delay: 500,
      targets: this.buttonIconObject,
      alpha: 1,
      ease: easeInOutExpo,
      duration: 500,
    });

    iconAnimation.play();
  }

  unHover(): void {
    const unhoverAnimation = this.scene.tweens.createTimeline();

    unhoverAnimation.add({
      delay: 300,
      targets: this.buttonBackgroundObject,
      scaleY: 1,
      ease: easeOutBounce,
      duration: 1000,
    });

    unhoverAnimation.play();

    const iconAnimation = this.scene.tweens.createTimeline();

    iconAnimation.add({
      delay: 0,
      targets: this.buttonIconObject,
      alpha: 0,
      ease: easeInOutExpo,
      duration: 500,
    });

    iconAnimation.play();
  }

  getSize(): ISize {
    return {
      width: this.buttonBackgroundObject.width,
      height: this.buttonBackgroundObject.height,
    };
  }

  updateMask() {
    this.mask = this.scene.make.graphics({ fillStroke: 0xffffff });
    this.mask.beginPath();

    this.mask.fillRect(
      this.x,
      this.y,
      this.buttonBackgroundObject.width,
      this.buttonBackgroundObject.height * this.buttonBackgroundObject.scaleY,
    );

    const mask = this.mask.createGeometryMask();

    this.mask.fillRect = this.mask = mask;
  }

  update() {
    this.decorations.map((decoration, index) => {
      decoration.y += 1 * this.decorationsData[index].speed;
      if (decoration.y > this.decorationsData[index].y + 200) {
        decoration.y = -150;
      }
    });

    this.updateMask();
  }
}
