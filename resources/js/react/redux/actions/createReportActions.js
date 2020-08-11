import axios from 'axios';
import { modifyApiEndpoint, searchingTechsAndDomainsApiEndpoint, searchIndustriesApiEndpoint, searchLocationsApiEndpoint } from '../../helpers/api_endpoints';
import editStringKeyForBackend from '../../helpers/editStringKeyForBackend';

export function getSearchedTechnologies(value) {
    return (dispatch, getState) => {
        if(value.trim() !== '') {
            const axiosOptions = modifyApiEndpoint(getState, searchingTechsAndDomainsApiEndpoint, value);
            dispatch({type: 'SET_SEARCHED_TECHS_LOADING'});
            axios.get(axiosOptions.url, axiosOptions.options)
            .then(response => {
                dispatch({
                    type: 'SET_SEARCHED_TECHS',
                    payload: { searchValue: value, technologies: response.data.data.technologies }
                });
            })
            .catch(error => dispatch({type: 'SEARCHED_TECHS_ERROR'}))
        }else {
            dispatch({
                type: 'UNSET_SEARCHED_TECHS',
                payload: { searchValue: value, technologies: [] }
            });
        }
    }
};

export function selectTechnology(id) {
    return (dispatch, getState) => {
        const createReport = getState().createReport;
        const selectedTechnology = createReport.technologies.find(technology => technology.id === id);
        dispatch({
            type: 'SET_SELECTED_REPORT_TECHNOLOGY',
            payload: selectedTechnology
        });
        return Promise.resolve(selectedTechnology)
    }
};

export function setIncludedWebsitesCount(value) {
    return ({
        type: 'SET_INCLUDED_WEBSITES_COUNT',
        payload: value
    })
};

export function updateSelectedOptionData(changedOptionKey, changedField) {
    return (dispatch) => {
        dispatch({
            type: 'SET_CHANGED_OPTION',
            payload: { changedOptionKey, changedField }
        })
    }
};

export function getSearchedIndustries(inputValue) {
    return (dispatch, getState) => {
        const axiosOptions = modifyApiEndpoint(getState, searchIndustriesApiEndpoint, inputValue);
        return axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => response.data.data.map(industry => ({ value: industry, label: industry })))
    }
};

export function getSearchedTechnologiesForSelect(inputValue) {
    return (dispatch, getState) => {
        const axiosOptions = modifyApiEndpoint(getState, searchingTechsAndDomainsApiEndpoint, inputValue);
        return axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => response.data.data.technologies.map(technology => {
            const objectForKeyIssue = { name: technology.name, logo_url: technology.logo_url };
            Object.defineProperty(objectForKeyIssue, 'toString', {
                value: () => technology.name,
            });
            return { value: objectForKeyIssue, label: technology.name }
        }))
    }
};

export function getSearchedLocations(inputValue) {
    return (dispatch, getState) => {
        const axiosOptions = modifyApiEndpoint(getState, searchLocationsApiEndpoint, inputValue);
        return axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {
            if(!response.data.data.length) {
                const locations = [];
                for(let country in response.data.data) {
                    response.data.data[country].forEach(state => {
                        const objectForKeyIssue = { country, state };
                        Object.defineProperty(objectForKeyIssue, 'toString', {
                            value: () => state,
                        });
                        locations.push({ label: country + ', ' + state, value: objectForKeyIssue });
                    });
                };
                return locations
            }
        })
    }
};

export function buildNewReport() {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_SEARCHED_TECHS_LOADING' });
        const createReport = getState().createReport;
        const selectedOptions = createReport.selectedOptions;
        const data = {
            user_id: getState().user.data.id,
            technology_name: createReport.selectedTechnology.name,
            technology_key: createReport.selectedTechnology.technology_key,
            technology_logo_url: createReport.selectedTechnology.logo_url,
            included_websites_count: createReport.includedWebsitesCount,
        };
        for(let key in selectedOptions) {
            if(selectedOptions[key].checked) {
                data[editStringKeyForBackend(key)] = JSON.stringify(selectedOptions[key].value.map(value => {
                    if(typeof value === 'string') {
                        return value
                    }else {
                        return value.value
                    };
                }));
            };
        };
        return axios.post('/api/createReport', data)
            .then(response => {
                dispatch({
                    type: 'UPDATE_USED_REPORTS_COUNT',
                    payload: response.data
                });
                dispatch({type: 'REPORT_CREATED'});
            })       
    }
};