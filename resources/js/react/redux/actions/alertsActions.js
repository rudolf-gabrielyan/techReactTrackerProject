import axios from 'axios';

export function getAlerts() {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_ALERTS_LOADING' });
        axios.post('/api/getAlerts', { user_id: getState().user.data.id })
        .then(response => {
            const alerts = response.data.map(alert => {
                for(let key in alert) {
                    if(key === 'selected_countries' || key === 'selected_industries' || key === 'employees_count' || key === 'selected_technology') alert[key] = JSON.parse(alert[key]);
                };
                return alert
            });
            dispatch({
                type: 'SET_ALERTS',
                payload: alerts
            });
        })
        .catch(error => dispatch({ type: 'ALERTS_ERROR' }))
    }
}