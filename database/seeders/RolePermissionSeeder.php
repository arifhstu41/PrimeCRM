<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create permissions
        $modules = ['users', 'roles', 'languages', 'translations'];
        $actions = ['view', 'add', 'edit', 'delete'];

        foreach ($modules as $module) {
            foreach ($actions as $action) {
                Permission::create([
                    'name' => "{$module}.{$action}",
                    'display_name' => ucfirst($action) . ' ' . ucfirst($module),
                    'module' => ucfirst($module),
                ]);
            }
        }

        // Create roles
        $adminRole = Role::create([
            'name' => 'admin',
            'display_name' => 'Administrator',
            'description' => 'Full access to all features',
        ]);

        $userRole = Role::create([
            'name' => 'user',
            'display_name' => 'User',
            'description' => 'Limited access',
        ]);

        // Assign all permissions to admin
        $adminRole->permissions()->attach(Permission::all());

        // Assign limited permissions to user
        $userPermissions = Permission::whereIn('name', [
            'users.view', 'languages.view', 'translations.view'
        ])->get();
        $userRole->permissions()->attach($userPermissions);
    }
}