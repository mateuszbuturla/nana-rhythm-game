import { GameField } from './../scenes/gameField';
import { SongSelection } from '../scenes/songSelection';
import { ResultScene } from '../scenes/resultScene';
import { MainMenu } from '../scenes/mainMenu';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'NaNa rhythm game',
  version: '2.2.0',
  width: 800,
  height: 600,
  backgroundColor: 0x3a404d,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [MainMenu, SongSelection, GameField, ResultScene],
};
