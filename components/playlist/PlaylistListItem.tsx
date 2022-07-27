import React from 'react';
import { PlaylistResponse } from '../../types/playlist';
import Link from 'next/link';

type Props = {
  playlist: PlaylistResponse['data']['items'][0];
};

export const PlaylistListItem = ({ playlist }: Props) => {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <a className="block">{playlist.name}</a>
    </Link>
  );
};
