import OAuthManager from 'react-native-oauth';
import {Platform} from 'react-native';

export default class OauthManagerSingleton {

    static sharedInstance = this.sharedInstance == null ? new OauthManagerSingleton() : this.sharedInstance

    _manager = "";

    getManager() {
        if (Platform.OS === 'ios'){
            const config =  {
                github: {
                    client_id: 'd1ca111fc45bae612c58',
                    client_secret: '536714e1055efd8d0fc956de73cc183503fe2577',
                    callback_url: 'RepoBrowserApp-IOS://oauth'
                }
            };
            this._manager = new OAuthManager('RepoBrowserApp-IOS'); 
            this._manager.configure(config);
        }
        else{
            const config =  {
                github: {
                    client_id: 'fd400247e064699b4703',
                    client_secret: '8b93e0327bb5210e02b68de04b3a3ab777ddc1c0',
                    callback_url: 'http://localhost/github'
                }
            };
            this._manager = new OAuthManager('RepoBrowserApp-Android'); 
            this._manager.configure(config);
        }
        return this._manager;
    }

    destroyManager() {
        this._manager = '';
        return _manager;
    }

}
