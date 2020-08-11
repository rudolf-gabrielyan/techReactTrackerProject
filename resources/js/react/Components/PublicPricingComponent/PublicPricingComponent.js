import React from 'react';
import './PublicPricingComponent.scss';

import Subscriptions from './../Subscriptions/Subscriptions'

const PublicPricingComponent = () => {
    return(
        <div className='publicPricingComponentContainer'>
            <p>Pricing</p>
            <Subscriptions />
            <div>
                <p>Common questions about our pricing</p>
                <div>
                    <p>Can I request other technologies?</p>
                    <p>- Sure simply reach us on the chat and we can add it to our crawlers.</p>
                    <p>Can I cancel anytime?</p>
                    <p>- Yes you can cancel any time, and the plugin is free to install no card needed to signup.</p>
                </div>
            </div>
        </div>
    )
}

export default PublicPricingComponent