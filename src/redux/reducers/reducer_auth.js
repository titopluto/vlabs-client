import C from "../actions/constants"

const initialState = {
    authenticated: false,
    error_msg: ''
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case C.AUTH_USER:
            return { ...state, authenticated: true, error_msg:''}
        case C.UNAUTH_USER:
            return { ...state , authenticated: false}
        case C.AUTH_ERROR:
            return { ...state, error_msg: action.payload}
        case C.CLEAR_AUTH_ERROR:
            return { ...state, error_msg: ''}
        default:
            return state
    }
}

export default authReducer