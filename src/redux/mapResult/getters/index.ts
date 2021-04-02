import store from '../../store';

const getHittedNotes = () => {
  return store.getState().mapResult.hittedNotes;
};

export { getHittedNotes };
