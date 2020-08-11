import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Bowser from 'bowser';
import './Footer.scss';

const Footer = () => {
    const history = useHistory();

    const browserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();
    const chromePluginUrl = 'https://chrome.google.com/webstore/detail/tech-tracker/nbekoghdcgbghendladilmceojdobdgl';
    const firefoxPluginUrl = 'https://addons.mozilla.org/ru/firefox/addon/tech-tracker/';

    return (
        <div className='footerContainer'> 
            <h1>Land new customers today</h1>
            <p>Search and receive live alerts from new installations from more than 5,000 technologies today,</p>
            <button onClick={() => history.push('/signup')}>Create an account</button>
            <div className='footerBoxes'>
                <div>
                    {
                        browserName === 'Firefox' ?
                            <button onClick={() => window.open(firefoxPluginUrl, '_blank')}>
                                <i className="fab fa-firefox-browser" />
                                Add to Firefox
                            </button>
                        :
                            <button onClick={() => window.open(chromePluginUrl, '_blank')}>
                                <i className="fab fa-chrome" />
                                Add to Chrome
                            </button>
                    }
                </div>
                <div>
                    <p>Functions</p>
                    <Link to='#'>Technographics</Link>
                    <Link to='#'>Live Alerts</Link>
                </div>
                <div>
                    <div>
                        <p>Company</p>
                    </div>
                    <div>
                        <div>
                            <Link to='#'>About Us</Link>
                            <Link to='#'>Blog</Link>
                            <Link to='#'>Support</Link>
                        </div>
                        <div>
                            <Link to='#'>Career</Link>
                            <Link to='#'>Career</Link>
                            <Link to='#'>Webinar</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Legal</p>
                    <Link to='/terms_of_service'>Terms</Link>
                    <Link to='/privacy_policy'>Privacy</Link>
                    <Link to='/data_terms'>Data Terms</Link>
                </div>
            </div>
            <div className='footerEnd'>
                <div>
                    <Link to='/terms_of_service'>Terms of service</Link>
                    <Link to='/data_terms'>Data Terms</Link>
                    <Link to='/privacy_policy'>Privacy Policy</Link>
                </div>
                <div>
                    <i className="fab fa-twitter" />
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-xing" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-youtube" />
                    <i className="fab fa-linkedin" />
                </div>
            </div>
        </div>
    );
}

export default Footer;