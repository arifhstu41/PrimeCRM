<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    use Searchable;

    protected $fillable = ['key', 'value', 'language_code'];

    protected function getSearchableFields(): array
    {
        return ['key', 'value', 'language.name'];
    }

    public function language()
    {
        return $this->belongsTo(Language::class, 'language_code', 'code');
    }
}
