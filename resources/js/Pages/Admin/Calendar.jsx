import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Calendar({ auth }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events] = useState([
        { id: 1, title: 'Team Meeting', date: '2024-12-26', time: '10:00 AM', type: 'meeting' },
        { id: 2, title: 'Project Deadline', date: '2024-12-28', time: '5:00 PM', type: 'deadline' },
        { id: 3, title: 'Client Call', date: '2024-12-30', time: '2:00 PM', type: 'call' },
        { id: 4, title: 'Code Review', date: '2025-01-02', time: '11:00 AM', type: 'review' },
    ]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }
        
        return days;
    };

    const formatDate = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const getEventsForDate = (dateString) => {
        return events.filter(event => event.date === dateString);
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const days = getDaysInMonth(currentDate);
    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() && 
               currentDate.getMonth() === today.getMonth() && 
               currentDate.getFullYear() === today.getFullYear();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Calendar</h2>}
        >
            <Head title="Calendar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Calendar */}
                        <div className="lg:col-span-3 bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigateMonth(-1)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={() => setCurrentDate(new Date())}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Today
                                        </button>
                                        <button
                                            onClick={() => navigateMonth(1)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {/* Day Headers */}
                                    {dayNames.map(day => (
                                        <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {day}
                                        </div>
                                    ))}
                                    
                                    {/* Calendar Days */}
                                    {days.map((day, index) => {
                                        const dateString = day ? formatDate(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                                        const dayEvents = day ? getEventsForDate(dateString) : [];
                                        
                                        return (
                                            <div
                                                key={index}
                                                className={`min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 ${
                                                    day ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-gray-50 dark:bg-gray-900'
                                                } ${isToday(day) ? 'ring-2 ring-blue-500' : ''}`}
                                            >
                                                {day && (
                                                    <>
                                                        <div className={`text-sm font-medium mb-1 ${
                                                            isToday(day) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                                                        }`}>
                                                            {day}
                                                        </div>
                                                        <div className="space-y-1">
                                                            {dayEvents.slice(0, 2).map(event => (
                                                                <div
                                                                    key={event.id}
                                                                    className={`text-xs p-1 rounded truncate ${
                                                                        event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                                        event.type === 'deadline' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                                                        event.type === 'call' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                                    }`}
                                                                >
                                                                    {event.title}
                                                                </div>
                                                            ))}
                                                            {dayEvents.length > 2 && (
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                    +{dayEvents.length - 2} more
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Add Event */}
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Add</h4>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                        + Add Event
                                    </button>
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Events</h4>
                                    <div className="space-y-3">
                                        {events.slice(0, 4).map(event => (
                                            <div key={event.id} className="flex items-start space-x-3">
                                                <div className={`w-3 h-3 rounded-full mt-1 ${
                                                    event.type === 'meeting' ? 'bg-blue-500' :
                                                    event.type === 'deadline' ? 'bg-red-500' :
                                                    event.type === 'call' ? 'bg-green-500' :
                                                    'bg-purple-500'
                                                }`}></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {event.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {event.date} at {event.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Legend */}
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Legend</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Meetings</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Deadlines</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Calls</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Reviews</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}