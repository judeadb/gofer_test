export const login = (credential, p_word) => {
    return {
        type: 'LOGIN',
        credential: credential,
        p_word: p_word
    };
};
 
export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};
 
export const signup = (credential, p_word) => {
    return (dispatch) => {
    };
};