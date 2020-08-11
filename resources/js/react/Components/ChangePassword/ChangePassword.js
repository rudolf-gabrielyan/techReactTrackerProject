import React from 'react';
import './ChangePassword.scss';

const ChangePassword = () => {
    return(
        <div className='changePasswordContainer'>
            <div>
                <div><span>Insert Current Password</span><input type='password' value='123456' /></div>
                <div><span>New Password</span><input type='password' value='123456' /></div>
                <div><span>Repeat New Password</span><input type='password' value='123456' /></div>
                <button>Save Password</button>
            </div>
        </div>
    )
}

export default ChangePassword