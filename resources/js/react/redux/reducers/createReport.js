import getValueForEmployeeSlider from '../../helpers/getValueForEmployeeSlider';

const initialState = {
    isLoading: false,
    searchValue: '',
    technologies: [],
    selectedTechnology: {},
    includedWebsitesCount: 100,
    selectedOptions: {
        includedIndustries: {
            checked: false,
            value: []
        },
        excludedIndustries: {
            checked: false,
            value: []
        },
        includedTechnologies: {
            checked: false,
            value: []
        },
        excludedTechnologies: {
            checked: false,
            value: []
        },
        includedEmployeesCount: {
            checked: false,
            value: getValueForEmployeeSlider([1, 9])
        },
        excludedEmployeesCount: {
            checked: false,
            value: getValueForEmployeeSlider([1, 9])
        },
        includedLocations: {
            checked: false,
            value: []
        },
        excludedLocations: {
            checked: false,
            value: []
        },
    }
};

export default function createReport(state = initialState, action) {
    switch(action.type) {
        case 'SET_SEARCHED_TECHS_LOADING':
            return { ...state, isLoading: true };
        case 'SET_SEARCHED_TECHS':
            return { ...state, ...action.payload, isLoading: false };
        case 'SET_SELECTED_REPORT_TECHNOLOGY':
            return { ...state, selectedTechnology: action.payload };
        case 'UNSET_SEARCHED_TECHS':
            return { ...state, ...action.payload };
        case 'SET_INCLUDED_WEBSITES_COUNT':
            return { ...state, includedWebsitesCount: action.payload };
        case 'SET_CHANGED_OPTION':
            return { ...state, selectedOptions: { ...state.selectedOptions, [action.payload.changedOptionKey]: { ...state.selectedOptions[action.payload.changedOptionKey], ...action.payload.changedField } } };
        case 'REPORT_CREATED':
            return initialState;
        case 'SEARCHED_TECHS_ERROR':
            return initialState;
        default:
            return state
    }
};