import React, { useState, useEffect } from 'react';

const useResizeHook = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const resizeCallback = () => setWidth(window.innerWidth);
        window.addEventListener('resize', resizeCallback);
        
        return () => {
           window.removeEventListener('resize', resizeCallback);
        };
    })

    return width
}

export default useResizeHook