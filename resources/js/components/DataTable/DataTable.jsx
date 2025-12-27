import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function DataTable({ 
    data, 
    columns, 
    searchable = true, 
    pagination = true,
    perPageOptions = [10, 25, 50, 100],
    className = ""
}) {
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(perPageOptions[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [columnFilters, setColumnFilters] = useState({});

    // Filter and search data
    const filteredData = data.filter(item => {
        // Global search
        const globalMatch = search === '' || Object.values(item).some(value => 
            String(value).toLowerCase().includes(search.toLowerCase())
        );

        // Column filters
        const columnMatch = Object.entries(columnFilters).every(([field, filterValue]) => {
            if (!filterValue) return true;
            return String(item[field]).toLowerCase().includes(filterValue.toLowerCase());
        });

        return globalMatch && columnMatch;
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortField) return 0;
        
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Paginate data
    const totalPages = Math.ceil(sortedData.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + perPage);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search, columnFilters, perPage]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleColumnFilter = (field, value) => {
        setColumnFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Showing {startIndex + 1} to {Math.min(startIndex + perPage, sortedData.length)} of {sortedData.length} results
                    </span>
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="ml-2 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        {perPageOptions.map(option => (
                            <option key={option} value={option}>{option} per page</option>
                        ))}
                    </select>
                </div>
                
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        First
                    </button>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 text-sm border rounded ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Last
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={`bg-white dark:bg-gray-800 shadow rounded-lg ${className}`}>
            {/* Search and Filters */}
            {searchable && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search all fields..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <button
                            onClick={() => {
                                setSearch('');
                                setColumnFilters({});
                                setSortField('');
                                setSortDirection('asc');
                            }}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key} className="px-6 py-3 text-left">
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() => column.sortable !== false && handleSort(column.key)}
                                                className={`text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                                                    column.sortable !== false ? 'hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer' : ''
                                                }`}
                                            >
                                                {column.label}
                                            </button>
                                            {column.sortable !== false && sortField === column.key && (
                                                <span className="text-blue-600 dark:text-blue-400">
                                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                        {column.filterable && (
                                            <input
                                                type="text"
                                                placeholder={`Filter ${column.label.toLowerCase()}...`}
                                                value={columnFilters[column.key] || ''}
                                                onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                                                className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr key={item.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                                            {column.render ? column.render(item) : (
                                                <span className="text-sm text-gray-900 dark:text-gray-100">
                                                    {item[column.key]}
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && totalPages > 1 && renderPagination()}
        </div>
    );
}