const initialState = {
    isLoading: false,
    alerts: [],
};

export default function alerts(state = initialState, action) {
    switch(action.type) {
        case 'SET_ALERTS_LOADING':
            return { ...state, isLoading: true };
        case 'SET_ALERTS':
            return { ...state, isLoading: false, alerts: action.payload };
        case 'ALERTS_ERROR':
            return initialState;
        default:
            return state
    }
}