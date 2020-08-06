const pkg = require('./package')

module.exports = {
	head: {
		title: 'Siena',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1"' },
			{ hid: 'description', name: 'description', content: 'Here goes the site description' }
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
	],
}
