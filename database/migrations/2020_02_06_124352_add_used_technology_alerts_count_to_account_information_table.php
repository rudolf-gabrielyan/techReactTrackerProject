<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUsedTechnologyAlertsCountToAccountInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('account_information', function (Blueprint $table) {
            Schema::table('account_information', function (Blueprint $table) {
                $table->integer('used_technology_alerts_count')->default(0);
            });
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('account_information', function (Blueprint $table) {
            //
        });
    }
}
