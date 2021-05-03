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
import music1 from '../../../assets/sounds/music.mp3';
import gradientBackground from '../../../assets/ui/gradientBackground.png';

export class SongSelection extends Phaser.Scene {
  keyboard: any;
  score: Score;
  transition: SceneTransition;
  leaderboardButton: LeaderboardButton;
  background: UiBackground;
  songsContainer: SongsContainer;
  topBar: TopBar;
  beatmaps: any[];
  currentBeatmap: IMap;

  constructor() {
    super({ key: 'SongSelection' });
  }

  preload(): void {
    this.load.audio('music1', music1);
    this.beatmaps = store.getState().beatmaps.beatmaps;
    this.load.image('background', background);
    this.load.image('backButton', backButton);
    this.load.image('leaderboardButton', leaderboardButton);
    this.load.image('gradientBackground', gradientBackground);
    // store.dispatch(setCurrentMapId(0));
    // store.dispatch(setCurrentMap(this.beatmaps[0]));
    this.currentBeatmap = store.getState().currentMap.currentMap;
    this.load.image(
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
      `beatmaps/${this.currentBeatmap.beatmapid}/background.png`,
    );
    this.score = new Score();
  }

  updateSelectedBeatmap = (newSelectedSong: number): void => {
    const tempTexture = this.load.image(
      `beatmapBackground${this.beatmaps[newSelectedSong].beatmapid}`,
      `beatmaps/${this.beatmaps[newSelectedSong].beatmapid}/background.png`,
    );
    tempTexture.start();
    this.currentBeatmap = this.beatmaps[newSelectedSong];

    this.background.updateBackground(
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
    );

    store.dispatch(setCurrentMap(this.beatmaps[newSelectedSong]));
    store.dispatch(setCurrentMapId(newSelectedSong));
  };

  create(): void {
    this.preload();
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.background = new UiBackground({
      scene: this,
      background: `beatmapBackground${this.currentBeatmap.beatmapid}`,
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
      x: 100,
      y: 100,
      beatmaps: this.beatmaps,
      onBeatmapUpdate: this.updateSelectedBeatmap,
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
    // console.log(this.cache.audio.entries.entries);
    if (this.keyboard.select.isDown) {
      this.scene.start('MainScene');
    }
  }
}
