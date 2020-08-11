import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './TechnologiesStatics.scss';

import TechnologyStatic from './TechnologyStatic/TechnologyStatic';

import { getTrendingTechnologies } from '../../redux/actions/trendingTechnologiesActions';
import { getTopTechnologies } from '../../redux/actions/topTechnologiesActions';

const TechnologiesStatics = ({ getTrendingTechnologies, getTopTechnologies, trendingTechnologies, topTechnologies }) => {

    useEffect(() => {
        getTrendingTechnologies();
        getTopTechnologies();
    }, []);

    return(
        <div className="technologiesStaticsContainer">
            <div>
                <TechnologyStatic title='Trending Technologies' technologies={trendingTechnologies} />
                <TechnologyStatic title='Top Technologies' technologies={topTechnologies} />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        trendingTechnologies: state.trendingTechnologies,
        topTechnologies: state.topTechnologies,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTrendingTechnologies: () => dispatch(getTrendingTechnologies()),
        getTopTechnologies: () => dispatch(getTopTechnologies()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnologiesStatics)