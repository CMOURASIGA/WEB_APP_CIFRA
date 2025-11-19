import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';

const Setlists: React.FC = () => {
  const { setlists } = useApp();

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Lists</h1>
        <Link 
          to="/lists/new"
          className="bg-brand-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          New List
        </Link>
      </div>

      <div className="grid gap-4">
        {setlists.map(list => (
          <Card key={list.id} title={list.name} subtitle={list.description} className="border-l-4 border-l-brand-primary">
             <div className="mt-4 flex justify-between items-end">
                <div className="text-sm text-gray-500">
                    {list.songIds.length} songs
                </div>
                <Link 
                    to={`/lists/${list.id}`} 
                    className="text-brand-primary font-medium hover:text-blue-700 flex items-center gap-1"
                >
                    Open 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                </Link>
             </div>
          </Card>
        ))}

        {setlists.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                No setlists created yet.
            </div>
        )}
      </div>
    </div>
  );
};

export default Setlists;