const API_BASE_URL = 'https://api.techtracker.io/api/';
const API_BASE_URL_AUTH = 'https://api.techtracker.io/api/auth/';
const STANDART_API_TOKEN = 'r9qV7T2sZgxo1yyW0AFPufxSZtbYf77KcLrrYHkaETWZJ5T0xpIrF22QjkDniTau';

export const registerApiEndpoint = `${API_BASE_URL}register`;

export const loginApiEndpoint = `${API_BASE_URL}login`;

export const categoriesApiEndpoint = {
    mainUrl: 'get_categories_sub_categories',
};

export const recentTechnologiesApiEndpoint = {
    mainUrl: 'get_new_technologies',
};

export const searchingTechsAndDomainsApiEndpoint = {
    mainUrl: 'search_tech_domain',
    param: 'search',
};

export const trendingTechnologiesApiEndpoint = {
    mainUrl: 'get_trending_technologies',
};

export const selectedCompanyApiEndpoint = {
    mainUrl: 'get_domain_details',
    param: 'domain',
};

export const selectedSubcategoryApiEndpoint = {
    mainUrl: 'get_tech_count_by_subcategory',
    param: 'subcategory_key',
};

export const selectedTechnologyApiEndpoint = {
    mainUrl: 'get_technology_detail',
    param: 'technology',
};

export const topTechnologiesApiEndpoint = {
    mainUrl: 'get_top_technologies',
};

export const searchIndustriesApiEndpoint = {
    mainUrl: 'search_industries',
    param: 'search',
};

export const searchLocationsApiEndpoint = {
    mainUrl: 'search_location',
    param: 'search',
};

export function modifyApiEndpoint(getState, apiEndpoint, param) {
    const { isLoggedIn, data } = getState().user;

    if(isLoggedIn) {
        let ifHasParam = '';
        if(apiEndpoint.param) {
            ifHasParam = '?' + apiEndpoint.param + '=' + param
        };
        const url = `${API_BASE_URL_AUTH}${apiEndpoint.mainUrl}${ifHasParam}`;
        return {
            url,
            options: { headers: { Authorization: `Bearer ${data.apiAuthToken}` } }
        }
    }else {
        let ifHasParam = '';
        if(apiEndpoint.param) {
            ifHasParam = '&' + apiEndpoint.param + '=' + param
        };
        const url = `${API_BASE_URL}${apiEndpoint.mainUrl}?token=${STANDART_API_TOKEN}${ifHasParam}`;
        return {
            url,
            options: { }
        }
    };
};