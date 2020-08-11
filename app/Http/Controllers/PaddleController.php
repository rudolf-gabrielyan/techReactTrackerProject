<?php

namespace App\Http\Controllers;

require base_path().'/vendor/autoload.php';

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\PaddleInfo;
use App\User;
use App\AccountInformation;
use Illuminate\Support\Facades\DB;

class PaddleController extends Controller
{

    public function getSubscriptionPlans() {

        $url = 'https://vendors.paddle.com/api/2.0/subscription/plans';
        try {
            $client = new Client();
            $request = $client->request('POST', $url,
                [
                    'headers' => ['Content-Type' => 'application/x-www-form-urlencoded'],
                    'query'   => [
                        'vendor_id' => (int) env('MIX_PADDLE_VENDOR_ID'),
                        'vendor_auth_code' => (string) env('MIX_PADDLE_AUTH_CODE')
                    ]
                ]
            );

            $response = $request->getBody()->getContents();

            return $response;

        } catch (ConnectException $e) {
            return $e;
        }
    }

    public function getInvoices(Request $data) {
        $subscriptionPlans = json_decode($this->getSubscriptionPlans());
   
        $url = 'https://vendors.paddle.com/api/2.0/user/'.$data['paddleUserId'].'/transactions';          
        
        try {
            $client = new Client();
            $request = $client->request('POST', $url,
                [
                    'headers' => ['Content-Type' => 'application/x-www-form-urlencoded'],
                    'query'   => [
                        'vendor_id' => (int) env('MIX_PADDLE_VENDOR_ID'),
                        'vendor_auth_code' => (string) env('MIX_PADDLE_AUTH_CODE')
                    ]
                ]
            );

            $response = json_decode($request->getBody()->getContents());
            foreach($response->response as $index => $invoices){
                foreach($subscriptionPlans->response as $plans){
                    if ($plans->id == $invoices->product_id) {
                        $response->response[$index]->product_name = $plans->name;
                        $response->response[$index]->billing_type = $plans->billing_type;
                        break;
                    }
                }
            }
            return json_encode($response);

        } catch (ConnectException $e) {
            return $e;
        }
    }

    public function insert_paddle_data(Request $data) {

        $request = new \Illuminate\Http\Request();
        $request->replace(['paddleUserId' => $data['paddle_user_id']]);
        
        while(true) {
            $subscription_id = $this->getInvoices($request);
            $subscription_id = json_decode($subscription_id);

            if( !isset($subscription_id->response[0]) ) {
                continue;
            };

            $subscription_id = $subscription_id->response[0]->subscription->subscription_id;

            break;
        };
        
        $query = $data->all();
        $query['subscription_id'] = $subscription_id;

        PaddleInfo::create(
            $query
        );

        $accountInformation = [
            'user_id'            => $query['user_id'],
            'plan_name'          => $query['product_name'],
            'reports'            => ($query['product_name'] == 'Starter') ? 10   : ( ($query['product_name'] == 'Pro') ? 25    : ( ($query['product_name'] == 'Team') ? 50    : null ) ), 
            'technology_alerts'  => ($query['product_name'] == 'Starter') ? 2    : ( ($query['product_name'] == 'Pro') ? 5     : ( ($query['product_name'] == 'Team') ? 10    : null ) ),
            'website_alerts'     => ($query['product_name'] == 'Starter') ? 2    : ( ($query['product_name'] == 'Pro') ? 10    : ( ($query['product_name'] == 'Team') ? 30    : null ) ),
            'exports'            => ($query['product_name'] == 'Starter') ? 5000 : ( ($query['product_name'] == 'Pro') ? 20000 : ( ($query['product_name'] == 'Team') ? 50000 : null ) ),
            'system_logins'      => ($query['product_name'] == 'Starter') ? 1    : ( ($query['product_name'] == 'Pro') ? 5     : ( ($query['product_name'] == 'Team') ? 10    : null ) ),
            'used_reports_count' => 0,
        ];
        AccountInformation::insert(
            $accountInformation
        );       
        return response([
            'accountInformation' => $accountInformation,
            'subscription_id' => $subscription_id
        ] , 200);
        
    }

