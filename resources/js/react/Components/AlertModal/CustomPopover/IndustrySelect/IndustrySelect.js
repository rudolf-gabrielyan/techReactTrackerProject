import React from 'react';
import AsyncSelect from 'react-select/async';
import './IndustrySelect.scss';

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

const IndustrySelect = ({ selectedIndustries, getSearchedIndustries, setIndustries, handleSelectClose, handlePopoverClose }) => {
    const loadOptions = inputValue => {
        return getSearchedIndustries(inputValue);
    };

    const handleCloseButtonClick = event => {
        setIndustries({ type: 'all', industries: [] });
        handleSelectClose();
    };

    return(
        <div className='industrySelectContainer'>
            <i className="fas fa-times" onClick={handleCloseButtonClick} />
            <div>
                <p>{selectedIndustries.type === 'choosen' ? 'Choose industry verticals...' : 'Any industry verticals but...'}</p>
                <button disabled={!selectedIndustries.industries.length} onClick={handlePopoverClose}>Save</button>
            </div>
            <AsyncSelect
                defaultValue={selectedIndustries.industries.map(industry => ({ value: industry, label: industry }))}
                isMulti
                cacheOptions
                placeholder='Select industry verticals...'
                maxMenuHeight={180}
                onChange={values => setIndustries({ type: selectedIndustries.type, industries: values ? values.map(value => value.value) : [] })}
                loadOptions={loadOptions}
                noOptionsMessage={() => 'No Such Industry Vertical'}
                isClearable={false}
                closeMenuOnSelect={false}
                components={{DropdownIndicator: null}}
                styles={styles}
            />
        </div>
    )
}

export default IndustrySelect