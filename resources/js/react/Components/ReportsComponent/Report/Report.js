import React, { useEffect } from 'react';
import { Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import './Report.scss';

import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

import Chart from './Chart/Chart';
import TechUsageTable from '../../TechUsageTable/TechUsageTable';

import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

import salesforce from '../../../assets/images/salesforce.png';

import { selectReport, deleteReport } from '../../../redux/actions/reportsActions';

import downloadReportAsCSV from '../../../helpers/downloadReportAsCSV';

const useStylesForMobileStepper = makeStyles({
    root: {
        padding: '0',
        width: 140,
        backgroundColor: 'inherit',
    },
});

const useStylesForLinearProgress = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#B7B7B7',
        height: '9px',
    },
    barColorPrimary: {
        backgroundColor: '#3898DE',
    },
});

const Report = ({ user, reports, selectReport, deleteReport }) => {
    const classesForMobileStepper = useStylesForMobileStepper();
    const classesForLinearProgress = useStylesForLinearProgress();
    const history = useHistory();
    const { id } = useParams();
    const match = useRouteMatch();
    const reportsPageUrl = match.url.slice(0, match.url.lastIndexOf('/'));
    const { selectedReport } = reports;

    useEffect(() => {
        selectReport(id);
    }, [ reports.allReports.length ]);

    const handleDeleteButton = event => {
        deleteReport(selectedReport.id, user.data.id)
        .then(() => history.push(reportsPageUrl))
    };

    const getReportOptions = () => {
        const content = [];
        if(selectedReport.included_industries) {
            content.push(<p key='includedIndustryHeader'>INCLUDED INDUSTRY VERTICALS</p>);
            content.push(<div key='includedIndustryContent'>{JSON.parse(selectedReport.included_industries).map(industry => <div key={industry}><p>{industry}</p></div>)}</div>)
        };
        if(selectedReport.excluded_industries) {
            content.push(<p key='excludedIndustryHeader'>EXCLUDED INDUSTRY VERTICALS</p>);
            content.push(<div key='excludedIndustryContent'>{JSON.parse(selectedReport.excluded_industries).map(industry => <div key={industry}><p>{industry}</p></div>)}</div>)
        };
        if(selectedReport.included_technologies) {
            content.push(<p key='includedTechnologyHeader'>INCLUDED TECHNOLOGIES</p>);
            content.push(<div key='includedTechnologyContent'>{JSON.parse(selectedReport.included_technologies).map(technology => <div key={technology.name}><img src={technology.logo_url} /><p>{technology.name}</p></div>)}</div>)
        };
        if(selectedReport.excluded_technologies) {
            content.push(<p key='excludedTechnologyHeader'>EXCLUDED TECHNOLOGIES</p>);
            content.push(<div key='excludedTechnologyContent'>{JSON.parse(selectedReport.excluded_technologies).map(technology => <div key={technology.name}><img src={technology.logo_url} /><p>{technology.name}</p></div>)}</div>)
        };
        if(selectedReport.included_employees_count) {
            content.push(<p key='includedEmployeesHeader'>INCLUDED EMPLOYEES COUNT</p>);
            content.push(<div key='includedEmployeesContent'>{JSON.parse(selectedReport.included_employees_count).map(employeeCount => <div key={employeeCount}><p>{employeeCount}</p></div>)}</div>)
        };
        if(selectedReport.excluded_employees_count) {
            content.push(<p key='excludedEmployeesHeader'>EXCLUDED EMPLOYEES COUNT</p>);
            content.push(<div key='excludedEmployeesContent'>{JSON.parse(selectedReport.excluded_employees_count).map(employeeCount => <div key={employeeCount}><p>{employeeCount}</p></div>)}</div>)
        };
        if(selectedReport.included_locations) {
            content.push(<p key='includedLocationsHeader'>INCLUDED LOCATIONS</p>);
            content.push(<div key='includedLocationsContent'>{JSON.parse(selectedReport.included_locations).map(location => <div key={location.state}><p>{`${location.state}, ${location.country}`}</p></div>)}</div>)
        };
        if(selectedReport.excluded_locations) {
            content.push(<p key='excludedLocationsHeader'>EXCLUDED LOCATIONS</p>);
            content.push(<div key='excludedLocationsContent'>{JSON.parse(selectedReport.excluded_locations).map(location => <div key={location.state}><p>{`${location.state}, ${location.country}`}</p></div>)}</div>)
        };
        return content
    };

    return(
        <div className='reportContainer'>
            <div>
                <p>Reports</p>
                <Link to={`${reportsPageUrl}/create`}>Build new Report</Link>
            </div>
            <div>
                <div>
                    <img src={selectedReport.technology_logo_url} />
                    <p>{selectedReport.technology_name} Report</p>
                </div>
                <div>
                    <button>Refresh</button>
                    <button onClick={() => downloadReportAsCSV(selectedReport)}>Download</button>
                    <button onClick={handleDeleteButton}>Delete</button>
                </div>
            </div>
            <div>
                <div>
                    <p>CREATED</p>
                    <span>{moment(selectedReport.created_at).fromNow()}</span>
                    <p>SIZE</p>
                    <span>{selectedReport.included_websites_count} Websites</span>
                    { getReportOptions() }
                </div>
            </div>
            <div>
                <div>
                    <p>LEADING INDUSTRY VERTICALS</p>
                    <div>
                        <p>Computer Software</p>
                        <div>
                            <MobileStepper 
                                position='static' 
                                variant="progress" 
                                steps={10} 
                                activeStep={6} 
                                classes={classesForMobileStepper}
                                LinearProgressProps={{classes: classesForLinearProgress}}
                            />
                            <span>60%</span>
                        </div>
                        <p>Software</p>
                        <div>
                            <MobileStepper
                                position='static'
                                variant="progress"
                                steps={10}
                                activeStep={2.5}
                                classes={classesForMobileStepper}
                                LinearProgressProps={{classes: classesForLinearProgress}}
                            />
                            <span>25%</span>
                        </div>
                        <p>Internet</p>
                        <div>
                            <MobileStepper
                                position='static'
                                variant="progress"
                                steps={10}
                                activeStep={0.5}
                                classes={classesForMobileStepper}
                                LinearProgressProps={{classes: classesForLinearProgress}}
                            />
                            <span>5%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <p>TECH BUDGETS</p>
                    <Chart />
                </div>
                <div>
                    <p>CORRELATED TECHS</p>
                    <div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                        <div>
                            <img src={salesforce} />
                            <p>Salesforce CRM</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* <TechUsageTable user={true} /> */}
            </div>
            <LoadingIndicator state={reports.isLoading} />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    reports: state.reports,
});

const mapDispatchToProps = dispatch => ({
    selectReport: id => dispatch(selectReport(id)),
    deleteReport: (report_id, user_id) => dispatch(deleteReport(report_id, user_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Report)