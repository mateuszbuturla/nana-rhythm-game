import { ISliderInput } from '../interfaces/sliderInput.interface';
import { Text } from './text';
import 'Phaser';

export class SliderInput extends Phaser.GameObjects.Container {
  label: Text;
  min: number;
  max: number;
  value: number = 0;
  width: number;
  sliderBar: any;
  sliderDot: any;
  isDraging: boolean = false;

  constructor(aParams: ISliderInput) {
    super(aParams.scene, aParams.x, aParams.y);
    this.width = aParams.width;
    this.min = aParams.min;
    this.max = aParams.max;
    this.value = aParams.value;
    this.initSelectInput(aParams.label, aParams.width, aParams.x);
    this.scene.add.existing(this);
  }

  private initSelectInput(label: string, width: number, x: number): void {
    this.label = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: label,
      color: 'white',
    });
    this.sliderBar = this.scene.add.rectangle(0, 50, width, 3, 0xffffff);
    this.sliderBar.setOrigin(0, 0.5);

    this.scene.input.on(
      'pointerdown',
      () => {
        this.isDraging = true;
      },
      this,
    );
    this.scene.input.on(
      'pointermove',
      (pointer: any) => {
        if (this.isDraging) {
          this.sliderDot.x = pointer.x - x;
          if (this.sliderDot.x < 0) {
            this.sliderDot.x = 0;
          }
          if (this.sliderDot.x > this.width) {
            this.sliderDot.x = this.width;
          }
        }
      },
      this,
    );
    this.scene.input.on(
      'pointerup',
      () => {
        this.isDraging = false;
      },
      this,
    );

    this.sliderDot = this.scene.add.circle(0, 50, 5, 0xffffff);

    this.add(this.label);
    this.add(this.sliderBar);
    this.add(this.sliderDot);
  }

  getValue(): number {
    return this.value;
  }

  update() {
    console.log('test');
  }
}
