import React from 'react';
import AsyncSelect from 'react-select/async';

const stylesForSelect = {
    control: (provided, state) => ({
        width: '80%',
        maxHeight: 100,
        height: 100,
        overflowY: 'auto',
        border: state.isFocused ? '1px solid #3898DE' : '1px solid lightgrey',
        fontSize: 14,
        backgroundColor: '#FFFFFF',
        border: '1px solid #C4C4C4',
        boxSizing: 'border-box',
        borderRadius: '6px',
        fontWeight: '500',
        fontSize: '0.8rem',
        color: '#6E6B6B',
        marginBottom: '14px',
        marginLeft: '19px',
    }),
    menu: (provided, state) => ({
        ...provided,
        width: '80%',
        marginLeft: '19px',
        zIndex: '2',
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        backgroundColor: 'lightgrey',
        fontSize: '0.7rem',
        color: '#282828',
        backgroundColor: '#AFB2BA',
        borderRadius: '2px',
        padding: '2px 12px',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: 14,
        fontWeight: '500',
        fontSize: '0.8rem',
        color: '#6E6B6B',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#3898DE',
            color: '#FFFFFF',
        }
    }),
};

const AsyncReactSelect = ({ placeholder, noOptionsMessage, request, onChange }) => {

    const loadOptions = inputValue => {
        return request(inputValue);
    };

    return(
        <AsyncSelect
            isMulti
            cacheOptions
            placeholder={placeholder}
            maxMenuHeight={180}
            onChange={value => onChange(value)}
            loadOptions={loadOptions}
            noOptionsMessage={() => noOptionsMessage}
            isClearable={false}
            closeMenuOnSelect={false}
            components={{DropdownIndicator: null}}
            styles={stylesForSelect}
        />
    )
}

export default AsyncReactSelect