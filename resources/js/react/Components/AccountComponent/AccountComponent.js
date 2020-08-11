import React, { useEffect, useState } from 'react';
import { Route, NavLink, Switch, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './AccountComponent.scss';

import AccountSettings from '../AccountSettings/AccountSettings';
import ChangePassword from '../ChangePassword/ChangePassword';
import Subscriptions from '../Subscriptions/Subscriptions';
import Invoices from '../Invoices/Invoices';
import Integrations from '../Integrations/Integrations';
import NotificationSettings from '../NotificationSettings/NotificationSettings';
import ContactSupport from '../ContactSupport/ContactSupport';

import { handlePayment } from '../../redux/actions/userActions';

const AccountComponent = ({ user, handlePayment }) => {
    const match = useRouteMatch();
    const [pathName, setPathName] = useState('');
    const location = useLocation();

    useEffect(() => {
        let pathname = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
        if(pathname.includes('_')) {
            pathname = pathname.split('_');
            pathname = pathname[0][0].toUpperCase() + pathname[0].slice(1) + ' ' +  pathname[1][0].toUpperCase() + pathname[1].slice(1);
            setPathName(pathname);
        }else {
            pathname = pathname.split('')[0].toUpperCase() + pathname.slice(1);
            setPathName(pathname);
        }
    }, [location]);

    return(
        <div className='accountComponentContainer'>
            <p>{pathName}</p>
            <div>
                <div>
                    <NavLink activeClassName='activeAccountLink' to={`${match.url}/account_settings`}>My Account</NavLink>
                    <NavLink activeClassName='activeAccountLink' to={`${match.url}/change_password`}>Change Password</NavLink>
                    <NavLink activeClassName='activeAccountLink' to={`${match.url}/subscriptions`}>Subscriptions</NavLink>
                    <NavLink activeClassName='activeAccountLink' to={`${match.url}/invoices`}>Invoices</NavLink>
                    <NavLink activeClassName='activeAccountLink' to={`${match.url}/integrations`}>Integrations</NavLink>
                    <NavLink activeClassName='activeAccountLink' to={`${match.url}/notification_settings`}>Notification Settings</NavLink>
                    <NavLink activeClassName='activeAccountLink' to={`${match.url}/contact_support`}>Contact Support</NavLink>
                </div>
                <Switch>
                    <Route exact path={match.path}>
                        <Redirect to={`${match.path}/account_settings`} />
                    </Route>
                    <Route path={`${match.path}/account_settings`} render={props => <AccountSettings subscriptionLinkURL={`${match.path}/subscriptions`} {...props} />} />
                    <Route path={`${match.path}/change_password`} component={ChangePassword} />
                    <Route path={`${match.path}/subscriptions`} render={props => <Subscriptions className='subscriptionsContainer' user={user} handlePayment={handlePayment} {...props} />} />
                    <Route path={`${match.path}/invoices`} render={props => <Invoices user={user} {...props} />} />
                    <Route path={`${match.path}/integrations`} component={Integrations} />
                    <Route path={`${match.path}/notification_settings`} component={NotificationSettings} />
                    <Route path={`${match.path}/contact_support`} component={ContactSupport} />
                </Switch>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handlePayment: planType => dispatch(handlePayment(planType)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent)