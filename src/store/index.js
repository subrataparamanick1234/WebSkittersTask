import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// ==============================|| REDUX - MAIN STORE ||============================== //

const initialState = {};

const middleware = [thunk];
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
const persister = 'Demo';

export { store, persister };
