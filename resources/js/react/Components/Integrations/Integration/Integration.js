import React from 'react';
import './Integration.scss';

const Integration = ({image, isAvailable}) => {
    return(
        <div className='integrationContainer'>
            <img src={image} />
            <button disabled={!isAvailable} style={!isAvailable ? {backgroundColor: '#F0F4FD', color: '#000000'} : null}>{isAvailable ? 'Install' : 'Coming Soon'}</button>
        </div>
    )
}

export default Integration