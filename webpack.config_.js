//We feed Webpack with one or more entry files and let it find and incorporate the dependencies that radiate from those entries.
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
},
//Then it outputs these files to the []].js bundle file designated in configuration:
output: {
  filename: '[name].js'
},
//This []].js output bundle is JavaScript files that contains our application source and its dependencies. We'll load it later with a <script> tag in our index.html.

//Webpack can bundle any kind of file: JavaScript, TypeScript, CSS, SASS, LESS, images, html, fonts, whatever. Webpack itself doesn't know what to do with a non-JavaScript file. We teach it to process such files into JavaScript with loaders. Here we configure loaders for TypeScript and CSS:
loaders: [
  {
    test: /\.ts$/
    loaders: 'ts'
  },
  {
    test: /\.css$/
    loaders: 'style!css' //2 loaders, Webpack applies chained loaders right to left so it applies the css loader first (to flatten CSS @import and url(...) statements) and then the style loader (to append the css inside <style> elements on the page).
  }
],

//Webpack has a build pipeline with well-defined phases. We tap into that pipeline with plugins such as the uglify minification plugin:
plugins: [
  new webpack.optimize.UglifyJsPlugin()
]

