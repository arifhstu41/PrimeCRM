import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [darkMode, setDarkMode] = useState(false);

    const stats = [
        { name: 'Total Users', value: '2,651', change: '+4.75%', changeType: 'positive' },
        { name: 'Active Projects', value: '45', change: '+54.02%', changeType: 'positive' },
        { name: 'Revenue', value: '$89,400', change: '-1.39%', changeType: 'negative' },
        { name: 'Conversion Rate', value: '2.65%', change: '+10.18%', changeType: 'positive' },
    ];

    const recentActivity = [
        { id: 1, user: 'John Doe', action: 'Created new project', time: '2 hours ago' },
        { id: 2, user: 'Jane Smith', action: 'Updated user profile', time: '4 hours ago' },
        { id: 3, user: 'Mike Johnson', action: 'Completed task', time: '6 hours ago' },
        { id: 4, user: 'Sarah Wilson', action: 'Added new client', time: '8 hours ago' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Admin Dashboard
                    </h2>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className={darkMode ? 'dark' : ''}>
                <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat) => (
                                <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                                                {stat.name}
                                            </p>
                                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className={`text-sm font-medium ${
                                            stat.changeType === 'positive' 
                                                ? 'text-green-600 dark:text-green-400' 
                                                : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {stat.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Chart Placeholder */}
                            <div className="lg:col-span-2 bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                        Analytics Overview
                                    </h3>
                                    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-500 dark:text-gray-400">Chart Component Placeholder</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-start space-x-3">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm font-medium">
                                                            {activity.user.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {activity.user}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {activity.action}
                                                    </p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                        <div className="text-blue-600 dark:text-blue-400 text-2xl mb-2">👥</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Manage Users</div>
                                    </button>
                                    <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                                        <div className="text-green-600 dark:text-green-400 text-2xl mb-2">📊</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">View Reports</div>
                                    </button>
                                    <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                        <div className="text-purple-600 dark:text-purple-400 text-2xl mb-2">⚙️</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Settings</div>
                                    </button>
                                    <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                                        <div className="text-orange-600 dark:text-orange-400 text-2xl mb-2">📅</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Calendar</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}