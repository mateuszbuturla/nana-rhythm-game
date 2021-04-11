interface IMainMenuButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  texture: string;
  textureDecoration: string;
  callback: () => void;
}

interface IBackButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  callback: () => void;
}

export { IMainMenuButton, IBackButton };
