<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LanguageSwitchController extends Controller
{
    public function switch(Request $request)
    {
        $languageCode = $request->input('language');
        
        if (Language::where('code', $languageCode)->where('is_active', true)->exists()) {
            Auth::user()->update(['language_code' => $languageCode]);
        }
        
        return back();
    }
}