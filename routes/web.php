<?php

use App\Http\Controllers\LanguageController;
use App\Http\Controllers\LanguageSwitchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TranslationController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('users', [UserController::class, 'index'])->middleware('permission:users.view')->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->middleware('permission:users.add')->name('users.create');
    Route::post('users', [UserController::class, 'store'])->middleware('permission:users.add')->name('users.store');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->middleware('permission:users.edit')->name('users.edit');
    Route::put('users/{user}', [UserController::class, 'update'])->middleware('permission:users.edit')->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->middleware('permission:users.delete')->name('users.destroy');
    Route::post('users/bulk-delete', [UserController::class, 'bulkDelete'])->middleware('permission:users.delete')->name('users.bulk-delete');
    
    Route::get('roles', [RoleController::class, 'index'])->middleware('permission:roles.view')->name('roles.index');
    Route::get('roles/create', [RoleController::class, 'create'])->middleware('permission:roles.add')->name('roles.create');
    Route::post('roles', [RoleController::class, 'store'])->middleware('permission:roles.add')->name('roles.store');
    Route::get('roles/{role}/edit', [RoleController::class, 'edit'])->middleware('permission:roles.edit')->name('roles.edit');
    Route::put('roles/{role}', [RoleController::class, 'update'])->middleware('permission:roles.edit')->name('roles.update');
    Route::delete('roles/{role}', [RoleController::class, 'destroy'])->middleware('permission:roles.delete')->name('roles.destroy');
    Route::post('roles/bulk-delete', [RoleController::class, 'bulkDelete'])->middleware('permission:roles.delete')->name('roles.bulk-delete');
    
    Route::get('languages', [LanguageController::class, 'index'])->middleware('permission:languages.view')->name('languages.index');
    Route::get('languages/create', [LanguageController::class, 'create'])->middleware('permission:languages.add')->name('languages.create');
    Route::post('languages', [LanguageController::class, 'store'])->middleware('permission:languages.add')->name('languages.store');
    Route::get('languages/{language}/edit', [LanguageController::class, 'edit'])->middleware('permission:languages.edit')->name('languages.edit');
    Route::put('languages/{language}', [LanguageController::class, 'update'])->middleware('permission:languages.edit')->name('languages.update');
    Route::delete('languages/{language}', [LanguageController::class, 'destroy'])->middleware('permission:languages.delete')->name('languages.destroy');
    Route::post('languages/bulk-delete', [LanguageController::class, 'bulkDelete'])->middleware('permission:languages.delete')->name('languages.bulk-delete');
    
    Route::get('translations', [TranslationController::class, 'index'])->middleware('permission:translations.view')->name('translations.index');
    Route::get('translations/create', [TranslationController::class, 'create'])->middleware('permission:translations.add')->name('translations.create');
    Route::post('translations', [TranslationController::class, 'store'])->middleware('permission:translations.add')->name('translations.store');
    Route::get('translations/{translation}/edit', [TranslationController::class, 'edit'])->middleware('permission:translations.edit')->name('translations.edit');
    Route::put('translations/{translation}', [TranslationController::class, 'update'])->middleware('permission:translations.edit')->name('translations.update');
    Route::delete('translations/{translation}', [TranslationController::class, 'destroy'])->middleware('permission:translations.delete')->name('translations.destroy');
    Route::post('translations/bulk-delete', [TranslationController::class, 'bulkDelete'])->middleware('permission:translations.delete')->name('translations.bulk-delete');
    
    Route::get('/charts', function () {
        return Inertia::render('Admin/Charts');
    })->name('charts');
    
    Route::get('/forms', function () {
        return Inertia::render('Admin/Forms');
    })->name('forms');
    
    Route::get('/calendar', function () {
        return Inertia::render('Admin/Calendar');
    })->name('calendar');
    
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/switch-language', [LanguageSwitchController::class, 'switch'])->name('language.switch');
});

require __DIR__.'/auth.php';
