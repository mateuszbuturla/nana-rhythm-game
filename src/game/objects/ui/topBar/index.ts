import { ITopBar } from '../../../interfaces/topBar.interface';
import { Image } from '../../basic/image';
import { BackButton } from '../backButton';

export class TopBar extends Phaser.GameObjects.Container {
  backgroundObject: Image;
  backButton: any;

  constructor(aParams: ITopBar) {
    super(aParams.scene, 0, 0);

    this.backgroundObject = new Image({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'gradientBackground',
    });
    this.backgroundObject.setOrigin(0, 0);
    this.backgroundObject.setScale(2.2, 1);

    this.backButton = new BackButton({
      scene: aParams.scene,
      x: 0,
      y: 0,
      label: 'Back',
      callback: aParams.onBackClick,
    });
    this.add(this.backgroundObject);
    this.add(this.backButton);
    this.scene.add.existing(this);
  }
  update(): void {
    this.backButton.update();
  }
}
