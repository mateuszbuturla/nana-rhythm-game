import { IAudio } from '../../interfaces/audio.interface';
import { UserConfig } from '../userConfig';
import { IIserConfig } from '../../interfaces/userConfig.interface';

export class Audio {
  scene: Phaser.Scene;
  hitsoundAudio: any;
  musicAudio: any;
  userConfig: any;

  constructor(aParams: IAudio) {
    this.scene = aParams.scene;
    this.initAudio(aParams);
  }

  initAudio(aParams: IAudio): void {
    this.userConfig = new UserConfig().getUserConfig();
    if (aParams.hitsounds) {
      this.hitsoundAudio = this.scene.sound.add('hitSound');
      this.hitsoundAudio.volume = this.userConfig.hitsoundVolume / 100;
    }
    this.musicAudio = this.scene.sound.add(aParams.beatmapMusic);
    this.musicAudio.volume = this.userConfig.musicVolume / 100;
  }

  playHitsound(): void {
    this.hitsoundAudio.play();
  }

  playMusic(): void {
    this.musicAudio.play();
  }

  stopMusic(): void {
    this.musicAudio.stop();
  }

  changeMusic(musicKey: string): void {
    this.musicAudio.destroy();
    this.musicAudio = this.scene.sound.add(musicKey);
    this.musicAudio.volume = this.userConfig.musicVolume / 100;
  }
}
