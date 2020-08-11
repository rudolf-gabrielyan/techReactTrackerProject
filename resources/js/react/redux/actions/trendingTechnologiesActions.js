import axios from 'axios';

import { modifyApiEndpoint, trendingTechnologiesApiEndpoint } from '../../helpers/api_endpoints';

export function getTrendingTechnologies() {
    return (dispatch, getState) => {
        dispatch({type: 'TRENDING_TECHNOLOGIES_LOADING'});
        const axiosOptions = modifyApiEndpoint(getState, trendingTechnologiesApiEndpoint);
        axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {
            dispatch({
                type: 'SET_TRENDING_TECHNOLOGIES',
                payload: response.data.data.trending_technologies
            });
        })
        .catch(error => dispatch({type: 'TRENDING_TECHNOLOGIES_ERROR'}));
    }
}