<template>
	<main id="home">
		<Hero />
		<FeelTheContent />
		<Boards />
		<ProfileExample />
		<InteractiveModules />
	</main>
</template>

<script>
/* Sections */
import Hero from '~/sections/Hero';
import FeelTheContent from '~/sections/FeelTheContent';
import Boards from '~/sections/Boards';
import ProfileExample from '~/sections/ProfileExample';
import InteractiveModules from '~/sections/InteractiveModules';

export default {
	components: {
		Hero,
		FeelTheContent,
		Boards,
		ProfileExample,
		InteractiveModules
	}
}
</script>
