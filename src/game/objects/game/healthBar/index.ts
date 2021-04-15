import { IHealthBar } from '../../../interfaces/health.interface';
import { Image } from '../../basic/image';
import { Text } from '../../basic/text';
import { getObjectBottomEdgePosition } from '../../../helpers/getObjectBottomEdgePosition';

export class HealthBar extends Phaser.GameObjects.Container {
  healthBarBackground: Image;
  healthBar: Image;
  healthLabel: Text;
  dropped: boolean = false;

  constructor(aParams: IHealthBar) {
    super(aParams.scene, 75, 75);

    this.initHealthBar();
    this.scene.add.existing(this);
  }

  initHealthBar(): void {
    this.healthLabel = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: 'Health',
      fontSize: '32px',
      color: 'white',
    });

    this.healthBarBackground = new Image({
      scene: this.scene,
      x: 0,
      y: getObjectBottomEdgePosition(this.healthLabel) + 20,
      texture: 'healthBarBackground',
    });
    this.healthBarBackground.setOrigin(0, 0);

    this.healthBar = new Image({
      scene: this.scene,
      x: 0,
      y: this.healthBarBackground.y,
      texture: 'healthBar',
    });
    this.healthBar.setOrigin(0, 0);

    this.add(this.healthLabel);
    this.add(this.healthBarBackground);
    this.add(this.healthBar);
  }

  updateHealthBar(percentHealth: number): void {
    const newWidth: number =
      this.healthBarBackground.width * (percentHealth / 100);
    this.healthBar.setDisplaySize(
      newWidth > 0 ? newWidth : 0,
      this.healthBarBackground.height,
    );
  }
}
