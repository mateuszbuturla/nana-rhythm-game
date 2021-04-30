using System.Collections.Generic;

namespace nanaGame.Beatmap
{
    public enum NoteDirectionEnum
    {
        TOP,
        BOTTOM
    }

    public class Note
    {
        int delay;
        NoteDirectionEnum noteDirection;

        public Note (int delay, NoteDirectionEnum noteDirection)
        {
            this.delay = delay;
            this.noteDirection = noteDirection;
        }

        public int Delay
        {
            get { return delay; }
            set { delay = value; }
        }

        public NoteDirectionEnum NoteDirection
        {
            get { return noteDirection; }
            set { noteDirection = value; }
        }
    }

    public class BeatmapEntity
    {
        string title;
        string artist;
        string author;
        int bpm;
        int beatmapOffset;
        float beatmapDifficulty;
        List<Note> notes;
        string path;

        public BeatmapEntity(string title, string artist, string author, int bpm, int beatmapOffset, float beatmapDifficulty, List<Note> notes, string path)
        {
            this.title = title;
            this.artist = artist;
            this.author = author;
            this.bpm = bpm;
            this.beatmapOffset = beatmapOffset;
            this.beatmapDifficulty = beatmapDifficulty;
            this.notes = notes;
            this.path = path;
        }

        public string Title
        {
            get { return title; }
            set { title = value; }
        }

        public string Path
        {
            get { return path; }
            set { path = value; }
        }
    }
}
