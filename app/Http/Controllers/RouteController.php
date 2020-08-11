<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function __constuct(){
        parent::__construct();
    }

    public function show(){
        return view('app');
    }
}
