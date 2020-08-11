import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import useResizeHook from '../../../customHooks/useResizeHook';
import './ReactSwitch.scss';

const ReactSwitch = ({ id, checked, onChange }) => {
    const width = useResizeHook();
    const [switchSize, setSwitchSize] = useState({width: 118, height: 52});

    useEffect(() => {

        if(width >= 1200) {
            setSwitchSize({width: 118, height: 52});
        }else if(width >= 1000 && width < 1200) {
            setSwitchSize({width: 100, height: 42});
        }else if(width >= 800 && width < 1000) {
            setSwitchSize({width: 90, height: 35});
        }else if(width >= 600 && width < 800) {
            setSwitchSize({width: 80, height: 30});
        }else if(width < 600) {
            setSwitchSize({width: 70, height: 25});
        };

    }, [ width ]);

    return(
        <Switch
            key={switchSize.width}
            className='switch'
            id={id} 
            checked={checked}
            onChange={onChange}
            offColor='#C4C4C4'
            onColor='#60E770'
            width={switchSize.width}
            height={switchSize.height}
            uncheckedIcon={
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <span style={{fontSize: '1rem'}}>OFF</span>
                </div>
            }
            checkedIcon={
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <span style={{fontSize: '1rem'}}>ON</span>
                </div>
            }
        />
    )
}

export default ReactSwitch