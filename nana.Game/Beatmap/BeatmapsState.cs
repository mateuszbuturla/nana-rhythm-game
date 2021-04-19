using nanaGame.Beatmap;
using System.Collections.Generic;

/// <summary>
/// Contains global variables for project.
/// </summary>
public static class BeatmapsState
{
    /// <summary>
    /// Global variable that is constant.
    /// </summary>
    public static List<BeatmapEntity> Beatmaps;

    public static BeatmapEntity CurrentBeatmap;
    public static int CurrentBeatmapIndex;
}