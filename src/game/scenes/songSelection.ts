import store from '../redux/store';
import { setCurrentMap, setCurrentMapId } from '../redux/currentMap';
import { Score } from '../core/score';
import { IMap } from '../interfaces/map.interface';
import { SceneTransition } from '../objects/ui/sceneTransition';
import { LeaderboardButton } from '../objects/ui/leaderboardButton';
import leaderboardButton from '../../../assets/ui/leaderboardButton.png';
import { UiBackground } from '../objects/ui/uiBackground';
import background from '../../../assets/backgrounds/bg.png';
import { TopBar } from '../objects/ui/topBar';
import backButton from '../../../assets/ui/backButton.png';
import backButtonDecoration from '../../../assets/ui/backButtonDecoration.png';
import { SongsContainer } from '../objects/ui/songsContainer';

const songs: IMap[] = [
  {
    title: 'Test title1',
    author: 'Test author1',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
    ],
  },
  {
    title: 'Test title2',
    author: 'Test author2',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
      {
        direction: 'up',
        delay: 2300,
      },
      {
        direction: 'down',
        delay: 2400,
      },
      {
        direction: 'up',
        delay: 2500,
      },
    ],
  },
  {
    title: 'Test title3',
    author: 'Test author3',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
      {
        direction: 'down',
        delay: 2300,
      },
      {
        direction: 'down',
        delay: 2400,
      },
      {
        direction: 'down',
        delay: 2500,
      },
    ],
  },
  {
    title: 'Test title3',
    author: 'Test author3',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
      {
        direction: 'down',
        delay: 2300,
      },
      {
        direction: 'down',
        delay: 2400,
      },
      {
        direction: 'down',
        delay: 2500,
      },
    ],
  },
  {
    title: 'Test title3',
    author: 'Test author3',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
      {
        direction: 'down',
        delay: 2300,
      },
      {
        direction: 'down',
        delay: 2400,
      },
      {
        direction: 'down',
        delay: 2500,
      },
    ],
  },
  {
    title: 'Test title3',
    author: 'Test author3',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
      {
        direction: 'down',
        delay: 2300,
      },
      {
        direction: 'down',
        delay: 2400,
      },
      {
        direction: 'down',
        delay: 2500,
      },
    ],
  },
];

export class SongSelection extends Phaser.Scene {
  keyboard: any;
  score: Score;
  transition: SceneTransition;
  leaderboardButton: LeaderboardButton;
  background: UiBackground;
  songsContainer: SongsContainer;
  topBar: TopBar;

  constructor() {
    super({ key: 'SongSelection' });
  }

  preload(): void {
    this.load.image('background', background);
    this.load.image('backButton', backButton);
    this.load.image('leaderboardButton', leaderboardButton);
    store.dispatch(setCurrentMapId(0));
    store.dispatch(setCurrentMap(songs[0]));
    this.score = new Score();
  }

  updateSelectedBeatmap(newSelectedSong: number): void {
    store.dispatch(setCurrentMap(songs[newSelectedSong]));
    store.dispatch(setCurrentMapId(newSelectedSong));
  }

  create(): void {
    this.preload();
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.background = new UiBackground({
      scene: this,
      background: 'background',
    });

    this.leaderboardButton = new LeaderboardButton({
      scene: this,
      x: width / 2,
      y: height,
      label: 'Leaderboard',
      callback: () => {},
    });

    this.songsContainer = new SongsContainer({
      scene: this,
      x: 0,
      y: 0,
      beatmaps: songs,
    });

    this.topBar = new TopBar({
      scene: this,
      onBackClick: () => {
        this.scene.start('MainMenu');
      },
    });

    this.transition = new SceneTransition({
      scene: this,
      isShow: true,
    });
    this.transition.show();

    this.keyboard = this.input.keyboard.addKeys({
      next: Phaser.Input.Keyboard.KeyCodes.FORWARD_SLASH,
      prevous: Phaser.Input.Keyboard.KeyCodes.Z,
      select: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });
  }

  update(): void {
    if (this.keyboard.next.isDown) {
      this.updateSelectedBeatmap(this.songsContainer.nextBeatmap());
    }
    if (this.keyboard.prevous.isDown) {
      this.updateSelectedBeatmap(this.songsContainer.prevousBeatmap());
    }
    if (this.keyboard.select.isDown) {
      this.scene.start('MainScene');
    }
  }
}
