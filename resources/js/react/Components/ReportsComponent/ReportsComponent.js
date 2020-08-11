import React, { useEffect } from 'react';
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './ReportsComponent.scss';

import CreateReport from './CreateReport/CreateReport';
import ReportItem from './ReportItem/ReportItem';
import Report from './Report/Report';

import SubscribingSuggestion from '../SubscribingSuggestion/SubscribingSuggestion';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { getReports } from '../../redux/actions/reportsActions';

import docs from '../../assets/images/docs.svg';

const ReportsComponent = ({ user, reports, getReports }) => {
    const match = useRouteMatch();
    
    if(!user.data.paddleInfo || user.data.paddleInfo.product_name === 'Plugin' || user.data.paddleInfo.status !== 'active') return <SubscribingSuggestion />;
    
    useEffect(() => {
        getReports();
    }, [ user.data.accountInformation.used_reports_count ]);
    
    return(
        <Switch>
            <Route exact path={match.path}>
                <div className='reportsContainer'>
                    <div>
                        <p>Reports</p>
                        <Link to={`${match.url}/create`}>Build new Report</Link>
                    </div>
                    {
                        reports.allReports.length ?
                            <div className='haveReportsContainer'>
                                {
                                    reports.allReports.map((groupedReport, index) => <ReportItem key={index} groupedReport={groupedReport} />)
                                }
                            </div>
                        :
                        <div className='noReportsContainer'>
                            <img src={docs} />
                            <p>Create your first report to get started</p>
                            <div>
                                <p>To get started, you can customize your own report from scratch or try out one these examples:</p>
                                <span>- All active e-commerce sites in United States who run on Shopify</span>
                                <span>- All the biggest customers of Salesforce</span>
                                <span>- Companies using Hubspot in Europe</span>
                                <span>- The biggest customers of Marketo</span>
                            </div>
                        </div>
                    }
                    <LoadingIndicator state={reports.isLoading} />
                </div>
            </Route>
            <Route exact path={`${match.path}/create`} component={CreateReport} />
            <Route exact path={`${match.path}/:id`} component={Report} />
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        reports: state.reports
    }
};

const mapDispatchToProps = dispatch => ({
    getReports: () => dispatch(getReports()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent)