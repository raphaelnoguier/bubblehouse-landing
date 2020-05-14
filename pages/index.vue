<template>
	<main id="home">
		<Hero />
		<Feed />
		<Boards />
		<ProfileExample />
		<InteractiveModules />
		<Testimonials />
		<Footer />
	</main>
</template>

<script>
/* Sections */
import Hero from '~/sections/Hero';
import Feed from '~/sections/Feed';
import Boards from '~/sections/Boards';
import ProfileExample from '~/sections/ProfileExample';
import InteractiveModules from '~/sections/InteractiveModules';
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
			description: this.app.meta_description,
			meta: [
				{ charset: 'utf-8' },
				{ name: 'author', content: this.app.meta_author }
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
	components: {
		Hero,
		Feed,
		Boards,
		ProfileExample,
		InteractiveModules,
		Testimonials,
		Footer
	}
}
</script>
