/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
      return [
        {
          // matching all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    },
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '**',
        },
        {
          protocol: "https",
          hostname: "stella-ecomm-media-bucket.s3.amazonaws.com",
          pathname: "**"
        },
        {
          protocol: "https",
          hostname: "d1t84xijak9ta1.cloudfront.net",
          pathname: "**"
        }
      ],
    },
  // webpack: (config, options) => {
  //   config.infrastructureLogging = {
  //     level: 'error',
  //   };
    // return config;
  // },
}

module.exports = nextConfig