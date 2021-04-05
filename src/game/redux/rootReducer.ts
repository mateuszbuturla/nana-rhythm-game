import { combineReducers } from 'redux';
import mapResultReducer from './mapResult';
import currentMapReducer from './currentMap';
import userConfigReducer from './userConfig';

const rootReducer = combineReducers({
  mapResult: mapResultReducer,
  currentMap: currentMapReducer,
  userConfig: userConfigReducer,
});

export default rootReducer;
