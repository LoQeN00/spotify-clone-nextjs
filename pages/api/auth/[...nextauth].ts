import NextAuth, { Session } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,streaming,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,user-read-recently-played,user-read-playback-position,user-top-read,user-follow-read,user-library-read,user-library-modify,user-read-private',
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET!,
    }),
  ],
  secret: 'supersecretkeyyoushouldnotcommittogithub',
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(props: { session: Session; token: any }) {
      if (props.token.accessToken) {
        props.session.user.accessToken = props.token.accessToken;
      }
      return props.session;
    },
  },
});
