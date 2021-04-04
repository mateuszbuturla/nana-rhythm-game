import types from '../types';

const INITIAL_STATE: { hittedNotes: string[] } = {
  hittedNotes: [],
};

const mapResultReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.SET_HITTED_NOTES:
      return {
        ...state,
        hittedNotes: action.item,
      };
    case types.ADD_HITTED_NOTE:
      return {
        ...state,
        hittedNotes: [...state.hittedNotes, action.item],
      };
    default:
      return state;
  }
};

export default mapResultReducer;
