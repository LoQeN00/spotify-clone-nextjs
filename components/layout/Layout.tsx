import React from 'react';
import { Navigation } from '../navigation/Navigation';
import { Player } from '../player/Player';

type Props = {
  readonly children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex relative">
      <Navigation />
      {children}

      <Player />
    </div>
  );
};
