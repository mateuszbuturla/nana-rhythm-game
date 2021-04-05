import types from '../types';
import { IIserConfig } from '../../../interfaces/userConfig.interface';
import { defaultUserConfig } from '../../../config/defaultUserConfig';

const INITIAL_STATE: IIserConfig = defaultUserConfig;

const userConfigReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.SET_USER_CONFIG:
      return action.item;
    default:
      return state;
  }
};

export default userConfigReducer;
