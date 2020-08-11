import React from 'react';
import './CompanyInfo.scss';

const CompanyInfo = ({ company }) => {
    return(
        <div className='companyInfoContainer'>
            <div><p>Estimate Tech Budget</p><p>Coming Soon <span>/month</span></p></div>
            <div><p>Employees</p><p>{company.employees_range || '*****'}</p></div>
            <div><p>HQ</p><p>{company.locations[0] && company.locations[0].display_name || '*****'}</p></div>
        </div>
    )
}

export default CompanyInfo