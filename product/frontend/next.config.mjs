/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.resolve(process.cwd(), '../.env')});

const nextConfig = {
    images:{
        domains:["assets.aceternity.com"]
    },
    env: {
        API_URL:process.env.API_URL,
    }
};

export default nextConfig;
