import store from '../../redux/store';
import * as fs from 'fs';
import getDirectories from '../../utils/getDirectories';

export class BeatmapReader {
  constructor() {}

  getBeatmaps(): any {
    const beatmapsDirs = getDirectories('beatmaps');

    beatmapsDirs.map((beatmapDir, index) => {
      if (fs.existsSync(`beatmaps/${beatmapDir}/beatmap.nana`)) {
        const beatmapData = fs.readFileSync(
          `beatmaps/${beatmapDir}/beatmap.nana`,
          'utf8',
        );

        const metaDataString = beatmapData
          .slice(
            beatmapData.indexOf('[METADATA]') + 12,
            beatmapData.indexOf('[/METADATA]'),
          )
          .split('\n');

        let metaData: any = {};

        metaDataString.map((data) => {
          const splitData = data.split(':');
          metaData[splitData[0]] = splitData[1];
        });
      }
    });
  }
}
