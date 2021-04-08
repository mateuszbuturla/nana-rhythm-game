export interface IText {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  align?: 'left' | 'center' | 'right';
}
