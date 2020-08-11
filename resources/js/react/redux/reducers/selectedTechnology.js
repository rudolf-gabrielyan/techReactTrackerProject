const initialState = {
    isLoading: false,
    name: '',
    competitors_technologies: [],
    installs: {},
    companies_list: {
        list: [],
    },
    employees_range_companies_count: [],
    industry: [],
    locations: {},
};

export default function selectedTechnology(state = initialState, action) {
    switch(action.type) {
        case 'SELECTED_TECHNOLOGY_LOADING' :
            return { ...initialState, isLoading: true };
        case 'SET_SELECTED_TECHNOLOGY' :
            return { isLoading: false, ...action.payload };
        case 'SELECTED_TECHNOLOGY_ERROR' :
            return initialState;
        default :
            return state
    }
}