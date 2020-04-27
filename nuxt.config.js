const pkg = require('./package')

module.exports = {
	head: {
		title: 'Siena',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Here goes the site description' }
		],
		link: [
			// { rel: 'icon', type: 'image/png', href: '/favicon.png' }
		]
	},
	loading: false,
	css: [
		'~/assets/scss/main.scss'
	],
	plugins: []
}
