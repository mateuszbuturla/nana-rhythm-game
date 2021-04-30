import types from '../types';

const setHittedNotes = (item: any) => {
  return {
    type: types.SET_HITTED_NOTES,
    item,
  };
};

const addHittedNote = (item: any) => {
  return {
    type: types.ADD_HITTED_NOTE,
    item,
  };
};

const setCombo = (item: any) => {
  return {
    type: types.SET_COMBO,
    item,
  };
};

export { setHittedNotes, addHittedNote, setCombo };
