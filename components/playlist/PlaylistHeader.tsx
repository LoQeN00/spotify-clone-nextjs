import React from 'react';
import Image from 'next/image';

type Props = {
  playlistName: string;
  playlistImage: string;
};

export const PlaylistHeader = ({ playlistName, playlistImage }: Props) => {
  return (
    <div className="text-white mb-16 flex w-full  items-center space-x-6">
      <div className="w-[200px]">
        <Image layout="responsive" width={4} height={4} alt={playlistName} src={playlistImage} />
      </div>
      <h2 className="text-4xl font-bold">{playlistName}</h2>
    </div>
  );
};
