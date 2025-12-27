<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use Searchable;

    protected $fillable = ['name', 'display_name', 'description'];

    protected function getSearchableFields(): array
    {
        return ['name', 'display_name', 'description'];
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }

    public function hasPermission($permission)
    {
        return $this->permissions()->where('name', $permission)->exists();
    }
}