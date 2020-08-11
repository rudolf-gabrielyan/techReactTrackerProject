import React from 'react';
import './TechUsageIndustry.scss';

import VerticalChart from '../VerticalChart/VerticalChart';

const TechUsageIndustry = ({ industry }) => {
    return(
        <div className='techUsageIndustryContainer'>
            <VerticalChart chartData={industry} tooltipTitle={'Number of technology count in \n'} />
        </div>
    )
}

export default TechUsageIndustry