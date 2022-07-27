import React from 'react';
import { PlaylistDetails } from '../../types/playlistDetails';
import { PlaylistHeader } from './PlaylistHeader';
import { Track } from './Track';

type Props = {
  data: PlaylistDetails['data'];
};

const Playlist = ({ data }: Props) => {
  console.log(data);
  return (
    <div className="p-8 pb-24">
      <PlaylistHeader playlistName={data.playlistName} />
      <div className="space-y-8">
        {data?.items.map((item, index) => {
          return <Track key={item.track.id} track={item.track} idx={index + 1} />;
        })}
      </div>
    </div>
  );
};

export default Playlist;
