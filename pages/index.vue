<template>
	<main id="home">
		<Hero />
		<InteractiveModules />
		<Boards />
		<Profiles />
		<Testimonials />
		<Footer />
	</main>
</template>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-N09HNCR5ZX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-N09HNCR5ZX');
</script>

<script>
/* Sections */
import Hero from '~/sections/Hero';
import Boards from '~/sections/Boards';
import InteractiveModules from '~/sections/InteractiveModules';
import Profiles from '~/sections/Profiles';
import Testimonials from '~/sections/Testimonials';
import Footer from '~/sections/Footer';

export default {
	computed: {
		app() {
			return this.$store.state.homepage
		}
	},
	head() {
		return {
			title: this.app.meta_title,
			meta: [
				{ charset: 'utf-8' },
				{ hid: 'description', name: 'description', content: this.app.meta_description },
				{ name: 'author', content: this.app.meta_author },
				{ name: "apple-itunes-app", content: "app-id=284882215, affiliate-data=myAffiliateData, app-argument=myURL" },
				{
					hid: `og:title`,
					property: 'og:title',
					content: this.app.meta_title,
				},
					{
					hid: `og:url`,
					property: 'og:url',
					content: 'https://bubblehouse.com'
				},
				{
					hid: `og:type`,
					property: 'og:type',
					content: "website"
				},
				{
					hid: `og:description`,
					property: 'og:description',
					content: this.app.meta_description
				},
				{
					hid: `og:image`,
					property: 'og:image',
					content: this.app.facebook_share_image.url
				},
				{
					hid: `twitter:card`,
					property: `twitter:card`,
					content: 'summary_large_image'
				},
				{
					hid: `twitter:url`,
					property: `twitter:url`,
					content: `https://ivskaya.com/${this.$route.path}`
				},
				{
					hid: `twitter:title`,
					property: `twitter:title`,
					content: this.app.meta_title,
				},
				{
					hid: `twitter:description`,
					property: `twitter:description`,
					content: this.app.meta_description
				},
				{
					hid: `twitter:image`,
					property: `twitter:image`,
					content: this.app.twitter_share_image.url
				},
			],
			link: [
				{
					rel: 'icon',
					type: 'image/png',
					href: this.app.favicon.url
				},
			],
		}
    },
    mounted() {
        this.resolveGradientsCircle();
    },
    methods: {
        resolveGradientsCircle() {
            const gradients = document.querySelectorAll('defs linearGradient.timerSlider');
            const circlesProgress = document.querySelectorAll('.progress-ring__circle');

            gradients && gradients.forEach((gradient, i) => gradient.setAttribute('id', `appGradient${i + 1}`));
            circlesProgress && circlesProgress.forEach((circle, i) => circle.setAttribute('fill', `url(${window.location.href}#appGradient${i + 1})`));
        }
    },
	components: {
		Hero,
		Boards,
		InteractiveModules,
		Profiles,
		Testimonials,
        Footer
	}
}
</script>
