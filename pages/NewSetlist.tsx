import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Song } from '../types';

const NewSetlist: React.FC = () => {
  const navigate = useNavigate();
  const { songs, addSetlist } = useApp();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSongIds, setSelectedSongIds] = useState<string[]>([]);
  const [filter, setFilter] = useState('');

  const toggleSong = (id: string) => {
    setSelectedSongIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!name.trim() || selectedSongIds.length === 0) return;

    addSetlist({
      id: Date.now().toString(),
      name,
      description,
      songIds: selectedSongIds,
      createdAt: Date.now()
    });

    navigate('/lists');
  };

  const filteredSongs = songs.filter(s => 
    s.title.toLowerCase().includes(filter.toLowerCase()) ||
    s.artist.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="py-6 space-y-8 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">New Setlist</h1>
        <p className="text-gray-500 text-sm">Create a list for your next gig.</p>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Sunday Service"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-primary outline-none"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Optional details..."
            />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Songs ({selectedSongIds.length})</h2>
        <input 
            type="text" 
            placeholder="Filter songs..." 
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-200 text-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
        />
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredSongs.map(song => (
                <div 
                    key={song.id}
                    onClick={() => toggleSong(song.id)}
                    className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                        selectedSongIds.includes(song.id) 
                        ? 'bg-brand-primary/5 border-brand-primary' 
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                    }`}
                >
                    <div>
                        <div className="font-medium text-gray-800">{song.title}</div>
                        <div className="text-xs text-gray-500">{song.artist}</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        selectedSongIds.includes(song.id) 
                        ? 'bg-brand-primary border-brand-primary text-white' 
                        : 'border-gray-300'
                    }`}>
                        {selectedSongIds.includes(song.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-center z-20">
          <button 
            onClick={handleSave}
            disabled={!name || selectedSongIds.length === 0}
            className="w-full max-w-md bg-brand-primary text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Create List
          </button>
      </div>
    </div>
  );
};

export default NewSetlist;