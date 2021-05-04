import store from '../../redux/store';
import * as fs from 'fs';
import getDirectories from '../../utils/getDirectories';
import { setBeatmaps } from '../../redux/beatmaps';

export class BeatmapReader {
  constructor() {}

  getBeatmaps(): any {
    const beatmapsDirs = getDirectories('beatmaps');

    let beatmaps: any[] = [];

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

        const beatmapInfoString = beatmapData
          .slice(
            beatmapData.indexOf('[BEATMAPINFO]') + 15,
            beatmapData.indexOf('[/BEATMAPINFO]'),
          )
          .split('\n');

        let beatmapInfo: any = {};

        beatmapInfoString.map((data) => {
          const splitData = data.split(':');
          beatmapInfo[splitData[0]] = splitData[1];
        });

        let beatmapNotesString = beatmapData
          .slice(
            beatmapData.indexOf('[NOTES]') + 9,
            beatmapData.indexOf('[/NOTES]'),
          )
          .split('\n');

        let beatmapNotes: any[] = [];

        beatmapNotesString.map((data) => {
          const splitData = data.split(':');
          beatmapNotes.push({
            delay: splitData[0],
            direction: splitData[1],
          });
        });

        beatmaps.push({
          beatmapid: metaData.beatmapid,
          title: metaData.title,
          creator: metaData.author,
          artist: metaData.artist,
          audio: beatmapInfo.audio,
          background: beatmapInfo.background,
          offset: beatmapInfo.offset,
          bpm: beatmapInfo.bpm,
          difficulty: beatmapInfo.difficulty,
          notes: beatmapNotes,
        });
      }
    });

    store.dispatch(setBeatmaps(beatmaps));

    return beatmaps;
  }
}
