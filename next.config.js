/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abitus-api.geia.vip", // Seu hostname existente
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3dev.pjc.mt.gov.br", // Novo hostname adicionado
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
};

module.exports = nextConfig;
