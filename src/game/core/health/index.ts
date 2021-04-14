import { IHealth } from '../../interfaces/health.interface';

export class Health {
  scene: Phaser.Scene;
  maxHealth: number = 100;
  currentHealth: number = 100;
  healthDrain: number;

  constructor(aParams: IHealth) {
    this.scene = aParams.scene;
    this.healthDrain = aParams.healthDrain;
    this.initHealth();
  }

  initHealth(): void {}

  decrementHealth(): void {
    this.currentHealth -= this.healthDrain;
    console.log(this.currentHealth);
  }

  increaseHealth(): void {
    this.currentHealth += this.healthDrain / 4;
    console.log(this.currentHealth);
  }
}
