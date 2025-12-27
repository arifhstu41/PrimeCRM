import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Charts({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Analytics & Charts</h2>}
        >
            <Head title="Charts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Revenue Chart */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
                            <div className="h-64 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">📈</div>
                                    <p className="text-gray-600 dark:text-gray-400">Line Chart Component</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">Revenue trends over time</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* User Growth */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Growth</h3>
                                <div className="h-48 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">📊</div>
                                        <p className="text-gray-600 dark:text-gray-400">Bar Chart</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Traffic Sources */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
                                <div className="h-48 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">🥧</div>
                                        <p className="text-gray-600 dark:text-gray-400">Pie Chart</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">98.5%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">1.2s</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Load Time</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">15.3%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Bounce Rate</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">4.2</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Session</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}