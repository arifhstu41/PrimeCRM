<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Traits\HasListView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use HasListView;

    public function index(Request $request)
    {
        $listData = $this->getListData($request, Product::class, $this->getColumns(), ['category']);
        
        return Inertia::render('Products/Index', $listData);
    }

    protected function getColumns(): array
    {
        return [
            ['key' => 'id', 'label' => 'ID', 'sortable' => true, 'searchable' => true],
            ['key' => 'name', 'label' => 'Product Name', 'sortable' => true, 'searchable' => true],
            ['key' => 'description', 'label' => 'Description', 'sortable' => false, 'searchable' => true],
            ['key' => 'price', 'label' => 'Price', 'sortable' => true, 'searchable' => true, 'render' => function($value) {
                return '$' . number_format($value, 2);
            }],
            ['key' => 'category.name', 'label' => 'Category', 'sortable' => true, 'searchable' => true],
            ['key' => 'status', 'label' => 'Status', 'sortable' => true, 'searchable' => true],
            ['key' => 'created_at', 'label' => 'Created At', 'sortable' => true, 'searchable' => false],
        ];
    }
}