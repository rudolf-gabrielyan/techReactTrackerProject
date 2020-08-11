import React, { useState } from 'react';
import './AccountSettings.scss';

const AccountSettings = ({ history, subscriptionLinkURL }) => {
    const [inputIsDisabled, setInputIsDisabled] = useState(true);

    const handleDetailsEdit = event => setInputIsDisabled(!inputIsDisabled);

    return(
        <div className='accountSettingsContainer'>
            <div>
                <p>My Account details</p>
                <div><span>Email</span><input type='email' value='jq@voogy.com' disabled={inputIsDisabled} style={inputIsDisabled ? {border: 'none', backgroundColor: 'inherit'} : {padding: '5px'}} /></div>
                <div><span>Name</span><input type='text' value='Jesper Qvist' disabled={inputIsDisabled} style={inputIsDisabled ? {border: 'none', backgroundColor: 'inherit'} : {padding: '5px'}} /></div>
                <div><span>Company Name</span><input type='text' value='Voogy Inc.' disabled={inputIsDisabled} style={inputIsDisabled ? {border: 'none', backgroundColor: 'inherit'} : {padding: '5px'}} /></div>
                <div><span>Phone Number</span><input type='text' value='+1 787-1111-222' disabled={inputIsDisabled} style={inputIsDisabled ? {border: 'none', backgroundColor: 'inherit'} : {padding: '5px'}} /></div>
                <div><span>Subscription Plan</span><p>Premium <span onClick={() => history.push(subscriptionLinkURL)}>Change</span></p></div>
                <div><span>Member Since</span><p>October 1, 2019</p></div>
                <div className='horizontalLine'></div>
                <p onClick={handleDetailsEdit}>{inputIsDisabled ? 'Edit my details': 'Save Changes'}</p>
            </div>
            <div>
                <p>Subscription Status</p>
                <div><span>Technology Tracked</span><p>1 out of 5 used</p></div>
                <div><span>Technology Alerts</span><p>5 out of 5 used <span onClick={() => history.push(subscriptionLinkURL)}>(change plan to get more)</span></p></div>
                <div><span>Exports Tracked</span><p>1 out of 2 used</p></div>
                <p>Next reset is on Nov 1 2019</p>
            </div>
        </div>
    )
}

export default AccountSettings