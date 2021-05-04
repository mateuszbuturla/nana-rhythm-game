interface IMainMenuButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  texture: string;
  textureDecoration: string;
  icon: string;
  callback: () => void;
}

interface IBackButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  callback: () => void;
}

interface ILedearboardButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  callback: () => void;
}

interface ITextButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  fontSize?: string;
  color?: string;
  fontFamily?: string;
  align?: 'left' | 'center' | 'right';
  callback: () => void;
}

export { IMainMenuButton, IBackButton, ILedearboardButton, ITextButton };
