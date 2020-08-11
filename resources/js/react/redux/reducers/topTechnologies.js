const initialState = {
    isLoading: false,
    data: [],
};

export default function topTechnologies(state = initialState, action) {
    switch(action.type) {
        case 'TOP_TECHNOLOGIES_LOADING' :
            return { ...initialState, isLoading: true };
        case 'SET_TOP_TECHNOLOGIES' : 
            return { isLoading: false, data: action.payload };
        case 'TOP_TECHNOLOGIES_ERROR' :
            return initialState;
        default :
            return state
    }
}