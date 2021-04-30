import types from '../types';

const INITIAL_STATE: {
  hittedNotes: string[];
  combo: {
    combo: number;
    maxCombo: number;
  };
} = {
  hittedNotes: [],
  combo: {
    combo: 0,
    maxCombo: 0,
  },
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
    case types.SET_COMBO:
      return {
        ...state,
        combo: action.item,
      };
    default:
      return state;
  }
};

export default mapResultReducer;
