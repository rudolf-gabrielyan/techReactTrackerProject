import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './LoginComponent.scss';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { login } from '../../redux/actions/userActions';

const useStyles = makeStyles(() => ({
    root: {
        color: '#FFFFFF',
        fontSize: '1.75rem',
    },
}));

const LoginComponent = ({ login, loginErrors, isLoading }) => {
    const classes = useStyles();
    const history = useHistory();
    const [loginData, setLoginData] = useState({email: '', password: '' });

    const handleLoginDataChange = event => {
        event.persist();
        setLoginData(loginData => ({ ...loginData, [event.target.id]: event.target.value}));
    };

    const handleLogin = event => {
        login(loginData)
        .then(response => response === 'success' ? history.push('/') : null);
    };
    
    return(
        <>
            <LoadingIndicator state={isLoading} />
            <div className='loginComponentContainer'>
                <Link to='/'><KeyboardBackspaceIcon classes={classes} /></Link>
                <div>
                    <div>
                        <p>Login to your Tech Tracker Account</p>
                        {typeof loginErrors === 'string' && <p>{loginErrors}</p>}
                        <div>
                            <p>YOUR EMAIL ADDRESS</p>
                            <input id='email' value={loginData.email} type='email' placeholder='jesper@techtracker.io' onChange={handleLoginDataChange} />
                            {loginErrors.email && <p>{loginErrors.email[0]}</p>}
                        </div>
                        <div>
                            <p>PASSWORD</p>
                            <input id='password' value={loginData.password} type='password' placeholder='8+ characters' onChange={handleLoginDataChange} />
                            {loginErrors.password && <p>{loginErrors.password[0]}</p>}
                        </div>
                        <div>
                            <span></span>
                            <button onClick={handleLogin}>Login</button>
                            <span></span>
                        </div>
                        <div>
                            <p>Don’t have an account yet? <Link to='/signup'>Sign Up Now</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.user.isLoading,
        loginErrors: state.user.loginErrors,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: data => dispatch(login(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)