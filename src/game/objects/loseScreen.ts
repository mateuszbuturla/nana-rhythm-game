import { Text } from './basic/text';
import { getObjectBottomEdgePosition } from '../helpers/getObjectBottomEdgePosition';
import { easeInOutExpo } from '../utils/eases';

export class LoseScreen extends Phaser.GameObjects.Container {
  background: any;
  isShow: boolean = false;
  failed: Text;
  restart: Text;
  exit: Text;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);

    this.initLoseScreen();
    this.scene.add.existing(this);
  }

  private initLoseScreen(): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;
    this.background = this.scene.add.rectangle(0, 0, width, height, 0x000000);
    this.background.setAlpha(0.7);
    this.failed = new Text({
      scene: this.scene,
      x: 100 - width / 2,
      y: 300 - height / 2,
      text: 'Failed',
      fontSize: '65px',
      color: 'white',
    });
    this.restart = new Text({
      scene: this.scene,
      x: 100 - width / 2,
      y: getObjectBottomEdgePosition(this.failed) + 50,
      text: 'Restart',
      fontSize: '75px',
      color: 'white',
    });
    this.exit = new Text({
      scene: this.scene,
      x: 100 - width / 2,
      y: getObjectBottomEdgePosition(this.restart) + 50,
      text: 'Exit',
      fontSize: '75px',
      color: 'white',
    });

    this.add(this.background);
    this.add(this.failed);
    this.add(this.restart);
    this.add(this.exit);
    this.setDepth(2);
    this.setAlpha(0);
    this.setPosition(width / 2, height / 2);
  }

  show(callback?: () => void): void {
    if (this.isShow) {
      return;
    }

    const showAnimation = this.scene.tweens.createTimeline();

    showAnimation.add({
      targets: this,
      alpha: 1,
      ease: easeInOutExpo,
      duration: 1000,
      onComplete: callback && callback(),
    });

    showAnimation.play();

    this.isShow = true;
  }
}
