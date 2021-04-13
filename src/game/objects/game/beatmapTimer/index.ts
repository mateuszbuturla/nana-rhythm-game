import { IBeatmapTimer } from '../../../interfaces/beatmapTimer.interface';

export class BeatmapTimer extends Phaser.GameObjects.Container {
  timerBackground: Phaser.GameObjects.Rectangle;
  timer: Phaser.GameObjects.Rectangle;

  constructor(aParams: IBeatmapTimer) {
    super(aParams.scene, 0, aParams.scene.game.canvas.height);
    this.initBeatmapTimer();
    this.scene.add.existing(this);
  }

  private initBeatmapTimer(): void {
    const width: number = this.scene.game.canvas.width;
    this.timerBackground = this.scene.add.rectangle(0, 0, width, 15, 0x000000);
    this.timerBackground.setAlpha(0.7);
    this.timerBackground.setOrigin(0, 1);
    this.timer = this.scene.add.rectangle(0, 0, 0, 15, 0xa343e2);
    this.timer.setOrigin(0, 1);
    this.add(this.timerBackground);
    this.add(this.timer);
  }

  updateTimer(startTime: number, beatmapLength: number): void {
    const width: number = this.scene.game.canvas.width;
    const delta = Date.now() - startTime;
    const remainingTime = 100 - ((beatmapLength - delta) * 100) / beatmapLength;
    this.timer.width = width * (remainingTime / 100);
  }
}
