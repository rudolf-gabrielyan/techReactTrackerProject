import axios from 'axios';

import {  modifyApiEndpoint, recentTechnologiesApiEndpoint } from '../../helpers/api_endpoints';

export function getRecentTechnologies() {
    return (dispatch, getState) => {
        dispatch({type: 'RECENT_TECHS_LOADING'});
        const axiosOptions = modifyApiEndpoint(getState, recentTechnologiesApiEndpoint);
        axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {
            dispatch({
                type: 'SET_RECENT_TECHS',
                payload: response.data.data.technologies
            })
        })
        .catch(error => {
           dispatch({type: 'RECENT_TECHS_ERROR'});
        })
    }
}