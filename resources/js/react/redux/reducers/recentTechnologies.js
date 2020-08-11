const initialState = {
    isLoading: false,
    data: [],
};

export default function recentTechnologies(state = initialState, action) {
    switch(action.type) {
        case 'RECENT_TECHS_LOADING' :
            return { ...initialState, isLoading: true }
        case 'SET_RECENT_TECHS' :
            return { isLoading: false, data: action.payload };
        case 'RECENT_TECHS_ERROR' :
            return initialState;
        default : 
            return state
    }
}