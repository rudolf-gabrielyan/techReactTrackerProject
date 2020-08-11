import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductDescription from '../Components/ProductDescription/ProductDescription';
import TechCompetitors from '../Components/TechCompetitors/TechCompetitors';
import TechUsage from '../Components/TechUsage/TechUsage';
import TechFilmographics from '../Components/TechFilmographics/TechFilmographics';

import LoadingIndicator from '../Components/LoadingIndicator/LoadingIndicator';

import { getSelectedTechnology } from '../redux/actions/selectedTechnologyActions';

const TechOverview = ({ userIsLoggedIn, getSelectedTechnology, selectedTechnology }) => {
    const { technology_key } = useParams();
    
    useEffect(() => {
        getSelectedTechnology(technology_key);
    }, [technology_key]);
    
    return (
        <div style={{position: 'relative'}}>
            <ProductDescription title={`COMPANIES WE TRACK USING ${selectedTechnology.name.toUpperCase()}`} userIsLoggedIn={userIsLoggedIn} product={selectedTechnology} />
            <TechCompetitors technology={selectedTechnology} />
            <TechUsage userIsLoggedIn={userIsLoggedIn} technology={selectedTechnology} />
            <TechFilmographics technology={selectedTechnology} />
            <LoadingIndicator state={selectedTechnology.isLoading} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userIsLoggedIn: state.user.isLoggedIn,
        selectedTechnology: state.selectedTechnology,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSelectedTechnology: technology_key => dispatch(getSelectedTechnology(technology_key)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TechOverview)