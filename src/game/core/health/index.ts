import { IHealth } from '../../interfaces/health.interface';
import { ENoteAccuracy } from '../../interfaces/noteAccuracy.interface';
import { noteAccuracyConfig } from '../../config/noteAccuracyConfig';

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
  }

  increaseHealth(accuracy: ENoteAccuracy): void {
    this.currentHealth +=
      (this.healthDrain / 4) *
      noteAccuracyConfig.accuracy[accuracy].accuracyValue;
  }
}
