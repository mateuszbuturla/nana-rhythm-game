import { BeatmapReader } from '../game/core/beatmap';
import { Game } from '../game/game';
import store from '../game/redux/store';
import { setCurrentMap, setCurrentMapId } from '../game/redux/currentMap';

window.addEventListener('load', () => {
  const beatmaps = new BeatmapReader().getBeatmaps();
  store.dispatch(setCurrentMapId(0));
  store.dispatch(setCurrentMap(beatmaps[0]));
  const game = new Game();
});
