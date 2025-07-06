/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Para otimização de produção
    outputFileTracingRoot: undefined,
  },
};

export default nextConfig;
