import { Text } from './text';
import { UserConfig } from '../core/userConfig';
import { IIserConfig } from '../interfaces/userConfig.interface';

export class OptionsPanel extends Phaser.GameObjects.Container {
  background: any;
  optionsHeader: Text;
  closeButton: Text;
  isShow: boolean = false;
  userConfig: UserConfig;
  config: IIserConfig;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);

    this.initOptionsPanel();
    this.scene.add.existing(this);
  }

  private initOptionsPanel(): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;

    this.background = this.scene.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x000000,
    );
    this.background.alpha = 0.8;

    this.optionsHeader = new Text({
      scene: this.scene,
      x: 50,
      y: 50,
      text: 'Options',
      color: 'white',
    });

    this.closeButton = new Text({
      scene: this.scene,
      x: 600,
      y: 50,
      text: 'Back',
      color: 'white',
    });
    this.closeButton.setInteractive();
    this.closeButton.on('pointerdown', () => this.handleClose());

    this.add(this.background);
    this.add(this.optionsHeader);
    this.add(this.closeButton);
    this.userConfig = new UserConfig();
    this.config = this.userConfig.getUserConfig();
  }

  private handleClose(): void {
    this.userConfig.setUserConfig(this.config);
    this.hidePanel();
  }

  showPanel() {
    this.setPosition(0, 0);
  }

  hidePanel() {
    this.setPosition(0, -this.scene.sys.game.canvas.height);
  }
}
