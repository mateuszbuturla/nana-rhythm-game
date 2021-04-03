import currentMapReducer from './reducer';
import types from './types';
import { setCurrentMap, setCurrentMapId } from './actions';
import { getCurrentMapId, getCurrentMap } from './getters';

export default currentMapReducer;

export {
  types,
  setCurrentMap,
  setCurrentMapId,
  getCurrentMapId,
  getCurrentMap,
};
