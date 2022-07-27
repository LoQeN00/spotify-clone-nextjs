import React, { useContext } from 'react';
import { AppContext } from './AppContext';

type Props = {};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within a AppContextProvider');
  return context;
};
