import axios from 'axios';

import { modifyApiEndpoint, selectedCompanyApiEndpoint } from '../../helpers/api_endpoints';

import getDaysBetweenDates from '../../helpers/getDaysBetweenDates';

export function getSelectedCompany(domain) {
    return (dispatch, getState) => {
        dispatch({type: 'SELECTED_COMPANY_LOADING'});
        const axiosOptions = modifyApiEndpoint(getState, selectedCompanyApiEndpoint, domain);
        axios.get(axiosOptions.url, axiosOptions.options)
        .then(response => {
            if(response.data.error) {
                dispatch({type: 'SELECTED_COMPANY_NOT_FOUND'});
            }else {
                const changes = [];
                response.data.data.dropped.forEach(item => {
                    item.technologies.forEach(technology => {
                        const addedTech = {
                            event: 'added',
                            name: technology.name,
                            image_url: technology.image_url,
                            date: technology.added_at,
                            timestamp: getDaysBetweenDates(new Date(), new Date(technology.added_at)),
                        };
                        changes.push(addedTech);
                        const removedTech = {
                            event: 'removed',
                            name: technology.name,
                            image_url: technology.image_url,
                            date: technology.deleted_at,
                            timestamp: getDaysBetweenDates(new Date(), new Date(technology.deleted_at)),
                        };
                        changes.push(removedTech);
                    })
                });
                response.data.data.installed.forEach(item => {
                    item.technologies.forEach(technology => {
                        const addedTech = {
                            event: 'added',
                            name: technology.name,
                            image_url: technology.image_url,
                            date: technology.added_at,
                            timestamp: getDaysBetweenDates(new Date(), new Date(technology.added_at)),
                        };
                        changes.push(addedTech);
                    })
                });
                const technologyChanges = [];
                changes.forEach(change => {
                    if(!technologyChanges.find(item => item.timestamp === change.timestamp)) {
                        technologyChanges.push({ timestamp: change.timestamp, date: change.date, changes: [change] });
                    }else {
                        technologyChanges.find(item => item.timestamp === change.timestamp).changes.push(change);
                    };
                });
                technologyChanges.sort((groupA, groupB) => groupA.timestamp - groupB.timestamp);
                dispatch({
                    type: 'SET_SELECTED_COMPANY',
                    payload: {...response.data.data, technologyChanges}
                });
            };
        })
        .catch(error => dispatch({type: 'SELECTED_COMPANY_ERROR'}));
    }
}