import { GameField } from './../scenes/gameField';
import { SongSelection } from '../scenes/songSelection';
import { ResultScene } from '../scenes/resultScene';
import { MainMenu } from '../scenes/mainMenu';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'NaNa rhythm game',
  version: '2.2.1',
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    width: 1920,
    height: 1080,
  },
  backgroundColor: 0x3a404d,
  type: Phaser.CANVAS,
  parent: 'game',
  scene: [MainMenu, SongSelection, GameField, ResultScene],
};
