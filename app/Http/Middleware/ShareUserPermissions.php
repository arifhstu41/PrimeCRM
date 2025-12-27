<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShareUserPermissions
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()) {
            $user = $request->user()->load('role.permissions');
            Inertia::share([
                'userPermissions' => $user->role?->permissions->pluck('name')->toArray() ?? []
            ]);
        }

        return $next($request);
    }
}