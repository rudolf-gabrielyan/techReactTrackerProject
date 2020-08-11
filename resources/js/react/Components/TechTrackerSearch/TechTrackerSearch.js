import React, { useState } from 'react';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
import { Link } from 'react-router-dom';
import './TechTrackerSearch.scss';

import SearchInput from '../SearchInput/SearchInput';

const TechTrackerSearch = () => {
    const [techs, setTechs] = useState(['Salesforce CRM', 'Marketo', 'SAP C4', 'Shopify', 'Adobe Experience Manager']);

    return(
        <div className='techTrackerSearchContainer'>
            <h1>Find Out What Companies Are Using</h1>
            <TypistLoop>
                {
                    techs.map(text => ( 
                        <Typist key={text} avgTypingDelay={130} cursor={{blink: true}}>
                            <Link to='#' className='typistLink'>{text}</Link>
                            <Typist.Delay ms={1000} />
                        </Typist>
                    ))
                }
            </TypistLoop>
            <p>We track any website on the internet and provide their technology usage</p>
            <p>What technology do you want to track?</p>
            <SearchInput className='searchInputFirstPageContainer' placeholder='Search Any Technology Product or Domain Name' />
            <p>Download Full Technology List</p>
        </div>
    )
}

export default TechTrackerSearch