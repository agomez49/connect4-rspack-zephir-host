const rspack = require('@rspack/core')
const refreshPlugin = require('@rspack/plugin-react-refresh')
const { withZephyr } = require('zephyr-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')
require('dotenv').config()

const isDev = process.env.NODE_ENV === 'development'
const shouldAnalyze = process.env.ANALYZE === 'true'

function printCompilationMessage(status, port) {
	if (status === 'compiling') {
		console.log(`\x1b[36m[Rspack]\x1b[0m Compiling on port ${port}...`);
	} else if (status === 'success') {
		console.log(`\x1b[32m[Rspack]\x1b[0m Compiled successfully on port ${port}!`);
	} else if (status === 'failure') {
		console.log(`\x1b[31m[Rspack]\x1b[0m Compilation failed on port ${port}.`);
	}
}

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = withZephyr()({
	context: __dirname,
	entry: {
		main: './src/main.tsx',
	},

	devServer: {
		port: 8081,
		historyApiFallback: true,
		watchFiles: [path.resolve(__dirname, 'src')],
		onListening: function (devServer) {
			const port = devServer.server.address().port

			printCompilationMessage('compiling', port)

			devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
				setImmediate(() => {
					if (stats.hasErrors()) {
						printCompilationMessage('failure', port)
					} else {
						printCompilationMessage('success', port)
					}
				})
			})
		}
	},

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.svg$/,
				type: 'asset',
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: 'builtin:swc-loader',
						options: {
							jsc: {
								parser: {
									syntax: 'typescript',
									tsx: true,
								},
								transform: {
									react: {
										runtime: 'automatic',
										development: isDev,
										refresh: isDev,
									},
								},
							},
							env: {
								targets: [
									'chrome >= 87',
									'edge >= 88',
									'firefox >= 78',
									'safari >= 14',
								],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new rspack.container.ModuleFederationPlugin({
			name: 'rspack-project',
			filename: 'remoteEntry.js',
			remotes: {
				remoteToast: `remoteToast@${process.env.REMOTE_TOAST_URL}/remoteEntry.js`,
			},
			shared: {
				react: { 
					eager: true,
					singleton: true,
					requiredVersion: '^19.1.0',
				},
				'react-dom': { 
					eager: true,
					singleton: true,
					requiredVersion: '^19.1.0',
				},
				'react-dom/client': {
					eager: true,
					singleton: true,
					requiredVersion: '^19.1.0',
				}
			},
		}),
		new rspack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.REMOTE_TOAST_URL': JSON.stringify(process.env.REMOTE_TOAST_URL),
		}),
		new rspack.ProgressPlugin({}),
		new rspack.HtmlRspackPlugin({
			template: './index.html',
		}),
		isDev ? new refreshPlugin() : null,
		shouldAnalyze ? new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			reportFilename: 'bundle-analyzer-report.html'
		}) : null,
	].filter(Boolean),
	
	// Bundle optimization
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
			maxSize: 200000,
			cacheGroups: {
				// Separate vendor chunk for node_modules
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					priority: 10,
					enforce: true,
				},
				// React and React-DOM in separate chunk (shared with Module Federation)
				react: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'react-vendor',
					chunks: 'all',
					priority: 20,
					enforce: true,
				},
				// Tailwind CSS in separate chunk
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					priority: 15,
					enforce: true,
				},
				// Common components chunk
				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'all',
					priority: 5,
					reuseExistingChunk: true,
				},
			},
		},
		// Minimize in production
		minimize: !isDev,
		// Remove unused exports (tree shaking)
		usedExports: true,
		// Enable module concatenation (scope hoisting)
		concatenateModules: true,
		// Remove dead code
		sideEffects: false,
	},
	
	// Performance optimization
	performance: {
		hints: isDev ? false : 'warning',
		maxEntrypointSize: 400000, // 400KB - adjusted for Module Federation
		maxAssetSize: 200000, // 200KB per individual asset
	},
})
