import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);
export default createStore(rootReducer);
