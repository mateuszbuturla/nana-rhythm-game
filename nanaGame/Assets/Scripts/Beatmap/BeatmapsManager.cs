using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class BeatmapsManager : MonoBehaviour
{
    public List<string> beatmaps = new List<string>();

    void Start()
    {
        string[] dirs = Directory.GetDirectories(Directory.GetCurrentDirectory() + "/beatmaps");

        foreach (string dir in dirs)
        {
            string beatmap = File.ReadAllText(dir + "/beatmap.nana");

            string[] metaData = beatmap.Substring(beatmap.IndexOf("[METADATA]"), beatmap.IndexOf("[/METADATA]") - beatmap.IndexOf("[METADATA]")).Split('\n');

            string beatmapName = metaData[1];
            string beatmapArtist = metaData[2];
            string beatmapAuthor = metaData[3];
            beatmaps.Add(beatmapName + ":" + beatmapArtist + ":" + beatmapAuthor);
        }
    }
}
