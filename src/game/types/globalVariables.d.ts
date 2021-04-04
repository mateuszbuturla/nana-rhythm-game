import 'Phaser';

declare global {
  namespace NodeJS {
    interface Global {
      game: any;
    }
  }
}
export default global;
