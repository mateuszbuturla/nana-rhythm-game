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
import rankingTileBackground from '../../../assets/ui/rankingTileBackground.png';
import rankingTileBackgroundDecoration from '../../../assets/ui/rankingTileBackgroundDecoration.png';
import { Audio } from '../core/audio';
import { RankingTile } from '../objects/ui/rankingTile';
import { RankingContainer } from '../objects/ui/rankingContainer';
import { Replay } from '../core/replay';
import { ReplayStats } from '../objects/ui/replayStats';
import replayStatsBackground from '../../../assets/ui/replayStatsBackground.png';

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
  rankingContainerObject: RankingContainer;
  replay: Replay;
  replayStats: ReplayStats;

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
    this.load.image('rankingTileBackground', rankingTileBackground);
    this.load.image('replayStatsBackground', replayStatsBackground);
    this.load.image(
      'rankingTileBackgroundDecoration',
      rankingTileBackgroundDecoration,
    );
    // store.dispatch(setCurrentMapId(0));
    // store.dispatch(setCurrentMap(this.beatmaps[0]));
    this.currentBeatmap = store.getState().currentMap.currentMap;
    this.beatmaps.map((beatmap) => {
      this.load.image(
        `beatmapBackground${beatmap.beatmapid}`,
        `beatmaps/${beatmap.beatmapid}/background.png`,
      );
      this.load.audio(
        `beatmapAudio${beatmap.beatmapid}`,
        `beatmaps/${beatmap.beatmapid}/audio.mp3`,
      );
    });
    this.score = new Score();
    this.replay = new Replay();
  }

  playBeatmap = (): void => {
    this.audio.stopMusic();
    this.scene.start('MainScene');
  };

  generateBeatmapRanking(newBeatmapId: number) {
    this.rankingContainerObject = new RankingContainer({
      scene: this,
      x: 1100,
      y: 603,
      places: this.replay
        .getLocalScoresForBeatmap(Number(newBeatmapId))
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .map((replay, index) => ({ ...replay, place: index + 1 })),
    });
  }

  updateSelectedBeatmap = (newSelectedSong: number): void => {
    this.rankingContainerObject.destroy();
    this.currentBeatmap = this.beatmaps[newSelectedSong];

    this.audio.stopMusic();
    this.audio.changeMusic(
      `beatmapAudio${this.beatmaps[newSelectedSong].beatmapid}`,
    );
    this.audio.playMusic();

    this.background.updateBackground(
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
    );

    this.beatmapInfo.changeBeatmap(this.beatmaps[newSelectedSong]);

    store.dispatch(setCurrentMap(this.beatmaps[newSelectedSong]));
    store.dispatch(setCurrentMapId(newSelectedSong));
    this.generateBeatmapRanking(Number(this.currentBeatmap.beatmapid));
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
      onBeatmapSelect: this.playBeatmap,
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

    this.generateBeatmapRanking(Number(this.currentBeatmap.beatmapid));

    this.replayStats = new ReplayStats({
      scene: this,
      x: 0,
      y: 0,
      mark: 'A',
      score: 134432,
    });
  }

  update(): void {
    this.rankingContainerObject.update();
    if (this.keyboard.select.isDown) {
      this.playBeatmap();
    }
  }
}
