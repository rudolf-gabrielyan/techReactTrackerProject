import React, { useState, useEffect } from 'react';
import './AlertItem.scss';

const AlertItem = ({ alert, selectedAlert, setSelectedAlert }) => {
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        if(selectedAlert.id === alert.id) {
            setShowInfo(true);
        }else {
            setShowInfo(false);
        };
    }, [ selectedAlert ]);

    const handleAlertItemClick = event => {
        if(selectedAlert.id === alert.id) {
            setSelectedAlert({});
        }else {
            setSelectedAlert(alert);
        };
    };

    return(
        <div className='alertItem' onClick={handleAlertItemClick}>
            <div>
                <span><i className="fas fa-cog" /><img src={alert.selected_technology.logo_url} />{alert.alert_name}</span>
                <span>no alerts yet</span>
            </div>
            {
                showInfo && (
                <div>
                    <div>
                        <span>93 Added</span>
                        <div></div>
                        <span>38 Removed</span>
                    </div>
                    <span>1 day ago</span>
                </div>)
            }
        </div>
    )
}

export default AlertItem