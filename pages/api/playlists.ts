import { getUsersPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: 'Not logged in' });

  const response = await getUsersPlaylists(session.user.accessToken);
  const data = await response.json();

  return res.status(200).json({ data });
}
