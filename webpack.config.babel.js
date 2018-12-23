import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const env = process.env.NODE_ENV || 'development';

export default {
	entry: {
		global: path.resolve(__dirname, './src/scss/global.scss'),
	},

	module: {
		rules: [
		{
			test: /\.scss$/,
			include: path.resolve(__dirname, './src/scss'),
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						minimize: (env === 'production'),
					},
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						plugins: function() {
							return [autoprefixer];
						},
					},
				},
				{
					loader: 'resolve-url-loader',
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
						includePaths: ['./src/scss'],
					},
				},
			],
		}],
	},

	plugins: [
		// Sets the environment, so plugins can adjust to the correct environment
		// Default value is 'development'
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(env),
			},
		}),

		// Converts [name].js to an actual css file, [name].css
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),

		// Clears out the dist directory before each build
		new CleanWebpackPlugin(['dist'])
	],
	stats: {
		colors: true,
	},
};