import { Text } from '../objects/basic/text';
import { Image } from '../objects/basic/image';
import { OptionsPanel } from '../objects/optionsPanel';
import background from '../../../assets/backgrounds/bg.png';
import playButton from '../../../assets/ui/playButton.png';
import editorButton from '../../../assets/ui/editorButton.png';
import settingsButton from '../../../assets/ui/settingsButton.png';
import exitButton from '../../../assets/ui/exitButton.png';

import { MainMenuButton } from '../objects/ui/mainMenuButton';

export class MainMenu extends Phaser.Scene {
  optionsPanel: OptionsPanel;
  background: any;
  backgroundDim: any;
  playButton: MainMenuButton;
  editorButton: MainMenuButton;
  settingsButton: MainMenuButton;
  exitButton: MainMenuButton;
  logo: any;

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(): void {
    this.load.image('background', background);
    this.load.image('playButton', playButton);
    this.load.image('editorButton', editorButton);
    this.load.image('settingsButton', settingsButton);
    this.load.image('exitButton', exitButton);
  }

  create(): void {
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.preload();
    this.background = this.add.sprite(width / 2, height / 2, 'background');
    this.background.setDisplaySize(width, height);
    this.backgroundDim = this.add.rectangle(0, 0, width, height, 0x000000);
    this.backgroundDim.setOrigin(0);
    this.backgroundDim.alpha = 0.4;
    this.playButton = new MainMenuButton({
      scene: this,
      x: 250,
      y: height / 2,
      texture: 'playButton',
      label: 'Play',
    });
    this.playButton.setInteractive();
    this.playButton.on('pointerdown', () => {
      this.scene.start('SongSelection');
    });
    this.editorButton = new MainMenuButton({
      scene: this,
      x: 550,
      y: height / 2,
      texture: 'editorButton',
      label: 'Editor',
    });
    this.settingsButton = new MainMenuButton({
      scene: this,
      x: 1370,
      y: height / 2,
      texture: 'settingsButton',
      label: 'Settings',
    });
    this.exitButton = new MainMenuButton({
      scene: this,
      x: 1680,
      y: height / 2,
      texture: 'exitButton',
      label: 'Exit',
    });
    this.settingsButton.setInteractive();
    this.settingsButton.on('pointerdown', () => {
      this.optionsPanel.showPanel();
    });
    this.logo = this.add.rectangle(width / 2, height / 2, 450, 450, 0xffffff);
    this.logo.angle = -30;

    this.optionsPanel = new OptionsPanel(this);
    this.optionsPanel.hidePanel();
  }
}
