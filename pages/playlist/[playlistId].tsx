import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { PlaylistDetails } from '../../types/playlistDetails';
import Playlist from '../../components/playlist/Playlist';
import ClipLoader from 'react-spinners/ClipLoader';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useAppContext } from '../../components/context/useAppContext';

type Props = {};

const getPlaylistDetails = async (id: string) => {
  const res = await fetch(`/api/playlist/${id}`);
  const { data }: PlaylistDetails = await res.json();
  return data;
};

const PlayListDetailPage = (props: Props) => {
  const router = useRouter();
  const { playlistId } = router.query;

  const { data, isLoading, error } = useQuery(['playlistDetails', playlistId], () =>
    getPlaylistDetails(playlistId as string)
  );

  const { selectedSong } = useAppContext();

  return (
    <div className="h-screen overflow-y-scroll flex-1">
      <Head>
        <title>{data?.playlistName}</title>
      </Head>
      {isLoading && <ClipLoader size={150} />}
      {data && <Playlist data={data} />}
    </div>
  );
};

export default PlayListDetailPage;

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
