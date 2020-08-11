<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaddleInfo extends Model
{
    protected $fillable = [
        'status','checkout_id','subscription_id','paddle_user_id','user_id','product_id','product_name','created_at','updated_at',
    ];
}
