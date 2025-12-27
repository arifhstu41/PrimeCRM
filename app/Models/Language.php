<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use Searchable;

    protected $fillable = ['name', 'code', 'flag', 'is_active', 'is_default'];

    protected $casts = [
        'is_active' => 'boolean',
        'is_default' => 'boolean',
    ];

    protected function getSearchableFields(): array
    {
        return ['name', 'code'];
    }

    public function translations()
    {
        return $this->hasMany(Translation::class, 'language_code', 'code');
    }
}
