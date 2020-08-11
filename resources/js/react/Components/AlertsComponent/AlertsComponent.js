import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './AlertsComponent.scss';

import AlertItem from '../AlertItem/AlertItem';
import AlertDetails from '../AlertDetails/AlertDetails';
import AlertModal from '../AlertModal/AlertModal';

import SubscribingSuggestion from '../SubscribingSuggestion/SubscribingSuggestion';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { getAlerts } from '../../redux/actions/alertsActions';

const AlertsComponent = ({ user, alerts, getAlerts }) => {
    const [selectedAlert, setSelectedAlert] = useState({});
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handleCreateAlert = () => {
        if(user.data.accountInformation.used_technology_alerts_count >= user.data.accountInformation.technology_alerts) {
            history.push('/account/subscriptions');
        }else {
            setShowModal(true);
        };
    };

    if(!user.data.paddleInfo || user.data.paddleInfo.product_name === 'Plugin' || user.data.paddleInfo.status !== 'active') return <SubscribingSuggestion />;

    useEffect(() => getAlerts(), []);

    return(
        <div className='alertsComponentContainer'>
            <p>Technology Alerts</p>
            <div>
                <div>
                    <span>{alerts.alerts.length} {alerts.alerts.length === 1 ? 'Alert' : 'Alerts'}</span>
                    <span onClick={handleCreateAlert}>+ Create an Alert</span>
                    {alerts.alerts.length === 0 && <span>← Create your First Alert</span>}
                    {alerts.alerts.length !== 0 && !selectedAlert.id && <span style={{top:'100%', width: '95%'}}>← Choose an alert from the left to see the data behind it</span>}
                </div>
                {
                    alerts.alerts.map(alert => <AlertItem key={alert.id} alert={alert} selectedAlert={selectedAlert} setSelectedAlert={setSelectedAlert} />)
                }
            </div>
            {
                selectedAlert.id ? <AlertDetails selectedAlert={selectedAlert} /> : <div></div>
            }
            {showModal && <AlertModal setShowModal={setShowModal} />}
            <LoadingIndicator state={alerts.isLoading} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        alerts: state.alerts
    }
};

const mapDispatchToProps = dispatch => ({
    getAlerts: () => dispatch(getAlerts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsComponent)