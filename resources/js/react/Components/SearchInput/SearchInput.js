import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import './SearchInput.scss';

import SearchResult from './SearchResult/SearchResult';

import { getSearchedTechsAndDomains } from '../../redux/actions/searchedTechsAndDomainsActions';

import timer from '../../helpers/timer';

const SearchInput = ({ placeholder, className, getSearchedTechsAndDomains, searchedTechsAndDomains }) => {
    const [showResults, setShowResults] = useState(false);
    const timerRef = useRef();

    const handleSearch = event => {
        event.persist();
        timer(timerRef)
        .then(() => getSearchedTechsAndDomains(event.target.value));
    };

    return(
        <div className={className}>
            <i className="fas fa-search" />
            <input type='text' placeholder={placeholder} onChange={handleSearch} onClick={() => showResults === false && setShowResults(true)} />
            {
                showResults && (
                    <SearchResult
                        isLoading={searchedTechsAndDomains.isLoading} 
                        searchedTechsAndDomains={searchedTechsAndDomains} 
                        className={className === 'searchInputFirstPageContainer' ? 'searchResultContainer' : 'searchResultSecondContainer'}
                        setShowResults={setShowResults}
                    />                    
                )
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        searchedTechsAndDomains: state.searchedTechsAndDomains
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSearchedTechsAndDomains: value => dispatch(getSearchedTechsAndDomains(value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)