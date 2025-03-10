<?php

use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::get('show_utilisateurs', [UtilisateurController::class, 'show_utilisateurs']);
    Route::get('show_utilisateurs_by_id/{id}', [UtilisateurController::class, 'show_utilisateurs_by_id']);
    Route::post('create_utilisateurs', [UtilisateurController::class, 'create_utilisateurs']);
    Route::put('update_utilisateurs/{id}', [UtilisateurController::class, 'update_utilisateurs']);
    Route::delete('delete_utilisateurs/{id}', [UtilisateurController::class, 'delete_utilisateurs']);
});
