import { TypeXAlign } from './properties.interface';

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

interface IImageConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string | Phaser.Textures.Texture;
  frame?: string | number;
}

interface IImageConstructorNoTexture {
  scene: Phaser.Scene;
  x: number;
  y: number;
  frame?: string | number;
}

interface ILabelValue {
  scene: Phaser.Scene;
  x: number;
  y: number;
  label: string;
  value: string;
  color: string;
  labelFontSize: string;
  valueFontSize: string;
  margin: number;
}

interface ISceneTransition {
  scene: Phaser.Scene;
  isShow: boolean;
}

interface ISelectInput {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  label: string;
  items: string[];
}

interface ISliderInput {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  label: string;
  min: number;
  max: number;
  value: number;
}

interface IText {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  align?: 'left' | 'center' | 'right';
  shadow?: boolean;
}

interface ITopBar {
  scene: Phaser.Scene;
  onBackClick: () => void;
}

interface IUiBackground {
  scene: Phaser.Scene;
  background: string;
}

interface IMainMenuLogo {
  scene: Phaser.Scene;
  x: number;
  y: number;
  bpm: number;
}

interface ICheckBoxConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  state: boolean;
  label: string;
}

interface IRectange {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor?: number;
  alpha?: number;
  xAlign?: TypeXAlign;
  yAlign?: 'top' | 'center' | 'bottom' | number;
}

export {
  IMainMenuButton,
  IBackButton,
  ILedearboardButton,
  ITextButton,
  IImageConstructor,
  IImageConstructorNoTexture,
  ILabelValue,
  ISceneTransition,
  ISelectInput,
  ISliderInput,
  IText,
  ITopBar,
  IUiBackground,
  IMainMenuLogo,
  ICheckBoxConstructor,
  IRectange,
};
