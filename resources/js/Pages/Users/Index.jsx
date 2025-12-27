import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';
import { Head } from '@inertiajs/react';

export default function Index({ 
    data, 
    columns, 
    filters, 
    sortBy, 
    sortOrder, 
    perPage 
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users Management
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <DataTable
                        data={data}
                        columns={columns}
                        filters={filters}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        perPage={perPage}
                        searchPlaceholder="Search users..."
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}