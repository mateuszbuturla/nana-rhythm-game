import { IBeatmapTimer } from '../../../interfaces/beatmapTimer.interface';
import { Rectangle } from '../../basic/rectangle';

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
    this.timerBackground = new Rectangle({
      scene: this.scene,
      x: 0,
      y: 0,
      width,
      height: 15,
      fillColor: 0x000000,
      alpha: 0.7,
      yAlign: 'bottom',
    });
    this.timer = new Rectangle({
      scene: this.scene,
      x: 0,
      y: 0,
      width: 0,
      height: 15,
      fillColor: 0xa343e2,
      yAlign: 'bottom',
    });
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
