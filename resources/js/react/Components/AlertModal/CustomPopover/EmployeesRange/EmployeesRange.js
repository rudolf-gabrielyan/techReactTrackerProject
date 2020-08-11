import React, { useState } from 'react';
import './EmployeesRange.scss';

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import getValueForEmployeeSlider from '../../../../helpers/getValueForEmployeeSlider';
import getEmployeeSliderSelectedValue from '../../../../helpers/getEmployeeSliderSelectedValue';

const useStyles = makeStyles({
    root: {
      color: '#3898DE',
      marginBottom: '30px'
    },
    rail: {
        height: '5px',
    },
    track: {
        height: '5px',
    },
    thumb: {
        width: '20px',
        height: '20px',
        backgroundColor: '#FFFFFF',
        border: '5px solid #3898DE',
        marginTop: '-8px',
    },
    valueLabel: {
        left: 'calc(-50% + -6px)',
        '&> span' : {
            background: 'none',
            '&> span': {
                color: '#000000',
                fontWeight: 'bold',
                opacity: '0.5',
            }
        }
    }
});

const EmployeesRange = ({ employeesCount, setEmployeesCount, handlePopoverClose }) => {
    const classes = useStyles();
    const [value, setValue] = useState(() => {
        if(employeesCount.length === 9) {
            return [1, 9]
        }else {
            return getEmployeeSliderSelectedValue(employeesCount)
        };
    });

    const handleSliderValueChange = (event, newValue) => {
        setEmployeesCount(getValueForEmployeeSlider(newValue));
        setValue(newValue);
    };

    const handleCloseButtonClick = event => {
        setEmployeesCount(getValueForEmployeeSlider([1, 9]));
        handlePopoverClose();
    };

    const valueLabelFormat = number => {
        if(number === 1) return '1';
        if(number === 2 ) return '10';
        if(number === 3 ) return '50';
        if(number === 4 ) return '200';
        if(number === 5 ) return '500';
        if(number === 6 ) return '1000';
        if(number === 7 ) return '5000';
        if(number === 8 ) return '10000';
        if(number === 9) return <i className="fas fa-infinity" />;
    };

    return(
        <div className='employeesRangeContainer'>
            <i className="fas fa-times" onClick={handleCloseButtonClick} />
            <p>With employees count range of...</p>
            <Slider
                classes={classes}
                value={value}
                onChange={handleSliderValueChange}
                aria-labelledby="range-slider"
                valueLabelDisplay='on'
                min={1}
                max={9}
                step={1}
                valueLabelFormat={valueLabelFormat}
            />
            <button  onClick={handlePopoverClose}>Save</button>
        </div>
    )
}

export default EmployeesRange