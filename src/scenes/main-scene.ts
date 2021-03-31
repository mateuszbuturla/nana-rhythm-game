import { Logo } from "../objects/logo";

export class MainScene extends Phaser.Scene {
  private logo: Logo;

  constructor() {
    super({ key: "MainScene" });
  }

  preload(): void {
    this.load.image("logo", "../assets/logo.png");
  }

  create(): void {
    this.logo = new Logo({
      scene: this,
      x: 400,
      y: 300,
      texture: "logo",
    });
  }
}
