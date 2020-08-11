import axios from 'axios';

import { selectedTechnologyApiEndpoint, modifyApiEndpoint } from '../../helpers/api_endpoints';

export function getSelectedTechnology(technology_key) {
    return (dispatch, getState) => {
        dispatch({type: 'SELECTED_TECHNOLOGY_LOADING'});
        const axiosOptions = modifyApiEndpoint(getState, selectedTechnologyApiEndpoint, technology_key);
        axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {            
            dispatch({
                type: 'SET_SELECTED_TECHNOLOGY',
                payload: response.data.data,
            });
        })
        .catch(error => dispatch({type: 'SELECTED_TECHNOLOGY_ERROR'}))
    } 
}