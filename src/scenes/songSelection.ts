import { Text } from '../objects/text';

const songs = [
  {
    title: 'Test title1',
    author: 'Test author1',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
    ],
  },
  {
    title: 'Test title2',
    author: 'Test author2',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
      {
        direction: 'up',
        delay: 2300,
      },
      {
        direction: 'down',
        delay: 2400,
      },
      {
        direction: 'up',
        delay: 2500,
      },
    ],
  },
  {
    title: 'Test title3',
    author: 'Test author3',
    notes: [
      {
        direction: 'up',
        delay: 1000,
      },
      {
        direction: 'down',
        delay: 1500,
      },
      {
        direction: 'up',
        delay: 2000,
      },
      {
        direction: 'down',
        delay: 2200,
      },
      {
        direction: 'down',
        delay: 2300,
      },
      {
        direction: 'down',
        delay: 2400,
      },
      {
        direction: 'down',
        delay: 2500,
      },
    ],
  },
];

export class SongSelection extends Phaser.Scene {
  text: Text;
  currentSelectedSong: number = 0;
  selectedSongTitle: Text;
  selectedSongAuthor: Text;
  selectedSongNotesCount: Text;
  songsContainer: any;
  songsObject: any[] = [];

  constructor() {
    super({ key: 'SongSelection' });
  }

  preload(): void {}

  create(): void {
    this.preload();
    this.text = new Text({
      scene: this,
      x: 100,
      y: 50,
      text: 'Song selection',
    });
    this.songsContainer = this.add.container(500, 100);
    this.selectedSongTitle = new Text({
      scene: this,
      x: 100,
      y: 140,
      text: songs[this.currentSelectedSong].title,
    });
    this.selectedSongAuthor = new Text({
      scene: this,
      x: 100,
      y: 170,
      text: songs[this.currentSelectedSong].author,
    });
    this.selectedSongNotesCount = new Text({
      scene: this,
      x: 100,
      y: 200,
      text: String(songs[this.currentSelectedSong].notes.length),
    });
    songs.map((song, index) => {
      const newContainer = this.add.container(0, index * 100);
      const newSongTitle = new Text({
        scene: this,
        x: 0,
        y: 0,
        text: song.title,
      });
      const newSongAuthor = new Text({
        scene: this,
        x: 0,
        y: 35,
        text: song.author,
      });
      newContainer.add(newSongTitle);
      newContainer.add(newSongAuthor);
      this.songsContainer.add(newContainer);

      this.songsObject = [...this.songsObject, newContainer];
    });
  }
}
