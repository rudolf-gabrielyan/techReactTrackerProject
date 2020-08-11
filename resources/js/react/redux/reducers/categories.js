const initialState = {
    isLoading: false,
    data: [],
};

export default function categories(state = initialState, action) {
    switch(action.type) {
        case 'CATEGORIES_LOADING' :
            return { ...initialState, isLoading: true };
        case 'SET_CATEGORIES' : 
            return { isLoading: false, data: action.payload };
        case 'CATEGORIES_ERROR' :
            return initialState;
        default :
            return state
    }
}