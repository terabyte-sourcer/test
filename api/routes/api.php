<?php

use App\Http\Controllers\VisaFileController;

Route::prefix('visa-files')->group(function () {
    Route::post('/', [VisaFileController::class, 'upload']);
    Route::get('/', [VisaFileController::class, 'index']);
    Route::delete('/{id}', [VisaFileController::class, 'destroy']);
});