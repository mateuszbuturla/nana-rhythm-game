import * as fs from 'fs';
import { IReplay } from '../../interfaces/replay.interface';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { IRankingData } from '../../interfaces/rankingTile.interface';

export class Replay {
  private tempBeatmapReplaysDir: string[] = [];

  constructor() {}

  private fromDir(dir: string, filter: string): void {
    if (!fs.existsSync(dir)) {
      return;
    }
    const files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
      const filename = path.join(dir, files[i]);
      const stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        this.fromDir(filename, filter);
      } else if (filename.indexOf(filter) >= 0) {
        this.tempBeatmapReplaysDir = [...this.tempBeatmapReplaysDir, filename];
      }
    }
  }

  getLocalScoresForBeatmap(beatmapId: number) {
    const beatmapReplaysPath = `./replays/${beatmapId}`;
    if (!fs.existsSync(beatmapReplaysPath)) {
      return [];
    }

    this.fromDir(beatmapReplaysPath, '.rnana');

    let replays: IRankingData[] = [];

    this.tempBeatmapReplaysDir.map((replayDir, index) => {
      const fullReplayDir = `./${replayDir}`;

      let replay: any = {};

      if (!fs.existsSync(fullReplayDir)) {
        return;
      }

      const data = fs.readFileSync(fullReplayDir, 'utf8');

      const replayData = data.split('\n');

      replayData.map((data) => {
        const splitReplayData = data.split(':');
        replay[splitReplayData[0]] = splitReplayData[1];
      });

      replays = [...replays, replay];
    });

    this.tempBeatmapReplaysDir = [];

    return replays;
  }

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
