import OAuthManager from 'react-native-oauth';

const config =  {
    github: {
        client_id: 'fd400247e064699b4703',
        client_secret: '8b93e0327bb5210e02b68de04b3a3ab777ddc1c0',
        callback_url: 'http://localhost/github'
    }
};
const manager = new OAuthManager('RepoBrowserApp-Android'); 
manager.configure(config);

export default class OauthManagerService {
    
    authorizeCall(callback) {
        manager.authorize('github', {scopes: 'repo, user'})
        .then(function (response) {
            callback(response);
        })
        .catch(function (response) {
            callback(response);
        });
    }
}


