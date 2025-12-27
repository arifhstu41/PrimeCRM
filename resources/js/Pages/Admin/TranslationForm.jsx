import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function TranslationForm({ translation }) {
    const { languages } = usePage().props;
    const { data, setData, post, put, processing, errors } = useForm({
        key: translation?.key || '',
        value: translation?.value || '',
        language_code: translation?.language_code || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (translation) {
            put(route('admin.translations.update', translation.id));
        } else {
            post(route('admin.translations.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {translation ? 'Edit Translation' : 'Add Translation'}
                </h2>
            }
        >
            <Head title={translation ? 'Edit Translation' : 'Add Translation'} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-8 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Key</label>
                                <input
                                    type="text"
                                    value={data.key}
                                    onChange={(e) => setData('key', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                {errors.key && <div className="text-red-600 text-sm">{errors.key}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Value</label>
                                <textarea
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="3"
                                />
                                {errors.value && <div className="text-red-600 text-sm">{errors.value}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Language</label>
                                <select
                                    value={data.language_code}
                                    onChange={(e) => setData('language_code', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Language</option>
                                    {languages?.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.language_code && <div className="text-red-600 text-sm">{errors.language_code}</div>}
                            </div>
                            
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {translation ? 'Update' : 'Create'}
                                </button>
                                <a
                                    href={route('admin.translations.index')}
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