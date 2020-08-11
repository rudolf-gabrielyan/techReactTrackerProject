import React from 'react';
import { connect } from 'react-redux';
import './CreateReport.scss';

import TechnologySearchInput from './TechnologySearchInput/TechnologySearchInput';
import ReportDescription from './ReportDescription/ReportDescription';
import ReportOptions from './ReportOptions/ReportOptions';

import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

import { getSearchedTechnologies, selectTechnology, setIncludedWebsitesCount, updateSelectedOptionData, getSearchedIndustries, getSearchedTechnologiesForSelect, getSearchedLocations, buildNewReport } from '../../../redux/actions/createReportActions';

const CreateReport = ({ user, createReport, getSearchedTechnologies, selectTechnology, setIncludedWebsitesCount, updateSelectedOptionData, getSearchedIndustries, getSearchedTechnologiesForSelect, getSearchedLocations, buildNewReport }) => {
    return(
        <div className="createReportContainer">
            <p>Web Technology Lead Generation</p>
            <div>
                <p>Choose a technology to target</p>
                <TechnologySearchInput createReport={createReport} getSearchedTechnologies={getSearchedTechnologies} selectTechnology={selectTechnology} />
                <div></div>
                <div>Start here</div>
            </div>
            {
                !createReport.selectedTechnology.id ?
                    <div className='createReportWithoutData'>
                        <div>
                            <p>What do I Get?</p>
                            <p>A spreadsheet, containing a list of websites that our engine found to be using a
                            technology of your choice and matching your selected criteria.</p>
                        </div>
                        <p>Targeting Options</p>
                    </div>
                :
                    <div className='createReportWithData'>
                        <ReportOptions 
                            user={user}
                            createReport={createReport}
                            includedWebsitesCount={createReport.includedWebsitesCount}
                            setIncludedWebsitesCount={setIncludedWebsitesCount}
                            updateSelectedOptionData={updateSelectedOptionData}
                            getSearchedIndustries={getSearchedIndustries}
                            getSearchedTechnologiesForSelect={getSearchedTechnologiesForSelect}
                            getSearchedLocations={getSearchedLocations}
                            buildNewReport={buildNewReport}
                        />
                        <ReportDescription 
                            user={user}
                            createReport={createReport}
                            includedWebsitesCount={createReport.includedWebsitesCount}
                            buildNewReport={buildNewReport}
                        />
                    </div>
            }
            <LoadingIndicator state={createReport.selectedTechnology.id && createReport.isLoading || false} />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    createReport: state.createReport
});

const mapDispatchToProps = dispatch => ({
    getSearchedTechnologies: value => dispatch(getSearchedTechnologies(value)),
    selectTechnology: id => dispatch(selectTechnology(id)),
    setIncludedWebsitesCount: value => dispatch(setIncludedWebsitesCount(value)),
    updateSelectedOptionData: (changedOptionKey, changedField) => dispatch(updateSelectedOptionData(changedOptionKey, changedField)),
    getSearchedIndustries: inputValue => dispatch(getSearchedIndustries(inputValue)),
    getSearchedTechnologiesForSelect: inputValue => dispatch(getSearchedTechnologiesForSelect(inputValue)),
    getSearchedLocations: inputValue => dispatch(getSearchedLocations(inputValue)),
    buildNewReport: () => dispatch(buildNewReport()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)