<template>
	<main id="home">
		<Hero />
		<Boards />
		<ProfileExample />
		<InteractiveModules />
		<Feed />
		<Testimonials />
		<Footer />
        <WaitingListConfirmation />
	</main>
</template>

<script>
/* Sections */
import Hero from '~/sections/Hero';
import Boards from '~/sections/Boards';
import ProfileExample from '~/sections/ProfileExample';
import InteractiveModules from '~/sections/InteractiveModules';
import Feed from '~/sections/Feed';
import Testimonials from '~/sections/Testimonials';
import Footer from '~/sections/Footer';
import WaitingListConfirmation from '~/components/WaitingListConfirmation';

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
		Boards,
		ProfileExample,
		InteractiveModules,
		Feed,
		Testimonials,
        Footer,
        WaitingListConfirmation
	}
}
</script>
