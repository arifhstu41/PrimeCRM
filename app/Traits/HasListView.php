<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait HasListView
{
    protected function getListData(Request $request, $model, array $columns = [], array $relations = []): array
    {
        $perPage = $request->get('per_page', 25);
        $search = $request->get('search', '');
        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'desc');
        
        // Build filters array
        $filters = ['search' => $search];
        foreach ($columns as $column) {
            $fieldName = is_array($column) ? $column['key'] : $column;
            if ($request->has($fieldName)) {
                $filters[$fieldName] = $request->get($fieldName);
            }
        }

        $query = $model::query();
        
        // Apply relationships
        if (!empty($relations)) {
            $query->with($relations);
        }
        
        // Apply search filters if model has search method
        if (method_exists($model, 'scopeSearch')) {
            $query->search($filters);
        }
        
        // Apply sorting
        if (str_contains($sortBy, '.')) {
            // Handle relationship sorting
            $parts = explode('.', $sortBy);
            $relation = $parts[0];
            $column = $parts[1];
            $query->join($relation, $relation . '.id', '=', $model::getTable() . '.' . $relation . '_id')
                  ->orderBy($relation . '.' . $column, $sortOrder)
                  ->select($model::getTable() . '.*');
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }
        
        $data = $query->paginate($perPage)->withQueryString();
        
        return [
            'data' => $data,
            'filters' => $filters,
            'columns' => $this->getColumns(),
            'sortBy' => $sortBy,
            'sortOrder' => $sortOrder,
            'perPage' => $perPage
        ];
    }
    
    abstract protected function getColumns(): array;
}