<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShareLanguages
{
    public function handle(Request $request, Closure $next)
    {
        Inertia::share([
            'languages' => Language::where('is_active', true)->get(['name', 'code', 'flag']),
        ]);

        return $next($request);
    }
}