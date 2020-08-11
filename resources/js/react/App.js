import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import './App.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ProtectedRoute from './ProtectedRoute';
import ScrollToTop from './ScrollToTop';

import LoadingIndicator from './Components/LoadingIndicator/LoadingIndicator';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import MainPage from './Views/MainPage';
import TechOverview from './Views/TechOverview';
import CompanyOverview from './Views/CompanyOverview';
import Alerts from './Views/Alerts';
import Account from './Views/Account';
import Reports from './Views/Reports';
import Login from './Views/Login';
import Signup from './Views/Signup';
import TechCategories from './Views/TechCategories';
import RecentTechs from './Views/RecentTechs';
import PublicPricing from './Views/PublicPricing';
import TermsOfService from './Views/TermsOfService';
import DataTerms from './Views/DataTerms';
import PrivacyPolicy from './Views/PrivacyPolicy';

import store from './redux/reducers/index';
import { checkAuth } from './redux/actions/userActions';

import favicon from './assets/images/favicon.png';

const App = ({ checkAuth }) => {
    const [pageIsLoading, setPageIsLoading] = useState(true);

    useEffect(() => {
        const Paddle = window.Paddle;
        Paddle.Setup({ vendor: +process.env.MIX_PADDLE_VENDOR_ID});

        checkAuth()
        .then(() => setPageIsLoading(false));
    }, []);

    if(pageIsLoading) return <LoadingIndicator state={pageIsLoading} />;

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Switch>
                <ProtectedRoute exact path='/login' component={Login} />
                <ProtectedRoute exact path='/signup' component={Signup} />
                <Route path='/'>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={MainPage} />
                        <ProtectedRoute exact path='/alerts' component={Alerts} />
                        <ProtectedRoute path='/account' component={Account} />
                        <ProtectedRoute path='/reports' component={Reports} />
                        <Route path='/tech_categories' component={TechCategories} /> 
                        <Route exact path='/recent_technologies' component={RecentTechs} />
                        <ProtectedRoute exact path='/public_pricing' component={PublicPricing} />
                        <Route exact path='/terms_of_service' component={TermsOfService} />
                        <Route exact path='/data_terms' component={DataTerms} />
                        <Route exact path='/privacy_policy' component={PrivacyPolicy} />
                        <Route exact path='/:category/:technology_key' component={TechOverview} />
                        <Route exact path='/:domain' component={CompanyOverview} />
                    </Switch>
                    <Footer />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuth: () => dispatch(checkAuth())
    }
};

const MainApp = connect(null, mapDispatchToProps)(App);

if(document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <MainApp />
        </Provider>, 
        document.getElementById('app')
    )
};