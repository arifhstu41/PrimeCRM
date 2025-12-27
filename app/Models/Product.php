<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'status'
    ];

    protected function getSearchableFields(): array
    {
        return ['name', 'description', 'price', 'status', 'category.name'];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}