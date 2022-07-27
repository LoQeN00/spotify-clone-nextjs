import React, { createContext, useState, useEffect } from 'react';

interface AppState {
  readonly selectedSong: string | null;
  readonly selectSong: (songId: string) => void;
}

export const AppContext = createContext<AppState | null>(null);

type AppContextProviderProps = {
  readonly children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const selectSong = (songId: string) => {
    setSelectedSong(songId);
  };

  const value = {
    selectedSong,
    selectSong,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
