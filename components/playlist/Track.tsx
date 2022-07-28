import React from 'react';
import { PlaylistDetails } from '../../types/playlistDetails';
import Image from 'next/image';
import { useAppContext } from '../context/useAppContext';
import { millisToMinutesAndSeconds } from '../../lib/helpers';

type Props = {
  track: PlaylistDetails['data']['items'][0]['track'];
  idx: number;
};

export const Track = ({ track, idx }: Props) => {
  const { selectSong, selectedSong } = useAppContext();

  return (
    <div
      className="flex justify-between space-x-4 transition-all hover:bg-gray-500 cursor-pointer rounded-lg p-4"
      onClick={() => selectSong(track.uri)}
    >
      <div className="text-white flex items-center relative  ease-in-out   w-[40%]">
        <p className="absolute">{idx}</p>
        <div className="w-[50px] ml-7">
          {track.album.images.length > 0 ? (
            <Image
              layout="responsive"
              objectFit="contain"
              width={4}
              height={4}
              src={track.album.images[2] ? track.album.images[2].url : track.album.images[1].url}
              alt={track.name}
            />
          ) : (
            <div className="w-[50px] h-[50px] bg-gray-500"></div>
          )}
        </div>
        <div className="ml-5">
          {track.name ? (
            <>
              <p className="font-bold">{track.artists[0].name}</p>
              <p>{track.name}</p>
            </>
          ) : (
            <p>Somthing went wrong ...</p>
          )}
        </div>
      </div>
      <div className="text-white flex-[30%]  font-bold flex items-center">
        <p>{track.album.name}</p>
      </div>
      <div className="text-white font-bold flex items-center">
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};
