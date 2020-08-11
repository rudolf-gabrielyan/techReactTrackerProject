import React from 'react';
import './TechUsageSeeMore.scss';

const TechUsageSeeMore = ({ technology }) => {
    return(
        <div className='techUsageSeeMoreContainer'>
            <p>Target. Identify. Analyze.</p>
            <p>
                Discover companies using {technology.name} by locations, employees, revenue, industries, and more. Compare your target to your 
                CRM or marketing platform. Create campaigns & analyze your results.
            </p>
            <button>See more {technology.name} Customers</button>
            <p>Signup now to see all {technology.companies_list.total_companies} companies using {technology.name}</p>
        </div>
    )
}

export default TechUsageSeeMore