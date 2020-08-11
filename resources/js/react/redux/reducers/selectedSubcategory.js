const initialState = {
    isLoading: false,
    technologies: [],
    websitescount: 0,
};

export default function selectedSubcategory(state = initialState, action) {
    switch(action.type) {
        case 'SELECTED_SUBCATEGORY_LOADING' : 
            return { ...initialState, isLoading: true };
        case 'SET_SELECTED_SUBCATEGORY' : 
            return { isLoading: false, ...action.payload };
        case 'SELECTED_SUBCATEGORY_ERROR' :
            return initialState;
        default :
            return state
    };
}