import { ICheckBoxConstructor } from '../../../interfaces/checkBox.interface';
import { Text } from '../../basic/text';

export class CheckBox extends Phaser.GameObjects.Container {
  box: Text;
  label: Text;
  value: boolean;

  constructor(aParams: ICheckBoxConstructor) {
    super(aParams.scene, aParams.x, aParams.y);

    this.value = aParams.state;
    this.initCheckBox(aParams.label);
    this.scene.add.existing(this);
  }

  setCheck(state: boolean): void {
    this.value = state;
    this.box.text = state ? '1' : '0';
  }

  getValue(): boolean {
    return this.value;
  }

  private initCheckBox(label: string) {
    this.box = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: this.value ? '1' : '0',
      color: 'white',
    });
    this.label = new Text({
      scene: this.scene,
      x: 50,
      y: 0,
      text: label,
      color: 'white',
    });
    this.add(this.box);
    this.add(this.label);

    this.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        0,
        this.getBounds().width,
        this.getBounds().height,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    this.on('pointerdown', () => {
      this.setCheck(!this.value);
    });
  }
}
