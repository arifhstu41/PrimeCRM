<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Searchable
{
    public function scopeSearch(Builder $query, array $filters = [])
    {
        // Global search
        if (!empty($filters['search'])) {
            $searchTerm = $filters['search'];
            $searchableFields = $this->getSearchableFields();
            
            $query->where(function ($q) use ($searchTerm, $searchableFields) {
                foreach ($searchableFields as $field) {
                    if (str_contains($field, '.')) {
                        // Handle relationship fields
                        $parts = explode('.', $field);
                        $relation = $parts[0];
                        $column = $parts[1];
                        $q->orWhereHas($relation, function ($subQuery) use ($column, $searchTerm) {
                            $subQuery->where($column, 'LIKE', "%{$searchTerm}%");
                        });
                    } else {
                        $q->orWhere($field, 'LIKE', "%{$searchTerm}%");
                    }
                }
            });
        }

        // Individual field searches
        foreach ($filters as $key => $value) {
            if ($key !== 'search' && !empty($value) && in_array($key, $this->getSearchableFields())) {
                if (str_contains($key, '.')) {
                    // Handle relationship fields
                    $parts = explode('.', $key);
                    $relation = $parts[0];
                    $column = $parts[1];
                    $query->whereHas($relation, function ($subQuery) use ($column, $value) {
                        $subQuery->where($column, 'LIKE', "%{$value}%");
                    });
                } else {
                    $query->where($key, 'LIKE', "%{$value}%");
                }
            }
        }

        return $query;
    }

    abstract protected function getSearchableFields(): array;
}