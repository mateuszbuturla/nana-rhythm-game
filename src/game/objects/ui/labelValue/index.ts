import { ILabelValue } from '../../../interfaces/labelValue.interface';
import { Text } from '../../basic/text';

export class LabelValue extends Phaser.GameObjects.Container {
  label: Text;
  value: Text;

  constructor(aParams: ILabelValue) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initLabelValue(aParams);
    this.scene.add.existing(this);
  }

  private initLabelValue(aParams: ILabelValue) {
    this.label = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: aParams.label,
      color: aParams.color,
      fontSize: aParams.labelFontSize,
      align: 'center',
    });
    this.value = new Text({
      scene: this.scene,
      x: 0,
      y: aParams.margin,
      text: aParams.value,
      color: aParams.color,
      fontSize: aParams.valueFontSize,
      align: 'center',
    });
    this.add(this.label);
    this.add(this.value);
  }
}
