import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { getAccessToken } from '../../lib/spotify';
import { useSession } from 'next-auth/react';
import { useAppContext } from '../context/useAppContext';

type Props = {};

export const Player = (props: Props) => {
  const { data: session } = useSession();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { selectedSong } = useAppContext();

  useEffect(() => {
    const main = async () => {
      const { access_token } = await getAccessToken(session?.user.accessToken!);
      setAccessToken(access_token);
    };
    main();
  }, [session]);

  const check = (state: any) => {};

  console.log(selectedSong);

  return session ? (
    <div className="w-full bg-gray-900 text-white absolute bottom-0 p-4">
      {accessToken && (
        <SpotifyPlayer
          callback={check}
          play={selectedSong ? true : false}
          token={accessToken}
          uris={selectedSong ? [selectedSong] : []}
        />
      )}
    </div>
  ) : null;
};
