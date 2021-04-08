interface IMainMenuButton {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  texture: string;
  callback: () => void;
}

export { IMainMenuButton };
