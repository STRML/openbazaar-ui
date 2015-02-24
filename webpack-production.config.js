module.exports = [
	require("./webpack-config-base")({
		chunks: true,
		longTermCaching: true,
		separateStylesheet: true,
		minimize: true,
		devtool: "source-map"
	})
];
