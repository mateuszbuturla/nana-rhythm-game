import { combineReducers } from 'redux';
import mapResultReducer from './mapResult';
import currentMapReducer from './currentMap';

const rootReducer = combineReducers({
  mapResult: mapResultReducer,
  currentMap: currentMapReducer,
});

export default rootReducer;
