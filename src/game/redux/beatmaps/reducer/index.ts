import types from '../types';

const INITIAL_STATE: any = {
  beatmaps: [],
};

const beatmapsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.SET_BEATMAPS:
      return {
        ...state,
        beatmaps: action.item,
      };
    default:
      return state;
  }
};

export default beatmapsReducer;
