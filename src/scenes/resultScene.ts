import { Text } from '../objects/text';

export class ResultScene extends Phaser.Scene {
  text: Text;

  constructor() {
    super({ key: 'ResultScene' });
  }

  preload(): void {}

  create(): void {
    this.preload();
    this.text = new Text({
      scene: this,
      x: 100,
      y: 50,
      text: 'Result',
    });
  }
}
