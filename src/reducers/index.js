import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
//import RepoReducer from './RepoReducer';

export default combineReducers({
    auth: AuthReducer
    //repos: RepoReducer
});
