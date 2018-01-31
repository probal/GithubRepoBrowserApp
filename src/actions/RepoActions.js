import { navigationResetTo } from '../GlobalNavigator';
import OAuthManager from 'react-native-oauth';

import {
    FETCH_OWN_REPO
} from './types';

export const getMyRepos = (githubOauthManager) => {
    return (dispatch) => {
        dispatch({ type: FETCH_OWN_REPO });
        githubOauthManager.makeRequest('github', '/user/repos')
            .then(
            )
            .catch(
            );
    };
};