import axios from 'axios';

import { loginApiEndpoint } from '../../helpers/api_endpoints';

export function login(data) {
    return dispatch => {
        dispatch({type: 'LOGIN_LOADING'});
        return axios.post('/api/login', data)
        .then(response => {
            localStorage.setItem('userToken', response.data.token);
            const user = {
                id: response.data.user.id,
                firstName: response.data.user.first_name,
                lastName: response.data.user.last_name,
                email: response.data.user.email,
                apiAuthToken: undefined,
                authToken: response.data.token,
                paddleInfo: response.data.user.paddleInfo,
                accountInformation: response.data.user.accountInformation,
                createdAt: response.data.user.created_at,
                updatedAt: response.data.user.updated_at,
            };
            return axios.post(loginApiEndpoint, data)
            .then(response => {
                localStorage.setItem('apiAuthToken', response.data.data.auth_token);
                user.apiAuthToken = response.data.data.auth_token;
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user,
                });
                return 'success'
            });
        }) 
        .catch(error => {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response.data,
            });
            return 'error'
        })
    }
};

export function checkAuth() {
    return dispatch => {
        if(localStorage.userToken && localStorage.apiAuthToken) {
            return axios.get('/api/checkAuth', {
                headers: { Authorization: `Bearer ${localStorage.userToken}` }
            })
            .then(response => {
                const user = {
                    id: response.data.user.id,
                    firstName: response.data.user.first_name,
                    lastName: response.data.user.last_name,
                    email: response.data.user.email,
                    apiAuthToken: localStorage.getItem('apiAuthToken'),
                    authToken: localStorage.getItem('userToken'),
                    paddleInfo: response.data.user.paddleInfo,
                    accountInformation: response.data.user.accountInformation,
                    createdAt: response.data.user.created_at,
                    updatedAt: response.data.user.updated_at,
                };
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user,
                });
                return Promise.resolve()
            })
            .catch(error => {
                localStorage.removeItem('userToken');
                localStorage.removeItem('apiAuthToken');
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: error.response.data,
                });
                return Promise.resolve()
            })
        }else {
            dispatch({type: 'NO_LOGGED_USER'});
            return Promise.resolve()
        }
    }
};

export function logout() {
    return dispatch => {
        return axios.get('/api/logout', {
            headers: { Authorization: `Bearer ${localStorage.userToken}` }
        })
        .then(response => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('apiAuthToken');
            dispatch({
                type: 'LOGOUT',
            });
            return 'success'
        })
        .catch(error => {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response.data,
            });
            return 'error'
        })
    }
};

export function handlePayment(planType) {
    return (dispatch, getState) => {
        axios.get('/api/getSubscriptionPlans')
        .then(response => {
            const selectedPlan = response.data.response.find(subscriptionPlan => subscriptionPlan.name === planType);
            const Paddle = window.Paddle;
            const user = getState().user;
            if(user.data.paddleInfo) {
                Paddle.Spinner.show();
                axios.post('/api/updateSubscriptionPlan', { plan_id: selectedPlan.id, subscription_id: user.data.paddleInfo.subscription_id, user_id: user.data.id, product_name: selectedPlan.name })
                .then(response => {
                    dispatch({
                        type: 'UPDATE_ACCOUNT_INFORMATION',
                        payload: response.data
                    });
                    const updateSubscriptionInterval = setInterval(() => {
                        axios.post('/api/getUpdatedSubscriptionPlanData', { paddle_user_id: user.data.paddleInfo.paddle_user_id })
                        .then(response => {
                            if(response.data.product_id !== user.data.paddleInfo.product_id) {
                                dispatch({
                                    type: 'UPDATE_PADDLE_DATA',
                                    payload: response.data
                                });
                                Paddle.Spinner.hide();
                                clearInterval(updateSubscriptionInterval);
                            };
                        })
                    }, 1000);
                })
                .catch(error => {
                    Paddle.Spinner.hide();
                    dispatch({ type: 'PADDLE_DATA_ERROR' });
                })
            }else {
                Paddle.Checkout.open({
                    product: selectedPlan.id,
                    email: user.data.email,
                    successCallback: (data, err) => {
                        const paddleData = {
                            status: 'active',
                            checkout_id: data.checkout.id,
                            user_id: user.data.id,
                            paddle_user_id: data.user.id,
                            product_id: data.product.id,
                            product_name: data.product.name,
                            created_at: data.checkout.created_at,
                            updated_at: data.checkout.created_at
                        };
                        axios.post('/api/insert_paddle_data', paddleData)
                        .then(response => {
                            dispatch({
                                type: 'SET_PADDLE_DATA',
                                payload: { ...paddleData, subscription_id: response.data.subscription_id }
                            });
                            dispatch({
                                type: 'SET_ACCOUNT_INFORMATION',
                                payload: response.data.accountInformation
                            });
                        })
                        .catch(error => dispatch({ type: 'PADDLE_DATA_ERROR' }))
                    }
                });
            }
        })
        .catch(error => dispatch({ type: 'PADDLE_DATA_ERROR' }))
    }
}