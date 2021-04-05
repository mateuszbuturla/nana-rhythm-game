export class UserConfig {
  constructor() {}

  setUserConfig(newConfig: any): void {
    localStorage.setItem('user-config', JSON.stringify(newConfig));
  }
}
