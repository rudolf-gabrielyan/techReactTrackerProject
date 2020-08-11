import React from 'react';
import './Subscriptions.scss';

import Plan from './Plan/Plan';

const Subscriptions = ({ className, user, handlePayment }) => {
    const plans = [
        { type: 'Plugin', description: 'Unlimited plugin usage', includes: '(Plugin Only)', cost: 15 },
        { type: 'Starter', description: 'A good place to start prospecting', includes: '(Includes Plugin)', cost: 195, details: { reports: 10, techAlerts: 2, webAlerts: 2, exports: 2, systemLogins: 1 }, },
        { type: 'Pro', description: 'A good place to start prospecting', includes: '(Includes Plugin)', cost: 395, details: { reports: 25, techAlerts: 5, webAlerts: 10, exports: 10, systemLogins: 5 }, },
        { type: 'Team', description: 'A good place to start prospecting', includes: '(Includes Plugin)', cost: 895, details: { reports: 50, techAlerts: 10, webAlerts: 30, exports: 30, systemLogins: 10 }, },
    ];

    return(
        <div className={className}>
            {
                plans.map((plan, index) => <Plan key={index} isInSettings={className ? true : false} plan={plan} user={user} handlePayment={handlePayment} />)
            }
        </div>
    )
}

export default Subscriptions