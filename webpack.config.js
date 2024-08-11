const path = require('path');
const sharp = require('sharp');
const ResponsiveLoaderSharp = require('responsive-loader/sharp');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }]
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: ResponsiveLoaderSharp,
              name: 'images/[name]-[width].[ext]',
              sizes: [320, 640, 960, 1200, 1800, 2400],
              format: 'webp',
              quality: 80,
              placeholder: true,
              placeholderSize: 20,
              esModule: true,
              formatter: function(filename, width) {
                return filename + '?w=' + width;
              },
              formatWebp: function(filename, width) {
                return filename + '.webp?w=' + width;
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '' },
      ],
    }),
    {
      apply: function(compiler) {
        compiler.hooks.emit.tapAsync('GeneratePngJpegAssets', function(compilation, callback) {
          var assets = compilation.assets;

          Object.keys(assets).forEach(function(filename) {
            if (filename.endsWith('.webp')) {
              var pngJpegFilename = filename.replace('.webp', '');
              var sourceBuffer = assets[filename].source();

              sharp(sourceBuffer)
                .metadata()
                .then(function(metadata) {
                  var hasAlpha = metadata.hasAlpha;
                  return sharp(sourceBuffer)[hasAlpha ? 'png' : 'jpeg']().toBuffer();
                })
                .then(function(outputBuffer) {
                  compilation.assets[pngJpegFilename] = {
                    source: function() { return outputBuffer; },
                    size: function() { return outputBuffer.length; }
                  };
                })
                .catch(function(error) {
                  console.error('Error processing ' + filename + ':', error);
                });
            }
          });

          callback();
        });
      },
    },
  ],
};
