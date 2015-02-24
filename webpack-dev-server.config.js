module.exports = require("./webpack-config-base")({
	devServer: true,
  devContentPort: 8001,
  devServerPort: 8002,
	devtool: "#inline-source-map",
	debug: true,
});
