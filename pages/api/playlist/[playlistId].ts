import { getPlaylistDetails } from '../../../lib/spotify';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: 'Not logged in' });

  const playlistId = req.query.playlistId as string;

  const data = await getPlaylistDetails(session.user.accessToken, playlistId);

  return res.status(200).json({ data });
}
