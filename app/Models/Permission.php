<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use Searchable;

    protected $fillable = ['name', 'display_name', 'module'];

    protected function getSearchableFields(): array
    {
        return ['name', 'display_name', 'module'];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permissions');
    }
}