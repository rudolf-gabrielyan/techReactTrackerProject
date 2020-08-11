import React from 'react';
import { Link } from 'react-router-dom';
import './TechnologyStatic.scss';

import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

import modifyStringForUrl from '../../../helpers/modifyStringForUrl';

const TechnologyStatic = ({ title, technologies }) => {
    return(
        <div className='technologyStatic'>
            <h1>{title}</h1>
            <div>
                <p>Product Name</p>
                <p>Total Companies Using <i className="fas fa-info-circle" /></p>
            </div>
            <div>
                {
                    technologies.data.map((technology, index) => {
                        return( 
                            <div key={index}>
                                <p><img src={technology.logo_url} /> <Link to={`${modifyStringForUrl(technology.category_name)}/${technology.technology_key}`}>{technology.name}</Link></p>
                                <p>{technology.install_counts.toLocaleString()} <span>{technology.percent}%</span></p>
                            </div>
                        )
                    })
                }
            </div>
            <LoadingIndicator state={technologies.isLoading} />
        </div>
    )
}

export default TechnologyStatic