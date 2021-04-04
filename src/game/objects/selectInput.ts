import { ISelectInput } from '../interfaces/selectInput.interface';
import { Text } from './text';

export class SelectInput extends Phaser.GameObjects.Container {
  label: Text;
  selectedItem: Text;
  selectedItemIndex: number = 0;
  allItemsContainer: Phaser.GameObjects.Container;
  isShow: boolean = false;
  width: number;
  allItems: string[];

  constructor(aParams: ISelectInput) {
    super(aParams.scene, aParams.x, aParams.y);
    this.width = aParams.width;
    this.allItems = aParams.items;
    this.initSelectInput(aParams.label);
    this.scene.add.existing(this);
  }

  private initSelectInput(label: string): void {
    this.label = new Text({
      scene: this.scene,
      x: 0,
      y: 0,
      text: label,
      color: 'white',
    });

    this.allItemsContainer = new Phaser.GameObjects.Container(
      this.scene,
      0,
      30,
    );
    this.selectedItem = new Text({
      scene: this.scene,
      x: 0,
      y: 30,
      text: this.allItems[0],
      color: 'white',
    });
    this.selectedItem.setInteractive();
    this.selectedItem.on('pointerdown', () => this.toggleSelectInput());

    this.allItems.map((item, index) => {
      const newItem = new Text({
        scene: this.scene,
        x: 0,
        y: (index + 1) * 30,
        text: item,
        color: 'white',
      });
      newItem.setInteractive();
      newItem.on('pointerdown', () => {
        this.handleSelectItem(index);
      });
      this.allItemsContainer.add(newItem);
    });

    this.add(this.label);
    this.add(this.selectedItem);
    this.add(this.allItemsContainer);
    this.allItemsContainer.setAlpha(0);
  }

  handleSelectItem(index: number): void {
    this.selectedItem.text = this.allItems[index];
    this.selectedItemIndex = index;
    this.toggleSelectInput();
  }

  toggleSelectInput(): void {
    this.isShow = !this.isShow;
    this.allItemsContainer.setAlpha(this.isShow ? 1 : 0);
  }

  getValue(): string {
    return this.allItems[this.selectedItemIndex];
  }
}
