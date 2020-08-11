import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductDescription from '../Components/ProductDescription/ProductDescription';
import CompanyInfo from '../Components/CompanyInfo/CompanyInfo';
import CompanyTechChanges from '../Components/CompanyTechChanges/CompanyTechChanges';
import CompanyPoweredBy from '../Components/CompanyPoweredBy/CompanyPoweredBy';

import LoadingIndicator from '../Components/LoadingIndicator/LoadingIndicator';

import { getSelectedCompany } from '../redux/actions/selectedCompanyActions';

const CompanyOverview = ({ userIsLoggedIn, getSelectedCompany, selectedCompany }) => {
    const { domain } = useParams();
    
    useEffect(() => {
        getSelectedCompany(domain);
    }, [domain]);

    return(
        <div style={{position: 'relative'}}>
            <ProductDescription title='Currently number of Technologies used' userIsLoggedIn={userIsLoggedIn} product={selectedCompany} />
            <CompanyInfo company={selectedCompany} />
            <CompanyTechChanges company={selectedCompany} />
            <CompanyPoweredBy company={selectedCompany} />
            <LoadingIndicator state={selectedCompany.isLoading} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userIsLoggedIn: state.user.isLoggedIn,
        selectedCompany: state.selectedCompany,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSelectedCompany: domain => dispatch(getSelectedCompany(domain)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverview)