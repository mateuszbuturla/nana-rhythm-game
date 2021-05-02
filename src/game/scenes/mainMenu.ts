import { Text } from '../objects/basic/text';
import { Image } from '../objects/basic/image';
import { OptionsPanel } from '../objects/optionsPanel';
import background from '../../../assets/backgrounds/bg.png';
import playButton from '../../../assets/ui/playButton.png';
import multiplayerButton from '../../../assets/ui/multiplayerButton.png';
import editorButton from '../../../assets/ui/editorButton.png';
import settingsButton from '../../../assets/ui/settingsButton.png';
import exitButton from '../../../assets/ui/exitButton.png';
import gradient from '../../../assets/ui/gradient.png';
import playButtonDecoration from '../../../assets/ui/playButtonDecoration.png';
import multiplayerButtonDecoration from '../../../assets/ui/multiplayerButtonDecoration.png';
import editorButtonDecoration from '../../../assets/ui/editorButtonDecoration.png';
import settingsButtonDecoration from '../../../assets/ui/settingsButtonDecoration.png';
import exitButtonDecoration from '../../../assets/ui/exitButtonDecoration.png';
import playButtonIcon from '../../../assets/ui/playButtonIcon.png';
import multiplayerButtonIcon from '../../../assets/ui/multiplayerButtonIcon.png';
import editorButtonIcon from '../../../assets/ui/editorButtonIcon.png';
import settingsButtonIcon from '../../../assets/ui/settingsButtonIcon.png';
import exitButtonIcon from '../../../assets/ui/exitButtonIcon.png';
import { GameConfig } from '../config/config';
import { SceneTransition } from '../objects/ui/sceneTransition';
import { UiBackground } from '../objects/ui/uiBackground';
import { BeatmapReader } from '../core/beatmap';

import { MainMenuButton } from '../objects/ui/mainMenuButton';
import { setCurrentMap, setCurrentMapId } from '../redux/currentMap';
import store from '../redux/store';
import { IMap } from '../interfaces/map.interface';

export class MainMenu extends Phaser.Scene {
  optionsPanel: OptionsPanel;
  playButton: MainMenuButton;
  multiplayerButton: MainMenuButton;
  editorButton: MainMenuButton;
  settingsButton: MainMenuButton;
  exitButton: MainMenuButton;
  logo: any;
  versionLabel: Text;
  version: Text;
  transition: SceneTransition;
  mainMenubackground: UiBackground;
  beatmapsReader: BeatmapReader;
  currentBeatmap: IMap;

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(): void {
    this.beatmapsReader = new BeatmapReader();
    this.load.image('background', background);
    this.load.image('playButton', playButton);
    this.load.image('multiplayerButton', multiplayerButton);
    this.load.image('editorButton', editorButton);
    this.load.image('settingsButton', settingsButton);
    this.load.image('exitButton', exitButton);
    this.load.image('gradient', gradient);
    this.load.image('playButtonDecoration', playButtonDecoration);
    this.load.image('multiplayerButtonDecoration', multiplayerButtonDecoration);
    this.load.image('editorButtonDecoration', editorButtonDecoration);
    this.load.image('settingsButtonDecoration', settingsButtonDecoration);
    this.load.image('exitButtonDecoration', exitButtonDecoration);
    this.load.image('playButtonIcon', playButtonIcon);
    this.load.image('multiplayerButtonIcon', multiplayerButtonIcon);
    this.load.image('editorButtonIcon', editorButtonIcon);
    this.load.image('settingsButtonIcon', settingsButtonIcon);
    this.load.image('exitButtonIcon', exitButtonIcon);
    this.currentBeatmap = store.getState().currentMap.currentMap;
    this.load.image(
      `beatmapBackground${this.currentBeatmap.beatmapid}`,
      `beatmaps/${this.currentBeatmap.beatmapid}/background.png`,
    );
  }

  create(): void {
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.preload();

    this.mainMenubackground = new UiBackground({
      scene: this,
      background: `beatmapBackground${this.currentBeatmap.beatmapid}`,
    });

    this.versionLabel = new Text({
      scene: this,
      x: 30,
      y: height - 75,
      text: `version`,
      fontSize: '25px',
      color: 'white',
      fontFamily: 'mainFontB',
    });
    this.versionLabel.setOrigin(0, 0);
    this.version = new Text({
      scene: this,
      x: 30 + this.versionLabel.getBounds().width + 10,
      y: this.versionLabel.y,
      text: `${GameConfig.version}`,
      fontSize: '25px',
      color: 'white',
    });

    this.playButton = new MainMenuButton({
      scene: this,
      x: 0,
      y: height - 300,
      texture: 'playButton',
      textureDecoration: 'playButtonDecoration',
      label: 'Play',
      icon: 'playButtonIcon',
      callback: () => {
        this.transition.hide(() => {
          this.scene.start('SongSelection');
        });
      },
    });
    this.multiplayerButton = new MainMenuButton({
      scene: this,
      x: this.playButton.getSize().width + this.playButton.x,
      y: height - 300,
      texture: 'multiplayerButton',
      textureDecoration: 'multiplayerButtonDecoration',
      label: 'Multiplayer',
      icon: 'multiplayerButtonIcon',
      callback: () => {},
    });
    this.editorButton = new MainMenuButton({
      scene: this,
      x: this.multiplayerButton.getSize().width + this.multiplayerButton.x,
      y: height - 300,
      texture: 'editorButton',
      textureDecoration: 'editorButtonDecoration',
      label: 'Editor',
      icon: 'editorButtonIcon',
      callback: () => {},
    });
    this.settingsButton = new MainMenuButton({
      scene: this,
      x: this.editorButton.getSize().width + this.editorButton.x,
      y: height - 300,
      texture: 'settingsButton',
      textureDecoration: 'settingsButtonDecoration',
      label: 'Settings',
      icon: 'settingsButtonIcon',
      callback: () => {
        this.optionsPanel.showPanel();
      },
    });
    this.exitButton = new MainMenuButton({
      scene: this,
      x: this.settingsButton.getSize().width + this.settingsButton.x,
      y: height - 300,
      texture: 'exitButton',
      textureDecoration: 'exitButtonDecoration',
      label: 'Exit',
      icon: 'exitButtonIcon',
      callback: () => {},
    });
    this.logo = this.add.rectangle(width / 2, height / 2, 450, 450, 0xffffff);
    this.logo.angle = -30;

    this.optionsPanel = new OptionsPanel(this);
    this.optionsPanel.hidePanel();

    this.transition = new SceneTransition({
      scene: this,
      isShow: true,
    });
    this.transition.show();
  }

  update() {
    this.playButton.update();
    this.multiplayerButton.update();
    this.editorButton.update();
    this.settingsButton.update();
    this.exitButton.update();
    this.optionsPanel.update();
  }
}
