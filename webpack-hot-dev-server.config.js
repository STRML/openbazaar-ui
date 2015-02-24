module.exports = require("./webpack-config-base")({
	hot: true,
	devServer: true,
  devContentPort: 8001,
  devServerPort: 8002,
	hotComponents: true,
	devtool: "#inline-source-map",
	debug: true
});
