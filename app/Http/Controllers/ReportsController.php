<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Reports;
use App\AccountInformation;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{
    public function createReport(Request $request){
        try {
            Reports::insert($request->all());
            // Update Reports Count Field
            AccountInformation::where('user_id',$request->user_id)->first()->increment('used_reports_count');

            $used_reports_count = AccountInformation::where('user_id',$request->user_id)->first()->used_reports_count;

            return $used_reports_count;
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function getReports(Request $request){
        $user_id = $request->user_id;
        $reports = DB::table('reports')->where('user_id', $user_id)->get();
        return json_encode($reports);
    }

    public function deleteReport(Request $request) {
        Reports::where('id',$request->report_id)->delete();
        AccountInformation::where('user_id',$request->user_id)->first()->decrement('used_reports_count');
        $used_reports_count = AccountInformation::where('user_id',$request->user_id)->first()->used_reports_count;
        return $used_reports_count;
    }
}
