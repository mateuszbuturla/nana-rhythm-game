import store from '../../store';

const getUserConfig = () => {
  return store.getState().userConfig;
};

export { getUserConfig };
