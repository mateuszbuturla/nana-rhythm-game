import { defaultUserConfig } from '../../config/defaultUserConfig';
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

  createConfigFile(): void {
    let defaultConfig: any = defaultUserConfig;
    let newConfigString = '';
    Object.keys(defaultConfig).forEach(function (key, index) {
      newConfigString += `${key}=${defaultConfig[key]}\n`;
    });

    fs.writeFileSync('config.cfg', newConfigString, 'utf8');
  }

  getUserConfig(): any {
    let config: any = defaultUserConfig;

    if (fs.existsSync('config.cfg')) {
      const data = fs.readFileSync('config.cfg', 'utf8');

      const configData = data.split('\n');

      configData.map((configItem, index) => {
        const splitConfigItem = configItem.split('=');
        config[splitConfigItem[0]] = splitConfigItem[1];
      });
    } else {
      this.createConfigFile();
    }

    store.dispatch(setUserConfig(config));
    return config;
  }
}
