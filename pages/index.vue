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
