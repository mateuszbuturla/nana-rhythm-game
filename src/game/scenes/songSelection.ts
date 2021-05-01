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

export class SongSelection extends Phaser.Scene {
  keyboard: any;
  score: Score;
  transition: SceneTransition;
  leaderboardButton: LeaderboardButton;
  background: UiBackground;
  songsContainer: SongsContainer;
  topBar: TopBar;
  beatmaps: any[];

  constructor() {
    super({ key: 'SongSelection' });
  }

  preload(): void {
    this.load.audio('music1', music1);
    this.beatmaps = store.getState().beatmaps.beatmaps;
    this.load.image('background', background);
    this.load.image('backButton', backButton);
    this.load.image('leaderboardButton', leaderboardButton);
    store.dispatch(setCurrentMapId(0));
    store.dispatch(setCurrentMap(this.beatmaps[0]));
    this.score = new Score();
    console.log(this.textures);
  }

  updateSelectedBeatmap(newSelectedSong: number): void {
    // if (
    //   !this.cache.audio
    //     .getKeys()
    //     .includes(`beatmapAudio${this.beatmaps[newSelectedSong].beatmapid}`)
    // ) {

    // }
    // this.load.audio(
    //   `beatmapAudio${this.beatmaps[newSelectedSong].beatmapid}`,
    //   music1,
    // );

    // const tempTexture = this.load.image(
    //   `beatmapAudio${this.beatmaps[newSelectedSong].beatmapid}`,
    //   `beatmaps/${this.beatmaps[newSelectedSong].beatmapid}/background.png`,
    // );
    // tempTexture.start();

    store.dispatch(setCurrentMap(this.beatmaps[newSelectedSong]));
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
      beatmaps: this.beatmaps,
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
