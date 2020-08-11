import axios from 'axios';
import { modifyApiEndpoint, searchIndustriesApiEndpoint, searchingTechsAndDomainsApiEndpoint } from '../../helpers/api_endpoints';
import editStringKeyForBackend from '../../helpers/editStringKeyForBackend';

export function setCountries(selectedCountries) {
    return {
        type: 'SET_COUNTRIES_FOR_ALERT',
        payload: selectedCountries
    }
};

export function getSearchedIndustries(inputValue) {
    return (dispatch, getState) => {
        const axiosOptions = modifyApiEndpoint(getState, searchIndustriesApiEndpoint, inputValue);
        return axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => response.data.data.map(industry => ({ value: industry, label: industry })))
    }
};

export function setIndustries(selectedIndustries) {
    return {
        type: 'SET_INDUSTRIES_FOR_ALERT',
        payload: selectedIndustries
    }
};

export function setEmployeesCount(employeesCount) {
    return {
        type: 'SET_EMPLOYEES_COUNT',
        payload: employeesCount
    }
};

export function getSearchedTechnologiesForSelect(inputValue) {
    return (dispatch, getState) => {
        const axiosOptions = modifyApiEndpoint(getState, searchingTechsAndDomainsApiEndpoint, inputValue);
        return axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => response.data.data.technologies.map(technology => {
            const objectForKeyIssue = { name: technology.name, technology_key: technology.technology_key, logo_url: technology.logo_url };
            Object.defineProperty(objectForKeyIssue, 'toString', {
                value: () => technology.name,
            });
            return { value: objectForKeyIssue, label: technology.name }
        }))
    }
};

export function setTechnology(technology) {
    return {
        type: 'SET_ALERT_TECHNOLOGY',
        payload: technology
    }
};

export function setAlertName(inputValue) {
    return {
        type: 'SET_ALERT_NAME',
        payload: inputValue
    }
};

export function setFeatureEnabled(feature) {
    return {
        type: 'SET_FEATURE_ENABLED',
        payload: feature
    }
};

export function saveAlert() {
    return (dispatch, getState) => {
        const { createAlert } = getState();
        const data = { user_id: getState().user.data.id };
        dispatch({ type: 'SET_CREATE_ALERT_LOADING' });
        for(let key in createAlert) {
            if(key !== 'isLoading') {
                if(typeof createAlert[key] === 'object') {
                    data[editStringKeyForBackend(key)] = JSON.stringify(createAlert[key]);
                }else {
                    data[editStringKeyForBackend(key)] = createAlert[key];
                };
            };
        };
        return axios.post('/api/createAlert', data)
        .then(response => {
            dispatch({
                type: 'UPDATE_USED_TECHNOLOGY_ALERTS_COUNT',
                payload: response.data.used_technology_alerts_count,
            });
            const alerts = response.data.map(alert => {
                for(let key in alert) {
                    if(key === 'selected_countries' || key === 'selected_industries' || key === 'employees_count' || key === 'selected_technology') alert[key] = JSON.parse(alert[key]);
                };
                return alert
            });
            dispatch({
                type: 'SET_ALERTS',
                payload: alerts,
            });
            dispatch({ type: 'CREATING_ALERT_SUCCESS' });
        })
        .catch(error => dispatch({ type: 'CREATING_ALERT_ERROR' }))
    }
};