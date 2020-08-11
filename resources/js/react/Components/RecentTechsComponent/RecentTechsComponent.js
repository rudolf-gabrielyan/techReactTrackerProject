import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './RecentTechsComponent.scss';

import CustomTable from './CustomTable/CustomTable';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { getRecentTechnologies } from '../../redux/actions/recentTechnologiesActions';

const RecentTechsComponent = ({ recentTechnologies, getRecentTechnologies }) => {

    useEffect(() => {
        getRecentTechnologies();
    }, []);

    return(
        <div className='recentTechsComponentContainer'>
            <p>Recently Added Technologies</p>
            <p>Tech Tracker starts tracking dozens of new technologies every day. You will automatically see the newest technologies on this page.</p>
            <div>
                <p>WANT ANY TECHNOLOGY TO BE TRACKED FOR YOU?</p>
                <button>LEAVE A REQUEST</button>
            </div>
            <CustomTable recentTechnologies={recentTechnologies.data} />
            <LoadingIndicator state={recentTechnologies.isLoading} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        recentTechnologies: state.recentTechnologies
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getRecentTechnologies: () => dispatch(getRecentTechnologies())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTechsComponent)