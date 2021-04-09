import { Text } from './basic/text';
import { UserConfig } from '../core/userConfig';
import { IIserConfig } from '../interfaces/userConfig.interface';
import { CheckBox } from './ui/checkBox';
import { SelectInput } from './ui/select';
import { SliderInput } from './ui/slider';
import { getObjectBottomEdgePosition } from '../helpers/getObjectBottomEdgePosition';

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
    this.showNoteAccuracyInput.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 100, 50),
      Phaser.Geom.Rectangle.Contains,
    );
    this.showNoteAccuracyInput.on('pointerdown', () => {
      this.config.showNoteAccuracy = !this.config.showNoteAccuracy;
      this.showNoteAccuracyInput.setCheck(this.config.showNoteAccuracy);
    });

    this.showPerfectHitInput = new CheckBox({
      scene: this.scene,
      x: 50,
      y: getObjectBottomEdgePosition(this.showNoteAccuracyInput) + 60,
      state: this.config.showPerfectHit,
      label: 'Show perfect hits',
    });
    this.showPerfectHitInput.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 100, 50),
      Phaser.Geom.Rectangle.Contains,
    );
    this.showPerfectHitInput.on('pointerdown', () => {
      this.config.showPerfectHit = !this.config.showPerfectHit;
      this.showPerfectHitInput.setCheck(this.config.showPerfectHit);
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

    this.add(this.background);
    this.add(this.optionsHeader);
    this.add(this.inGameLabel);
    this.add(this.showNoteAccuracyInput);
    this.add(this.showPerfectHitInput);
    this.add(this.hitPositionInput);
    this.escIsPressed = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC,
    );
  }

  private handleClose(): void {
    const newConfig = {
      showNoteAccuracy: this.showNoteAccuracyInput.getValue(),
      showPerfectHit: this.showPerfectHitInput.getValue(),
      hitPosition: this.hitPositionInput.getValue(),
    };
    this.userConfig.setUserConfig(newConfig);
    this.hidePanel();
  }

  showPanel() {
    this.isShow = true;
    this.setPosition(0, 0);
  }

  hidePanel() {
    this.isShow = false;
    this.setPosition(0, -this.scene.sys.game.canvas.height);
  }

  update(): void {
    if (this.escIsPressed.isDown && this.isShow) {
      this.hidePanel();
    }
  }
}
