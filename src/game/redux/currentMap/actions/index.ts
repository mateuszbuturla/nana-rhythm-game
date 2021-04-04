import types from '../types';

const setCurrentMap = (item: any) => {
  return {
    type: types.SET_CURRENT_MAP,
    item,
  };
};

const setCurrentMapId = (item: any) => {
  return {
    type: types.SET_CURRENT_MAP_ID,
    item,
  };
};

export { setCurrentMap, setCurrentMapId };
