import mapResultReducer from './reducer';
import types from './types';
import { setHittedNotes, addHittedNote } from './actions';
import { getHittedNotes } from './getters';

export default mapResultReducer;

export { types, setHittedNotes, addHittedNote, getHittedNotes };
