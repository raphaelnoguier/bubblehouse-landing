const pkg = require('./package')

module.exports = {
  mode: 'spa',
  head: {
    title: 'Robin Noguier - Interactive Designer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Robin Noguier • Interactive designer • hello@robin-noguier.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  loading: false,
  css: [
    '~/assets/scss/main.scss'
  ],
  plugins: []
}
