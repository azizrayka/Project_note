<?php

use App\Http\Controllers\NotesController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/signup', [UserController::class, 'Signup']);
Route::post('/signin', [UserController::class, 'Login']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'Logout']);

Route::get('Notes/{user_id}',[NotesController::class,'getNotes'])->middleware('auth:sanctum');
Route::get('Notes/{user_id}/searchbytitle/{title}',[NotesController::class,'getNoteBytitle'])->middleware('auth:sanctum');
Route::get('Notes/{user_id}/searchbydate/{date}',[NotesController::class,'getNoteBydate'])->middleware('auth:sanctum');
Route::get('Notes/{user_id}/searchbypriority/{priority}',[NotesController::class,'getNoteBypriority'])->middleware('auth:sanctum');

Route::post('Notes/{user_id}',[NotesController::class,'createNote'])->middleware('auth:sanctum');
Route::put('Notes/{user_id}/{id}',[NotesController::class,'updateNote'])->middleware('auth:sanctum');
Route::delete('Notes/{user_id}/{id}',[NotesController::class,'deleteNote'])->middleware('auth:sanctum');
