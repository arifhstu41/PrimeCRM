<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Traits\HasListView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LanguageController extends Controller
{
    use HasListView;

    public function index(Request $request)
    {
        $listData = $this->getListData($request, Language::class, $this->getColumns());
        
        return Inertia::render('Admin/Languages', array_merge($listData, [
            'createRoute' => route('admin.languages.create'),
            'editRoute' => route('admin.languages.edit', ':id'),
            'deleteRoute' => route('admin.languages.destroy', ':id'),
            'bulkDeleteRoute' => route('admin.languages.bulk-delete'),
        ]));
    }

    public function bulkDelete(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        Language::whereIn('id', $request->ids)->delete();
        return redirect()->route('admin.languages.index');
    }

    public function create()
    {
        return Inertia::render('Admin/LanguageForm');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:5|unique:languages',
            'flag' => 'nullable|string|max:10',
        ]);

        Language::create($request->all());
        return redirect()->route('admin.languages.index');
    }

    public function edit(Language $language)
    {
        return Inertia::render('Admin/LanguageForm', ['language' => $language]);
    }

    public function update(Request $request, Language $language)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:5|unique:languages,code,' . $language->id,
            'flag' => 'nullable|string|max:10',
        ]);

        $language->update($request->all());
        return redirect()->route('admin.languages.index');
    }

    public function destroy(Language $language)
    {
        $language->delete();
        return redirect()->route('admin.languages.index');
    }

    protected function getColumns(): array
    {
        return [
            ['key' => 'id', 'label' => 'ID', 'sortable' => true, 'searchable' => true],
            ['key' => 'name', 'label' => 'Name', 'sortable' => true, 'searchable' => true],
            ['key' => 'code', 'label' => 'Code', 'sortable' => true, 'searchable' => true],
            ['key' => 'flag', 'label' => 'Flag', 'sortable' => false, 'searchable' => false],
            ['key' => 'is_active', 'label' => 'Active', 'sortable' => true, 'searchable' => false],
            ['key' => 'is_default', 'label' => 'Default', 'sortable' => true, 'searchable' => false],
        ];
    }
}