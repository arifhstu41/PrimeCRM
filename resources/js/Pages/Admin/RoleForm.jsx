import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function RoleForm({ role, permissions }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: role?.name || '',
        display_name: role?.display_name || '',
        description: role?.description || '',
        permissions: role?.permissions?.map(p => p.id) || [],
    });

    const submit = (e) => {
        e.preventDefault();
        if (role) {
            put(route('admin.roles.update', role.id));
        } else {
            post(route('admin.roles.store'));
        }
    };

    const handlePermissionChange = (permissionId, checked) => {
        if (checked) {
            setData('permissions', [...data.permissions, permissionId]);
        } else {
            setData('permissions', data.permissions.filter(id => id !== permissionId));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {role ? 'Edit Role' : 'Add Role'}
                </h2>
            }
        >
            <Head title={role ? 'Edit Role' : 'Add Role'} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-8 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={data.display_name}
                                    onChange={(e) => setData('display_name', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                {errors.display_name && <div className="text-red-600 text-sm">{errors.display_name}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Code</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="3"
                                />
                                {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
                                <div className="space-y-4">
                                    {Object.entries(permissions || {}).map(([module, modulePermissions]) => (
                                        <div key={module} className="border rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-3">{module}</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {modulePermissions.map((permission) => (
                                                    <label key={permission.id} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.permissions.includes(permission.id)}
                                                            onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm">{permission.display_name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {role ? 'Update' : 'Create'}
                                </button>
                                <a
                                    href={route('admin.roles.index')}
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