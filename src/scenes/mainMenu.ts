import { Text } from '../objects/text';
import { Logo } from '../objects/logo';

export class MainMenu extends Phaser.Scene {
  logo: Logo;
  playButton: Text;

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
  }
}
