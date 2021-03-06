const path = require('path');
const crypto = require('crypto');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@pieh/friendly-errors-webpack-plugin');

module.exports = (env, argv) => {
	const {mode} = argv;

	return {
		entry: ['react-hot-loader/patch', './src/index.js'],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: mode === 'production' ? '[name].[chunkhash].js' : '[name].js',
			chunkFilename: mode === 'production' ? '[name].[chunkhash].chunk.js' : '[name].chunk.js'
		},
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom'
			}
		},
		optimization: {
			minimize: mode !== 'development',
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							ecma: 5,
							warnings: false,
							comparisons: false,
							inline: 2
						},
						parse: {
							ecma: 8
						},
						mangle: {safari10: true},
						output: {
							ecma: 5,
							safari10: true,
							comments: false,
							/* eslint-disable-next-line camelcase */
							ascii_only: true
						}
					},
					parallel: true,
					sourceMap: false,
					cache: true
				})
			],
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					default: false,
					vendors: false,
					framework: {
						chunks: 'all',
						name: 'framework',
						// This regex ignores nested copies of framework libraries so they're
						// bundled with their issuer.
						// https://github.com/zeit/next.js/pull/9012
						test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
						priority: 40,
						// Don't let webpack eliminate this chunk (prevents this chunk from
						// becoming a part of the commons chunk)
						enforce: true
					},
					lib: {
						test(module) {
							return (
								module.size() > 160000 &&
						/node_modules[/\\]/.test(module.identifier())
							);
						},
						priority: 30,
						minChunks: 1,
						reuseExistingChunk: true
					},
					commons: {
						name: 'commons',
						minChunks: 2,
						priority: 20
					},
					shared: {
						name(module, chunks) {
							return crypto
								.createHash('sha1')
								.update(
									chunks.reduce(
										(acc, chunk) => {
											return acc + chunk.name;
										},
										''
									)
								)
								.digest('hex');
						},
						priority: 10,
						minChunks: 2,
						reuseExistingChunk: true
					}
				},
				maxInitialRequests: 25,
				minSize: 20000
			}
		},
		devServer: {
			compress: true,
			quiet: true,
			hot: true
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: 'babel-loader?cacheDirectory=true'
				},
				{
					test: /\.css$/,
					use: [
						ExtractCssChunks.loader,
						'css-loader',
						'clean-css-loader'
					]
				},
				{
					test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
					use: [
						'file-loader?outputPath=public',
						{
							loader: 'img-loader',
							options: {
								plugins: mode === 'production' && [
									require('imagemin-mozjpeg')({
										progressive: true
									}),
									require('imagemin-pngquant')({
										floyd: 0.5,
										speed: 5
									}),
									require('imagemin-webp'),
									require('imagemin-svgo')
								]
							}
						}
					]
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					use: [
						'file-loader'
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
				favicon: './public/favicon.png',
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					removeScriptTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true
				}
			}),
			new ExtractCssChunks(
				{
					filename: '[name].css',
					chunkFilename: '[id].css',
					hot: true
				}
			),
			new ScriptExtHtmlWebpackPlugin({
				prefetch: [/\.js$/],
				defaultAttribute: 'async'
			}),
			/* eslint-disable camelcase */
			new WebpackPwaManifest({
				name: 'Hello World',
				short_name: 'Hello World',
				description: 'Styled React Boilerplate Demo',
				theme_color: '#212121',
				background_color: '#212121',
				icons: [
					{
						src: path.resolve('public/favicon.png'),
						sizes: [36, 48, 72, 96, 144, 192, 512],
						ios: true
					}
				]
			}),
			/* eslint-enable camelcase */
			new GenerateSW({
				swDest: 'sw.js',
				importWorkboxFrom: 'local',
				clientsClaim: true,
				skipWaiting: true
			}),
			new HardSourceWebpackPlugin(),
			new FriendlyErrorsWebpackPlugin()
		]
	};
};
