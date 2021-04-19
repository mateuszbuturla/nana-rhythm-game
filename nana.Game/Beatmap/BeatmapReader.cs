﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.IO;
using nanaGame.Utils;

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

                beatmaps.Add(new BeatmapEntity(beatmapTitle, beatmapArtist, beatmapAuthor, notesList));
            }
            return beatmaps;
        }
    }
}
