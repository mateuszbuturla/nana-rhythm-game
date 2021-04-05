import { Text } from './text';
import { UserConfig } from '../core/userConfig';
import { IIserConfig } from '../interfaces/userConfig.interface';
import { CheckBox } from '../objects/checkBox';
import { SelectInput } from '../objects/selectInput';
import { SliderInput } from '../objects/sliderInput';

export class OptionsPanel extends Phaser.GameObjects.Container {
  background: any;
  optionsHeader: Text;
  closeButton: Text;
  isShow: boolean = false;
  userConfig: UserConfig;
  config: IIserConfig;
  showNoteAccuracyInput: CheckBox;
  showPerfectHitInput: CheckBox;
  hitPositionInput: SliderInput;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);

    this.initOptionsPanel();
    this.scene.add.existing(this);
  }

  private initOptionsPanel(): void {
    const width = this.scene.sys.game.canvas.width;
    const height = this.scene.sys.game.canvas.height;
    this.userConfig = new UserConfig();
    this.config = this.userConfig.getUserConfig();

    this.background = this.scene.add.rectangle(
      width / 2,
      height / 2,
      width,
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
    });

    this.closeButton = new Text({
      scene: this.scene,
      x: 600,
      y: 50,
      text: 'Back',
      color: 'white',
    });
    this.closeButton.setInteractive();
    this.closeButton.on('pointerdown', () => this.handleClose());

    this.showNoteAccuracyInput = new CheckBox({
      scene: this.scene,
      x: 100,
      y: 100,
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
      x: 100,
      y: 150,
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
      x: 100,
      y: 200,
      label: 'hit position',
      width: 300,
      min: 50,
      max: 300,
      value: 100,
    });

    this.add(this.background);
    this.add(this.optionsHeader);
    this.add(this.closeButton);
    this.add(this.showNoteAccuracyInput);
    this.add(this.showPerfectHitInput);
    this.add(this.hitPositionInput);
  }

  private handleClose(): void {
    this.userConfig.setUserConfig(this.config);
    this.hidePanel();
  }

  showPanel() {
    this.setPosition(0, 0);
  }

  hidePanel() {
    this.setPosition(0, -this.scene.sys.game.canvas.height);
  }
}
