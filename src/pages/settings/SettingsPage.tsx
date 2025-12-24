

import { Link } from 'react-router-dom';

const SettingsPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/settings/languages" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                    <h2 className="text-lg font-semibold text-cyan-700">Language & Date</h2>
                    <p className="text-gray-500 mt-2">Configure date formats and localization settings.</p>
                </Link>
                <Link to="/settings/permissions" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                    <h2 className="text-lg font-semibold text-cyan-700">Permissions</h2>
                    <p className="text-gray-500 mt-2">Manage roles and permissions.</p>
                </Link>
                {/* Add more settings links as needed */}
            </div>
        </div>
    );
};

export default SettingsPage;
