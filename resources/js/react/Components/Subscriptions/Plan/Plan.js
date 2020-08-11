import React from 'react';
import { Link } from 'react-router-dom';
import './Plan.scss';

const Plan = ({ isInSettings, plan, user, handlePayment }) => {
    const isPlanSelected = user && user.data.paddleInfo && plan.type === user.data.paddleInfo.product_name;

    return(
        <div className='planContainer' style={plan.type === 'Pro' ? { color: '#FFFFFF', backgroundColor: '#3898DE' } : null}>
            <p>{plan.type}</p>
            <p>{plan.description}</p>
            <p>{plan.includes}</p>
            <div style={!plan.details ? { flexGrow: 1, marginBottom: 0 } : null}><p><span>$</span> {plan.cost} <span>/month</span></p></div>
            {
                plan.details && (
                    <div>
                        <div>
                            <span>Reports</span>
                            <span>{plan.details.reports}</span>
                        </div>
                        <div>
                            <span>Technology Alerts</span>
                            <span>{plan.details.techAlerts}</span>
                        </div>
                        <div>
                            <span>Website Alerts</span>
                            <span>{plan.details.webAlerts}</span>
                        </div>
                        <div>
                            <span>Exports</span>
                            <span>{plan.details.exports}</span>
                        </div>
                        <div>
                            <span>System Logins</span>
                            <span>{plan.details.systemLogins}</span>
                        </div>
                    </div>
                )
            }
            {
                isInSettings ?
                    <button disabled={isPlanSelected} style={isPlanSelected ? {backgroundColor: '#F0F4FD', color: '#000000'} : null} onClick={() => handlePayment(plan.type)}>{isPlanSelected ? 'Current Plan' : 'Upgrade'}</button>
                :
                    <Link to='/signup'>Create Account</Link>
            }
        </div>
    )
}

export default Plan