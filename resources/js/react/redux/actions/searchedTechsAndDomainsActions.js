import axios from 'axios';

import { modifyApiEndpoint, searchingTechsAndDomainsApiEndpoint } from '../../helpers/api_endpoints';

export function getSearchedTechsAndDomains(searchValue) {
    return (dispatch, getState) => {
        if(searchValue.trim() === '') {
            return Promise.resolve(dispatch({type: 'NO_SEARCH_VALUE'}))
        }else {
            const axiosOptions = modifyApiEndpoint(getState, searchingTechsAndDomainsApiEndpoint, searchValue);
            dispatch({type: 'SET_SEARCH_LOADING'});
            return axios.get(axiosOptions.url, axiosOptions.options)
            .then(response => {
                dispatch({
                    type: 'SET_SEARCH_RESULTS',
                    payload: {...response.data.data, searchValue}
                });
            })
            .catch(error => {
                dispatch({type: 'SEARCH_RESUTLS_ERROR'});
            })
        }
    }
}