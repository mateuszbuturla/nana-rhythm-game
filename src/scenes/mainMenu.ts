import { Text } from '../objects/text';
import { Logo } from '../objects/logo';
import { OptionsPanel } from '../objects/optionsPanel';

export class MainMenu extends Phaser.Scene {
  logo: Logo;
  optionsPanel: OptionsPanel;
  playButton: Text;
  optionsButton: Text;

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(): void {
    this.load.image('logo', '../assets/logo.png');
  }

  create(): void {
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.preload();
    this.logo = new Logo({
      scene: this,
      x: width / 2,
      y: height / 3,
      texture: 'logo',
    });
    this.playButton = new Text({
      scene: this,
      x: width / 2 - 150,
      y: height / 3 + 150,
      text: 'Play',
    });
    this.playButton.setInteractive();
    this.playButton.on('pointerdown', () => {
      this.scene.start('SongSelection');
    });
    this.optionsButton = new Text({
      scene: this,
      x: width / 2,
      y: height / 3 + 150,
      text: 'Options',
    });
    this.optionsButton.setInteractive();
    this.optionsButton.on('pointerdown', () => {
      this.optionsPanel.showPanel();
    });
    this.optionsPanel = new OptionsPanel(this);
    this.optionsPanel.hidePanel();
  }
}
