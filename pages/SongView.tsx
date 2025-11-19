import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { processSongContent, transposeKey } from '../utils/transposer';

const SongView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSongById } = useApp();
  const song = getSongById(id || '');
  
  const [semitones, setSemitones] = useState(0);
  const [fontSize, setFontSize] = useState(18);

  const handleTranspose = (delta: number) => {
    setSemitones(prev => prev + delta);
  };

  // Process content with current transposition
  const htmlContent = useMemo(() => {
    if (!song) return '';
    return processSongContent(song.content, semitones);
  }, [song, semitones]);

  if (!song) {
    return <div className="text-white p-8">Song not found</div>;
  }

  const currentKey = transposeKey(song.originalKey, semitones);

  return (
    <div className="flex flex-col h-full bg-brand-stage text-gray-300">
      {/* Sticky Topbar */}
      <div className="bg-brand-dark/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="truncate">
              <h1 className="text-white font-bold text-lg truncate">{song.title}</h1>
              <p className="text-xs text-gray-500 font-mono truncate">Key: {currentKey} {semitones !== 0 && `(${semitones > 0 ? '+' : ''}${semitones})`}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
             {/* Font Size */}
            <div className="hidden sm:flex bg-gray-800 rounded-lg mr-2">
               <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="p-2 text-gray-400 hover:text-white">
                  <span className="text-xs font-bold">A-</span>
               </button>
               <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 text-gray-400 hover:text-white">
                  <span className="text-lg font-bold">A+</span>
               </button>
            </div>

            {/* Transpose Controls */}
            <div className="flex bg-gray-800 rounded-lg p-0.5">
              <button 
                onClick={() => handleTranspose(-1)}
                className="px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors font-bold"
              >
                -
              </button>
              <button 
                onClick={() => setSemitones(0)}
                className="px-3 py-2 text-brand-accent hover:bg-gray-700 rounded-md transition-colors font-mono text-sm min-w-[3rem]"
              >
                {semitones === 0 ? 'Orig' : (semitones > 0 ? `+${semitones}` : semitones)}
              </button>
              <button 
                onClick={() => handleTranspose(1)}
                className="px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto stage-view bg-brand-stage">
        <div className="container mx-auto px-4 py-8 pb-32 max-w-3xl">
          <div 
            className="song-content"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default SongView;