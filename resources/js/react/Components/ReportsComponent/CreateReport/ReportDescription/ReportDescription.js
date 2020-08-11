import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom';
import './ReportDescription.scss';

import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const useStylesForMobileStepper = makeStyles({
    root: {
      maxWidth: 85,
      flexGrow: 1,
      backgroundColor: 'inherit',
    },
});

const useStylesForLinearProgress = makeStyles({
    root: {
        width: '100%',
        backgroundColor: '#C4C4C4',
        height: '7px',
    },
    barColorPrimary: {
        backgroundColor: '#35AD17',
    },
});

const ReportDescription = ({ user, createReport, includedWebsitesCount, buildNewReport }) => {
    const classesForMobileStepper = useStylesForMobileStepper();
    const classesForLinearProgress = useStylesForLinearProgress();
    const history = useHistory();
    const match = useRouteMatch();

    const reportsPageUrl = match.url.slice(0, match.url.lastIndexOf('/'));

    const handleButtonSubmit = event => {
        buildNewReport()
        .then(() => history.push(reportsPageUrl))
    };

    return(
        <div className='reportDescriptionContainer'>
            <div>
                <p>Total amount of websites found for this technology</p>
                <p>{createReport.selectedTechnology.result_found.toLocaleString()}</p>
            </div>
            <div>
                <p>Total amount of websites to include in report</p>
                <p>{includedWebsitesCount}</p>
            </div>
            <div>
                <p>Reports build in current subscription plan</p>
                <MobileStepper
                    variant="progress"
                    steps={user.data.accountInformation.reports + 1}
                    position="static"
                    activeStep={user.data.accountInformation.used_reports_count}
                    classes={classesForMobileStepper}
                    LinearProgressProps={{classes: classesForLinearProgress}}
                />
                <span>{user.data.accountInformation.used_reports_count}/{user.data.accountInformation.reports}</span>
            </div>
            <div>
                <button disabled={user.data.accountInformation.reports === user.data.accountInformation.used_reports_count} onClick={handleButtonSubmit}>Build my Report</button>
            </div>
        </div>
    )
}

export default ReportDescription