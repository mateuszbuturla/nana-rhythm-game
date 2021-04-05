import userConfigReducer from './reducer';
import types from './types';
import { setUserConfig } from './actions';
import { getUserConfig } from './getters';

export default userConfigReducer;

export { types, setUserConfig, getUserConfig };
