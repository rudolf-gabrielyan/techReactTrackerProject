import React from 'react';
import './TechUsage.scss';

import TechUsageTable from '../TechUsageTable/TechUsageTable';
import TechUsageSeeMore from '../TechUsageSeeMore/TechUsageSeeMore';

const TechUsage = ({ userIsLoggedIn, technology }) => {
    return(
        <div className='techUsageContainer'>
            <div>
                <p>Companies Currently Using {technology.name}</p>
                {
                    userIsLoggedIn ? <button>Filters <i className="fas fa-chevron-down" /></button> : <p>Download CSV Sample <span>({technology.companies_list.list.length} companies)</span></p>
                }                
            </div>
            <TechUsageTable technology={technology} />
            {!userIsLoggedIn && <TechUsageSeeMore technology={technology} />}
        </div>
    )
}

export default TechUsage