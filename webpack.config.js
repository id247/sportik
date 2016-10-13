'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const NODE_ENV = process.env.WEBPACK_ENV || process.env.NODE_ENV || 'development';

let configId;
let server;

switch(NODE_ENV){
	case 'dnevnik':
		configId = 'production';
		server = 'dnevnik';
		break;
	case 'mosreg':
		configId = 'production';
		server = 'mosreg';
		break;
	case 'staging':
		configId = 'staging';
		server = 'staging';
		break;
	default:
		configId = 'development';
		server = 'local';
}

const appSettings = path.join(__dirname, '/src/js/settings/settings-' + server + '.js');

const resolve = {
	modulesDirectories: ['node_modules', 'spritesmith-generated'],
	extentions: ['', '.js', '.scss'],
	alias: {
		appSettings: appSettings,
	}
};

const loaders = {
	babel: {   
		test: /\.js$/, 
		loader: 'babel',
		include: [
			__dirname + '/src/js',
		], 
		query: {
			cacheDirectory: true,
			presets: ['es2015', 'react', 'stage-2']
		}
	},
	reactHot:{
		test: /\.js$/,
		loader: 'react-hot',
		include: __dirname + '/src/js',
	},
	strip: {
		test: /\.js$/, 
		include: [
			__dirname + '/src/js',
		], 
		loader: 'strip-loader?strip[]=console.log' 
	},
	cssModules: {
		test: /\.scss$/,

		include: [
			__dirname + '/src/js',
		], 
		loaders: [
			'style?sourceMap',
			'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
			'resolve-url',
			'sass?sourceMap'
		]
	},
	extractCssModules: {
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style', 
			'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass'
		),
	},
	spritesmith: {
		test: /\.png$/, loaders: [
			'file?name=i/[hash].[ext]'
		]
	},
};

const plugins = {
	env: new webpack.DefinePlugin({
		'process.env': { 
			NODE_ENV : JSON.stringify('production'), 
		}
	}),
	uglifyJs: new webpack.optimize.UglifyJsPlugin({
		minimize: true,
		output: {
			comments: false
		},
		compress: {
			warnings: false
		}
	}),
	HotModuleReplacementPlugin: new webpack.HotModuleReplacementPlugin(),
	ExtractTextPlugin: new ExtractTextPlugin('css/style.css', {
		allChunks: true
	}),
	SpritesmithPlugin: new SpritesmithPlugin({
		src: {
			cwd: path.resolve(__dirname, 'src/assets/sprite'),
			glob: '*.png'
		},
		target: {
			//image: path.resolve(__dirname, 'spritesmith-generated/sprite.png'),
			image: path.resolve(__dirname, 'development/assets/images/sprite.png'),
			css: path.resolve(__dirname, 'spritesmith-generated/sprite.scss')
		},
		apiOptions: {
			cssImageRef: 'http://localhost:9000/assets/images/sprite.png'
			//cssImageRef: path.resolve(__dirname, 'spritesmith-generated/sprite.png')
			//cssImageRef: "~sprite.png"
		}
	}),
};

const config = {

	development: {
		cache: true,
		entry: {
			[server]: [
				'whatwg-fetch',
				'webpack-dev-server/client?http://localhost:3000',
				'webpack/hot/only-dev-server',
				'./src/js',
			],
		},
		devtool: '#inline-source-map',
		output: {
			path: __dirname + '/development',
			filename: 'js/[name].min.js',
			publicPath: 'http://localhost:3000/assets',
			pathinfo: true
		},

		resolve: resolve,

		module: {
			loaders: [
				loaders.reactHot,
				//loaders.spritesmith,
				loaders.cssModules,
				loaders.babel,
			]
		},
		plugins: [
			plugins.SpritesmithPlugin,
			plugins.HotModuleReplacementPlugin,
		],
	},

	staging: {
		cache: true,
		entry: {
			[server]: [
				'babel-polyfill', 
				'whatwg-fetch',
				'./src/js',
			],
		},
		output: {
			path: __dirname + '/production/assets',
			filename: 'js/[name].min.js',
			publicPath: __dirname + '/production/assets',
			pathinfo: true
		},

		resolve: resolve,

		module: {
			loaders: [
				loaders.extractCssModules,
				loaders.babel,
				//loaders.strip,				
			]
		},
		plugins: [  
			plugins.env,
			plugins.ExtractTextPlugin,
			//plugins.uglifyJs,
		]
	},

	production: {
		cache: true,
		entry: {
			[server]: [
				'babel-polyfill', 
				'whatwg-fetch',
				'./src/js',
			],
		},
		output: {
			path: __dirname + '/production/assets',
			filename: 'js/[name].min.js',
			publicPath: __dirname + '/production/assets',
			pathinfo: true
		},

		resolve: resolve,

		module: {
			loaders: [
				loaders.extractCssModules,
				loaders.spritesmith,
				loaders.babel,
				loaders.strip,				
			]
		},
		plugins: [  
			plugins.env,
			plugins.ExtractTextPlugin,
			plugins.SpritesmithPlugin,
			plugins.uglifyJs,
		]
	}
};

module.exports = config[configId];
