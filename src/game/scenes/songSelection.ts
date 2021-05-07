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
import { BeatmapInfo } from '../objects/ui/beatmpaInfo';
import difficultyEasy from '../../../assets/ui/difficultyEasy.png';
import difficultyMedium from '../../../assets/ui/difficultyMedium.png';
import difficultyHard from '../../../assets/ui/difficultyHard.png';
import difficultyInsane from '../../../assets/ui/difficultyInsane.png';
import difficultyImposible from '../../../assets/ui/difficultyImposible.png';
import { Audio } from '../core/audio';

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
  beatmapInfo: BeatmapInfo;
  audio: Audio;

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
    this.load.image('difficultyEasy', difficultyEasy);
    this.load.image('difficultyMedium', difficultyMedium);
    this.load.image('difficultyHard', difficultyHard);
    this.load.image('difficultyInsane', difficultyInsane);
    this.load.image('difficultyImposible', difficultyImposible);
    // store.dispatch(setCurrentMapId(0));
    // store.dispatch(setCurrentMap(this.beatmaps[0]));
    this.currentBeatmap = store.getState().currentMap.currentMap;
    this.load.image(
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
      `beatmaps/${this.currentBeatmap.beatmapid}/background.png`,
    );
    this.load.audio(
      `beatmapAudio${this.currentBeatmap.beatmapid}`,
      `beatmaps/${this.currentBeatmap.beatmapid}/audio.mp3`,
    );
    this.score = new Score();
  }

  updateSelectedBeatmap = (newSelectedSong: number): void => {
    const tempTexture = this.load.image(
      `beatmapBackground${this.beatmaps[newSelectedSong].beatmapid}`,
      `beatmaps/${this.beatmaps[newSelectedSong].beatmapid}/background.png`,
    );
    tempTexture.start();
    const tempMp3 = this.load.audio(
      `beatmapAudio${this.beatmaps[newSelectedSong].beatmapid}`,
      `beatmaps/${this.beatmaps[newSelectedSong].beatmapid}/audio.mp3`,
    );
    tempMp3.start();
    this.load.once('complete', () => {
      this.audio.stopMusic();
      this.audio.changeMusic(
        `beatmapAudio${this.beatmaps[newSelectedSong].beatmapid}`,
      );
      this.audio.playMusic();
    });
    this.currentBeatmap = this.beatmaps[newSelectedSong];

    this.background.updateBackground(
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
    );

    this.beatmapInfo.changeBeatmap(this.beatmaps[newSelectedSong]);

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
      x: 50,
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
    this.beatmapInfo = new BeatmapInfo({
      scene: this,
      x: 1100,
      y: 150,
      currentBeatmap: this.currentBeatmap,
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

    this.audio = new Audio({
      scene: this,
      beatmapMusic: `beatmapAudio${this.currentBeatmap.beatmapid}`,
    });
    this.audio.playMusic();
  }

  update(): void {
    // console.log(this.cache.audio.entries.entries);
    if (this.keyboard.select.isDown) {
      this.scene.start('MainScene');
    }
  }
}
