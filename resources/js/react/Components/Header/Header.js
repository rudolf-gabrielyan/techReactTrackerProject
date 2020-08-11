import React, { useState, useEffect } from 'react';
import useResizeHook from '../../customHooks/useResizeHook';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss';

import LoggedUserCard from './LoggedUserCard/LoggedUserCard';
import SearchInput from '../SearchInput/SearchInput';

import techtrackerBlue from '../../assets/images/techtracker-blue.png';
import techtrackerWhite from '../../assets/images/techtracker-white.png';

const Header = ({ userIsLoggedIn }) => {
    const width = useResizeHook();
    const [isShowMenu, showMenu] = useState(false);
    const [showLoggedUserCardName, setShowLoggedUserCardName] = window.innerWidth > 500 ? useState(true) : useState(false);

    const location = useLocation();
    let isNotInMainPage = false;
    if(location.pathname !== '/') isNotInMainPage = true;

    useEffect(() => {
        if(width < 500) {
            setShowLoggedUserCardName(false);
        }else {
            setShowLoggedUserCardName(true);
        };        
    }, [location, width]);

    const handleMenuBarClick = event => {
        event.preventDefault();
        event.stopPropagation();
        showMenu(!isShowMenu);
    };
    
    if( width < 900 ) {
        return(
            <div className={`headerMenuContainer ${isNotInMainPage ? 'headerMenuContainerWithAdditionalStyles' : ''}`}>
                <div>
                    <div>                        
                        <Link to='/'>{userIsLoggedIn && <i className="fas fa-bars" style={!isNotInMainPage ? {marginRight: '10px', color: '#FFFFFF'} : null} onClick={handleMenuBarClick}></i>}<img src={!isNotInMainPage ? techtrackerWhite : techtrackerBlue} /></Link>
                        {
                            isNotInMainPage && <SearchInput className='searchInputHeaderMenuContainer' placeholder='Search Any Technology Product' />
                        } 
                    </div>
                    {!userIsLoggedIn ? <i className="fas fa-bars" onClick={() => showMenu(!isShowMenu)}></i> : <LoggedUserCard showName={showLoggedUserCardName} isNotInMainPage={isNotInMainPage} />}
                </div>
                {
                    isShowMenu && <div>
                        <div>
                            <p>Tech Categories</p>
                            <ul>
                                <li><NavLink to='/tech_categories' className='headerLink' activeClassName='activeLink'>Tech Categories</NavLink></li>
                                <li><NavLink to='/recent_technologies' className='headerLink' activeClassName='activeLink'>Recent Technologies</NavLink></li>
                            </ul>
                        </div>
                        {!userIsLoggedIn && <NavLink to='/public_pricing' className='headerLink' activeClassName='activeLink'>Pricing</NavLink>}
                        {userIsLoggedIn && <NavLink to='/reports' className='headerLink' activeClassName='activeLink'>Reports</NavLink>}
                        {userIsLoggedIn && <NavLink to='/alerts' className='headerLink' activeClassName='activeLink' style={{marginBottom: 0}}>Alerts</NavLink>}
                        {
                            !userIsLoggedIn && (<>
                                <Link to='/login' className='headerLink'>Login</Link>
                                <Link to='/signup' className='headerSignUpLink'>Sign up</Link>
                            </>)
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div className={`headerContainer ${isNotInMainPage ? 'headerContainerWithAdditionalStyles' : ''}`}>
            <div style={userIsLoggedIn ? isNotInMainPage ? {width: '754px', marginRight: '25px'} : {width: '455px'} : null}>
                <Link to='/'><img src={!isNotInMainPage ? techtrackerWhite : techtrackerBlue} /></Link>
                <div>
                    <p>Tech Categories</p>
                    <ul>
                        <li><NavLink to='/tech_categories' className='headerLink' activeClassName='activeLink'>Tech Categories</NavLink></li>
                        <li><NavLink to='/recent_technologies' className='headerLink' activeClassName='activeLink'>Recent Technologies</NavLink></li>
                    </ul>
                </div>
                {!userIsLoggedIn && <NavLink to='/public_pricing' className='headerLink' activeClassName='activeLink'>Pricing</NavLink>}
                {userIsLoggedIn && <NavLink to='/reports' className='headerLink' activeClassName='activeLink'>Reports</NavLink>}
                {userIsLoggedIn && <NavLink to='/alerts' className='headerLink' activeClassName='activeLink'>Alerts</NavLink>}
                {
                    isNotInMainPage && <SearchInput className='searchInputHeaderContainer' placeholder='Search Any Technology Product' />
                } 
            </div>
            <div style={userIsLoggedIn ? {justifyContent:'flex-end'} : null}>
                {
                    !userIsLoggedIn ? 
                        (<>
                            <Link to='/signup'>Sign up</Link>
                            <Link to='/login' className='headerLink'>Login</Link>
                        </>) :
                        (
                            <LoggedUserCard showName={showLoggedUserCardName} isNotInMainPage={isNotInMainPage} />
                        )
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userIsLoggedIn: state.user.isLoggedIn
    }
};

export default connect(mapStateToProps, null)(Header)