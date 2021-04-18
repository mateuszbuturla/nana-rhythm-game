namespace nanaGame.Beatmap
{
    class BeatmapEntity
    {
        string title;
        string artist;
        string author;

        public BeatmapEntity(string title, string artist, string author)
        {
            this.title = title;
            this.artist = artist;
            this.author = author;
        }

        public string Title
        {
            get { return title; }
            set { title = value; }
        }
    }
}
