const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT =
  'https://accounts.spotify.com/api/token?scope=user-read-email,playlist-read-private,streaming,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,user-read-recently-played,user-read-playback-position,user-top-read,user-follow-read,user-library-read,user-library-modify,user-read-private';
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
import { PlaylistName } from '../types/playlistName';

export const getAccessToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getPlaylistDetails = async (refresh_token: string, playlistId: string) => {
  const { access_token } = await getAccessToken(refresh_token);

  const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const tracksData = await tracksResponse.json();

  const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const playlistData = await playlistResponse.json();

  const data = {
    ...tracksData,
    playlistName: playlistData.name,
    playlistImage: playlistData.images[0].url,
  };

  return data;
};
