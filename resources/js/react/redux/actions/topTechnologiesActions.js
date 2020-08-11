import axios from 'axios';

import { modifyApiEndpoint, topTechnologiesApiEndpoint } from '../../helpers/api_endpoints';

export function getTopTechnologies() {
    return (dispatch, getState) => {
        dispatch({type: 'TOP_TECHNOLOGIES_LOADING'});
        const axiosOptions = modifyApiEndpoint(getState, topTechnologiesApiEndpoint);
        axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {
            dispatch({
                type: 'SET_TOP_TECHNOLOGIES',
                payload: response.data.data.technologies
            });
        })
        .catch(error => dispatch({type: 'TOP_TECHNOLOGIES_ERROR'}));
    }
}