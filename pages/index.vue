<template>
	<main id="home">
		<Hero />
		<FeelTheContent />
		<Boards />
	</main>
</template>

<script>
/* Components */
import Hero from '~/components/Hero';

/* Sections */
import FeelTheContent from '~/sections/FeelTheContent';
import Boards from '~/sections/Boards';

export default {
	components: {
		Hero,
		FeelTheContent,
		Boards
	}
}
</script>
