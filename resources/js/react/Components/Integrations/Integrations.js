import React from 'react';
import './Integrations.scss';

import Integration from './Integration/Integration';

import salesforce from '../../assets/images/salesforce.png';
import slack from '../../assets/images/slack.png';

const Integrations = () => {
    return(
        <div className='integrationsContainer'>
            <Integration image={salesforce} isAvailable={true} />
            <Integration image={slack} isAvailable={true} />
            <Integration image={salesforce} isAvailable={false} />
            <Integration image={salesforce} isAvailable={false} />
        </div>
    )
}

export default Integrations