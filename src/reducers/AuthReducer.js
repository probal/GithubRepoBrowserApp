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
    FETCH_ISSUE_DETAIL, FETCH_ISSUES_SUCCESS, FETCH_ISSUES_FAIL
} from '../actions/types';

const INITIAL_STATE = { 
    authenticated: false,
    inProgress: false,
    loginErrorMsg: '',
    githubLoginName: '',
    githubDisplayName: '',

    allRepos: [],
    allRepoIssues: [],
    issueDetail: '',

    repoErrorMsg: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return Object.assign({}, state, {
                inProgress: true,
                loginErrorMsg: ''
            });

        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                inProgress: false,
                loginErrorMsg: '',
                githubLoginName: action.payload.login,
                githubDisplayName: action.payload.name
            });

        case LOGIN_USER_FAIL:
            return Object.assign({}, state, {
                inProgress: false,
                loginErrorMsg: 'Login Failed, please try again'
            });

        case FETCH_REPO:
            return Object.assign({}, state, {
                inProgress: true,
                repoErrorMsg: ''
            });

        case FETCH_REPO_SUCCESS:
            return Object.assign({}, state, {
                inProgress: false,
                repoErrorMsg: '',
                allRepos: action.payload
            });

        case FETCH_REPO_FAIL:
            return Object.assign({}, state, {
                inProgress: false,
                repoErrorMsg: 'Error in fetching repo list'
            });
            
        case FETCH_REPO_ISSUES:
            return Object.assign({}, state, {
                inProgress: true,
                allRepoIssues: action.payload
            });

        case FETCH_ISSUES_SUCCESS:
            return Object.assign({}, state, {
                inProgress: false,
                repoErrorMsg: '',
                allRepoIssues: action.payload
            });

        case FETCH_ISSUES_FAIL:
            return Object.assign({}, state, {
                inProgress: false,
                repoErrorMsg: 'Error in fetching issue list'
            });
           
        case FETCH_ISSUE_DETAIL:
            return Object.assign({}, state, {
                issueDetail: action.payload
            });

        case LOGOUT_USER:
            return Object.assign({}, state, {
                inProgress: true
            });

        case LOGOUT_USER_SUCCESS:
            return Object.assign({}, INITIAL_STATE);

        case LOGOUT_USER_FAIL:
            return Object.assign({}, state, {
                inProgress: false
            });
            
        default:
            return state;
    }
};
