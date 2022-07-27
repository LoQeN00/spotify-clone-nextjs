/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mosaic.scdn.co', 'blend-playlist-covers.spotifycdn.com', 'i.scdn.co'],
  },
};

module.exports = nextConfig;
