<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $permissions = [];
        
        if ($user) {
            $userWithRole = $user->load('role.permissions');
            $permissions = $userWithRole->role?->permissions->pluck('name')->toArray() ?? [];
        }
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? $user->load('language') : null,
            ],
            'languages' => \App\Models\Language::where('is_active', true)->get(['name', 'code', 'flag']),
            'userPermissions' => $permissions,
        ];
    }
}
