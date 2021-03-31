const pkg = require('./package')

module.exports = {
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		title: 'Bubblehouse',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1"' }
		]
	},
	loading: false,
	css: [
		'~/assets/scss/main.scss'
	],
	/*
		Plugins
	*/
	plugins: [
		{
			src: '~/plugins/vue-lazyload',
			ssr: false
		},
		{
			src: '~/plugins/ga.js',
			ssr: false
		}
	]
}
