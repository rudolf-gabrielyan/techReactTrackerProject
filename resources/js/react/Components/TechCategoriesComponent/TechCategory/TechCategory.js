import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import './TechCategory.scss';

import Chart from './Chart/Chart';
import CustomTable from './CustomTable/CustomTable';

import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

import { getSelectedSubcategory } from '../../../redux/actions/selectedSubcategoryActions';

const TechCategory = ({ getSelectedSubcategory, selectedSubcategory }) => {
    const { subcategory_key } = useParams();
    
    useEffect(() => {
        getSelectedSubcategory(subcategory_key);
    }, [subcategory_key]);

    const technologiesHalfIndex = Math.ceil(selectedSubcategory.technologies.length / 2); 
    const firstHalfOfTechnologies  = selectedSubcategory.technologies.slice(0, technologiesHalfIndex);
    const secondHalfOfTechnologies = selectedSubcategory.technologies.slice(technologiesHalfIndex);
    
    return(
        <div className='techCategoryContainer'>
            <div>
                <div>
                    <p>Technology Category:</p>
                    <p>{selectedSubcategory.name}</p>
                </div>
                <div>
                    <p>Total number of Technologies in {selectedSubcategory.name}</p>
                    <p>{selectedSubcategory.technologies.length} <span>technologies</span></p>
                </div>
                <div>
                    <p>Total websites using {selectedSubcategory.name}</p>
                    <p>{selectedSubcategory.websitescount.toLocaleString()} <span>websites</span></p>
                </div> 
            </div>
            <div>
                <Chart technologies={selectedSubcategory.technologies.slice(0, 5)} />
            </div>
            <div>
                {firstHalfOfTechnologies.length > 0 && <CustomTable category={selectedSubcategory.category_name} technologies={firstHalfOfTechnologies} startRank={1} />}
                {secondHalfOfTechnologies.length > 0 && <CustomTable category={selectedSubcategory.category_name} technologies={secondHalfOfTechnologies} startRank={firstHalfOfTechnologies.length + 1} />}
            </div>
            <LoadingIndicator state={selectedSubcategory.isLoading} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedSubcategory: state.selectedSubcategory,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSelectedSubcategory: subcategoryKey => dispatch(getSelectedSubcategory(subcategoryKey)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TechCategory)