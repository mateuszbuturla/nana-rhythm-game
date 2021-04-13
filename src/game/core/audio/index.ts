import { IAudio } from '../../interfaces/audio.interface';

export class Audio {
  scene: Phaser.Scene;
  hitsoundAudio: any;
  musicAudio: any;

  constructor(aParams: IAudio) {
    this.scene = aParams.scene;
    this.initAudio();
  }

  initAudio(): void {
    this.hitsoundAudio = this.scene.sound.add('hitSound');
  }

  playHitsound(): void {
    this.hitsoundAudio.play();
  }
}
