import types from '../types';

const INITIAL_STATE: any = {
  currentMap: {
    title: '',
    author: '',
    notes: [],
  },
  currentMapId: 0,
};

const currentMapReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.SET_CURRENT_MAP:
      return {
        ...state,
        currentMap: action.item,
      };
    case types.SET_CURRENT_MAP_ID:
      return {
        ...state,
        currentMapId: action.item,
      };
    default:
      return state;
  }
};

export default currentMapReducer;
