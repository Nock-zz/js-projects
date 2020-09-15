module.exports = {
  entry: [
    './src/index.js',
    './src/main.css'
  ],
  mode: 'development',
  output: {
    path: __dirname,
//    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
                "/home/gnock/imba/my_webpack-app/src"],
// fix for node_modules/websocket/lib/browser.js
// manually change first line to: var _global = new Function('return this')()  ;                
        use: {
          loader: "babel-loader",
          options: {
              useStrict: false,
                    }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
