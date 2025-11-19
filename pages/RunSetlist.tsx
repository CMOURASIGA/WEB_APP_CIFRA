import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { processSongContent, transposeKey } from '../utils/transposer';

const RunSetlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setlists, getSongById } = useApp();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [semitones, setSemitones] = useState(0);
  const [fontSize, setFontSize] = useState(20);

  const setlist = setlists.find(l => l.id === id);
  const currentSongId = setlist?.songIds[currentIndex];
  const song = getSongById(currentSongId || '');

  // Reset transposition when song changes
  useEffect(() => {
    setSemitones(0);
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const htmlContent = useMemo(() => {
    if (!song) return '';
    return processSongContent(song.content, semitones);
  }, [song, semitones]);

  if (!setlist || !song) {
    return <div className="bg-brand-stage h-screen text-white p-8">List not found or empty.</div>;
  }

  const handleNext = () => {
    if (currentIndex < setlist.songIds.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
        // Finished
        navigate('/lists');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentKey = transposeKey(song.originalKey, semitones);

  return (
    <div className="flex flex-col h-full bg-brand-stage text-gray-300">
      {/* Top Info Bar */}
      <div className="bg-brand-dark/90 backdrop-blur border-b border-gray-800 sticky top-0 z-50 px-4 py-2 flex justify-between items-center shadow-lg">
        <div className="flex flex-col">
             <span className="text-xs text-gray-500 uppercase tracking-wider">{setlist.name} • {currentIndex + 1}/{setlist.songIds.length}</span>
             <h2 className="text-white font-bold truncate max-w-[200px]">{song.title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="bg-gray-800 px-3 py-1 rounded text-sm font-mono text-brand-accent">
               {currentKey}
            </div>
            <div className="flex bg-gray-800 rounded-lg p-0.5">
              <button onClick={() => setSemitones(s => s - 1)} className="px-2 text-gray-400 hover:text-white">-</button>
              <button onClick={() => setSemitones(s => s + 1)} className="px-2 text-gray-400 hover:text-white">+</button>
            </div>
            <button onClick={() => navigate('/lists')} className="text-gray-500 hover:text-white ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
      </div>

      {/* Song Content */}
      <div className="flex-grow overflow-y-auto stage-view relative">
        <div className="container mx-auto px-4 py-6 pb-24 max-w-3xl">
             <div 
                className="song-content"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
      </div>

      {/* Bottom Navigation Control */}
      <div className="bg-brand-dark border-t border-gray-800 p-4 flex items-center justify-between sticky bottom-0 z-50">
         <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                currentIndex === 0 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
         >
            Prev
         </button>

         <div className="flex items-center gap-4">
            <button onClick={() => setFontSize(s => Math.max(12, s-2))} className="text-gray-500 text-xs font-bold border border-gray-700 rounded px-2 py-1">A-</button>
            <button onClick={() => setFontSize(s => Math.min(36, s+2))} className="text-gray-500 text-lg font-bold border border-gray-700 rounded px-2 py-1">A+</button>
         </div>

         <button 
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-brand-primary text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20"
         >
            {currentIndex === setlist.songIds.length - 1 ? 'Finish' : 'Next'}
         </button>
      </div>
    </div>
  );
};

export default RunSetlist;