    public function updateSubscriptionPlan(Request $request){

        $plan_id = $request->all()['plan_id'];
        $subscription_id = $request->all()['subscription_id'];
        $url = "https://vendors.paddle.com/api/2.0/subscription/users/update";
        try {
            $client = new Client();
            $result = $client->request('POST', $url,
                [
                    'headers' => ['Content-Type' => 'application/x-www-form-urlencoded'],
                    'query'   => [
                        'vendor_id' => (int) env('MIX_PADDLE_VENDOR_ID'),
                        'vendor_auth_code' => (string) env('MIX_PADDLE_AUTH_CODE'),
                        'subscription_id' => (int) $subscription_id,
                        'plan_id' => (int) $plan_id,
                        'bill_immediately' => true,
                    ]
                ]
            );
            
            $accountInformation = [
                'user_id'            => $request->all()['user_id'],
                'plan_name'          => $request->all()['product_name'],
                'reports'            => ($request->all()['product_name'] == 'Starter') ? 10   : ( ($request->all()['product_name'] == 'Pro') ? 25    : ( ($request->all()['product_name'] == 'Team') ? 50    : null ) ), 
                'technology_alerts'  => ($request->all()['product_name'] == 'Starter') ? 2    : ( ($request->all()['product_name'] == 'Pro') ? 5     : ( ($request->all()['product_name'] == 'Team') ? 10    : null ) ),
                'website_alerts'     => ($request->all()['product_name'] == 'Starter') ? 2    : ( ($request->all()['product_name'] == 'Pro') ? 10    : ( ($request->all()['product_name'] == 'Team') ? 30    : null ) ),
                'exports'            => ($request->all()['product_name'] == 'Starter') ? 5000 : ( ($request->all()['product_name'] == 'Pro') ? 20000 : ( ($request->all()['product_name'] == 'Team') ? 50000 : null ) ),
                'system_logins'      => ($request->all()['product_name'] == 'Starter') ? 1    : ( ($request->all()['product_name'] == 'Pro') ? 5     : ( ($request->all()['product_name'] == 'Team') ? 10    : null ) ),
                'used_reports_count' => AccountInformation::where('user_id',$request->user_id)->first()->used_reports_count,
            ];
            AccountInformation::where('user_id', $request->all()['user_id'])->update(
                $accountInformation
            );  
            return json_encode($accountInformation);
        } catch (ConnectException $err) {
            return $err;
        }
    }

    public function getWebhookData( Request $data ) {
        ini_set('memory_limit', '2048M');

        $subscriptionPlans = json_decode($this->getSubscriptionPlans());

        $updatedSubscriptionPlan;
        foreach($subscriptionPlans->response as $sub) {
            if ($sub->id == $data['subscription_plan_id']) {
                $updatedSubscriptionPlan = $sub;
                break;
            }
        }
        
        switch ($data["alert_name"]) {
            case 'subscription_updated':
                $updatedSubscription = [
                    'checkout_id'     => $data['checkout_id'],
                    'subscription_id' => $data['subscription_id'],
                    'created_at'      => $data['event_time'],
                    'updated_at'      => $data['event_time'],
                    'product_name'    => $updatedSubscriptionPlan->name,
                    'product_id'      => $data['subscription_plan_id'],
                    'status'          => 'active'
                ];

                PaddleInfo::where('paddle_user_id', $data['user_id'])->update($updatedSubscription);
                break;

            case 'subscription_payment_succeeded':
                $succeededSubscription = [
                    'checkout_id'     => $data['checkout_id'],
                    'subscription_id' => $data['subscription_id'],
                    'created_at'      => $data['event_time'],
                    'updated_at'      => $data['event_time'],
                    'product_name'    => $data['plan_name'],
                    'product_id'      => $data['subscription_plan_id'],
                    'status'          => $data['status']
                ];

                PaddleInfo::where('paddle_user_id', $data['user_id'])->update($succeededSubscription);
                break;
                
            case 'subscription_payment_failed':
                $failedSubscription = [
                    'checkout_id'     => $data['checkout_id'],
                    'subscription_id' => $data['subscription_id'],
                    'created_at'      => $data['event_time'],
                    'updated_at'      => $data['event_time'],
                    'product_name'    => $updatedSubscriptionPlan->name,
                    'product_id'      => $data['subscription_plan_id'],
                    'status'          => $data['status']
                ];

                PaddleInfo::where('paddle_user_id', $data['user_id'])->update($failedSubscription);
                break;

            default:
                break;
        }
    }

    public function getUpdatedSubscriptionPlanData(Request $data) {

        $updatePaddleInfo = DB::table('paddle_infos')->where('paddle_user_id', $data['paddle_user_id'])->get()->first();
        

        return json_encode($updatePaddleInfo);
    }

}