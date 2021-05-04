import * as fs from 'fs';

const getDirectories = (source: string) => {
  const dirs = fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return dirs;
};

export default getDirectories;
