import { defaultUserConfig } from '../../config/defaultUserConfig';
import { IIserConfig } from '../../interfaces/userConfig.interface';
import { setUserConfig } from '../../redux/userConfig';
import store from '../../redux/store';
import * as fs from 'fs';

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

  // async test() {
  //   let configtest: any = {};
  //   await fs.readFileSync('config.cfg', 'utf8', (err, data) => {
  //     const configData = data.split('\n');

  //     configData.map((configItem, index) => {
  //       const splitConfigItem = configItem.split('=');
  //       console.log(splitConfigItem);
  //       configtest['test'] = splitConfigItem[1];
  //     });
  //   });
  //   return configtest;
  // }

  instanceOfA(object: any, key: string): object is IIserConfig {
    return key in object;
  }

  getUserConfig(): any {
    let config: any = {
      hitPosition: 100,
      musicVolume: 50,
      hitsoundVolume: 50,
    };

    const data = fs.readFileSync('config.cfg', 'utf8');

    const configData = data.split('\n');

    configData.map((configItem, index) => {
      const splitConfigItem = configItem.split('=');
      config[splitConfigItem[0]] = splitConfigItem[1];
    });

    store.dispatch(setUserConfig(configData));
    return config;
  }
}
