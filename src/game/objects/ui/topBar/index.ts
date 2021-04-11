import { IMainMenuButton } from '../../../interfaces/buttons.interface';
import { ITopBar } from '../../../interfaces/topBar.interface';
import { BackButton } from '../backButton';
import { Text } from '../../basic/text';

export class TopBar extends Phaser.GameObjects.Container {
  backButton: any;

  constructor(aParams: ITopBar) {
    super(aParams.scene, 0, 0);
    this.backButton = new BackButton({
      scene: aParams.scene,
      x: 0,
      y: 0,
      texture: 'd',
      textureDecoration: 'd',
      label: 'Back',
      callback: aParams.onBackClick,
    });
    this.add(this.backButton);
    this.scene.add.existing(this);
  }
  update(): void {
    this.backButton.update();
  }
}
