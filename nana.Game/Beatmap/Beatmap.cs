using System.Collections.Generic;

namespace nanaGame.Beatmap
{
    enum NoteDirectionEnum
    {
        TOP,
        BOTTOM
    }

    class Note
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

    class BeatmapEntity
    {
        string title;
        string artist;
        string author;
        List<Note> notes;

        public BeatmapEntity(string title, string artist, string author, List<Note> notes)
        {
            this.title = title;
            this.artist = artist;
            this.author = author;
            this.notes = notes;
        }

        public string Title
        {
            get { return title; }
            set { title = value; }
        }
    }
}
