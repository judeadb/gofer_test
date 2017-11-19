const defaultState = {
    isLoggedIn: false,
    credential: '',
    p_word: ''
};
 
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                isLoggedIn: true,
                credential: action.credential,
                p_word: action.p_word
            });
        case 'LOGOUT':
            return Object.assign({}, state, { 
                credential: '',
                p_word: ''
            });
        default:
            return state;
    }
}