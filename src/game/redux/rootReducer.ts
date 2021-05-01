import { combineReducers } from 'redux';
import mapResultReducer from './mapResult';
import currentMapReducer from './currentMap';
import userConfigReducer from './userConfig';
import beatmapsReducer from './beatmaps';

const rootReducer = combineReducers({
  mapResult: mapResultReducer,
  currentMap: currentMapReducer,
  userConfig: userConfigReducer,
  beatmaps: beatmapsReducer,
});

export default rootReducer;
