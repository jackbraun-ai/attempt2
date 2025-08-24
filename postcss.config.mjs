const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Only add prefixes for modern browsers
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'not ie 11'
      ]
    }
  },
};

export default config;
