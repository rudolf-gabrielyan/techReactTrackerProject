<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Alerts;
use App\AccountInformation;
use Illuminate\Support\Facades\DB;

class AlertsController extends Controller{

    public function getAlerts(Request $request){
        $user_id = $request->user_id;
        $alerts = DB::table('alerts')->where('user_id', $user_id)->get();
        return json_encode($alerts);
    }

    public function createAlert(Request $request){
        try {
            Alerts::insert($request->all());
            // Update Alerts Count Field
            AccountInformation::where('user_id',$request->user_id)->first()->increment('used_technology_alerts_count');
            
            $used_technology_alerts_count = AccountInformation::where('user_id',$request->user_id)->first()->used_technology_alerts_count;

            $requestForAlerts = new \Illuminate\Http\Request();
            $requestForAlerts->replace(['user_id' => $request->user_id]);

            return [
                'used_technology_alerts_count' => $used_technology_alerts_count,
                'alerts'                       => $this->getAlerts($requestForAlerts),
            ];
        } catch (\Throwable $th) {
            return $th;
        }  
    }
}