import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import user from './user';
import categories from './categories';
import recentTechnologies from './recentTechnologies';
import searchedTechsAndDomains from './searchedTechsAndDomains';
import trendingTechnologies from './trendingTechnologies';
import selectedCompany from './selectedCompany';
import selectedSubcategory from './selectedSubcategory';
import selectedTechnology from './selectedTechnology';
import topTechnologies from './topTechnologies';
import createReport from './createReport';
import reports from './reports';
import createAlert from './createAlert';
import alerts from './alerts';

const rootReducer = combineReducers({ 
    user,
    categories,
    recentTechnologies,
    searchedTechsAndDomains,
    trendingTechnologies, 
    selectedCompany,
    selectedSubcategory,
    selectedTechnology,
    topTechnologies,
    createReport,
    reports,
    createAlert,
    alerts,
});

const middlewares = [];

if(process.env.NODE_ENV === 'development') {
    const {logger } = require('redux-logger');  
    middlewares.push(logger);
};

export default createStore(rootReducer, applyMiddleware(thunk, ...middlewares))