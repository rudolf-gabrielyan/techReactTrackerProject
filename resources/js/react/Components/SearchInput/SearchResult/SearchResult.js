import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SearchResult.scss';

import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

import Image from '../../Image/Image';

import modifyStringForUrl from '../../../helpers/modifyStringForUrl';

const SearchResult = ({ className, isLoading, searchedTechsAndDomains, setShowResults }) => {
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

    return(
        <div className={className} style={isLoading ? {height: '100px', padding: 0} : null} ref={searchResultRef}>
            {
                isLoading ? <LoadingIndicator state={isLoading} style={{paddingLeft: 0}} />
                :
                <>
                    {searchedTechsAndDomains.searchValue === '' && <p>Type to search</p>}
                    {searchedTechsAndDomains.searchValue !== '' && searchedTechsAndDomains.hasResults === false && <p>Results Not Found</p>}
                    {
                        searchedTechsAndDomains.hasResults && (<>
                            {
                                searchedTechsAndDomains.domains.map(domain => <div key={domain.id}><Image /><Link onClick={() => setShowResults(false)} to={`/${domain.domain}`}>{domain.name}</Link></div>)
                            }
                            {
                                searchedTechsAndDomains.technologies.map(technology => <div key={technology.id}><img src={technology.logo_url} /><Link onClick={() => setShowResults(false)} to={`/${modifyStringForUrl(technology.category.name)}/${technology.technology_key}`}>{technology.name}</Link></div>)
                            }
                        </>)
                    }
                </>
            }
        </div>
    )
}

export default SearchResult