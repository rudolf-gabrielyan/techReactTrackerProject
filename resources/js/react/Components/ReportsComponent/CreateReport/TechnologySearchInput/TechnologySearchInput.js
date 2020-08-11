import React, { useState, useRef } from 'react';
import './TechnologySearchInput.scss';

import TechnologySearchResult from './TechnologySearchResult/TechnologySearchResult';

import timer from '../../../../helpers/timer';

const TechnologySearchInput = ({ createReport, getSearchedTechnologies, selectTechnology }) => {
    const [inputValue, setInputValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const timerRef = useRef();

    const handleSearch = event => {
        event.persist();
        setInputValue(event.target.value);
        timer(timerRef)
        .then(() => getSearchedTechnologies(event.target.value));
    };

    return (
        <div className='technologySearchInputContainer'>
            <input type='text' placeholder='Type a technology name...' value={inputValue} onChange={handleSearch} onClick={() => showResults === false && setShowResults(true)} />
            <i className="fas fa-chevron-down" />
            {
                showResults && (
                    <TechnologySearchResult
                        isLoading={createReport.isLoading} 
                        createReport={createReport}
                        setShowResults={setShowResults}
                        selectTechnology={selectTechnology}
                        setInputValue={setInputValue}
                    />                    
                )
            }
        </div>
    )
}

export default TechnologySearchInput