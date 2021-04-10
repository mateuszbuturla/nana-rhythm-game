export interface INoteAccuracy {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  color: string;
}

export class NoteAccuracy extends Phaser.GameObjects.Text {
  constructor(aParams: INoteAccuracy) {
    super(aParams.scene, aParams.x, aParams.y, aParams.text, {
      color: aParams.color,
      fontSize: '45px',
    });

    this.initText();
    this.scene.add.existing(this);
  }

  private initText(): void {
    this.setOrigin(0.5, 0);
  }

  updatePosition(): void {
    this.y -= 1;
  }
}
