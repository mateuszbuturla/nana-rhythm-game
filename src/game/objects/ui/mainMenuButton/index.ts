import { IMainMenuButton } from '../../../interfaces/buttons.interface';
import { Text } from '../../basic/text';
import { Image } from '../../basic/image';

const decorations = [
  {
    x: -90,
    y: -70,
    speed: 2,
  },
  {
    x: -60,
    y: -40,
    speed: 3,
  },
  {
    x: -20,
    y: -70,
    speed: 4,
  },
  {
    x: -10,
    y: -30,
    speed: 3,
  },
  {
    x: 50,
    y: -60,
    speed: 5,
  },
  {
    x: 20,
    y: -60,
    speed: 2,
  },
  {
    x: 70,
    y: -60,
    speed: 3,
  },
  {
    x: 90,
    y: -50,
    speed: 3.3,
  },
  {
    x: 30,
    y: -20,
    speed: 5,
  },
  {
    x: 60,
    y: -10,
    speed: 2.5,
  },
  {
    x: 80,
    y: -40,
    speed: 3.1,
  },
  {
    x: 70,
    y: -30,
    speed: 4.6,
  },
  {
    x: 90,
    y: 20,
    speed: 4.8,
  },
  {
    x: 100,
    y: -20,
    speed: 5,
  },
  {
    x: 150,
    y: 30,
    speed: 4,
  },
  {
    x: 170,
    y: -40,
    speed: 4,
  },
  {
    x: -170,
    y: -50,
    speed: 4,
  },
  {
    x: -190,
    y: 30,
    speed: 4,
  },
  {
    x: -200,
    y: 50,
    speed: 4,
  },
  {
    x: -150,
    y: -30,
    speed: 4,
  },
  {
    x: -130,
    y: 80,
    speed: 4,
  },
];

export class MainMenuButton extends Phaser.GameObjects.Container {
  buttonLabelObject: Text;
  buttonBackgroundObject: Image;
  timeline: any;
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

    this.add(this.buttonBackgroundObject);

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

    let maskShape = this.scene.make.graphics({ fillStroke: 0xffffff });
    maskShape.beginPath();

    maskShape.fillRect(
      aParams.x - this.getBounds().width / 2,
      aParams.y - this.getBounds().height / 2,
      this.getBounds().width,
      this.getBounds().height,
    );

    const mask = maskShape.createGeometryMask();

    this.setMask(mask);

    for (let i = 0; i < 50; i++) {
      const x =
        Math.random() * this.getBounds().width - this.getBounds().width / 2;
      const y =
        Math.random() * this.getBounds().height - this.getBounds().height / 2;
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

    this.timeline = this.scene.tweens.timeline({
      onComplete: () => {
        this.timeline.play();
      },
    });

    this.timeline.play();

    this.buttonLabelObject = new Text({
      scene: aParams.scene,
      x: 0,
      y: 0,
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

  update() {
    this.decorations.map((decoration, index) => {
      decoration.y += 1 * this.decorationsData[index].speed;
      if (decoration.y > this.decorationsData[index].y + 200) {
        decoration.y = -150;
      }
    });
  }
}
