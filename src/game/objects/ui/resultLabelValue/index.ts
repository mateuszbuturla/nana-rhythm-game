import { IResultLabelValue } from '../../../interfaces/resultLabelValue.interface';
import { Text } from '../../basic/text';

export class ResultLabelValue extends Phaser.GameObjects.Container {
  label: Text;
  value: Text;

  constructor(aParams: IResultLabelValue) {
    super(aParams.scene, aParams.x, aParams.y);

    this.initResultLabelValue(aParams);
    this.scene.add.existing(this);
  }

  private initResultLabelValue(aParams: IResultLabelValue) {
    this.label = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: aParams.label,
      color: aParams.color,
      fontSize: '44px',
      align: 'center',
    });
    this.value = new Text({
      scene: this.scene,
      x: 0,
      y: 100,
      text: aParams.value,
      color: aParams.color,
      fontSize: '95px',
      align: 'center',
    });
    this.add(this.label);
    this.add(this.value);
  }
}
