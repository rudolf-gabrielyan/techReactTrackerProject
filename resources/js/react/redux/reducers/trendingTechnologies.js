const initialState = {
    isLoading: false,
    data: [],
};

export default function trendingTechnologies(state = initialState, action) {
    switch(action.type) {
        case 'TRENDING_TECHNOLOGIES_LOADING' :
            return { ...initialState, isLoading: true };
        case 'SET_TRENDING_TECHNOLOGIES' : 
            return { isLoading: false, data: action.payload };
        case 'TRENDING_TECHNOLOGIES_ERROR' : 
            return initialState;
        default : 
            return state
    }
}