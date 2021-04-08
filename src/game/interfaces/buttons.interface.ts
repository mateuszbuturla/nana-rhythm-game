interface IMainMenuButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  texture: string;
  textureDecoration: string;
  callback: () => void;
}

export { IMainMenuButton };
