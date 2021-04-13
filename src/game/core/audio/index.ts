import { IAudio } from '../../interfaces/audio.interface';

export class Audio {
  scene: Phaser.Scene;
  hitsoundAudio: any;
  musicAudio: any;

  constructor(aParams: IAudio) {
    this.scene = aParams.scene;
    this.initAudio(aParams);
  }

  initAudio(aParams: IAudio): void {
    this.hitsoundAudio = this.scene.sound.add('hitSound');
    this.musicAudio = this.scene.sound.add(aParams.beatmapMusic);
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
}
