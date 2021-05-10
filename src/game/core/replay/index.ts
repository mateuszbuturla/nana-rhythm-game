import * as fs from 'fs';
import { IReplay } from '../../interfaces/replay.interface';
import { v4 as uuidv4 } from 'uuid';

export class Replay {
  constructor() {}

  saveLocalReplay(replayData: IReplay): void {
    let replayFileContent: string = `beatmapId:${replayData.beatmapId}\nscore:${replayData.score}\naccuracy:${replayData.accuracy}\nperfectCount:${replayData.perfectCount}\ngoodCount:${replayData.goodCount}\nbadCount:${replayData.badCount}\nmissCount:${replayData.missCount}\nmaxCombo:${replayData.maxCombo}\n`;

    if (!fs.existsSync(`./replays`)) {
      fs.mkdirSync(`./replays`);
    }

    if (!fs.existsSync(`./replays/${replayData.beatmapId}`)) {
      fs.mkdirSync(`./replays/${replayData.beatmapId}`);
    }

    fs.writeFile(
      `./replays/${replayData.beatmapId}/${uuidv4()}.rnana`,
      replayFileContent,
      () => {},
    );
  }
}
