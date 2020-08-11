import axios from 'axios';

export function getReports() {
    return (dispatch, getState) => {
        const userId = getState().user.data.id;
        dispatch({ type: 'SET_REPORTS_LOADING' })
        axios.post('/api/getReports', { user_id: userId })
        .then(response => {
            const groupedReports = [];
            response.data.forEach(report => {
                let isGroupExists = false;
                groupedReports.forEach((groupedReport, index) => {
                    if(groupedReport.find(reportInGroup => reportInGroup.technology_key === report.technology_key)) {
                        groupedReports[index].push(report);
                        isGroupExists = true;
                    };
                });
                if(!isGroupExists) groupedReports.push([report]);
            });
            dispatch({
                type: 'SET_ALL_REPORTS',
                payload: groupedReports
            });
        })
        .catch(() => dispatch({ type: 'REPORTS_ERROR' }))
    }
};

export function selectReport(id) {
    return (dispatch, getState) => {
        const allReports = getState().reports.allReports;
        let selectedReport = undefined;
        allReports.forEach(groupedReport => {
            if(!selectedReport) selectedReport = groupedReport.find(report => report.id === +id);            
        });
        if(selectedReport) {
            dispatch({
                type: 'SET_SELECTED_REPORT',
                payload: selectedReport, 
            });
        };
    }
};

export function deleteReport(report_id, user_id) {
    return (dispatch, getState) => {
        dispatch({type: 'SET_REPORTS_LOADING'});
        return axios.post('/api/deleteReport', { user_id, report_id })
        .then(response => {
            dispatch({
                type: 'UPDATE_USED_REPORTS_COUNT',
                payload: response.data,
            });
            dispatch({type: 'SET_REPORTS_NOT_LOADING'});
        })
    }
};