/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true, // <--- This forces Next.js to ignore strict build optimization rules
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "img.freepik.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "flaticon.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "static.vecteezy.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "image.pngaaa.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "www.pngarts.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "www.bwillcreative.com",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "chart.googleapis.com",
                pathname: "/**"
            }
        ]
        // NOTE: The 'domains' array was removed because it is deprecated and conflicts with remotePatterns.
    },
};

export default nextConfig;