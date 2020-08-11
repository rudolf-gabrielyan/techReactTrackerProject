import React from 'react';
import './CompanyPoweredBy.scss';

import Cart from './Cart/Cart';

import formatFirstLetter from '../../helpers/formatFirstLetter';

const CompanyPoweredBy = ({ company }) => {

    return(
        <div className='companyPoweredByContainer'>
            <p>Technologies that {formatFirstLetter(company.domain)} is powered by:</p>
            {
                company.installed.map((installation, index) => {
                    return(
                        <div className='companyPoweredByItem' key={index}>
                            <p>{installation.category}</p>
                            <div>
                                {
                                    installation.technologies.map((technology, index) => <Cart key={index} category={installation.category} technology={technology} />)
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CompanyPoweredBy