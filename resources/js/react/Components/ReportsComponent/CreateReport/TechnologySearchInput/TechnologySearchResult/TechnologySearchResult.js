import React, { useEffect, useRef } from 'react';
import './TechnologySearchResult.scss';

import LoadingIndicator from '../../../../LoadingIndicator/LoadingIndicator';

const TechnologySearchResult = ({ isLoading, createReport, setShowResults, selectTechnology, setInputValue }) => {
    const searchResultRef = useRef();

    useEffect(() => {
        const clickCallback = event => {
            if(!searchResultRef.current.contains(event.target)) {
                if(event.target.parentElement !== searchResultRef.current.parentElement) setShowResults(false);
            };
        };
        document.addEventListener('click', clickCallback);

        return () => document.removeEventListener('click', clickCallback);
    });

    const handleTechnologyClick = (event, id) => {
        selectTechnology(id)
        .then(selectedTechnology => {
            setInputValue(selectedTechnology.name);
            setShowResults(false);
        });
    };

    return(
        <div className='technologySearchResultContainer' style={isLoading ? {height: '100px', padding: 0} : null} ref={searchResultRef}>
            {
                isLoading ? <LoadingIndicator state={isLoading} style={{paddingLeft: 0}} />
                :
                <>
                    {createReport.searchValue === '' && <p>Type to search</p>}
                    {createReport.searchValue !== '' && createReport.technologies.length === 0 && <p>Results Not Found</p>}
                    {
                        createReport.technologies.length > 0 && (<>
                            {
                                createReport.technologies.map(technology => <div key={technology.id} onClick={event => handleTechnologyClick(event, technology.id)}><img src={technology.logo_url} /><p>{technology.name}</p></div>)
                            }
                        </>)
                    }
                </>
            }
        </div>
    )
}

export default TechnologySearchResult