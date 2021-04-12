import { easeInOutExpo } from './../../../utils/eases';
import { IBeatmapTile } from '../../../interfaces/beatmapTile.interface';
import { Text } from '../../basic/text';
import { LabelValue } from '../labelValue';

export class BeatmapTile extends Phaser.GameObjects.Container {
  dataBackground: Phaser.GameObjects.Rectangle;
  beatmapBackground: Phaser.GameObjects.Sprite;
  beatmapBackgroundDim: Phaser.GameObjects.Rectangle;
  title: Text;
  beatmapLength: LabelValue;
  beatmapDifficulty: LabelValue;
  beatmapBPM: LabelValue;
  beatmapNotesCount: LabelValue;
  beatmapSlidersCount: LabelValue;

  constructor(aParams: IBeatmapTile) {
    super(
      aParams.scene,
      aParams.x,
      aParams.active ? aParams.y - 150 : aParams.y - 50,
    );

    this.initSongTile(aParams);
    this.scene.add.existing(this);
  }

  initSongTile(aParams: IBeatmapTile): void {
    this.dataBackground = this.scene.add.rectangle(0, 150, 380, 200, 0x000000);
    this.dataBackground.setAlpha(0.8);
    this.dataBackground.height += aParams.active ? 100 : 0;
    this.beatmapBackground = this.scene.add.sprite(0, 0, 'background');
    this.beatmapBackground.setDisplaySize(380, 230);
    this.beatmapBackgroundDim = this.scene.add.rectangle(
      0,
      0,
      380,
      230,
      0x000000,
    );
    this.beatmapBackgroundDim.setAlpha(0.35);
    this.title = new Text({
      scene: this.scene,
      x: this.getBounds().width / 2,
      y: 0,
      text: aParams.title,
      align: 'center',
      fontSize: '36px',
      color: 'white',
    });

    this.beatmapLength = new LabelValue({
      scene: this.scene,
      x: this.getBounds().width / 2 - 120,
      y: 150,
      label: 'Length',
      value: `1:30`,
      color: 'white',
      labelFontSize: '23px',
      valueFontSize: '44px',
      margin: 50,
    });
    this.beatmapDifficulty = new LabelValue({
      scene: this.scene,
      x: this.getBounds().width / 2,
      y: 150,
      label: 'Difficulty',
      value: `4`,
      color: 'white',
      labelFontSize: '23px',
      valueFontSize: '44px',
      margin: 50,
    });
    this.beatmapBPM = new LabelValue({
      scene: this.scene,
      x: this.getBounds().width / 2 + 120,
      y: 150,
      label: 'BPM',
      value: `120`,
      color: 'white',
      labelFontSize: '23px',
      valueFontSize: '44px',
      margin: 50,
    });
    this.beatmapNotesCount = new LabelValue({
      scene: this.scene,
      x: this.getBounds().width / 2 - 60,
      y: 260,
      label: 'Notes',
      value: `${aParams.notes.length}`,
      color: 'white',
      labelFontSize: '23px',
      valueFontSize: '44px',
      margin: 50,
    });
    this.beatmapNotesCount.alpha = aParams.active ? 1 : 0;
    this.beatmapSlidersCount = new LabelValue({
      scene: this.scene,
      x: this.getBounds().width / 2 + 60,
      y: 260,
      label: 'Sliders',
      value: `5`,
      color: 'white',
      labelFontSize: '23px',
      valueFontSize: '44px',
      margin: 50,
    });
    this.beatmapSlidersCount.alpha = aParams.active ? 1 : 0;

    this.add(this.dataBackground);
    this.add(this.beatmapBackground);
    this.add(this.beatmapBackgroundDim);
    this.add(this.title);
    this.add(this.beatmapLength);
    this.add(this.beatmapDifficulty);
    this.add(this.beatmapBPM);
    this.add(this.beatmapNotesCount);
    this.add(this.beatmapSlidersCount);
  }

  showHide(type: 'show' | 'hide') {
    const animationTile = this.scene.tweens.createTimeline();

    animationTile.add({
      targets: this,
      y: type === 'show' ? this.y - 100 : this.y + 100,
      ease: easeInOutExpo,
      duration: 300,
    });

    animationTile.play();

    const animationDataBackground = this.scene.tweens.createTimeline();

    animationDataBackground.add({
      targets: this.dataBackground,
      height:
        type === 'show'
          ? this.dataBackground.height + 100
          : this.dataBackground.height - 100,
      ease: easeInOutExpo,
      duration: 300,
    });

    animationDataBackground.play();

    const animationLabels = this.scene.tweens.createTimeline();

    animationLabels.add({
      targets: [this.beatmapNotesCount, this.beatmapSlidersCount],
      alpha: type === 'show' ? 1 : 0,
      ease: easeInOutExpo,
      duration: 300,
    });

    animationLabels.play();
  }
}
