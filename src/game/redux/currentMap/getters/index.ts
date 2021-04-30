import store from '../../store';

const getCurrentMapId = (): number => {
  return store.getState().currentMap.currentMapId;
};

const getCurrentMap = () => {
  return store.getState().currentMap.currentMap;
};

export { getCurrentMapId, getCurrentMap };
