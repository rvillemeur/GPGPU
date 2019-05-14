const fs = require('fs')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  devServer: {
    https: {
      key: fs.readFileSync('C://devzone//ssl//server.key'),
      cert: fs.readFileSync('C://devzone//ssl//server.crt'),
      ca: fs.readFileSync('C://devzone//ssl//server.pem')
    },
    index: 'Clock.html',
    port: 8081
  }
}
