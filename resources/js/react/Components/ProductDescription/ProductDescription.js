import React from 'react';
import ShowMoreText from 'react-show-more-text';
import './ProductDescription.scss';

import Image from '../Image/Image';

import getTagInnerText from '../../helpers/getTagInnerText';

import building from '../../assets/images/building.svg';

const ProductDescription = ({ userIsLoggedIn, title, product }) => {

    return (
        <div className='productDescriptionContainer'>
            <div>
                {
                    product.logo_url ? 
                        <p><img src={product.logo_url} /> <a target='blank' href={product.url}>{product.name}</a></p>
                    :
                        <p><Image /> <a target='blank' href={product.website}>{product.name}</a></p>
                }
                <ShowMoreText
                    lines={2}
                    more='Show more'
                    less='Show less'
                    anchorClass=''
                    expanded={false}
                >
                    {getTagInnerText(product.description)}
                </ShowMoreText>
            </div>
            <div>
                <p>{title}</p>
                <div>
                    <img src={building} />
                    <p>{'number_of_technologies' in product ? <><span>{product.number_of_technologies}</span> technologies</> : <><span>{product.installs.total_installs}</span> companies</>}</p>
                </div>
                <p>2.2% (5,918 installs) September 2019</p>
                {!userIsLoggedIn && <button>Create a Target Report</button>}
            </div>
        </div>
    )
}

export default ProductDescription