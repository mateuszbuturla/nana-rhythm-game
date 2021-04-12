import { Text } from '../objects/basic/text';
import store from '../redux/store';
import {
  setCurrentMap,
  setCurrentMapId,
  getCurrentMapId,
} from '../redux/currentMap';
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
  sceneTitle: Text;
  selectedSongTitle: Text;
  selectedSongAuthor: Text;
  selectedSongNotesCount: Text;
  // songsContainer: Phaser.GameObjects.Container;
  songsObject: Phaser.GameObjects.Container[] = [];
  selectedSongMaxCombo: Text;
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

  updateSelectedSong(newSelectedSong: number): void {
    store.dispatch(setCurrentMap(songs[newSelectedSong]));
    store.dispatch(setCurrentMapId(newSelectedSong));
    songs[newSelectedSong].title;
    this.selectedSongAuthor.text = songs[newSelectedSong].author;
    this.selectedSongNotesCount.text = String(
      songs[newSelectedSong].notes.length,
    );
    this.selectedSongMaxCombo.text = `max combo: ${this.score.getMaxCombo(
      songs[newSelectedSong],
    )}`;
  }

  create(): void {
    this.preload();
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.background = new UiBackground({
      scene: this,
      background: 'background',
    });
    this.sceneTitle = new Text({
      scene: this,
      x: 100,
      y: 50,
      text: 'Song selection',
    });
    this.selectedSongTitle = new Text({
      scene: this,
      x: 100,
      y: 140,
      text: songs[getCurrentMapId()].title,
    });
    this.selectedSongAuthor = new Text({
      scene: this,
      x: 100,
      y: 170,
      text: songs[getCurrentMapId()].author,
    });
    this.selectedSongNotesCount = new Text({
      scene: this,
      x: 100,
      y: 200,
      text: String(songs[getCurrentMapId()].notes.length),
    });
    songs.map((song, index) => {
      const newContainer = this.add.container(0, index * 100);
      const newSongTitle = new Text({
        scene: this,
        x: 0,
        y: 0,
        text: song.title,
      });
      const newSongAuthor = new Text({
        scene: this,
        x: 0,
        y: 35,
        text: song.author,
      });
      newContainer.add(newSongTitle);
      newContainer.add(newSongAuthor);

      newContainer.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, 300, 100),
        Phaser.Geom.Rectangle.Contains,
      );
      newContainer.on('pointerdown', () => {
        if (getCurrentMapId() !== index) {
          return this.updateSelectedSong(index);
        }

        this.scene.start('MainScene');
      });

      this.songsObject = [...this.songsObject, newContainer];
    });
    this.selectedSongMaxCombo = new Text({
      scene: this,
      x: 100,
      y: 230,
      text: `max combo: ${this.score.getMaxCombo(songs[getCurrentMapId()])}`,
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
    });
  }

  update(): void {
    if (this.keyboard.next.isDown) {
      this.songsContainer.nextBeatmap();
    }
    if (this.keyboard.prevous.isDown) {
      this.songsContainer.prevousBeatmap();
    }
  }
}
