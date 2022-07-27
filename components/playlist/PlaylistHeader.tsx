import React from 'react';

type Props = {
  playlistName: string;
};

export const PlaylistHeader = ({ playlistName }: Props) => {
  return (
    <div className="text-white mb-8">
      <h1 className="text-3xl">{playlistName}</h1>
    </div>
  );
};
