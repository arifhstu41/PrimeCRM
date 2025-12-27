import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function DataTable({ data, columns, filters, sortBy, sortOrder, perPage, searchPlaceholder, createRoute, editRoute, deleteRoute, bulkDeleteRoute }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [selectedItems, setSelectedItems] = useState([]);
    
    const handleSort = (column) => {
        const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        router.get(window.location.pathname, { 
            search: searchTerm, 
            per_page: perPage, 
            sort_by: column, 
            sort_order: newSortOrder 
        });
    };
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(window.location.pathname, { 
            search: searchTerm, 
            per_page: perPage,
            sort_by: sortBy,
            sort_order: sortOrder
        });
    };
    
    const handleEdit = (id) => {
        if (editRoute) {
            router.get(editRoute.replace(':id', id));
        }
    };
    
    const handleDelete = (id) => {
        if (deleteRoute && confirm('Are you sure you want to delete this item?')) {
            router.delete(deleteRoute.replace(':id', id));
        }
    };
    
    const handleBulkDelete = () => {
        if (bulkDeleteRoute && selectedItems.length > 0 && confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
            router.post(bulkDeleteRoute, { ids: selectedItems });
            setSelectedItems([]);
        }
    };
    
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(data.data.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };
    
    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        }
    };
    
    if (!data || !columns) return <div>Loading...</div>;
    
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <select 
                    value={perPage} 
                    onChange={(e) => handlePerPageChange(e.target.value)}
                    className="px-3 py-2 border rounded"
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div className="flex gap-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            placeholder={searchPlaceholder || "Search..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 border rounded"
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
                    </form>
                    {selectedItems.length > 0 && bulkDeleteRoute && (
                        <button 
                            onClick={handleBulkDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Delete ({selectedItems.length})
                        </button>
                    )}
                    {createRoute && (
                        <button 
                            onClick={() => router.get(createRoute)}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            + Add New
                        </button>
                    )}
                </div>
            </div>
            
            {data.data && data.data.length > 0 ? (
                <>
                    <table className="min-w-full border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left border">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === data.data.length}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                    />
                                </th>
                                {columns.map((column) => (
                                    <th key={column.key} className="px-4 py-2 text-left border cursor-pointer hover:bg-gray-100" onClick={() => handleSort(column.key)}>
                                        <div className="flex items-center justify-between">
                                            {column.label}
                                            <span className="ml-1">
                                                {sortBy === column.key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                                {(editRoute || deleteRoute) && (
                                    <th className="px-4 py-2 text-left border">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td className="px-4 py-2 border">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                                        />
                                    </td>
                                    {columns.map((column) => {
                                        let value = column.key.includes('.') ? 
                                            column.key.split('.').reduce((obj, key) => obj?.[key], item) || '-' :
                                            item[column.key];
                                        
                                        // Handle boolean values
                                        if (typeof value === 'boolean') {
                                            value = value ? 'Yes' : 'No';
                                        } else if (value === null || value === undefined) {
                                            value = '-';
                                        }
                                        
                                        return (
                                            <td key={column.key} className="px-4 py-2 border">
                                                {value}
                                            </td>
                                        );
                                    })}
                                    {(editRoute || deleteRoute) && (
                                        <td className="px-4 py-2 border">
                                            <div className="flex gap-2">
                                                {editRoute && (
                                                    <button 
                                                        onClick={() => handleEdit(item.id)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </button>
                                                )}
                                                {deleteRoute && (
                                                    <button 
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {data.last_page > 1 && (
                        <div className="mt-4 flex justify-between items-center">
                            <div>Showing {data.from} to {data.to} of {data.total} results</div>
                            <div className="flex gap-2">
                                {data.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 rounded ${
                                            link.active ? 'bg-blue-500 text-white' : 
                                            link.url ? 'bg-gray-200 hover:bg-gray-300' : 
                                            'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className="mt-4">No data found</p>
            )}
        </div>
    );
}