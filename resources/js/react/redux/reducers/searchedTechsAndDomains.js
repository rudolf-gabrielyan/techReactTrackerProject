const initialState = {
    isLoading: false,
    searchValue: '',
    hasResults: false,
    domains: [],
    technologies: [],
};

export default function searchedTechsAndDomains(state = initialState, action) {
    switch(action.type) {
        case 'SET_SEARCH_LOADING' : 
            return { ...initialState, isLoading: true };
        case 'SET_SEARCH_RESULTS' :
            let hasResults = false;
            if(action.payload.technologies.length) hasResults = true; 
            if(action.payload.domains.length) hasResults = true; 
            return { hasResults, isLoading: false, ...action.payload };
        case 'NO_SEARCH_VALUE' : 
            return initialState;
        case 'SEARCH_RESUTLS_ERROR' :
            return initialState;
        default :
            return state
    }
}