const initialState = {
    isLoading: false,
    isLoggedIn: false,
    data: {},
    loginErrors: {
        email: '',
        password: '',
    },
};

function user(state = initialState , action) {
    switch(action.type) {
        case 'LOGIN_LOADING' :
            return { ...initialState, isLoading: true };
        case 'LOGIN_SUCCESS' :
            return {
                ...initialState,
                isLoggedIn: true,
                data: action.payload,
            };
        case 'LOGIN_ERROR' :
            return {
                ...initialState,
                loginErrors: action.payload,
            };
        case 'NO_LOGGED_USER' :
            return initialState;
        case 'LOGOUT' : 
            return initialState;
        case 'SET_PADDLE_DATA':
            return {...state, data: {...state.data, paddleInfo: action.payload } };
        case 'UPDATE_PADDLE_DATA':
            return { ...state, data: {...state.data, paddleInfo: action.payload } };
        case 'SET_ACCOUNT_INFORMATION':
            return { ...state, data: {...state.data, accountInformation: action.payload } };
        case 'UPDATE_ACCOUNT_INFORMATION':
            return { ...state, data: {...state.data, accountInformation: action.payload } };
        case 'UPDATE_USED_REPORTS_COUNT':
            return { ...state, data: { ...state.data, accountInformation: { ...state.data.accountInformation, used_reports_count: action.payload } } };
        case 'UPDATE_USED_TECHNOLOGY_ALERTS_COUNT':
            return { ...state, data: { ...state.data, accountInformation: { ...state.data.accountInformation, used_technology_alerts_count: action.payload } } };
        case 'PADDLE_DATA_ERROR':
            return state;
        default :
            return state
    }
}

export default user