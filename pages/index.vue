<template>
	<main id="home">
		<Hero />
		<FeelTheContent />
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
import FeelTheContent from '~/sections/FeelTheContent';
import Boards from '~/sections/Boards';
import ProfileExample from '~/sections/ProfileExample';
import InteractiveModules from '~/sections/InteractiveModules';
import Testimonials from '~/sections/Testimonials';
import Footer from '~/sections/Footer';

export default {
	components: {
		Hero,
		FeelTheContent,
		Boards,
		ProfileExample,
		InteractiveModules,
		Testimonials,
		Footer
	}
}
</script>
