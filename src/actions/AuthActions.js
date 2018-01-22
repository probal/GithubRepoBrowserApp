import { navigationResetTo } from '../GlobalNavigator';
import OauthManagerSingleton from '../OauthManagerSingleton'

import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,

    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,

    FETCH_REPO,
    FETCH_REPO_SUCCESS,
    FETCH_REPO_FAIL,

    FETCH_REPO_ISSUES,
    FETCH_ISSUE_DETAIL
} from './types';


const manager = OauthManagerSingleton.sharedInstance.getManager();

export const loginWithGithub = () => {
    return (dispatch) => {
        dispatch({ 
            type: LOGIN_USER
        });
        manager.authorize('github', {scopes: 'user,repo'})
            .then(resp => loginUserSuccess(dispatch, resp))
            .catch(err => loginUserFail(dispatch, err));
    };
};

const loginUserFail = (dispatch, err) => {
    console.log(err);
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, resp) => {
    console.log(resp);
    manager.makeRequest('github', '/user') 
        .then(function(resp) { 
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resp.data
            });
            console.log(resp);
            navigationResetTo('Repo');
        })
        .catch(err => console.log(err))
};

export const logoutFromGithub = () => {
    return (dispatch) => {
        dispatch({ 
            type: LOGOUT_USER
        });
        manager.deauthorize('github')
            .then(function(resp) { 
                dispatch({
                    type: LOGOUT_USER_SUCCESS,
                    payload: resp.data
                });
                // Fixme, destroy manager on logout
                //manager = OauthManagerService.sharedInstance.destroyManager();
                navigationResetTo('Login');
            })
            .catch(function(resp) { 
                dispatch({
                    type: LOGOUT_USER_FAIL
                });
            });
    };
};

export const getMyRepos = () => {
    return (dispatch) => {
        dispatch({ 
            type: FETCH_REPO
        });
        manager.makeRequest('github', '/user/repos')
            .then(function(resp) {
                console.log(resp);
                dispatch({
                    type: FETCH_REPO_SUCCESS,
                    payload: resp.data
                }); 
            })
            .catch(function(err) {
                dispatch({
                    type: FETCH_REPO_FAIL
                });
            });
    };
};

export const getRepoIssues = (repoIssueUrl) => {
    return (dispatch) => {
        dispatch({ type: FETCH_REPO_ISSUES });
        manager.makeRequest('github', repoIssueUrl)
            .then(resp => 
                console.log(resp.data)
            )
            .catch(err => 
                console.log(err)
            );
    };
};

export const getIssuesDetail = (issueDetailUrl) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ISSUE_DETAIL });
        manager.makeRequest('github', issueDetailUrl)
            .then(resp => 
                console.log(resp.data)
            )
            .catch(err => 
                console.log(err)
            );
    };
};