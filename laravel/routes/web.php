<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use L5Swagger\Http\Controllers\SwaggerController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/api/documentation', function () {
    return view('vendor.l5-swagger.index', [
        'documentationTitle' => config('l5-swagger.documentations.default.api.title', 'API Documentation'),
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
