using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.IO;
using nanaGame.Utils;

namespace nanaGame.Beatmap
{
    class BeatmapReader
    {
        public List<BeatmapEntity> GetBeatmapsData ()
        {
            List<BeatmapEntity> beatmaps = new List<BeatmapEntity>();
            string[] dirs = Directory.GetDirectories(Directory.GetCurrentDirectory() + "/beatmaps");

            foreach (string dir in dirs)
            {
                string beatmap = File.ReadAllText(dir + "/beatmap.nana");

                var metaData = beatmap.Substring(beatmap.IndexOf("[METADATA]"), beatmap.IndexOf("[/METADATA]")).Split("\n");

                var beatmapTitle = metaData[new NanaUtils().FindIndex(metaData, "title")];
                var beatmapArtist = metaData[new NanaUtils().FindIndex(metaData, "artist")];
                var beatmapAuthor = metaData[new NanaUtils().FindIndex(metaData, "author")];

                var beatmapInfo = beatmap.Substring(beatmap.IndexOf("[BEATMAPINFO]"), beatmap.IndexOf("[/BEATMAPINFO]")).Split("\n");

                var beatmapBpm = int.Parse(beatmapInfo[new NanaUtils().FindIndex(metaData, "bpm")]);

                var notes = beatmap.Substring(beatmap.IndexOf("[NOTES]"), beatmap.IndexOf("[/NOTES]") - beatmap.IndexOf("[NOTES]")).Split("\n");
                List<Note> notesList = new List<Note>();

                notes = new NanaUtils().RemoveFromStringArrayByIndex(notes, notes.Length - 1);
                notes = new NanaUtils().RemoveFromStringArrayByIndex(notes, 0);

                foreach (string note in notes)
                {
                    var splitedNote = note.Split(":");

                    int delay = int.Parse(splitedNote[0]);
                    NoteDirectionEnum noteDirection = (NoteDirectionEnum)Enum.Parse(typeof(NoteDirectionEnum), splitedNote[1], true);

                    notesList.Add(new Note(delay, noteDirection));
                }

                beatmaps.Add(new BeatmapEntity(beatmapTitle, beatmapArtist, beatmapAuthor, beatmapBpm, notesList));
            }
            return beatmaps;
        }
    }
}
