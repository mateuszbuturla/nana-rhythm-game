import { MainScene } from '../scenes/main-scene';
import { ResultScene } from '../scenes/resultScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'NaNa rhythm game',
  version: '0.0.0',
  width: 800,
  height: 600,
  backgroundColor: 0x3a404d,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [MainScene, ResultScene],
};
