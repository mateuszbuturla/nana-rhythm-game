import { IMainMenuButton } from '../../../interfaces/buttons.interface';
import { BackButton } from '../backButton';
import { Text } from '../../basic/text';

export class TopBar extends Phaser.GameObjects.Container {
  backButton: any;

  constructor(scene: any, x: number, y: number) {
    super(scene, x, y);
    this.backButton = new BackButton({
      scene: scene,
      x: 0,
      y: 0,
      texture: 'd',
      textureDecoration: 'd',
      label: 'Back',
      callback: () => {},
    });
    this.add(this.backButton);
    this.scene.add.existing(this);
  }
  update(): void {
    this.backButton.update();
  }
}
