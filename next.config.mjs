/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [5, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
