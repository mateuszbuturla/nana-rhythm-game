import { combineReducers } from 'redux';
import mapResultReducer from './mapResult';

const rootReducer = combineReducers({ mapResult: mapResultReducer });

export default rootReducer;
