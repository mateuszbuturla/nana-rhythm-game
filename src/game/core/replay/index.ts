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

    if (!fs.existsSync(`./replays/${replayData.score}`)) {
      fs.mkdirSync(`./replays/${replayData.score}`);
    }

    fs.writeFile(`./replays/${replayData.score}/${uuidv4()}.rnana`, '', (e) => {
      console.log(e);
    });
  }
}
