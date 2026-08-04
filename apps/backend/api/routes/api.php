<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BusinessController;

Route::apiResource('businesses', BusinessController::class);