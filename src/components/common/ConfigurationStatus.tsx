import React from 'react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

const ConfigurationStatus: React.FC = () => {
    if (isSupabaseConfigured) {
        return null; // Don't show anything if properly configured
    }

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
                <div className="flex-shrink-0">
                    <span className="text-yellow-400 text-xl">⚠️</span>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                        Demo Mode Active
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                            Supabase is not configured. The app is running in demo mode.
                            To enable full functionality, please:
                        </p>
                        <ol className="mt-2 list-decimal list-inside">
                            <li>Create a Supabase project at <a href="https://app.supabase.com/" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                            <li>Copy <code className="bg-yellow-100 px-1 rounded">.env.local.example</code> to <code className="bg-yellow-100 px-1 rounded">.env.local</code></li>
                            <li>Add your Supabase URL and API key to the .env.local file</li>
                            <li><strong>Optional:</strong> Disable email confirmation in Supabase Settings → Authentication → Settings → Email confirmation</li>
                            <li>Restart the development server</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigurationStatus;
