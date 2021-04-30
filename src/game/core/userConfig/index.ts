import { defaultUserConfig } from '../../config/defaultUserConfig';
import { IIserConfig } from '../../interfaces/userConfig.interface';
import { setUserConfig } from '../../redux/userConfig';
import store from '../../redux/store';

export class UserConfig {
  constructor() {}

  setUserConfig(newConfig: IIserConfig): void {
    localStorage.setItem('user-config', JSON.stringify(newConfig));
    store.dispatch(setUserConfig(newConfig));
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
    const config = this.unserialize();
    store.dispatch(setUserConfig(config));
    return config;
  }
}
