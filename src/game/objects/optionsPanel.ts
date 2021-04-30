import { Text } from './basic/text';
import { UserConfig } from '../core/userConfig';
import { IIserConfig } from '../interfaces/userConfig.interface';
import { CheckBox } from './ui/checkBox';
import { SelectInput } from './ui/select';
import { SliderInput } from './ui/slider';
import { getObjectBottomEdgePosition } from '../helpers/getObjectBottomEdgePosition';
import { easeInOutExpo } from '../utils/eases';

export class OptionsPanel extends Phaser.GameObjects.Container {
  background: any;
  optionsHeader: Text;
  isShow: boolean = false;
  userConfig: UserConfig;
  config: IIserConfig;
  showNoteAccuracyInput: CheckBox;
  showPerfectHitInput: CheckBox;
  hitPositionInput: SliderInput;
  inGameLabel: Text;
  escIsPressed: any;
  showAnimation: any;
  hideAnimation: any;
  musicVolumeInput: SliderInput;
  hitsoundVolumeInput: SliderInput;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);

    this.initOptionsPanel();
    this.scene.add.existing(this);
  }

  private initOptionsPanel(): void {
    const height = this.scene.sys.game.canvas.height;
    this.userConfig = new UserConfig();
    this.config = this.userConfig.getUserConfig();

    this.background = this.scene.add.rectangle(
      250,
      height / 2,
      500,
      height,
      0x000000,
    );
    this.background.alpha = 0.8;

    this.optionsHeader = new Text({
      scene: this.scene,
      x: 50,
      y: 50,
      text: 'Options',
      color: 'white',
      fontSize: '50px',
      align: 'left',
    });

    this.inGameLabel = new Text({
      scene: this.scene,
      x: 50,
      y: getObjectBottomEdgePosition(this.optionsHeader) + 30,
      text: 'In game',
      color: 'white',
      fontSize: '30px',
    });

    this.showNoteAccuracyInput = new CheckBox({
      scene: this.scene,
      x: 50,
      y: getObjectBottomEdgePosition(this.inGameLabel) + 30,
      state: this.config.showNoteAccuracy,
      label: 'Show note accuracy',
    });

    this.showPerfectHitInput = new CheckBox({
      scene: this.scene,
      x: 50,
      y: getObjectBottomEdgePosition(this.showNoteAccuracyInput) + 60,
      state: this.config.showPerfectHit,
      label: 'Show perfect hits',
    });

    this.hitPositionInput = new SliderInput({
      scene: this.scene,
      x: 50,
      y: getObjectBottomEdgePosition(this.showPerfectHitInput) + 60,
      label: 'hit position',
      width: 300,
      min: 50,
      max: 300,
      value: this.config.hitPosition,
    });

    this.musicVolumeInput = new SliderInput({
      scene: this.scene,
      x: 50,
      y: getObjectBottomEdgePosition(this.hitPositionInput) + 80,
      label: 'music volume',
      width: 300,
      min: 0,
      max: 100,
      value: this.config.musicVolume,
    });

    this.hitsoundVolumeInput = new SliderInput({
      scene: this.scene,
      x: 50,
      y: getObjectBottomEdgePosition(this.musicVolumeInput) + 80,
      label: 'hitsound volume',
      width: 300,
      min: 0,
      max: 100,
      value: this.config.hitsoundVolume,
    });

    this.add(this.background);
    this.add(this.optionsHeader);
    this.add(this.inGameLabel);
    this.add(this.showNoteAccuracyInput);
    this.add(this.showPerfectHitInput);
    this.add(this.hitPositionInput);
    this.add(this.musicVolumeInput);
    this.add(this.hitsoundVolumeInput);
    this.escIsPressed = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC,
    );
    this.setPosition(-this.getBounds().width, 0);
    this.setDepth(2);
  }

  private handleClose(): void {
    const newConfig = {
      showNoteAccuracy: this.showNoteAccuracyInput.getValue(),
      showPerfectHit: this.showPerfectHitInput.getValue(),
      hitPosition: this.hitPositionInput.getValue(),
      musicVolume: this.musicVolumeInput.getValue(),
      hitsoundVolume: this.hitsoundVolumeInput.getValue(),
    };
    this.userConfig.setUserConfig(newConfig);
    this.hidePanel();
  }

  showPanel() {
    if (this.isShow) {
      return;
    }

    this.isShow = true;
    const showAnimation = this.scene.tweens.createTimeline();

    showAnimation.add({
      targets: this,
      x: 0,
      ease: easeInOutExpo,
      duration: 1000,
    });

    showAnimation.play();
  }

  hidePanel() {
    if (!this.isShow) {
      return;
    }

    this.isShow = false;
    const hideAnimation = this.scene.tweens.createTimeline();

    hideAnimation.add({
      targets: this,
      x: -this.getBounds().width,
      ease: easeInOutExpo,
      duration: 1000,
    });

    hideAnimation.play();
    this.handleClose();
  }

  update(): void {
    if (this.escIsPressed.isDown && this.isShow) {
      this.hidePanel();
    }
  }
}
