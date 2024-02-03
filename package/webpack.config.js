const path = require("path")

module.exports = {
  mode: "production",
  entry : "./src/lib.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output : {
    path: path.resolve(__dirname, "dist"),
    filename: "lib.js"
  }
}