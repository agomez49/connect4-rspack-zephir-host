const rspack = require('@rspack/core')
const refreshPlugin = require('@rspack/plugin-react-refresh')
const { withZephyr } = require('zephyr-webpack-plugin')
const path = require('path')
require('dotenv').config()

const isDev = process.env.NODE_ENV === 'development'

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
				remoteToast: `remoteToast@${process.env.REMOTE_TOAST_URL}`,
			},
			shared: {
				react: { 
					eager: true, 
					singleton: true,
					requiredVersion: '^19.1.0',
					strictVersion: true,
				},
				'react-dom': { 
					eager: true, 
					singleton: true,
					requiredVersion: '^19.1.0',
					strictVersion: true,
				},
				'react-dom/client': {
					eager: true,
					singleton: true,
					requiredVersion: '^19.1.0',
					strictVersion: true,
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
	].filter(Boolean),
})
