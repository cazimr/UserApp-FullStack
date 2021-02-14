import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import usersReducer from './users/usersReducer';

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer
});

export default rootReducer;