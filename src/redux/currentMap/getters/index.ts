import store from '../../store';

const getCurrentMapId = () => {
  return store.getState().currentMap.currentMapId;
};

const getCurrentMap = () => {
  return store.getState().currentMap.currentMap;
};

export { getCurrentMapId, getCurrentMap };
