import OAuthManager from 'react-native-oauth';

export default class OauthManagerSingleton {

    static sharedInstance = this.sharedInstance == null ? new OauthManagerSingleton() : this.sharedInstance

    _manager = "";

    getManager() {
        const config =  {
            github: {
                client_id: 'fd400247e064699b4703',
                client_secret: '8b93e0327bb5210e02b68de04b3a3ab777ddc1c0',
                callback_url: 'http://localhost/github'
            }
        };
        this._manager = new OAuthManager('RepoBrowserApp-Android'); 
        this._manager.configure(config);
        return this._manager;
    }

    destroyManager() {
        this._manager = '';
    }

}
