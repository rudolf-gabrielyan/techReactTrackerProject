<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',  
], function ($router) {
    
    Route::post('/signup','Auth\RegisterController@signup');
    Route::post('/login','Auth\LoginController@login');
    Route::get('/logout','Auth\LoginController@logout');
    Route::get('/checkAuth', 'Auth\LoginController@getAuthenticatedUser');
    Route::get('/getSubscriptionPlans', 'PaddleController@getSubscriptionPlans');
    Route::post('/updateSubscriptionPlan', 'PaddleController@updateSubscriptionPlan');
    Route::post('/getInvoices', 'PaddleController@getInvoices');
    Route::post('/insert_paddle_data', 'PaddleController@insert_paddle_data');
    Route::post('/getWebhookData', 'PaddleController@getWebhookData');
    Route::post('/getUpdatedSubscriptionPlanData', 'PaddleController@getUpdatedSubscriptionPlanData');
    Route::post('/createReport', 'ReportsController@createReport');
    Route::post('/getReports', 'ReportsController@getReports');
    Route::post('/deleteReport', 'ReportsController@deleteReport');
    Route::post('/getAlerts', 'AlertsController@getAlerts');
    Route::post('/createAlert', 'AlertsController@createAlert');
    
});