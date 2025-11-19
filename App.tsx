import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import Home from './pages/Home';
import Library from './pages/Library';
import SongView from './pages/SongView';
import Setlists from './pages/Setlists';
import NewSetlist from './pages/NewSetlist';
import RunSetlist from './pages/RunSetlist';
import Settings from './pages/Settings';

// Components
import Header from './components/Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide standard header for immersive performance views
  const isImmersive = location.pathname.includes('/song/') || (location.pathname.includes('/lists/') && !location.pathname.endsWith('/new') && location.pathname !== '/lists');

  return (
    <div className="flex flex-col min-h-screen">
      {!isImmersive && <Header />}
      <main className={`flex-grow ${isImmersive ? 'h-screen overflow-hidden' : 'container mx-auto px-4 py-6 max-w-3xl'}`}>
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/song/:id" element={<SongView />} />
            <Route path="/lists" element={<Setlists />} />
            <Route path="/lists/new" element={<NewSetlist />} />
            <Route path="/lists/:id" element={<RunSetlist />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;