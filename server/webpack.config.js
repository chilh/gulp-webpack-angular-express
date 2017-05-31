module.exports = {
  entry: __dirname + '/index.ts',
  output: {
    filename: 'server.js',
    path: __dirname + "/../dist/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  }
};
