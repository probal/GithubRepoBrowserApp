import { 
    FETCH_OWN_REPO
} from '../actions/types';

const INITIAL_STATE = { 
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCH_OWN_REPO:
            return { 
                ...state, 
            };
                        
        default:
            return state;
    }
};
