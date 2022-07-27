import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { PlaylistResponse } from '../../types/playlist';
import { useQuery } from '@tanstack/react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { PlaylistListItem } from '../playlist/PlaylistListItem';

type Props = {};

const getMyPlaylists = async () => {
  const res = await fetch('/api/playlists');
  const { data }: PlaylistResponse = await res.json();
  return data;
};

export const Navigation = (props: Props) => {
  const { data: session } = useSession();

  const { data, isLoading, error } = useQuery(['playlists'], getMyPlaylists);
  return session ? (
    <div className="text-white p-8 bg-[#000000] h-screen">
      Signed in as {session?.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <hr />
      {isLoading && (
        <div>
          <ClipLoader size={150} />
          <h2 className="text-3xl font-bold">Loading...</h2>
        </div>
      )}
      <div className="space-y-2 my-5">
        {data &&
          data.items.map((item) => {
            return <PlaylistListItem key={item.id} playlist={item} />;
          })}
      </div>
    </div>
  ) : null;
};
