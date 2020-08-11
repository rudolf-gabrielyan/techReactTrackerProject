import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './SignupComponent.scss';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { registerApiEndpoint } from '../../helpers/api_endpoints';

const useStylesForBackspaceIcon = makeStyles(() => ({
    root: {
        color: '#FFFFFF',
        fontSize: '1.75rem',
    },
}));

const useStylesForCheckBox = makeStyles(() => ({
    root: {
        padding: 0,
        '& .MuiIconButton-label': {
            color: '#FFFFFF !important',
        },
    },
    colorSecondary: {
        color: '#FFFFFF',
    },
}));

const SignupComponent = () => {
    const history = useHistory();
    const classesForBackspaceIcon = useStylesForBackspaceIcon();
    const classesForCheckBox = useStylesForCheckBox();
    const [signupData, setSignupData] = useState({ email: '', first_name: '', last_name: '', password: '' });
    const [termsIsChecked, setTermsIsChecked] = useState('Is not checked');
    const [signupErrors, setSignupErrors] = useState({ email: '', first_name: '', last_name: '', password: '' });
    const [pageIsLoading, setPageIsLoading] = useState(false);

    const handleSignupDataChange = event => {
        event.persist();
        setSignupData(signupData => ({ ...signupData, [event.target.id]: event.target.value}));
    };

    const handleSignup = event => {
        if(termsIsChecked !== true) {
            setTermsIsChecked(false);
            return
        };
        setPageIsLoading(true);
        axios.post(registerApiEndpoint, signupData)
        .then(response => {
            if(response.data.error === '') {
                axios.post('/api/signup', {...signupData, api_token: response.data.data.auth_token})
                .then(response => history.push('/login'))
                .catch(error => {
                    setPageIsLoading(false);
                    setSignupErrors(error.response.data);
                });
            }else {
                setSignupErrors(response.data.error);
                setPageIsLoading(false);
            };
        })
        .catch(error => setPageIsLoading(false));
    };

    return( 
        <div className='signupComponentContainer'>
            <div>
                <div>
                    <div>
                        <Link to='/'><KeyboardBackspaceIcon classes={classesForBackspaceIcon} /></Link>
                    </div>
                    <div>
                        <p>Tech Tracker Account Benefits</p>
                        <p><i className="fas fa-check" />Explore the data for competitive and complementary technologies.</p>
                        <p><i className="fas fa-check" />Use the browser plugin to discover the technology on any domain.</p>
                        <p><i className="fas fa-check" />Download reports of technology usages and target your ideal customer.</p>
                    </div>                    
                </div>
            </div>
            <div>          
                <p>Create Your Tech Tracker Account</p>
                <div>
                    <p>YOUR EMAIL ADDRESS</p>
                    <input id='email' value={signupData.email} type='email' placeholder='jesper@techtracker.io' onChange={handleSignupDataChange} />
                    {signupErrors.email && <p>{signupErrors.email[0]}</p>}
                </div>
                <div>
                    <div>
                        <p>FIRST NAME</p>
                        <input id='first_name' value={signupData.firstName} type='text' placeholder='Jesper' onChange={handleSignupDataChange} />
                        {signupErrors.first_name && <p>{signupErrors.first_name[0]}</p>}
                    </div>
                    <div>
                        <p>LAST NAME</p>
                        <input id='last_name' value={signupData.lastName} type='text' placeholder='Qvist' onChange={handleSignupDataChange} />
                        {signupErrors.last_name && <p>{signupErrors.last_name[0]}</p>}
                    </div>
                </div>
                <div>
                    <p>PASSWORD</p>
                    <input id='password' value={signupData.password} type='password' placeholder='8+ characters' onChange={handleSignupDataChange} />
                    {signupErrors.password && <p>{signupErrors.password[0]}</p>}
                </div>
                <div>
                    <div>
                        <Checkbox classes={classesForCheckBox} onChange={event => setTermsIsChecked(event.target.checked)} />
                        <p>I agree to the <Link to='/terms_of_service'>Terms of Service</Link> and <Link to='/privacy_policy'>Privacy Policy</Link></p>
                    </div>
                {!termsIsChecked && <p>You must agree to Terms of Service and Privacy Policy to continue</p>}
                </div>
                <div>
                    <span></span>
                    <button onClick={handleSignup}>Sign Up</button>
                    <span></span>
                </div>
                <p>Already have an account? <Link to='/login'>Login Here</Link></p>
            </div>
            <LoadingIndicator state={pageIsLoading} />
        </div>
    )
}

export default SignupComponent