module.exports = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/validate/:path*',
        destination: '/validate.html',
      },
    ];
  }
};
