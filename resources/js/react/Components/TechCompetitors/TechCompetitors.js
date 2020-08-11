import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TechCompetitors.scss';

import modifyStringForUrl from '../../helpers/modifyStringForUrl';

const TechCompetitors = ({ technology }) => {
    const history = useHistory();
    const [showAll, setShowAll] = useState(false);

    const handleTechnologyClick = (event, category, technologyKey) => history.push(`/${modifyStringForUrl(category)}/${technologyKey}`);

    return(
        <div className='techCompetitorsContainer'>
            <p>TOP COMPETITORS TO {technology.name.toUpperCase()}</p>
            <div>
                {
                    (() => {
                        let competitorTechnologies = [];

                        if(!showAll) {
                            competitorTechnologies = technology.competitors_technologies.slice(0, 5).map(competitor => Object.assign({}, competitor));
                        }else {
                            competitorTechnologies = technology.competitors_technologies;
                        };

                        return competitorTechnologies.map(competitor => {
                            return <div key={competitor.id} onClick={event => handleTechnologyClick(event, competitor.category_name, competitor.technology_key)}><img src={competitor.logo_url} /><span>{competitor.name}</span></div>
                        })
                    })()
                }
            </div>
            <div>
                <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</button>
            </div>
        </div>
    )
}

export default TechCompetitors