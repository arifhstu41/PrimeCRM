<?php

namespace App\Http\Controllers;

use App\Models\Translation;
use App\Traits\HasListView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TranslationController extends Controller
{
    use HasListView;

    public function index(Request $request)
    {
        $listData = $this->getListData($request, Translation::class, $this->getColumns(), ['language']);
        
        return Inertia::render('Admin/Translations', array_merge($listData, [
            'createRoute' => route('admin.translations.create'),
            'editRoute' => route('admin.translations.edit', ':id'),
            'deleteRoute' => route('admin.translations.destroy', ':id'),
            'bulkDeleteRoute' => route('admin.translations.bulk-delete'),
        ]));
    }

    public function bulkDelete(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        Translation::whereIn('id', $request->ids)->delete();
        return redirect()->route('admin.translations.index');
    }

    public function create()
    {
        return Inertia::render('Admin/TranslationForm');
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'value' => 'required|string',
            'language_code' => 'required|string|exists:languages,code',
        ]);

        Translation::create($request->all());
        return redirect()->route('admin.translations.index');
    }

    public function edit(Translation $translation)
    {
        return Inertia::render('Admin/TranslationForm', ['translation' => $translation->load('language')]);
    }

    public function update(Request $request, Translation $translation)
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'value' => 'required|string',
            'language_code' => 'required|string|exists:languages,code',
        ]);

        $translation->update($request->all());
        return redirect()->route('admin.translations.index');
    }

    public function destroy(Translation $translation)
    {
        $translation->delete();
        return redirect()->route('admin.translations.index');
    }

    protected function getColumns(): array
    {
        return [
            ['key' => 'id', 'label' => 'ID', 'sortable' => true, 'searchable' => true],
            ['key' => 'key', 'label' => 'Key', 'sortable' => true, 'searchable' => true],
            ['key' => 'value', 'label' => 'Value', 'sortable' => false, 'searchable' => true],
            ['key' => 'language.name', 'label' => 'Language', 'sortable' => true, 'searchable' => true],
        ];
    }
}