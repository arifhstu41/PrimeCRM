<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        $defaultRoleId = Setting::get('default_user_role');
        
        return Inertia::render('Admin/Settings', [
            'roles' => $roles,
            'defaultRoleId' => $defaultRoleId,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'default_user_role' => 'nullable|exists:roles,id',
        ]);

        if ($request->has('default_user_role')) {
            Setting::set('default_user_role', $request->default_user_role);
        }

        return redirect()->back()->with('success', 'Settings updated successfully');
    }
}