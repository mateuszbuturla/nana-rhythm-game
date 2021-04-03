import store from '../../store';

const getCurrentMapId = () => {
  return store.getState().currentMap.currentMapId;
};

export { getCurrentMapId };
