import { easeInOutExpo } from './../../../utils/eases';
import { IMainMenuLogo } from '../../../interfaces/simpleUIComponents.interface';
import { Image } from '../../basic/image';

export class MainMenuLogo extends Phaser.GameObjects.Container {
  logoObject: Image;
  triangleObject: Image;
  bpm: number;
  enlarged: boolean = false;
  canStartNewAnimation: boolean = true;

  constructor(aParams: IMainMenuLogo) {
    super(aParams.scene, aParams.x, aParams.y);

    this.bpm = aParams.bpm;

    this.triangleObject = new Image({
      scene: aParams.scene,
      x: aParams.x,
      y: aParams.y,
      texture: 'triangle',
    });
    this.triangleObject.alpha = 0.6;

    this.logoObject = new Image({
      scene: aParams.scene,
      x: aParams.x,
      y: aParams.y,
      texture: 'logo',
    });

    this.scene.add.existing(this);
  }

  update() {
    const tickTime = (60 * 1000) / this.bpm / 2;

    if (!this.enlarged && this.canStartNewAnimation) {
      this.canStartNewAnimation = false;
      const animation = this.scene.tweens.createTimeline();

      animation.add({
        targets: [this.logoObject, this.triangleObject],
        scale: 1.1,
        ease: easeInOutExpo,
        duration: tickTime,
        onComplete: () => {
          this.enlarged = true;
          this.canStartNewAnimation = true;
        },
      });

      animation.play();
    }

    if (this.enlarged && this.canStartNewAnimation) {
      this.canStartNewAnimation = false;
      const animation = this.scene.tweens.createTimeline();

      animation.add({
        targets: [this.logoObject, this.triangleObject],
        scale: 1,
        ease: easeInOutExpo,
        duration: tickTime,
        onComplete: () => {
          this.enlarged = false;
          this.canStartNewAnimation = true;
        },
      });

      animation.play();
    }
  }
}
