import { Logo } from '../objects/logo';

export class MainMenu extends Phaser.Scene {
  logo: Logo;

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
  }
}
