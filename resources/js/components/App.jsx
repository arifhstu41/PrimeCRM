import React from 'react';

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    PrimeCRM
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to PrimeCRM</h2>
                    <p className="text-gray-600">
                        Your Laravel + React application is ready! This is a React component 
                        running inside a Laravel application with Vite for fast development.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;