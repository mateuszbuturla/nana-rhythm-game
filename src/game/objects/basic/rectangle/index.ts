import { IRectange } from '../../../interfaces/simpleUIComponents.interface';

export class Rectangle extends Phaser.GameObjects.Rectangle {
  constructor(aParams: IRectange) {
    super(aParams.scene, aParams.x, aParams.y, aParams.width, aParams.height);
  }
}
