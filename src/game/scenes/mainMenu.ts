import { Text } from '../objects/basic/text';
import { Image } from '../objects/basic/image';
import { OptionsPanel } from '../objects/optionsPanel';
import test from '../../../assets/logo.png';
import playButton from '../../../assets/ui/playButton.png';
import editorButton from '../../../assets/ui/editorButton.png';
import settingsButton from '../../../assets/ui/settingsButton.png';
import exitButton from '../../../assets/ui/exitButton.png';

import { MainMenuButton } from '../objects/ui/mainMenuButton';

export class MainMenu extends Phaser.Scene {
  logo: Image;
  optionsPanel: OptionsPanel;
  playButton: MainMenuButton;
  optionsButton: Text;

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(): void {
    this.load.image('logo', test);
    this.load.image('playButton', playButton);
    this.load.image('editorButton', editorButton);
    this.load.image('settingsButton', settingsButton);
    this.load.image('exitButton', exitButton);
  }

  create(): void {
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.preload();
    this.logo = new Image({
      scene: this,
      x: width / 2,
      y: height / 3,
      texture: 'logo',
    });
    this.playButton = new MainMenuButton({
      scene: this,
      x: 100,
      y: 100,
      texture: 'playButton',
      label: 'Play',
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
