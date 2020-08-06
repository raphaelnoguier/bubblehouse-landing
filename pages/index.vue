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
    mounted() {
        this.resolveGradientsCircle();
    },
    methods: {
        resolveGradientsCircle() {
            const gradients = document.querySelectorAll('defs linearGradient');
            const circlesProgress = document.querySelectorAll('.progress-ring__circle');

            gradients && gradients.forEach((gradient, i) => gradient.setAttribute('id', `appGradient${i + 1}`));
            circlesProgress && circlesProgress.forEach((circle, i) => circle.setAttribute('fill', `url(${window.location.href}#appGradient${i + 1})`));
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
