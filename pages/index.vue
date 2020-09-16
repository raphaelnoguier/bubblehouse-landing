<template>
	<main id="home">
		<Hero />
		<InteractiveModules />
		<Boards />
		<Profiles />
		<Footer />
        <WaitingListConfirmation />
	</main>
</template>

<script>
/* Sections */
import Hero from '~/sections/Hero';
import Boards from '~/sections/Boards';
import InteractiveModules from '~/sections/InteractiveModules';
import Profiles from '~/sections/Profiles';
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
        Footer,
        WaitingListConfirmation
	}
}
</script>
