<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use App\Traits\HasListView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    use HasListView;

    public function index(Request $request)
    {
        $listData = $this->getListData($request, Role::class, $this->getColumns());
        
        return Inertia::render('Admin/Roles', array_merge($listData, [
            'createRoute' => route('admin.roles.create'),
            'editRoute' => route('admin.roles.edit', ':id'),
            'deleteRoute' => route('admin.roles.destroy', ':id'),
            'bulkDeleteRoute' => route('admin.roles.bulk-delete'),
        ]));
    }

    public function bulkDelete(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        Role::whereIn('id', $request->ids)->delete();
        return redirect()->route('admin.roles.index');
    }

    public function create()
    {
        $permissions = Permission::all()->groupBy('module');
        return Inertia::render('Admin/RoleForm', compact('permissions'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'permissions' => 'array',
        ]);

        $role = Role::create($request->only(['name', 'display_name', 'description']));
        $role->permissions()->sync($request->permissions ?? []);
        
        return redirect()->route('admin.roles.index');
    }

    public function edit(Role $role)
    {
        $permissions = Permission::all()->groupBy('module');
        $role->load('permissions');
        return Inertia::render('Admin/RoleForm', compact('role', 'permissions'));
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'permissions' => 'array',
        ]);

        $role->update($request->only(['name', 'display_name', 'description']));
        $role->permissions()->sync($request->permissions ?? []);
        
        return redirect()->route('admin.roles.index');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('admin.roles.index');
    }

    protected function getColumns(): array
    {
        return [
            ['key' => 'id', 'label' => 'ID', 'sortable' => true, 'searchable' => true],
            ['key' => 'display_name', 'label' => 'Name', 'sortable' => true, 'searchable' => true],
            ['key' => 'name', 'label' => 'Code', 'sortable' => true, 'searchable' => true],
            ['key' => 'description', 'label' => 'Description', 'sortable' => false, 'searchable' => true],
        ];
    }
}