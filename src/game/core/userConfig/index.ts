import { defaultUserConfig } from '../../config/defaultUserConfig';
import { IIserConfig } from '../../interfaces/userConfig.interface';
import { setUserConfig } from '../../redux/userConfig';
import store from '../../redux/store';
import * as fs from 'fs';

export class UserConfig {
  constructor() {}

  setUserConfig(newConfig: any): void {
    let newConfigString = '';

    Object.keys(newConfig).forEach(function (key, index) {
      newConfigString += `${key}=${newConfig[key]}\n`;
    });

    fs.writeFileSync('config.cfg', newConfigString, 'utf8');

    store.dispatch(setUserConfig(newConfig));
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
