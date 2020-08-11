import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';

import Image from '../../Image/Image';

import modifyStringForUrl from '../../../helpers/modifyStringForUrl';

const Cart = ({ category, technology }) => {
    return(
        <div className='cartContainer'>
            <Image src={technology.image_url} />
            <p>{technology.name}</p>
            <Link to={`/${modifyStringForUrl(category)}/${technology.key}`}>Websites using this tech ></Link>
        </div>
    )
}

export default Cart