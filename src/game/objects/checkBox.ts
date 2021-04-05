import { ICheckBoxConstructor } from '../interfaces/checkBox.interface';
import { Text } from './text';

export class CheckBox extends Phaser.GameObjects.Container {
  box: Text;
  label: Text;

  constructor(aParams: ICheckBoxConstructor) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initCheckBox(aParams.state, aParams.label);
    this.scene.add.existing(this);
  }

  setCheck(state: boolean): void {
    this.box.text = state ? '1' : '0';
  }

  private initCheckBox(state: boolean, label: string) {
    this.box = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: state ? '1' : '0',
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
  }
}
