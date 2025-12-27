import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, languages, userPermissions } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    console.log('User permissions:', userPermissions);

    const hasPermission = (permission) => {
        const result = userPermissions?.includes(permission) || false;
        console.log(`Permission ${permission}:`, result);
        return result;
    };

    const switchLanguage = (languageCode) => {
        router.post('/switch-language', { language: languageCode });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 lg:flex lg:flex-col`}>
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                    <Link href="/">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </Link>
                </div>
                
                <nav className="flex-1 mt-8 px-4">
                    <div className="space-y-2 flex flex-col">
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full"
                        >
                            📊 Dashboard
                        </NavLink>
                        
                        {hasPermission('users.view') && (
                            <NavLink
                                href={route('admin.users.index')}
                                active={route().current('admin.users.*')}
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full"
                            >
                                👥 Users
                            </NavLink>
                        )}
                        
                        {/* Settings Dropdown - only show if user has any settings permissions */}
                        {(hasPermission('roles.view') || hasPermission('languages.view') || hasPermission('translations.view')) && (
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg w-full text-gray-700 hover:bg-gray-100">
                                            ⚙️ Settings
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        {hasPermission('roles.view') && (
                                            <Dropdown.Link href={route('admin.roles.index')}>🔐 Roles</Dropdown.Link>
                                        )}
                                        {hasPermission('languages.view') && (
                                            <Dropdown.Link href={route('admin.languages.index')}>🌐 Languages</Dropdown.Link>
                                        )}
                                        {hasPermission('translations.view') && (
                                            <Dropdown.Link href={route('admin.translations.index')}>🔤 Translations</Dropdown.Link>
                                        )}
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Dropdown.Link href={route('admin.settings.index')}>⚙️ General Settings</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        )}
                        
                        <NavLink
                            href={route('admin.charts')}
                            active={route().current('admin.charts')}
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full"
                        >
                            📈 Analytics
                        </NavLink>
                        <NavLink
                            href={route('admin.forms')}
                            active={route().current('admin.forms')}
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full"
                        >
                            📝 Forms
                        </NavLink>
                        <NavLink
                            href={route('admin.calendar')}
                            active={route().current('admin.calendar')}
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full"
                        >
                            📅 Calendar
                        </NavLink>
                    </div>
                </nav>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top header */}
                <header className="bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Language Selector */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                                            🌐 {user.language?.name || 'EN'}
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        {languages?.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => switchLanguage(lang.code)}
                                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                                    user.language_code === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                                }`}
                                            >
                                                {lang.flag} {lang.name}
                                            </button>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown>
                                
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-gray-500 dark:text-gray-400 transition duration-150 ease-in-out hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page header */}
                {header && (
                    <div className="bg-white dark:bg-gray-800 shadow">
                        <div className="px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}