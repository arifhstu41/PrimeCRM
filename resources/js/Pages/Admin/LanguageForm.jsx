import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function LanguageForm({ language }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: language?.name || '',
        code: language?.code || '',
        flag: language?.flag || '',
        is_active: language?.is_active ?? true,
        is_default: language?.is_default ?? false,
    });

    const submit = (e) => {
        e.preventDefault();
        if (language) {
            put(route('admin.languages.update', language.id));
        } else {
            post(route('admin.languages.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {language ? 'Edit Language' : 'Add Language'}
                </h2>
            }
        >
            <Head title={language ? 'Edit Language' : 'Add Language'} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-8 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Code</label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                {errors.code && <div className="text-red-600 text-sm">{errors.code}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Flag</label>
                                <input
                                    type="text"
                                    value={data.flag}
                                    onChange={(e) => setData('flag', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                {errors.flag && <div className="text-red-600 text-sm">{errors.flag}</div>}
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="mr-2"
                                />
                                <label className="text-sm font-medium text-gray-700">Active</label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_default}
                                    onChange={(e) => setData('is_default', e.target.checked)}
                                    className="mr-2"
                                />
                                <label className="text-sm font-medium text-gray-700">Default</label>
                            </div>
                            
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {language ? 'Update' : 'Create'}
                                </button>
                                <a
                                    href={route('admin.languages.index')}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}