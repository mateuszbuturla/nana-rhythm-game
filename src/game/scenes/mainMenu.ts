import { Text } from '../objects/basic/text';
import { Image } from '../objects/basic/image';
import { OptionsPanel } from '../objects/optionsPanel';
import background from '../../../assets/backgrounds/bg.png';
import playButton from '../../../assets/ui/playButton.png';
import editorButton from '../../../assets/ui/editorButton.png';
import settingsButton from '../../../assets/ui/settingsButton.png';
import exitButton from '../../../assets/ui/exitButton.png';
import gradient from '../../../assets/ui/gradient.png';
import playButtonDecoration from '../../../assets/ui/playButtonDecoration.png';
import editorButtonDecoration from '../../../assets/ui/editorButtonDecoration.png';
import settingsButtonDecoration from '../../../assets/ui/settingsButtonDecoration.png';
import exitButtonDecoration from '../../../assets/ui/exitButtonDecoration.png';
import { GameConfig } from '../config/config';
import { SceneTransition } from '../objects/ui/sceneTransition';
import { UiBackground } from '../objects/ui/uiBackground';
import { BeatmapReader } from '../core/beatmap';

import { MainMenuButton } from '../objects/ui/mainMenuButton';

export class MainMenu extends Phaser.Scene {
  optionsPanel: OptionsPanel;
  playButton: MainMenuButton;
  editorButton: MainMenuButton;
  settingsButton: MainMenuButton;
  exitButton: MainMenuButton;
  logo: any;
  versionLabel: Text;
  version: Text;
  transition: SceneTransition;
  mainMenubackground: UiBackground;
  beatmapsReader: BeatmapReader;

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload(): void {
    this.load.image('background', background);
    this.load.image('playButton', playButton);
    this.load.image('editorButton', editorButton);
    this.load.image('settingsButton', settingsButton);
    this.load.image('exitButton', exitButton);
    this.load.image('gradient', gradient);
    this.load.image('playButtonDecoration', playButtonDecoration);
    this.load.image('editorButtonDecoration', editorButtonDecoration);
    this.load.image('settingsButtonDecoration', settingsButtonDecoration);
    this.load.image('exitButtonDecoration', exitButtonDecoration);
  }

  create(): void {
    const width = this.sys.game.canvas.width;
    const height = this.sys.game.canvas.height;
    this.preload();

    this.mainMenubackground = new UiBackground({
      scene: this,
      background: 'background',
    });

    this.playButton = new MainMenuButton({
      scene: this,
      x: 250,
      y: height / 2,
      texture: 'playButton',
      textureDecoration: 'playButtonDecoration',
      label: 'Play',
      callback: () => {
        this.transition.hide(() => {
          this.scene.start('SongSelection');
        });
      },
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
    this.editorButton = new MainMenuButton({
      scene: this,
      x: 550,
      y: height / 2,
      texture: 'editorButton',
      textureDecoration: 'editorButtonDecoration',
      label: 'Editor',
      callback: () => {},
    });
    this.settingsButton = new MainMenuButton({
      scene: this,
      x: 1370,
      y: height / 2,
      texture: 'settingsButton',
      textureDecoration: 'settingsButtonDecoration',
      label: 'Settings',
      callback: () => {
        this.optionsPanel.showPanel();
      },
    });
    this.exitButton = new MainMenuButton({
      scene: this,
      x: 1680,
      y: height / 2,
      texture: 'exitButton',
      textureDecoration: 'exitButtonDecoration',
      label: 'Exit',
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

    this.beatmapsReader = new BeatmapReader();

    this.beatmapsReader.getBeatmaps();
  }

  update() {
    this.playButton.update();
    this.editorButton.update();
    this.settingsButton.update();
    this.exitButton.update();
    this.optionsPanel.update();
  }
}
