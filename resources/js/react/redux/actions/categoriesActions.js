import axios from 'axios';

import { modifyApiEndpoint, categoriesApiEndpoint } from '../../helpers/api_endpoints';

export function getCategories() {
    return (dispatch, getState) => {
        dispatch({type: 'CATEGORIES_LOADING'});
        const axiosOptions = modifyApiEndpoint(getState, categoriesApiEndpoint);
        axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {
            dispatch({
                type: 'SET_CATEGORIES',
                payload: response.data.data.categories
            });
        })
        .catch(error => {
            dispatch({type: 'CATEGORIES_ERROR'});
        })
    }
}