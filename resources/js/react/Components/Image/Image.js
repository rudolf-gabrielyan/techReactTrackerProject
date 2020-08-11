import React, { useState } from 'react';

import defaultIcon from '../../assets/images/defaultIcon.png';

const Image = ({ src }) => {
    const [imageSrc, setImageSrc] = useState(src);
    
    return <img src={imageSrc || defaultIcon} onError={() => setImageSrc(defaultIcon)} />
}

export default Image