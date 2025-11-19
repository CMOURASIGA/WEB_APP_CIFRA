import React, { createContext, useContext, useState, useEffect } from 'react';
import { Song, Setlist, AppSettings } from '../types';
import { MOCK_SONGS, MOCK_SETLISTS, DEFAULT_CATEGORIES } from '../constants';

interface AppContextType {
  songs: Song[];
  setlists: Setlist[];
  settings: AppSettings;
  addSetlist: (setlist: Setlist) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  getSongById: (id: string) => Song | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from local storage or defaults
  const [songs] = useState<Song[]>(() => {
    const stored = localStorage.getItem('cf_songs');
    return stored ? JSON.parse(stored) : MOCK_SONGS;
  });

  const [setlists, setSetlists] = useState<Setlist[]>(() => {
    const stored = localStorage.getItem('cf_setlists');
    return stored ? JSON.parse(stored) : MOCK_SETLISTS;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem('cf_settings');
    return stored ? JSON.parse(stored) : { driveFolder: 'My Drive/Cifras', categories: DEFAULT_CATEGORIES };
  });

  // Persist Setlists
  useEffect(() => {
    localStorage.setItem('cf_setlists', JSON.stringify(setlists));
  }, [setlists]);

  // Persist Settings
  useEffect(() => {
    localStorage.setItem('cf_settings', JSON.stringify(settings));
  }, [settings]);

  const addSetlist = (setlist: Setlist) => {
    setSetlists(prev => [setlist, ...prev]);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const getSongById = (id: string) => songs.find(s => s.id === id);

  return (
    <AppContext.Provider value={{ songs, setlists, settings, addSetlist, updateSettings, getSongById }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};