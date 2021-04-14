import { IHealth } from '../../interfaces/health.interface';
import { ENoteAccuracy } from '../../interfaces/noteAccuracy.interface';
import { noteAccuracyConfig } from '../../config/noteAccuracyConfig';
import { HealthBar } from '../../objects/game/healthBar';

export class Health {
  scene: Phaser.Scene;
  maxHealth: number = 100;
  currentHealth: number = 100;
  healthDrain: number;
  healthBar: HealthBar;
  isAlive: boolean = true;

  constructor(aParams: IHealth) {
    this.scene = aParams.scene;
    this.healthDrain = aParams.healthDrain;
    this.initHealth();
  }

  initHealth(): void {
    this.healthBar = new HealthBar({
      scene: this.scene,
    });
  }

  decrementHealth(): void {
    this.currentHealth -= this.healthDrain;
    if (this.currentHealth < 0) {
      this.currentHealth = 0;
      this.isAlive = false;
    }
    this.healthBar.updateHealthBar((this.currentHealth / this.maxHealth) * 100);
  }

  increaseHealth(accuracy: ENoteAccuracy): void {
    this.currentHealth +=
      (this.healthDrain / 4) *
      noteAccuracyConfig.accuracy[accuracy].accuracyValue;

    if (this.currentHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }

    this.healthBar.updateHealthBar((this.currentHealth / this.maxHealth) * 100);
  }

  checkIfIsAliver(): boolean {
    return this.isAlive;
  }
}
