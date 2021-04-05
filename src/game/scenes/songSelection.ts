import { Text } from '../objects/basic/text';
import store from '../redux/store';
import {
  setCurrentMap,
  setCurrentMapId,
  getCurrentMapId,
} from '../redux/currentMap';

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
  sceneTitle: Text;
  selectedSongTitle: Text;
  selectedSongAuthor: Text;
  selectedSongNotesCount: Text;
  songsContainer: Phaser.GameObjects.Container;
  songsObject: Phaser.GameObjects.Container[] = [];

  constructor() {
    super({ key: 'SongSelection' });
  }

  preload(): void {
    store.dispatch(setCurrentMapId(0));
    store.dispatch(setCurrentMap(songs[0]));
  }

  updateSelectedSong(newSelectedSong: number): void {
    store.dispatch(setCurrentMap(songs[newSelectedSong]));
    store.dispatch(setCurrentMapId(newSelectedSong));
    songs[newSelectedSong].title;
    this.selectedSongAuthor.text = songs[newSelectedSong].author;
    this.selectedSongNotesCount.text = String(
      songs[newSelectedSong].notes.length,
    );
  }

  create(): void {
    this.preload();
    this.sceneTitle = new Text({
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
      text: songs[getCurrentMapId()].title,
    });
    this.selectedSongAuthor = new Text({
      scene: this,
      x: 100,
      y: 170,
      text: songs[getCurrentMapId()].author,
    });
    this.selectedSongNotesCount = new Text({
      scene: this,
      x: 100,
      y: 200,
      text: String(songs[getCurrentMapId()].notes.length),
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

      newContainer.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, 300, 100),
        Phaser.Geom.Rectangle.Contains,
      );
      newContainer.on('pointerdown', () => {
        if (getCurrentMapId() !== index) {
          return this.updateSelectedSong(index);
        }

        this.scene.start('MainScene');
      });

      this.songsContainer.add(newContainer);

      this.songsObject = [...this.songsObject, newContainer];
    });
  }
}
