import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Library: React.FC = () => {
  const { songs } = useApp();
  const [search, setSearch] = useState('');

  const filteredSongs = songs.filter(
    s => s.title.toLowerCase().includes(search.toLowerCase()) || 
         s.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-6 space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by title or artist..."
          className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </div>
      </div>

      <div className="space-y-3">
        {filteredSongs.map(song => (
          <Link 
            to={`/song/${song.id}`} 
            key={song.id}
            className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-primary transition-colors">{song.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-500">{song.artist}</p>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{song.category}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono bg-brand-primary/10 text-brand-primary px-2 py-1 rounded">Key: {song.originalKey}</span>
              </div>
            </div>
          </Link>
        ))}
        
        {filteredSongs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
                No songs found.
            </div>
        )}
      </div>
    </div>
  );
};

export default Library;