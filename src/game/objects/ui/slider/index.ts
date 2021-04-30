import { ISliderInput } from '../../../interfaces/sliderInput.interface';
import { Text } from '../../basic/text';
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
    this.initSelectInput(aParams.label, aParams.width);
    this.scene.add.existing(this);
  }

  private initSelectInput(label: string, width: number): void {
    this.label = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: label,
      color: 'white',
    });
    this.sliderBar = this.scene.add.rectangle(0, 50, width, 3, 0xffffff);
    this.sliderBar.setOrigin(0, 0.5);

    const oneUnitInPixels = this.width / (this.max - this.min);
    const sliderDotPosition =
      this.value * oneUnitInPixels - this.min * oneUnitInPixels;

    this.sliderDot = this.scene.add.circle(sliderDotPosition, 50, 5, 0xffffff);

    this.add(this.label);
    this.add(this.sliderBar);
    this.add(this.sliderDot);

    this.setInteractive(
      new Phaser.Geom.Rectangle(
        this.getBounds().width / 2,
        0,
        this.getBounds().width,
        this.getBounds().height,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    this.on('pointerdown', this.handlePointerDown);

    this.scene.input.on('pointermove', this.handleDrag, this);
    this.scene.input.on('pointerup', this.handlePointerUp, this);
  }

  handlePointerDown(): void {
    this.isDraging = true;
  }

  handleDrag(pointer: any): void {
    if (this.isDraging) {
      this.sliderDot.x = pointer.x - this.x;
      if (this.sliderDot.x < 0) {
        this.sliderDot.x = 0;
      }
      if (this.sliderDot.x > this.width) {
        this.sliderDot.x = this.width;
      }
    }
  }

  handlePointerUp(): void {
    const oneUnitInPixels = this.width / (this.max - this.min);
    this.isDraging = false;
    this.value = this.sliderDot.x / oneUnitInPixels + this.min;
  }

  getValue(): number {
    return this.value;
  }
}
