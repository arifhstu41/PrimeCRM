<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\HasListView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    use HasListView;

    public function index(Request $request)
    {
        $user = auth()->user();
        $listData = $this->getListData($request, User::class, $this->getColumns(), ['role']);
        
        $routes = [];
        if ($user->hasPermission('users.add')) {
            $routes['createRoute'] = route('admin.users.create');
        }
        if ($user->hasPermission('users.edit')) {
            $routes['editRoute'] = route('admin.users.edit', ':id');
        }
        if ($user->hasPermission('users.delete')) {
            $routes['deleteRoute'] = route('admin.users.destroy', ':id');
            $routes['bulkDeleteRoute'] = route('admin.users.bulk-delete');
        }
        
        return Inertia::render('Admin/Users', array_merge($listData, $routes));
    }

    public function bulkDelete(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        User::whereIn('id', $request->ids)->delete();
        return redirect()->route('admin.users.index');
    }

    public function create()
    {
        $roles = \App\Models\Role::all(['id', 'display_name']);
        return Inertia::render('Admin/UserForm', compact('roles'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        User::create($request->all());
        return redirect()->route('admin.users.index');
    }

    public function edit(User $user)
    {
        $roles = \App\Models\Role::all(['id', 'display_name']);
        return Inertia::render('Admin/UserForm', compact('user', 'roles'));
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $user->update($request->only(['name', 'email', 'role_id']));
        return redirect()->route('admin.users.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users.index');
    }

    protected function getColumns(): array
    {
        return [
            ['key' => 'id', 'label' => 'ID', 'sortable' => true, 'searchable' => true],
            ['key' => 'name', 'label' => 'Name', 'sortable' => true, 'searchable' => true],
            ['key' => 'email', 'label' => 'Email', 'sortable' => true, 'searchable' => true],
            ['key' => 'role.display_name', 'label' => 'Role', 'sortable' => true, 'searchable' => true],
            ['key' => 'created_at', 'label' => 'Created At', 'sortable' => true, 'searchable' => false],
        ];
    }
}