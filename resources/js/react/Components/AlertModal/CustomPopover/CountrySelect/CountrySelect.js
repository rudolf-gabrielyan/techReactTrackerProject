import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './CountrySelect.scss';

import countries from '../../../../assets/countries';

const styles = {
    control: (provided, state) => ({
        maxHeight: 100,
        height: 100,
        overflowY: 'auto',
        border: state.isFocused ? '1px solid #3898DE' : '1px solid lightgrey',
        fontSize: 14,
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        backgroundColor: 'lightgrey',
        fontSize: 14
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: 14,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#3898DE',
            color: '#FFFFFF',
        }
    }),
};

const CountrySelect = ({ selectedCountries, setCountries, handleSelectClose, handlePopoverClose }) => {
    const [countryOptions, setCountryOptions] = useState([]);
    const [defaultValue, setDefaultValue] = useState([]);

    useEffect(() => {
        const currentCountryOptions = [];
        for(let country in countries) {
            const currentCountry = {};
            currentCountry.value = countries[country];
            currentCountry.label = <span><img className='countryIcon' src={require(`../../../../assets/flags/${country.toLowerCase()}.svg`)} />{countries[country]}</span>
            currentCountryOptions.push(currentCountry);
        };
        setCountryOptions(Object.assign([], currentCountryOptions));
    }, []);

    useEffect(() => {
        setDefaultValue(countryOptions.filter(countryOption => selectedCountries.countries.includes(countryOption.value)));
    }, [ countryOptions ]);

    const handleCloseButtonClick = event => {
        setCountries({ type: 'all', countries: [] });
        handleSelectClose();
    };

    return(
        <div className='countrySelectContainer'>
            <i className="fas fa-times" onClick={handleCloseButtonClick} />
            <div>
                <p>{selectedCountries.type === 'choosen' ? 'Choose countries...' : 'Any country but...'}</p>
                <button disabled={!selectedCountries.countries.length} onClick={handlePopoverClose}>Save</button>
            </div>
            <Select
                key={defaultValue}
                defaultValue={defaultValue}
                isMulti
                placeholder='Select countries...'
                name="countries"
                options={countryOptions}
                maxMenuHeight={180}
                onChange={values => setCountries({ type: selectedCountries.type, countries: values ? values.map(value => value.value) : [] })}
                noOptionsMessage={() => 'No Such Country'}
                isClearable={false}
                closeMenuOnSelect={false}
                components={{DropdownIndicator: null}}
                styles={styles}   
            />
        </div>
    )
}

export default CountrySelect