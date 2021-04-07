import store from '../../store';

const getHittedNotes = () => {
  return store.getState().mapResult.hittedNotes;
};

const getCombo = () => {
  return store.getState().mapResult.combo;
};

export { getHittedNotes, getCombo };
