import mapResultReducer from './reducer';
import types from './types';
import { setHittedNotes, addHittedNote, setCombo } from './actions';
import { getHittedNotes, getCombo } from './getters';

export default mapResultReducer;

export {
  types,
  setHittedNotes,
  addHittedNote,
  getHittedNotes,
  setCombo,
  getCombo,
};
