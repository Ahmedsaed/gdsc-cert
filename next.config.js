module.exports = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/ahmed',
        destination: '/admin.html',
      },
      {
        source: '/preview',
        destination: '/admin.html',
      },
      {
        source: '/validate/:path*',
        destination: '/validate.html',
      },
    ];
  }
};
