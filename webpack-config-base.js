'use strict';
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
var loadersByExtension = require("./loaders/loadersByExtension");
var joinEntry = require("./loaders/joinEntry");
var _ = require('lodash');

module.exports = function(options) {
  var entry = {
    app: reactEntry("AppMain"),
    // second: reactEntry("Second")
  };
  var loaders = {
    "coffee": "coffee-loader",
    "jsx": "babel-loader?experimental",
    "json": "json-loader",
    "json5": "json5-loader",
    "txt": "raw-loader",
    "png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
    "woff|woff2": "url-loader?limit=100000",
    "ttf|eot": "file-loader",
    "wav|mp3": "file-loader",
    "html": "html-loader",
    "jade": "jade-loader",
    "md|markdown": ["html-loader", "markdown-loader"],
  };
  if (options.hotComponents) {
    loaders.jsx = "react-hot-loader!" + loaders.jsx;
  }
  var stylesheetLoaders = {
    "css": "css-loader",
    "less": "css-loader!less-loader",
    "styl": "css-loader!stylus-loader",
    "sass|scss": "css-loader!sass-loader",
  };
  // These are not parsed by loadersByExtension
  var additionalLoaders = [
    // { test: /lodash-node/, loader: path.resolve("./loaders/replaceLodashNode") },
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?experimental'},
    { test: /identicon/, loader: "imports?PNGlib=pnglib!exports?Identicon" },
    { test: /pnglib/, loader: "exports?window.PNGlib" }
  ];

  var assets = path.join(__dirname, 'ui', 'assets', 'js');
  var browserAlias = {
  };

  var globalAlias = {
    'identicon': path.join(assets, 'identicon.js'),
    'pnglib': path.join(assets, 'pnglib.js')
  };
  var aliasLoader = {

  };
  // Libraries the server can stub, they're never run
  var serverExternals = [
    'bootstrap',
    // These remove all deep includes as well
    /^react(\/.*)?$/, /^fluxxor(\/.*)?$/
  ];
  var browserExternals = [

  ];
  // Server + Browser externals (what would this be?)
  var externals = [

  ];
  // Speed boost, see https://webpack.github.io/docs/configuration.html#module-noparse
  var noParse = [
    // Must be regexes
    /moment/, /primus/
  ];
  var modulesDirectories = ["node_modules", "."];
  var extensions = ["", ".web.js", ".js", ".jsx"];
  var root = path.join(__dirname);
  var output = {
    path: path.join(__dirname, "ui", "build", options.prerender ? "prerender" : "public"),
    publicPath: "/",
    filename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    // chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    sourceMapFilename: "debugging_webpack/[file].map",
    libraryTarget: options.prerender ? "commonjs2" : undefined,
    pathinfo: options.debug,
  };

  // Set environment. Should be local for devserver, deteremined by env otherwise.
  var env = options.devServer ? 'local' : (process.env.NODE_ENV || 'production');
  var plugins = [
    function() {
      if(!options.prerender && !options.minimize) {
        // Writes stats file on build.
        this.plugin("done", function(stats) {
          require("fs").writeFileSync(path.join(__dirname, "ui", "build", "stats.json"), JSON.stringify(stats.toJson({
            chunkModules: true,
            exclude: [
              /node_modules[\\\/]react/
            ]
          })));
        });
      }
    },
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/addons"),
    new webpack.PrefetchPlugin("fluxxor"),
    new webpack.PrefetchPlugin("bluebird"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    // Removes all moment locales except 'en'
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
  ];

  // Vendor modules.
  // We list them here for:
  // 1. Exclusion from prerender module (they load fine in Node and this saves compilation time)
  // 2. Inclusion in a commons chunk (updates less often, smaller downloads)
  var vendorModules = [
    'react', 'fluxxor', 'moment', 'request', 'lodash', 'react-router-component', 'react-draggable', 'primus',
    'debug', 'bluebird'
  ];

  // When prerendering, disable react-proxy and chunking, and don't bundle react/fluxxor since we have these.
  if(options.prerender) {
    aliasLoader["react-proxy$"] = "react-proxy/unavailable";
    externals = externals.concat(vendorModules);
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  }

  // Add chunks here - used only in web builds.
  // We don't use commons chunks,
  if(options.chunks) {
    entry.commons = [].concat(vendorModules);
    plugins.push(new webpack.optimize.CommonsChunkPlugin(
      "commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""), ['app']));
  }

  // TODO if we define multiple entry points here, pass view name as querystring
  // Not really possible today with our structure
  function reactEntry(name) {
    return options.prerender ? "./ui/server-prerender" : "./ui/browser";
  }

  if(options.devServer) {
    if(options.hot) {
      entry = joinEntry("webpack/hot/dev-server", entry);
    }

    // Webpack needs to know where to get the content from. Normally, we serve from the server at 
    // lib/devServer.js (see run-dev.sh). Otherwise use what's in the config, for a bare webpack-dev-server run.
    var contentPort = process.env.CONTENT_PORT || options.devContentPort;
    var serverPort = process.env.PORT || options.devServerPort;

    // This adds the dev server client to the bundle.
    entry = joinEntry("webpack-dev-server/client?http://localhost:" + serverPort, entry);
    // Set publicPath so the dev server knows where to get updates.
    output.publicPath = "http://localhost:" + serverPort + "/";
  }
  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var loaders = stylesheetLoaders[ext];
    if(Array.isArray(loaders)) {
      loaders = loaders.join("!");
    }
    if(options.prerender) {
      stylesheetLoaders[ext] = "null-loader";
    } else if(options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", loaders);
    } else {
      stylesheetLoaders[ext] = "style-loader!" + loaders;
    }
  });
  if(options.separateStylesheet && !options.prerender) {
    plugins.push(new ExtractTextPlugin("[name].css"));
  }
  if(options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    );
  }

  return {
    entry: entry,
    output: output,
    target: options.prerender ? "node" : "web",
    module: {
      // speed
      noParse: noParse,
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, "node_modules"),
      alias: aliasLoader
    },
    externals: (options.prerender ? serverExternals : browserExternals).concat(externals),
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: options.prerender ? globalAlias : _.extend(browserAlias, globalAlias)
    },
    plugins: plugins
  };
};
