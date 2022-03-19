import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

// import UserCreateReducer from './UserCreateReducer';

import { reducer as formReducer } from 'redux-form';

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    userRoot: userReducer,
    errorRoot: errorReducer,
    customization: customizationReducer,
    form: formReducer
});

export default reducer;
