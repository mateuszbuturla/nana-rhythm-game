import { ISceneTransition } from '../../../interfaces/simpleUIComponents.interface';

export class SceneTransition extends Phaser.GameObjects.Rectangle {
  isShow: boolean;
  animationTime: number = 500;
  constructor(aParams: ISceneTransition) {
    super(
      aParams.scene,
      aParams.scene.game.canvas.width / 2,
      aParams.scene.game.canvas.height / 2,
      aParams.scene.game.canvas.width,
      aParams.scene.game.canvas.height,
      0x000000,
    );
    this.isShow = aParams.isShow;
    this.initSceneTransition();
    this.scene.add.existing(this);
  }

  initSceneTransition(): void {
    this.setAlpha(this.isShow ? 1 : 0);
  }

  show(callback?: () => void): void {
    const showAnimation = this.scene.tweens.createTimeline();

    showAnimation.add({
      targets: this,
      alpha: 0,
      duration: this.animationTime,
      onComplete: () => {
        callback && callback();
      },
    });

    showAnimation.play();
  }

  hide(callback?: () => void): void {
    const hideAnimation = this.scene.tweens.createTimeline();

    hideAnimation.add({
      targets: this,
      alpha: 1,
      duration: this.animationTime,
      onComplete: () => {
        callback && callback();
      },
    });

    hideAnimation.play();
  }
}
