<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('technology_name')->nullable();
            $table->string('technology_key')->nullable();
            $table->string('technology_logo_url')->nullable();
            $table->integer('included_websites_count')->nullable();
            $table->json('included_industries')->nullable();
            $table->json('excluded_industries')->nullable();
            $table->json('included_technologies')->nullable();
            $table->json('excluded_technologies')->nullable();
            $table->json('included_employees_count')->nullable();
            $table->json('excluded_employees_count')->nullable();
            $table->json('included_locations')->nullable();
            $table->json('excluded_locations')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP')); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
}
