import getValueForEmployeeSlider from '../../helpers/getValueForEmployeeSlider';

const initialState = {
    isLoading: false,
    selectedCountries: {
        type: 'all',
        countries: [],
    },
    selectedIndustries: {
        type: 'all',
        industries: [],
    },
    employeesCount: getValueForEmployeeSlider([1, 9]),
    selectedTechnology: {},
    alertName: '',
    alert: false,
    email: false,
    slack: false,
};

export default function createAlert(state = initialState, action) {
    switch(action.type) {
        case 'SET_CREATE_ALERT_LOADING':
            return { ...state, isLoading: true };
        case 'SET_COUNTRIES_FOR_ALERT':
            return { ...state, selectedCountries: action.payload };
        case 'SET_INDUSTRIES_FOR_ALERT':
            return { ...state, selectedIndustries: action.payload };
        case 'SET_EMPLOYEES_COUNT':
            return { ...state, employeesCount: action.payload };
        case 'SET_ALERT_TECHNOLOGY':
            return { ...state, selectedTechnology: action.payload };
        case 'SET_ALERT_NAME': 
            return { ...state, alertName: action.payload };
        case 'SET_FEATURE_ENABLED':
            return { ...state, ...action.payload };
        case 'CREATING_ALERT_SUCCESS':
            return initialState;
        case 'CREATING_ALERT_ERROR':
            return { ...state, isLoading: false };
        default:
            return state
    }
}