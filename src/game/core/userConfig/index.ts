import { defaultUserConfig } from '../../config/defaultUserConfig';
import { IIserConfig } from '../../interfaces/userConfig.interface';

export class UserConfig {
  constructor() {}

  setUserConfig(newConfig: any): void {
    localStorage.setItem('user-config', JSON.stringify(newConfig));
  }

  private unserialize(): IIserConfig {
    const userConfigLocalStorage = localStorage.getItem('user-config');
    if (
      typeof userConfigLocalStorage === 'string' &&
      userConfigLocalStorage !== 'null'
    ) {
      return JSON.parse(userConfigLocalStorage);
    }
    localStorage.setItem('user-config', JSON.stringify(defaultUserConfig));
    return defaultUserConfig;
  }

  getUserConfig(): IIserConfig {
    return this.unserialize();
  }
}
