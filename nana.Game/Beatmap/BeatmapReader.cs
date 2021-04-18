using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

namespace nanaGame.Beatmap
{

    class BeatmapReader
    {
        public int FindIndex(string[] array, string key)
        {
            int index = -1;

            for (int i = 0; i < array.Length; i++)
            {
                if (array[i].Contains(key))
                {
                    index = i;
                }
            }

            return index;
        }

        public List<BeatmapEntity> GetBeatmapsData ()
        {
            List<BeatmapEntity> beatmaps = new List<BeatmapEntity>();
            string[] dirs = Directory.GetDirectories(Directory.GetCurrentDirectory() + "/beatmaps");

            foreach (string dir in dirs)
            {
                string beatmap = File.ReadAllText(dir + "/beatmap.nana");

                var metaData = beatmap.Substring(beatmap.IndexOf("[METADATA]"), beatmap.IndexOf("[NOTES]")).Split("\n");

                var beatmapTitle = metaData[FindIndex(metaData, "title")];
                var beatmapArtist = metaData[FindIndex(metaData, "artist")];
                var beatmapAuthor = metaData[FindIndex(metaData, "author")];

                beatmaps.Add(new BeatmapEntity(beatmapTitle, beatmapArtist, beatmapAuthor));

                Console.WriteLine();
            }
            return beatmaps;
        }
    }
}
