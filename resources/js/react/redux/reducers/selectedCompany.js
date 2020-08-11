const initialState = {
    isLoading: false,
    domain: '',
    locations: [{ }],
    installed: [],
    technologyChanges: [],
    number_of_technologies: 0,
};

export default function selectedCompany(state = initialState, action) {
    switch(action.type) {
        case 'SELECTED_COMPANY_LOADING' :
            return { ...initialState, isLoading: true };
        case 'SET_SELECTED_COMPANY' :
            return { ...action.payload, isLoading: false };
        case 'SELECTED_COMPANY_NOT_FOUND' :
            return initialState;
        case 'SELECTED_COMPANY_ERROR' :
            return initialState;
        default :
            return state
    }
}