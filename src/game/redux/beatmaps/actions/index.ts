import types from '../types';

const setBeatmaps = (item: any) => {
  return {
    type: types.SET_BEATMAPS,
    item,
  };
};

export { setBeatmaps };
