import types from '../types';

const setUserConfig = (item: any) => {
  return {
    type: types.SET_USER_CONFIG,
    item,
  };
};

export { setUserConfig };
