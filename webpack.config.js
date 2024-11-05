const path = require('path');
const webpack = require('webpack');
const BrowserFS = require('browserfs');

// Initialize BrowserFS with a custom file system
BrowserFS.configure({
  fs: 'MountableFileSystem',
  options: {},
}, (err) => {
  if (err) throw err;
  
  // Create an in-memory file system to mock 'fs'
  const bfs = BrowserFS.BFSRequire('fs');
  
  // Export the custom file system
  module.exports = {
    // Other webpack configurations
    
    // Resolve 'fs' to the in-memory file system
    resolve: {
      alias: {
        fs: path.resolve(__dirname, './fakeFs.js')
      }
      fallback: {
        "stream": require.resolve("stream-browserify")
      }
    },
   
      
    plugins: [
      new webpack.ProvidePlugin({
        fs: 'fs'
      })
    ]
  };
});
