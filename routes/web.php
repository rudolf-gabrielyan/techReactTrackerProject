<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::view('/{path?}', 'app');

// Route::get('/{path?}', [
//     'uses' => 'RouteController@show',
//     'as' => 'react',
//     'where' => ['path' => '.*']
// ]);

Route::get('{reactRoutes}', function () {
    return view('app'); 
})->where('reactRoutes', '^((?!api).)*$');

Route::view('/{path?}', 'app');


