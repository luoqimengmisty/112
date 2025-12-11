import React, { useState } from 'react';
import { Song, Sticker, INITIAL_SONGS, AppView } from './types';
import { PracticeSession } from './components/PracticeSession';
import { RepertoireManager } from './components/RepertoireManager';
import { RewardCenter } from './components/RewardCenter';
import { Timer, Music, Gift, Settings } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.PRACTICE);
  
  // Global State
  const [stars, setStars] = useState<number>(5); 
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [inventory, setInventory] = useState<Sticker[]>([]);
  
  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  const handlePracticeComplete = (earnedStars: number, duration: number, songId?: string) => {
    setStars(prev => prev + earnedStars);
    let msg = `练习完成！你获得了 ${earnedStars} 颗星星`;
    if (earnedStars > 1) msg += " (奖励加成!)";
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddSong = (song: Song) => {
    setSongs(prev => [...prev, song]);
  };

  const handleRemoveSong = (id: string) => {
    setSongs(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateWeight = (id: string, weight: number) => {
    setSongs(prev => prev.map(s => s.id === id ? { ...s, weight } : s));
  };

  const handleSpendStars = (cost: number, newSticker: Sticker) => {
    setStars(prev => prev - cost);
    setInventory(prev => [newSticker, ...prev]);
  };

  const NavButton = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button 
        onClick={() => setCurrentView(view)}
        className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 flex-1 mx-2
            ${currentView === view ? 'text-white bg-sanrio shadow-lg -translate-y-2' : 'text-gray-400 hover:text-sanrio hover:bg-pink-50'}
        `}
    >
        <Icon size={28} strokeWidth={currentView === view ? 2.5 : 2} />
        <span className="text-xs font-bold mt-1">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      {/* Top Bar (Mobile) */}
      <div className="bg-white/80 backdrop-blur-md p-4 shadow-sm flex justify-between items-center sticky top-0 z-50 rounded-b-3xl mx-2 mt-2">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sanrio-dark to-purple-500 tracking-tight">
          Violin Star 🎻
        </h1>
        <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-1.5 rounded-full border-2 border-yellow-200 shadow-sm">
          <span className="text-yellow-500 text-lg animate-spin-slow">⭐</span>
          <span className="font-black text-yellow-700 text-lg">{stars}</span>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-sanrio-dark text-white px-8 py-4 rounded-3xl shadow-2xl z-50 animate-bounce font-bold border-4 border-white">
            🎉 {notification}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-28 pt-4">
        {currentView === AppView.PRACTICE && (
            <PracticeSession songs={songs} onComplete={handlePracticeComplete} />
        )}
        {currentView === AppView.REPERTOIRE && (
            <RepertoireManager 
                songs={songs} 
                onAddSong={handleAddSong} 
                onRemoveSong={handleRemoveSong}
                onUpdateWeight={handleUpdateWeight}
            />
        )}
        {currentView === AppView.REWARDS && (
            <RewardCenter 
                stars={stars} 
                inventory={inventory} 
                onSpendStars={handleSpendStars}
            />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white shadow-xl rounded-3xl px-4 py-3 flex justify-between items-center z-50">
        <NavButton view={AppView.PRACTICE} icon={Timer} label="练琴" />
        <NavButton view={AppView.REPERTOIRE} icon={Music} label="曲目" />
        <NavButton view={AppView.REWARDS} icon={Gift} label="奖励" />
      </nav>

    </div>
  );
}