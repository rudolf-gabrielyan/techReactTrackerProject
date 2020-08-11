import React from 'react';
import AsyncSelect from 'react-select/async';
import './TechnologySelect.scss';

const styles = {
    control: (provided, state) => ({
        ...provided,
        fontSize: 14,
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

const TechnologySelect = ({ selectedTechnology, getSearchedTechnologiesForSelect, setTechnology, handlePopoverClose }) => {
    const loadOptions = inputValue => {
        return getSearchedTechnologiesForSelect(inputValue)
        .then(response => response.map(response => ({ value: response.value, label: <span><img className='technologyIcon' src={response.value.logo_url} />{response.label}</span> })))
    };

    const handleCloseButtonClick = event => {
        setTechnology({});
        handlePopoverClose();
    };

    return(
        <div className='technologySelectContainer'>
            <i className="fas fa-times" onClick={handleCloseButtonClick} />
            <p>Choose technology...</p>
            <AsyncSelect
                defaultValue={{ value: selectedTechnology, label: <span><img className='technologyIcon' src={selectedTechnology.logo_url} />{selectedTechnology.name}</span> }}
                cacheOptions
                placeholder='Select technology...'
                maxMenuHeight={180}
                onChange={value => setTechnology(value.value)}
                loadOptions={loadOptions}
                noOptionsMessage={() => 'No Such Technology'}
                isClearable={false}
                closeMenuOnSelect={true}
                components={{DropdownIndicator: null}}
                styles={styles}
            />
            <button onClick={handlePopoverClose}>Save</button>
        </div>
    )
}

export default TechnologySelect