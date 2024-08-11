{
  "name": "preact-hello-world-responsive-images",
  "version": "1.0.0",
  "description": "A simple Preact Hello World app with responsive images",
  "main": "src/app.js",
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "start": "serve dist"
  },
  "keywords": [
    "preact",
    "responsive-images",
    "webpack",
    "vercel"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "preact": "^10.5.15",
    "serve": "^14.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.15.0",
    "@babel/plugin-transform-react-jsx": "^7.14.9",
    "@babel/preset-env": "^7.15.0",
    "@babel/preset-react": "^7.14.5",
    "babel-loader": "^8.2.2",
    "copy-webpack-plugin": "^9.0.1",
    "html-webpack-plugin": "^5.3.2",
    "responsive-loader": "^2.3.0",
    "sharp": "^0.29.0",
    "webpack": "^5.50.0",
    "webpack-cli": "^4.8.0",
    "webpack-dev-server": "^4.0.0"
  }
}
