<template>
	<main id="home">
		<Hero />
		<FeelTheContent />
	</main>
</template>

<script>
/* Components */
import Hero from '~/components/Hero';
import FeelTheContent from '~/sections/FeelTheContent';

export default {
	components: {
		Hero,
		FeelTheContent
	}
}
</script>
