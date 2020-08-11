import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './LoggedUserCard.scss';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import { logout } from '../../../redux/actions/userActions';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#B2CFE9',
    fontSize: '14px',
    marginRight: '11px',
    transitionDuration: '0.4s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#8ea7bd',
    },
    '@media(max-width: 500px)': {
      marginRight: 0,
    },
  },
});

const LoggedUserCard = ({ showName, isNotInMainPage, user, logout }) => {
  const classes = useStyles();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const clickCallback = event =>  event.target !== dropdownRef.current && showDropdown && setShowDropdown(false);
    document.addEventListener('click', clickCallback);

    return () => document.removeEventListener('click', clickCallback);
  });

  const handleLogout = () => {
    logout()
    .then(response => {
      if(response === 'success') history.push('/');
    });
  };

  const formatUserDisplayName = () => {
    return user.firstName.slice(0,1) + '' + user.lastName.slice(0,1)
  };

  return(
    <div className='loggedUserCardContainer' onClick={() => !showDropdown && setShowDropdown(true)}>
      <Avatar classes={classes}>{formatUserDisplayName()}</Avatar>
      {showName && <span>{user.firstName} {user.lastName} <i className="fas fa-chevron-down" style={!isNotInMainPage ? {color: '#FFFFFF'} : null} /></span>}
      {
        showDropdown && <div ref={dropdownRef}>
          <p><i className="fas fa-user" /><Link to='/account'>My Account</Link></p>
          <p><i className="fab fa-chrome" /><Link to='#'>Chrome Plugin</Link></p>
          <p><i className="fas fa-question-circle" /><Link to='#'>Support</Link></p>
          <p onClick={handleLogout}><i className="fas fa-sign-out-alt" />Log Out</p>          
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserCard)