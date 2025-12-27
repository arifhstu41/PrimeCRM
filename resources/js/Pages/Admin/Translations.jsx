import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';
import { Head } from '@inertiajs/react';

export default function Translations({ data, columns, filters, sortBy, sortOrder, perPage, createRoute, editRoute, deleteRoute, bulkDeleteRoute }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Translations Management
                </h2>
            }
        >
            <Head title="Translations" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-8 lg:px-8">
                    <DataTable
                        data={data}
                        columns={columns}
                        filters={filters}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        perPage={perPage}
                        searchPlaceholder="Search translations..."
                        createRoute={createRoute}
                        editRoute={editRoute}
                        deleteRoute={deleteRoute}
                        bulkDeleteRoute={bulkDeleteRoute}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}