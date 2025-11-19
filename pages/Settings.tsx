import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const [driveFolder, setDriveFolder] = useState(settings.driveFolder);
  const [newCategory, setNewCategory] = useState('');

  const handleSaveDrive = () => {
    updateSettings({ driveFolder });
    alert('Settings saved!');
  };

  const handleAddCategory = () => {
    if (newCategory && !settings.categories.includes(newCategory)) {
        updateSettings({ categories: [...settings.categories, newCategory] });
        setNewCategory('');
    }
  };

  const removeCategory = (cat: string) => {
    updateSettings({ categories: settings.categories.filter(c => c !== cat) });
  };

  return (
    <div className="py-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Integration (Mock)</h2>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Drive Folder</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={driveFolder}
                        onChange={(e) => setDriveFolder(e.target.value)}
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none"
                    />
                    <button 
                        onClick={handleSaveDrive}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
                    >
                        Save
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">This is where the app looks for .txt or .pro files.</p>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="flex gap-2 mb-4">
            <input 
                type="text" 
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Add new category..."
                className="flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none"
            />
            <button 
                onClick={handleAddCategory}
                className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Add
            </button>
        </div>

        <div className="flex flex-wrap gap-2">
            {settings.categories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {cat}
                    <button onClick={() => removeCategory(cat)} className="text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;