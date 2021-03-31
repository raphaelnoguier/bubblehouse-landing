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
	buildModules: [
		'@nuxtjs/google-analytics'
	],
	googleAnalytics: {
		id: 'UA-193469936-1'
	},
	plugins: [
		{
			src: '~/plugins/vue-lazyload',
			ssr: false
		}
	]
}
