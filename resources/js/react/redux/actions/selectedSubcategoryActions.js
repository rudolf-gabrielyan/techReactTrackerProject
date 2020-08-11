import axios from 'axios';

import { modifyApiEndpoint, selectedSubcategoryApiEndpoint } from '../../helpers/api_endpoints';

export function getSelectedSubcategory(subcategoryKey) {
    return (dispatch, getState) => {
        dispatch({type: 'SELECTED_SUBCATEGORY_LOADING'});
        const axiosOptions = modifyApiEndpoint(getState, selectedSubcategoryApiEndpoint, subcategoryKey);
        axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {
            for (let [index, technology] of response.data.data.technologies.entries()) {
                response.data.data.technologies[index].percent = response.data.data.technology_percent[index].percent;
            };
            response.data.data.technologies.sort((techA, techB) => techB.percent - techA.percent);
            dispatch({
                type: 'SET_SELECTED_SUBCATEGORY',
                payload: {...response.data.data.subcategory, websitescount: response.data.data.websitecount, technologies: response.data.data.technologies}
            });
        })
        .catch(error => dispatch({type: 'SELECTED_SUBCATEGORY_ERROR'}))
    } 
}