/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "raw.githubusercontent.com",
            port: "",
          },
        ]
    }
};

export default nextConfig;
