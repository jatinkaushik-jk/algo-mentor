/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        MONGO_URI: process.env.MONGO_URI,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                // port: '',
                // pathname: '/dashboard/**',
            },
        ],
    },
};

export default nextConfig;
