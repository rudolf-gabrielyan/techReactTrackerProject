import React from 'react';
import './TechUsageEmployees.scss';

import VerticalChart from '../VerticalChart/VerticalChart';

const TechUsageEmployees = ({ employees }) => {
    return(
        <div className='techUsageEmployeesContainer'>
            <VerticalChart chartData={employees} tooltipTitle={'Number of companies worldwide with \n'} />
        </div>
    )
}

export default TechUsageEmployees